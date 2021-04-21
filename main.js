import fightResult from "./modules/resultGame.js";
import textLogsChat from "./modules/logChat.js";
import {subzero, sonya} from "./modules/players.js";
import { charactersPunch, enemyAttack, playerAttack } from "./modules/battle.js";

export const $divArenas = document.querySelector('.arenas');
export const $buttonFight = document.querySelector('.button');
export const $formFight = document.querySelector('.control');

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if(className){
        $tag.classList.add(className);
    }
    return $tag;
}

export const createPlayer = (player) => {
    const {player: playerNum, name, hp} = player;

    const $player = createElement('div', 'player'+playerNum);
    const $progressBar = createElement('div','progressbar');
    const $divPlayerLife = createElement('div','life');
    const $divPlayerName = createElement('div', 'name');
    const $playerCharacter = createElement('div','character');
    const $playerIMG = createElement('img');

    $divPlayerLife.style.width = hp+'%';

    $divPlayerName.innerText = name;
    $progressBar.appendChild($divPlayerLife);

    $progressBar.appendChild($divPlayerName);
    $playerIMG.src = player.img;

    $playerCharacter.appendChild($playerIMG);

    $player.appendChild($progressBar);
    $player.appendChild($playerCharacter);

    return $player;

}

$divArenas.appendChild(createPlayer(subzero));
$divArenas.appendChild(createPlayer(sonya));

textLogsChat('start', subzero, sonya);

$formFight.addEventListener('submit', function(e){
    e.preventDefault();
    sonya.kickParams = enemyAttack();
    subzero.kickParams = playerAttack();

    charactersPunch(subzero, sonya);
    fightResult();

});

