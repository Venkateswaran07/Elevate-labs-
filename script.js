// 1. Select HTML elements using DOM methods
const toggleButton = document.getElementById('toggleBtn');
const bodyElement = document.body;
const headerTitle = document.querySelector('header h1');

// 6. Add comments explaining logic
// Function to handle the button click event
function keyHandler() {
    // 7. Debug using console logs
    console.log('Button clicked! Toggling theme...');

    // 5. Toggle classes using JavaScript
    // Toggle the 'dark-mode' class on the body element
    bodyElement.classList.toggle('dark-mode');

    // 3. Modify text and styles dynamically
    if (bodyElement.classList.contains('dark-mode')) {
        toggleButton.textContent = 'Switch to Light Mode';
        toggleButton.style.backgroundColor = '#bb86fc';
        toggleButton.style.color = '#000';
        headerTitle.textContent = 'Venkateswaran A (Dark Mode)';
    } else {
        toggleButton.textContent = 'Switch to Dark Mode';
        toggleButton.style.backgroundColor = ''; // Reset to default
        toggleButton.style.color = ''; // Reset to default
        headerTitle.textContent = 'Venkateswaran A';
    }
}

// 4. Handle button click events
// Add an event listener to the button
if (toggleButton) {
    toggleButton.addEventListener('click', keyHandler);
} else {
    console.error('Toggle button not found!');
}

// Example of selecting multiple elements and modifying them
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.textDecoration = 'underline';
    });
    link.addEventListener('mouseout', () => {
        link.style.textDecoration = 'none';
    });
});
