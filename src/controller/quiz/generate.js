import Document from "../../models/document/document.js";
import Quiz from "../../models/Quiz/quiz.js";
import { generateQuizFromText } from "./AIQuiz.js";
import mongoose from "mongoose";

// 🧠 Helper: Auto-detect tech stack from document text
function detectTechStack(document) {
  const text = (document.title + " " + document.summary).toLowerCase();

  if (text.includes("frontend") || text.includes("react") || text.includes("html") || text.includes("css") || text.includes("javascript")) {
    return "Frontend";
  } else if (text.includes("backend") || text.includes("node") || text.includes("express") || text.includes("mongodb") || text.includes("api")) {
    return "Backend";
  } else if (text.includes("mobile") || text.includes("flutter") || text.includes("android") || text.includes("ios")) {
    return "Mobile Development";
  } else if (text.includes("cloud") || text.includes("aws") || text.includes("azure") || text.includes("gcp")) {
    return "Cloud Computing";
  } else if (text.includes("data") || text.includes("analytics") || text.includes("pandas") || text.includes("numpy")) {
    return "Data Analysis";
  } else if (text.includes("ai") || text.includes("machine learning") || text.includes("neural network") || text.includes("deep learning")) {
    return "AI/Machine Learning";
  } else if (text.includes("cyber") || text.includes("security") || text.includes("hacking") || text.includes("malware")) {
    return "Cyber Security";
  } else if (text.includes("devops") || text.includes("docker") || text.includes("kubernetes") || text.includes("ci/cd")) {
    return "DevOps";
  } else if (text.includes("fullstack")) {
    return "FullStack";
  }

  return "General"; // fallback 
}

// 🧠 Generate AI Quiz from Document
export const generateQuizFromDoc = async (req, res) => {
  try {
    const { id } = req.params;

    // 🗃️ Find the document
    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    // ✅ Use the document summary as the AI text source
    const textToUse = document.summary;
    if (!textToUse || textToUse.trim().length < 10) {
      return res.status(400).json({
        error: "Document summary is missing or too short to generate a quiz.",
      });
    }

    // 🧠 Generate quiz questions from AI
    const quizData = await generateQuizFromText(textToUse);
    if (!quizData) {
      return res.status(500).json({ error: "AI failed to generate quiz" });
    }

    // 🪪 Fake AI user ID
    const aiUserId = new mongoose.Types.ObjectId("000000000000000000000000");

    // 🧩 Pick techStack from document.category or detect it
    const techStack = document.category || detectTechStack(document);

    // 💾 Save quiz
    const quiz = new Quiz({
  techStack,
  difficulty: "Intermediate",
  topic: ["AI Generated"],
  questions: quizData.map((q) => {
    // Convert letter (A/B/C/D) to actual answer text
    let correctAnswerText = q.answer;

    if (["A", "B", "C", "D"].includes(q.answer)) {
      const index = { A: 0, B: 1, C: 2, D: 3 }[q.answer];
      correctAnswerText = q.options[index];
    }

    return {
      questionText: q.question,
      options: q.options,
      correctAnswer: correctAnswerText,
      explanation: q.explanation || "",
    };
  }),
  createdBy: aiUserId,
});


    await quiz.save();

    // 🔗 Optional: link quiz to document
    document.quizId = quiz._id;
    await document.save();

    res.status(201).json({
      message: "✅ Quiz generated successfully from document",
      quiz,
    });
  } catch (error) {
    console.error("❌ Error generating quiz from document:", error);
    res.status(500).json({
      error: "Failed to generate quiz from document",
      details: error.message,
    });
  }
};
