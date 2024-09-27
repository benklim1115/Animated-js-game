//setting both canvas size and drawing surface size the same size
window.addEventListener("load", function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 1280;
    canvas.height = 720;

    ctx.fillStyle = "white";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "white";

    //give access to game element and properties, have player start in middle of map
    class Player {
        constructor(game) {
            this.game = game;
            this.collisionX = this.game.width * 0.5;
            this.collisionY = this.game.height * 0.5;
            this.collisionRadius = 50;
            this.speedX = 0;
            this.speedY = 0;
            //distance between mouse and player
            this.dx = 0;
            this.dy = 0;
            this.speedModifier = 5;
        }
        
        draw(context) {
            context.beginPath();
            context.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            //limits certain canvas settings to specific calls like .fill() so subsequent shapes are not transparent too
            context.save();
            context.globalAlpha = 0.5;
            context.fill();
            context.restore();
            context.stroke();
            context.beginPath();
            context.moveTo(this.collisionX, this.collisionY);
            context.lineTo(this.game.mouse.x, this.game.mouse.y);
            context.stroke();
        }

        update() {
            this.dx = this.game.mouse.x - this.collisionX;
            this.dy = this.game.mouse.y - this.collisionY;
            const distance = Math.hypot(this.dy, this.dx);
            this.speedX = this.dx/distance || 0;
            this.speedY = this.dy/distance || 0;
            this.collisionX += this.speedX * this.speedModifier;
            this.collisionY += this.speedY * this.speedModifier;
        }
    }

    //give access to canvas element and properties
    class Game {
        constructor(canvas) {
            this.canvas = canvas;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.player = new Player(this);
            this.mouse = {
                x: this.width * 0.5,
                y: this.height * 0.5,
                pressed: false
            }

            canvas.addEventListener("mousedown", (e) => {
                //using offset to get coordinate on target node which is the canvas element
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = true;
            });
            canvas.addEventListener("mouseup", (e) => {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
                this.mouse.pressed = false;
            });
            canvas.addEventListener("mousemove", (e) => {
                if (this.mouse.pressed) {
                    this.mouse.x = e.offsetX;
                    this.mouse.y = e.offsetY;
                }
            });
        }

        render(context) {
            this.player.draw(context);
            this.player.update();
        }
    }

    const game = new Game(canvas);

    //recreates game within loop to create the illusion of movement
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.render(ctx);
        //this will create an endless animation loop must pass parent function
        requestAnimationFrame(animate);
    }

    animate();

});