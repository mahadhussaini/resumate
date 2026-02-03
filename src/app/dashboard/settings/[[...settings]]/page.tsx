"use client";

import { UserProfile } from "@clerk/nextjs";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div>
                <h2 className="text-4xl font-outfit font-bold mb-4">Account <span className="text-gradient">Settings</span></h2>
                <p className="text-slate-400">Manage your profile and application preferences.</p>
            </div>

            <div className="glass-card overflow-hidden">
                <UserProfile
                    path="/dashboard/settings"
                    routing="path"
                    appearance={{
                        elements: {
                            card: "bg-transparent shadow-none border-none",
                            rootBox: "w-full",
                            navbar: "hidden",
                            pageScrollBox: "p-0",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            profileSectionTitleText: "text-slate-100",
                            userPreviewMainIdentifier: "text-slate-100",
                            userPreviewSecondaryIdentifier: "text-slate-400",
                            formFieldLabel: "text-slate-300",
                            formButtonPrimary: "bg-primary hover:bg-primary/90",
                            identityPreviewText: "text-slate-100",
                            identityPreviewEditButtonText: "text-primary",
                            formFieldInput: "bg-white/5 border-white/10 text-slate-100",
                        }
                    }}
                />
            </div>
        </div>
    );
}
