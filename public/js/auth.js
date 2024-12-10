import {
    auth, googleProvider, facebookProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword,
    signOut, signInWithRedirect
} from '/js/firebase.js';

function showLoginForm() {
    console.log("Showing login form");
    document.getElementById('login-form-container').style.display = 'block';
    document.getElementById('signup-form-container').style.display = 'none';
}

function showSignupForm() {
    console.log("Showing signup form");
    document.getElementById('login-form-container').style.display = 'none';
    document.getElementById('signup-form-container').style.display = 'block';
}

// Add these functions to the global window scope
window.showLoginForm = showLoginForm;
window.showSignupForm = showSignupForm;

document.addEventListener('DOMContentLoaded', function () {
    // Login form submission
    document.getElementById('login-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessageDiv = document.getElementById('login-error-message');

        errorMessageDiv.style.display = 'none';
        errorMessageDiv.textContent = '';

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const error = await response.json();
                handleAuthError(error, errorMessageDiv);
                return;
            }

            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token); // Store the token in local storage
            window.location.href = '/home'; // Redirect on success
        } catch (error) {
            errorMessageDiv.textContent = 'An error occurred. Please try again.';
            errorMessageDiv.style.display = 'block';
        }
    });

    // Google Login
    document.getElementById('google-btn').addEventListener('click', async function () {
        const errorMessageDiv = document.getElementById('login-error-message');
        errorMessageDiv.style.display = 'none';

        try {
            const response = await fetch('/google-login', {
                method: 'POST'
            });

            if (!response.ok) {
                const error = await response.json();
                errorMessageDiv.textContent = error.message;
                errorMessageDiv.style.display = 'block';
                return;
            }

            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token); // Store the token in local storage
            window.location.href = '/home'; // Redirect on success
        } catch (error) {
            errorMessageDiv.textContent = 'Failed to login with Google. Please try again.';
            errorMessageDiv.style.display = 'block';
        }
    });

    // Facebook Login
    document.getElementById('facebook-btn').addEventListener('click', async function () {
        const errorMessageDiv = document.getElementById('login-error-message');
        errorMessageDiv.style.display = 'none';

        try {
            const response = await fetch('/facebook-login', {
