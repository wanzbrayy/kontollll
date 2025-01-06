const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000; // Railway menggunakan variabel PORT jika tersedia

app.use(express.json());

// Menghidangkan file index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    try {
        const { data } = await axios.get("https://meitang.xyz/openai", {
            params: { text: message },
        });
        res.json({ response: data.result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ response: "Failed to fetch response from API." });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
