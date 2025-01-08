const express = require("express");
const axios = require("axios");
const path = require("path");
const multer = require("multer");
const app = express();

const PORT = process.env.PORT || 3000; // Railway menggunakan variabel PORT jika tersedia

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Folder untuk media dan statis

// Menyimpan file media (audio/video) menggunakan Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Menyediakan file index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Menambahkan fitur kustomisasi chatbot (Nama dan Avatar)
let chatbotSettings = {
    name: "MICHEL - AI",
    avatar: "/images/default-avatar.jpg", // Gambar avatar default
};

app.post("/api/customize-chatbot", (req, res) => {
    const { name, avatar } = req.body;
    if (name) chatbotSettings.name = name;
    if (avatar) chatbotSettings.avatar = avatar;
    res.json({ message: "Chatbot customized successfully", settings: chatbotSettings });
});

// Endpoint untuk menampilkan dashboard admin (statistik dasar)
let conversationHistory = []; // Menyimpan riwayat percakapan

app.get("/admin/dashboard", (req, res) => {
    res.json({
        totalConversations: conversationHistory.length,
        latestConversations: conversationHistory.slice(-5), // Menampilkan 5 percakapan terakhir
    });
});

// Endpoint untuk menerima dan mengirim media (audio/video)
app.post("/api/upload-media", upload.single("media"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No media file uploaded." });
    }
    res.json({ message: "Media uploaded successfully", file: req.file });
});

// Endpoint untuk chat dengan chatbot
app.post("/api/chat", async (req, res) => {
    const { message } = req.body;
    try {
        const { data } = await axios.get("https://meitang.xyz/openai", {
            params: { text: message },
        });
        // Simpan percakapan
        conversationHistory.push({ message, response: data.result });
        res.json({ response: data.result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ response: "Failed to fetch response from API." });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
