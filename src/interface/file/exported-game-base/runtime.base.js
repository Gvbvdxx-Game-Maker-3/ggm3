(function () {

    if (!window.Game || !window.GGM3Engine) {
        window.alert("Couldn't find either GGM3Engine or the Game object, you may have to add the scripts.");
        return;
    }

    window.addEventListener('error', (event) => {
        window.alert(event.message);
    }, false);

    window.addEventListener('unhandledrejection', (event) => {
        window.alert(event.reason);
    });

    var Game = window.Game;
    var GGM3Engine = window.GGM3Engine;

    var loadingBar = document.getElementById("loadingbar");
    var loadingBarInner = document.getElementById("loadingbar-inner");
    var gameContent = document.getElementById("gameContent");
    var gameCanvas = document.getElementById("gameCanvas");

    var engine = new GGM3Engine(gameCanvas);
    Game.attachEngine(engine);

    loadingBar.hidden = false;

    function setProgress(current, max) {
        var percent = (current / max) * 100;

        loadingBarInner.style.width = Math.round(percent)+"%";
    }

    setProgress(0, 100);
    Game.addEventListener("progress", setProgress);

    Game.addEventListener("loaded", () => {
        gameContent.hidden = false;
        loadingBar.hidden = true;
        engine.startGame();
    });
    
    Game.startPreloading();


})();