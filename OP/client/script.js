const uri = "http://localhost:8000/";
const output = document.getElementById("ai-output");
const input = document.getElementById("question");
const aiOutput = document.getElementById("ai-output")


document.querySelector('form').addEventListener('submit', async function(event) {
    event.preventDefault();
    console.log("hello1");

    
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
            //
            // if (!response.ok) {
            //     throw new Error("Failed to fetch data");
            // }

            console.log("sending request")

            const data = await response.json();
            const reply = data.ai;

            let newResponse = document.createElement('div');
            let answer = document.createElement('p');

            answer.innerHTML = reply;

            newResponse.appendChild(answer);

            output.appendChild(newResponse);

        } catch (error) {
            console.error("Error occurred while fetching data:", error);
        }

        console.log("hello 2")


})