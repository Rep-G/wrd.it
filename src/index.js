const word = "Pomegranate";
const hint = "Hint: This word is a fruit with balls inside it";
document.querySelector('#wordhint').innerHTML = hint;
function guess()
{
    if (document.getElementById("guess").value.toLowerCase() == word.toLowerCase())
    {
        console.log("Word is correct!");
        feedbackBox.style.opacity = 0.8;
        feedbackBox.style.zIndex = 999;
        feedbackBox.textContent = "Correct, check again tommorow for a new word";
        feedbackBox.style.backgroundColor = 'green';
        setTimeout(() => {
          feedbackBox.style.opacity = 0;
          feedbackBox.style.backgroundColor = 'black';
          feedbackBox.style.zIndex = -999;
        }, 2000);
    }
    else
    {
        console.log("Incorrect word!");
        const feedbackBox = document.getElementById("feedbackBox");
        feedbackBox.style.opacity = 0.8;
        feedbackBox.style.zIndex = 999;
        feedbackBox.textContent = "Incorrect word, try again";
        feedbackBox.style.backgroundColor = 'red';
        setTimeout(() => {
          feedbackBox.style.opacity = 0;
          feedbackBox.style.backgroundColor = 'black';
          feedbackBox.style.zIndex = -999;
        }, 2000);
    }
}