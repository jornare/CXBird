var players = require('./players'),
    bars = [],
    barId=1,
    io,
    time,
    g = 0.0003,
    playerWidth=10,
    playerHeight=10;


exports.init =  function(socketio){
        players.init();
        io = socketio;
        setInterval(heartBeat, 10);
        setInterval(addBar,5000);
    };

exports.connect = function(socket) {
    
    players.join(socket);

    socket.on('login', function(data) {
        players.login(socket, data);
    });

    socket.on('fly', function(data) {
        socket.player.ys=-0.1;
        //console.log(socket.player);
    });

    socket.on('watch', function(data) {
        socket.emit('join', players.players);
    });

    socket.on('disconnect', function() {
        players.leave(socket);
        io.sockets.emit('leave',{id:socket.player.id});
    });

};


function heartBeat() {
    var now = new Date().getTime(), dTime = now - time;
    time = now;
    if(dTime <= 0){
        return;
    }
    move(dTime);
    io.sockets.emit('move', {p:players.players,b:bars});
}

function move(dTime){
    var i, pList=players.players, p;
    for(i = 0; i < bars.length; i++) {
        bars[i].x-= dTime * 0.01;
    }
    for(i = 0; i < pList.length; i++) {
        p = pList[i];

        p.ys += g * dTime;
        p.y += p.ys * dTime;
        if(p.y <0 ){
            p.y = 0;
            p.ys = 0;
        } else if(p.y>100-playerHeight){
            p.y = 100-playerHeight;
            p.ys = 0;
        }
        if(p.life===false) {//player is dead
            
        } else {
            p.life +=dTime;
            if(p.life >= 0){
                crashDetect(p);
            } else {
                p.lastBarId=bars[0];
            }
        }
    }

    if(bars.length > 0 && bars[0].x + bars[0].w < -10) {
        bars.splice(0, 1);
    }
}

function crashDetect(p){
    var i, b;
    for(i = 0; i < bars.length; i++) {//bars are sorted after x value
        b = bars[i];
        if(b.x > p.x + playerWidth) { //in front of player
            if(i > 0 && p.lastBarId !== bars[i-1].id && bars[i-1].x + bars[i-1].w < p.x) {//hey, we have not received points for this!
                p.lastBarId = bars[i-1].id;
                p.score++;
                p.x += (p.x < 50 ? 2 / p.score : 0);
                console.log('yay');
            }
            return;
        }
        if(p.x > b.x + b.w) {//behind player

        } else {
            if(p.y < b.hy1 || p.y + playerHeight  > b.hy2) {//dead man
                console.log('dead');
                console.log(p);
                if(p.score > p.highscore) {
                    p.highscore=p.score;
                }
                p.life = -10000;
                p.x = 0;
                p.score = 0;
            }
        }


    }
}


var openingHeight = 40;
function addBar(){
    var h = Math.floor(Math.random() * (100 - openingHeight));
    bars.push(
        {   
            id: barId,
            x: 100,
            hy1: h,
            hy2: h + openingHeight,
            w: 10
        });
    barId++;
}