import {logs} from "../data/logs.js";
import {getRandom, getCurrentTime} from "./utils.js";


const $chat = document.querySelector('.chat');
const getTextLog = (type, nameInitiator, nameOpponent, time) => {
    const randomNumber = getRandom(logs[type].length - 1);

    switch(type){
        case 'start':
            return logs.start
                        .replace('[time]', time)
                        .replace('[player1]', nameInitiator)
                        .replace('[player2]', nameOpponent);
            break;
        case 'end':
            return logs.end[randomNumber]
                        .replace('[playerWins]', nameInitiator)
                        .replace('[playerLose]', nameOpponent);
            break;
        case 'hit':
            return logs.hit[randomNumber]
                    .replace('[playerKick]', nameInitiator)
                    .replace('[playerDefence]', nameOpponent);
        case 'defence':
            return  logs.defence[randomNumber]
                    .replace('[playerKick]', nameInitiator)
                    .replace('[playerDefence]', nameOpponent);
            break;
        case 'draw':
            return logs.draw;
            break;
        default:
            return 'ERROR! Переменная type не определена!';
            break
    }
} ;

const textLogsChat = (type, {name: nameInitiator, kickParams:{value: kickValueInitiator }}, {name: nameOpponent, hp: hpOpponent}) => {

    const time = getCurrentTime();

    let text = getTextLog(type, nameInitiator, nameOpponent, time);

    switch(type){
        case 'hit':
            text = `[${time}] ${text} <span class="damage">[${kickValueInitiator}HP]</span>, <span class="health">[${hpOpponent}/100]</span>`;
            break;
        case 'defence':
            text = `[${time}] ${text} <span class="miss">[ПРОМАХ]</span>,  <span class="health">[${hpOpponent}/100]</span>`;
            break;
    }

    addEventChat(text);
}


const addEventChat = (text) => {
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

export default textLogsChat;