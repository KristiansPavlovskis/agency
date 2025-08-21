# Simple Email Setup for Your Website

## Option 1: Formspree (Recommended - FREE and EASY)

1. **Go to Formspree**: Visit https://formspree.io and sign up for a free account
2. **Create a new form**: Click "New Form" and give it a name
3. **Get your form ID**: Copy the form ID (it looks like `xrgjqkqw` or similar)
4. **Update your code**: In `agency.html`, find this line:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
   Replace `YOUR_FORM_ID` with your actual form ID
5. **Add your email**: In Formspree settings, add your Gmail address where you want to receive emails
6. **Test it**: Fill out the contact form and submit - you should receive an email!

## Option 2: Simple Mailto Link (No Signup Required)

If you don't want to use Formspree, you can replace the entire contact form with a simple email link:

1. **Find the form**: In `agency.html`, look for the `<form>` element around line 1172
2. **Replace it**: Replace the entire form with this simple link:
   ```html
   <a href="mailto:your-email@gmail.com?subject=Contact Form Message&body=Name: [Name]%0D%0AEmail: [Email]%0D%0APhone: [Phone]%0D%0AMessage: [Message]" class="submit-btn">Send Email</a>
   ```
3. **Update the email**: Replace `your-email@gmail.com` with your actual Gmail address

## What was the old code doing?

The old code was using EmailJS, which required:
- **Service ID**: A service like Gmail, Outlook, etc.
- **Template ID**: An email template you had to create
- **User ID**: Your EmailJS account ID

This was complicated and required multiple signups and configurations.

## The new solution is much simpler!

- **Formspree**: Just one signup, one ID to copy/paste
- **Mailto**: No signup at all, just your email address

Both options will send emails directly to your Gmail account!
