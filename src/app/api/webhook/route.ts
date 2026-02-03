import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2024-06-20",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const userId = session.client_reference_id;
        const subscriptionId = session.subscription as string;

        if (!userId) {
            return new NextResponse("No User ID found", { status: 400 });
        }

        // In a real app, update your database here (e.g., Supabase, Prisma)
        console.log(`💰 Payment successful for user ${userId}. Subscription: ${subscriptionId}`);

        // You could also use Clerk's privateMetadata to store subscription status
        // await clerkClient.users.updateUserMetadata(userId, {
        //   publicMetadata: {
        //     isPro: true,
        //     subscriptionId: subscriptionId
        //   }
        // });
    }

    return new NextResponse(null, { status: 200 });
}
