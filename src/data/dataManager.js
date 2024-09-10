// הגדרת ערכי ברירת מחדל
const defaultSettings = {
    numPlayers: 1,
    playerNames: ['Player 1'],
    playerColors: ['#000000'],
    theme: 1,
    difficulty: 1
};

const config = {
    cardsUrls: {
        'animals':['bee.jpg','cat.jpg','dog.jpg','elephant.jpg','fish.jpg','lion.jpg','monkey.jpg','parrot.jpg','snake.jpg'],
        'food':['cake.jpg','cookies.jpg','pizza.jpg','potatoes.jpg','rice.jpg','sandwich.jpg','spaghetti.jpg'],
        'landscapes':[],
    },
    difficulty:{
        '1':6,
        '2':8,
        '3':10
    }
}

function setSettings(newSettings) {
    localStorage.setItem('gameSettings', JSON.stringify(newSettings));
}

function getSettings() {
    const storedSettings = JSON.parse(localStorage.getItem('gameSettings'));
    return storedSettings ? storedSettings : { ...defaultSettings };
}

function getNumOfPairs(level) {
    return config.difficulty[level]
}

function getCardsUrls(theme) {
    return config.cardsUrls[theme]
}

export { setSettings, getSettings, getNumOfPairs, getCardsUrls };
