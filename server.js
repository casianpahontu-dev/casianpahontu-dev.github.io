import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
    const { message } = req.body;

    try {
        const response = await client.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                { role: "system", content: "Ești ChemAI, profesor de chimie." },
                { role: "user", content: message }
            ]
        });

        res.json({ reply: response.choices[0].message.content });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Eroare AI" });
    }
});

app.listen(10000, () => console.log("ChemAI server running"));
