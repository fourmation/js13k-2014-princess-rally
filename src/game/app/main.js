/**
 * main.js This file will always be included last so submodules are available.
 */
(function(window, GameRunner, Player, io){

    var socket = io();

    socket.on('connect', function(){

        var name;
        do{
            name = prompt("Welcome\nPlease enter your name");
        }while(!name); //be really annoying

        new GameRunner()
            .connect(socket)
            .setPlayer(new Player(socket, name))
            .start()
        ;

    });



})(window, GameRunner, Player, window.io);