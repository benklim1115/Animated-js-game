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
            this.collisionX;
            this.collisionY;
        }
        
        draw(context) {
            context.beginPath();
            context.arc(400, 300, 50, 0, Math.PI * 2);
            context.fill();
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

        render(context) {
            this.player.draw(context);
        }
    }

    const game = new Game(canvas);
    game.render(ctx);
    // console.log(game);

    //recreates game within loop to create the illusion of movement
    function animate() {

    }

});