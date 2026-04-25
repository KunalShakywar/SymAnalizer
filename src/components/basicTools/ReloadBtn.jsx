import { TfiReload } from "react-icons/tfi";
export default function ReloadBtn({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-4 top-8 z-10 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:bg-white/10 hover:text-white"
    >
  <TfiReload />
    </button>
  );
}
