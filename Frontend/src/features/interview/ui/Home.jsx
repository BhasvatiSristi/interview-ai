import React from 'react';
import '../style/home.scss';

const Home = () => {
  return (
    <main className="interview-home">
      <section className="interview-hero">
        <p className="eyebrow">AI-powered strategy builder</p>
        <h1>
          Create Your Custom <span>Interview Plan</span>
        </h1>
        <p className="subtitle">
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
      </section>

      <section className="interview-card" aria-label="Interview planner preview">
        <div className="card-column left-column">
          <div className="section-header">
            <div>
              <span className="section-badge">1</span>
              <h2>Target Job Description</h2>
            </div>
            <span className="section-meta">Required</span>
          </div>

          <label className="field field-large" htmlFor="jobDescription">
            <span className="sr-only">Target job description</span>
            <textarea
              id="jobDescription"
              name="jobDescription"
              placeholder={'Paste the full job description here...\n\nExample: Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design.'}
            />
            <span className="counter">0 / 5000 chars</span>
          </label>
        </div>

        <div className="divider" aria-hidden="true" />

        <div className="card-column right-column">
          <div className="section-header">
            <div>
              <span className="section-badge">2</span>
              <h2>Your Profile</h2>
            </div>
          </div>

          <div className="profile-upload-group">
            <div className="field-label-row">
              <label htmlFor="resume">Upload Resume</label>
              <span className="section-meta">PDF only</span>
            </div>

            <label className="upload-dropzone" htmlFor="resume">
              <input hidden type="file" id="resume" name="resume" accept=".pdf" />
              <span className="upload-icon" aria-hidden="true">⬆</span>
              <strong>Click to upload or drag & drop</strong>
              <small>PDF or DOCX. Max 10MB.</small>
            </label>
          </div>

          <div className="or-divider" aria-hidden="true">
            <span>OR</span>
          </div>

          <div className="field-group">
            <div className="field-label-row">
              <label htmlFor="selfDescription">Quick Self-Description</label>
            </div>

            <label className="field field-small" htmlFor="selfDescription">
              <textarea
                id="selfDescription"
                name="selfDescription"
                placeholder="Briefly describe your experience, key skills, and years of expertise if you don't have a resume handy..."
              />
            </label>
          </div>

          <div className="tip-banner" role="note">
            <span className="tip-dot" aria-hidden="true" />
            Enter a Resume or a Self-Description to generate a personalized plan.
          </div>
        </div>
      </section>

      <footer className="interview-footer">
        <p>AI-powered strategy generator</p>
        <button className="button primary-button generate-button" type="button">
          Generate My Interview Strategy
        </button>
      </footer>
    </main>
  );
};

export default Home;