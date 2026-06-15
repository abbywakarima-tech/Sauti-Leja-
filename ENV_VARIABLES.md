# SautiLeja - Environment Variables Guide

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Database Configuration
```
DATABASE_URL=postgresql://username:password@localhost:5432/sauti_leja
```
**Description**: PostgreSQL connection string
**Example**: `postgresql://user:pass123@localhost:5432/sauti_leja`
**How to get**: 
- Install PostgreSQL locally or use a cloud provider (AWS RDS, Heroku Postgres, Railway, etc.)
- Create a database named `sauti_leja`
- Get the connection string from your database provider

---

### Authentication
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
```
**JWT_SECRET Description**: Secret key for signing JWT tokens
**How to generate**: `openssl rand -base64 32`
**Example**: `K7mP9xL2qW5vJ8nR3tB6uY1dF4gH0sZ`

**NEXT_PUBLIC_APP_URL Description**: Your application's public URL
**Local development**: `http://localhost:3000`
**Production**: `https://yourdomain.com`

---

### OpenAI API (For AI Features)
```
OPENAI_API_KEY=sk-your-openai-key-here
```
**Description**: OpenAI API key for transaction extraction and AI insights
**How to get**:
1. Go to https://platform.openai.com/account/api-keys
2. Create a new API key
3. Copy and paste it here
**Required for**: 
- Voice transaction extraction
- AI insights generation
- SautiBot chatbot responses

---

### Payment Processing - Stripe
```
STRIPE_PUBLIC_KEY=pk_test_your-stripe-public-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
```
**Description**: Stripe API keys for payment processing
**How to get**:
1. Sign up at https://stripe.com
2. Go to Dashboard > API keys
3. Copy test keys for development
4. Switch to live keys for production
**Required for**: 
- Plan upgrades
- Payment processing
**Test cards**: 
- Visa: 4242 4242 4242 4242
- Mastercard: 5555 5555 5555 4444
- Exp: Any future date, CVC: Any 3 digits

---

### AWS S3 (For File Storage)
```
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=sauti-leja-production
```
**Description**: AWS credentials for storing audio files and reports
**How to get**:
1. Create AWS account at https://aws.amazon.com
2. Go to IAM > Users
3. Create a new user with S3 access
4. Generate access keys
5. Create an S3 bucket (e.g., `sauti-leja-prod`)
**Required for**: 
- Voice file storage
- Report file hosting
- Avatar/profile image storage

**Available regions**: `us-east-1`, `us-west-2`, `eu-west-1`, `af-south-1` (Africa), etc.

---

### Email Configuration (Optional but Recommended)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@sautileja.com
```
**Description**: Email service for sending password resets and notifications
**How to setup with Gmail**:
1. Enable 2FA on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Select Mail and Windows Computer
4. Generate an app-specific password
5. Use that password in `SMTP_PASSWORD`

**Alternative providers**: SendGrid, Mailgun, AWS SES

---

### M-Pesa Integration (Daraja)
```
MPESA_CONSUMER_KEY=your-m-pesa-consumer-key
MPESA_CONSUMER_SECRET=your-m-pesa-consumer-secret
MPESA_SHORTCODE=your-shortcode
MPESA_PASSKEY=your-passkey
MPESA_ENV=sandbox
```
**Description**: M-Pesa payment gateway integration
**How to get**:
1. Register at https://developer.safaricom.co.ke
2. Create an app for Daraja API
3. Get Consumer Key and Secret
4. Get your Business Shortcode
5. Generate PassKey
**Required for**: 
- M-Pesa payments
**Environments**: `sandbox` (testing) or `production` (live)

---

### Airtel Money Integration
```
AIRTEL_CLIENT_ID=your-airtel-client-id
AIRTEL_CLIENT_SECRET=your-airtel-client-secret
AIRTEL_MERCHANT_ID=your-merchant-id
AIRTEL_ENV=sandbox
```
**Description**: Airtel Money payment gateway
**How to get**:
1. Contact Airtel Money developer support
2. Get API credentials
3. Obtain Merchant ID

---

## Environment Variables by Environment

### Development (.env.local)
```
DATABASE_URL=postgresql://user:password@localhost:5432/sauti_leja
JWT_SECRET=dev-secret-key-change-in-production
NEXT_PUBLIC_APP_URL=http://localhost:3000
OPENAI_API_KEY=sk_test_your_key
STRIPE_PUBLIC_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
AWS_ACCESS_KEY_ID=your_test_key
AWS_SECRET_ACCESS_KEY=your_test_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=sauti-leja-dev
SMTP_HOST=smtp.mailtrap.io
SMTP_USER=dev_email@mailtrap.io
MPESA_ENV=sandbox
AIRTEL_ENV=sandbox
```

### Production (.env.production)
```
DATABASE_URL=postgresql://prod_user:prod_password@prod-host:5432/sauti_leja
JWT_SECRET=generate_secure_random_key_with_openssl
NEXT_PUBLIC_APP_URL=https://sautileja.com
OPENAI_API_KEY=sk_live_your_production_key
STRIPE_PUBLIC_KEY=pk_live_your_production_key
STRIPE_SECRET_KEY=sk_live_your_production_key
AWS_ACCESS_KEY_ID=your_production_key
AWS_SECRET_ACCESS_KEY=your_production_secret
AWS_REGION=af-south-1
AWS_S3_BUCKET=sauti-leja-production
SMTP_HOST=smtp.gmail.com
SMTP_USER=noreply@sautileja.com
MPESA_ENV=production
AIRTEL_ENV=production
```

---

## Quick Start Setup

### 1. Database Setup (PostgreSQL)

**Local Installation:**
```bash
# macOS
brew install postgresql
brew services start postgresql

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start

