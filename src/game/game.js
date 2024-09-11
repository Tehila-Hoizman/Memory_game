import { getCardsUrls, getNumOfPairs, getSettings } from "../data/dataManager.js";

const settings = getSettings();
console.log(settings);
const gameBoard = document.querySelector('.game-board');
const scoresList = document.querySelector('.scores-list');
const currentPlayerElement = document.querySelector('.current-player');
const timerElement = document.querySelector('.timer');

let numPlayers = settings.numPlayers;
let currentPlayer = settings.playerNames[0];
let turnIndex = 1;
let cardsUrls = getCardsUrls(settings.theme);
let numOfPairs = getNumOfPairs(settings.difficulty);
let scores = {};
let gameLocked = false;
let timer;
let elapsedTime = 0;

const generatePairsUrls = () => {
    const selectedImages = [];
    const imagePaths = [...cardsUrls]; // יצירת עותק של המערך

    // ערבוב התמונות
    for (let i = 0; i < numOfPairs; i++) {
        const randomIndex = Math.floor(Math.random() * imagePaths.length);
        selectedImages.push(imagePaths[randomIndex], imagePaths[randomIndex]);
        imagePaths.splice(randomIndex, 1); // הסרת התמונה שנבחרה
    }

    // ערבוב הכרטיסים
    return selectedImages.sort(() => Math.random() - 0.5);
};

const createCards = () => {
    const cardElements = generatePairsUrls();
    // יצירת הכרטיסים דינמית
    cardElements.forEach((imagePath, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = imagePath; // הוספת כתובת התמונה
        card.dataset.id = index; // הוספת מזהה ייחודי לכרטיס

        // הוספת מאזין ללחיצה על כרטיס
        card.addEventListener('click', (event) => flipCard(event.target));
        // הוספת הכרטיס ללוח
        gameBoard.appendChild(card);
    });
};

const flipCard = (card) => {
    if (gameLocked || card.classList.contains('flipped')) {
        return; // לא לבצע פעולה אם המשחק נעול או אם כרטיס כבר התהפך
    }

    card.style.backgroundImage = `url(../../assets/images/${settings.theme}/${card.dataset.image})`;
    card.classList.add('flipped');

    const flippedCards = document.querySelectorAll('.flipped');

    if (flippedCards.length === 2) {
        gameLocked = true; // ננעל את המשחק עד שהכרטיסים ייבדקו
        setTimeout(() => {
            const [firstCard, secondCard] = flippedCards;

            if (firstCard.dataset.image === secondCard.dataset.image) {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                scores[currentPlayer]++;
                numOfPairs--;
                updateScores();
                if (numOfPairs == 0) {
                    finishGame();
                    return;
                }
            } else {
                firstCard.style.backgroundImage = ''; // הסרת התמונה ברקע
                secondCard.style.backgroundImage = ''; // הסרת התמונה ברקע
                nextTurn();
            }
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            gameLocked = false; // שחרור נעילת המשחק
        }, 1000);
    }
};

const updateScores = () => {
    scoresList.innerHTML = ''; // ניקוי הרשימה הנוכחית
    settings.playerNames.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player}: ${scores[player]}`;
        scoresList.appendChild(listItem);
    });
    updateCurrentPlayerDisplay();
};

const updateCurrentPlayerDisplay = () => {
    currentPlayerElement.textContent = `Current Player: ${currentPlayer}`;
    currentPlayerElement.style.color = settings.playerColors[settings.playerNames.indexOf(currentPlayer)];
};

const nextTurn = () => {
    turnIndex++;
    currentPlayer = settings.playerNames[turnIndex % numPlayers];
    updateScores();
    console.log(turnIndex);
    console.log(currentPlayer);
};

const initGame = () => {
    settings.playerNames.forEach(player => {
        scores[player] = 0;
    });

    updateScores();
    createCards();
    startTimer();
};

// פונקציה למציאת השם עם הניקוד הגבוה ביותר
const getTopScorer = (scores) => {
    const entries = Object.entries(scores);
    const topScorer = entries.reduce((highest, current) => {
        if (current[1] > highest[1]) {
            return current;
        }
        return highest;
    });
    return topScorer[0];
};

const finishGame = () => {
    stopTimer();
    const topScorer = getTopScorer(scores);
    alert(`The top scorer is: ${topScorer}`); // Output: The top scorer is: Diana
};

const startTimer = () => {
    timer = setInterval(() => {
        elapsedTime++;
        timerElement.textContent = `Time: ${elapsedTime}s`;
    }, 1000);
};

const stopTimer = () => {
    clearInterval(timer);
};

initGame();
