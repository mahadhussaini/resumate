"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, FileText, Briefcase, Rocket, ChevronRight, CheckCircle2 } from "lucide-react";

export default function Home() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center border-b border-white/5 bg-black/20 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Rocket className="text-white w-5 h-5" />
                    </div>
                    <span className="font-outfit font-bold text-xl tracking-tight">Resumate</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                    <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                    <Link href="/dashboard" className="btn-primary py-2 px-5 text-sm">Get Started</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    className="text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 tracking-wider uppercase"
                    >
                        <Sparkles className="w-3 h-3" />
                        <span>AI-Powered Career Optimization</span>
                    </motion.div>

                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-outfit font-extrabold mb-6 leading-tight"
                    >
                        Level Up Your <span className="text-gradient">Career</span> <br />
                        With Intelligent Design.
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
                    >
                        Upload your resume and let our AI rewrite your content for ATS optimization,
                        tailor it for specific jobs, and generate stunning portfolios.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/dashboard" className="btn-primary text-lg flex items-center gap-2">
                            Start Free Trial <ChevronRight className="w-5 h-5" />
                        </Link>
                        <button className="px-6 py-3 rounded-xl font-medium border border-white/10 hover:bg-white/5 transition-all">
                            Watch Demo
                        </button>
                    </motion.div>
                </motion.div>

                {/* Hero Visual */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="mt-20 relative"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20" />
                    <div className="glass-card p-4 md:p-8 aspect-[16/9] flex items-center justify-center overflow-hidden">
                        <div className="w-full h-full flex gap-6">
                            <div className="flex-1 glass-card p-6 bg-white/5 flex flex-col gap-4">
                                <div className="h-4 w-3/4 bg-white/10 rounded" />
                                <div className="h-4 w-1/2 bg-white/10 rounded" />
                                <div className="mt-8 space-y-3">
                                    <div className="h-2 w-full bg-white/5 rounded" />
                                    <div className="h-2 w-full bg-white/5 rounded" />
                                    <div className="h-2 w-2/3 bg-white/5 rounded" />
                                </div>
                            </div>
                            <div className="w-1/3 glass-card p-6 border-primary/20 bg-primary/5 flex flex-col gap-4">
                                <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                </div>
                                <div className="h-4 w-full bg-primary/20 rounded" />
                                <div className="h-4 w-2/3 bg-primary/20 rounded" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { label: "Resumes Optimized", value: "50k+" },
                        { label: "Success Rate", value: "94%" },
                        { label: "Average Salary Boost", value: "25%" },
                        { label: "Companies Targeted", value: "10k+" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl font-outfit font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-sm text-slate-400">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features Preview */}
            <section id="features" className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4">Powerful Features</h2>
                        <p className="text-slate-400">Everything you need to land your dream job.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Sparkles className="w-6 h-6 text-primary" />}
                            title="AI Rewriting"
                            description="Instantly convert boring bullet points into punchy, results-oriented achievements."
                        />
                        <FeatureCard
                            icon={<FileText className="w-6 h-6 text-secondary" />}
                            title="ATS Optimization"
                            description="Ensure your resume passes through screening filters with targeted keyword optimization."
                        />
                        <FeatureCard
                            icon={<Briefcase className="w-6 h-6 text-accent" />}
                            title="Job Tailoring"
                            description="Automatically match your skills to specific job descriptions for maximum relevance."
                        />
                    </div>
                </div>
            </section>

            <footer className="py-12 px-6 border-t border-white/5 text-center text-slate-500 text-sm">
                <p>© 2026 Resumate. Built with excellence.</p>
            </footer>
        </main>
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="glass-card p-8 flex flex-col items-start gap-4">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 mb-2">
                {icon}
            </div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-slate-400 leading-relaxed">{description}</p>
        </div>
    );
}
