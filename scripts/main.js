(function iife () {
    // init global variables
    var url = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true';
    var imagesSorted = ['top-left-image', 'top-mid-image', 'top-right-image', 'mid-left-image', 'mid-mid-image', 'mid-right-image', 'bottom-left-image', 'bottom-mid-image', 'bottom-right-image'];
    var borkOnClick = new Howl({src: ['./audio/bork.mp3']});
    var growlOnClick = new Howl({src: ['./audio/growl.mp3']});
    var howlOnClick = new Howl({src: ['./audio/howl.mp3']});
    var squeakOnClick = new Howl({src: ['./audio/squeak2.wav']});

    // init stats received-from or sent-to Firebase
    var numPuzzles = 0;
    var numMoves = 0;
    var numSkips = 0;
    var averageNumMoves = (numMoves/numPuzzles);
    var speedStat = 800;
    var agilityStat = 4000;
    var willPowerStat = 1000;
    var playersStat = 100;

    // init global DOM elements
    var main = $(".main");
    var timer = $('<h1>');
    var puzzleBoard = $('<div>');
    var skipButton = $('<p>');
    timer.addClass('timer');
    timer.text('1:00');
    puzzleBoard.addClass('puzzle-board');
    skipButton.text('skip');
    skipButton.addClass('skip-button');

    var skillScreen = function () {
        var players = $('<p>');
        var playersNum = $('<h1>');
        var speed = $('<p>');
        var speedNum = $('<h1>');
        var agility = $('<p>');
        var agilityNum = $('<h1>');
        var willPower = $('<p>');
        var willPowerNum = $('<h1>');
        var playButton = $('<p>');
        var resetGame = function () {
            document.location.reload();
        }
        var calcRank = function (score, totalStat, type) {
            var average = (totalStat / playersStat);
            var rank;
            var high = 'top doge';
            var low = 'much bad';
            if (type !== 'speed') {
                high = 'much bad';
                low = 'top doge';
            }
            if (score <= (average * 0.5)) {
                rank = low;
            }
            else if (score > (average * 0.5) && score < (average * 1.5)) {
                rank = 'so normal';
            }
            else {
                rank = high;
            }
            return rank;
        }
        players.addClass('small-words');
        players.text('other players:');
        playersNum.addClass('endTitle2');
        playersNum.text(`${playersStat}`);
        speed.addClass('small-words');
        speed.text('speed:');
        speedNum.addClass('endTitle2');
        speedNum.text(`${calcRank(numPuzzles, speedStat, 'speed')}`);
        agility.addClass('small-words');
        agility.text('agility:');
        agilityNum.addClass('endTitle2');
        agilityNum.text(`${calcRank(numMoves, agilityStat, 'agility')}`);
        willPower.addClass('small-words');
        willPower.text('will power:');
        willPowerNum.addClass('endTitle2');
        willPowerNum.text(`${calcRank(numSkips, willPowerStat, 'will power')}`);
        playButton.text('play again');
        playButton.addClass('skill-button');
        main.empty(main.children);   
        main.append(speed);
        main.append(speedNum);
        main.append(agility);
        main.append(agilityNum);
        main.append(willPower);
        main.append(willPowerNum);
        main.append(players);
        main.append(playersNum);
        main.append(playButton);
        playButton.on('click', resetGame); 
    };

    var endScreen = function () {
        var endTitle = $('<h1>');
        var solves = $('<h1>');
        var moves = $('<h1>');
        var skips = $('<h1>');
        var skillButton = $('<p>');
        endTitle.addClass('endTitle');
        endTitle.text('such awesome');
        solves.addClass('endTitle2');
        solves.text(`solves: ${numPuzzles}`);
        moves.addClass('endTitle2');
        moves.text(`moves: ${numMoves}`);
        skips.addClass('endTitle2');
        skips.text(`skips: ${numSkips}`);
        skillButton.text('wut rank?');
        skillButton.addClass('skill-button');
        main.empty(main.children);   
        main.append(endTitle);
        main.append(solves);
        main.append(moves);
        main.append(skips);
        main.append(skillButton);
        skillButton.on('click', skillScreen); 
    };

    var gameLogic = function () {
        var seconds = 60;
        var isPaused = true;
        var bonus = false;
        var oneClick = false;
        var firstPiece = '';
        var firstPieceClass = '';
        // init get images function
        var getImages = function (data) {
            puzzleBoard.empty(puzzleBoard.children);   
            // init scramble image classes
            var scrambleImages = function (images) {
                var imagesScrambled = [];
                var j = 0;
                while (j < 9) {
                    var i = Math.floor(Math.random() * 9);
                    if (imagesScrambled.includes(images[i]) !== true) {
                        imagesScrambled.push(images[i]);
                        j++;
                    }
                }
                return imagesScrambled;
            };
            var image = data[0];
            var imagesScrambled = scrambleImages(imagesSorted);
            // init puzzle pieces
            for (var i = 0; i < 9; i++) {
                var setPuzzleBoard = function () {
                    var puzzlePiece = document.createElement('div');
                    var pieceImage = document.createElement('img');
                    puzzlePiece.classList.add('puzzle-piece');
                    pieceImage.setAttribute('src', image);
                    pieceImage.classList.add(imagesScrambled[i]);
                    puzzlePiece.appendChild(pieceImage);
                    puzzleBoard.append(puzzlePiece);
                    isPaused = false;
                };
                setPuzzleBoard();
            };
        };
        var printPuzzle = function () {
            $.get('https://my-little-cors-proxy.herokuapp.com/'+url, getImages);
        };
        var skipPuzzle = function (event) {
            event.preventDefault();
            oneClick = false;
            isPaused = true;
            numSkips++;
            printPuzzle();
            growlOnClick.play();
        }
        var swapPieces = function(event) {
            event.preventDefault();
            if (event.target !== event.currentTarget) {
                if (oneClick === true && event.target !== firstPiece) {
                    oneClick = false;
                    numMoves++;
                    var secondPieceClass = event.target.getAttribute('class');
                    event.target.classList.remove(secondPieceClass);
                    event.target.classList.add(firstPieceClass);
                    firstPiece.classList.add(secondPieceClass);
                    firstPiece.classList.remove(firstPieceClass);
                    firstPiece.classList.remove('highlightproperties');
                    var puzzlePieceList = document.getElementsByClassName('puzzle-piece');
                    var listToCompare = [];
                    borkOnClick.play();

                    for (var i = 0; i < 9; i++) {
                        var imgPosition = puzzlePieceList[i].firstChild.className;
                        listToCompare.push(imgPosition);
                    };
                    var win = true
                    for (var i = 0; i < 9; i++) {
                        if (imagesSorted[i] !== listToCompare[i]) {
                            win = false;
                        }
                    }
                    if (win === true) {
                        squeakOnClick.play();
                        numPuzzles++;
                        isPaused = true;
                        if (seconds < (49)) {
                            seconds += 11;
                        }
                        else {
                            seconds = 60;
                        }
                        bonus = true;
                        setTimeout(function() {
                            printPuzzle();
                        }, 1000);
                    }
                }
                else if (oneClick === true && event.target === firstPiece) {
                    oneClick = false;
                    firstPiece.classList.remove('highlightproperties');
                }
                else {
                    oneClick = true;
                    firstPiece = event.target;
                    firstPieceClass = event.target.getAttribute('class');
                    event.target.classList.add('highlightproperties');
                }
            }
        };
        window.setTimeout(function() {
            window.setInterval(function() {
                if(!isPaused) {
                    timer.removeClass('timer-green');
                    if (bonus) {
                        timer.addClass('timer-green');
                        bonus = false;
                    }
                    if (seconds > 10) {
                        timer.text('0:' + seconds);
                    }
                    if (seconds < 10) {
                        timer.text('0:0' + seconds);
                    }
                    if (seconds < 0) {
                        timer.text("time done");
                    }
                    if (seconds < -1) {
                        isPaused = true;
                        howlOnClick.play();
                        endScreen();
                    }
                    seconds -= 1;
                }
            }, 1000);
        }, 1000);
        main.empty(main.children);   
        main.append(timer);
        main.append(puzzleBoard);
        main.append(skipButton);
        puzzleBoard.on('click', swapPieces);
        skipButton.on('click', skipPuzzle);
        printPuzzle();
    };

    var homeScreen = function () {
        var title = $('<h1>');
        var senseiImage = $('<img>');
        var startButton = $('<p>');
        title.addClass('title');
        title.text('shiba sensei');
        senseiImage.attr('src', 'images/sensei.jpg')
        senseiImage.addClass('sensei-image');
        startButton.text('do test');
        startButton.addClass('start-button');
        main.append(title);
        main.append(senseiImage);
        main.append(startButton);
        startButton.on('click', gameLogic); 
    }

    homeScreen();
    
})();