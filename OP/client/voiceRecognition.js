const startButton = document.getElementById('startButton');
const outputDiv = document.getElementById('input');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition);

recognition.lang = 'en-US';
recognition.interimResults = true;


recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
    outputDiv.innerText = " " + transcript;
}

recognition.onend = function() {
    startButton.textContent = "Start Recording";
}

startButton.addEventListener('click', function() {
    if (recognition.recording) {
        setTimeout(() => {
            recognition.stop();
        }, 5000);
        startButton.textContent = "Start Recording";
    } else {
        recognition.start();
        startButton.textContent = "Stop Recording";
        outputDiv.textContent = "Listening...";
    }
});

