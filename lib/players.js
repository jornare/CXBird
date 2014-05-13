var fs = require('fs'),
    io,
    players = [],
    colors = ['red', 'yellow', 'green'],
    colorId = 0;

function Player(p) {
    this.id = p.id || 0;
    this.handle = p.handle || '';
    this.img = p.img || '';
    this.score = p.score || 0;
    this.highscore = p.highscore || 0;
    this.online = true;
    this.life = -1000;//negative=entering game, positive=in game, false===dead
    this.color = p.color || 'red';
    this.lastBarId = 0;//last bar conquered
    this.x = 0;
    this.y = 0;
    this.ys = 0.0;//y speed
}

Player.prototype.updateScore = function (score) {
    this.score = score;
    if (score > this.highscore) {
        this.highscore = score;
    }
    checkHighscores();
}

Player.prototype.join = function (socket) {
    this.socket = socket;
    socket.emit('join', players);
}

Player.prototype.leave = function () {

}

exports.init = function (socketsio) {
    io = socketsio;
}

exports.join = function (socket) {
    var p = new Player({
        color: colors[colorId],
        id: socket.id
    });
    colorId = (colorId + 1) % colors.length
    socket.player = p;
    players.push(p);
    return p;
}

exports.login = function (socket, data) {

};


exports.leave = function (socket) {
    socket.player.online = false;
    // Todo: Oppdater 1 når bug med at spiller får 1 er fikset.
    if (socket.player.highscore == 1) {
        players.remove(socket.player);
    }

}

exports.getByHandle = function (handle) {
    var i;
    for (i = 0; i < players.length; i++) {
        if (players.handle == handle) {
            return players[i];
        }
    }
    return null;
}

exports.savePlayers = function () {
    fs.writeFile('players.txt', JSON.stringify(players), function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('Players saved');
        }
    });
}

exports.loadPlayers = function () {
    fs.readFile('players.txt', 'utf8', function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        try {
            var json = JSON.parse(data), i;
            for (i = 0; i < json.length; i++) {
                players.push(new Player(json[i]));
            }
        } catch (ex) {
            console.log('failed loading');
        }
    });
}

exports.highscores = function () {
    return players.sort(function (player1, player2) {
        return  player2.highscore - player1.highscore;
    }).slice(0, 10);
};

exports.players = players;

function checkHighscores() {
    var highscores = exports.highscores();
    io.sockets.emit('highscores', highscores);
}