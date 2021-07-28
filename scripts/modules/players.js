import {createPlayer} from "../classes/createPlayer.js";

export const player1 = new createPlayer(JSON.parse(localStorage.getItem('player1')), 1);

export const player2 = new createPlayer(await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json()), 2);