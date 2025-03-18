let playerPositions = { 1: 0, 2: 0 };

function createTrack(id) {
    let track = document.getElementById(id);
    for (let i = 1; i <= 15; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.innerText = i;
        track.appendChild(cell);
    }
}
createTrack("track1");
createTrack("track2");

function rollDice(player) {
    if (playerPositions[1] >= 15 || playerPositions[2] >= 15) {
        return; // Someone already won or reached the end
    }

    let roll = Math.floor(Math.random() * 6) + 1;
    document.querySelector(`.img${player}`).setAttribute("src", `./Dicee+Challenge+-+Starting+Files/images/dice${roll}.png`);

    let distanceToGoal = 15 - playerPositions[player];
    if (roll <= distanceToGoal) {
        playerPositions[player] += roll;
    } else {
        // If overshoot, do nothing (player stays in place)
        document.getElementById("winner").innerText = `Player ${player} needs exact roll!`;
    }

    if (playerPositions[player] === 15) {
        document.getElementById("winner").innerText = `🎉 Player ${player} wins!`;
    }

    // } else if (playerPositions[1] === 15 && playerPositions[2] === 15) {
    //     document.getElementById("winner").innerText = `Draw!`;
    // }

    updatePosition(player);
}

function updatePosition(player) {
    let token = document.getElementById(`p${player}-token`);
    let cells = document.getElementById(`track${player}`).children;
    token.innerText = playerPositions[player];
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.background = "white";
    }
    if (playerPositions[player] > 0 && playerPositions[player] <= 15) {
        cells[playerPositions[player] - 1].style.background = "yellow";
    }
}

// Add click events to dice images:
document.querySelector(".img1").addEventListener("click", function () {
    rollDice(1);
});
document.querySelector(".img2").addEventListener("click", function () {
    rollDice(2);
});

document.getElementById("newGameBtn").addEventListener("click", function () {
    // Reset player positions
    playerPositions = { 1: 0, 2: 0 };

    // Reset tokens and track colors
    updatePosition(1);
    updatePosition(2);

    // Reset dice images to default dice face (optional - dice1.png)
    document.querySelector(".img1").setAttribute("src", "./Dicee+Challenge+-+Starting+Files/images/dice1.png");
    document.querySelector(".img2").setAttribute("src", "./Dicee+Challenge+-+Starting+Files/images/dice1.png");

    // Reset winner message
    document.getElementById("winner").innerText = "";

    // Reset player token text
    document.getElementById("p1-token").innerText = "0";
    document.getElementById("p2-token").innerText = "0";
});
