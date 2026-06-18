import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    try {
        const response = await axios.post(`${API_URL}/ai/generate-report`, {
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
