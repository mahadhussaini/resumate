"use client";

import { motion } from "framer-motion";
import { FileText, Briefcase, Zap, TrendingUp } from "lucide-react";

export default function Dashboard() {
    const stats = [
        { label: "Resumes Optimized", value: "12", icon: FileText, color: "text-blue-400" },
        { label: "Job Applications", value: "48", icon: Briefcase, color: "text-purple-400" },
        { icon: Zap, label: "AI Suggestions", value: "124", color: "text-yellow-400" },
        { icon: TrendingUp, label: "ATS Score Avg", value: "88%", color: "text-green-400" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-outfit font-bold mb-2">Welcome back, Alex!</h2>
                <p className="text-slate-400">Here's how your career optimization is going.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-medium text-slate-500">+12% this week</span>
                        </div>
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-400">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass-card p-6">
                    <h3 className="text-xl font-bold mb-6">Recent Optimizations</h3>
                    <div className="space-y-4">
                        {[
                            { name: "Senior Software Engineer Resume", date: "2 hours ago", score: 92 },
                            { name: "Frontend Developer Portfolio", date: "Yesterday", score: 85 },
                            { name: "System Architect Cover Letter", date: "3 days ago", score: null },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-sm">{item.name}</div>
                                        <div className="text-xs text-slate-500">{item.date}</div>
                                    </div>
                                </div>
                                {item.score && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${item.score}%` }} />
                                        </div>
                                        <span className="text-xs font-bold text-slate-300">{item.score}%</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-6 border-accent/20 bg-accent/5">
                    <h3 className="text-xl font-bold mb-4">Target Job Match</h3>
                    <p className="text-sm text-slate-400 mb-6">Upload a job description to see how well your resume matches.</p>
                    <div className="aspect-square rounded-full border-4 border-white/5 flex flex-col items-center justify-center relative mb-6">
                        <div className="text-4xl font-bold text-white">74%</div>
                        <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">Match Score</div>
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="50%" cy="50%" r="48%" fill="none" stroke="currentColor" strokeWidth="8" className="text-accent" strokeDasharray="300" strokeDashoffset="80" />
                        </svg>
                    </div>
                    <button className="w-full btn-primary py-2.5 text-sm">Improve Match</button>
                </div>
            </div>
        </div>
    );
}
