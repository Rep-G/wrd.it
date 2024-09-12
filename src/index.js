let theWord = '';

async function getRandomWordWithRetry() {
    try {
        const randomWord = await getRandomWord();
        return randomWord;
    } catch (error) {
        console.error('Error:', error.message);
        console.log('Retrying to fetch a random word...');
        return getRandomWordWithRetry();
    }
}

async function getRandomWord() {
    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word');
        if (!response.ok) {
            throw new Error('Failed to fetch random word');
        }
        const data = await response.json();
        const randomWord = data[0];

        const dictionaryResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
        if (!dictionaryResponse.ok) {
            throw new Error(`Failed to fetch dictionary data for ${randomWord}!`);
        }
        const dictionaryData = await dictionaryResponse.json();
        const definitions = dictionaryData[0].meanings[0].definitions;

        let hint = '';
        while (hint === '' || hint.includes(randomWord)) {
            const randomIndex = Math.floor(Math.random() * definitions.length);
            hint = definitions[randomIndex].definition;
        }

        document.querySelector('#wordhint').textContent = `hint: ${hint.toLowerCase()}`;
        theWord = randomWord.toLowerCase();
        console.log(theWord);
        return randomWord.toLowerCase();
    } catch (error) {
        throw new Error(`Error while fetching random word: ${error.message}`);
    }
}
getRandomWordWithRetry();
async function guess() {
    const userGuess = document.getElementById("guess").value.trim().toLowerCase();
    if (userGuess === theWord) {
        console.log("Word is correct!");
        showFeedback("Correct word!", 'green');
        getRandomWordWithRetry();
    } else {
        console.log("Incorrect word!");
        showFeedback("Incorrect word, try again", 'red');
    }
}

function showFeedback(message, color) {
    const feedbackBox = document.getElementById("feedbackBox");
    feedbackBox.style.opacity = 0.8;
    feedbackBox.style.zIndex = 999;
    feedbackBox.textContent = message;
    feedbackBox.style.backgroundColor = color;
    setTimeout(() => {
        feedbackBox.style.opacity = 0;
        feedbackBox.style.backgroundColor = 'black';
        feedbackBox.style.zIndex = -999;
    }, 2000);
}