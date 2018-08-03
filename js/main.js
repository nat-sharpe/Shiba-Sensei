(function iife () {
    // init url variable with API url
    var url = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true';
    var image;
    // make GET request
    var getImages = function (data) {
        image = data[0];
        console.log(image);
        // create puzzle
        var puzzlePiece = document.createElement('img');
        puzzlePiece.classList.add('.puzzlePiece');
        puzzlePiece.setAttribute('src', image);
        // append DOM elements to puzzleBoard
        var puzzleBoard = document.querySelector('.puzzleBoard');
        puzzleBoard.appendChild(puzzlePiece);
    };
    // get image when page is ready.
    $.get(url, getImages);
})();