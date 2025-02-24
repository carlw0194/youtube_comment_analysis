# Software Requirements Specification (SRS)

## 1. System Design  
- **Overview:**  
  - A cloud-based web app for automated YouTube comment analysis, delivering insights through NLP-driven sentiment analysis and topic clustering.
- **Components:**  
  - **Frontend:** React-based interactive dashboard (with optional Django templates fallback).  
  - **Backend:** Django + Django REST Framework (DRF) for API and business logic.  
  - **Worker Service:** Celery + Redis for asynchronous comment processing.  
  - **Database:** PostgreSQL (hosted on Supabase) for structured data storage.  
  - **Authentication:** OAuth 2.0 with JWT for secure access.

## 2. Architecture Pattern  
- **Monolithic Django Backend:**  
  - Uses Django and DRF to provide a RESTful API with future GraphQL support.
- **Event-Driven Task Processing:**  
  - Celery and Redis manage asynchronous NLP and comment analysis tasks.
- **Microservice Considerations:**  
  - Modular design allowing future extraction of services if necessary.

## 3. State Management  
- **Frontend:**  
  - Use React Context API for simple state management or switch to Redux Toolkit if complexity increases.
- **Backend:**  
  - Stateless API design; session management via JWT tokens.

## 4. Data Flow  
1. **Input:**  
   - User submits a YouTube URL via the frontend.
2. **Data Retrieval:**  
   - Backend calls the YouTube Data API to fetch comments.  
   - Implements retry mechanisms and error notifications if the API fails.
3. **Processing:**  
   - Comments are stored in PostgreSQL and queued for NLP processing via Celery.  
   - NLP service analyzes sentiment and extracts topics.
4. **Output:**  
   - Processed insights are sent back to the frontend for visualization.

## 5. Technical Stack  

### **Frontend (Web Application)**  
- **Framework:** React (with Next.js for potential SSR benefits).  
- **State Management:** React Context API or Redux Toolkit.  
- **UI:** TailwindCSS, Chart.js or Recharts for data visualizations.  
- **HTTP Client:** Axios or Fetch API.

### **Backend (API & Business Logic)**  
- **Framework:** Django with Django REST Framework (DRF).  
- **Authentication:** Django Allauth for OAuth 2.0 and JWT management.  
- **Task Queue:** Celery with Redis for asynchronous processing.

### **Database & Storage**  
- **Database:** PostgreSQL (via Supabase).  
- **Cache:** Redis for session and query caching.  
- **File Storage:** Supabase Storage or AWS S3 (if needed).

### **Machine Learning / NLP**  
- **Libraries:** Hugging Face Transformers (e.g., BERT), TextBlob, or similar tools.  
- **Deployment:** Run NLP tasks as Celery workers.

## 6. Authentication Process  
- **OAuth 2.0:**  
  - Users log in via Google (using Django Allauth).  
  - Manage sessions with JWT tokens, including refresh flows and session timeout handling.  
- **Security:**  
  - Store sensitive tokens securely, enforce HTTPS, and implement proper error logging for auth failures.

## 7. Route Design  

### **Frontend Routes**  
- `/` → Landing Page  
- `/dashboard` → Main dashboard with sentiment charts  
- `/video/:id` → Detailed video analysis view  
- `/settings` → User settings and preferences  

### **Backend API Routes** (`/api`)  
- `POST /analyze` → Submit YouTube URL for analysis  
- `GET /comments/:videoId` → Retrieve processed comments  
- `GET /insights/:videoId` → Retrieve sentiment and topic analysis  
- `POST /auth/login` → OAuth-based login

## 8. API Design  
- **RESTful API:**  
  - Built with DRF, includes standard error responses and rate limiting (using Django Ratelimit).  
  - Supports pagination for large datasets and standardized error message structures.  
- **Logging:**  
  - API errors and exceptions logged via Django’s logging framework.

## 9. Database Design ERD  
**Tables:**  
- `users` (id, email, oauth_token, created_at)  
- `videos` (id, user_id, youtube_id, created_at)  
- `comments` (id, video_id, text, sentiment_score, topic, created_at)  
- `analysis_results` (id, video_id, positive_pct, negative_pct, neutral_pct, recommendations)

### **Additional Considerations:**  
- **Indexing:** Appropriate indexes on video_id, created_at, and sentiment_score for performance.  
- **Backup & Retention:** Regular backups, clear data retention policies, and disaster recovery plans.

## 10. Testing & CI/CD  
- **Testing Strategy:**  
  - Unit tests (pytest for Python), integration tests, and end-to-end tests (Selenium or Cypress for frontend).  
- **CI/CD Pipeline:**  
  - Docker-based development environment with GitHub Actions (or similar) for automated builds, tests, and deployments.
- **Local Environment:**  
  - Use Docker Compose to mirror production environment (Django, Redis, PostgreSQL) locally.

## 11. Logging & Monitoring  
- **Logging:**  
  - Utilize Django’s logging for API and system events.  
- **Monitoring:**  
  - Integrate Sentry or Datadog to track errors and system performance in production.

## 12. Documentation & Diagrams  
- Include architectural diagrams (flow charts, ERDs) in the project documentation repository to visually represent system components and data flows.
