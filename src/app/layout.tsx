import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "Resumate | AI Resume & Portfolio Optimizer",
    description: "Optimize your resume and portfolio with AI. ATS optimization, job matching, and premium cover letters.",
    keywords: ["resume", "portfolio", "AI", "job search", "ATS optimization", "developer portfolio"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const hasClerkKeys = !!publishableKey && publishableKey.startsWith('pk_');

    if (!hasClerkKeys) {
        return (
            <html lang="en" className="dark">
                <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-white flex items-center justify-center min-h-screen bg-[#0a0a0c]`}>
                    <div className="bg-mesh" />
                    <div className="glass-card p-10 max-w-lg text-center border-primary/30 shadow-2xl shadow-primary/10">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">🔑</span>
                        </div>
                        <h1 className="text-3xl font-outfit font-bold mb-4 tracking-tight">API Keys Required</h1>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            To launch <strong>Resumate</strong>, you need to add your Clerk API keys to the <code>.env.local</code> file.
                        </p>

                        <div className="space-y-4">
                            <a
                                href="https://dashboard.clerk.com"
                                target="_blank"
                                className="btn-primary flex items-center justify-center gap-2 w-full py-4 text-base"
                            >
                                Get Keys from Clerk Dashboard
                            </a>
                            <p className="text-xs text-slate-500">
                                After adding the keys, restart the development server.
                            </p>
                        </div>
                    </div>
                </body>
            </html>
        );
    }

    return (
        <ClerkProvider>
            <html lang="en" className="dark">
                <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
                    <div className="bg-mesh" />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
