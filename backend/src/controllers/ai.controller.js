const { GoogleGenAI, Type, Schema } = require("@google/genai");

// Setup the Gemini client
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateReportSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.INTEGER,
            description: "A score from 0 to 100 indicating how well the candidate matches the job description."
        },
        technicalQuestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    intention: { type: Type.STRING },
                    idealAnswer: { type: Type.STRING }
                },
                required: ["question", "intention", "idealAnswer"]
            },
            description: "A list of 5 technical questions based on the job description and the candidate's resume."
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    intention: { type: Type.STRING },
                    idealAnswer: { type: Type.STRING }
                },
                required: ["question", "intention", "idealAnswer"]
            },
            description: "A list of 3-5 behavioral questions."
        },
        skillGaps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING },
                    severity: { 
                        type: Type.STRING, 
                        description: "Severity of the gap: 'High', 'Medium', or 'Low'" 
                    },
                    recommendation: { type: Type.STRING }
                },
                required: ["skill", "severity", "recommendation"]
            },
            description: "Skill gaps between the resume and the job description."
        },
        preparationPlan: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER },
                    focusArea: { type: Type.STRING },
                    tasks: { 
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    }
                },
                required: ["day", "focusArea", "tasks"]
            },
            description: "A 7-day preparation plan."
        }
    },
    required: ["matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
};

async function generateReportController(req, res) {
    try {
        const { resume, selfDescription, jobDescription } = req.body;

        if (!resume || !jobDescription) {
            return res.status(400).json({ message: "Resume and Job Description are required." });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: "AI API Key is missing. Please configure GEMINI_API_KEY." });
        }

        const prompt = `You are an expert technical recruiter and interview coach.
        Analyze the following candidate profile against the provided job description and generate a structured interview preparation report.
        
        Candidate's Self Description:
        ${selfDescription || "Not provided"}

        Candidate's Resume:
        ${resume}

        Target Job Description:
        ${jobDescription}
        
        Please provide a detailed, highly accurate evaluation and preparation plan based strictly on the provided JSON schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: generateReportSchema,
                temperature: 0.7
            }
        });

        // Parse the returned JSON text into an actual JavaScript object
        const reportData = JSON.parse(response.text);

        res.status(200).json({
            message: "Report generated successfully",
            report: reportData
        });

    } catch (error) {
        console.error("AI Report Generation Error:", error);
        res.status(500).json({ 
            message: `AI Error: ${error.message}`, 
            error: error.message 
        });
    }
}

module.exports = {
    generateReportController
};
