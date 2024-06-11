const socket = io()

const toggleConnection = document.getElementById("toggle-connection")
const sendMessage = document.getElementById("send-message")
const inputField = document.getElementById("message-input-field")
const chat = document.getElementById("chat-of-the-user")

toggleConnection.addEventListener('click', (e) => {
    if (socket.connected) {
        e.target.innerText = "Connect"
        socket.disconnect()
    }
    else {
        e.target.innerText = "Disconnect"
        socket.connect()

    }
})

sendMessage.addEventListener('submit', (e) => {
    e.preventDefault()
    let message = inputField.value
    socket.emit("chat message", message)
    inputField.value = ''

})

// to handle received message
socket.on("chat message", (msg) => {
    const message = document.createElement("li")
    message.textContent = msg
    chat.appendChild(message)
})