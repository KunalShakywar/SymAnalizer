import { NavLink } from "react-router-dom";
import { FiHome, FiGrid, FiShoppingBag, FiUser } from "react-icons/fi";

const NAV_LINKS = [
  { name: "Home", path: "/", icon: FiHome },
  { name: "Symptoms", path: "/symgallery", icon: FiGrid },
  { name: "Shop", path: "/medicalshop", icon: FiShoppingBag },
    {
    name: "Profile",
    path: "/profile",
    loginPath: "/login",
    icon: FiUser,
    isAuth: true,
  },
];

export default function NavbarMobile({ token }) {
  return (
    <footer className="fixed bottom-0  z-50 w-full px-3 md:hidden">
      <div className="flex justify-around bg-green-500/40 py-2  rounded-lg mb-2 backdrop-blur-md transition-all duration-300">
        {NAV_LINKS.map(({ name, path, icon: Icon, loginPath, isAuth }) => (
          <NavLink
            key={name}
            to={isAuth ? (token ? path : loginPath) : path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs px-3 py-1 rounded-lg transition ${
                isActive ? "bg-white/20 text-white scale-105" : "text-gray-300 "
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {name}
          </NavLink>
        ))}
      </div>
    </footer>
  );
}
