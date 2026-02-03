"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
});

export async function createCheckoutSession(priceId: string) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthorized");
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: "subscription",
        client_reference_id: userId,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
        metadata: {
            userId: userId,
        }
    });

    if (session.url) {
        redirect(session.url);
    }
}
