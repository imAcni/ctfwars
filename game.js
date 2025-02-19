const socket = io("https://wbsocket-production.up.railway.app");
const params = new URLSearchParams(window.location.search);
const lobbyId = params.get("lobbyId");

socket.emit("join-lobby", lobbyId);

socket.on("start-game", () => {
    alert("Game Started!");
});