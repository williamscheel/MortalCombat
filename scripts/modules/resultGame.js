import {player1, player2} from "./players.js";
import textLogsChat from "./logChat.js";
import {createElement} from "./utils.js";

import {$buttonFight, $divArenas} from "../data/constants.js";


const playerWins = (name) => {
    const $loseTitle = createElement('div', 'loseTitle');
    if(name) {
        $loseTitle.innerText =  `${name} Wins!`
    } else {
        $loseTitle.innerText = 'Draw!'
    }

    $buttonFight.disabled = true;
    //
    $divArenas.appendChild(createReloadButton());

    return $loseTitle;
}

const createReloadButton = () => {
    const $divReloadButton = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');

    $reloadButton.innerText = 'Restart';
    $reloadButton.addEventListener('click', function(){
        window.location.reload();
    });

    $divReloadButton.appendChild($reloadButton);
    return $divReloadButton;
}

const fightResult = () =>{
    if(player1.hp === 0 && player1.hp < player2.hp ){
        $divArenas.appendChild(playerWins( player2.name));
        textLogsChat('end', player2, player1);
    } else if(player2.hp === 0 && player2.hp < player1.hp){
        $divArenas.appendChild(playerWins( player1.name));
        textLogsChat('end', player1, player2);
    } else if(player2.hp === 0 && player1.hp === 0){
        $divArenas.appendChild(playerWins());
        textLogsChat('draw');
    }
}

export default fightResult;