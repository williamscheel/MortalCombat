const Subzero = {
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice scepter'],
    attack: function() {
        console.log(this.name + ' fight');
    }
};

const Sonya = {
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Wind blade'],
    attack: function() {
        console.log(this.name + ' fight');
    }
}

const $divArenas = document.querySelector('.arenas');

function createPlayer(playerClass, player) {

    const $divPlayerLife = document.createElement('div');
    $divPlayerLife.classList.add('life');
    $divPlayerLife.style.width = player.hp+'%';

    const $divPlayerName = document.createElement('div');
    $divPlayerName.classList.add('name');
    $divPlayerName.innerText = player.name;

    const $progressBar = document.createElement('div');
    $progressBar.classList.add('progressbar');
    $progressBar.appendChild($divPlayerLife);
    $progressBar.appendChild($divPlayerName);

    const $playerIMG = document.createElement('img');
    $playerIMG.src = player.img;

    const $playerCharacter = document.createElement('div');
    $playerCharacter.classList.add('character');
    $playerCharacter.appendChild($playerIMG);

    const $player = document.createElement('div');
    $player.classList.add(playerClass);
    $player.appendChild($progressBar);
    $player.appendChild($playerCharacter);

    $divArenas.appendChild($player);

}

createPlayer('player1', Subzero);
createPlayer('player2', Sonya);