import { NavLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export default function NavbarBottom({
  isOpen = false,
  navLinks = [],
  visibleLoginLinks = [],
  token = false,
  onLogout = () => {},
}) {
  if (!isOpen) {
    return <div className="navbar-bottom" />;
  }

  return (
    <div className="navbar-bottom">
      <div className="border-t border-white/10 px-4 pb-4 md:hidden">
        <div className="flex flex-col gap-2 pt-3">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-cyan-400 text-slate-950"
                      : "bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </NavLink>
            );
          })}

          {visibleLoginLinks.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </NavLink>
            );
          })}

          {token && (
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-3 rounded-2xl bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-300 transition hover:bg-rose-500/20"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
