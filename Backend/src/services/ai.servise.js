const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

async function invokegeminiai() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: "Hello gemini, how are you?"
    });

    console.log(response.text);
}

module.exports = invokegeminiai;