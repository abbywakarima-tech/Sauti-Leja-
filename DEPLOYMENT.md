# SautiLeja - Deployment Guide

## Production Deployment Options

### 1. Vercel (Recommended for Next.js)

**Advantages:**
- Zero-config deployment for Next.js
- Automatic HTTPS
- CDN included
- Free tier available
- Simple environment variables setup

**Steps:**

1. Push code to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Add environment variables in Settings > Environment Variables
5. Click Deploy

**Environment Variables to Set:**
```
DATABASE_URL
JWT_SECRET
OPENAI_API_KEY
STRIPE_PUBLIC_KEY
STRIPE_SECRET_KEY
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
AWS_S3_BUCKET
```

---

### 2. Railway

**Advantages:**
- Includes PostgreSQL
- Simple deployment
- Pay-as-you-go pricing
- Good for startups

**Steps:**

1. Sign up at https://railway.app
2. Create new project
3. Connect GitHub repository
4. Add PostgreSQL plugin
5. Set environment variables
6. Deploy

---

### 3. AWS (EC2 + RDS)

**Advantages:**
- Full control
- Scalable
- Enterprise-grade

**Steps:**

1. Create EC2 instance (Ubuntu 22.04)
2. Create RDS PostgreSQL database
3. SSH into EC2
4. Clone repository
5. Install Node.js and dependencies
6. Set environment variables
7. Start application with PM2

```bash
# On EC2 instance
sudo apt update
sudo apt install nodejs npm
git clone <repo-url>
cd sauti-leja
npm install
npm run build

# Install PM2 for process management
npm install -g pm2
pm2 start npm --name sauti-leja -- run start
pm2 save
pm2 startup

# Set up Nginx reverse proxy
sudo apt install nginx
# Configure nginx to proxy port 3000
```

---

### 4. Docker Deployment

**Using Docker Compose locally:**

```bash
# Set environment variables
cp .env.example .env.local

# Start services
docker-compose up -d

# Run migrations
docker-compose exec app npm run db:migrate

# Stop services
docker-compose down
```

**Deploying to Docker Hub:**

```bash
# Build image
docker build -t your-username/sauti-leja:latest .

# Push to Docker Hub
docker push your-username/sauti-leja:latest

# Pull and run
docker pull your-username/sauti-leja:latest
docker run -p 3000:3000 --env-file .env.production your-username/sauti-leja:latest
```

---

### 5. DigitalOcean App Platform

**Advantages:**
- Simple deployment
- Built-in database
- Good pricing

**Steps:**

1. Sign up at https://www.digitalocean.com
2. Create App Platform project
3. Connect GitHub
4. Add environment variables
5. Deploy

---

## Pre-Deployment Checklist

### Security
- [ ] Generate new JWT_SECRET for production
- [ ] Update API keys to production
- [ ] Enable HTTPS
- [ ] Set secure CORS headers
- [ ] Configure authentication properly
- [ ] Review environment variables

### Database
- [ ] Create production database
- [ ] Run migrations: `npm run db:migrate`
- [ ] Set up backups
- [ ] Test database connection
- [ ] Create read replicas if needed

### Performance
- [ ] Run `npm run build` and test
- [ ] Optimize images
- [ ] Enable caching
- [ ] Set up CDN
- [ ] Configure compression

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging
- [ ] Set up alerts
- [ ] Monitor performance
- [ ] Set up status page

### Testing
- [ ] Test all features
- [ ] Test payments (use test API keys first)
- [ ] Test authentication
- [ ] Test file uploads
- [ ] Verify email sending

---

## Environment-Specific Configurations

### Production
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://sautileja.com
DATABASE_URL=postgresql://prod_user:secure_pass@prod-db.example.com:5432/sauti_leja
JWT_SECRET=<secure-random-32-char-string>
# Use live API keys (not test keys)
```

### Staging
```bash
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://staging.sautileja.com
DATABASE_URL=postgresql://staging_user:pass@staging-db:5432/sauti_leja
JWT_SECRET=<secure-random-32-char-string>
# Use test API keys
```

---

## Monitoring & Maintenance

### Error Tracking
```bash
# Install Sentry
npm install @sentry/nextjs
```

### Logging
```bash
# Install Winston for logging
npm install winston
```

### Performance Monitoring
```bash
# Monitor with tools like:
# - New Relic
# - DataDog
# - Prometheus
```

### Database Backups
```bash
# PostgreSQL automated backups
# Set up WAL archiving
# Configure point-in-time recovery
```

---

## Scaling Considerations

As your user base grows:

1. **Database**: Use read replicas, enable connection pooling
2. **Caching**: Implement Redis for sessions and caching
3. **CDN**: Use CloudFlare or AWS CloudFront
4. **Load Balancing**: Distribute traffic across multiple instances
5. **Storage**: Use S3 or similar for file storage
6. **Workers**: Use background job queues (Bull, RQ) for async tasks

---

## Troubleshooting Deployment

### App won't start
```bash
# Check logs
npm run dev  # Test locally first

# Check environment variables
echo $DATABASE_URL

# Verify dependencies
npm install
```

### Database connection errors
```bash
# Test connection
psql $DATABASE_URL

# Run migrations
npm run db:migrate
```

### Out of memory
- Increase instance size
- Optimize queries
- Enable compression
- Clear cache regularly

### High CPU usage
- Profile the app
- Optimize hot paths
- Enable caching
- Scale horizontally

---

## Quick Deploy Commands

### Vercel
```bash
git push origin main
# Automatically deploys
```

### Docker
```bash
docker-compose up -d
```

### AWS EC2
```bash
ss -i key.pem ubuntu@your-instance.com
npm run build && npm run start
```

---

## Support

For deployment help:
- Vercel Docs: https://vercel.com/docs
- Docker Docs: https://docs.docker.com/
- AWS Docs: https://docs.aws.amazon.com/
- Railway Docs: https://docs.railway.app/

