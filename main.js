const $divArenas = document.querySelector('.arenas');
const $buttonFight = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat')

const HIT = {
    'head'   : 100,
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
    //img: 'assets/subZeroKick.gif',
    weapon: ['Ice scepter'],
    attack,
    kickParams: {}
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
    attack,
    kickParams: {}
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
addEventChat(textLogsChat('start', subzero, sonya));



function enemyAttack(){
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value   : getRandom(HIT[hit]),
        hit     : hit,
        defence : defence
    };
}

function playerAttack(){
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
    return attack;
}

function attack(value){
    this.changeHP(value);
    this.renderHP();
}

function waitKick(ms) {
    return new Promise(resolve => {

        setTimeout(resolve, ms);
    });
}

async function charactersPunch(player1, player2){
    if(player1.kickParams.hit !== player2.kickParams.defence){
        player2.attack(player1.kickParams.value);
        const textLog = textLogsChat('hit', player1, player2);
        addEventChat(textLog);
    } else if(player1.kickParams.hit === player2.kickParams.defence){
        const textLog = textLogsChat('defence', player1, player2);
        addEventChat(textLog);
    }

    $buttonFight.disabled = true; // отключаем кнопку на время выполнения функции waitKick

    await waitKick(4000);

    $buttonFight.disabled = false; // включаем кнопку удара после выполнения waitKick

    if(player2.kickParams.hit !== player1.kickParams.defence){
        subzero.attack(player2.kickParams.value);
        const textLog = textLogsChat('hit', player2, player1);
        addEventChat(textLog);
    } else if(player2.kickParams.hit === player1.kickParams.defence){
        const textLog = textLogsChat('defence', player2, player1);
        addEventChat(textLog);
    }
}

function fightResult(){
    if(subzero.hp === 0 && subzero.hp < sonya.hp ){
        $divArenas.appendChild(playerWins( 'Sonya'));
        const textLog = textLogsChat('end', sonya, subzero);
        addEventChat(textLog);
    } else if(sonya.hp === 0 && sonya.hp < subzero.hp){
        $divArenas.appendChild(playerWins( 'Subzero'));
        const textLog = textLogsChat('end', subzero, sonya);
        addEventChat(textLog);
    } else if(sonya.hp === 0 && subzero.hp === 0){
        $divArenas.appendChild(playerWins());
        const textLog = textLogsChat('draw');
        addEventChat(textLog);
    }
}

$formFight.addEventListener('submit', function(e){
    e.preventDefault();
    sonya.kickParams = enemyAttack();
    subzero.kickParams = playerAttack();

    charactersPunch(subzero, sonya);
    fightResult();

});


function getCurrentTime(){
    const date = new Date();
    // const getYear = date.getFullYear();
    // const getMonth = ('0' + (date.getMonth()+1)).slice(-2);
    // const getDay = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${hours}:${minutes}`;
}


function textLogsChat(type, playerInitiator, playerOpponent){
    const randomNumber = getRandom(logs[type].length - 1);
    const time = getCurrentTime();
    let text = '';

    switch(type){
        case 'start':
            text = logs.start.replace('[time]', time)
                                .replace('[player1]', playerInitiator.name)
                                .replace('[player2]', playerOpponent.name);
            break;
        case 'end':
            text = logs.end[randomNumber].replace('[playerWins]', playerInitiator.name)
                                            .replace('[playerLose]', playerOpponent.name);
            break;
        case 'hit':
            text = logs.hit[randomNumber].replace('[playerKick]', playerInitiator.name)
                                            .replace('[playerDefence]', playerOpponent.name);

            break;
        case 'defence':
            text =  logs.defence[randomNumber].replace('[playerKick]', playerInitiator.name)
                                                .replace('[playerDefence]', playerOpponent.name);
            break;
        case 'draw':
            text = logs.draw;
            break;
        default:
            text = 'ERROR! Переменная type не определена!';
            break
    }

    if(type !== 'start') {
        text = `[${ time }] ${text} `;
        if(type === 'hit') {
            text += `[-${playerInitiator.kickParams.value}HP], [${playerOpponent.hp}/100]`;
        } else {
            text += `[Урон не был нанесен] [${playerOpponent.hp}/100]`;
        }
    }

    return text;
}


function addEventChat(text){
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}