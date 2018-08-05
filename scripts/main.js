// (function iife () {
//     // init global variables
//     var url = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true';
//     var image;
//     // init get images function
//     var getImages = function (data) {
//         image = data[0];
//         // init puzzle pieces
//         var puzzlePiece = document.createElement('img');
//         puzzlePiece.classList.add('.puzzlePiece');
//         puzzlePiece.setAttribute('src', image);
//         // init puzzle board then
//         // append pieces to board
//         var puzzleBoard = document.querySelector('.puzzleBoard');
//         puzzleBoard.appendChild(puzzlePiece);
//     };
//     // init GET request
//     $.get(url, getImages);
// })();


var url = 'https://t2.ea.ltmcdn.com/en/images/9/4/7/img_how_to_train_a_shiba_inu_749_600.jpg';

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


var play = function () {
    for (var i = 0; i < 9; i++) {

        // var clicked = false;
        // var pieceClicked = null;
        // var pieceClickedClass = '';

        var setPuzzleBoard = function () {
            var currentI = i;
            var puzzlePiece = document.createElement('div');
            var pieceImage = document.createElement('img');

            puzzlePiece.classList.add('puzzle-piece');
            pieceImage.setAttribute('src', url);
            pieceImage.classList.add(imagesScrambled[currentI]);

            puzzlePiece.appendChild(pieceImage);
            var puzzleBoard = document.querySelector('.puzzle-board');
            puzzleBoard.appendChild(puzzlePiece);

            // var swapPieces = function() {
            //     if (clicked === true) {
            //         clicked = false;
            //         pieceImage.classList.remove(imagesScrambled[currentI]);
            //         pieceImage.classList.add(pieceClickedClass);
            //         pieceClicked.classList.remove(pieceClickedClass);
            //         pieceClicked.classList.add(imagesScrambled[currentI]);

            //     }
            //     else {
            //         clicked = true;
            //         pieceClicked = pieceImage;
            //         pieceClickedClass = imagesScrambled[currentI];
            //     }
            // };
            // pieceImage.addEventListener('click', swapPieces);

        };
        setPuzzleBoard();
    };
};

play();


// // init get images function
// var getImages = function () {

//     // init scramble images function
//     var scrambleImages = function (images) {
//         var imagesScrambled = [];
//         var j = 0;
//         while (j < 4) {
//             var i = Math.floor(Math.random() * 4);
//             if (imagesScrambled.includes(images[i]) !== true) {
//                 imagesScrambled.push(images[i]);
//                 j++;
//             }
//         }

//         return imagesScrambled;
//     };

//     // init puzzle pieces

//     var topLeft = document.createElement('div');
//     topLeft.classList.add('top-left');

//     var topRight = document.createElement('div');
//     topRight.classList.add('top-right');

//     var bottomLeft = document.createElement('div');
//     bottomLeft.classList.add('bottom-left');

//     var bottomRight = document.createElement('div');
//     bottomRight.classList.add('bottom-right');

//     var topLeftImage = document.createElement('img');
//     topLeftImage.classList.add('top-left-image');
//     topLeftImage.setAttribute('src', url);

//     var topRightImage = document.createElement('img');
//     topRightImage.classList.add('top-right-image');
//     topRightImage.setAttribute('src', url);

//     var bottomLeftImage = document.createElement('img');
//     bottomLeftImage.classList.add('bottom-left-image');
//     bottomLeftImage.setAttribute('src', url);

//     var bottomRightImage = document.createElement('img');
//     bottomRightImage.classList.add('bottom-right-image');
//     bottomRightImage.setAttribute('src', url);


//     var images = new Object();
//     images[0] = topLeftImage;
//     images[1] = topRightImage;
//     images[2] = bottomLeftImage;
//     images[3] = bottomRightImage;
    

//     var imagesScrambled = scrambleImages(images);
//     console.log(imagesScrambled);


//     topLeft.appendChild(imagesScrambled[0]);
//     topRight.appendChild(imagesScrambled[1]);
//     bottomLeft.appendChild(imagesScrambled[2]);
//     bottomRight.appendChild(imagesScrambled[3]);
    

//     // init puzzle board then
//     // append pieces to board
//     var puzzleBoard = document.querySelector('.puzzle-board');
//     puzzleBoard.appendChild(topLeft);
//     puzzleBoard.appendChild(topRight);
//     puzzleBoard.appendChild(bottomLeft);
//     puzzleBoard.appendChild(bottomRight);

// };
// getImages();