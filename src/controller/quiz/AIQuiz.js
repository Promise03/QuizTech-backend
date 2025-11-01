//  function generateQuiz(chunk) {
//   const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Authorization": Bearer ${process.env.OPENROUTER_API_KEY},
//       "Content-Type": "application/json",
//     //   "HTTP-Referer": "https://yourdomain.com",
//     //   "X-Title": "PDF Summarizer"
//     },
//     body: JSON.stringify({
//        model: "z-ai/glm-4.5-air:free",
//       messages: [
//         {
//           role: "system",
//           content:"You are a helpful assistant that creates educational quizzes."
//         },
//         {
//           role: "user",
//           content: `Create 5 multiple-choice quiz questions from this text. 
//           Format the output as valid JSON like this:
//           [
//             {
//               "question": "What is ...?",
//               "options": ["A", "B", "C", "D"],
//               "answer": "option"
//             }
//           ]

//           Text: ${chunk}`
//         }
//       ]
//     })
//   });

//   const data = await response.json();
//   return data.choices[0].message.content;
// }


import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

export async function generateQuizFromText(text) {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // ✅ fixed env name
        "Content-Type": "application/json",
        // "HTTP-Referer": "https://yourdomain.com",
        // "X-Title": "AI Quiz Generator",
      },
      body: JSON.stringify({
        model: "z-ai/glm-4.5-air:free", // you can swap this for gpt-4o-mini
        messages: [
          {
            role: "system",
            content: "You are an AI that generates 5 multiple-choice questions in JSON format only.",
          },
          {
            role: "user",
            content: `Create 5 multiple-choice quiz questions from this text:
            "${text}"
            Return ONLY a valid JSON array, no extra text, like this:
            [
              {
                "question": "What is ...?",
                "options": ["A", "B", "C", "D"],
                "answer": "A",
                "explanation": "..."
              }
            ]`,
          },
        ],
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    console.log("🧠 Raw AI output:", content);

    if (!content) {
      console.error("❌ AI returned no content");
      return null;
    }

    // 🧹 Clean and parse JSON safely
    const cleaned = content
      .replace(/```json|```/g, "")
      .replace(/^[^{[]*/, "")
      .replace(/[^}\]]*$/, "");

    try {
      const parsed = JSON.parse(cleaned);
      console.log("✅ Parsed quiz:", parsed);
      return parsed;
    } catch (error) {
      console.warn("⚠️ Failed to parse AI JSON:", cleaned);
      return null;
    }
  } catch (error) {
    console.error("❌ Error generating quiz:", error);
    return null;
  }
}
