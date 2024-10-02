const express = require("express")
const { Server } = require("socket.io")
require("dotenv").config()
const http = require("http")
const path = require("path")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.resolve('./public')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "auth.html"))
})

app.post("/auth", (req, res) => {
    const username = req.body.name
    const code = req.body.code

    if (code === "123") res.sendFile(path.resolve(__dirname, "public", "home.html"))
    else res.sendFile(path.resolve(__dirname, "public", "error.html"))
})

io.on("connection", (socket) => {
    socket.on("msg", (msg) => {
        io.emit("msg", msg)
    })

    socket.on("coordinatesAndDrawingStatus", (coordinatesAndDrawingStatus) => {
        socket.broadcast.emit("coordinatesAndDrawingStatus", coordinatesAndDrawingStatus)
    })
})

server.listen(process.env.PORT, () => {})