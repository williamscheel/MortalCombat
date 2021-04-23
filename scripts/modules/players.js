import {playerList} from '../data/playerList.js';
import {getRandom} from "../modules/utils.js";

import {createPlayer1, createPlayer2} from "../classes/createPlayer.js";

export const player1 = new createPlayer1(playerList[getRandom(Object.keys(playerList).length - 1)]);
export const player2 = new createPlayer2(playerList[getRandom(Object.keys(playerList).length - 1)]);