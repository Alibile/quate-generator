const quoteContainer = document.getElementById("quote-container")
const quoteText = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter")
const newQuoteBtn = document.getElementById("new-quote")
const loader = document.getElementById("loader")

let apiQuotes = []
/* showing */
function loading(params) {
    loader.hidden = false;
    quoteContainer.hidden = true
}
/* hidding */
function complete(params) {
    loader.hidden = true;
    quoteContainer.hidden = false
}
function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)]
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
         authorText.textContent = quote.author;
    }
   if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
   } else {
    quoteText.classList.remove("long-quote")
   }
  quoteText.textContent = quote.text; 

  complete()
}
//Get qoute from api
async function getQuotes () {
    loading();
    const baseUrl = "https://type.fit/api/quotes"
try {
    const respose = await fetch(baseUrl)
    apiQuotes = await respose.json()
   newQuote()
} catch (error) {
    
}

}

function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank')
}

newQuoteBtn.addEventListener("click",newQuote)
twitterBtn.addEventListener("click",tweetQuote)



getQuotes()

