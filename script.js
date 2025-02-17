const socket = io("https://your-railway-server-url.com");  // Use your deployed WebSocket URL

socket.on("connect", () => {
    console.log("Connected to WebSocket Server:", socket.id);
});

document.getElementById("inputBox").addEventListener("input", (e) => {
    socket.emit("playerTyped", { text: e.target.value });
});

socket.on("updateGame", (data) => {
    document.getElementById("opponentText").innerText = data.text;
});
