(function iife () {
    // init global variables
    var url = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true';
    var image;
    // init scramble image classes
    var imagesSorted = ['top-left-image', 'top-mid-image', 'top-right-image', 'mid-left-image', 'mid-mid-image', 'mid-right-image', 'bottom-left-image', 'bottom-mid-image', 'bottom-right-image'];
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
    var imagesScrambled = scrambleImages(imagesSorted);
    var main = $(".main");
    var numMoves = 0;
    var numSkips = 0;
    var numPuzzles = 0;
    // playersStat = rank in firebaseDB;
    // will connect w/ firebase's realtime database.
    var playersStat = 100;
    var speedStat = 800;
    var agilityStat = 700;
    var willPowerStat = 1000;
    var seconds = 60;
    var isPaused = true;
    var bonus = false;
    var timer = $('<h1>');
    timer.addClass('timer');
    timer.text('1:00');
    var puzzleBoard = $('<div>');
    puzzleBoard.addClass('puzzle-board');
    var skipButton = $('<p>');
    skipButton.text('skip');
    skipButton.addClass('skip-button');

    var printPuzzle = function () {
        $.get('https://my-little-cors-proxy.herokuapp.com/'+url, getImages);
    };

    var resetGame = function () {
        document.location.reload();
    }

    var calcRank1 = function (score, totalStat) {
        var average = (totalStat / playersStat);
        var rank = null;
        if (score < (average * 0.5)) {
            rank = 'much bad';
        }
        if (score > (average * 0.5) && score < (average * 1.5)) {
            rank = 'wow so normal';
        }
        if (score > (average * 1.5)) {
            rank = 'top doge';
        }
        return rank;
    }


    var calcRank2 = function (score, totalStat) {
        var average = (totalStat / playersStat);
        var rank = null;
        if (score < (average * 0.5)) {
            rank = 'top doge';
        }
        if (score > (average * 0.5) && score < (average * 1.5)) {
            rank = 'wow so normal';
        }
        if (score > (average * 1.5)) {
            rank = 'much bad';
        }
        return rank;
    }

    var skillScreen = function () {
        main.empty(main.children);   
        var players = $('<p>');
        players.addClass('small-words');
        players.text('other players:');
        var playersNum = $('<h1>');
        playersNum.addClass('endTitle2');
        playersNum.text(`${playersStat}`);
        var speed = $('<p>');
        speed.addClass('small-words');
        speed.text('speed:');
        var speedNum = $('<h1>');
        speedNum.addClass('endTitle2');
        speedNum.text(`${calcRank1(numPuzzles, speedStat)}`);
        var agility = $('<p>');
        agility.addClass('small-words');
        agility.text('agility:');
        var agilityNum = $('<h1>');
        agilityNum.addClass('endTitle2');
        agilityNum.text(`${calcRank2(numMoves, agilityStat)}`);
        var willPower = $('<p>');
        willPower.addClass('small-words');
        willPower.text('will power:');
        var willPowerNum = $('<h1>');
        willPowerNum.addClass('endTitle2');
        willPowerNum.text(`${calcRank2(numSkips, willPowerStat)}`);
        var playButton = $('<p>');
        playButton.text('play again');
        playButton.addClass('skill-button');
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
        main.empty(main.children);   
        var endTitle = $('<h1>');
        endTitle.addClass('endTitle');
        endTitle.text('such awesome');
        var solves = $('<h1>');
        solves.addClass('endTitle2');
        solves.text(`solves: ${numPuzzles}`);
        var moves = $('<h1>');
        moves.addClass('endTitle2');
        moves.text(`moves: ${numMoves}`);
        var skips = $('<h1>');
        skips.addClass('endTitle2');
        skips.text(`skips: ${numSkips}`);
        var skillButton = $('<p>');
        skillButton.text('wut rank?');
        skillButton.addClass('skill-button');
        main.append(endTitle);
        main.append(solves);
        main.append(moves);
        main.append(skips);
        main.append(skillButton);
        skillButton.on('click', skillScreen); 
    };
    
    // init get images function
    var getImages = function (data) {
        main.append(timer);
        main.append(puzzleBoard);
        main.append(skipButton);
        puzzleBoard.empty(puzzleBoard.children);   
        image = data[0];
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

    var gameLogic = function () {
        var oneClick = false;
        var firstPiece = '';
        var firstPieceClass = '';

        var skipPuzzle = function (event) {
            event.preventDefault();
            oneClick = false;
            isPaused = true;
            numSkips++;
            printPuzzle();
            fartOnClick.play();
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
                    var puzzlePieceList = document.getElementsByClassName('puzzle-piece')
                    var listToCompare = [];
                    borkOnClick.play();

                    for (var i = 0; i < 9; i++) {
                        var imgPosition = puzzlePieceList[i].firstChild.className;
                        listToCompare.push(imgPosition);
                    };
                    var win = true
                    for (var i = 0; i < 9; i++) {
                        if (imagesSorted[i] !== listToCompare[i]) {
                            win = false
                        }
                    }
                    if (win === true) {
                        solveOnClick.play();
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
        puzzleBoard.on('click', swapPieces);
        skipButton.on('click', skipPuzzle);
    };
    // init GET request
    gameLogic();
    window.setTimeout(function() {
        window.setInterval(function() {
            if(!isPaused) {
                timer.removeClass('timer-green');
                if (bonus) {
                    timer.addClass('timer-green');
                    bonus = false;
                }
                seconds -= 1;
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
                    winOnClick.play();
                    endScreen();
                }
            }
        }, 1000);
    }, 1000);

    var borkOnClick = new Howl({
        src: ['./audio/bork.mp3'],
    });

    var fartOnClick = new Howl({
        src: ['./audio/growl.mp3']
    });

    var winOnClick = new Howl({
        src: ['./audio/howl.mp3']
    });

    var solveOnClick = new Howl({
        src: ['./audio/squeak2.wav']
    });

var startGame = function () {
        main.empty(main.children);   
        printPuzzle();
    }
var homeScreen = function () {
    var title = $('<h1>');
    title.addClass('title');
    title.text('shiba sensei');
    var senseiImage = $('<img>');
    senseiImage.attr('src', 'images/sensei.jpg')
    senseiImage.addClass('sensei-image');
    var startButton = $('<p>');
    startButton.text('do test');
    startButton.addClass('start-button');
    main.append(title);
    main.append(senseiImage);
    main.append(startButton);
    startButton.on('click', startGame); 
}
homeScreen();

})();
