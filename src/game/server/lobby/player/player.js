'use strict';

var Player = (function () {

    var playerId = 0;

    return function(socket, playerInfo){

        var thisPlayer = this;

        this.id = 'player_' + playerId ++;

        this.game = null;
        this.team = null;

        this.name = playerInfo.name;

        this.socket = socket;

        this.joinGame = function(game){
            thisPlayer.game = game;
            log.debug('player joined game', playerInfo);
            thisPlayer.socket.join(game.id); //join the game channel
            thisPlayer.socket
                .to(game.id)
                .broadcast.emit('game_news', thisPlayer.name + " just joined the game");
            thisPlayer.socket.emit('game_news', 'You have joined game '+game.id);
        };

        this.joinTeam = function(team){
            thisPlayer.team = team;
            thisPlayer.socket.join(team.id); //join the team channel
            thisPlayer.socket
                .to(team.id)
                .broadcast.emit('team_news', thisPlayer.name + " just joined your team");
            thisPlayer.socket.emit('team_news', 'You have joined team '+team.id);

        };

        this.disconnect = function(){
            log.debug('player disconnected');
            if (thisPlayer.team) thisPlayer.team.removePlayer(thisPlayer);
            if (thisPlayer.game) thisPlayer.game.removePlayer(thisPlayer);


            thisPlayer.socket
                .to(thisPlayer.game.id)
                .emit('game_news', thisPlayer.name + " just disconnected");
        };

    };

})();

module.exports = Player;