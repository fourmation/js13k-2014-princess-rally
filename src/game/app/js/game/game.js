//use the module pattern to separate code
GameRunner = (function () {


    var onNews = function(news, type){

        var elemDiv = document.createElement('div');
        var text = document.createTextNode("["+type+"] " + news);
        elemDiv.appendChild(text);
        document.body.appendChild(elemDiv);

    };

    return function(){

        var thisGame = this;

        this.player = null;
        this.socket = {};

        this.setPlayer = function(Player){
            this.player = Player;
            return this; //for chaining
        };

        this.connect = function(socket){

            console.log('socket connected', socket);

            if (!this.socket.connected){
                console.log('connecting');
                this.socket = socket;
            }

            thisGame.socket.on('game_news', function(news){
                onNews(news, 'Game news');
                console.log('game_news', news);
            });

            thisGame.socket.on('team_news', function(news){
                onNews(news, 'Team news');
                console.log('team_news', news);
            });

            return this;
        };

        this.start = function(){

            this.player.greet();

        };

    };

})();