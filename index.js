const express = require("express")
const { createServer } = require("http")
const path = require("path")
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
    io.emit("chat message", "A user joined", `${socket.id}`)

    socket.on("chat message", (message) => {
        io.emit("chat message", message)

    })
    socket.on("private message", (userid, message) => {
        console.log("msg sent to the user with userid ", userid)
        io.to(userid).emit("chat message", message)
    })

    socket.on('disconnect', () => {
        io.emit("chat message", "a user left the chat")

    })

})


//lets create the first namespace
const firstNSP = io.of("/first-namespace")

firstNSP.on("connection", (socket) => {
    console.log("connected to the first namespace")

    firstNSP.emit("chat message in the room", "message only to the first namespace ok")
    firstNSP.emit("chat message in the room", "message only to the first alright hang tight")

    socket.on("chat message in the room", (message) => {
        console.log(message)
        firstNSP.emit("chat message in the room", message)
    })

})



server.listen(PORT, () => {
    console.log("app is live on ", `http://localhost:${PORT}`)
})