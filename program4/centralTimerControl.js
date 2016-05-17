var timers = {
    timerID: 0,
    timers: [],
    add: function (fn) {
        this.timers.push(fn);
    },
    start: function () {
        if (this.timerID) return;
        (function runNext() {
            if (timers.timers.length > 0) {
                for (var i = 0; i < timers.timers.length; i++) {
                    console.log(timers.timers[i]());
                    timers.timers.splice(i, 1);
                    i--;   
                }
                timers.timerID = setTimeout(runNext, 0);
            }
        })();
    },
    stop: function () {
        clearTimeout(this.timerID);
        this.timerID = 0;
    }
};