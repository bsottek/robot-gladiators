var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function (enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
        // ask player if they'd liked to fight or run
        var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

        // coerce promptFight to lower-case
        promptFight = promptFight.toLowerCase();

        // if player picks "skip" confirm and then stop the loop
        if (promptFight === "skip") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to skip?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerName + ' has decided to skip this fight. Goodbye!');
                // subtract money from playerMoney for skipping
                playerMoney = Math.max(0, playerMoney - 10);
                console.log("playerMoney", playerMoney)
                break;
            }
        }

        // generate random damage value based on player's attack power
        var damage = randomNumber(playerAttack -3, playerAttack);

        enemyHealth = Math.max(0, enemyHealth - damage);

        console.log(
            playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + ' has died!');

            // award player money for winning
            playerMoney = playerMoney + 20;

            // leave while() loop since enemy is dead
            break;
        } else {
            window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
        }

        // generate random damage based on enemy attack
        var damage = randomNumber(enemyAttack - 3, enemyAttack);

        playerHealth = Math.max(0, playerHealth - damage);
        
        console.log(
            enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
        );

        // check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + ' has died!');
            // leave while() loop if player is dead
            break;
        } else {
            window.alert(playerName + ' still has ' + playerHealth + ' health left.');
        }
    }
}

var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
            var pickedEnemyName = enemyNames[i];
            enemyHealth = randomNumber(40, 60);
            fight(pickedEnemyName);

            //if not through last enemy array item
            if (i < enemyNames.length -1 && playerHealth > 0) {
                //ask if player wants to use the store
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                //if yes, call store function
                if (storeConfirm) {
                    shop();
            }
        }
        else{
            window.alert("You have lost your robot in battle! Game Over.");
            break;
        }
    }
}
}

var endGame = function() {
    //if player is alive, player wins
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter REFILL, UPGRADE, or LEAVE to make a choice."
    );

    // coerce player response to lower-case
    shopOptionPrompt = shopOptionPrompt.toLowerCase();

    switch (shopOptionPrompt) {
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");

                // increase health and decrease money
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;

        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;

        case "leave":
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");

            //recall shop for player to enter valid option
            shop();
            break;
    }
}

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 10) + min);

    return value;
}

// start game on page load
startGame();
endGame();