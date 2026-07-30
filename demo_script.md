# Prep2Place Demo Script

**Target Audience:** Engineering Manager, Technical Recruiter, or Interview Panel
**Estimated Time:** 3-5 minutes

## 1. Introduction (0:30)
*“Welcome to Prep2Place, an intelligent career management platform designed for students and new grads. Today, I’ll show you how a user goes from registering to getting AI-driven feedback and finally applying for their target role.”*

## 2. Onboarding & Profile (0:45)
1. **Action:** Navigate to the registration page and create a new account.
2. **Action:** Log in. The dashboard will show empty states.
3. **Action:** Go to Settings -> Career Profile.
4. **Talk Track:** *“First, the user sets up their profile. They input their target roles—like 'Frontend Engineer'—and their current skills. This data forms the baseline context for our AI features.”*

## 3. Resume Upload & Analysis (1:00)
1. **Action:** Navigate to the Resume page.
2. **Action:** Upload a sample PDF resume. Wait for the processing to finish.
3. **Action:** Show the Analysis Results (ATS Score, Strengths, Weaknesses).
4. **Talk Track:** *“Our Express backend parses the PDF and securely hands the text off to the Google Gemini API. Gemini acts as a Senior Technical Recruiter, giving the user an instant ATS score, identifying missing skills, and suggesting actionable improvements.”*

## 4. Job Matching & The Pipeline (1:00)
1. **Action:** Navigate to the Opportunities page (Discover Tab).
2. **Talk Track:** *“Notice how jobs are sorted. This isn't random; it's a transparent, rule-based recommendation engine. Jobs requiring skills that match the user's profile are bumped to the top.”*
3. **Action:** Click "Compare Resume" on a specific job. Show the Match Score and gaps.
4. **Action:** Click "Save" on one job, and "Apply" on another.
5. **Action:** Switch to the "My Applications" tab.
6. **Talk Track:** *“Users can actively track their pipeline here. Changing a status from 'Applied' to 'Interviewing' updates the Postgres database instantly.”*
7. **Action:** Navigate back to the Dashboard to show the populated metrics (Saved Jobs, Applications).

## 5. AI Career Coach (0:45)
1. **Action:** Navigate to the AI Career Coach page.
2. **Action:** Click the "How can I improve my resume?" suggestion pill.
3. **Talk Track:** *“Finally, we have the AI Coach. Instead of complex, brittle agent architectures, this uses a heavily contextualized system prompt. The backend automatically injects the user's Resume Analysis, Profile Skills, and Match History into the context window before Gemini answers, ensuring the advice is deeply personalized and actionable.”*

## 6. Conclusion (0:15)
*“That concludes the flow. The app uses Next.js, Tailwind, Node/Express, Prisma, and Gemini to create a seamless, end-to-end placement preparation tool. I’d be happy to dive into the codebase or architectural decisions now.”*
