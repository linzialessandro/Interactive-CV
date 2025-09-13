# Interactive AI Profile & Chat Assistant

An innovative and dynamic personal portfolio built with React, TypeScript, and Tailwind CSS, featuring a powerful AI chat assistant powered by the Google Gemini API. This project transforms a traditional CV into an interactive experience.

**[➡️ View the Live Demo Here](https://your-live-demo-url.com)** _(<- Be sure to replace this link!)_

![Project Screenshot](https://your-screenshot-url.com) _(<- Add a screenshot of the app's home screen here!)_

---

## About The Project

This project was created to showcase not just my professional experience but also my frontend engineering and AI integration skills. Instead of a static document, this application provides an engaging way to explore my profile. Users can navigate through sections like a standard resume or interact with a custom-trained AI assistant to ask specific questions about my skills, experience, and publications.

The AI is grounded exclusively on my professional data, ensuring its responses are accurate, relevant, and secure.

## Core Features

-   **Dynamic Views:** A smooth, single-page application (SPA) experience for navigating between Home, Experience, Education, Publications, Skills, and a creative AI Art Gallery.
-   **AI-Powered Chat:** A conversational assistant, built with the **Google Gemini API**, that answers questions based on a dynamically generated system prompt from my profile data.
-   **Real-time Streaming:** The AI's responses are streamed token-by-token for a responsive, real-time feel, providing an excellent user experience.
-   **Fully Responsive Design:** A mobile-first approach using **Tailwind CSS** ensures a seamless experience across all devices, from desktops to smartphones.
-   **Modern UI/UX:** Clean aesthetics, subtle animations, and intuitive navigation create a polished and professional user interface.
-   **Component-Based Architecture:** Built with **React** and **TypeScript** for a scalable, maintainable, and type-safe codebase.

## Tech Stack

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **AI:** Google Gemini API (`@google/genai`)
-   **Icons:** Custom SVG components
-   **Hosting:** Google AI Studio

## Key Technical Highlights

This project demonstrates several advanced engineering concepts:

### 1. Gemini Service & System Prompt Generation

The core of the AI interaction lies in `services/geminiService.ts`.

-   **Dynamic System Prompt:** The system instruction for the Gemini model is programmatically generated from the `profileData.ts` object. This ensures the AI is always working with the most up-to-date information without needing manual updates to the prompt itself.
-   **Singleton Chat Instance:** To maintain conversational context, a singleton pattern is used (`getChatInstance`). This ensures that a single chat session is reused throughout the user's interaction, allowing for natural follow-up questions.

### 2. Streaming UI Updates

The chatbot UI in `components/Chatbot.tsx` is designed for an optimal user experience.

-   It leverages the `sendMessageStream` method to receive data from the Gemini API.
-   The React state is updated incrementally as new text chunks arrive (`for await...of`), creating a smooth, "typing" effect rather than waiting for the entire response to be generated.

### 3. Clean and Scalable Architecture

The codebase is organized logically to separate concerns:

-   `components/`: Reusable React components.
-   `data/`: Centralized profile data, acting as a single source of truth.
-   `services/`: Isolated logic for communicating with external APIs (Gemini).
-   `types.ts`: Centralized TypeScript type definitions for robust type safety across the application.

## How To Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/interactive-ai-profile.git
    cd interactive-ai-profile
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up your environment variables:**
    Create a `.env` file in the root of the project and add your Google Gemini API key:
    ```
    API_KEY=your_gemini_api_key_here
    ```
4.  **Start the development server:**
    ```bash
    npm start
    ```

---

Built by Alessandro Linzi. Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/alessandrolinzi).
