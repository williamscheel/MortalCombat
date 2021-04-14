const $divArenas = document.querySelector('.arenas');
const $buttonRandom = document.querySelector('.button');

const subzero = {
    player: 1,
    name: 'Subzero',
    hp: 100,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice scepter'],
    attack: function() {
        console.log(this.name + ' fight');
    }
};
const sonya = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Wind blade'],
    attack: function() {
        console.log(this.name + ' fight');
    }
}

function createElement(tag, className){
    const $tag = document.createElement(tag);
    if(className){
        $tag.classList.add(className);
    }
    return $tag;
}

function createPlayer(player) {

    const $player = createElement('div', 'player'+player.player);
    const $progressBar = createElement('div','progressbar');
    const $divPlayerLife = createElement('div','life');
    const $divPlayerName = createElement('div', 'name');
    const $playerCharacter = createElement('div','character');
    const $playerIMG = createElement('img');

    $divPlayerLife.style.width = player.hp+'%';

    $divPlayerName.innerText = player.name;
    $progressBar.appendChild($divPlayerLife);

    $progressBar.appendChild($divPlayerName);
    $playerIMG.src = player.img;

    $playerCharacter.appendChild($playerIMG);

    $player.appendChild($progressBar);
    $player.appendChild($playerCharacter);

    return $player;

}

function changeHP(){
    this.hp -= Math.random()*20;
    if(this.hp <= 0) this.hp = 0
    this.renderHP();
}

function elHP(){
    return document.querySelector('.player'+ this.player +' .life');
}

function renderHP(){
    this.elHP().style.width = this.hp + '%';
}

function playerWins(name){
    const $loseTitle = createElement('div', 'loseTitle');
    if(name) {
        $loseTitle.innerText = name + ' Wins!'
    } else {
        $loseTitle.innerText = 'Draw!'
    }
    return $loseTitle;
}


function createReloadButton(){
    const $divReloadButton = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';
    $reloadButton.addEventListener('click', function(){
        window.location.reload();
    });

    $divReloadButton.appendChild($reloadButton);
    return $divReloadButton;
}

$buttonRandom.addEventListener('click', function () {
    subzero.changeHP();
    sonya.changeHP();

    if(subzero.hp === 0 || sonya.hp === 0) {
        $buttonRandom.disabled = true;
        $divArenas.appendChild(createReloadButton());
    }

    if(subzero.hp === 0 && subzero.hp < sonya.hp ){
        $divArenas.appendChild(playerWins( 'Sonya'));
    } else if(sonya.hp === 0 && sonya.hp < subzero.hp){
        $divArenas.appendChild(playerWins( 'Subzero'));
    } else if(sonya.hp === 0 && subzero.hp === 0){
        $divArenas.appendChild(playerWins());
    }

});

$divArenas.appendChild(createPlayer(subzero));
$divArenas.appendChild(createPlayer(sonya));
