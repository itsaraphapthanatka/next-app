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

        <div className="min-h-screen bg-dashboard-bg font-prompt">
            <div className="max-w-md mx-auto p-4">
                <Navbar />
                <ProfileHeader userName={session?.user?.name || ""} />
                <h1>Property {session?.user?.name}</h1>
            </div>
        </div>
    );
}