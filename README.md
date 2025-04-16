# HostIT - Modern Application Deployment Platform

![image](https://github.com/user-attachments/assets/5ef97493-cae4-4180-8adb-f12288017f74)


HostIT is a modern, user-friendly platform that simplifies application deployment through GitHub integration, offering features like one-click deployments, real-time monitoring, and AI-powered assistance.

## ✨ Features

### 🚀 Core Features
- **One-Click Deployments**: Deploy applications instantly with automated setup
- **GitHub Integration**: Seamless connection with your GitHub repositories
- **AI-Powered Assistant**: Get real-time help with deployments and troubleshooting

## 🛠️ Tech Stack

- **Frontend**: React + Vite + TypeScript
- **UI Components**: Tailwind CSS + Framer Motion
- **Authentication**: Clerk
- **AI Integration**: OpenRouter API (Gemini Model)
- **Version Control**: GitHub

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/QusaiSak/Hostit.git
cd hostit
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_OPENROUTER_API_KEY=your_openrouter_key
```

5. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to your preferred platform (e.g., Vercel, Netlify):
```bash
vercel deploy
```

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk authentication public key |
| `VITE_OPENROUTER_API_KEY` | OpenRouter API key for AI assistant |

## 📚 Documentation

For detailed documentation, visit our [Documentation Page](https://your-domain.com/documentation).


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Clerk](https://clerk.dev/) for authentication
- [OpenRouter](https://openrouter.ai/) for AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📞 Support

Need help? Join our [Discord community](https://discord.gg/your-server) or contact us at support@your-domain.com.

---
Made with ❤️ by HostIT
