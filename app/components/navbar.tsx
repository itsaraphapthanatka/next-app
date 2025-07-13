import { Bell } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: "You have a new report request." },
    { id: 2, message: "Assignment updated successfully." },
  ];

  return (
    <nav className="bg-white shadow flex items-center justify-between font-prompt">
      <div className="text-xl font-semibold text-primary">MyApp</div>
      <div className="relative">
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition"
          onClick={() => setShowNotifications((prev) => !prev)}
          aria-label="Notifications"
        >
          <Bell className="w-6 h-6 text-primary" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
              {notifications.length}
            </span>
          )}
        </button>
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-10">
            <div className="p-3 border-b font-medium text-gray-700">Notifications</div>
            <ul>
              {notifications.length === 0 ? (
                <li className="p-3 text-gray-500 text-sm">No notifications</li>
              ) : (
                notifications.map((n) => (
                  <li key={n.id} className="p-3 hover:bg-gray-50 text-sm text-gray-700">
                    {n.message}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
