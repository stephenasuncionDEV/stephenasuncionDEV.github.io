let canvas = document.getElementById("drawingCanvas");
let context = canvas.getContext("2d");

let pic_Background = new Image();
pic_Background.src = "Images/g_Background.jpg";
let pic_Ground = new Image();
pic_Ground.src = "Images/g_Ground.png";
let pic_Grass = new Image();
pic_Grass.src = "Images/g_Grass.png";
let pic_PlayerRight = new Image();
pic_PlayerRight.src = "Images/p_PlayerRight.png";
let pic_BulletHorizontal = new Image();
pic_BulletHorizontal.src = "Images/p_BulletHorizontal.png";
let pic_Logo = new Image();
pic_Logo.src = "Images/g_Logo.png";
let pic_Clouds = new Image();
pic_Clouds.src = "Images/g_Clouds.png";
let pic_Enemy = new Image();
pic_Enemy.src = "Images/g_Enemy.png"

let m_Countdown = new Audio("Sounds/m_Countdown.mp3");
let m_Start = new Audio("Sounds/m_Start.mp3");

let backgroundSpritePos = 0;
let groundSpritePos = 0;
let grassSpritePos = 0;
let cloudSpritePos = 0;
let gameScene = 0; //0 - Start Page, 1 - Countdown, 2 - Game
let gameBtnPadding = 0;

let playerArr = [];
let playerLastDir = 3;
let playerLastLook = 3;
let playerSpritePos = 0;
let playerSpriteResize = 0.25;
let playerBackPos = false;

let bulletsArr = [];
let bulletsPosArr = [];

let enemyArr = [];
let enemyVelocity = [];
let enemySpritePos = 0;
let enemySpriteResize = 0.25;
let enemyStopProduce = false;

let roundEnd = false;
let roundCount = 1;
let roundCount2 = 4;
let roundNum = 0;
let roundArr = [];
let roundTimer;
let roundTimerInt = 0;
let roundTimerSec = 0;

let canvas_FPS = 60;
let fCount = 0;

let powerVal = document.getElementById("powerVal");
let keyArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d", "f", " "];
let table = document.getElementById("roundTable");
let time = document.getElementById("timeVal");

let mouse = {
    x: 0,
    y: 0
}

let enemyVar = {
    e_MaxCount: 5
}

let gameSpeed = {
	s_Background: 0.4,
    s_Ground: 2,
    s_Clouds: 0.2,
    s_Grass: 1,
    s_Enemy: 3
}

let Physics = {
    groudLoc: 372,
    pSpeed: 0.8,
    jumpVelocity: 40,
    sideJumpVelocity: 0.2,
    gravity: 1
}

let controlKeys = new Object();
let enemyVel = new Object();

class Player {
    constructor(x, y, width, height, dX, dY, isJumping) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dX = dX;
        this.dY = dY;
        this.isJumping = isJumping;
    }

    Draw(direction) {
        if (fCount < 100) {
            context.shadowBlur = 30;
            context.shadowColor = "black";
        }

        if (direction == 2) {
            context.save();
            context.translate(this.x + this.x, this.y - this.y);
            context.scale(-1, 1);
            context.drawImage(pic_PlayerRight, playerSpritePos, 0, this.width, this.height, this.x, this.y, -(this.width * playerSpriteResize), this.height * playerSpriteResize);
            context.setTransform(1,0,0,1,0,0);
            context.restore();
        } else if (direction == 3) {
            context.drawImage(pic_PlayerRight, playerSpritePos, 0, this.width, this.height, this.x, this.y, this.width * playerSpriteResize, this.height* playerSpriteResize);
        }
        
        if (playerSpritePos > this.width * 16) {
            playerSpritePos = 0;
        }

        context.shadowBlur = 0;
    }

    Move(direction) {
        playerSpritePos += this.width;
        fCount >= 100 ? (context.shadowBlur = 40, context.shadowColor = "red") : (context.shadowBlur = 0);

        let up = controlKeys.ArrowUp || controlKeys.w || controlKeys[" "];
        let down = controlKeys.ArrowDown || controlKeys.s;
        let left = controlKeys.ArrowLeft || controlKeys.a;
        let right = controlKeys.ArrowRight || controlKeys.d;

        if (up && this.isJumping == false) {
            this.dY -= Physics.jumpVelocity;
            this.isJumping = true;
        }

        if (down == true) {
            this.dY += Physics.jumpVelocity;
        }

        let newX = this.x + (this.width * playerSpriteResize) + this.dX;

        if (newX < canvas.width) {
            if (this.isJumping && right) {
                this.dX += Physics.sideJumpVelocity;
            }
    
            if (right) {
                this.dX += Physics.pSpeed;
            }
        }

        if (this.x > 0) {
            if (this.isJumping && left) {
                this.dX -= Physics.sideJumpVelocity;
            }
    
            if (left) {
                this.dX -= Physics.pSpeed;
            }
        }

        if (this.x + this.dX < 0) {
            this.x = 0;
        }

        if (newX > canvas.width) {
            this.x = canvas.width - (this.width * playerSpriteResize) - this.dX;
        }

        this.dY += Physics.gravity;
        this.x += this.dX;
        this.y += this.dY;
        this.dX *= 0.9;
        this.dY *= 0.9;
        
        if (this.y >= Physics.groudLoc) {
            this.isJumping = false;
            this.y = Physics.groudLoc;
            //this.x -= gameSpeed.s_Ground;
        }

        this.Draw(direction);
    }
}

