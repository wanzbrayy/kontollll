const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk parse data JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Menyajikan file statis (HTML, CSS, JS) dari folder publik
app.use(express.static(path.join(__dirname, 'home.html')));

// API untuk YouTube MP4/MP3
app.get('/api/youtube', async (req, res) => {
    const { url, format } = req.query;
    if (!url || !format) {
        return res.status(400).json({ error: 'URL dan format (mp4/mp3) diperlukan' });
    }

    try {
        // Gantikan URL API ini dengan API downloader YouTube yang sesuai
        const response = await axios.get(`https://api.example.com/youtube?url=${url}&format=${format}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data' });
    }
});

// API untuk TikTok Downloader
app.get('/api/tiktok', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL TikTok diperlukan' });
    }

    try {
        // Gantikan URL API ini dengan API downloader TikTok yang sesuai
        const response = await axios.get(`https://api.example.com/tiktok?url=${url}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data TikTok' });
    }
});

// API untuk Instagram Downloader
app.get('/api/instagram', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'URL Instagram diperlukan' });
    }

    try {
        // Gantikan URL API ini dengan API downloader Instagram yang sesuai
        const response = await axios.get(`https://api.example.com/instagram?url=${url}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data Instagram' });
    }
});

// Halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
