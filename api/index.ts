import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();

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

    // Tự động nạp dữ liệu vào Não AI (Context Injection)
    const { PRODUCTS } = await import("../src/data/products.ts").catch(() => ({ PRODUCTS: [] }));
    const { ARTICLES } = await import("../src/data/articles.ts").catch(() => ({ ARTICLES: [] }));
    const { BUSINESS_MODEL_STAGES } = await import("../src/data/businessModel.ts").catch(() => ({ BUSINESS_MODEL_STAGES: [] }));
    
    // Đọc thêm config từ file JSON
    let siteConfig = "BiO Station - Chạm để trở về";
    try {
      const fs = await import('fs');
      const path = await import('path');
      const configPath = path.resolve(process.cwd(), "src/data/site_config.json");
      const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      siteConfig = JSON.stringify(configData.brandConfig, null, 2);
    } catch (e) {
      console.log("Could not load site_config.json", e);
    }

    // Tóm tắt dữ liệu sản phẩm để đưa vào prompt
    const productInfo = PRODUCTS.map((p: any) => `- ${p.name} (Giá: ${p.price}đ): ${p.subtitle}`).join('\n');
    const articleInfo = ARTICLES.map((a: any) => `- ${a.title}`).join('\n');
    const businessInfo = BUSINESS_MODEL_STAGES.map((b: any) => `- ${b.title}: ${b.description}`).join('\n');

    const systemInstruction = `
Mày là Tư Vấn Viên AI của BiO Station (Hệ Sinh Thái Bách Mộc).
Slogan: "Chạm để trở về". 

QUY TẮC CỐT LÕI VÀ BẮT BUỘC (STRICT RULES):
1. CHỈ ĐƯỢC PHÉP trả lời dựa trên thông tin được cung cấp trong [KNOWLEDGE BASE] bên dưới.
2. KHÔNG BAO GIỜ được sử dụng kiến thức bên ngoài, không bịa đặt, không tự ý khuyên bảo những thứ không có trong KNOWLEDGE BASE.
3. Nếu khách hàng hỏi bất cứ điều gì KHÔNG CÓ trong [KNOWLEDGE BASE] (ví dụ: giá vàng, thời tiết, sản phẩm hãng khác, code lập trình, v.v.), mày PHẢI từ chối lịch sự bằng câu: "Dạ, hiện tại em chỉ được huấn luyện để hỗ trợ các thông tin về sản phẩm và dịch vụ của BiO Station. Anh/chị có thể liên hệ Hotline hoặc để lại lời nhắn để được hỗ trợ thêm ạ."
4. KHÔNG tự ý giảm giá, KHÔNG tự ý thêm khuyến mãi. Chỉ báo giá chính xác như trong [KNOWLEDGE BASE].
5. Phải luôn xưng hô lịch sự, thân thiện, mang tinh thần "Thuận tự nhiên", xưng "em" và gọi khách là "anh/chị".

=======================
[KNOWLEDGE BASE BẮT ĐẦU]

*** THÔNG TIN THƯƠNG HIỆU ***
${siteConfig}

*** DANH SÁCH SẢN PHẨM ĐANG BÁN ***
${productInfo}

*** BÀI VIẾT VÀ KIẾN THỨC ***
${articleInfo}

*** MÔ HÌNH NHƯỢNG QUYỀN/ĐỐI TÁC ***
${businessInfo}

[KNOWLEDGE BASE KẾT THÚC]
=======================
    `.trim();

    // Construct prompt with history
    const formattedHistory = conversationHistory
      .map((msg: { role: string; content: string }) => `${msg.role === 'user' ? 'Khách hàng' : 'Tư vấn viên'}: ${msg.content}`)
      .join("\n");

    const prompt = formattedHistory
      ? `${formattedHistory}\nKhách hàng: ${message}\nTư vấn viên:`
      : `Khách hàng: ${message}\nTư vấn viên:`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature cho độ chính xác cao, bám sát dữ liệu
      },
    });

    res.json({ reply: response.text || "Dạ, em chưa xử lý được câu hỏi này, anh/chị liên hệ Hotline giúp em nhé." });
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

export default app;
