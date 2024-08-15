//setting both canvas size and drawing surface size the same size
window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1280;
    canvas.height = 720;

    //give access to game element and properties
    class Player {
        constructor(game) {
            this.game = game;
        }
    }

    //give access to canvas element and properties
    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.player = new Player(this);
        }
    }

    const game = new Game(canvas);

    //recreates game within loop to create the illusion of movement
    function animate() {

    }

});