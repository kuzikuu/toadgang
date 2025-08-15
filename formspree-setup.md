# Formspree Setup Guide (Easier Alternative)

Formspree is a simpler way to handle form submissions without complex setup.

## 1. Sign up for Formspree
- Go to [Formspree.io](https://formspree.io/) and create an account
- Choose a plan (free tier allows 50 submissions/month)

## 2. Create a Form
- In your Formspree dashboard, click "New Form"
- Give it a name like "Toad Gang Registration"
- Copy the form endpoint URL (looks like: `https://formspree.io/f/YOUR_FORM_ID`)

## 3. Update the Code
Replace the current form submission logic in `PurplePondSpheres.jsx` with:

```javascript
// Replace the current handleRegistrationSubmit function with this:
const handleRegistrationSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'kuzikuu@gmail.com', // Your email
        subject: 'New Toad Gang Registration Request',
        zoraProfile: registrationData.zoraProfile,
        userEmail: registrationData.email,
        message: `New Toad Gang registration request from ${registrationData.zoraProfile} (${registrationData.email})`
      })
    });

    if (response.ok) {
      setSubmitted(true);
      setTimeout(() => {
        setShowRegistration(false);
        setSubmitted(false);
        setRegistrationData({ zoraProfile: "", email: "" });
      }, 3000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Registration failed:', error);
    alert('Registration failed. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};
```

## 4. Configure Email Notifications
- In your Formspree form settings, go to "Notifications"
- Set the "To" field to `kuzikuu@gmail.com`
- Customize the email subject and template
- Enable email notifications

## 5. Test
- Fill out the registration form
- Check your email (kuzikuu@gmail.com) for the registration request
- Check the Formspree dashboard for submissions

## Benefits of Formspree
- ✅ No complex setup required
- ✅ Handles spam protection automatically
- ✅ Provides dashboard to view submissions
- ✅ Free tier available
- ✅ Reliable delivery

## Alternative: Use Your Own Backend
If you prefer full control, you can:
- Set up a simple Node.js/Express server
- Use serverless functions (Vercel, Netlify, AWS Lambda)
- Integrate with your existing backend infrastructure
