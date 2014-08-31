var player = require('./player/player');
var game = require('./game/game');

var Lobby = (function (Player, Game) {

    var io = null,
        games = []
    ;

    var cleanUpGames = function(){
        var stillRunning = [];
        for(var i=0; i<games.length; i++){
            if (!games[i].isEmpty()){
                stillRunning.push(games[i]);
            }else{
                log.info("Game has no players, removing game ", games[i].id);
            }
        }
        games = stillRunning; //empty games will be excluded
    };

    return function(socketIo){

        io = socketIo;

        log.info('Princess Rally game lobby started!');

        io.on('connection', function(socket) {

            log.debug('New connection', socket.id);


            var player = new Player(socket);

            var game = null;
            for(var i=0; i<games.length; i++){
                if (!games[i].isFull()){
                    game = games[i]; //join the first game not full (bias towards earlier created games)
                }
            }

            if (!game){
                game = new Game();
                games.push(game);
            }

            game.addPlayer(player);
            player.joinGame(game); //reciprocate reference

            socket.on('disconnect', function(){
                player.disconnect();
                cleanUpGames();
                io.emit('farewell', player.name);
            });

        });

    };

})(player, game);

module.exports = Lobby;