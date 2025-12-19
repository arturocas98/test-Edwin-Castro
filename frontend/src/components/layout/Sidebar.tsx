import { NavLink } from "react-router-dom";

const linkClass = "block px-4 py-2 rounded hover:bg-slate-700 transition";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-slate-800 text-white min-h-[calc(100vh-56px)] p-4">
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-slate-700" : ""}`
          }>
          Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? "bg-slate-700" : ""}`
          }>
          Projects
        </NavLink>
      </nav>
    </aside>
  );
}
