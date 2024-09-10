const startBtn = document.querySelector('.start-btn')

const startGame = () =>{
    window.location.href = 'src/game-setup/game-setup.html';
}

startBtn.addEventListener('click',startGame)