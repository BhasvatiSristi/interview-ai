const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")


const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY
})

const interviewReportSchema = z.object({
    matchScore: z.number(),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked during the interview."),
        intention: z.string().describe("The intention behind asking this question."),
        answer: z.string().describe("How to answer this question effectively.")
    })).describe("A list of technical questions that may be asked during the interview, along with the intention behind each question and tips on how to answer them effectively."),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The behavioral question can be asked during the interview."),
        intention: z.string().describe("The intention behind asking this question."),
        answer: z.string().describe("How to answer this question effectively.")
    })).describe("A list of behavioral questions that may be asked during the interview, along with the intention behind each question and tips on how to answer them effectively."),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill that the candidate may be lacking."),
        severity: z.enum(["low", "medium", "high"]).describe("The severity of the skill gap.")
    })).describe("A list of potential skill gaps that the candidate may have, along with an assessment of the severity of each gap."),

    preparationPlan: z.array(z.object({
        day: z.string().describe("The day of the preparation plan."),
        focus: z.string().describe("The focus of the preparation for that day."),
        tasks: z.array(z.string()).describe("The specific tasks to be completed on that day.")
    })).describe("A detailed preparation plan for the candidate, outlining specific tasks to be completed each day leading up to the interview, with a focus on addressing identified skill gaps and practicing potential interview questions.")

})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `
        Generate an interview report based on the following information:
        Resume: ${resume}
        Self-Description: ${selfDescription}
        Job Description: ${jobDescription}`
    
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
        config:{
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(interviewReportSchema)
        }
    })

    console.log("Generated Interview Report:", JSON.parse(response.text))
}

module.exports = {
    interviewReportSchema,
    generateInterviewReport,
};