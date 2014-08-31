'use strict';

var Player = (function () {

    var playerId = 0;

    return function(socket){

        var thisPlayer = this;

        this.id = 'player_' + playerId ++;

        this.game = null;
        this.team = null;

        this.name = false;

        this.socket = socket;

        this.socket.on('greet', function(name){
            log.debug('greet', name);
            socket.broadcast.emit('greet', name);

            thisPlayer.name = name;
        });

        this.joinGame = function(game){
            thisPlayer.game = game;
        };

        this.joinTeam = function(team){
            thisPlayer.team = team;
        };

        this.disconnect = function(){
            log.debug('player disconnected');
            if (thisPlayer.team) thisPlayer.team.removePlayer(thisPlayer);
            if (thisPlayer.game) thisPlayer.game.removePlayer(thisPlayer);
        };

    };

})();

module.exports = Player;