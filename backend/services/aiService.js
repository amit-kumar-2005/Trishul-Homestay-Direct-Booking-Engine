
import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

// ======================================
// Gemini AI Initialization
// ======================================

const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Please configure it in backend/.env"
    );
  }

  return new GoogleGenAI({ apiKey });
};

// ======================================
// Trishul Homestay Knowledge Base
// ======================================

const HOMESTAY_INFO = `
Property Name:
Trishul Homestay

About:
Trishul Homestay is an eco-friendly direct booking homestay focused on providing a peaceful nature experience with comfortable accommodation and local hospitality.

Services:
- Direct Room Booking
- Eco Tourism Experience
- Comfortable Stay
- Family Friendly Environment
- Nature Experience
- Guest Support

Amenities:
- Comfortable Rooms
- Free Wi-Fi
- Parking Facility
- Clean Washrooms
- Hot Water
- Mountain & Nature View
- Local Food (Subject to Availability)
- Garden / Outdoor Sitting Area

Check-in: 12:00 PM
Check-out: 11:00 AM

Booking Information:
Guests can explore rooms, check availability and submit booking requests through the booking page.

Room Availability:
Real-time availability depends on the booking database.
Never guess availability.

Pricing:
Do not invent prices.
If pricing is unavailable, ask the guest to visit the booking page.

Nearby Attractions:
- Nature Trails
- Scenic Mountain Views
- Local Sightseeing
- Eco Tourism Activities

Important Rules:
- Never invent room availability.
- Never invent room prices.
- Never promise a confirmed booking.
- If information is unavailable, mention that live information is not available.
`;

// ======================================
// System Prompt
// ======================================

const SYSTEM_PROMPT = `
You are the official AI Travel Assistant of Trishul Homestay Direct Booking Engine.

Use the following knowledge while answering users.

${HOMESTAY_INFO}

Behavior Rules:
1. Answer in a friendly, professional and helpful tone.
2. Answer questions about rooms, booking, amenities, check-in,
   check-out, eco tourism and nearby attractions using the supplied information.
3. For live booking data, explain that availability is checked
   through the booking system.
4. Never invent prices, policies, availability or discounts.
5. For unrelated questions, you may answer as a normal AI assistant.
6. Keep answers concise unless the user asks for details.
`;

// ======================================
// Generate AI Response
// ======================================

export const generateAIResponse = async (userPrompt) => {
  try {
    if (typeof userPrompt !== "string" || !userPrompt.trim()) {
      throw new Error("Please enter a question.");
    }

    const ai = getAIClient();

    const finalPrompt = `
${SYSTEM_PROMPT}

User Question:
${userPrompt.trim()}

Answer:
`;
    console.log("AI request using Gemini API key:", Boolean(process.env.GEMINI_API_KEY));
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: finalPrompt,
    });

    if (!response.text) {
      throw new Error("The AI returned an empty response. Please try again.");
    }

    return {
      success: true,
      response: response.text,
    };
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    throw error;
  }
};
