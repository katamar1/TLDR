// bannertext.js or another script

// Add an event listener to trigger revealText function when needed
document.addEventListener('DOMContentLoaded', function () {
    const text = revealText();
    // You can do something with the 'text' variable, like displaying it on your page
    // For example, displaying it in a specific element with an id, e.g., "resultElement"
    const resultElement = document.getElementById('resultElement');
    resultElement.textContent = text;
  });

