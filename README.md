# LinkedIn Sales Automation Tool 🤖🔗

**LinkedIn Sales Automation Tool** is a comprehensive sales outreach platform designed to streamline LinkedIn prospecting and campaign management. It empowers sales professionals with AI-powered campaign generation, prospect analysis, automated sequencing, and performance tracking to maximize outreach effectiveness.

---

# Live Demo - https://shecare-ai-1-5jqe.onrender.com/

# Demo Video - https://drive.google.com/file/d/14hf4J7hNjpJQ6Lfkwgm3Wma03QS-XO-2/view?usp=drive_link

## 🌟 Features

- 🎯 **Campaign Builder**  
  Create targeted outreach campaigns with AI-generated messaging and prospect lists.

- 📊 **Prospect Analysis**  
  Analyze LinkedIn profiles to identify ideal prospects and generate personalized outreach strategies.

- 🤖 **AI-Powered Messaging**  
  Generate compelling, personalized messages using advanced NLP and AI algorithms.

- 📈 **Campaign Dashboard**  
  Track campaign performance, response rates, and engagement metrics in real-time.

- 🔄 **Automated Sequencing**  
  Set up multi-touch outreach sequences with intelligent follow-up timing.

- 📋 **Profile Analyzer**  
  Deep-dive analysis of prospect profiles to craft highly targeted messaging.

- 🎨 **Modern UI/UX**  
  Clean, intuitive interface with dark/light theme support and responsive design.

- 📱 **Responsive Design**  
  Works seamlessly across desktop, tablet, and mobile devices.

---

## 🧰 Tech Stack

- **Backend**:  
  `FastAPI`, `Pydantic`, `Uvicorn`, `Python-dotenv`, `Email-validator`

- **Frontend**:  
  `React 18`, `Vite`, `Axios`, `React Router DOM`, `Modern CSS`

- **AI Services**:
  - NLP-powered message generation
  - Profile analysis algorithms
  - Intelligent prospect scoring

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <https://github.com/sonamnimje/Linkedin-sales-automation-tool.git>
cd LinkedIn
```

### 2. Backend Setup
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate  # On Windows
pip install -r requirements.txt
```

- **Environment Variables**: Create a `.env` file in `backend/` and include the following:

```env
# API Configuration
FRONTEND_ORIGIN=http://localhost:5173

# Optional: Production Configuration
# DATABASE_URL=your_database_url
# API_KEY=your_api_key
```

- **Run the Backend**:
  ```bash
  cd backend
  python -m uvicorn app.main:app 
  ```
  The API will be available at `http://localhost:8000`.

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
- The frontend will run at `http://localhost:5173`.
- ⚠️ Ensure the backend server is running for full app functionality.

---

## 🔧 API Endpoints

### Health & Status
- `GET /health` — Health check endpoint
- `GET /` — Root endpoint with status message

### Campaign Management
- `POST /api/campaigns/intake` — Submit campaign configuration and receive preview
- `POST /api/campaigns/sequence/start` — Start automated outreach sequence
- `GET /api/campaigns/sequence/stats` — Get sequence performance statistics
- `GET /api/campaigns/metrics` — Retrieve campaign metrics for dashboard
- `POST /api/campaigns/metrics/mock-reply` — Simulate prospect responses for testing

### Authentication (Future)
- `POST /api/auth/signup` — Register new user account
- `POST /api/auth/login` — User authentication
- `GET /api/auth/me` — Get current user information

---

## 📊 Campaign Features

### Campaign Builder
- **Target Audience Definition**: Specify industry, role, company size, and location
- **Message Templates**: AI-generated personalized outreach messages
- **Prospect Lists**: Automated prospect discovery and qualification
- **Campaign Settings**: Configure timing, frequency, and follow-up sequences

### Analytics Dashboard
- **Response Tracking**: Monitor open rates, response rates, and engagement
- **Performance Metrics**: Track conversion rates and campaign ROI
- **A/B Testing**: Test different messaging approaches
- **Real-time Updates**: Live campaign performance monitoring

---

## 🤖 AI Integration

### Natural Language Processing
- **Message Generation**: AI-powered personalized message creation
- **Profile Analysis**: Intelligent prospect profile interpretation
- **Sentiment Analysis**: Optimize messaging tone and approach
- **Response Prediction**: Predict prospect engagement likelihood

### Prospect Scoring
- **Fit Analysis**: Evaluate prospect-company fit based on profile data
- **Engagement Prediction**: Forecast response probability
- **Priority Ranking**: Automatically rank prospects by potential value
- **Behavioral Insights**: Analyze prospect activity patterns

---

## 🚨 Troubleshooting

- **Backend Connection Issues**: Ensure the backend server is running on port 8000
- **CORS Errors**: Check that `FRONTEND_ORIGIN` is set correctly in backend environment
- **API Errors**: Verify all required environment variables are configured
- **Build Issues**: Ensure Node.js and Python versions are compatible
- **Deployment Problems**: Check Render and Vercel logs for specific error messages

---

## 🔮 Future Enhancements

### Planned Features
- **Database Integration**: Persistent data storage with SQLite/PostgreSQL
- **Advanced Analytics**: Enhanced reporting and insights
- **Email Integration**: Direct email campaign management
- **CRM Integration**: Connect with popular CRM platforms
- **Advanced AI**: Enhanced NLP and machine learning capabilities


---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with modern web technologies for optimal performance
- Designed for sales professionals and growth teams
- Inspired by the need for more efficient LinkedIn outreach

---

## 📞 Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation for common solutions

---

## Made with 💼 to revolutionize LinkedIn sales automation.
