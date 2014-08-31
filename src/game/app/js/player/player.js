//use the module pattern to separate code
Player = (function () {

    return function(socket, name){

        var thisPlayer = this;

        //private functions
        var initialise = function(socket, name){
            thisPlayer.socket = socket;
            thisPlayer.name = name;

            socket.emit('playerInit', {
                name: name
            });
        };

        //init
        initialise(socket, name);


        //public functions
        this.greet = function(){

            var elemDiv = document.createElement('div');
            var text = document.createTextNode(" Welcome "+name+'!');
            elemDiv.appendChild(text);
            document.body.appendChild(elemDiv);
        };

        this.setConnection = function(socket){
            this.socket = socket;
        };



    };

})();