class Bullets {
    constructor(x, y, width, height, dX, dY) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dX = dX;
        this.dY = dY;
    }

    Draw(direction) {
        fCount >= 100 ? (context.shadowBlur = 10, context.shadowColor = "red") : (context.shadowBlur = 0);
        context.shadowBlur = 30;
        context.shadowColor = "orange";
        if (direction == 2) {
            context.save();
            context.translate(this.x + this.x, this.y - this.y);
            context.scale(-1, 1);
            context.drawImage(pic_BulletHorizontal, this.x, this.y, this.width, this.height);
            context.setTransform(1,0,0,1,0,0);
            context.restore();
        } else {
            context.drawImage(pic_BulletHorizontal, this.x, this.y, this.width, this.height);
        }
        context.shadowBlur = 0;
    }

    Move(direction) {
        if (direction == 2) {
            this.x = this.x - this.dX;
        } else if (direction == 3) {
            this.x = this.x + this.dX;
        }
        this.Draw(direction);
    }
}

class Enemy {
    constructor(x, y, width, height, dX, dY, dead) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dX = dX;
        this.dY = dY;
        this.dead = dead;
    }

    Draw() {    
        enemySpritePos += this.width;
        context.shadowBlur = 10;
        context.shadowColor = "black";
        let centerX = canvas.height / 2;
        if (playerArr[0].x > centerX) {
            context.save();
            context.translate(this.x + this.x, this.y - this.y);
            context.scale(-1, 1);
            context.drawImage(pic_Enemy, enemySpritePos, 0, this.width, this.height, this.x, this.y, this.width * enemySpriteResize, this.height * enemySpriteResize);
            context.setTransform(1,0,0,1,0,0);
            context.restore();
        } else {
            context.drawImage(pic_Enemy, enemySpritePos, 0, this.width, this.height, this.x, this.y, this.width * enemySpriteResize, this.height * enemySpriteResize);
        }
        if (enemySpritePos > this.width * 24) {
            enemySpritePos = 0;
        }
        context.shadowBlur = 0;
    }

    Move() {
        if (this.x > playerArr[0].x) {
            this.x -= getRNDM(1, gameSpeed.s_Enemy);
        } else {
            this.x += getRNDM(1, gameSpeed.s_Enemy);
        }

        if (this.y > playerArr[0].y) {
            this.y -= getRNDM(1, gameSpeed.s_Enemy);
        } else {
            this.y += getRNDM(1, gameSpeed.s_Enemy);
        }

        this.Draw();
    }

    CheckCollision() {
        for (let f = 0; f < bulletsArr.length; f++) {
            if (isInside(this.x, this.y, (this.width * enemySpriteResize), this.height * enemySpriteResize, bulletsArr[f].x, bulletsArr[f].y)) {
                this.dead = true;
                this.x = 0;
                bulletsArr.splice(f, 1);
            } else {
                this.dead = false;
            }
        }
        if (isInside(this.x, this.y, this.width * enemySpriteResize - 50, this.height * enemySpriteResize, playerArr[0].x, playerArr[0].y)) {
           enemyStopProduce = false;
           gameChange(0);
        }
    }
}

