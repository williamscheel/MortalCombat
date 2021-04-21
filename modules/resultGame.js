import {createElement, $divArenas, $buttonFight} from "../main.js";
import {subzero, sonya} from "./players.js";
import textLogsChat from "./logChat.js";

const playerWins = (name) => {
    const $loseTitle = createElement('div', 'loseTitle');
    if(name) {
        $loseTitle.innerText = name + ' Wins!'
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
    if(subzero.hp === 0 && subzero.hp < sonya.hp ){
        $divArenas.appendChild(playerWins( 'Sonya'));
        textLogsChat('end', sonya, subzero);
    } else if(sonya.hp === 0 && sonya.hp < subzero.hp){
        $divArenas.appendChild(playerWins( 'Subzero'));
        textLogsChat('end', subzero, sonya);
    } else if(sonya.hp === 0 && subzero.hp === 0){
        $divArenas.appendChild(playerWins());
        textLogsChat('draw');
    }
}

export default fightResult;