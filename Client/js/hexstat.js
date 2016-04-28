﻿function hexstat(id) {
    this.canvas = document.getElementById(id);
    if (this.canvas == null) return;
    this.stage = new createjs.Stage(id);

    this.maxskill = 200; //this.level * 4 / 2;
    this.size = this.canvas.width / 2;

    var test = { time: 0 };
    var that = this;

    this.data = [];

    this.drawOutline = function () {
        if (this.stage.getChildByName("outline") != null) return;

        var outline = new createjs.Shape();
        outline.name = "outline";
        outline.x = this.canvas.width / 2;
        outline.y = this.canvas.height / 2;
        outline.graphics.beginStroke("#e4e4e4").setStrokeStyle(1).drawPolyStar(0, 0, this.size, 6, 0, -90);
        this.stage.addChild(outline);
    }

    this.drawData = function (life, speed, physattack, physdefence, magattack, magdefence, color) {
        //if (this.stage.getChildByName("data") != null) return;
        var points = [{ x: 0, y: -(Math.min(this.maxskill, life) / this.maxskill * this.size) },
                      { x: (Math.min(this.maxskill, speed) / this.maxskill * this.size) * Math.cos(toRadians(30)), y: -(Math.min(this.maxskill, speed) / this.maxskill * this.size) * Math.sin(toRadians(30)) },
                      { x: (Math.min(this.maxskill, physattack) / this.maxskill * this.size) * Math.cos(toRadians(30)), y: (Math.min(this.maxskill, physattack) / this.maxskill * this.size) * Math.sin(toRadians(30)) },
                      { x: 0, y: (Math.min(this.maxskill, physdefence) / this.maxskill * this.size) },
                      { x: -(Math.min(this.maxskill, magattack) / this.maxskill * this.size) * Math.cos(toRadians(30)), y: (Math.min(this.maxskill, magattack) / this.maxskill * this.size) * Math.sin(toRadians(30)) },
                      { x: -(Math.min(this.maxskill, magdefence) / this.maxskill * this.size) * Math.cos(toRadians(30)), y: -(Math.min(this.maxskill, magdefence) / this.maxskill * this.size) * Math.sin(toRadians(30)) },
                      { x: 0, y: -(Math.min(this.maxskill, life) / this.maxskill * this.size) }];

        if (this.data[color]) this.stage.removeChild(this.data[color]); // I don't know if it is possible to edit moveTo cordinates.

        data = new createjs.Shape();
        data.name = "data";
        data.x = this.canvas.width / 2;
        data.y = this.canvas.height / 2;
        data.graphics.beginFill(color || "DeepSkyBlue").moveTo(0, 0);

        for (var p in points) data.graphics.lineTo(points[p].x, points[p].y);

        data.graphics.closePath();

        this.stage.addChild(data);
        this.data[color] = data;
    }

    this.drawLines = function () {
        if (this.stage.getChildByName("line") != null) return;

        var points = [{ x: 0, y: -this.size },
              { x: this.size * Math.cos(toRadians(30)), y: -this.size * Math.sin(toRadians(30)) },
              { x: this.size * Math.cos(toRadians(30)), y: this.size * Math.sin(toRadians(30)) },
              { x: 0, y: this.size },
              { x: -this.size * Math.cos(toRadians(30)), y: this.size * Math.sin(toRadians(30)) },
              { x: -this.size * Math.cos(toRadians(30)), y: -this.size * Math.sin(toRadians(30)) }];

        for (var i = 0; i < 3; i++) {
            var line = new createjs.Shape();
            line.name = "line";
            line.x = this.canvas.width / 2;
            line.y = this.canvas.height / 2;

            line.graphics.beginStroke("#e4e4e4").setStrokeStyle(1).moveTo(points[i].x, points[i].y).lineTo(points[i + 3].x, points[i + 3].y);

            this.stage.addChild(line);
        }
    }

    this.draw = function (life, speed, physattack, physdefence, magattack, magdefence) {
        this.drawLines();
        this.drawOutline();
        this.drawData(life, speed, physattack, physdefence, magattack, magdefence);

        this.stage.update();
    }

    this.animate = function (statsarr) {
        this.stage.clear();
        this.stage.removeAllChildren();
        this.drawLines();
        this.drawOutline();

        createjs.Tween.get(test).to({ time: 1 }, 2000, createjs.Ease.quintInOut);
        createjs.Ticker.setFPS(60);
        //createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED; // Causes lag, but why?
        createjs.Ticker.addEventListener("tick", function () {
            tick(statsarr);
        });
    }

    function tick(statsarr) {
        for (var i = 0; i < statsarr.length; i++)
            that.drawData(statsarr[i].life * test.time, statsarr[i].speed * test.time, statsarr[i].physicalattack * test.time, statsarr[i].physicaldefence * test.time, statsarr[i].magicattack * test.time, statsarr[i].magicdefence * test.time, statsarr[i].color);

        that.stage.update();
    }
}


function toRadians(angle) {
    return angle * (Math.PI / 180);
}