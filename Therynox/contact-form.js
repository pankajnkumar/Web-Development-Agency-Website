// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        // Add real-time validation
        setupRealTimeValidation();
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Send form data
            fetch('process-contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    showMessage('success', result.message);
                    contactForm.reset();
                } else {
                    showMessage('error', result.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showMessage('error', 'An error occurred. Please try again later.');
            })
            .finally(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            });
        });
    }
    
    function setupRealTimeValidation() {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        
        // Name validation
        nameInput.addEventListener('input', function() {
            validateNameField(this);
        });
        
        // Email validation
        emailInput.addEventListener('input', function() {
            validateEmailField(this);
        });
        
        // Phone validation with input restriction
        phoneInput.addEventListener('input', function() {
            // Restrict input to valid phone characters
            this.value = this.value.replace(/[^0-9\s\-\(\)\+]/g, '');
            validatePhoneField(this);
        });
        
        // Message validation
        messageInput.addEventListener('input', function() {
            validateMessageField(this);
        });
        
        // Project type validation
        document.getElementById('project').addEventListener('change', function() {
            validateProjectField(this);
        });
    }
    
    function validateNameField(input) {
        const value = input.value.trim();
        const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
        
        if (value === '') {
            removeFieldError(input);
            return;
        }
        
        if (!nameRegex.test(value)) {
            showFieldError(input, 'Name should only contain letters, spaces, hyphens, apostrophes, and periods.');
        } else if (value.length < 2) {
            showFieldError(input, 'Name must be at least 2 characters long.');
        } else if (value.length > 50) {
            showFieldError(input, 'Name must be less than 50 characters long.');
        } else {
            removeFieldError(input);
        }
    }
    
    function validateEmailField(input) {
        const value = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (value === '') {
            removeFieldError(input);
            return;
        }
        
        if (!emailRegex.test(value)) {
            showFieldError(input, 'Please enter a valid email address.');
        } else {
            removeFieldError(input);
        }
    }
    
    function validatePhoneField(input) {
        const value = input.value.trim();
        
        if (value === '') {
            removeFieldError(input);
            return;
        }
        
        // Remove all non-digit characters except + for validation
        const cleanPhone = value.replace(/[^\d+]/g, '');
        
        if (cleanPhone.startsWith('+')) {
            // International format: + followed by 1-15 digits
            const internationalRegex = /^\+[1-9]\d{1,14}$/;
            if (!internationalRegex.test(cleanPhone)) {
                showFieldError(input, 'Please enter a valid international phone number (e.g., +1234567890).');
            } else {
                removeFieldError(input);
            }
        } else {
            // Local format: 7-15 digits
            const localRegex = /^[1-9]\d{6,14}$/;
            if (!localRegex.test(cleanPhone)) {
                showFieldError(input, 'Please enter a valid phone number (7-15 digits).');
            } else {
                removeFieldError(input);
            }
        }
    }
    
    function validateMessageField(input) {
        const value = input.value.trim();
        
        if (value === '') {
            removeFieldError(input);
            return;
        }
        
        if (value.length > 1000) {
            showFieldError(input, 'Message must be less than 1000 characters long.');
        } else {
            removeFieldError(input);
        }
    }
    
    function validateProjectField(input) {
        const value = input.value;
        const validProjectTypes = ['web-development', 'business-service', 'ecommerce', 'ui-ux', 'other'];
        
        if (value === '') {
            showFieldError(input, 'Please select a project type.');
        } else if (!validProjectTypes.includes(value)) {
            showFieldError(input, 'Please select a valid project type.');
        } else {
            removeFieldError(input);
        }
    }
    
    function showFieldError(input, message) {
        removeFieldError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
        input.classList.add('error');
    }
    
    function removeFieldError(input) {
        const errorDiv = input.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('error');
    }
    
    function validateForm(data) {
        // Check required fields
        const required = ['name', 'email', 'project_type', 'message'];
        for (let field of required) {
            if (!data[field] || data[field].trim() === '') {
                showMessage('error', `Please fill in the ${field.replace('_', ' ')} field.`);
                return false;
            }
        }
        
        // Validate name (only letters, spaces, and common punctuation)
        const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
        if (!nameRegex.test(data.name.trim())) {
            showMessage('error', 'Name should only contain letters, spaces, hyphens, apostrophes, and periods.');
            return false;
        }
        
        if (data.name.trim().length < 2) {
            showMessage('error', 'Name must be at least 2 characters long.');
            return false;
        }
        
        if (data.name.trim().length > 50) {
            showMessage('error', 'Name must be less than 50 characters long.');
            return false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('error', 'Please enter a valid email address.');
            return false;
        }
        
        // Validate phone (if provided)
        if (data.phone && data.phone.trim() !== '') {
            // Remove all non-digit characters except + for international format
            const cleanPhone = data.phone.replace(/[^\d+]/g, '');
            
            // Check if it starts with + (international) or is a valid local number
            if (cleanPhone.startsWith('+')) {
                // International format: + followed by 1-15 digits
                const internationalRegex = /^\+[1-9]\d{1,14}$/;
                if (!internationalRegex.test(cleanPhone)) {
                    showMessage('error', 'Please enter a valid international phone number (e.g., +1234567890).');
                    return false;
                }
            } else {
                // Local format: 7-15 digits
                const localRegex = /^[1-9]\d{6,14}$/;
                if (!localRegex.test(cleanPhone)) {
                    showMessage('error', 'Please enter a valid phone number (7-15 digits).');
                    return false;
                }
            }
        }
        
        // Validate project type
        const validProjectTypes = ['web-development', 'business-service', 'ecommerce', 'ui-ux', 'other'];
        if (!validProjectTypes.includes(data.project_type)) {
            showMessage('error', 'Please select a valid project type.');
            return false;
        }
        
        // Validate message
        if (data.message.trim().length > 1000) {
            showMessage('error', 'Message must be less than 1000 characters long.');
            return false;
        }
        
        return true;
    }
    
    function showMessage(type, message) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
            ${message}
        `;
        
        // Insert message before the form
        contactForm.parentNode.insertBefore(messageDiv, contactForm);
        
        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// Add CSS for form messages
const style = document.createElement('style');
style.textContent = `
    .form-message {
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease-out;
    }
    
    .form-message-success {
        background: rgba(40, 167, 69, 0.1);
        color: #28a745;
        border: 1px solid rgba(40, 167, 69, 0.2);
    }
    
    .form-message-error {
        background: rgba(220, 53, 69, 0.1);
        color: #dc3545;
        border: 1px solid rgba(220, 53, 69, 0.2);
    }
    
    .form-message i {
        font-size: 1.1rem;
    }
    
    .field-error {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
        animation: slideIn 0.3s ease-out;
    }
    
    .field-error::before {
        content: "⚠";
        font-size: 1rem;
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
    
    .form-group input:focus.error,
    .form-group select:focus.error,
    .form-group textarea:focus.error {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .submit-btn .fa-spinner {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style); 