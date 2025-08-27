# Therynox - Web Development Agency Website

A modern, responsive website for Therynox, a professional web development agency. This project showcases the agency's services, portfolio, and provides a contact system for potential clients.

## 🌟 Project Overview

Therynox is a comprehensive web development agency website built with HTML, CSS, JavaScript, and PHP. The website features a modern design with smooth animations, responsive layout, and a complete contact management system with admin dashboard.

## ✨ Features

### Frontend Features
- **Modern Responsive Design** - Mobile-first approach with beautiful UI/UX
- **Smooth Animations** - Scroll-triggered animations and interactive elements
- **Hero Section** - Eye-catching landing area with call-to-action buttons
- **Services Showcase** - Detailed presentation of web development services
- **Portfolio Gallery** - Display of UI designs and completed projects
- **Contact Form** - Integrated contact system with form validation
- **WhatsApp Integration** - Direct messaging through WhatsApp Business
- **Navigation** - Smooth scrolling navigation with hamburger menu for mobile

### Backend Features
- **Contact Management System** - Store and manage client inquiries
- **Admin Dashboard** - Complete admin panel for managing submissions
- **Email Notifications** - Automated email notifications for new contacts
- **Database Integration** - MySQL database with proper indexing
- **Security Features** - Form validation, rate limiting, and SQL injection protection

### Technical Features
- **Cross-browser Compatibility** - Works on all modern browsers
- **SEO Optimized** - Proper meta tags and semantic HTML
- **Performance Optimized** - Optimized images and efficient code
- **Accessibility** - WCAG compliant design elements

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: PHP 7.4+
- **Database**: MySQL 5.7+
- **Styling**: Custom CSS with modern design principles
- **Icons**: Font Awesome 6.5.1
- **Fonts**: Google Fonts (Poppins)
- **Animations**: Custom JavaScript animations

## 📁 Project Structure

```
Therynox/
├── index.html                 # Main website page
├── style.css                  # Main stylesheet
├── image-fixes.css           # Additional styling for images
├── carousel.js               # Carousel/slider functionality
├── navbar.js                 # Navigation menu functionality
├── scroll-animations.js      # Scroll-triggered animations
├── contact-form.js           # Contact form handling
├── process-contact.php       # Contact form processing
├── config/
│   └── database.php          # Database configuration
├── admin/                    # Admin panel
│   ├── index.php            # Admin dashboard
│   ├── login.php            # Admin login
│   ├── logout.php           # Admin logout
│   ├── check-contact.php    # Contact management
│   ├── delete-contact.php   # Delete contacts
│   └── toggle-contact-status.php # Update contact status
├── database.sql             # Database schema
├── setup-admin.php          # Admin setup script
├── test-db.php              # Database testing script
├── UI designs/              # Portfolio images and designs
└── Assets/                  # Images and media files
```

## 🚀 Installation & Setup

### Prerequisites
- Web server (Apache/Nginx) with PHP 7.4+
- MySQL 5.7+ database
- PHP extensions: PDO, PDO_MySQL, mbstring

### Step 1: Clone/Download the Project
```bash
# Clone the repository or download the ZIP file
git clone [repository-url]
cd Therynox
```

### Step 2: Database Setup
1. Create a MySQL database
2. Import the database schema:
```bash
mysql -u username -p database_name < database.sql
```

### Step 3: Configure Database Connection
Edit `config/database.php` and update the database credentials:
```php
private $host = 'localhost';
private $db_name = 'your_database_name';
private $username = 'your_username';
private $password = 'your_password';
```

### Step 4: Configure Email Settings
Update the email configuration in `config/database.php`:
```php
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your-email@gmail.com');
define('SMTP_PASSWORD', 'your-app-password');
define('SMTP_FROM_EMAIL', 'your-email@gmail.com');
define('SMTP_FROM_NAME', 'Therynox Agency');
```

### Step 5: Set Up Admin Account
Run the admin setup script:
```bash
php setup-admin.php
```
Or manually create an admin user in the database.

### Step 6: Configure Web Server
Ensure your web server is configured to serve PHP files and has proper permissions.

## 📧 Contact Form Configuration

The contact form includes:
- Name, email, phone validation
- Project type selection
- Message field
- Rate limiting (10 submissions per hour)
- Email notifications
- Admin dashboard integration

## 🔐 Admin Dashboard

### Access
- URL: `your-domain.com/admin/`
- Default credentials: Check the database or setup script

### Features
- View all contact submissions
- Mark submissions as read/unread
- Delete submissions
- View submission statistics
- Export data (if implemented)

## 🎨 Customization

### Colors and Styling
Edit `style.css` to customize:
- Color scheme
- Typography
- Layout spacing
- Animation effects

### Content Updates
- Update hero section text in `index.html`
- Modify services in the services section
- Add/remove portfolio items
- Update contact information

### Adding New Features
- JavaScript files are modular for easy extension
- PHP backend is structured for scalability
- Database schema supports additional fields

## 🔧 Maintenance

### Regular Tasks
- Monitor contact submissions
- Update portfolio with new projects
- Check email notifications
- Backup database regularly
- Update dependencies

### Security Considerations
- Keep PHP and MySQL updated
- Use HTTPS in production
- Regularly backup data
- Monitor for spam submissions
- Implement CAPTCHA if needed

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

This project is proprietary to Therynox Agency. All rights reserved.

## 🤝 Support

For technical support or questions:
- Email: therynox28@gmail.com
- WhatsApp: +91 8287445741
- Website: https://therynox.com

## 📈 Future Enhancements

Potential improvements:
- Blog system
- Client testimonials
- Project case studies
- Online quote calculator
- Live chat integration
- Multi-language support
- Advanced analytics
- SEO optimization tools

---

**Developed by Therynox Agency**  
*Creating amazing websites for your business* 