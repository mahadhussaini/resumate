"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Settings,
    Rocket,
    LogOut,
    Sparkles,
    CreditCard,
    Menu,
    X
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from "framer-motion";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("success") === "true") {
            // In a real app, use a toast library like sonner
            alert("Payment successful! Welcome to the Pro plan.");
            router.replace(pathname);
        }
        if (searchParams.get("canceled") === "true") {
            alert("Payment canceled.");
            router.replace(pathname);
        }
    }, [searchParams, router, pathname]);

    const menuItems = [
        { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
        { icon: FileText, label: "Resume Optimizer", href: "/dashboard/resume" },
        { icon: Sparkles, label: "Portfolio AI", href: "/dashboard/portfolio" },
        { icon: Briefcase, label: "Job Matcher", href: "/dashboard/matcher" },
        { icon: CreditCard, label: "Subscription", href: "/dashboard/billing" },
        { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    ];

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Rocket className="text-white w-5 h-5" />
                    </div>
                    <span className="font-outfit font-bold text-xl tracking-tight">Resumate</span>
                </div>
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden p-2 text-slate-400 hover:text-white"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
                {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                            pathname === item.href
                                ? "bg-primary/10 text-primary border border-primary/20"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                    </Link>
                ))}
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="glass-card p-4 bg-primary/5 border-primary/20">
                    <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Pro Plan</div>
                    <div className="text-sm text-slate-300 mb-3">Get unlimited scans & AI rewrites.</div>
                    <Link
                        href="/dashboard/billing"
                        onClick={() => setIsSidebarOpen(false)}
                        className="w-full py-2 bg-primary rounded-lg text-xs font-bold hover:bg-primary/90 transition-colors block text-center"
                    >
                        Upgrade Now
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#0a0a0c]">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 border-r border-white/5 flex-col bg-black/40 backdrop-blur-xl">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 w-72 bg-[#0a0a0c] border-r border-white/5 z-50 lg:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 border-b border-white/5 flex justify-between items-center px-4 lg:px-8 bg-black/20 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-white"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-sm font-medium text-slate-400 truncate max-w-[150px] sm:max-w-none">
                            {menuItems.find(i => i.href === pathname)?.label || "Dashboard"}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2 lg:gap-4">
                        <button className="hidden sm:flex p-2 rounded-lg hover:bg-white/5 text-slate-400">
                            <Sparkles className="w-5 h-5" />
                        </button>
                        <UserButton
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "w-8 h-8 lg:w-9 lg:h-9"
                                }
                            }}
                        />
                    </div>
                </header>
                <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
