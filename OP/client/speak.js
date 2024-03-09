const speak = document.querySelector(".answer")

speak.addEventListener('result', function (e) {
    e.preventDefault();
    const utterance = new SpeechSynthesisUtterance(speak);
    speechSynthesis.speak(utterance);
})