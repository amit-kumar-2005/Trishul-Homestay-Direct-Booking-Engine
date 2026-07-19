# PROMPTS.md

# Week 7 – AI Prompt Engineering Log

**Project Name:** Trishul Homestay Direct Booking Engine

**Intern:** Amit Kumar

**Feature:** AI Travel Assistant using Google Gemini API

---

# Objective

The objective of this feature is to provide visitors with an AI-powered travel assistant capable of answering questions related only to Trishul Homestay.

The assistant should:

- Answer questions about the homestay
- Explain amenities
- Provide check-in/check-out information
- Guide users regarding booking
- Suggest nearby attractions
- Never invent room availability or prices

---

# Prompt Variation 1

## Prompt

You are an AI assistant.

Answer the user's question.

## Example Input

Tell me about Trishul Homestay.

## Example Output

General AI response.

## Observation

The model frequently generated generic travel responses.

It sometimes assumed facilities that were not available.

Overall accuracy was not suitable for a production booking website.

---

# Prompt Variation 2

## Prompt

You are a travel assistant for Trishul Homestay.

Answer only questions related to the homestay.

## Example Input

What amenities are available?

## Example Output

The assistant correctly listed amenities such as:

- Mountain View
- Parking
- Free Wi-Fi
- Hot Water
- Garden Area

## Observation

The responses became significantly more accurate.

However, the model occasionally generated assumptions when users asked about pricing.

---

# Prompt Variation 3 (Final)

## Prompt

You are the official AI assistant for Trishul Homestay.

Use only the provided knowledge base.

If information is unavailable, politely tell the user that the information is currently unavailable.

Never invent:

- Prices
- Room availability
- Booking confirmation
- Contact numbers
- Policies that are not provided

Always encourage users to use the Booking Page for real booking enquiries.

## Example Input

Tell me about Trishul Homestay.

## Example Output

Welcome to Trishul Homestay!

We are an eco-friendly homestay offering a peaceful nature experience with comfortable rooms and warm local hospitality.

Amenities include:

- Free Wi-Fi
- Parking
- Mountain View
- Garden Area
- Hot Water
- Local Food (subject to availability)

Check-in:
12:00 PM

Check-out:
11:00 AM

Please visit the Booking page to check real-time availability.

## Observation

This prompt produced the most accurate and consistent responses.

The assistant remained focused on the project domain and avoided generating false information.

This prompt was selected for the final implementation.

---

# Final System Prompt

The production chatbot uses a structured system prompt that:

- Restricts conversations to Trishul Homestay.
- Uses a predefined knowledge base.
- Never invents pricing.
- Never invents room availability.
- Never confirms bookings.
- Provides friendly and concise responses.
- Encourages users to visit the booking page for actual reservations.

---

# Prompt Engineering Summary

Three prompt variations were evaluated.

Variation 1 produced generic AI responses.

Variation 2 improved domain relevance but still generated assumptions in some cases.

Variation 3 successfully constrained the AI using a custom knowledge base and strict response rules. It consistently produced accurate, relevant, and safe responses for the Trishul Homestay booking application.

Therefore, Prompt Variation 3 was selected as the final production prompt.

---

# Technologies Used

- Google Gemini API
- @google/genai
- Node.js
- Express.js
- React
- Tailwind CSS

---

# Status

✅ Prompt engineering completed

✅ Production prompt selected

✅ Integrated into backend AI service

✅ Successfully tested on localhost