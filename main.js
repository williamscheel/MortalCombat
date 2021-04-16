const $divArenas = document.querySelector('.arenas');
const $buttonFight = document.querySelector('.button');
const $formFight = document.querySelector('.control');

const HIT = {
    'head'   : 50,
    'body'  : 25,
    'foot'  : 20,
};
const ATTACK = ['head', 'body', 'foot'];

const subzero = {
    player: 1,
    name: 'Subzero',
    hp: 100,
    changeHP,
    elHP,
    renderHP,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['Ice scepter'],
    attack
};
const sonya = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    changeHP,
    elHP,
    renderHP,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Wind blade'],
    attack
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

function changeHP(value){
    this.hp -= value;
    if(this.hp <= 0) this.hp = 0
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
  
    $buttonFight.disabled = true;
    $divArenas.appendChild(createReloadButton());

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

function getRandom(num){
    return Math.ceil(Math.random()*num);
}

$divArenas.appendChild(createPlayer(subzero));
$divArenas.appendChild(createPlayer(sonya));

function enemyAttack(){
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value   : getRandom(HIT[hit]),
        hit     : hit,
        defence : defence
    };
}

function attack(value){
    this.changeHP(value);
    this.renderHP();
}

$formFight.addEventListener('submit', function(e){
    e.preventDefault();
    const enemy = enemyAttack();
    const attack = {};

    for(let item of $formFight){
        if(item.checked === true && item.name === 'hit'){
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if(item.checked === true && item.name === 'defence'){
            attack.defence = item.value;
        }
        item.checked = false;
    }
    // console.log('## enemy: ', enemy);
    // console.log('## atack: ', attack);


    if(attack.hit != enemy.defence){
        sonya.attack(attack.value);
    }
    if(enemy.hit != attack.defence){
        subzero.attack(enemy.value);
    }

    if(subzero.hp === 0 && subzero.hp < sonya.hp ){
        $divArenas.appendChild(playerWins( 'Sonya'));
    } else if(sonya.hp === 0 && sonya.hp < subzero.hp){
        $divArenas.appendChild(playerWins( 'Subzero'));
    } else if(sonya.hp === 0 && subzero.hp === 0){
        $divArenas.appendChild(playerWins());
    }

});
