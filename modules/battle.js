import {$buttonFight, $formFight} from "../main.js";
import textLogsChat from "./logChat.js";
import {subzero} from "./players.js";
import {getRandom} from "./utils.js";

const HIT = {
    'head'   : 100,
    'body'  : 25,
    'foot'  : 20,
};
const ATTACK = ['head', 'body', 'foot'];


export const enemyAttack = () => {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value   : getRandom(HIT[hit]),
        hit     : hit,
        defence : defence
    };
}

export const playerAttack = () => {
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

/** this */
export function attack(value){
    this.changeHP(value);
    this.renderHP();
}

export function changeHP(value){
    this.hp -= value;
    if(this.hp <= 0) this.hp = 0
}

export function elHP(){
    return document.querySelector('.player'+ this.player +' .life');
}

export function renderHP(){
    this.elHP().style.width = this.hp + '%';
}

/** this */

const waitKick = (ms) => {
    return new Promise(resolve => {

        setTimeout(resolve, ms);
    });
}

export async function charactersPunch(player1, player2){
    const {kickParams: {value: valueKickPlayer1, hit: hitPlayer1, defence: defencePlayer1}} = player1;
    const {kickParams: {value: valueKickPlayer2, hit: hitPlayer2, defence: defencePlayer2}} = player2;

    if(hitPlayer1 !== defencePlayer2){
        player2.attack(player1.kickParams.value);
        textLogsChat('hit', player1, player2);
    } else if(hitPlayer1 === defencePlayer2){
        textLogsChat('defence', player1, player2);
    }

    $buttonFight.disabled = true; // отключаем кнопку на время выполнения функции waitKick
    await waitKick(4000);
    $buttonFight.disabled = false; // включаем кнопку удара после выполнения waitKick

    if(hitPlayer2 !== defencePlayer1){
        subzero.attack(player2.kickParams.value);
        textLogsChat('hit', player2, player1);
    } else {
        textLogsChat('defence', player2, player1);
    }
}
