import { setSettings } from "../data/dataManager.js";

const numPlayers = document.querySelector('#num_players')
const playersDetails = document.querySelector('.players-details')
const finishDetailsBtn = document.querySelector('.finish-details-btn')
const gameTheme = document.querySelector('#game-theme')
const gameDifficulty = document.querySelector('#game-difficulty')


const createPlayersDetailsForm = () => {

    playersDetails.innerHTML = '';

    for (let index = 0; index < numPlayers.value; index++) {

        const div = document.createElement("div")
        div.classList.add("player_detail",`player${index+1}`)
        
        const nameInp = document.createElement("input")
        nameInp.classList.add("player_name_inp")
        nameInp.id = `player_name_${index + 1}`; // הוספת ID לשדה הקלט

        const nameLbl = document.createElement("label")
        nameLbl.classList.add("player_name_lbl")
        nameLbl.textContent = "Name:"
        nameLbl.setAttribute("for", nameInp.id); // הוספת תכונה for ל-label

        const colorInp = document.createElement("input")
        colorInp.classList.add("player_color_inp")
        colorInp.id = `player_color_${index + 1}`; // הוספת ID לשדה הקלט

        const colorLbl = document.createElement("label")
        colorLbl.classList.add("player_color_lbl")
        colorLbl.textContent = "Color:"
        colorLbl.setAttribute("for", colorInp.id); // הוספת תכונה for ל-label

        div.append(nameLbl,nameInp,colorLbl,colorInp)
        playersDetails.appendChild(div)
    }
}

const validateForm = () => {
    return true
}

const submitGameSettings = () => {
    if(!validateForm()){
        return
    }

    const playersNames = [];
    document.querySelectorAll('.player_name_inp').forEach(input => {
        playersNames.push(input.value);
    });
    
    const playersColors = [];
    document.querySelectorAll('.player_color_inp').forEach(input => {
        playersColors.push(input.value);
    });
    setSettings({
        numPlayers: numPlayers.value,
        playerNames: playersNames,
        playerColors: playersColors,
        theme: gameTheme.value,
        difficulty:  gameDifficulty.value
    })
    window.location.href = '../game/game.html';
}

numPlayers.addEventListener('input',createPlayersDetailsForm)
finishDetailsBtn.addEventListener('click',submitGameSettings)
document.addEventListener('DOMContentLoaded',createPlayersDetailsForm)

