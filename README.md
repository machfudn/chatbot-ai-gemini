# ChatBot Gemini AI

Chatbot AI sederhana menggunakan Google Gemini API, Express.js (Backend), dan React, Tailwind CSS (Frontend).

---

# Live Demo

## Backend

- **POST** `https://backned-chatbot-ai-gemini.vercel.app/api/chat`

format :

```bash
POST /api/chat
{
    "prompt":"Jelaskan apa itu React"
}
```
## Frontend 
- [https://frontend-chatbot-ai-gemini.vercel.app/](https://frontend-chatbot-ai-gemini.vercel.app/)

# Tech Stack

## Backend

- Node.js
- Express.js
- Gemini AI
- dotenv
- cors

## Frontend

- React
- Tailwindcss
- Axios
- React Markdown

---

# Struktur Project

```
backend-chatbot
 ┣ routes
 ┃ ┗ chatRoute.js
 ┣ .env
 ┣ .env.example
 ┣ .gitignore
 ┣ index.js
 ┣ package-lock.json
 ┣ package.json
 ┗ vercel.json

frontend-chatbot
 ┣ public
 ┃ ┗ vite.svg
 ┣ src
 ┃ ┣ assets
 ┃ ┃ ┗ react.svg
 ┃ ┣ App.jsx
 ┃ ┣ index.css
 ┃ ┗ main.jsx
 ┣ .gitignore
 ┣ README.md
 ┣ eslint.config.js
 ┣ index.html
 ┣ package-lock.json
 ┣ package.json
 ┗ vite.config.js
```

---

# Instalasi dan Menjalankan Project

## 1. Clone Repository

```bash
git clone https://github.com/username/gemini-ai-chatbot.git
cd gemini-ai-chatbot
```

## 2. Backend Setup

### Masuk ke folder backend

```bash
cd backend-chatbot
```

### Install depedencies

```bash
npm install
```

### Buat file .env

```bash
cp .env.example .env
```

### Sesuaikan isi .env

```bash
PORT=3000
GEMINI_API_KEY=ISI_API_KEY_GEMINI_KAMU
```

#### cara membuat Gemini API Key

1. Buka [https://aistudio.google.com/](https://aistudio.google.com/)
2. Login dengan Google
3. Klik **Get API Key**
4. Copy dan simpan API key ke `.env` **GEMINI_API_KEY**

### Jalankan Backend

```bash
npm run dev
```

atau

```bash
node index.js
```

### backend berjalan di

```bash
http://localhost:3000
```

---

## 3. Frontend Setup

### Masuk ke folder frontend

```bash
cd frontend-chatbot
```

### Intall depedencies

```bash
npm install
```

### sesuaikan isi `src/App.jsx`

```bash
const res = await axios.post(
    "https://backend-chatbot-ai-gemini.vercel.app/api/chat",
    {
        prompt: userMessage,
    }
);
```

menjadi

```bash
const res = await axios.post(
    "http://localhost:3000/api/chat",
    {
        prompt: userMessage,
    }
);
```

### Jalankan frontend

```bash
npm run dev
```

### Frontend berjalan di

```bash
http://localhost:5173
```

---

# Alur Aplikasi

1. User mengetik pesan di frontend
2. Frontend mengirimkan request ke:

```bash
POST http://localhost:3000/api/chat
```

3. Backend memproses dengan **Gemini AI**
4. Response dikirim kembali ke frontend
5. Ditampilkan menggunakn React Markdown

---

# Contoh Request API

```bash
POST /api/chat
{
    "prompt":"Jelaskan apa itu React"
}
```

Response :

```bash
POST /api/chat
{
    "reply":"React adalah ..."
}
```

---

# Catatan Penting

- Jalankan **backend terlebih dahulu**, baru frontend
- Pastikan port backend `3000`

---

# Author

Dibuat oleh Machfudin
