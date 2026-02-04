"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Target, Zap, ChevronRight, FileSearch, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { matchJobDescription } from "@/actions/matcher";

export default function JobMatcher() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [jobUrl, setJobUrl] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            const data = await matchJobDescription(jobDescription);
            setResult(data);
        } catch (error) {
            console.error(error);
            alert("Something went wrong during job matching.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
                <h2 className="text-4xl font-outfit font-bold mb-4">Job <span className="text-gradient">Matcher</span></h2>
                <p className="text-slate-400">See how well your stored resume matches any job description in seconds.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Input Form */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="glass-card p-8 space-y-6 border-primary/20 bg-primary/5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-primary" />
                                Job Title / URL
                            </label>
                            <input
                                type="text"
                                value={jobUrl}
                                onChange={(e) => setJobUrl(e.target.value)}
                                placeholder="e.g. Senior Frontend Engineer at Vercel"
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                <FileSearch className="w-4 h-4 text-primary" />
                                Job Description
                            </label>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the full job description here..."
                                className="w-full h-64 bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none"
                            />
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing || !jobDescription}
                            className="w-full btn-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyzing Match...
                                </>
                            ) : (
                                <>
                                    <Target className="w-5 h-5" />
                                    Check Compatibility
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Results Visualization */}
                <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                        {!result && !isAnalyzing && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center p-12 glass-card border-dashed"
                            >
                                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8">
                                    <Sparkles className="w-10 h-10 text-slate-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-400 mb-3">Analysis Pending</h3>
                                <p className="text-slate-500 max-w-sm">
                                    Upload a job description to see your personalized match score and skill gap analysis.
                                </p>
                            </motion.div>
                        )}

                        {isAnalyzing && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center glass-card"
                            >
                                <div className="relative mb-8">
                                    <div className="w-24 h-24 border-b-4 border-primary rounded-full animate-spin" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Target className="w-10 h-10 text-primary animate-pulse" />
                                    </div>
                                </div>
                                <p className="text-xl font-bold text-white mb-2">Finding Your Fit</p>
                                <p className="text-slate-400 animate-pulse">Scanning keywords | Benchmarking skills | Ranking relevance</p>
                            </motion.div>
                        )}

                        {result && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                {/* Score Header */}
                                <div className="glass-card p-8 border-primary/30 relative overflow-hidden bg-gradient-to-br from-primary/10 to-transparent">
                                    <div className="flex items-center justify-between relative z-10">
                                        <div>
                                            <div className="text-sm font-bold text-primary mb-1 uppercase tracking-widest">Match Score</div>
                                            <div className="text-6xl font-outfit font-extrabold text-white">{result.score}%</div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-lg font-bold mb-1 ${result.score > 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                                                {result.matchLevel}
                                            </div>
                                            <p className="text-sm text-slate-400">Compared to your active resume</p>
                                        </div>
                                    </div>
                                    <div className="mt-8 h-3 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${result.score}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-primary shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                                        />
                                    </div>
                                </div>

                                {/* Detailed Analysis */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="glass-card p-6 border-white/5">
                                        <h4 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                                            Key Match Points
                                        </h4>
                                        <ul className="space-y-3">
                                            {result.highlights.map((point: string, i: number) => (
                                                <li key={i} className="text-xs text-slate-400 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="glass-card p-6 border-white/5">
                                        <h4 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-yellow-400" />
                                            Missing Keywords
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {result.missingSkills.map((skill: string, i: number) => (
                                                <span key={i} className="px-3 py-1.5 rounded-lg bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10">
                                            <div className="text-xs font-bold text-primary mb-2 uppercase">AI Recommendation</div>
                                            <p className="text-xs text-slate-400 leading-relaxed">{result.recommendation}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 btn-primary py-4 text-sm font-bold flex items-center justify-center gap-2">
                                        Optimize Resume for this Job <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
