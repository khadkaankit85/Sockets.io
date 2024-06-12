const socket = io()
const firstNSP = io("/first-namespace")

const toggleConnection = document.getElementById("toggle-connection")
const sendMessage = document.getElementById("send-message")
const inputField = document.getElementById("message-input-field")
const chat = document.getElementById("chat-of-the-user")
const chatInFirstRoom = document.getElementById("chat-in-the-first-room")

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

// to handle events in this namespace
firstNSP.on("chat message", (msg) => {
    const message = document.createElement("li")
    message.textContent = msg
    chatInFirstRoom.appendChild(message)
})