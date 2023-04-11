// Get DOM elements
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loading spinner
function showLoadingSpinner() {
  loader.hidden = false; // Show the loader
  quoteContainer.hidden = true; // Hide the quote container
}

// Hide loading spinner
function removeLoadingSpinner() {
  loader.hidden = true; // Hide the loader
  quoteContainer.hidden = false; // Show the quote container
}

// Generate new quote
function newQuote() {
  showLoadingSpinner(); // Show the loading spinner
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; // Pick a random quote from apiQuotes array
  authorText.textContent = quote.author ? quote.author : "Unknown"; // Display the quote author, if any, or "Unknown" if there is no author
  quoteText.textContent = quote.text; // Display the quote text
  removeLoadingSpinner(); // Hide the loading spinner
}

// Get quotes from API
async function getQuotes() {
  showLoadingSpinner(); // Show the loading spinner
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl); // Get data from API
    apiQuotes = await response.json(); // Convert response to JSON
    newQuote(); // Generate a new quote
  } catch (error) {
    alert(error); // Catch any errors and display them
  }
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; // Create Twitter URL with the quote and author
  window.open(twitterUrl, "_blank"); // Open Twitter URL in new window
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuote); // Generate new quote when the "New Quote" button is clicked
twitterBtn.addEventListener("click", tweetQuote); // Tweet the quote when the "Twitter" button is clicked

// On load
getQuotes(); // Get quotes from API when the page loads
