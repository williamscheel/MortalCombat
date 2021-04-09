const $divArenas = document.querySelector('.arenas');
const $buttonRandom = document.querySelector('.button');

const subzero = {
    player: 1,
    name: 'Subzero',
    hp: 100,
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

function changeHP(player){
    const $playerLife = document.querySelector('.player'+ player.player +' .life');
    player.hp -= Math.random()*20;
    if(player.hp > 0){
        $playerLife.style.width = player.hp+'%';
    }else{
        $playerLife.style.width = '0%';
        if(player.player === 1) $divArenas.appendChild(playerLose('Sonya'));
        if(player.player === 2) $divArenas.appendChild(playerLose('Subzero'));
        $buttonRandom.disabled = true
    }
}

function playerLose(name){
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' Win!'

    return $loseTitle;
}


$buttonRandom.addEventListener('click', function () {
    changeHP(subzero);
    changeHP(sonya);
});

$divArenas.appendChild(createPlayer(subzero));
$divArenas.appendChild(createPlayer(sonya));
