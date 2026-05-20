import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ErrorElement } from "@/shared/ui";
import { HomeLayout } from "@/pages/home-layout";
import { Error } from "@/pages/error";
import { Landing, landingLoader } from "@/pages/landing";
import { Products, productsLoader } from "@/pages/products";
import { productLoader, SingleProduct } from "@/pages/single-product";
import { Cart } from "@/pages/cart";
import { About } from "@/pages/about";
import { Checkout, checkoutAction, checkoutLoader } from "@/pages/checkout";
import { Orders, ordersLoader } from "@/pages/orders";
import { Login, loginAction } from "@/pages/login";
import { Register, registerAction } from "@/pages/register";
import { store } from "./store";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          errorElement: <ErrorElement />,
          loader: landingLoader,
        },
        {
          path: "products",
          element: <Products />,
          errorElement: <ErrorElement />,
          loader: productsLoader,
        },
        {
          path: "products/:id",
          element: <SingleProduct />,
          errorElement: <ErrorElement />,
          loader: productLoader,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "checkout",
          element: <Checkout />,
          loader: checkoutLoader(store),
          action: checkoutAction(store),
        },
        {
          path: "orders",
          element: <Orders />,
          loader: ordersLoader(store),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
      action: loginAction(store),
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <Error />,
      action: registerAction,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
