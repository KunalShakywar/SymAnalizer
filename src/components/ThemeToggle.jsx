import { FiMonitor, FiMoon, FiSun } from "react-icons/fi";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: FiSun },
  { value: "system", label: "System", icon: FiMonitor },
  { value: "dark", label: "Dark", icon: FiMoon },
];

export default function ThemeToggle({
  themeMode,
  onThemeChange,
  compact = false,
}) {
  return (
    <div className="flex items-center gap-2">
      {THEME_OPTIONS.map((option) => {
        const Icon = option.icon;
        const isActive = themeMode === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onThemeChange(option.value)}
            className={`grid ${
              compact ? "h-9 w-9" : "h-8 w-8"
            } place-items-center rounded-full border transition ${
              isActive
                ? "border-cyan-300 bg-cyan-400/25 text-white"
                : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
            }`}
            aria-label={`Switch to ${option.label} theme`}
            title={option.label}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}
