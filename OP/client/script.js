const uri = "http://localhost:8000/";
const output = document.getElementById("output");
const input = document.getElementById("question");
const askButton = document.getElementById("ask-advice")


document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    // console.log("hello1");

    let question = document.createElement('p');
    question.classList.add("question")
    question.innerHTML = input.value;
    output.appendChild(question);

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
        // askButton.style.visibility = 'visible';
        //
        // if (!data){
        //     askButton.style.visibility = 'hidden';
        // }else {
        //     askButton.style.visibility = 'visible';
        // }

        const reply = data.ai;

        let newResponse = document.createElement('div');
        newResponse.classList.add("response")
        let answer = document.createElement('p');
        answer.classList.add("answer")

        answer.innerHTML = reply;

        newResponse.appendChild(answer);

        output.appendChild(newResponse);

    } catch (error) {
        console.error("Error occurred while fetching data:", error);
    }


})