import {logs} from "../logs.js";
import {getRandom, getCurrentTime} from "./utils.js";


const $chat = document.querySelector('.chat');

const textLogsChat = (type, playerInitiator, playerOpponent) => {
    const {name: nameInitiator, hp: hpInitiator, kickParams:{value: kickValueInitiator }} = playerInitiator;
    const {name: nameOpponent, hp: hpOpponent,kickParams:{value: kickValueOpponent }} = playerOpponent;

    const randomNumber = getRandom(logs[type].length - 1);
    const time = getCurrentTime();
    let text = '';

    switch(type){
        case 'start':
            text = logs.start.replace('[time]', time)
                .replace('[player1]', nameInitiator)
                .replace('[player2]', nameOpponent);
            break;
        case 'end':
            text = logs.end[randomNumber].replace('[playerWins]', nameInitiator)
                .replace('[playerLose]', nameOpponent);
            break;
        case 'hit':
            text = logs.hit[randomNumber].replace('[playerKick]', nameInitiator)
                .replace('[playerDefence]', nameOpponent);

            break;
        case 'defence':
            text =  logs.defence[randomNumber].replace('[playerKick]', nameInitiator)
                .replace('[playerDefence]', nameOpponent);
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
            text += `[-${kickValueInitiator}HP], [${hpOpponent}/100]`;
        } else {
            text += `[Урон не был нанесен] [${hpOpponent}/100]`;
        }
    }

    addEventChat(text);
}


const addEventChat = (text) => {
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

export default textLogsChat;