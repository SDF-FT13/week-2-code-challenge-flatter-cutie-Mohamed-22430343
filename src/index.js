document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const nameElement = document.getElementById("name");
    const imageElement = document.getElementById("image");
    const voteCountElement = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const resetButton = document.getElementById("reset-btn");
    let currentCharacter = null;
    fetch("http://localhost:3000/characters")
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                 span.textContent = character.name;
                span.style.cursor = "pointer";
                span.addEventListener("click", () => displayCharacter(character));
                characterBar.appendChild(span);
            });
        });
    function displayCharacter(character) {
        currentCharacter = character;
        nameElement.textContent = character.name;
        imageElement.src = character.image;
        imageElement.alt = character.name;
        voteCountElement.textContent = character.votes;
    }
    votesForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!currentCharacter) return;
        const votesInput = document.getElementById("votes");
        const votesToAdd = parseInt(votesInput.value) || 0;
        currentCharacter.votes += votesToAdd;
        voteCountElement.textContent = currentCharacter.votes;
        votesInput.value = "";  
        });
    });