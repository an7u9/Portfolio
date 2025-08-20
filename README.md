# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, JavaScript, and Node.js backend for contact form functionality.

## Features

- **Modern Dark Theme**: Sleek dark design with gradient accents
- **Responsive Design**: Works perfectly on all devices
- **Interactive Elements**: Smooth animations and hover effects
- **Contact Form**: Functional contact form with email integration
- **Professional Sections**: Hero, About, Skills, Experience, Projects, and Contact

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Email Service**: Nodemailer with Gmail
- **Styling**: Bootstrap 5, Custom CSS with CSS Grid and Flexbox
- **Icons**: Bootstrap Icons

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Email Service

To enable the contact form email functionality, you need to set up Gmail app-specific password:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Navigate to Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update .env file**:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   EMAIL_SERVICE=gmail
   ```

### 3. Run the Application

```bash
npm start
```

The portfolio will be available at `http://localhost:3000` (or the port shown in terminal).

## Project Structure

```
portfolio/
├── portfolio.html          # Main HTML file
├── portfolio.css           # Custom styles
├── portfolio.js            # Frontend JavaScript
├── server.js              # Express server
├── package.json           # Dependencies
├── .env                   # Environment variables
└── api/
    └── send-email.js      # Legacy email handler (not used)
```

## Contact Form Features

- **Client-side Validation**: Real-time form validation
- **Server-side Processing**: Secure email handling
- **Error Handling**: Comprehensive error messages
- **Loading States**: Visual feedback during submission
- **Success Notifications**: Confirmation messages

## Customization

### Personal Information
Update the following in `portfolio.html`:
- Name and title in the hero section
- About me content
- Experience timeline
- Project showcases
- Contact information

### Styling
Modify `portfolio.css` to customize:
- Color scheme (CSS variables in `:root`)
- Typography
- Layout and spacing
- Animations and effects

### Email Configuration
Update `.env` file with your email credentials for the contact form to work.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- **Optimized Images**: Responsive images with proper sizing
- **Minified Assets**: Compressed CSS and JavaScript
- **Smooth Animations**: Hardware-accelerated CSS animations
- **Fast Loading**: Optimized resource loading

## Security Features

- **Input Validation**: Both client and server-side validation
- **CORS Protection**: Configured CORS policies
- **Environment Variables**: Sensitive data in .env file
- **Error Handling**: Secure error messages

## Deployment

The portfolio can be deployed to various platforms:

### Vercel/Netlify (Static + Serverless)
- Deploy the frontend as static files
- Use serverless functions for the contact form

### Heroku/Railway (Full Stack)
- Deploy the entire Node.js application
- Set environment variables in the platform

### Traditional Hosting
- Upload files to web server
- Ensure Node.js support for the backend

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues or questions, please contact [findme.ifuca9@gmail.com](mailto:findme.ifuca9@gmail.com).