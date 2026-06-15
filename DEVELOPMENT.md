# SautiLeja - Development Guide

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abbywakarima-tech/Sauti-Leja-.git
cd Sauti-Leja-
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

4. Setup database:
```bash
npm run db:migrate
```

5. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard page
│   ├── transactions/     # Transaction pages
│   ├── inventory/        # Inventory page
│   ├── reports/          # Reports page
│   ├── insights/         # AI insights page
│   ├── chatbot/          # SautiBot page
│   ├── pricing/          # Pricing page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # Reusable components
├── lib/
│   ├── api.ts            # API utilities
│   ├── utils.ts          # Helper functions
│   └── i18n.ts           # i18n configuration
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static files
```

## Key Features

### Authentication
- Email/Phone login and signup
- JWT-based authentication
- Password reset functionality
- Secure session management

### Transaction Management
- Voice transaction recording (English, Swahili, Sheng)
- Manual transaction entry
- AI-powered data extraction
- Transaction history with search and filters

### Inventory Management
- Add and manage inventory items
- Track stock levels and alerts
- Calculate profit margins
- Monitor sales velocity

### Financial Reports
- Generate daily, weekly, monthly, quarterly reports
- Download in PDF, Excel, CSV formats
- Revenue and transaction analytics

### AI Features
- Business insights and recommendations
- SautiBot AI assistant
- Transaction extraction from voice
- Credit readiness scoring

### Subscription Management
- Free, Starter, Business plans
- Freemium SaaS model
- Payment integration (Stripe)
- Plan upgrade/downgrade

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request password reset

### Transactions
- `GET /api/transactions` - List transactions
- `POST /api/transactions` - Create transaction
- `DELETE /api/transactions/[id]` - Delete transaction
- `POST /api/transactions/voice` - Process voice transaction

### Inventory
- `GET /api/inventory` - List inventory
- `POST /api/inventory` - Add item
- `DELETE /api/inventory/[id]` - Delete item

### Reports
- `GET /api/reports` - List reports
- `POST /api/reports` - Generate report
- `GET /api/reports/[id]/download/[format]` - Download report

### Insights
- `GET /api/insights/dashboard` - Get insights
- `GET /api/subscription/credit-profile` - Get credit profile

### Chatbot
- `POST /api/chatbot` - Send message to SautiBot

## Development Tips

### Testing
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm run start
```

### Database Migrations
```bash
# Create migration
npm run db:migrate create

# Run migrations
npm run db:migrate

# Regenerate Prisma client
npm run db:generate
```

### Linting
```bash
npm run lint
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Docker
```bash
docker build -t sauti-leja .
docker run -p 3000:3000 sauti-leja
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push to GitHub
5. Create a Pull Request

## License

MIT License - see LICENSE file

## Support

For support, email support@sautileja.com or create an issue on GitHub.
