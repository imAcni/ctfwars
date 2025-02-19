document.getElementById("waiting").style.visibility = "visible";
document.getElementById("question").style.visibility = "hidden";
const homebutton = document.getElementById("homebutton")
homebutton.style.visibility = "hidden";
const socket = io("https://wbsocket-production.up.railway.app");
const params = new URLSearchParams(window.location.search);
const lobbyId = params.get("lobbyId");

socket.emit("join-lobby", lobbyId);

socket.on("start-game", (data) => {
    alert("Game Started!");
    console.log("File URL:", data.fileUrl);
    document.getElementById("waiting").style.visibility = "hidden";
    document.getElementById("question").style.visibility = "visible";
    document.getElementById("question").innerText = data.problem.question;

    const downloadLink = document.getElementById("download");
    if (data.downloadboolean) {
        downloadLink.innerHTML = "Download";
        downloadLink.download = data.download;
        downloadLink.href = data.fileUrl;
    } else if (data.htmlboolean) {
        downloadLink.innerHTML = "Visit Site";
        downloadLink.addEventListener("click", () => {
            window.open(data.fileUrl, "_blank")
        });
    } else {
        downloadLink.style.visibility = "hidden";
    }

});
document.getElementById("submit").addEventListener("click", () => {
    const answer = document.getElementById("answerInput").value; // Get answer input
    const lobbyId = new URLSearchParams(window.location.search).get('lobbyId');

    if (answer) {
        socket.emit("submit-answer", lobbyId, answer);
    } else {
        alert("Please enter an answer!");
    }
});

// Listen for game-over event
socket.on("game-over", (data) => {
    alert(`${data.message} Game Over!`);

    homebutton.style.visibility = "visible";
    homebutton.addEventListener("click", () => {
        window.location.href = "/play.html";
    })
    // Optionally, redirect to a results page or reset the game
});

socket.on("disconnected", (data) => {
    console.log(data.message);
    alert("Opponent disconnected!");
    homebutton.style.visibility = "visible";
    homebutton.addEventListener("click", () => {
        window.location.href = "/play.html";
    })
});

// Listen for incorrect answer feedback
socket.on("incorrect-answer", (data) => {
    alert(data.message);
    console.log("wrong answer")
});
