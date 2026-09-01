# 🏦 Vaultora - Secure AI Wealth & Independent Living Ledger

**Vaultora** is a comprehensive, full-stack financial application designed to help users track expenses, manage liquidity, and gain smart financial insights using Artificial Intelligence. 

Built with modern web and mobile technologies, Vaultora provides a seamless cross-platform experience whether you are at your desk or on the go.

---

## ✨ Key Features

- 🔒 **Enterprise-Grade Security**: Seamless and secure authentication powered by **Clerk**.
- 🤖 **Smart AI Insights**: Automated financial analysis and personalized recommendations using **Google Generative AI (Gemini)**.
- 📊 **Advanced Analytics**: Interactive expense trend charts and data visualization.
- 📱 **Cross-Platform**: A responsive web frontend (React) and a native mobile application (React Native / Expo).
- 💾 **Data Portability**: Export your transaction ledger to CSV with a single click.

---

## 🛠️ Tech Stack

### Frontend (Web)
- **Framework**: React.js (Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: TanStack React Query
- **Charts**: Recharts
- **Icons**: Lucide React

### Mobile App
- **Framework**: React Native (Expo)
- **Navigation**: React Navigation (Native Stack)
- **State Management**: TanStack React Query
- **Auth Storage**: Expo Secure Store

### Backend
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **AI Integration**: `@google/generative-ai`

---

## 🚀 Local Setup & Installation

To run Vaultora locally, you will need to configure and start the Backend, Frontend, and Mobile applications.

### Prerequisites
Before you begin, ensure you have the following installed and set up:
- **Node.js** (v18+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas URI)
- **Clerk Account** (For Auth API keys)
- **Google AI Studio Account** (For the Gemini API key)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/vaultora.git
cd vaultora
```

### 2. Backend Setup
The backend serves the API and connects to the database.
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```
Start the backend development server:
```bash
npm run dev
```

### 3. Frontend (Web) Setup
The web application provides the comprehensive desktop dashboard and analytics.
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_BASE_URL=http://localhost:5000
```
Start the Vite development server:
```bash
npm run dev
```

### 4. Mobile App Setup
The Expo mobile app for iOS and Android devices.
```bash
cd ../mobile
npm install
```
Create a `.env` file in the `mobile` directory:
```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
EXPO_PUBLIC_API_URL=http://localhost:5000
```
Start the Expo development server:
```bash
npm start
```
*(From the terminal, press `i` to open in iOS simulator, `a` for Android emulator, or scan the QR code with the Expo Go app on your physical device).*

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📜 License
This project is licensed under the MIT License.
