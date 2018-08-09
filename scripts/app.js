(function app_js_iife () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBW39F-pS2xxZ-KCWEckyhjefcZIFzPOAg",
        authDomain: "shibe-puzzle.firebaseapp.com",
        databaseURL: "https://shibe-puzzle.firebaseio.com",
        projectId: "shibe-puzzle",
        storageBucket: "shibe-puzzle.appspot.com",
        messagingSenderId: "818596725520"
    };
    firebase.initializeApp(config);
    // Get elements
    const preRank = document.getElementsByClassName('rank');
    // Create reference
    const dbRefRank = firebase.database().ref().child('rank');
    // Sync rank changes + log to console
    dbRefRank.on('value', snap => console.log(snap.val()));
})();