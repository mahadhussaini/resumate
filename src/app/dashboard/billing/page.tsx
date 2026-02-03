"use client";

import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { createCheckoutSession } from "@/actions/stripe";

export default function BillingPage() {
    const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

    const handleUpgrade = async (priceId: string) => {
        setLoadingPriceId(priceId);
        try {
            await createCheckoutSession(priceId);
        } catch (error) {
            console.error(error);
            alert("Something went wrong with the checkout process.");
        } finally {
            setLoadingPriceId(null);
        }
    };
    const plans = [
        {
            name: "Free",
            price: "$0",
            description: "Perfect for a quick resume check.",
            features: [
                "1 Resume Audit / month",
                "Basic Bullet Point optimization",
                "ATS Keyword Check",
            ],
            current: true,
            buttonText: "Current Plan",
        },
        {
            name: "Power User",
            price: "$19",
            priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || "price_pro_placeholder",
            description: "Best for active job seekers.",
            features: [
                "Unlimited Resume Audits",
                "Unlimited AI Rewriting",
                "Cover Letter Generator",
                "Job Match Analysis",
                "Priority Support",
            ],
            current: false,
            buttonText: "Upgrade to Pro",
            popular: true,
        },
        {
            name: "Enterprise",
            price: "$49",
            priceId: process.env.NEXT_PUBLIC_STRIPE_ENT_PRICE_ID || "price_ent_placeholder",
            description: "For career coaches and recruitment teams.",
            features: [
                "Everything in Pro",
                "Bulk Processing",
                "Custom Branding",
                "Team Collaboration",
            ],
            current: false,
            buttonText: "Contact Sales",
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center">
                <h2 className="text-4xl font-outfit font-bold mb-4">Choose Your <span className="text-gradient">Plan</span></h2>
                <p className="text-slate-400">Unlock the full potential of AI-powered career growth.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, i) => (
                    <div
                        key={i}
                        className={`glass-card p-8 flex flex-col relative ${plan.popular ? "border-primary/50 bg-primary/5" : ""
                            }`}
                    >
                        {plan.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-4xl font-extrabold">{plan.price}</span>
                                <span className="text-slate-500 text-sm">/month</span>
                            </div>
                            <p className="text-sm text-slate-400">{plan.description}</p>
                        </div>

                        <ul className="flex-1 space-y-4 mb-8">
                            {plan.features.map((feature, j) => (
                                <li key={j} className="flex items-center gap-3 text-sm text-slate-300">
                                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-primary" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => plan.priceId && handleUpgrade(plan.priceId)}
                            disabled={plan.current || !!loadingPriceId}
                            className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${plan.current
                                ? "bg-white/5 border border-white/10 text-slate-400 cursor-default"
                                : plan.popular
                                    ? "btn-primary"
                                    : "bg-white text-black hover:bg-white/90"
                                }`}
                        >
                            {loadingPriceId === plan.priceId && <Loader2 className="w-4 h-4 animate-spin" />}
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>

            <div className="glass-card p-8 bg-white/5 border-white/5 text-center">
                <h4 className="text-lg font-bold mb-2">Need a custom plan?</h4>
                <p className="text-sm text-slate-400 mb-6">We offer tailored solutions for universities and bootcamps.</p>
                <button className="text-primary font-bold hover:underline">Talk to our partnership team →</button>
            </div>
        </div>
    );
}
