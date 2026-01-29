document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const submitBtn = document.getElementById('submitBtn');

    // --- Configuration & Regex ---
    const patterns = {
        username: /^[a-zA-Z\s]{3,20}$/, // Only letters and spaces, 3-20 chars
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Standard email pattern
        password: /^(?=.*\d)(?=.*[^a-zA-Z0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/ // Min 8 chars, 1 num, 1 special char, 1 upper, 1 lower
    };

    const messages = {
        username: "Name must be 3-20 characters long and contain only letters.",
        email: "Please enter a valid email address.",
        password: "Password must be at least 8 chars, incl. 1 uppercase, 1 number & 1 special char.",
        confirmPassword: "Passwords do not match.",
        required: "This field is required."
    };

    // --- UI Helpers ---

    // Toggle Password Visibility
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.classList.toggle('fa-eye');
        togglePasswordBtn.classList.toggle('fa-eye-slash');
    });

    /**
     * Set Input Status (Success/Error)
     * @param {HTMLInputElement} inputElement 
     * @param {boolean} isValid 
     * @param {string} errorMsg 
     */
    const setStatus = (inputElement, isValid, errorMsg = '') => {
        const wrapper = inputElement.parentElement;
        const errorElement = wrapper.parentElement.querySelector('.error-message');

        if (isValid) {
            wrapper.classList.remove('error');
            wrapper.classList.add('success');
            errorElement.innerText = '';
        } else {
            wrapper.classList.remove('success');
            wrapper.classList.add('error');
            errorElement.innerText = errorMsg;
        }
    };

    /**
     * Clear Status
     * @param {HTMLInputElement} inputElement 
     */
    const clearStatus = (inputElement) => {
        const wrapper = inputElement.parentElement;
        const errorElement = wrapper.parentElement.querySelector('.error-message');
        wrapper.classList.remove('error', 'success');
        errorElement.innerText = '';
    };

    // --- Validation Logic ---

    /**
     * Reusable Validation Function
     * @param {HTMLInputElement} input 
     * @param {RegExp} pattern 
     * @param {string} specificError 
     * @returns {boolean} isValid
     */
    const validateField = (input, pattern, specificError) => {
        const value = input.value.trim();

        // Empty check
        if (value === '') {
            setStatus(input, false, messages.required);
            return false;
        }

        // Pattern check
        if (!pattern.test(value)) {
            setStatus(input, false, specificError);
            return false;
        }

        // Success
        setStatus(input, true);
        return true;
    };

    const validateConfirmPassword = () => {
        const password = passwordInput.value.trim();
        const confirmAndValue = confirmPasswordInput.value.trim();

        if (confirmAndValue === '') {
            setStatus(confirmPasswordInput, false, messages.required);
            return false;
        }

        if (password !== confirmAndValue) {
            setStatus(confirmPasswordInput, false, messages.confirmPassword);
            return false;
        }

        setStatus(confirmPasswordInput, true);
        return true;
    };

    const checkPasswordStrength = (password) => {
        const bar = document.querySelector('.strength-bar');
        let strength = 0;

        if (password.length > 5) strength += 20;
        if (password.length > 8) strength += 20;
        if (/[A-Z]/.test(password)) strength += 20;
        if (/[0-9]/.test(password)) strength += 20;
        if (/[^A-Za-z0-9]/.test(password)) strength += 20;

        bar.style.width = strength + '%';

        if (strength < 40) bar.style.backgroundColor = '#ef4444'; // red
        else if (strength < 80) bar.style.backgroundColor = '#f59e0b'; // orange
        else bar.style.backgroundColor = '#10b981'; // green
    };

    // --- Event Listeners (Real-time Validation) ---

    // Username
    usernameInput.addEventListener('keyup', () => {
        validateField(usernameInput, patterns.username, messages.username);
    });

    // Email
    emailInput.addEventListener('keyup', () => {
        validateField(emailInput, patterns.email, messages.email);
    });

    // Password
    passwordInput.addEventListener('keyup', () => {
        const isValid = validateField(passwordInput, patterns.password, messages.password);
        checkPasswordStrength(passwordInput.value);
        if (confirmPasswordInput.value !== '') validateConfirmPassword(); // Re-check confirm if populated
    });

    // Confirm Password
    confirmPasswordInput.addEventListener('keyup', () => {
        validateConfirmPassword();
    });

    // --- Form Submission ---

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default submission

        // Run all validations
        const isUsernameValid = validateField(usernameInput, patterns.username, messages.username);
        const isEmailValid = validateField(emailInput, patterns.email, messages.email);
        const isPasswordValid = validateField(passwordInput, patterns.password, messages.password);
        const isConfirmValid = validateConfirmPassword();

        if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid) {
            // All good
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;

            // Simulate server request
            setTimeout(() => {
                const card = document.querySelector('.form-card');
                const firstName = usernameInput.value.split(' ')[0];

                // Transition out
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';

                setTimeout(() => {
                    // Update content
                    card.innerHTML = `
                        <div style="text-align: center; padding: 1rem;">
                            <div style="font-size: 4rem; color: #10b981; margin-bottom: 1rem;">
                                <i class="fa-solid fa-circle-check"></i>
                            </div>
                            <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; background: linear-gradient(135deg, #fff 0%, #cbd5e1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">All Set, ${firstName}!</h2>
                            <p style="color: #94a3b8; margin-bottom: 2rem;">Your account has been successfully created.</p>
                            <button onclick="location.reload()" style="margin: 0 auto; width: auto; padding: 1rem 2.5rem;">
                                <span>Continue</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>
                        </div>
                    `;

                    // Transition in
                    requestAnimationFrame(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                }, 300);
            }, 1500);
        } else {
            // Shake the button to indicate error
            submitBtn.classList.add('error-shake');
            setTimeout(() => submitBtn.classList.remove('error-shake'), 500);
        }
    });
});
