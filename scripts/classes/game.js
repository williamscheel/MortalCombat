import fightResult from "../modules/resultGame.js";
import textLogsChat from "../modules/logChat.js";
import {player1, player2} from "../modules/players.js";
import { charactersPunch, enemyAttack, playerAttack } from "../modules/battle.js";
import {$divArenas, $formFight} from "../data/constants.js";

class Game {

    start = () => {
        $divArenas.appendChild(player1.createPlayer());
        $divArenas.appendChild(player2.createPlayer());

        textLogsChat('start', player1, player2);

        $formFight.addEventListener('submit', function(e){
            e.preventDefault();
            player2.kickParams = enemyAttack();
            player1.kickParams = playerAttack();

            charactersPunch(player1, player2);
            fightResult();

        });
    }
}

export default Game;