var players = require('./players'),
    bars = [],
    barId = 1,
    io,
    time,
    g = 0.0003,
    playerWidth = 10,
    playerHeight = 10,
    floor = 92;


exports.init = function (socketio) {
    players.init(socketio);
    players.loadPlayers();
    io = socketio;
    setInterval(heartBeat, 10);
    setInterval(addBar, 5000);

};
exports.connect = function (socket) {

    players.join(socket);
    socket.emit('highscores', players.highscores());

    socket.on('login', function (data) {
        players.login(socket, data);
    });

    socket.on('play', function (data) {
        socket.player.startPlaying();
        io.sockets.emit('updatePlayer', socket.player);
    });

    socket.on('stopPlay', function (data) {
        socket.player.stopPlaying();
        io.sockets.emit('updatePlayer', socket.player);
    });

    socket.on('fly', function (data) {
        socket.player.ys = -0.1;
        //console.log(socket.player);
    });

    socket.on('watch', function (data) {
        socket.emit('join', players.players);
    });

    socket.on('disconnect', function () {
        players.leave(socket);
        //io.sockets.emit('leave', {id: socket.player.id});
    });

    socket.on('setHandle', function(handle) {
        var oldplayer = players.getByHandle(handle);

        if(oldplayer == socket.player)
        {
            console.log('same player');
            socket.player.handle = handle;
        }
        else if(oldplayer && !oldplayer.online)
        {
            console.log('oldplayer, not online');
            oldplayer.online = true;
            oldplayer.id = socket.player.id;
            players.remove(socket.player);
            socket.player = oldplayer;
        }
        else if(oldplayer && oldplayer.online)
        {
            console.log('highjackingattempt?');
            console.log(oldplayer);
            console.log(socket.player);
            // This should not be allowed.
            // Trying to hijack online user.
        }
        else {
            console.log('setting handle '  + handle);
            socket.player.handle = handle;
        }
        io.sockets.emit('updatePlayer', socket.player);
    });
};


function heartBeat() {
    var now = new Date().getTime(), dTime = now - time;
    time = now;
    if (dTime <= 0) {
        return;
    }
    move(dTime);
    io.sockets.emit('move', {p: players.players, b: bars});
}

function move(dTime) {
    var i, pList = players.players, p;
    for (i = 0; i < bars.length; i++) {
        bars[i].x -= dTime * 0.01;
    }
    for (i = 0; i < pList.length; i++) {
        p = pList[i];

        p.ys += g * dTime;
        p.y += p.ys * dTime;
        if (p.y < 0) {
            p.y = 0;
            p.ys = 0;
        } else if (p.y > floor - playerHeight) {
            p.y = floor - playerHeight;
            p.ys = 0;
        }
        if (p.life === false) {//player is dead

        } else {
            p.life += dTime;
            if (p.life >= 0) {
                crashDetect(p);
            } else {
                p.lastBarId = bars[0]?bars[0].id:0;
            }
        }
    }

    if (bars.length > 0 && bars[0].x + bars[0].w < -10) {
        bars.splice(0, 1);
    }
}

function crashDetect(p) {
    var i, b;
    for (i = 0; i < bars.length; i++) {//bars are sorted after x value from left to right
        b = bars[i];
        if (b.x > p.x + playerWidth) { //in front of player
            //did we get points for last bar yet?
            if (i > 0
                && p.lastBarId !== bars[i - 1].id
                && bars[i - 1].x + bars[i - 1].w < p.x) {//hey, we have not received points for this!
                p.lastBarId = bars[i - 1].id;
                p.updateScore(p.score + 1);
                p.x += (p.x < 50 ? 2 / p.score : 0);
            }
            return;
        }
        if (p.x > b.x + b.w) {//behind player

        } else {
            if (p.y < b.hy1 || p.y + playerHeight > b.hy2) {//dead man
                //console.log('dead');
                //console.log(p);
                p.life = -1000;
                p.x = 0;
                p.updateScore(0);
            }
        }
    }
}


var openingHeight = 40;
function addBar() {
    var h = Math.floor(Math.random() * (floor - openingHeight));
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