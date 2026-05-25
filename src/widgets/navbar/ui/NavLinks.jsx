import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigation } from "react-router-dom";

const links = [
  { id: 1, text: "home", to: "/" },
  { id: 2, text: "about", to: "about" },
  { id: 3, text: "products", to: "products" },
  { id: 4, text: "cart", to: "cart" },
  { id: 5, text: "checkout", to: "checkout" },
  { id: 6, text: "orders", to: "orders" },
];

function NavLinks() {
  const user = useSelector((state) => state.user.user);

  const navigation = useNavigation();
  const location = useLocation();

  const isLoading = navigation.state === "loading";
  const loadingPath = navigation.location?.pathname;

  return (
    <>
      {links.map((link) => {
        const { text, to, id } = link;

        /* 
        'isLoading' - loaders loading state 
        'loading' - deducted loading state for future active NavLink button
        */
        const loading = isLoading && loadingPath === to;
        const current = location.pathname === to;

        /* mark target link as active, even before loading */
        const active = loading || (!isLoading && current);
        if ((to === "checkout" || to === "orders") && !user) {
          return null;
        }
        return (
          <li key={id}>
            <NavLink
              className={`capitalize ${active ? "menu-active" : ""}`}
              id={id}
              to={to}
            >
              {text}
              {loading && (
                <span className="loading loading-bars loading-xs"></span>
              )}
            </NavLink>
          </li>
        );
      })}
    </>
  );
}
export default NavLinks;
