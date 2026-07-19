import { generateAIResponse } from "../services/aiService.js";

// ======================================
// AI Chat Controller
// ======================================

export const chatWithAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate Request
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required.",
      });
    }

    // Generate AI Response
    const result = await generateAIResponse(prompt);

    return res.status(200).json({
      success: true,
      message: "AI response generated successfully.",
      data: result.response,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong.",
    });
  }
};