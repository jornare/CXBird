(function(angular){
    var playerWidth = 10;
        playerHeight = 10;
        playerRadius = 35;
        playerImg = new Image();
        playerImg.src = '../../img/computasLogo.png';



    function CXPlayer(){
        this.x=0;
        this.y=0;
    }

    function CXBird(ctx, game){
        this.ctx=ctx;
        this.width = ctx.canvas.width;
        this.height=ctx.canvas.height;
        this.timer = null;
        this.start();
        this.game = game;
        this.xScale = 6.4;
        this.yScale = 4.8;
    }
    
    CXBird.prototype.start = function(){
        
        var self = this;
        this.timer = setInterval(function(){self.render()}, 0);
    };
    
    CXBird.prototype.render = function() {
        var ctx = this.ctx;//.getContext('2d');
        var i, p,  pl = this.game.players.online,
            bars = this.game.bars;
        this.renderBackground(ctx);
        for(i=0;i < pl.length; i++){
            this.renderPlayer(pl[i],ctx);        
        }
        ctx.globalAlpha = 1;
        ctx.fillStyle='red';
        for(i  =0; i < bars.length; i++){
            this.renderBar(bars[i],ctx);        
        }

    };

    CXBird.prototype.renderBackground = function(ctx){
     
       

    };

    CXBird.prototype.renderPlayer = function(p, ctx){
        ctx.fillStyle = p.color;
        if(p.life < 0){
            ctx.globalAlpha = 1.0 + (p.life % 500) * 0.0025;
        }else{
            ctx.globalAlpha = 1;
        }
            ctx.save();

            ctx.beginPath();
            ctx.rect(p.x * this.xScale, p.y * this.yScale, playerWidth * this.xScale, playerHeight * this.yScale); 
            //ctx.arc(p.x * this.xScale, p.y * this.yScale, playerRadius, 0, Math.PI * 2, true);
            ctx.drawImage(playerImg, p.x * this.xScale, p.y * this.yScale, playerRadius*2, playerRadius*2);
            ctx.closePath();
            ctx.clip();
            
            ctx.restore();

    };

    CXBird.prototype.renderBar = function(b, ctx) {
        ctx.fillRect(b.x * this.xScale, 0, b.w * this.yScale, b.hy1 * this.yScale);
        ctx.fillRect(b.x * this.xScale, b.hy2 * this.yScale, b.w * this.yScale, 100 * this.yScale);
    };

    angular.module('app')
        .directive('cxbird', function() {
            return {
                    restrict:'E',
                    scope: {
                        game:'='
                    },
                    link: function(scope, element, attrs){
                        
                        //var playerImg = document.createElement('img');
                        //playerImg.src = '../../img/computasLogo.png';
                        var canvas = document.createElement('canvas');
                        canvas.setAttribute('id','canvas');
                        canvas.setAttribute('width','100%');
                        canvas.setAttribute('height','100%');
                        canvas.width="800";
                        canvas.height="600";
                        element[0].appendChild(canvas);
                        scope.cxbird = new CXBird(canvas.getContext('2d'), scope.game);
                        new GameObjectManager().startupGameObjectManager();
                        
                    }
                };
            });

}(angular));