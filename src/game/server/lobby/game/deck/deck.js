var jwt = require('./jwt/jwt'); //move this file if anything else requires jwt
var CryptCard = (function(JWT){

    return function(hashKey){


        var jwt = new JWT(hashKey);

        this.getCard = function(card){


            return jwt.encode(card);

        };

        this.validateCard = function(token){

            return jwt.validate(token);

        };

        this.decodeCard = function(token){

            return jwt.decode(token);
        }


    }

})(jwt);

Deck = (function (CryptCard) {

    var cards = [
        {
            c: 'f1',
            p: 0.2
        },
        {
            c: 'f2',
            p: 0.1
        },
        {
            c: 'f3',
            p: 0.05
        },
        {
            c: 'tr',
            p: 0.1
        },
        {
            c: 'tl',
            p: 0.1
        },
        {
            c: 'b1',
            p: 0.1
        },
        {
            c: 'ut',
            p: 0.1
        }
    ];

    (function normaliseProbability(cards){
        
        var sum = 0;
        for(var i = 0; i<cards.length; i++){
            sum += cards[i].p;
        }

        for(var j = 0; j<cards.length; j++){
            cards[j].p = cards[j].p/sum; //normalise in range of 0 - 1
        }
        
    })(cards);
    
    var getWeightedRandomCard = function(){

        var probabilitySum = 0,
            random = Math.random()
        ;
        for(var i = 0; i<cards.length; i++){
            var card = cards[i];
            probabilitySum += card.p; //add the probability to the sum
            if (random <= probabilitySum){
                return card.c;
            }
        }

        return false;

    };

    return function(){

        var thisDeck = this;
        this.getCard = function(roundKey){

            var card = getWeightedRandomCard();

            var cardInfo = {  //format as object for JWT json encoding
                card: card
            };

            return new CryptCard(roundKey).getCard(cardInfo);

        };

        this.getCards = function(roundKey, count){

            var cardDeck = [];

            for(;count > 0; count--){
                cardDeck.push(thisDeck.getCard(roundKey));
            }

            return cardDeck;

        }


    };

})(CryptCard);


module.exports = Deck;