import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { BsMoonFill, BsSunFill, BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import NavLinks from "./NavLinks";
import { toggleTheme } from "@/entities/user";

function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.theme);

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const numItemsInCart = useSelector((state) => state.cart.numItemsInCart);

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        {/* navbar start */}
        <div className="navbar-start">
          <NavLink
            to={"/"}
            aria-current="page"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            C
          </NavLink>
          <div className="dropdown">
            <label tabIndex={"0"} className="btn btn-ghost lg:hidden">
              <FaBarsStaggered className="h-6 w-6" />
            </label>
            <ul
              tabIndex={"0"}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-200 rounded-box w-52"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        {/* navbar center */}
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal gap-1">
            <NavLinks />
          </ul>
        </div>
        {/* navbar end */}
        <div className="navbar-end">
          {/* THEME SETUP */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              checked={theme === "dracula"}
              onChange={handleTheme}
            />
            <BsSunFill className="swap-on" />
            <BsMoonFill className="swap-off" />
          </label>
          <NavLink
            className="btn btn-ghost btn-circle btn-md ml-4"
            to={"/cart"}
          >
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              <span className="badge badge-sm badge-primary indicator-item">
                {numItemsInCart}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
