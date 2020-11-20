let Canvas = document.getElementById("drawingCanvas");
let Context = Canvas.getContext("2d");
let c_Follow = document.getElementById("m_Follow");

let bg_Crocodile = new Image();
bg_Crocodile.src = "Images/g_Crocodile.png";
let bg_Crocodile2 = new Image();
bg_Crocodile2.src = "Images/g_Crocodile2.png";
let bg_Food = new Image();
bg_Food.src = "Images/g_Food.png";
let bg_GameImage = new Image();
bg_GameImage.src = "Images/g_Background.jpg";
let bg_Sun = new Image();
bg_Sun.src = "Images/g_Sun.jpg";
let bg_Clouds = new Image();
bg_Clouds.src = "Images/g_Clouds.png";
let bg_Ground = new Image();
bg_Ground.src = "Images/g_Ground.jpg";
let bg_Grass = new Image();
bg_Grass.src = "Images/g_Grass.png";

function Setup() {
    Canvas = document.getElementById("drawingCanvas");
    Context = Canvas.getContext("2d");
    //LoadFirstScreen();
    LoadGame();
}

let p_Name;

function LoadFirstScreen() {
    let i_Name = new CanvasInput({
        canvas: Canvas,
        x: (Canvas.width / 2) - (160),
        y: Canvas.height / 2,
        fontSize: 18,
        fontFamily: 'Arial',
        fontColor: '#212121',
        fontWeight: 'bold',
        width: 300,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        boxShadow: '1px 1px 0px #fff',
        innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        placeHolder: 'Enter username here...'
    });
    let bg_Image = new Image();
    bg_Image.src = "Images/g_bgLoading.jpg";
    let bg_Logo = new Image();
    bg_Logo.src = "Images/g_Logo.png";
    bg_Image.onload = () => {
        Context.drawImage(bg_Image, 0, 0, Canvas.width, Canvas.height);
        i_Name.render();
        Context.font = "30px Arial";
        Context.textAlign = "center";
        Context.fillStyle = "white";
        Context.fillText("Hello Player,", Canvas.width / 2, Canvas.height / 2 - 20);
    }
    bg_Logo.onload = () => {
        Context.drawImage(bg_Logo, (Canvas.width / 2) - (bg_Logo.width / 2), 20, 423, 111);
    }
    i_Name.onkeydown((event) => {
        if (event.key === "Enter") {
            p_Name = i_Name.selectText()._value;
            i_Name.destroy();
            Context.clearRect(0, 0, Canvas.width, Canvas.height);
            LoadGame();
        }
    });
}

let pos = 0;
let pos2 = 0;

class Crocodile{
    constructor(x, y, width, height, dX, dY){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.dX = dX;
        this.dY = dY;
    }

    Move() {  
        let newX = this.x + this.dX;

        if(newX + this.width >= Canvas.width || newX < 0){
            this.dX = -this.dX;
        }
        else{
            this.x = newX;
        }

        let newY = this.y + this.dY;

        if(newY + (this.width) >= Canvas.height){
            this.dY = -this.dY;
        }
        else{
            this.y = newY;
        }

        if (newY < (Canvas.height / 2)) {
            this.dY = -10;
            this.dY = -this.dY;
            pos = 1;
        }

        if (pos == 1) {
            if (this.y > 412) {
                this.y = 483;
                pos = 0;
                pos2 = 0;
            }
        }
    }

    Draw() {
        if (pos2 == 0) {
            Context.drawImage(bg_Crocodile, this.x, this.y, bg_Crocodile.width, bg_Crocodile.height);
        }
    }

    Draw2() {
        if (pos2 == 1) {
            Context.drawImage(bg_Crocodile2, this.x, this.y, bg_Crocodile2.width, bg_Crocodile2.height);
        }
    }
}

class Food{
    constructor(x, y, width, height, dX, dY){
        this.x = x;
        this.y = y;
        this.width = width;
	    this.height = height;
        this.dX = dX;
        this.dY = dY;
    }

    Move() {
        let newX = this.x + this.dX;

        if(newX + this.width >= Canvas.width || newX < 0){
            this.dX = -this.dX;
        }
        else{
            this.x = newX;
        }
    }

    Draw(){
        Context.drawImage(bg_Food, this.x, this.y, this.width, this.height);
    }
}

let croco = [];
let foods = [];

function LoadGame() {
    let output = document.getElementById("user_Info");
    output.innerHTML += `ID: ${p_Name}`;
    window.requestAnimationFrame(DrawObjects);
}

