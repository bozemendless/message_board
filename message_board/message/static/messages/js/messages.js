const imageInput = document.getElementById("imageInput");
const textInput = document.getElementById("textInput");
const formData = new FormData();

imageInput.addEventListener("change", event => {
    const file = event.target.files[0];
    formData.append("image", file);
})

function createMessage(event) {
    event.preventDefault();
    const url = "api/message";
    const token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
    if (textInput.value==="") { 
        return
    }
    formData.append("text", JSON.stringify({ text: textInput.value }));
    const opinions = {
        method: 'POST',
        headers: {
            'X-CSRFToken': token
        },
        body: formData
    }
    fetch(url, opinions)
    .then(res => {return res.json();})
    .then(data => {
        if (data.ok) {
            location.reload();
        }
        if (data.error) {
            console.log(data.message);
        }
    })
}

function getMessage() {
    const url = "api/message";
    fetch(url)
    .then(res => {return res.json()})
    .then(data => {
        const container = document.querySelector(".container");
        for (message in data) {
            const newMessage = document.createElement("div");
            newMessage.classList = "message";
            const content = document.createElement("p");
            content.classList = "content";
            content.textContent = data[message][0].text;
            newMessage.appendChild(content);
            const img = document.createElement("img");
            img.src = `/media/${data[message][1]}`;
            newMessage.appendChild(img);
            const time = document.createElement("em");
            time.classList = "time";
            time.textContent = data[message][2].split(".")[0];
            newMessage.appendChild(time);
            container.appendChild(newMessage)
        }
        
    })
}

getMessage();