function SetupGame() {
    SetupDrawing();
    window.requestAnimationFrame(Animate);
}

SetupGame();

function SetupDrawing() {
    let dX = 10;
    let dY = 10;
    let width = 218;
    let height = 304;
    let centerX = 0;
    let centerY = canvas.height - pic_Ground.height - (height * playerSpriteResize);
    let p_Drawing = new Player(centerX, centerY, width, height, dX, dY, false);
    playerArr.push(p_Drawing);
}

function AddBullet() {
    let bulletX = (playerArr[0].x + playerArr[0].width * playerSpriteResize) - ((playerArr[0].width * playerSpriteResize) / 2);
    let bulletY = (playerArr[0].y + playerArr[0].height * playerSpriteResize) - ((playerArr[0].height * playerSpriteResize) / 2);
    bullet = new Bullets(bulletX, bulletY, 45, 25, 10, 10);
    bulletsArr.push(bullet)
    bulletsPosArr.push(playerLastLook);
}

function DrawBackground() {
    backgroundSpritePos -= gameSpeed.s_Background;
    context.drawImage(pic_Background, backgroundSpritePos, 0, pic_Background.width, pic_Background.height);
    if (backgroundSpritePos < -pic_Background.width){
        backgroundSpritePos = 0;
    }
    context.drawImage(pic_Background, backgroundSpritePos + pic_Background.width, 0, pic_Background.width, pic_Background.height);
}

function DrawGround() {
    groundSpritePos -= gameSpeed.s_Ground;
    context.drawImage(pic_Ground, groundSpritePos, canvas.height - (pic_Ground.height), pic_Ground.width, pic_Ground.height);
    if (groundSpritePos < -pic_Ground.width){
        groundSpritePos = 0;
    }
    context.drawImage(pic_Ground, groundSpritePos + pic_Ground.width, canvas.height - (pic_Ground.height), pic_Ground.width, pic_Ground.height);
}

function DrawGrass() {
    grassSpritePos -= gameSpeed.s_Grass;
    context.shadowBlur = 20;
    context.shadowColor = "rgb(22, 37, 25)";
    context.drawImage(pic_Grass, grassSpritePos, canvas.height - (pic_Grass.height), pic_Grass.width, pic_Grass.height);
    if (grassSpritePos < -pic_Grass.width){
        grassSpritePos = 0;
    }
    context.drawImage(pic_Grass, grassSpritePos + pic_Grass.width, canvas.height - (pic_Grass.height), pic_Grass.width, pic_Grass.height);
    context.shadowBlur = 0;
}

function DrawClouds() {
    cloudSpritePos -= gameSpeed.s_Clouds;
    context.shadowBlur = 40;
    context.shadowColor = "white";
    context.drawImage(pic_Clouds, cloudSpritePos, 100, pic_Clouds.width, pic_Clouds.height);
    if (cloudSpritePos < -pic_Clouds.width * 2) {
        cloudSpritePos = 0;
    }
    context.drawImage(pic_Clouds, cloudSpritePos + pic_Clouds.width, 20, pic_Clouds.width, pic_Clouds.height);
    context.drawImage(pic_Clouds, cloudSpritePos + pic_Clouds.width * 2, 100, pic_Clouds.width, pic_Clouds.height);
    context.shadowBlur = 0;
}

function DrawPlayer() {
    if (playerArr.length > 0 && gameScene == 2) {
        playerArr[0].Move(playerLastLook);
    }
}

function DrawBullet() {
    if (bulletsArr.length > 0) {
        for (let b = 0; b < bulletsArr.length; b++) {
            bulletsArr[b].Move(bulletsPosArr[b]);
            if (bulletsArr[b].x + bulletsArr[b].width < 0 || bulletsArr[b].x > canvas.width) {
                bulletsArr.splice(b, 1);
                bulletsPosArr.splice(b, 1);
            }
            if (bulletsArr.length == 0) {
                bulletsPosArr = [];
            }
            if (bulletsArr.length < bulletsPosArr.length) {
                let dif = bulletsPosArr.length - bulletsArr.length;
                for (let d = 0; d < dif; d++) {
                    bulletsPosArr.pop();
                }
            }
        }
    }
}

function DrawLogo() {
    context.drawImage(pic_Logo, canvas.width / 2 - (pic_Logo.width / 2), 50, pic_Logo.width, pic_Logo.height);
}

