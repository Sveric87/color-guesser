const   game = document.getElementById("game"),
        display = document.getElementById("display"),
        splash = document.getElementById("splash"),
        displives = document.getElementById("lives"),
        displevel = document.getElementById("level");

function startGame(n){
    game.innerHTML = "";
    if(n > 6 && n <= 12){                   // Set width of gameboard to fit all elements
        game.style.width="720px";
        document.documentElement.style.setProperty('--height', '150px');
    } else if (n > 12) {
        game.style.width="900px";
    }

    let red, green, blue;                   // Create n cards with random colors
    const colorArray = [];
    for(let i = 0; i < n; i++){
        red = Math.floor(Math.random()* 255);   
        green = Math.floor(Math.random()* 255);
        blue = Math.floor(Math.random()* 255);

        let colorCode = "rgb( " + red + ", " + green + ", " + blue + " )";
        colorArray.push(colorCode);     
        let addDiv = `  <div class='card' 
                            id='${i}' 
                            data-color='${colorCode}' 
                            style='background-color: ${colorCode}' 
                            onClick='checkCard(this)'>
                        </div>`;
        game.innerHTML += addDiv;}  
    const randomId = Math.floor(Math.random()*n);   // Pull 1 random code out of the Array
    const taskCode = colorArray[randomId];          // to set the searched code
    display.innerHTML = taskCode;
    if(level){displevel.innerHTML = "Level " + lvl + " / 15";} // Initiate the level display
    
}

function setLives(n){
    for(let i = 0; i < n; i++){
        displives.innerHTML += "&#x2764;";
    }    
}

function paintAll(color){       // If guess is correct, all cards will be colored in correct color
    let els = document.getElementsByClassName('card');
        [].forEach.call(els, function (el) {
            el.style.backgroundColor = color;
        });
}

function checkCard(choice){

    if(choice.dataset.color == display.innerHTML){
        paintAll(choice.dataset.color);
        if(level==true){
            if(lvl == 15){
                setTimeout(() => {                  // Show message pop-up
                    splash.style.display = "block";     
                }, 400);
            } else {
                lvl++;
                displevel.innerHTML = "Level " + lvl + " / 15";
                setTimeout(() => {
                    startGame(lvl);
                }, 400);
            }
        } else {
        setTimeout(() => {
            splash.style.display = "block";
        }, 400);}
    } else{
        choice.style.display = "none";      // Remove wrong card
        let sliced = displives.innerHTML.slice(0, -1);  // Remove one heart
        displives.innerHTML = sliced;
        lives--;
        if(lives == 0){         // Game over
            document.getElementById("winlose").innerHTML = "Game Over!";
            setTimeout(() => {
                splash.style.display = "block";    
            }, 400);
        }
    }
}