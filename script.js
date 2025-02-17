const socket = io("https://wbsocket-production.up.railway.app");  // Use your deployed WebSocket URL

socket.on("connect", () => {
    console.log("Connected to WebSocket Server:", socket.id);
});

document.getElementById("inputBox").addEventListener("input", (e) => {
    socket.emit("playerTyped", { text: e.target.value });
});

socket.on("updateGame", (data) => {
    console.log("Received update:", data.text); // Debugging
    document.getElementById("opponentText").innerText = data.text;
});

