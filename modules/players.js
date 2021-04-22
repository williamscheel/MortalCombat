import {attack, changeHP, elHP, renderHP} from "./battle.js";

export const subzero = {
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
export const sonya = {
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
