# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # ESLint (flat config, ESLint 9)
```

No test runner is configured.

## Tech Stack

- **React 18** + **Vite 7** + **React Router DOM 6** (loaders + actions pattern)
- **TanStack Query v5** — `QueryClient` lives in `shared/api/queryClient.js` (5 min staleTime); `QueryClientProvider` wraps the app in `App.jsx`; `ReactQueryDevtools` is mounted in dev
- **Tailwind CSS v4** + **DaisyUI v5**; custom `.align-element` utility (`max-w-6xl mx-auto px-8`) for centered containers
- **Axios** against a Strapi v4 backend at `https://strapi-store-server.onrender.com/api`
- **Redux Toolkit** — `store.js` mounts `cart` and `user` reducers
- **react-toastify** — `<ToastContainer>` is mounted in `main.jsx`
- Theme toggle: `winter` (light) ↔ `dracula` (dark), persisted in `localStorage`, applied via `data-theme` on `<html>`

## Architecture — Feature Sliced Design (FSD)

Layer order (imports only go downward):

```
app → pages → widgets → features → entities → shared
```

```
src/
├── app/          # Router, Redux store, global CSS
├── pages/        # Route segments; each may have ui/, api/loader.js, api/action.js
├── widgets/      # Composite UI assembled from lower layers
├── features/     # Use-case logic (auth, add-to-cart, checkout)
├── entities/     # Business objects and their models (cart, user, product, orders)
└── shared/       # api clients, queryClient, ui primitives, utils, assets
```

Every layer folder uses barrel `index.js` exports — always import from the barrel, never from internal paths of another slice.

`app` is the top layer — nothing imports from it. `queryClient` lives in `shared/api/` (not `app/`) so that `entities` layer can import it without violating FSD (needed for cache clearing on logout).

## Data Flow

### TanStack Query pattern

Query key factories and query objects live co-located with their fetch functions in `entities/<slice>/api/` or `features/<slice>/api/`:

```js
export const productKeys = {
  all: () => ["products"],
  filtered: (params) => [...productKeys.all(), "filtered", params],
  detail: (id) => [...productKeys.all(), "detail", id],
};

export const filteredProductsQuery = (params) => ({
  queryKey: productKeys.filtered(params),
  queryFn: () => fetchFilteredProducts(params),  // params closed over, not from TanStack context
});
```

Loaders prefetch with `ensureQueryData`, components subscribe with `useQuery`:

```js
// loader — prefetch and return only what the component needs beyond cached data
const params = Object.fromEntries(new URL(request.url).searchParams);
await queryClient.ensureQueryData(filteredProductsQuery(params));
return { params };

// component — drives UI, hits cache immediately (no second request)
const { params } = useLoaderData();
const { data } = useQuery(filteredProductsQuery(params));
```

Use `useLoaderData()` only when the component doesn't need background refetch (e.g. single product detail page). Use `useQuery` when data should stay fresh while the user is on the page.

### Server data (write)
Route actions (in `pages/<slice>/api/action.js`) handle form submissions via `request.formData()`, call feature API functions, then `redirect()` on success.

### Auth-gated loaders and actions
Loaders/actions that require authentication use a curried signature to close over the Redux `store`:

```js
export const loader = (store) => async ({ request }) => {
  const user = store.getState().user.user;
  if (!user) return redirect("/login");
  await queryClient.ensureQueryData(...);
  return { params };
};
// wired in App.jsx as: loader: myLoader(store)
```

### Cart state
Global via Redux (`entities/cart/model/cartSlice`). Actions: `addItem`, `removeItem`, `editItem`, `clearCart`. Cart is persisted to `localStorage` on every mutation via `recalculateTotals`. Prices are stored as integers (cents); use `formatPrice` from `shared/utils` to display.

### User / Auth state
`entities/user/model/userSlice` holds `{ user, theme }`. `loginUser` stores the token in localStorage; `authClient` (from `shared/api/client.js`) reads it via an Axios request interceptor and attaches `Authorization: Bearer <token>` automatically. Use `authClient` for authenticated endpoints, `httpClient` for public ones. On `logoutUser`, call `queryClient.clear()` to wipe cached data from the previous user.

## Routing

`app/App.jsx` builds a `createBrowserRouter` tree. `HomeLayout` wraps all in-app routes via `<Outlet>`. `/login` and `/register` sit outside `HomeLayout`.

| Route | Loader | Action |
|---|---|---|
| `/` | `pages/landing/api/loader.js` | — |
| `/products` | `pages/products/api/loader.js` | — |
| `/products/:id` | `pages/single-product/api/loader.js` | — |
| `/checkout` | `pages/checkout/api/loader.js` (auth-gated) | `pages/checkout/api/action.js` (auth-gated) |
| `/orders` | `pages/orders/api/loader.js` (auth-gated) | — |
| `/login` | — | `pages/login/api/action.js` |
| `/register` | — | `pages/register/api/action.js` |

## Strapi Response Shape

Collections: `{ data: [...], meta: { pagination: { page, pageSize, pageCount, total }, companies, categories } }`

Single items: `{ data: { id, attributes: { title, price, image, ... } } }`

Product attributes: `title, price, image, description, colors, company`. Pagination and filter params are forwarded to Strapi as Axios `params`.
