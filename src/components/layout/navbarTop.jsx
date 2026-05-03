import { useEffect, useState } from "react";
import { NavLink,Link } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiShoppingBag,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

const NAV_LINKS = [
  { name: "Home", path: "/", icon: FiHome },
  { name: "Symptoms", path: "/symgallery", icon: FiGrid },
  { name: "Medical Shop", path: "/medicalshop", icon: FiShoppingBag },
];

export default function NavbarDesktop({
  isSticky,
  setIsSticky,
  token,
  isLoginOpen,
  setIsLoginOpen,
  handleLogout,
  visibleLoginLinks,
}) {
  const [internalIsSticky, internalSetIsSticky] = useState(false);
  const resolvedIsSticky = typeof isSticky === "boolean" ? isSticky : internalIsSticky;
  const updateSticky =
    typeof setIsSticky === "function" ? setIsSticky : internalSetIsSticky;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateSticky(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateSticky]);

  return (
    <header
      className={`hidden bg-green-500/40 md:block fixed left-1/2 z-50  px-4 rounded-lg -translate-x-1/2  text-white shadow-lg shadow-slate-950/30 backdrop-blur-md transition-all duration-300 ${
        resolvedIsSticky
          ? "top-5 w-[90%] rounded-2xl"
          : "top-0 w-full rounded-none border-x-0"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center   justify-between px-4 py-3">
        {/* Links */}
        <div className="flex items-center gap-2">
          {NAV_LINKS.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
                     isActive ? "bg-white/20 text-white scale-105" : "text-gray-300 hover:bg-green-400/20"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {name}
            </NavLink>
          ))}
        </div>

        {/* Profile */}
       <Link to="/profile">
       <FiUser className="border p-1 rounded-xl " size={28}/>
       </Link>
      </nav>
    </header>
  );
}
