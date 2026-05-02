import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiShoppingBag,
  FiUser,
  FiX,
} from "react-icons/fi";
import ThemeToggle from "../ThemeToggle";

const THEME_KEY = "theme";

const isValidTheme = (value) =>
  value === "light" || value === "dark" || value === "system";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getAppliedTheme = (mode) => (mode === "system" ? getSystemTheme() : mode);

const NAV_LINKS = [
  { name: "Home", path: "/", icon: FiHome },
  { name: "Symptoms", path: "/symgallery", icon: FiGrid },
  { name: "Medical Shop", path: "/medicalshop", icon: FiShoppingBag },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [themeMode, setThemeMode] = useState(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    return isValidTheme(storedTheme) ? storedTheme : "dark";
  });

  const token = localStorage.getItem("token");
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
  }, []);
  useEffect(() => {
    const applyTheme = () => {
      const appliedTheme = getAppliedTheme(themeMode);
      document.documentElement.dataset.theme = appliedTheme;
      document.documentElement.dataset.themeMode = themeMode;
      document.documentElement.style.colorScheme = appliedTheme;
      localStorage.setItem(THEME_KEY, themeMode);
    };

    applyTheme();

    if (themeMode !== "system") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => applyTheme();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [themeMode]);

  useEffect(() => {
    setIsOpen(false);
    setIsLoginOpen(false);
  }, [pathname]);

  const visibleLoginLinks = useMemo(
    () => [
      {
        name: token ? "Profile" : "Sign in",
        path: token ? "/profile" : "/login",
        icon: FiUser,
      },
    ],
    [token],
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoginOpen(false);
    window.location.reload();
  };
// This is the main returen line 
  return (
    <header
      style={{
        backgroundColor: "rgba(34, 197, 94, 0.4)",
        color: "var(--app-text)",
        borderColor: "var(--app-border)",
      }}
      className={`fixed left-1/2 z-50 -translate-x-1/2 border text-white shadow-lg shadow-slate-950/30 backdrop-blur-md transition-all duration-300 ${
        isSticky
          ? "top-5 w-[90%] rounded-2xl"
          : "top-0 w-full rounded-none border-x-0"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <NavLink
          to="/"
          className="flex items-center gap-3 font-semibold tracking-wide"
        >
          {/* <span className="text-sm font-semibold uppercase tracking-[0.3em] text-(--app-text-soft)">
            Symtoms Analyzer
          </span> */}
        </NavLink>

        <div className="hidden items-center gap-2 md:flex">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
// For desktop
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-500/40 text-slate-950"
                      : "text-(--app-text-soft) hover:bg-(--app-panel-strong) hover:text-(--app-text)"
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </NavLink>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full bg-cyan-500/15 text-cyan-300 transition hover:bg-cyan-500/25"
              onClick={() => setIsLoginOpen((prev) => !prev)}
              aria-label="Open account menu"
            >
              <FiUser className="h-5 w-5" />
            </button>

            {isLoginOpen && (
              <div
                className="absolute right-0 mt-2 w-52 rounded-2xl border p-2 shadow-xl"
                style={{
                  backgroundColor: "var(--app-panel)",
                  borderColor: "var(--app-border)",
                  color: "var(--app-text)",
                }}
              >
                {visibleLoginLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-(--app-panel-strong) hover:text-(--app-text)"
                      onClick={() => setIsLoginOpen(false)}
                      style={{ color: "var(--app-text-soft)" }}
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </NavLink>
                  );
                })}

                {token && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-medium transition hover:bg-rose-500/10 hover:text-rose-200"
                    style={{ color: "#ef4444" }}
                  >
                    <FiLogOut className="h-4 w-4" />
                    Logout
                  </button>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-slate-200 transition hover:bg-white/10 hover:text-white md:hidden sm:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          className="border-t px-4 pb-4 md:hidden"
          style={{ borderColor: "var(--app-border)" }}
        >
          <div className="flex flex-col gap-2 pt-3">
            <div
              className="mb-2 w-fit flex items-center justify-between rounded-2xl border px-3 py-3"
              style={{
                backgroundColor: "var(--app-panel)",
                borderColor: "var(--app-border)",
                color: "var(--app-text)",
              }}
            >
              <div className="flex items-center gap-2">
                <ThemeToggle
                  themeMode={themeMode}
                  onThemeChange={setThemeMode}
                  compact
                />
              </div>
            </div>

            {NAV_LINKS.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-cyan-400 text-slate-950"
                        : "bg-(--app-panel) text-(--app-text-soft) hover:bg-(--app-panel-strong) hover:text-(--app-text)"
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
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-(--app-panel-strong) hover:text-(--app-text)"
                  style={{
                    backgroundColor: "var(--app-panel)",
                    color: "var(--app-text-soft)",
                  }}
                >
                  <Icon className="h-4 w-4" />
                  {link.name}
                </NavLink>
              );
            })}

            {token && (
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition hover:bg-rose-500/20"
                style={{ color: "#ef4444" }}
              >
                <FiLogOut className="h-4 w-4" />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
