import axios from "axios";

export async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    try {
        const response = await axios.post("http://localhost:3000/api/ai/generate-report", {
            resume,
            selfDescription,
            jobDescription
        }, {
            withCredentials: true
        });

        return response.data;
    } catch (err) {
        throw err;
    }
}
