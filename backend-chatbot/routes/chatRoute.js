// chatRoute.js
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

// Pastikan API Key tersedia sebelum inisialisasi
if (!process.env.GEMINI_API_KEY) {
  console.error("FATAL ERROR: GEMINI_API_KEY tidak ditemukan di .env");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Inisialisasi model
const model = genAI.getGenerativeModel({
  model: "models/gemini-2.5-flash",
});

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    // 1. Validasi Input
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        error: "Format pesan tidak valid atau kosong",
      });
    }

    // 2. Kirim permintaan ke Gemini
    const result = await model.generateContent(prompt);

    // 3. Ambil response secara aman
    const response = await result.response;
    const text = response.text();

    // 4. Kirim balik ke client
    res.json({
      success: true,
      reply: text,
    });
  } catch (error) {
    console.error("--- Gemini API Error ---");
    console.error(error.prompt);

    res.status(500).json({
      error: "Gagal memproses permintaan ke AI",
    });
  }
});

module.exports = router;
