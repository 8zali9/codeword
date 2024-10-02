document.addEventListener("DOMContentLoaded", () => {
    const whiteboard = document.getElementById("whiteboard")
    const ctx = whiteboard.getContext("2d")

    function windowResizer () {
        whiteboard.width = window.innerWidth * 0.65
        whiteboard.height = window.innerHeight * 0.8
    }

    window.addEventListener("resize", windowResizer)
    windowResizer()

    let drawing = false

    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.strokeStyle = "black"

    var socket = io()

    socket.on("coordinatesAndDrawingStatus", (coordinatesAndDrawingStatus) => {
        const { x, y, drawingStatus } = coordinatesAndDrawingStatus
        if (!drawingStatus) {
            ctx.beginPath()
            ctx.moveTo(x, y)
        } else {
            ctx.lineTo(x, y)
            ctx.stroke()
        }
    })

    whiteboard.addEventListener("mousedown", (event) => {
        drawing = true
        ctx.beginPath()

        const rect = whiteboard.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        ctx.moveTo(x, y)
        socket.emit("coordinatesAndDrawingStatus", { x, y, drawingStatus: false })
    })

    whiteboard.addEventListener("mouseup", () => {
        drawing = false
        ctx.beginPath()
    })
    
    whiteboard.addEventListener("mousemove", (event) => {
        if (!drawing) return
        
        const rect = whiteboard.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        ctx.lineTo(x, y)
        ctx.stroke()

        socket.emit("coordinatesAndDrawingStatus", { x, y, drawingStatus: true })
    })
})