var io,
    players = [],
    colors = ['red','yellow','green'],
    colorId=0;

function Player(p){
    this.id = p.id || 0;
    this.handle = p.handle || '';
    this.img = p.img || '';
    this.score = p.score || 0;
    this.highscore = p.highscore || 0;
    this.online = true;
    this.life = -10000;//negative=entering game, positive=in game, false===dead
    this.color = p.color || 'red';
    this.lastBarId = 0;//last bar conquered
    this.x = 0;
    this.y = 0;
    this.ys = 0.0;//y speed
}

Player.prototype.join = function(socket){
    this.socket = socket;
    socket.emit('join', players);
}

Player.prototype.leave = function() {

}


exports.init = function (socketsio) {
    io = socketsio;
}

exports.join = function(socket) {
    var p = new Player({
        color: colors[colorId],
        id: socket.id,
    });
    colorId = (colorId + 1) % colors.length
    socket.player = p;
    players.push(p);
    return p;
}

exports.login = function(socket, data) {

};


exports.leave = function(socket) {
    socket.player.online = false;
    
}

exports.highscores = function() {
    return players.sort(function(player1, player2){
        return player1.highscore - player2.highscore;
        }).slice(0,10);
};

exports.players = players;