"use client";

type Session = {
  user?: {
    name?: string;
    email?: string;
  };
};

export default function Header({ session }: { session: Session }) {
  const handleLogout = () => {
    fetch("/api/auth/logout").then(() => {
      window.location.href = "/";
    });
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-200">
      <div className="font-bold text-lg">Serve Property Management</div>
      {session?.user ? (
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-medium">{session.user.name}</div>
            <div className="text-xs text-gray-500">{session.user.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      ) : null}
    </header>
  );
}
