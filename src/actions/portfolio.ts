"use server";

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePortfolioDescription(title: string, description: string) {
    if (!title) {
        throw new Error("Project title is required");
    }

    const prompt = `
    You are an expert technical writer and career coach.
    
    Project Title: ${title}
    Brief Description/Features: ${description}
    
    Task: Generate a high-impact, professional portfolio description in Markdown.
    Include:
    1. A concise overview.
    2. A list of key features/accomplishments.
    3. The potential impact or results.
    
    Return the response as a string of Markdown.
  `;

    const response = await openai.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [
            { role: "system", content: "You are a professional technical writer. Return ONLY Markdown." },
            { role: "user", content: prompt }
        ],
    });

    return response.choices[0].message.content || "";
}
