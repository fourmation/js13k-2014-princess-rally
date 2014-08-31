'use strict';

var Team = (function(){

    var teamId = 0;

    return function(socket){

        var thisTeam = this;

        this.id = 'team_' + teamId ++;

        this.players = [];

        this.addPlayer = function(player){

            log.info("Player joining team", thisTeam.id);

            thisTeam.players.push(player);

            player.joinTeam(thisTeam); //reciprocate
        };

        this.removePlayer = function(player){

            log.debug('removing player', player.id, 'from', thisTeam.id);

            for(var i=0; i<thisTeam.players.length; i++){
                if (thisTeam.players[i].id == player.id){
                    thisTeam.players.splice(i, 1); //remove the player
                }
            }
            log.debug('players length is now ', thisTeam.players.length);

        };

        this.dealHand = function(cards){

            socket.to(this.id).emit('hand_dealt', cards);

        }

    };

})();

var deck = require('./deck/deck');
var Game = (function (Team, Deck) {

    //private static vars
    var maxPlayers = 6,
        gameId = 0,
        cardsPerPlayer = 6,
        deck = new Deck()
    ;

    return function(socket){

        var thisGame = this;
        this.id = 'game_' + gameId++;

        //private vars
        var players = [],
            teams = [
                new Team(socket, thisGame),
                new Team(socket, thisGame),
                new Team(socket, thisGame)
            ] //initialise with 3 teams
        ;

        var dealHand = function(roundId){

            for(var i = 0; i<teams.length; i++){

                var team = teams[i],
                    cardCount = team.players.length * cardsPerPlayer,
                    cards = deck.getCards(roundId+team.id, cardCount)
                ;

                team.dealHand(cards);

            }

        };

        log.info("New game created with id", this.id);

        //public methods
        this.isFull = function(){
            return players.length >= maxPlayers;
        };
        this.isEmpty = function(){
            return players.length == 0;
        };

        this.addPlayer = function(player){

            log.info('Adding player to game ', thisGame.id);

            players.push(player);

            player.joinGame(thisGame); //reciprocate reference

            var team = null;
            for(var i=0; i<teams.length; i++){
                if (!team || team.players.length > teams[i].players.length){ //find the team with least players
                    team = teams[i];
                }
            }

            log.info('Player count is now', players.length);

            team.addPlayer(player);

            //temporary test!
            dealHand(1);

        };

        this.removePlayer = function(player){

            log.debug('removing player', player.id, 'from', thisGame.id);
            for(var i=0; i<players.length; i++){
                if (players[i].id == player.id){
                    players.splice(i, 1); //remove the player
                }
            }
            log.debug('players length is now ', players.length);

        };

    };

})(Team, deck);

module.exports = Game;