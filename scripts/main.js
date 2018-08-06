(function iife () {
    // init global variables
    var url = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true';
    var image;
    // init get images function
    
    var getImages = function (data) {
        image = data[0];
        // init puzzle pieces
        for (var i = 0; i < 9; i++) {
            var currentI = i;
            var puzzlePiece = document.createElement('div');
            var pieceImage = document.createElement('img');

            puzzlePiece.classList.add('puzzle-piece');
            pieceImage.setAttribute('src', image);
            pieceImage.classList.add('top-left-image');

            puzzlePiece.appendChild(pieceImage);
            var puzzleBoard = document.querySelector('.puzzle-board');
            puzzleBoard.appendChild(puzzlePiece);
        };
    };
    // init GET request
    $.get(url, getImages);
})();