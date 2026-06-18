import React, { useState } from 'react';
import { generateInterviewReport } from '../services/ai.api';
import './interviewPrep.scss';

const InterviewPrep = () => {
    const [resume, setResume] = useState('');
    const [selfDescription, setSelfDescription] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState(null);
    const [error, setError] = useState(null);

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setReport(null);

        try {
            const data = await generateInterviewReport({ resume, selfDescription, jobDescription });
            setReport(data.report);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate report. Ensure your API key is correct.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="interview-prep-page">
            <header className="prep-header">
                <h1>AI Interview Coach</h1>
                <p>Generate a tailored interview preparation plan based on your resume and target job.</p>
            </header>

            {!report && (
                <div className="form-container prep-form">
                    <form onSubmit={handleGenerate}>
                        <div className="input-group">
                            <label>Self Description (Optional)</label>
                            <textarea 
                                placeholder="E.g. I am a junior frontend developer with 1 year of React experience..." 
                                value={selfDescription} 
                                onChange={(e) => setSelfDescription(e.target.value)} 
                                rows="3"
                            />
                        </div>

                        <div className="input-group">
                            <label>Your Resume (Paste Text)*</label>
                            <textarea 
                                placeholder="Paste the text content of your resume here..." 
                                value={resume} 
                                onChange={(e) => setResume(e.target.value)} 
                                required 
                                rows="6"
                            />
                        </div>

                        <div className="input-group">
                            <label>Target Job Description*</label>
                            <textarea 
                                placeholder="Paste the job description of the role you are applying for..." 
                                value={jobDescription} 
                                onChange={(e) => setJobDescription(e.target.value)} 
                                required 
                                rows="6"
                            />
                        </div>

                        {error && <div className="error-box">{error}</div>}

                        <button type="submit" disabled={loading} className="generate-btn">
                            {loading ? "Generating Report (This takes a few seconds)..." : "Generate Prep Plan"}
                        </button>
                    </form>
                </div>
            )}

            {loading && (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <h2>Our AI is analyzing your profile...</h2>
                    <p>Comparing your skills to the job requirements and crafting personalized questions.</p>
                </div>
            )}

            {report && !loading && (
                <div className="report-dashboard">
                    <div className="score-section">
                        <h2>Candidate Match Score: {report.matchScore}%</h2>
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: `${report.matchScore}%` }}></div>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        <section className="report-card">
                            <h3>Technical Questions</h3>
                            <div className="question-list">
                                {report.technicalQuestions?.map((q, idx) => (
                                    <div key={idx} className="q-item">
                                        <strong>Q: {q.question}</strong>
                                        <div className="q-details">
                                            <p><em>Intention:</em> {q.intention}</p>
                                            <p><em>Ideal Answer:</em> {q.idealAnswer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="report-card">
                            <h3>Behavioral Questions</h3>
                            <div className="question-list">
                                {report.behavioralQuestions?.map((q, idx) => (
                                    <div key={idx} className="q-item">
                                        <strong>Q: {q.question}</strong>
                                        <div className="q-details">
                                            <p><em>Intention:</em> {q.intention}</p>
                                            <p><em>Ideal Answer:</em> {q.idealAnswer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="report-card">
                            <h3>Identified Skill Gaps</h3>
                            <ul className="gap-list">
                                {report.skillGaps?.map((gap, idx) => (
                                    <li key={idx}>
                                        <span className={`severity ${gap.severity.toLowerCase()}`}>{gap.severity}</span>
                                        <strong>{gap.skill}</strong>: {gap.recommendation}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="report-card prep-plan-card">
                            <h3>7-Day Preparation Plan</h3>
                            <div className="timeline">
                                {report.preparationPlan?.map((plan, idx) => (
                                    <div key={idx} className="timeline-item">
                                        <div className="day-badge">Day {plan.day}</div>
                                        <div className="plan-content">
                                            <h4>{plan.focusArea}</h4>
                                            <ul>
                                                {plan.tasks?.map((task, i) => <li key={i}>{task}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <button className="reset-btn" onClick={() => setReport(null)}>Generate New Report</button>
                </div>
            )}
        </div>
    );
};

export default InterviewPrep;
