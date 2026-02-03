"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { generatePortfolioDescription } from "@/actions/portfolio";
import { Sparkles, Layout, RefreshCw } from "lucide-react";

export default function PortfolioAI() {
    const [projectTitle, setProjectTitle] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const content = await generatePortfolioDescription(projectTitle, projectDesc);
            setGeneratedContent(content);
        } catch (error) {
            console.error(error);
            alert("Failed to generate description");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
                <h2 className="text-4xl font-outfit font-bold mb-4">Portfolio <span className="text-gradient">AI</span></h2>
                <p className="text-slate-400">Generate professional, high-impact descriptions for your personal projects.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-card p-8 space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Project Title</label>
                            <input
                                type="text"
                                value={projectTitle}
                                onChange={(e) => setProjectTitle(e.target.value)}
                                placeholder="e.g. Resumate, Crypto Tracker..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Brief Description / Features</label>
                            <textarea
                                value={projectDesc}
                                onChange={(e) => setProjectDesc(e.target.value)}
                                placeholder="What does it do? What tools did you use?"
                                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !projectTitle}
                        className="w-full btn-primary py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isGenerating ? (
                            <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                            <Sparkles className="w-5 h-5" />
                        )}
                        Generate Description
                    </button>
                </div>

                <div className="glass-card p-8 min-h-[400px]">
                    {generatedContent ? (
                        <div className="prose prose-invert prose-sm max-w-none">
                            <div className="whitespace-pre-wrap text-slate-300">
                                {generatedContent}
                            </div>
                            <div className="mt-8 flex gap-3 pt-6 border-t border-white/10">
                                <button className="flex-1 py-2 rounded-lg bg-white/5 text-xs font-bold hover:bg-white/10 transition-colors">
                                    Copy Markdown
                                </button>
                                <button className="flex-1 py-2 rounded-lg bg-white/5 text-xs font-bold hover:bg-white/10 transition-colors">
                                    Save to Profile
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                            <Layout className="w-12 h-12 mb-4" />
                            <p className="text-sm">Enter your project details to generate a premium description.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
