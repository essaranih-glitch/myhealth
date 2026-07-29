import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const { symptoms } = await request.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an educational health assistant. You do NOT diagnose. Given the described symptoms, respond ONLY with a JSON object with these keys: reasoning (2-3 sentences on how you are thinking about the symptoms, communicating uncertainty), confidence (a number 0-100), confidenceLabel (one word: Low, Moderate, or High), confidenceReason (1 sentence on why confidence is limited), followUp (one thoughtful follow-up question). Never state a diagnosis.",
      },
      { role: "user", content: symptoms },
    ],
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0].message.content ?? "{}";
  const data = JSON.parse(raw);

  return Response.json(data);
}
