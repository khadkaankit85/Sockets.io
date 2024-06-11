const express = require("express")
const { createServer } = require("http")
const path = require("path")
const { emit } = require("process")
const { Server } = require("socket.io")


const app = express()
const server = createServer(app)
const PORT = 3000
const io = new Server(server)

// to send stylesheets and js file
app.use(express.static(path.join(__dirname, "Public")))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "Pages", "home", "index.html"),)
})

io.on('connection', (socket) => {
    io.emit("chat message", "A user joined", `${socket.client}`)

    socket.on("chat message", (message) => {
        io.emit("chat message", message)

    })

    socket.on('disconnect', () => {
        io.emit("chat message", "a user left the chat")

    })

})



server.listen(PORT, () => {
    console.log("app is live on ", `http://localhost:${PORT}`)
})