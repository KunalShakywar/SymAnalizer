import { useEffect } from "react";
import { NavLink } from "react-router-dom";
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
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsSticky(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsSticky]);

  return (
    <header
      className={`hidden bg-green-500/40 md:block fixed left-1/2 z-50 -translate-x-1/2  text-white shadow-lg shadow-slate-950/30 backdrop-blur-md transition-all duration-300 ${
        isSticky
          ? "top-5 w-[90%] rounded-2xl"
          : "top-0 w-full rounded-none border-x-0"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center  justify-between px-4 py-3">
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
        <div className="relative ">
          <button
            onClick={() => setIsLoginOpen((p) => !p)}
            className="grid h-10 w-10 place-items-center rounded-full bg-cyan-500/15"
          >
            <FiUser className="h-5 w-5" />
          </button>

          {isLoginOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl border p-2 shadow-xl bg-(--app-panel)">
              {visibleLoginLinks.map(({ name, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-(--app-panel-strong)"
                  onClick={() => setIsLoginOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  {name}
                </NavLink>
              ))}

              {token && (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10"
                >
                  <FiLogOut className="h-4 w-4" />
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
