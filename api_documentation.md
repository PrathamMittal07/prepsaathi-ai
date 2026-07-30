# API Documentation

Base URL: `/api/v1`

## Authentication (`/auth`)

| Method | Route | Auth Req | Request Body | Response | Description |
|---|---|---|---|---|---|
| POST | `/auth/register` | No | `{ email, password, firstName, lastName }` | `{ data: { user, accessToken, refreshToken } }` | Register a new user |
| POST | `/auth/login` | No | `{ email, password }` | `{ data: { user, accessToken, refreshToken } }` | Login user |
| POST | `/auth/refresh` | No | `{ refreshToken }` | `{ data: { accessToken, refreshToken } }` | Refresh JWT tokens |
| GET | `/auth/me` | Yes | None | `{ data: { user } }` | Get current user |
| POST | `/auth/logout` | Yes | None | `{ data: { message } }` | Logout user (invalidates session) |

## Career Profile (`/career`)

| Method | Route | Auth Req | Request Body | Response | Description |
|---|---|---|---|---|---|
| GET | `/career/profile` | Yes | None | `{ data: { profile } }` | Fetch user's career profile (skills, preferences, education) |
| PUT | `/career/profile` | Yes | `{ preferences, skills, education, experience }` | `{ data: { profile } }` | Update user's career profile |
| POST | `/career/coach/chat` | Yes | `{ message, history }` | `{ data: { reply, suggestedActions } }` | Chat with AI Career Coach using Gemini |

## Resumes (`/resumes`)

| Method | Route | Auth Req | Request Body | Response | Description |
|---|---|---|---|---|---|
| GET | `/resumes` | Yes | None | `{ data: [resume] }` | List all uploaded resumes |
| POST | `/resumes` | Yes | `Multipart/Form-Data` (file) | `{ data: { resume } }` | Upload a new PDF resume |
| GET | `/resumes/:id` | Yes | None | `{ data: { resume } }` | Get a specific resume |
| DELETE| `/resumes/:id` | Yes | None | `204 No Content` | Delete a specific resume |

## Resume Analysis (`/resume-analysis`)

| Method | Route | Auth Req | Request Body | Response | Description |
|---|---|---|---|---|---|
| POST | `/resume-analysis/:id/analyze` | Yes | `{ targetRole }` | `{ data: { analysis } }` | Trigger Gemini parsing and analysis |
| GET | `/resume-analysis/:id/result` | Yes | None | `{ data: { analysis } }` | Retrieve the saved analysis results |
| POST | `/resume-analysis/:id/match` | Yes | `{ jobDescription }` | `{ data: { match } }` | Compare resume to a specific JD |
| GET | `/resume-analysis/:id/matches` | Yes | None | `{ data: [match] }` | Get history of JD matches |

## Opportunities & Applications (`/opportunities`, `/applications`)

| Method | Route | Auth Req | Request Body | Response | Description |
|---|---|---|---|---|---|
| GET | `/opportunities` | Yes | None | `{ data: [opportunity] }` | List available jobs |
| GET | `/applications` | Yes | None | `{ data: [application] }` | List user's saved/applied jobs |
| POST | `/applications` | Yes | `{ opportunityId, status }` | `{ data: { application } }` | Save or Apply to a job |
| PATCH | `/applications/:id` | Yes | `{ status, notes }` | `{ data: { application } }` | Update the status of an application |
| DELETE| `/applications/:id` | Yes | None | `204 No Content` | Remove an application from tracking |
