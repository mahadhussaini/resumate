"use server";

import OpenAI from "openai";
import pdf from "pdf-parse";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function optimizeResume(formData: FormData) {
    const file = formData.get("resume") as File;
    const jobDescription = formData.get("jobDescription") as string;

    if (!file) {
        throw new Error("No file uploaded");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let resumeText = "";

    if (file.type === "application/pdf") {
        const data = await pdf(buffer);
        resumeText = data.text;
    } else {
        // For now handle as text, in real apps add .docx support with mammoth
        resumeText = buffer.toString("utf-8");
    }

    const prompt = `
    You are an expert career coach and ATS optimization specialist.
    
    Resume Content:
    ${resumeText}
    
    Target Job Description:
    ${jobDescription || "N/A - General optimization"}
    
    Tasks:
    1. Score the resume against the job description (0-100).
    2. Identify top 5 missing keywords.
    3. Rewrite 3 bullet points to be more impactful (Action + Result).
    4. Suggest 3 skill gap improvements.
    
    Return the response in JSON format:
    {
      "score": number,
      "missingKeywords": string[],
      "rewrittenBullets": { "original": string, "optimized": string }[],
      "skillGaps": string[]
    }
  `;

    const response = await openai.chat.completions.create({
        model: "gpt-4.1-nano",
        messages: [
            { role: "system", content: "You are a professional resume optimizer. Return ONLY JSON." },
            { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result;
}
