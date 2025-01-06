const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk validasi API Key
app.use('/api', (req, res, next) => {
    const apiKey = req.query.apikey || req.headers['x-api-key'];
    if (apiKey !== 'wanzofc') {
        return res.status(401).json({ error: 'API Key tidak valid. Gunakan API Key: wanzofc' });
    }
    next();
});

// Menyajikan file statis dari root folder
app.use(express.static(path.join(__dirname)));

// API untuk YouTube MP4/MP3
app.get('/api/youtube', async (req, res) => {
    const { url, format } = req.query;
    if (!url || !format) {
        return res.status(400).json({ error: 'Parameter "url" dan "format" (mp4/mp3) diperlukan' });
    }

    try {
        const response = await axios.get(`https://yt-api-server.example.com/download?url=${url}&format=${format}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal memproses permintaan YouTube' });
    }
});

// API untuk TikTok Downloader
app.get('/api/tiktok', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'Parameter "url" diperlukan' });
    }

    try {
        const response = await axios.get(`https://tiktok-api-server.example.com/download?url=${url}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal memproses permintaan TikTok' });
    }
});

// API untuk Instagram Downloader
app.get('/api/instagram', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).json({ error: 'Parameter "url" diperlukan' });
    }

    try {
        const response = await axios.get(`https://instagram-api-server.example.com/download?url=${url}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal memproses permintaan Instagram' });
    }
});

// Halaman utama
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});

// Halaman chat
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
        
