(function iife () {
    // init global variables
    var url = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false';
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
    var puzzleBoard = $('.puzzle-board');
    var newPuzzle = $('.new-puzzle');

    var printPuzzle = function () {
        $.get(url, getImages);
    }
    // init get images function

    var getImages = function (data) {
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
            };
            setPuzzleBoard();
        };
    };

    var gameLogic = function () {
        var oneClick = false;
        var firstPiece = '';
        var firstPieceClass = '';

        var swapPieces = function(event) {
            if (oneClick === true && event.target !== firstPiece) {
                oneClick = false;
                var secondPieceClass = event.target.getAttribute('class');
                event.target.classList.remove(secondPieceClass);
                event.target.classList.add(firstPieceClass);
                firstPiece.classList.add(secondPieceClass);
                firstPiece.classList.remove(firstPieceClass);
                firstPiece.classList.remove('highlightproperties');
                var puzzlePieceList = document.getElementsByClassName('puzzle-piece')
                var listToCompare = [];
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
                    setTimeout(function() {
                        window.alert('YOU WON! Click OK to play again.');
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
        };
        puzzleBoard.on('click', swapPieces);
        newPuzzle.on('click', printPuzzle);
    };
    // init GET request
    printPuzzle();
    gameLogic();
})();

