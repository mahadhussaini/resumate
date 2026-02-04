"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, CheckCircle2, AlertCircle, Sparkles, Loader2 } from "lucide-react";
import { optimizeResume } from "@/actions/optimize";

export default function ResumeOptimizer() {
    const [file, setFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState("");
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setIsOptimizing(true);
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("jobDescription", jobDescription);

        try {
            const data = await optimizeResume(formData);
            setResult(data);
        } catch (error) {
            console.error(error);
            alert("Something went wrong during optimization.");
        } finally {
            setIsOptimizing(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center">
                <h2 className="text-4xl font-outfit font-bold mb-4">Resume <span className="text-gradient">Optimizer</span></h2>
                <p className="text-slate-400">Upload your resume and the target job description to get AI-powered feedback.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Input Side */}
                <div className="space-y-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Resume (PDF or Text)</label>
                            <div
                                className={`relative h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 transition-all ${file ? "border-primary bg-primary/5" : "border-white/10 hover:border-white/20 bg-white/5"
                                    }`}
                            >
                                <input
                                    type="file"
                                    accept=".pdf,.txt"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                                {file ? (
                                    <>
                                        <div className="p-3 rounded-full bg-primary/20">
                                            <FileText className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm font-medium text-white">{file.name}</div>
                                            <div className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="p-3 rounded-full bg-white/5">
                                            <Upload className="w-6 h-6 text-slate-400" />
                                        </div>
                                        <div className="text-center px-4">
                                            <div className="text-sm font-medium text-slate-300">Click or drag to upload</div>
                                            <div className="text-xs text-slate-500 mt-1">Accepts PDF and Plain Text</div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Target Job Description (Optional)</label>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the job description here for better tailoring..."
                                className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-slate-300 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!file || isOptimizing}
                            className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isOptimizing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analyzing Resume...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    Optimize Resume
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Results Side */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {!result && !isOptimizing && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full flex flex-col items-center justify-center text-center p-8 glass-card border-dashed min-h-[400px]"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                                    <Sparkles className="w-8 h-8 text-slate-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-400 mb-2">Ready to Analyze</h3>
                                <p className="text-sm text-slate-500 max-w-xs transition-opacity duration-300">
                                    Your AI-powered optimization results will appear here after analysis.
                                </p>
                            </motion.div>
                        )}

                        {isOptimizing && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="w-full flex flex-col items-center justify-center space-y-6 glass-card min-h-[400px]"
                            >
                                <div className="relative">
                                    <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                    <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-primary animate-pulse" />
                                </div>
                                <div className="text-center px-4">
                                    <div className="text-lg font-bold text-white mb-1">Optimizing your future</div>
                                    <div className="text-sm text-slate-400 animate-pulse">Running ATS check | Identifying keywords | Rewriting bullets</div>
                                </div>
                            </motion.div>
                        )}

                        {result && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6 w-full"
                            >
                                <div className="glass-card p-6 border-primary/20 bg-primary/5">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-bold">Optimization Results</h3>
                                        <div className="px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary font-bold text-sm">
                                            Score: {result.score}%
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                Top Missing Keywords
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {result.missingKeywords.map((kw: string, i: number) => (
                                                    <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium">
                                                        {kw}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-primary" />
                                                Optimized Bullet Points
                                            </div>
                                            {result.rewrittenBullets.map((bullet: any, i: number) => (
                                                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                                                    <div className="text-xs text-slate-500 line-through">{bullet.original}</div>
                                                    <div className="text-sm text-white font-medium">{bullet.optimized}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div>
                                            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4 text-yellow-500" />
                                                Skill Gap Analysis
                                            </div>
                                            <ul className="space-y-2">
                                                {result.skillGaps.map((gap: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />
                                                        {gap}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 py-3 rounded-xl border border-white/10 text-sm font-medium hover:bg-white/5 transition-all">
                                        Download PDF
                                    </button>
                                    <button className="flex-1 btn-primary py-3 text-sm font-bold">
                                        Generate Cover Letter
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
