# Email Contact Form Setup Guide

## Overview
Your portfolio now has an enhanced contact form that sends messages directly to your email with additional fields to collect more information from visitors.

## New Form Fields Added
1. **Name** - Required
2. **Email** - Required (visitor's email for replies)
3. **Phone** - Optional
4. **Project Subject** - Optional
5. **Project Type** - Optional (dropdown with options)
6. **Budget Range** - Optional (dropdown with budget options)
7. **Message** - Required

## Setup Instructions

### Step 1: Install Dependencies
```bash
npm install express cors dotenv nodemailer concurrently nodemon
```

### Step 2: Configure Environment Variables
Create a `.env` file in your project root (copy from `.env.example`):

```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
PORT=5000
```

### Step 3: Get Gmail App Password
1. Go to [Google Account Settings](https://myaccount.google.com)
2. Navigate to **Security** (left sidebar)
3. Find **App passwords** (requires 2FA enabled)
4. Select **Mail** and **Windows Computer**
5. Copy the generated password and paste in `.env` as `EMAIL_PASSWORD`

### Step 4: Update Vite Configuration
Add a proxy for the API in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

### Step 5: Run the Application
For development with both frontend and backend:
```bash
npm run dev:full
```

Or run separately:
- **Frontend only:** `npm run dev`
- **Backend only:** `npm run server` or `npm run server:dev`

## How It Works

1. User fills out the contact form with their information
2. Form is submitted to the backend API (`/api/send-email`)
3. Backend validates the data and sends an email to your inbox
4. Email includes all form fields in a formatted HTML template
5. User gets a success/error toast notification

## Email Format
When you receive an email, it will look like this:

```
From: [Visitor's Email]
To: [Your Email]
Subject: New Contact Form Submission from [Name]

Name: John Doe
Email: john@example.com
Phone: +91 1234567890
Subject: Website Redesign
Project Type: Web Development
Budget Range: ₹50k - ₹1 Lakh
Message: I'm interested in...
```

## Deployment Notes

### Vercel/Netlify
For serverless deployments, convert `server.js` to an API route:
- Create `/api/send-email.js` (for Vercel)
- Or use Netlify Functions

### Custom Server
If deploying to a VPS/cloud server:
1. Ensure Node.js is installed
2. Use PM2 or systemd to manage the backend process
3. Update your API endpoint in Contact.tsx if needed

## Troubleshooting

### Emails not sending?
- ✅ Check `.env` file has correct credentials
- ✅ Verify Gmail has 2FA enabled
- ✅ Confirm you're using App Password, not regular password
- ✅ Check server is running on `http://localhost:5000`
- ✅ Look at console logs for error details

### CORS errors?
- ✅ Ensure Vite proxy is configured correctly
- ✅ Verify backend server is running
- ✅ Check that API endpoint matches in Contact.tsx

### Port already in use?
```bash
# Kill process using port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change PORT in .env file
```

## Security Tips
- ✅ Never commit `.env` file to git
- ✅ Use App Passwords instead of actual Gmail passwords
- ✅ Sanitize all inputs (already done in server.js)
- ✅ Add rate limiting for production
- ✅ Use environment variables for sensitive data

## Next Steps
- Test the form locally
- Deploy backend before deploying frontend
- Add reCAPTCHA for spam protection
- Consider using a dedicated email service (SendGrid, Mailgun)
