import api from "./api";

// ======================================
// AI Chat Service
// ======================================

export const sendMessageToAI = async (prompt) => {
  try {
    const response = await api.post("/ai/chat", {
      prompt,
    });

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to connect with AI Assistant.",
      }
    );
  }
};