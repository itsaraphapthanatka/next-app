"use client";
import { SessionProvider } from "next-auth/react";
import { ProfileHeader } from "../components/ProfileHeader";

export default function AssignPage() {
    return (
        <SessionProvider>
            <AssignContent />
        </SessionProvider>
    );
}

function AssignContent() {
    return (
        <div className="min-h-screen bg-dashboard-bg font-prompt">
            <div className="max-w-md mx-auto p-4">
                <ProfileHeader />
                <h1>Assign</h1>
            </div>
        </div>
    );
}