# Windows
# Download from https://www.postgresql.org/download/windows/
```

**Create Database:**
```bash
psql -U postgres
CREATE DATABASE sauti_leja;
CREATE USER sauti_user WITH PASSWORD 'secure_password_123';
ALTER ROLE sauti_user SET client_encoding TO 'utf8';
ALTER ROLE sauti_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE sauti_user SET default_transaction_deferrable TO on;
GRANT ALL PRIVILEGES ON DATABASE sauti_leja TO sauti_user;
```

**Connection String:**
```
DATABASE_URL=postgresql://sauti_user:secure_password_123@localhost:5432/sauti_leja
```

### 2. JWT Secret Generation

```bash
# Generate secure JWT secret
openssl rand -base64 32

# Output example:
# K7mP9xL2qW5vJ8nR3tB6uY1dF4gH0sZ
```

### 3. OpenAI API Key

1. Visit https://platform.openai.com/account/api-keys
2. Click "Create new secret key"
3. Copy the key and add to `.env.local`

### 4. Stripe Keys

1. Sign up at https://stripe.com
2. Go to Dashboard > API keys
3. Copy test keys (starts with `pk_test_` and `sk_test_`)
4. Add to `.env.local`

### 5. AWS S3 Setup

```bash
# Create IAM user
1. Go to AWS Console > IAM > Users
2. Create new user
3. Attach policy: AmazonS3FullAccess
4. Create access keys

# Create S3 bucket
aws s3 mb s3://sauti-leja-dev --region us-east-1
```

---

## Verifying Your Setup

Run this script to verify all env variables are set:

```bash
#!/bin/bash

echo "Checking environment variables..."

# Required variables
REQUIRED_VARS=("DATABASE_URL" "JWT_SECRET" "NEXT_PUBLIC_APP_URL" "OPENAI_API_KEY" "STRIPE_PUBLIC_KEY" "STRIPE_SECRET_KEY" "AWS_ACCESS_KEY_ID" "AWS_SECRET_ACCESS_KEY")

for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Missing: $var"
  else
    echo "✅ Set: $var"
  fi
done
```

---

## Troubleshooting

### "Database connection error"
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists

### "Invalid JWT Secret"
- Generate a new one: `openssl rand -base64 32`
- Make sure it's at least 32 characters

### "OpenAI API error"
- Verify API key is valid
- Check you have billing set up
- Ensure you haven't exceeded rate limits

### "Stripe error"
- Use test keys (pk_test_, sk_test_) for development
- Verify keys are correct
- Check Stripe account is active

### "AWS S3 error"
- Verify credentials have S3 permissions
- Ensure bucket name is correct
- Check region matches bucket location

---

## Security Best Practices

✅ **DO:**
- Generate strong random secrets (32+ characters)
- Use different secrets for dev/prod
- Rotate secrets regularly
- Store secrets in secure vault (e.g., GitHub Secrets, Vercel Environment Variables)
- Use HTTPS in production
- Keep API keys private

❌ **DON'T:**
- Commit `.env.local` to Git
- Share secrets in chat/email
- Use simple or default secrets
- Mix dev and prod keys
- Expose keys in logs
- Use same secret across environments

---

## Deployment Checklist

Before going to production:

- [ ] Generate new JWT_SECRET for production
- [ ] Switch to production Stripe keys
- [ ] Switch to production OpenAI keys
- [ ] Use production database
- [ ] Set NEXT_PUBLIC_APP_URL to your domain
- [ ] Configure production AWS S3 bucket
- [ ] Set up M-Pesa production credentials
- [ ] Set up email service (Gmail, SendGrid, etc.)
- [ ] Enable HTTPS/SSL certificate
- [ ] Set up backup strategy
- [ ] Configure monitoring and logging

---

## Support

For more information on each service:
- PostgreSQL: https://www.postgresql.org/docs/
- OpenAI: https://platform.openai.com/docs
- Stripe: https://stripe.com/docs
- AWS: https://docs.aws.amazon.com/
- Safaricom Daraja: https://developer.safaricom.co.ke/docs

