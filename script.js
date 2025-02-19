

document.getElementById("playButton").addEventListener("click", async () => {
    const response = await fetch("https://wbsocket-production.up.railway.app/create-lobby");
    const data = await response.json();
    window.location.href = `/game.html?lobbyId=${data.lobbyId}`;
});