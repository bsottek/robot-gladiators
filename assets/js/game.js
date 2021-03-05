var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 10) + min);

    return value;
}

var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You only have " + this.money + " dollars! This action costs 7 dollars.");
        }

    },
    upgradeAttack: function() {
        if ( this.money >= 7) {
            window.alert("Upgrading " + this.name + " attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You only have " + this.money + " dollars! This action costs 7 dollars.");
        }
    }
}

var enemyInfo = [
    {
        name:"Roberto",
        attack: randomNumber(10, 14)
    },
    {
        name:"Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name:"Robo Trumble",
        attack: randomNumber(10, 14)
    }
]

var fightOrSkip = function() {
    //ask player if they'd like to fight or skip
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.');

    //coerce repsonse to lower case
    promptFight = promptFight.toLowerCase();

    //Conditional recursive function call
    if(!promptFight) {
        window.alert("Please provide a valid answer!")
        return fightOrSkip();
    }
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to skip?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
            // subtract money from playerInfo.money for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money)
            shop();
        }
    }
}

var fight = function (enemy) {

    //keep track of who attacks first
    var isPlayerTurn = true;
    if(Math.random() > 0.5){
        isPlayerTurn = false;
    }
    console.log("isPlayerTurn: " + isPlayerTurn);

    while (playerInfo.health > 0 && enemy.health > 0) {
        console.log("isPlayerTurn: " + isPlayerTurn);
        if(isPlayerTurn){
            //present with option to fight or skip
            fightOrSkip();
            
            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);

            console.log(
                playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
            );

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + ' has died!');

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                //ask if player wants to use the store
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes, call store function
                if (storeConfirm) {
                    shop();
                }
                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
            }

            // generate random damage based on enemy attack
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);
            
            console.log(
                enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
            );

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + ' has died!');
                // leave while() loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
            }
        } else {
            // generate random damage based on enemy attack
            var damage = randomNumber(enemy.attack - 3, enemy.attack);

            playerInfo.health = Math.max(0, playerInfo.health - damage);

            console.log(
                enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
            );

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + ' has died!');
                // leave while() loop if player is dead
                break;
            } else {
                window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');

                // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

            enemy.health = Math.max(0, enemy.health - damage);

            console.log(
                playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
            );

            // check enemy's health
            if (enemy.health <= 0) {
                window.alert(enemy.name + ' has died!');

                // award player money for winning
                playerInfo.money = playerInfo.money + 20;

                // leave while() loop since enemy is dead
                break;
            } else {
                window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
                }
            }
            //switch turn for next round
            isPlayerTurn = !isPlayerTurn;
        }
    }
}

var startGame = function() {
    // reset player stats
playerInfo.reset();

    for(var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(1, 2);
            fight(pickedEnemyObj);
            }
        else{
            endGame();
        }
    }
}


var endGame = function() {
    //if player is alive, player wins
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
        var highScore = localStorage.getItem('highScore');
        if(playerInfo.money > highScore) {
            localStorage.setItem('highScore', playerInfo.money);
            window.alert("You set a new high score!");
        }else {
            window.alert("You did not beat the high score of " + highScore);
        }
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon.");
    }
}

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE to make a choice."
    );

    switch (shopOptionPrompt) {
        case "1":
            playerInfo.refillHealth();
            break;

        case "2":
            playerInfo.upgradeAttack();
            break;

        case "3":
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            //recall shop for player to enter valid option
            shop();
            break;
    }
}


// start game on page load
startGame();
endGame();