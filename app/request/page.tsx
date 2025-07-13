"use client";
import { SessionProvider } from "next-auth/react";
import { ProfileHeader } from "../components/ProfileHeader";

export default function RequestPage() {
    return (
        <SessionProvider>
            <RequestContent />
        </SessionProvider>
    );
}

function RequestContent() {
    return (
        <div className="min-h-screen bg-dashboard-bg font-prompt">
            <div className="max-w-md mx-auto p-4">
                <ProfileHeader />
                <h1>Request Report</h1>
            </div>
        </div>
    );
}