function AddEnemy() {
    if (roundEnd == false && enemyStopProduce == false) {
        let width = 257;
        let height = 280;
        let x = getRNDM(width * enemySpriteResize, canvas.width - (width * enemySpriteResize));
        let y = getRNDM(height * enemySpriteResize, canvas.height / 2 - 50);
        let dX = getRNDM(30, 50);
        let dY = getRNDM(30, 50);
        let enemy = new Enemy(x, y, width, height, dX, dY, false);
        enemyArr.push(enemy);
        if (enemyArr.length > enemyVar.e_MaxCount) {
            enemyStopProduce = true;
        }
    }
    if (enemyArr.length > 0 && enemyStopProduce == true) {
        enemyVelocity = [];
        for (let n = 0; n < enemyArr.length; n++) {
            if (enemyArr[n].x === 0) {
                enemyArr.splice(n, 1);
            } 
            try {                
                // let dX = (playerArr[0].x - enemyArr[n].x) / gameSpeed.s_Enemy;
                // let dY = (playerArr[0].y - enemyArr[n].y) / gameSpeed.s_Enemy;

                // if (enemyArr[n].x > playerArr[0].x) {
                //     dX -= gameSpeed.s_Enemy;
                // } else {
                //     dX += gameSpeed.s_Enemy;
                // }

                // if (enemyArr[n].y > playerArr[0].y) {
                //     dY -= gameSpeed.s_Enemy;
                // } else {
                //     dY += gameSpeed.s_Enemy;
                // }

                // enemyVel.dX = dX;
                // enemyVel.dY = dY;
                // enemyVelocity.push(enemyVel);
                // enemyArr[n].dX = enemyVelocity[n].dX;
                // enemyArr[n].dY = enemyVelocity[n].dY;
                enemyArr[n].Move();
                enemyArr[n].CheckCollision();
            } catch {}
        }
    }

    if (enemyArr.length == 0 && enemyStopProduce == true) {
        gameChange(1);
    }
}

function DrawStartGame() {
    let width = 200;
    context.fillStyle = "rgb(115, 67, 15)";
    context.fillRect(canvas.width / 2 - (width / 2), canvas.height / 2 - gameBtnPadding, width + 4, 50 + 4);

    if (isInside(canvas.width / 2 - (200 / 2), canvas.height / 2 - gameBtnPadding, 204, 54, mouse.x, mouse.y)) {
        context.fillStyle = "rgb(215, 147, 69)";
        context.fillRect(canvas.width / 2 - (width / 2), canvas.height / 2 - gameBtnPadding, width, 50);
        gameBtnPadding = 10;
    } else {
        context.fillStyle = "rgb(186, 120, 49)";
        context.fillRect(canvas.width / 2 - (width / 2), canvas.height / 2 - gameBtnPadding, width, 50);
        gameBtnPadding = 0;
    }

    context.fillStyle = "black";
    context.font = "14.57pt Montserrat";
    context.fillText("Start Game", canvas.width / 2 - (14.57 * 3.5), canvas.height / 2 + 32 - gameBtnPadding);
}

function DrawCountdown(number) {
    context.font = "30pt Montserrat";
    context.fillStyle = "black";
    context.fillText(`Round: ${roundNum}`, 30, 60);

    context.font = "350pt Montserrat";
    context.strokeStyle = "black";
    context.lineWidth = 9;
    context.strokeText(number, canvas.width / 2 - (250 / 2), canvas.height / 2 + 150)
    if (number == 3) {
        context.fillStyle = "red";
    } else if (number == 2) {
        context.fillStyle = "orange";
    } else if (number == 1) {
        context.fillStyle = "blue";
    } else if (number == 0) {
        context.fillStyle = "green";
        m_Start.play();
    }
    context.fillText(number, canvas.width / 2 - (250 / 2), canvas.height / 2 + 150);
}

function Animate() {
    setTimeout(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        DrawBackground();
        DrawPlayer();
        DrawGround();
        DrawGrass();
        DrawClouds();
        DrawBullet();
        if (gameScene == 1) {
            roundCount++;
            if (roundCount % 50 == 0) {
                m_Countdown.play();
                roundCount2--;
            }
            if (roundCount2 != 4) {
                DrawCountdown(roundCount2);
            }
            if (roundCount2 == 0) {
                gameScene = 2;
            }
        }
        if (gameScene == 2) {
            AddEnemy();
            startTimer();
        }
        if (gameScene == 0) {
            DrawLogo();
            DrawStartGame();
            roundTimerSec = 0;
        }
        time.textContent = `Time: ${roundTimerSec}`;
        requestAnimationFrame(Animate)
    }, 1000/canvas_FPS)
}

