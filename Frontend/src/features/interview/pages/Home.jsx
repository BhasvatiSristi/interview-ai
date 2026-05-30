import React from 'react';
import "../style/home.scss";

const Home = () => {
    return (
        <main className="home">
            <div className="left">
                <textarea name="jobDescription" id="jobDescription" placeholder="Paste the job description here..."></textarea>
            </div>
            <div className="right">
                <div className="input-group">
                    <label htmlFor="resume">Upload Resume</label>
                    <input type="file" id="resume" name="resume" accept=".pdf" />
                </div>
                <div className="input-group">
                    <label htmlFor="selfDescription">Tell us about yourself</label>
                    <textarea name="selfDescription" id="selfDescription" placeholder="Describe your experience and skills..."></textarea>
                </div>
                <button className="generate-btn">Generate Interview Report</button>
            </div>
        </main>
    )
}

export default Home