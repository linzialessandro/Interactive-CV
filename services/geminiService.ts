import { GoogleGenAI, Chat } from "@google/genai";
import { profileData } from '../data/profileData';

// This is a critical security measure. The API key must be in an environment variable.
// Do not hardcode the API key here.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

function generateSystemInstruction(data: typeof profileData): string {
    return `You are a highly professional and friendly AI assistant for Alessandro Linzi. Your sole purpose is to answer questions about his professional profile based *only* on the detailed information provided below. Do not invent, speculate, or provide information from external sources. If a question is outside the scope of this data (e.g., personal opinions, unrelated topics), politely state that you can only answer questions about Alessandro's professional profile.

Here is the complete information about Alessandro Linzi:
---
**Name:** ${data.name}
**Title:** ${data.title}
**Professional Summary:** ${data.summary}

**Professional Experience:**
${data.experience.map(job => `
- **Title:** ${job.title}
  **Company:** ${job.company}
  **Period:** ${job.period}
  **Key Responsibilities:**
  ${job.responsibilities.map(r => `  * ${r}`).join('\n')}
`).join('\n')}

**Education:**
${data.education.map(edu => `
- **Degree:** ${edu.degree}
  **Institution:** ${edu.institution}
  **Period:** ${edu.period}
  ${edu.details ? `  **Details:** ${edu.details}` : ''}
`).join('\n')}

**Publications:**
${data.publications.map(pub => `
- **Title:** "${pub.title}"
  **Outlet:** ${pub.outlet}
  **Date:** ${pub.date}
`).join('\n')}

**Skills:**
${Object.entries(data.skills).map(([category, skills]) => `
- **${category}:** ${skills.join(', ')}
`).join('\n')}

**Contact Information:**
- **LinkedIn:** ${data.contact.linkedin}
- **GitHub:** ${data.contact.github}
- **ORCID:** ${data.contact.orcid}
---
Remember, stick strictly to this information. Be concise and professional in your responses.
`;
}


const systemInstruction = generateSystemInstruction(profileData);

let chatInstance: Chat | null = null;

/**
 * Manages a singleton chat instance to maintain conversation history.
 * Creates a new chat session only if one doesn't already exist.
 * @returns {Chat} The active chat instance.
 */
const getChatInstance = (): Chat => {
    if (!chatInstance) {
        chatInstance = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: systemInstruction,
            },
        });
    }
    return chatInstance;
}

/**
 * Sends a user's message to the Gemini API and returns a streaming response.
 * @param {string} message The user's message.
 * @returns A promise that resolves to an async generator yielding response chunks.
 */
export const sendMessageToGeminiStream = async (message: string) => {
    try {
        const chat = getChatInstance();
        const responseStream = await chat.sendMessageStream({ message });
        return responseStream;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        throw new Error("Failed to get response from AI assistant.");
    }
};