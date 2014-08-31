'use strict';

log('Hi! This is an example game!');


var Lobby = require('./lobby/lobby');
var io = require('sandbox-io');

new Lobby(io);


/*
var Player = require('./player/player'); //you can require child js files
var JWT = require('./jwt/jwt');


var jwtToken = new JWT('so_secret');

var token = jwtToken.encode({foo:'bar'});

log.debug('token is', token);

if (jwtToken.validate(token)){
    var data = jwtToken.decode(token);
    log.debug(data);
}

var io = require('sandbox-io');
log('Loaded sandbox-io', io);

io.on('connection', function(socket) {

    log.debug('New connection', socket.id);

    var player = new Player(socket);



    socket.on('disconnect', function(){
        io.emit('farewell', player.name);
    });

});

*/