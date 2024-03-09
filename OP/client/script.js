const uri = "http://localhost:8000/";
const output = document.getElementById("output");
const input = document.getElementById("question");
const askButton = document.getElementById("ask-advice");
const loading = document.getElementById("loading");

function displayLoading() {
    loading.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loading.classList.remove("display");
    }, 5000);
}

// hiding loading 
function hideLoading() {
    loading.classList.remove("display");
}


document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault();
    // console.log("hello1");


    // Disable the button
    askButton.disabled = true;


    let question = document.createElement('p');
    question.classList.add("question");
    question.innerHTML = input.value;
    output.appendChild(question);

    displayLoading();

    try {
        const response = await fetch(uri, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "advice": input.value,
                // "prompt": human_prompt.value,//additional for second input
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

    } catch (error) {
        console.error("Error occurred while fetching data:", error);
    } finally {
        // Enable the button after request completes (whether success or error)
        askButton.disabled = false;
    }
})