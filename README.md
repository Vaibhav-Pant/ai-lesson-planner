# AI-Powered Lesson Planner

## 📌 Overview
This project is a modern web application designed for educators to easily create, edit, and download AI-generated lesson plans. It leverages the **Google Gemini API** to generate structured lesson content and provides a smooth user experience with **ShadCN UI components and TailwindCSS**.

## 🚀 Features
### ✅ **Authentication (Dummy Login)**
- Simple login form (Frontend-only, no backend)
- Credentials: `Email: demouser` | `Password: demopass`
- Redirects users to the lesson planner page after login.

### ✅ **Lesson Plan Generator**
- Users enter lesson details like **Topic, Grade Level, Main Concept, Materials, Learning Objectives, and Outline**.
- **ShadCN Components Used:**
  - **Input, Textarea, Button, Card, Accordion** for structured formatting.
  - **Skeleton Loader** for a smooth AI response loading experience.

### ✅ **AI-Powered Lesson Generation (Google Gemini API)**
- Generates structured lesson plans with **detailed content, classroom activities, and assessment questions**.
- Allows **manual editing** before downloading.
- Proper error handling ensures smooth API interactions.

### ✅ **Download as PDF**
- Converts the lesson plan into a **PDF format** using `react-to-print`.
- Ensures **structured formatting** for clear printing.

### ✅ **Dark Mode Support**
- Users can switch between **dark and light themes** using TailwindCSS.
- Default theme is **dark mode** for a better experience.

### ✅ **Local Storage Integration**
- Retains **lesson plans and user inputs** even after a page refresh.
- Ensures a seamless workflow without losing progress.

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router, TypeScript)
- **UI Components:** ShadCN + TailwindCSS
- **State Management:** React State (`useState`, `useEffect`)
- **AI Integration:** Google Gemini API
- **PDF Handling:** `react-to-print`

## 📖 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/Vaibhav-Pant/ai-lesson-planner.git
cd lesson-planner
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Set Up Environment Variables
Create a `.env.local` file and add your **Google Gemini API Key**:
```sh
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```
### 4️⃣ Run the Project
```sh
npm run dev
```
### 5️⃣ Open in Browser
Navigate to: [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment
### **Deploy on Vercel**
```sh
vercel
```

## 🤝 Contributing
We welcome contributions to improve this project! Follow these steps:
1. **Fork the Repository**
2. **Create a New Branch** (`git checkout -b feature-branch`)
3. **Make Changes & Commit** (`git commit -m "Add new feature"`)
4. **Push Changes** (`git push origin feature-branch`)
5. **Open a Pull Request**

## ⭐ Star the Repository
If you found this project useful, please ⭐ star the repository on GitHub to show your support!
