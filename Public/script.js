const socket = io()
const firstNSP = io("/first-namespace")

const toggleConnection = document.getElementById("toggle-connection")
const sendMessage = document.getElementById("send-message")
const sendMessageInTheRoom = document.getElementById("send-message-in-first-room")
const inputField = document.getElementById("message-input-field")
const inputFieldForRoom = document.getElementById("message-in-the-first-room")
const chat = document.getElementById("chat-of-the-user")
const chatInFirstRoom = document.getElementById("chat-in-the-first-room")

const sendPrivateMessageForm = document.getElementById("send-private-message")
const getPrivateMessage = document.getElementById("your-private-message")
const destinationSocketIdInput = document.getElementById("get-user-id")


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

// to send message to the server
sendMessageInTheRoom.addEventListener('submit', (e) => {
    e.preventDefault()
    let message = inputFieldForRoom.value
    console.log("sending from first nsp::::", message)
    firstNSP.emit("chat message in the room", message)
    inputFieldForRoom.value = ''

})

// to send private message to the server
sendPrivateMessageForm.addEventListener("submit", (e) => {
    e.preventDefault()
    let message = getPrivateMessage.value
    socket.emit("private message", destinationSocketIdInput.value, message)

})

// to handle received message
socket.on("chat message", (msg) => {
    const message = document.createElement("li")
    message.textContent = msg
    chat.appendChild(message)
})

// to handle  received events in this namespace
firstNSP.on("chat message in the room", (msg) => {
    console.log("receiving msg in first namespace")
    const message = document.createElement("li")
    message.textContent = msg
    chatInFirstRoom.appendChild(message)
})