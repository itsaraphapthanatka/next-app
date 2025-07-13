"use client";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
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
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      ) : null}
    </header>
  );
} 

// import { Bell, Clock } from "lucide-react";

// interface ProfileHeaderProps {
//   userName?: string;
//   userRole?: string;
// }

// export function Header({ userName = "คุณ, ตัวอย่าง สมมติ", userRole = "ขอให้ทำงานอย่างมีความสุข" }: ProfileHeaderProps) {
//   return (
//     <header className="bg-white rounded-xl p-4 mb-6 shadow-sm border border-border">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center space-x-3">
//           <div className="w-12 h-12 bg-profile-bg rounded-full flex items-center justify-center">
//             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
//               <span className="text-black text-lg font-medium">{userName?.charAt(14)}</span>
//             </div>
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold text-foreground font-prompt">สวัสดี {userName}!</h2>
//             <p className="text-sm text-text-greeting font-prompt">{userRole}</p>
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-3">
//           <button className="p-2 hover:bg-secondary rounded-full transition-colors">
//             <Clock className="w-5 h-5 text-muted-foreground" />
//           </button>
//           <button className="p-2 hover:bg-secondary rounded-full transition-colors relative">
//             <Bell className="w-5 h-5 text-muted-foreground" />
//             <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }