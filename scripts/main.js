(function iife () {
    // init global variables
    var url = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true';
    var image;
    // init get images function
    var getImages = function (data) {
        image = data[0];
        // init puzzle pieces
        var puzzlePiece = document.createElement('img');
        puzzlePiece.classList.add('.puzzlePiece');
        puzzlePiece.setAttribute('src', image);
        // init puzzle board then
        // append pieces to board
        var puzzleBoard = document.querySelector('.puzzleBoard');
        puzzleBoard.appendChild(puzzlePiece);
    };
    // init GET request
    $.get(url, getImages);
})();