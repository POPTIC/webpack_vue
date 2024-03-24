class Ball{
    #x = 10;
    #y = 10;
    #vx = 1;
    #vy = 1;
    #radius = 30;
    #color = "blue";
    #canvas_size = [0, 0];
    #callbackHandler;
    #ctx = null;
    constructor(locationX, locationY, radius, color, canvas_width, canvas_height, vx, vy, canvas) {
        this.#x = locationX;
        this.#y = locationY;
        this.#radius = radius;
        this.#color = color;
        this.#canvas_size[0] = canvas_width;
        this.#canvas_size[1] = canvas_height;
        this.#vx = vx;
        this.#vy = vy;
        this.#ctx = canvas.getContext("2d");
    }
    #draw(){
        this.#ctx.beginPath();
        // TODO: 查用法
        this.#ctx.arc(this.#x, this.#y, this.#radius, 0, Math.PI * 2, true);
        this.#ctx.closePath();
        this.#ctx.fillStyle = this.#color;
        this.#ctx.fill();
    }
    update(){
        // 这里使用闭包传递
        let instance_ctx = this; 
        return function(){
            instance_ctx.#ctx.clearRect(0, 0, instance_ctx.#canvas_size[0], instance_ctx.#canvas_size[1]);
            instance_ctx.#draw.apply(instance_ctx, arguments);
            instance_ctx.#x += instance_ctx.#vx;
            instance_ctx.#y += instance_ctx.#vy;
            if(instance_ctx.#x > instance_ctx.#canvas_size[0] || instance_ctx.#x < 0){
                instance_ctx.#vx = -instance_ctx.#vx;
            }
            if(instance_ctx.#y > instance_ctx.#canvas_size[1] || instance_ctx.#y < 0){
                instance_ctx.#vy = -instance_ctx.#vy;
            }
        
            instance_ctx.#callbackHandler = window.requestAnimationFrame(instance_ctx.update());
        }
    }
    getcallbackHandler(){
        return this.#callbackHandler;
    }
}
export default Ball;