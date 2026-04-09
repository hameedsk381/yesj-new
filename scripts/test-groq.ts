import Groq from "groq-sdk";
import * as dotenv from "dotenv";
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function test() {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: "Say hello!" }],
      model: "llama-3.3-70b-versatile",
    });
    console.log("Response:", chatCompletion.choices[0].message.content);
    console.log("[✓] Groq Connection Successful!");
  } catch (err) {
    console.error("[✗] Groq Connection Failed:", err);
  }
}

test();
