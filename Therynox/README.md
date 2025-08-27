# Therynox Agency - Contact Form Database System

This project is a complete system for managing contact form submissions, built with PHP, MySQL, and a modern frontend. It includes a secure admin panel for viewing, managing, and replying to inquiries.

## 🚀 Features

- **Contact Form Storage**: All submissions stored in MySQL database
- **Admin Panel**: Beautiful dashboard to manage submissions
- **Email Notifications**: Automatic emails to admin and confirmation to users
- **Rate Limiting**: Prevents spam submissions
- **Form Validation**: Client-side and server-side validation
- **Responsive Design**: Works on all devices
- **Security**: SQL injection protection, XSS prevention

## 📋 Requirements

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx)
- SMTP server for email notifications

## 🛠️ Installation

### 1. Database Setup

1. Create a MySQL database
2. Import the database structure:
   ```bash
   mysql -u your_username -p your_database < database.sql
   ```

### 2. Configuration

1. Edit `config/database.php`:
   ```php
   private $host = 'localhost';
   private $db_name = 'therynox_agency';
   private $username = 'root';
   private $password = '';
   ```

2. Update email settings in `config/database.php`:
   ```php
   define('SMTP_USERNAME', 'your_email@gmail.com');
   define('SMTP_PASSWORD', 'your_app_password');
   define('ADMIN_EMAIL', 'your_email@gmail.com');
   ```

3. Update site URL:
   ```php
   define('SITE_URL', 'https://yourdomain.com');
   ```

### 3. File Permissions

Ensure your web server can write to the project directory:
```bash
chmod 755 /path/to/your/project
```

### 4. Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use this password in `SMTP_PASSWORD`

## 📁 File Structure

```
├── index.html                 # Main website with contact form
├── process-contact.php        # Form processing script
├── contact-form.js           # Frontend form handler
├── database.sql              # Database structure
├── config/
│   └── database.php          # Database configuration
├── admin/
│   ├── index.php             # Admin dashboard
│   ├── login.php             # Admin login
│   └── logout.php            # Logout script
└── README.md                 # This file
```

## 🔐 Admin Access

**Default Credentials:**
- Username: `u178769018_Therynox`
- Password: `Pankaj154239@@`

**⚠️ Important:** Change these credentials after first login!

## 📊 Admin Panel Features

- **Dashboard Statistics**: Total, new, read, and replied submissions
- **Search & Filter**: Find submissions by name, email, or status
- **Status Management**: Mark submissions as new, read, replied, or archived
- **Pagination**: Handle large numbers of submissions
- **Responsive Design**: Works on mobile and desktop

## 🔧 Customization

### Adding New Fields

1. Update the database:
   ```sql
   ALTER TABLE contacts ADD COLUMN new_field VARCHAR(100);
   ```

2. Update `process-contact.php` to handle the new field

3. Add the field to your HTML form

### Changing Email Templates

Edit the email functions in `process-contact.php`:
- `sendEmailNotification()` - Email sent to admin
- `sendConfirmationEmail()` - Email sent to user

### Styling

- Admin panel styles are in `admin/index.php`
- Contact form styles are in `style.css`
- Form messages are styled in `contact-form.js`

## 🛡️ Security Features

- **SQL Injection Protection**: Prepared statements
- **XSS Prevention**: Input sanitization
- **Rate Limiting**: Max 10 submissions per hour per IP
- **CSRF Protection**: Form validation
- **Input Validation**: Client and server-side validation

## 📧 Email Configuration

The system sends two types of emails:

1. **Admin Notification**: Sent to admin when form is submitted
2. **User Confirmation**: Sent to user confirming submission

### Troubleshooting Email Issues

1. Check SMTP settings in `config/database.php`
2. Ensure your email provider allows SMTP access
3. Check server error logs for email errors
4. Test with a simple email first

## 🔍 Troubleshooting

### Form Not Working
1. Check browser console for JavaScript errors
2. Verify `process-contact.php` is accessible
3. Check PHP error logs
4. Ensure database connection is working

### Database Connection Issues
1. Verify database credentials in `config/database.php`
2. Check if MySQL service is running
3. Ensure database exists and tables are created

### Admin Panel Not Loading
1. Check if PHP sessions are working
2. Verify file permissions
3. Check for PHP errors in logs

## 📈 Performance Tips

1. **Database Indexing**: Indexes are already created for optimal performance
2. **Caching**: Consider adding Redis/Memcached for high traffic
3. **CDN**: Use CDN for static assets
4. **Email Queue**: For high volume, implement email queuing

## 🔄 Updates

To update the system:

1. Backup your database
2. Update PHP files
3. Run any new database migrations
4. Test thoroughly

## 📞 Support

For issues or questions:
- Email: therynox28@gmail.com
- WhatsApp: +91 8287445741
- Instagram: @therynoxhq

## 📄 License

This project is created for Therynox Agency. All rights reserved.

---

**Made with ❤️ by Therynox Agency** 