let roundInfo = new Object();

function gameChange(int) {
    //0 - Die, 1 - NextRound (Win)

    roundCount = 0;
    roundCount2 = 4;
    enemyArr = [];
    enemyStopProduce = false;

    int == 0 ? enemyVar.e_MaxCount = 5 : enemyVar.e_MaxCount += 5;

    roundNum++;
    roundInfo.number = roundNum;
    roundInfo.time = roundTimerSec;
    roundArr.push(roundInfo);

    table.innerHTML += `<tr><td>${roundArr[roundArr.length - 1].number}</td><td>${roundArr[roundArr.length - 1].time} seconds</td></tr>`;

    roundTimerInt = 0;
    roundTimerSec = 0;

    int == 0 ? (roundNum = 0, roundArr = []) : null;
}

function startTimer() {
    if (gameScene == 2) {
        roundTimerInt++;
        if (roundTimerInt % 60 == 0) {
            roundTimerSec++;
            console.log(roundTimerSec);
        }
    }
    
    if (gameScene == 1 && roundNum == 0) {
        table.innerHTML = "<tr><th>Round</th><th>Time</th></tr>";
    }
}

roundTimer = setInterval(startTimer, 1000);

function myKeys(key, bool) {
    for (let k = 0; k < keyArr.length; k++) {
        if (key == keyArr[k]) {   
            controlKeys[keyArr[k]] = bool;
        }
    }
}

function getRNDM(min, max) {
    return Math.floor(Math.random() * max - min + 1) + min;
}

function isInside(x, y, width, height, x2, y2) {
    return x2 >= x && y2 >= y && x2 <= x + width && y2 <= y + height;
}

canvas.addEventListener("click", function(event) {
    if (gameScene == 0) {
        if (isInside(canvas.width / 2 - (200 / 2), canvas.height / 2, 204, 54, mouse.x, mouse.y)) {
            gameBtnPadding = 0;
            gameScene = 1;
            playerArr[0].x = canvas.width / 2;
            canvas.style.cursor = "default";
        }
    }
});

canvas.addEventListener("mousemove", function(event) {
    //let r = this.getBoundingClientRect();
    mouse.x = Number(event.clientX);
    mouse.y = Number(event.clientY);

    if (gameScene == 0) {
        if (isInside(canvas.width / 2 - (200 / 2), canvas.height / 2, 204, 54, mouse.x, mouse.y)) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "default";
        }
    }
});

window.addEventListener("keydown", function(event) {
    myKeys(event.key, true);

    for (let k = 0; k < keyArr.length; k++) {
        if (controlKeys[keyArr[k]] == true && gameScene == 2) {
            if (k < 8) {
                k < 4 ? (playerArr[0].Draw(k), playerLastDir = k) : (playerArr[0].Draw(k - 4), playerLastDir = k - 4);
            }
        }
    }

    if (controlKeys.ArrowLeft || controlKeys.a) {
        playerLastLook = 2;
    }

    if (controlKeys.ArrowRight || controlKeys.d) {
        playerLastLook = 3;
    }

    if(controlKeys.f == true && gameScene == 2) {
        if (fCount % 20 == 0) {
            let audio = new Audio("Sounds/m_Fireball.mp3");
            audio.play();
        }
        fCount >= 100 ? fCount = 100 : fCount+=2;
        AddBullet();
    }

    powerVal.innerHTML = `Power: ${fCount}`;
    if (fCount >= 100) {
        powerVal.setAttribute("style", "font-family: 'Montserrat', 'Roboto'; margin-left: 1em; color:rgb(255, 0, 0)");
    }
});

window.addEventListener("keyup", function(event) {
    myKeys(event.key, false);

    fCount = 0;
    powerVal.innerHTML = `Power: ${fCount}`;
    powerVal.setAttribute("style", "font-family: 'Montserrat', 'Roboto'; margin-left: 1em; color:rgb(59, 59, 59)");
});