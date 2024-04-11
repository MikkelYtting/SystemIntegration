import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
app.use(express.urlencoded({ extended: true }));

// Construct __dirname equivalent for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const uniqueFileName = `${uniquePrefix}__${file.originalname}`;
        cb(null, uniqueFileName);
    }
});

function fileFilter(req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/svg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
        cb(new Error("File type not allowed: " + file.mimetype), false);
    } else {
        cb(null, true);
    }
}

const upload = multer({ storage, fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

app.post("/form", (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.post('/fileform', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send({});
});

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));
