let uri = " ";
const output = document.getElementById("output");
const input = document.getElementById("input");
const askButton = document.querySelector(".ask-ai");
const loading = document.getElementById("loading");

//loading function
function displayLoading() {
    loading.classList.add("display");
    // To stop loading after some time
    setTimeout(() => {
        loading.classList.remove("display");
    }, 10000);
}
// hiding loading 
function hideLoading() {
    loading.classList.remove("display");
}

document.getElementById("request").addEventListener('submit', async function (e) {
    e.preventDefault();

    console.log(e.submitter.value);

    // Disable the button after submit
    askButton.disabled = true;

    let questInput = document.createElement('div');
    questInput.classList.add("input");

    let question = document.createElement('p');
    question.classList.add("question");
    question.innerHTML = input.value;

    questInput.appendChild(question);

    output.appendChild(questInput);

    displayLoading();

    if (e.submitter.value === "submit-anthropic") {
        uri = "http://localhost:8000/anthropic";
    }else if (e.submitter.value === "submit-openAi") {
        uri = "http://localhost:8000/"
    }

    console.log(uri)
    try {
        const response = await fetch(uri, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "advice": input.value,
            }),
        });


        console.log("sending request")

        const data = await response.json();

        const reply = data.ai;

        let newResponse = document.createElement('div');
        newResponse.classList.add("response")
        let answer = document.createElement('p');
        answer.classList.add("answer")

        answer.innerHTML = reply;

        hideLoading();

        newResponse.appendChild(answer);

        output.appendChild(newResponse);

        speakText(answer.textContent);

        function speakText(text) {
            var speech = new SpeechSynthesisUtterance();
            speech.text = text;
            window.speechSynthesis.speak(speech);
        }


    } catch (error) {
        console.error("Error occurred while fetching data:", error);
    } finally {
        // Enable button after try and catch 
        askButton.disabled = false;
    }
})



