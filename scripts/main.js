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
    // init get images function
    var getImages = function (data) {
        image = data[0];
        // init puzzle pieces
        for (var i = 0; i < 9; i++) {
            var puzzlePiece = document.createElement('div');
            var pieceImage = document.createElement('img');

            puzzlePiece.classList.add('puzzle-piece');
            pieceImage.setAttribute('src', image);
            pieceImage.classList.add(imagesScrambled[i]);

            puzzlePiece.appendChild(pieceImage);
            var puzzleBoard = document.querySelector('.puzzle-board');
            puzzleBoard.appendChild(puzzlePiece);
        };
    };
    // init GET request
    $.get(url, getImages);
})();