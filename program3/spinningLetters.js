function pausePlay() {
    var letters = document.getElementsByClassName('spinning');
    
    if (this.innerHTML === "Play") {
        this.innerHTML = "Pause";
        for (var i = 0; i < letters.length; i++) {
            letters[i].style.animationPlayState = "running";
        }
    } else {
        this.innerHTML = "Play";
        for (var i = 0; i < letters.length; i++) {
            letters[i].style.animationPlayState = "paused";
        }
    }
}

function stop() {
    var letters = document.getElementsByClassName("spinning");
    while (letters.length > 0) {
        letters[0].classList.remove("spinning");
    }
}

function speedUp() {
    var letters = document.getElementsByClassName('spinning');
    var regex = /(\d)+/;
    for (var i = 0; i < letters.length; i++) {
        var computedStyle = window.getComputedStyle(letters[i]);
        var animationDuration = Math.ceil(computedStyle.animationDuration.match(regex)[0] / 2);
        letters[i].style.animationDuration = animationDuration + "s";
    }
}

function slowDown() {
    var letters = document.getElementsByClassName('spinning');
    var regex = /(\d)+/;
    for (var i = 0; i < letters.length; i++) {
        var computedStyle = window.getComputedStyle(letters[i]);
        var animationDuration = computedStyle.animationDuration.match(regex)[0] * 2;
        letters[i].style.animationDuration = animationDuration + "s";
    }
}


(function () {
    var pausePlayBtn = document.getElementById("pausePlayBtn");
    var stopBtn = document.getElementById("stopBtn");
    var speedBtn = document.getElementById("speedBtn");
    var slowBtn = document.getElementById("slowBtn");

    pausePlayBtn.addEventListener("click", pausePlay, false);
    stopBtn.addEventListener("click", stop, false);
    speedBtn.addEventListener("click", speedUp, false);
    slowBtn.addEventListener("click", slowDown, false);

})();