const startBtn = document.querySelector('.start-btn')

const startGame = () =>{
    window.location.href = 'game-setup/game-setup.html';
}

startBtn.addEventListener('click',startGame)