let game_Timeout = null;
let ground_POS = 0;
let grass_POS = 0;
let sun_POS = 0;
let clouds_POS = 0;

let mouse = {
    x: -1,
    y: -1
}

let crocodileHead = 37;
let c = new Crocodile(Canvas.width / 2, Canvas.height - crocodileHead, 60, 37, 10, 10);
croco.push(c);

let NumberOfFood = 3;

document.getElementById("m_Food").onchange = () => {
    NumberOfFood = Number(document.getElementById("m_Food").value);
    foods = [];
    DrawFood();
}

function DrawFood() {
    for (let n_Food = 0; n_Food < NumberOfFood; n_Food++) {
        let s = GetRandomInteger(30, 60);
        let dX = GetRandomInteger(10, 20);
        let dY = GetRandomInteger(10, 20);
        let x = GetRandomInteger(s + dX, Canvas.width - s - 1);
        let y = GetRandomInteger((Canvas.height / 2) - 50, Canvas.height - 90);
        let f = new Food(x, y, s, s, dX, dY);
        foods.push(f);
    }
}

DrawFood();

function DrawBackground() {
    Context.drawImage(bg_GameImage, 0, 0, Canvas.width, Canvas.height);
}
function DrawSun() {
    sun_POS++;
    Context.drawImage(bg_Sun, sun_POS * 530, 0, bg_Sun.width, 530, 220, -110, bg_Sun.width, bg_Sun.height);
    if (sun_POS > 2) {
        sun_POS = 1;
    }
}
function DrawClouds() {
    clouds_POS -= 0.5;
    Context.drawImage(bg_Clouds, clouds_POS + -30, 100, bg_Clouds.width, bg_Clouds.height);
    if (clouds_POS < -780) {
        clouds_POS = 0;
    }
}
function DrawGround() {
    ground_POS -= 2;
    Context.drawImage(bg_Ground, ground_POS, Canvas.height - bg_Ground.height, bg_Ground.width, bg_Ground.height);
    if (ground_POS < -700) {
        ground_POS = 0;
    }
}
function DrawGrass() {
    grass_POS -= 1.5;
    Context.drawImage(bg_Grass, grass_POS, Canvas.height - bg_Grass.height, bg_Grass.width, bg_Grass.height);
    if (grass_POS < -670) {
        grass_POS = 0;
    }
}
function MovementHandler() {
    Canvas.addEventListener("mousemove", function(event) {
        let r = Canvas.getBoundingClientRect();
    
        mouse.x = event.clientX - r.left;
        mouse.y = event.clientY - r.top;
    
        if (c_Follow.checked == true) {
            let dX = (mouse.x - croco[0].x) / 50;
            croco[0].dX = dX;
        }
    });

    Canvas.addEventListener("click", function(event) {
        let dX = (mouse.x - croco[0].x) / 30;
        //let dY = (mouse.y - croco[0].y) / 30;
        let dY = 30;

        croco[0].dX = dX;
        croco[0].dY = dY;
        pos2 = 1;
    });
}
function DrawFoods() {
    for (let n = 0; n < foods.length; n++) {
        foods[n].Move();
        foods[n].Draw();

        if ((croco[0].x < foods[n].x + foods[n].width) && (croco[0].y < foods[n].y + foods[n].height) && (croco[0].x > foods[n].x) && (croco[0].y > foods[n].y)) {
            foods.splice(n, 1);
        }
    }
}
function DrawCrocodile() {
    croco[0].Move();
    croco[0].Draw();
    croco[0].Draw2();
}

function DrawObjects() {
    Context.clearRect(0, 0, Canvas.width, Canvas.height);
    DrawBackground();
    DrawSun();
    DrawClouds();
    DrawGround();
    DrawGrass();
    MovementHandler();
    DrawFoods();
    DrawCrocodile();
    window.requestAnimationFrame(DrawObjects);
}

Canvas.addEventListener("click", function(event) {
    let eatSound = new Audio("Sounds/s_Eat.mp3");
    eatSound.playbackRate = 3;
    eatSound.play();
    
    croco[0].y = Canvas.height - crocodileHead - 20;
});

function GetRandomInteger(a, b){
    if (a > b){
        small = b;
        large = a;
    }
    else{
        small = a;
        large = b;
    }
    
    let x = parseInt(Math.random() * (large - small + 1)) + small
    return x;
}