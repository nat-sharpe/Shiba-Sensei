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
    var seconds = 60;
    var isPaused = true;
    var bonus = false;
    var timer = $('<h1>');
    timer.addClass('timer');
    timer.text('1:00');
    var puzzleBoard = $('<div>');
    puzzleBoard.addClass('puzzle-board');
    var skipButton = $('<p>');
    skipButton.text('SKIP');
    skipButton.addClass('skip-button');

    var printPuzzle = function () {
        $.get('https://my-little-cors-proxy.herokuapp.com/'+url, getImages);
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
        }
        var swapPieces = function(event) {
            event.preventDefault();
            if (event.target !== event.currentTarget) {
                console.log(event.target)
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
                        numPuzzles++;
                        isPaused = true;
                        if (seconds < (39)) {
                            seconds += 16;
                        }
                        else {
                            seconds = 60;
                        }
                        bonus = true;
                        console.log(numPuzzles);
                        console.log(numMoves);
                        console.log(numSkips);
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
                  timer.text("TIME'S UP!");
                }
            }
        }, 1000);
    }, 1000);

  var borkOnClick = new Howl({
    src: ['./audio/bork.mp3'],
    });

  })();

var startGame = function () {
        main.empty(main.children);   
        printPuzzle();
    }
var homeScreen = function () {
    var title = $('<h1>');
    title.addClass('title');
    title.text('SHIBA SENSEI');
    var senseiImage = $('<img>');
    senseiImage.attr('src', 'images/sensei.jpg')
    senseiImage.addClass('sensei-image');
    var startButton = $('<p>');
    startButton.text('Start Test');
    startButton.addClass('start-button');
    main.append(title);
    main.append(senseiImage);
    main.append(startButton);
    startButton.on('click', startGame); 
}
homeScreen();

})();
