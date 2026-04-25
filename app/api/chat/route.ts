export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { homepageData, aboutPageData } from "@/lib/data/site-content";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ 
        response: "I'm sorry, my API key is not configured. Please add GROQ_API_KEY to the environment variables." 
      });
    }

    const systemPrompt = `
      You are the YESJ Assistant, a helpful and friendly AI representative for YESJ (Youth Empowering Service - Jesuits).
      Your goal is to help youth, donors, and community members learn about YESJ's mission, programs, and impact in Andhra Pradesh and Telangana.

      Key Information about YESJ:
      - Founder & Director: Fr. Bala Bollineni, SJ.
      - Official Name: Youth Empowering Service - Jesuits (YES-J).
      - Core Mission: Channeling the talents of disadvantaged youth (dropouts and students in need) to realize their potential.
      - Core Goals: Fostering "The 4 Cs" — Conscience, Competence, Compassion, and Commitment.
      - Affiliation: A ministry of the Andhra Jesuit Province of the Society of Jesus.
      - Headquarters: YES-J Centre for Excellence, Andhra Loyola College Campus, Vijayawada.
      - History: Established in 2016 at ALC Vijayawada.
      - Key Partnership: Works closely with AICUF (All India Catholic University Federation) for student leadership.
      
      Programs Mentioned on Site:
      - Summer Shapes: Flagship residential initiative for English communication, personality, and life skills.
      - MAGIC Youth: (Men and Women Aiming at Greater Initiatives for Change) — The student youth wing for leadership and social awareness.
      - Each One – Teach Ten (EOTT): Student mentors called "Ignitors" provide educational support in slums and rural areas.
      - Scholar Support Programme (SSP): Financial assistance for gifted but marginalized students.
      - Spiritual Programs: "O GOD" (Organizing God-Oriented Days) — retreats and interfaith dialogue.
      - Other Programs: MuST (Multi-Skill Training), PEP, VIP, Sthri, JoY Desk, MAGIS.

      Context from Website:
      ${JSON.stringify(homepageData, null, 2)}
      ${JSON.stringify(aboutPageData, null, 2)}

      Instructions:
      - Be encouraging, professional, and empathetic.
      - Use information from the context above whenever possible.
      - If you don't know something, suggest they contact the team via the contact form or email info@yesj.in.
      - Keep responses relatively concise but informative.
      - Mention that YESJ operates in the Telugu States (Andhra Pradesh and Telangana).
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      model: "llama-3.3-70b-versatile", // Use a high-quality model
      temperature: 0.7,
      max_tokens: 500,
    });

    return NextResponse.json({ 
      response: chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response." 
    });
  } catch (error) {
    console.error("Groq Chat Error:", error);
    return NextResponse.json({ 
      error: "Failed to process chat request",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
