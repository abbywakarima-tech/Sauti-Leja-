# SautiLeja - AI-Powered Financial Management Platform

## Overview

SautiLeja is an innovative mobile-first web application designed to empower women entrepreneurs in Kenya and Africa. It provides voice-activated financial management, inventory tracking, AI-powered business insights, and credit-building features.

## Features

### Core Features
- **Voice Transaction Recording**: Record business transactions in English, Kiswahili, or Sheng
- **Manual Transaction Entry**: Enter transactions manually with product details
- **Inventory Management**: Track stock levels and receive restock alerts
- **Financial Reports**: Generate daily, weekly, monthly, and quarterly reports in PDF, Excel, or CSV
- **AI Business Insights**: Get AI-powered recommendations for business growth
- **SautiBot AI Assistant**: Chat with an intelligent business advisor
- **Credit Readiness Scoring**: Build financial records to support loan applications
- **Multilingual Support**: Full support for English, Kiswahili, and Sheng

### Technology Stack
- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT-based authentication
- **AI Integration**: OpenAI API for transaction extraction and insights
- **Payments**: Stripe integration for M-Pesa, Airtel Money, and cards
- **Audio Processing**: WaveSurfer.js for voice recording
- **Reports**: jsPDF and XLSX for document generation

## Pricing Plans

### Free
- KES 0/month
- Manual transaction entry
- Basic dashboard
- Up to 100 transactions/month
- Basic inventory management

### Starter (Most Popular)
- KES 299/month
- Unlimited transactions
- Voice transaction recording
- AI transaction extraction
- Weekly and monthly reports
- Basic AI insights

### Business
- KES 699/month
- Everything in Starter
- Advanced AI insights
- Revenue forecasting
- Credit readiness analysis
- Full SautiBot access
- Advanced analytics

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/abbywakarima-tech/Sauti-Leja-.git
cd Sauti-Leja-

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── signup/            # Sign up page
│   ├── login/             # Login page
│   └── ...                # Other pages
├── components/            # Reusable React components
├── prisma/                # Database schema
├── public/                # Static assets
├── styles/                # Global styles
└── lib/                   # Utility functions
```

## API Documentation

### Authentication
- `POST /api/auth/signup` - Create a new account
- `POST /api/auth/login` - Login to account
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot-password` - Request password reset

### Transactions
- `GET /api/transactions` - Get user transactions
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `POST /api/transactions/voice` - Process voice transaction

### Inventory
- `GET /api/inventory` - Get inventory items
- `POST /api/inventory` - Add inventory item
- `PUT /api/inventory/:id` - Update inventory
- `DELETE /api/inventory/:id` - Remove inventory

### Reports
- `GET /api/reports` - Get user reports
- `POST /api/reports/generate` - Generate new report
- `GET /api/reports/:id/download` - Download report

### Insights
- `GET /api/insights/dashboard` - Get AI insights
- `GET /api/insights/analytics` - Get detailed analytics

### Subscription
- `GET /api/subscription/status` - Get current plan status
- `POST /api/subscription/upgrade` - Upgrade plan
- `POST /api/subscription/downgrade` - Downgrade plan
- `POST /api/subscription/cancel` - Cancel subscription

## Development

### Running Tests
```bash
npm run test
```

### Building for Production
```bash
npm run build
npm run start
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For support, email support@sautileja.com or create an issue on GitHub.

## Roadmap

- [ ] Mobile app (React Native)
- [ ] SMS-based transaction logging
- [ ] Integration with M-Pesa and Airtel Money
- [ ] Advanced credit scoring
- [ ] Business networking features
- [ ] Supplier management
- [ ] Tax calculation assistance

## Team

Built with ❤️ by the SautiLeja Team
