import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Dr. Berg Health & Keto Center" });
});

// BiO Station AI Advisor Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message string is required." });
      return;
    }

    if (!process.env.GEMINI_API_KEY) {
      res.status(500).json({
        error: "GEMINI_API_KEY is missing on the server. Please check environment variables.",
      });
      return;
    }

    const systemInstruction = `
You are the BiO Station AI Advisor (Tư Vấn Viên Hệ Sinh Thái Bách Mộc - BiO Station: Chạm để trở về).

Brand Identity & Vision:
- Brand Name: BiO Station (Hệ Sinh Thái Bách Mộc)
- Slogan: "Chạm để trở về" | "Trải nghiệm – Bán lẻ – Kết nối Thuận tự nhiên" | "Bách Mộc - Trồng cây Thuận tự nhiên"
- Mission: BiO Station là điểm chạm để mọi người sống thuận tự nhiên hơn mỗi ngày – qua thực phẩm sạch, sản phẩm tử tế và cộng đồng yêu thiên nhiên.
- Core Values (Giá trị cốt lõi):
  1. Đúng: Nguồn gốc rõ ràng, 100% minh bạch chứng nhận & nhật ký nông hộ.
  2. Thật: Sản phẩm thật – thông tin thật, không hóa chất, không quảng cáo thổi phồng.
  3. Thuận tự nhiên: Tôn trọng tự nhiên, canh tác sinh thái, sống hài hòa.

Key Offerings:
1. Gạo hữu cơ Bách Mộc ST25 (lúa tôm sinh thái, thuần tự nhiên, chuẩn BMQ).
2. Nông sản hữu cơ BMQ (Rau củ quả tươi hái trong ngày từ trang trại Lâm Đồng, Củ Chi).
3. Mật ong rừng tự nhiên BiO Honey & Trà thảo mộc Bách Mộc Bát Bảo.
4. Giỏ hàng gia đình BiO Station (gói nông sản sạch trọn tuần cho bữa ăn gia đình).
5. Mô hình 4 giai đoạn phát triển: Station Trung Tâm -> Station Cộng Đồng -> Điểm Đối Tác -> Mạng Lưới Toàn Quốc.

Tone & Style:
- Warm, polite, empathetic, inspiring, knowledgeable about organic agriculture, green lifestyle, and healthy family nutrition.
- Use Vietnamese language naturally.
- Provide clear bullet points and actionable advice for organic living, rice choices, vegetable storage, and BiO Station store franchise/partnerships.
    `.trim();

    // Construct prompt with history
    const formattedHistory = conversationHistory
      .map((msg: { role: string; content: string }) => `${msg.role === 'user' ? 'User' : 'Dr. Berg Advisor'}: ${msg.content}`)
      .join("\n");

    const prompt = formattedHistory
      ? `${formattedHistory}\nUser: ${message}\nDr. Berg Advisor:`
      : message;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text || "I apologize, I couldn't generate a response at this time." });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({
      error: error.message || "An error occurred while processing your query.",
    });
  }
});

// AI Personal Health & Body Type Assessment Endpoint
app.post("/api/quiz-recommendations", async (req, res) => {
  try {
    const { bodyType, primaryGoals, symptoms, activityLevel, fastingHistory } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback structured assessment if key is missing
      res.json({
        bodyTypeSummary: `Your responses strongly indicate an emphasis on the ${bodyType || 'Adrenal'} Body Type.`,
        recommendations: [
          "Consume 7-10 cups of leafy greens & cruciferous vegetables daily.",
          "Implement an 18:6 Intermittent Fasting schedule (Eat between 12 PM - 6 PM).",
          "Drink Apple Cider Vinegar + Lemon water every morning before meals.",
          "Ensure high Potassium intake (4,700 mg/day) using Electrolyte powder."
        ],
        mealPlanHighlights: [
          "Breakfast/Break-fast: 3 pasture-raised eggs, avocado, sauteed spinach in ghee.",
          "Dinner: Grass-fed ribeye steak or wild salmon with roasted broccoli and olive oil drizzle.",
          "Snack: Handful of raw macadamia nuts or celery with almond butter."
        ]
      });
      return;
    }

    const systemInstruction = "You are Dr. Eric Berg's clinical assessment tool. Analyze user symptoms and generate a structured JSON plan.";

    const prompt = `
Generate a tailored Healthy Keto & Intermittent Fasting Plan based on user quiz inputs:
- Dominant Body Type Signal: ${bodyType}
- Goals: ${primaryGoals?.join(", ") || "Weight loss & energy"}
- Key Symptoms: ${symptoms?.join(", ") || "Fatigue, cravings, belly fat"}
- Activity Level: ${activityLevel || "Moderate"}
- Fasting Experience: ${fastingHistory || "Beginner"}

Return a JSON object matching this schema:
{
  "bodyTypeAnalysis": "2-3 sentence explanation of what this body type means and root cause",
  "fastingProtocol": "Recommended fasting window (e.g. 16:8 or 18:6) with optimal eating hours",
  "keyNutrients": ["Nutrient 1", "Nutrient 2", "Nutrient 3"],
  "topFoodToEat": ["Food 1", "Food 2", "Food 3", "Food 4"],
  "foodsToAvoid": ["Food 1", "Food 2", "Food 3"],
  "supplementProtocol": ["Supplement 1 and why", "Supplement 2 and why"],
  "dailyHabitPlan": ["Morning routine step", "Mid-day step", "Evening step"]
}
    `.trim();

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Quiz Recommendations API Error:", error);
    res.status(500).json({
      error: "Failed to generate AI health plan.",
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dr. Berg Health & Keto Center server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
