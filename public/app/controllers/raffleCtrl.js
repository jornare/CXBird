(function(angular){

    Array.prototype.shuffle = function() {
        var m = this.length, t, i;

        // While there remain elements to shuffle…
        while (m) {

            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            t = this[m];
            this[m] = this[i];
            this[i] = t;
        }

        return this;
    }

    angular.module('app')
        .controller('RaffleCtrl',
            ['$scope', '$game', '$timeout',
                function ($scope, $game, $timeout) {
                    $scope.p = $game.players.all;
                    $scope.$watch('p.length', function () {
                        var tickets = [], extra = [], i, j, p=$game.players.all;
                        for (i = 0; i < p.length; i++) {
                            if (!p[i].handle) {
                                continue;
                            }
                            if (p[i].rank > 0 && p[i].rank < 11) {
                                for (j = 11; j > p[i].rank; j--) {
                                    tickets.push({ handle: p[i].handle });
                                }
                            }
                            tickets.push({ handle: p.handle });
                        }
                        $scope.tickets = tickets.shuffle();
                    });

                    $scope.raffle = function () {
                        var i, winner = Math.floor(Math.random() * $scope.tickets.length), t = $scope.tickets;
                        raffle(winner);
                    };

                    function raffle(winner) {
                        var i;
                        do {
                            i = Math.random() * $scope.tickets.length;
                        } while (i == winner);
                        $scope.tickets.splice(i, 1);
                        if ($scope.tickets.length > 1) {
                            $timeout(function () {
                                raffle(winner);
                            },200);
                        } else {
                            $scope.winner = $scope.tickets[0].handle;
                            $scope.tickets.pop();
                           // alert('Winner! is ' + $scope.tickets[0].handle);
                        }
                    };
            }]);

}(angular));