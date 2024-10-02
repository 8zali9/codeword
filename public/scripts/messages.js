document.addEventListener("DOMContentLoaded", () => {
    var socket = io()
    const btn = document.getElementById("btn")
    const ipt = document.getElementById("ipt")
    const msgs = document.getElementById("msgs")

    const username = localStorage.getItem("username")

    function scrollToBottom() {
        msgs.scrollTop = msgs.scrollHeight
    }

    socket.on("msg", (msg) => {
        const p = document.createElement("p")
        p.innerText = msg
        p.style.marginTop = "4px"
        msgs.appendChild(p)
        scrollToBottom()
    })

    btn.addEventListener("click", () => {
        if (ipt.value == "") return
        const msg = `${username} - ${ipt.value}`
        socket.emit("msg", msg)
        ipt.value = ""
    })
})