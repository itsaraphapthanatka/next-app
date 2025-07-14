"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { ProfileHeader } from "../components/ProfileHeader";
import { Navbar } from "../components/navbar";

export default function PropertyPage() {
    return (
        <SessionProvider>
            <PropertyContent />
        </SessionProvider>
    );
}

function PropertyContent() {    
    const { data: session } = useSession();
    return (

        <div className="bg-gray-100 min-h-screen bg-dashboard-bg font-prompt">
                <Navbar /> 
            <div className="max-w-md mx-auto p-4">
                {/* <ProfileHeader userName={session?.user?.name || ""} /> */}
                <h1>Property Management {session?.user?.name}</h1>
            </div>
        </div>
    );
}