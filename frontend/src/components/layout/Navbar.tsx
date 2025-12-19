import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 bg-slate-900 text-white flex items-center justify-between px-6">
      <h1 className="font-semibold">Project Manager</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm opacity-80">{user?.email}</span>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-sm px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </header>
  );
}
