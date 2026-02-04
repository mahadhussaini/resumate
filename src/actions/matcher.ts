"use server";

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function matchJobDescription(jobDescription: string) {
    if (!jobDescription) {
        throw new Error("Job description is required");
    }

    // In a real app, you would fetch the user's current resume from the DB here
    // For now, we'll ask the AI to assume a general professional profile or use a placeholder
    const prompt = `
    You are an expert career strategist.
    
    Target Job Description:
    ${jobDescription}
    
    Task:
    1. Provide a Match Score (0-100) based on a typical Senior Developer profile (React, Next.js, TypeScript).
    2. Identify 3 Key Match Points.
    3. Identify top missing keywords/skills.
    4. Provide one specific AI recommendation to improve the match.
    
    Return the response in JSON format:
    {
      "score": number,
      "matchLevel": string,
      "highlights": string[],
      "missingSkills": string[],
      "recommendation": string
    }
  `;

    const response = await openai.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [
            { role: "system", content: "You are a job matching expert. Return ONLY JSON." },
            { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result;
}
