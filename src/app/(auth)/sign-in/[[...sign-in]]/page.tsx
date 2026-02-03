import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] relative overflow-hidden">
            <div className="bg-mesh" />
            <div className="relative z-10 w-full max-w-md p-4">
                <SignIn
                    appearance={{
                        elements: {
                            formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm normal-case",
                            card: "glass-card border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl",
                            headerTitle: "text-white font-outfit text-2xl font-bold",
                            headerSubtitle: "text-slate-400 text-sm",
                            socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
                            socialButtonsBlockButtonText: "text-white font-medium",
                            dividerLine: "bg-white/10",
                            dividerText: "text-slate-500",
                            formFieldLabel: "text-slate-300 text-xs font-bold uppercase",
                            formFieldInput: "bg-white/5 border-white/10 text-white focus:border-primary/50",
                            footerActionText: "text-slate-400",
                            footerActionLink: "text-primary hover:text-primary/80 font-bold",
                            identityPreviewText: "text-white",
                            identityPreviewEditButtonIcon: "text-primary",
                        }
                    }}
                />
            </div>
        </div>
    );
}
