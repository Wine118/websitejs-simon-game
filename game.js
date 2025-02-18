// Array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Game variables
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var userTurn = false;
var gameover = false;

// Detect keypress to start game
$(document).keypress(function (event) {
    if (!started) {
        if (event.key !== "`" || event.key !== "`") {
        $(".level").text("Level " + level);
        $("#level-title").text("Simon Game").css("font-size", "3rem");
        setTimeout(() => {
            c=10;
        }, 1000);
        nextSequence();
        started = true;
    }
    }
});

// Detect button clicks
$(".btn").click(function () {
    if (userTurn) {
        var userChosenColour = $(this).attr("id"); // Get clicked button ID
        userClickedPattern.push(userChosenColour); // Store user's choice
        playSound(userChosenColour); // Play sound
        animatePress(userChosenColour); // Animate button press
        checkAnswer(userClickedPattern.length - 1);
    }
});

// Detect keyboard presses for r, g, b, y keys
$(document).keydown(function (event) {
    if (userTurn) {
        var keyPressMap = {
            "r": "red",
            "g": "green",
            "b": "blue",
            "y": "yellow"
        };

        var keyPressed = event.key.toLowerCase();
        if (keyPressMap[keyPressed]) {
            var userChosenColour = keyPressMap[keyPressed];
            userClickedPattern.push(userChosenColour); // Store user's choice
            playSound(userChosenColour); // Play sound
            animatePress(userChosenColour); // Animate button press
            checkAnswer(userClickedPattern.length - 1);
        }
    }
});

// Function to play sound based on color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to generate next sequence
function nextSequence() {
    userClickedPattern = []; // Reset user input pattern
    userTurn = false;
    $(".level").text("Level " + level);
    $("#level-title").text("Computer's Turn");

    // Reset gamePattern at the start of each new level
    gamePattern = [];
    no = level
    // If level 1, generate random sequence 0 or 1
    for (var i = 0; i < no+1; i++) {
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
    }

    // Display the generated sequence in the console for debugging
    console.log("Computer's Sequence: ", gamePattern);  

    // Change background color during computer's turn
    $("body").css("background-color", "#011F3F"); // Example color change during computer's turn

    // Flash the randomly selected button with a 0.5-second delay between each
    gamePattern.forEach(function(colour, index) {
        setTimeout(function() {
            $("#" + colour).fadeOut(100).fadeIn(100);
            playSound(colour);
        }, 1000 * index); // Delay each color by 0.5 seconds * its index
    });

    // After the sequence, wait for the user to press buttons
    setTimeout(function() {
        $("body").css("background-color", "#CBC3E3"); // Original background color
        $("#level-title").text("Your Turn");
        userTurn = true;
    }, 1000 * gamePattern.length); // Wait for the sequence to finish flashing
}


// Function to check user answer
function checkAnswer(currentLevel) {
    // Compare the entire userClickedPattern with the gamePattern
    if (userClickedPattern[currentLevel] !== gamePattern[currentLevel]) {
        // If there's a mismatch, trigger the game over function
        gameOver();
        return;
    }

    // If userClickedPattern is the same as gamePattern up to the current point
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
            nextSequence(); // Move to the next sequence
        }, 1000);
        level++;
        userTurn = false; // Disable user input while the computer plays the next sequence
    }
}


// Function to handle game over
function gameOver() {
    gameover = true;
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Click reset or press '`'to Restart").css("font-size", "2rem");;
    $("body").removeClass("game-over");
    // Listen for a button click to restart the game
    $(".reset").click(function () {    
        if (gameover){   
            $(".level").text("Level " + level);
            $("#level-title").text("Simon Game").css("font-size", "3rem");
            $("body").css("background-color", "#011F3F");
            resetGame();          
        }         
    });

    // Detect keydown events, specifically the "space" key to reset the game
    $(document).keydown(function(event) {
        // Check if the key pressed is the "space" key (key code 32)
        if(gameover){
        if (event.key === "`" || event.key === "`") {
            $(".level").text("Level " + level);
            $("#level-title").text("Simon Game").css("font-size", "3rem");
            $("body").css("background-color", "#011F3F");
            resetGame();
        }}
    });

    // Reset the game level to 0 after button click
    level = 0;
    $(".level").text("Level " + level);  // Set Level text to 0 immediately
}


// Function to animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Function to reset the game
function resetGame() {
    // Game variables
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    level = 0;
    userTurn = false;
    gameover=false;
    // Detect keypress to start game
    $(document).keypress(function (event) {
        if (!started) {
            if (event.key !== "`" || event.key !== "`") {
            $(".level").text("Level " + level);
            $("#level-title").text("Simon Game").css("font-size", "3rem");
            setTimeout(() => {
                c=10;
            }, 1000);
            nextSequence();
            started = true;
        }
        }
    });       
}
