import {createElement} from "../modules/utils.js";

export class createPlayer {

    constructor(props, playerNum){
        this.player = playerNum;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.weapon = props.weapon;
        this.kickParams = {};
    }

    attack = (value) => {
        this.changeHP(value);
        this.renderHP();
    }

    changeHP = (value) => {
        this.hp -= value;
        if(this.hp <= 0) this.hp = 0
    }

    elHP = () => {
        return document.querySelector(`.player${this.player}  .life`);
    }

    renderHP = () => {
        this.elHP().style.width =  `${this.hp}%`;
    }

    createPlayer = () => {
        const {player, name, hp, img} = this;
        const $player = createElement('div', `player${player}`);
        const $progressBar = createElement('div','progressbar');
        const $divPlayerLife = createElement('div','life');
        const $divPlayerName = createElement('div', 'name');
        const $playerCharacter = createElement('div','character');
        const $playerIMG = createElement('img');

        $divPlayerLife.style.width = `${hp}%`;

        $divPlayerName.innerText = name;
        $progressBar.appendChild($divPlayerLife);

        $progressBar.appendChild($divPlayerName);
        $playerIMG.src = img;

        $playerCharacter.appendChild($playerIMG);

        $player.appendChild($progressBar);
        $player.appendChild($playerCharacter);

        return $player;

    };

}