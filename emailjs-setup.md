# EmailJS Setup Guide

To enable email functionality for the registration form, follow these steps:

## 1. Sign up for EmailJS
- Go to [EmailJS.com](https://www.emailjs.com/) and create an account
- Choose a plan (free tier allows 200 emails/month)

## 2. Create an Email Service
- In your EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- Follow the authentication steps
- Note down your **Service ID**

## 3. Create an Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use this template:

**Subject:** New Toad Gang Registration Request
**Content:**
```
New registration request for Toad Gang:

Zora Profile: {{zora_profile}}
User Email: {{user_email}}
From: {{from_name}} ({{from_email}})

Message: {{message}}

Please review and add to the list if they meet the requirements.
```

- Save the template and note down your **Template ID**

## 4. Get Your User ID
- In your EmailJS dashboard, go to "Account" → "API Keys"
- Copy your **Public Key** (User ID)

## 5. Update the Code
In `PurplePondSpheres.jsx`, replace the placeholder values:

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',        // Replace with your actual Service ID
  'YOUR_TEMPLATE_ID',       // Replace with your actual Template ID
  templateParams,
  'YOUR_USER_ID'           // Replace with your actual Public Key
);
```

## 6. Test
- Fill out the registration form
- Check your email (kuzikuu@gmail.com) for the registration request
- Check the browser console for any errors

## Alternative: Use a Different Email Service
If you prefer not to use EmailJS, you can:
- Set up a simple backend API
- Use services like SendGrid, Mailgun, or AWS SES
- Use form services like Formspree or Netlify Forms
