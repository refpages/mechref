
$(document).ready(function() {

    var lastCDataIndex = 0;

    var genPathData = function() {
        var cDataSet = [
            //[1, 1, 1, 1],
            [1, 2, 1, 2],
            [1, 3, 1, 2],
            [1, 3, 3, 1],
            [2, 2, 3, 1],
            [2, 1, 1, 1]
        ];
        var cDataIndex = (lastCDataIndex + 1 + Math.floor(Math.random() * (cDataSet.length - 1))) % cDataSet.length;
        var cData = cDataSet[cDataIndex];
        lastCDataIndex = cDataIndex;
        var data = {
            sn: Math.floor(Math.random() * 2) * 2 - 1,
            c1: cData[0],
            c2: cData[1],
            c3: cData[2],
            c4: cData[3],
            b1: (Math.random() - 0.5) * 0.1 * Math.PI,
            b3: (Math.random() - 0.5) * 0.1 * Math.PI,
            a2: (Math.random() - 0.5) * 0.2,
            a4: (Math.random() - 0.5) * 0.2
        };
        return data;
    };

    var pathData;

    var pathFcn = function(t) {
        var twopi = 2 * Math.PI;
        var s = pathData.sn * t;
        x = Math.sin(pathData.c1 * s * twopi + pathData.b1) + pathData.a2 * Math.cos(pathData.c2 * s * twopi);
        y = Math.cos(pathData.c3 * s * twopi + pathData.b3) + pathData.a4 * Math.sin(pathData.c4 * s * twopi);
        return $V([2 * x, y + 1]);
    };

    var genPath = function() {
        pathData = genPathData();
        var i, t, x, y;
        var d = [];
        var n = 200;
        for (i = 0; i <= n; i++) {
            ti = i / n;
            d.push(pathFcn(ti));
        }
        return d;
    };

    var path = genPath();

    var position = function(t) {
        return pathFcn(t / 10);
    };

    var moveStates = [{}, {}];
    var moveHoldTimes = [-1, -1];
    var moveInterps = {};
    var moveNames = ["initial", "final"];

    var bestScore = -1;
    var bestVErrorDeg = 200;
    var bestAErrorDeg = 200;

    var hw_fv_c = new PrairieDrawAnim("hw-fv-c", function(t) {
        this.setUnits(10, 6);

        this.addOption("lineDrawType", "velocity");

        this.addOption("showSolution", false);
        this.addOption("solutionAllowed", false);
        this.addOption("resetAllowed", false);

        this.addOption("velocity", undefined);
        this.addOption("acceleration", undefined);

        this.addOption("velocityDrawn", false);
        this.addOption("accelerationDrawn", false);

        this.addOption("runTime", 4 + 3 * Math.random());

        var runTime = this.getOption("runTime");
        this.addOption("timeToGo", runTime.toFixed(1));

        var moveTransTimes = [runTime, 0];
        var moveState = this.newSequence("move", moveStates, moveTransTimes, moveHoldTimes, moveInterps, moveNames, t);

        this.polyLine(path);

        this.setProp("pointRadiusPx", 4);
        var data = this.numDiff(function(s) {return {"P": position(s)};}, t);
        var p = data["P"];
        var v = data.diff["P"];
        var a = data.ddiff["P"];

        this.save();
        this.translate(p);
        this.rotate(this.angleOf(v));
        this.scale($V([0.1, 0.1]));
        this.polyLine([
            $V([-2, 1]),
            $V([1, 1]),
            $V([2, 0]),
            $V([1, -1]),
            $V([-2, -1])], true);
        this.restore();

        var s = v.modulus();
        var sHistory = this.history("speed", 0.05, 20, t, s);
        var plotHistoryTime = 4;
        var plotMaxSpeed = 3.5;
        this.plotHistory($V([-4, -2.5]), $V([8, 2]),
                         $V([plotHistoryTime, plotMaxSpeed]),
                         Math.min(t, 0.95 * plotHistoryTime), "TEX:$\\dot{s}$", sHistory, "velocity");

        var vDraw = this.getOption("velocity");
        if (vDraw !== undefined) {
            this.arrow(p, p.add(vDraw), "velocity");
            this.labelLine(p, p.add(vDraw), $V([1, -1]), "TEX:$\\hat{v}_{\\rm guess}$");
        }

        var aDraw = this.getOption("acceleration");
        if (aDraw !== undefined) {
            this.arrow(p, p.add(aDraw), "acceleration");
            this.labelLine(p, p.add(aDraw), $V([1, -1]), "TEX:$\\hat{a}_{\\rm guess}$");
        }

        if (this.getOption("showSolution")) {
            this.save();
            this.setProp("arrowLinePattern", "dashed");
            this.arrow(data["P"], p.add(v.toUnitVector()), "velocity");
            this.labelLine(p, p.add(v.toUnitVector()), $V([1, 1]), "TEX:$\\hat{v}$");
            this.arrow(p, p.add(a.toUnitVector()), "acceleration");
            this.labelLine(p, p.add(a.toUnitVector()), $V([1, 1]), "TEX:$\\hat{a}$");
            this.restore();
        }
    });

    var canDrawVectors;

    var disableStep = function(step) {
        if (step === 1) {
            $(".step1").addClass("inactive");
        } else if (step === 2) {
            hw_fv_c.deactivateMouseLineDraw();
            $("#hw-fv-c").css("cursor", "auto");
            $(".step2").addClass("inactive");
            $(".step2").find("*").addClass("inactive");
            $(".step2").find("input").css('visibility', 'hidden');
            $('span[class~="needed:hw-fv-c:velocity"]').text("");
            $('span[class~="needed:hw-fv-c:acceleration"]').text("");
            canDrawVectors = false;
        } else if (step === 3) {
            $(".step3").addClass("inactive");
            $(".step3").find("*").addClass("inactive");
            $('span[class~="solution:hw-fv-c"]').text("");
        } else if (step === 4) {
            $(".step4").addClass("inactive");
            $(".step4").find("*").addClass("inactive");
        }
    };

    disableStep(2);
    disableStep(3);
    disableStep(4);
    $('*[class~="best:hw-fv-c"]').css('visibility', 'hidden');

    var enableStep = function(step) {
        if (step === 1) {
            $(".step1").removeClass("inactive");
        } else if (step === 2) {
            hw_fv_c.activateMouseLineDraw();
            $("#hw-fv-c").css("cursor", "crosshair");
            $(".step2").removeClass("inactive");
            $(".step2").find("*").removeClass("inactive");
            $(".step2").find("input").css('visibility','visible');
            $('span[class~="needed:hw-fv-c:velocity"]').text("(still needed)");
            $('span[class~="needed:hw-fv-c:acceleration"]').text("(still needed)");
            canDrawVectors = true;
        } else if (step === 3) {
            $(".step3").removeClass("inactive");
            $(".step3").find("*").removeClass("inactive");
            hw_fv_c.setOption("solutionAllowed", true);
        } else if (step === 4) {
            $(".step4").removeClass("inactive");
            $(".step4").find("*").removeClass("inactive");
            hw_fv_c.setOption("resetAllowed", true);
        }
    };
    
    hw_fv_c.registerAnimStepCallback(function(t) {
        var moveTransTimes = [this.getOption("runTime"), 0];
        var moveState = this.newSequence("move", moveStates, moveTransTimes, moveHoldTimes, moveInterps, moveNames, t);
        if (moveState.index === 0) {
            this.setOption("timeToGo", (this.getOption("runTime") - moveState.t).toFixed(1));
        } else {
            this.setOption("timeToGo", 0);
        }
    });

    hw_fv_c.registerSeqCallback("move", function(event, index, stateName) {
        if (index === 1 && event === "enter") {
            this.stopAnim();
            disableStep(1);
            enableStep(2);
        }
    });

    hw_fv_c.registerMouseLineDrawCallback(function() {
        var pos = position(this.lastDrawTime());
        var type = this.getOption("lineDrawType");
        if (this.mouseLineDrawing === true) {
            this.setOption(type, this.mouseLineDrawEnd.subtract(pos), false);
        } else {
            this.setOption(type + "Drawn", true);
        }
    });

    var checkDrawn = function(pd) {
        if (!canDrawVectors) {
            return;
        }
        if (pd.getOption("velocityDrawn")) {
            $('span[class~="needed:hw-fv-c:velocity"]').text("(done!)");
        }
        if (pd.getOption("accelerationDrawn")) {
            $('span[class~="needed:hw-fv-c:acceleration"]').text("(done!)");
        }
        if (pd.getOption("velocityDrawn") && pd.getOption("accelerationDrawn")) {
            enableStep(3);
        }
    };

    hw_fv_c.registerOptionCallback("velocityDrawn", function(value) {checkDrawn(this);});
    hw_fv_c.registerOptionCallback("accelerationDrawn", function(value) {checkDrawn(this);});

    $('button[class~="check:hw-fv-c"]').click(function() {
        if (!hw_fv_c.getOption("solutionAllowed")) {
            return;
        }
        hw_fv_c.setOption("solutionAllowed", false)

        disableStep(2);
        enableStep(4);
        $(".step3").find("button").addClass("inactive");

        hw_fv_c.setOption("showSolution", true);

        var vDraw = hw_fv_c.getOption("velocity");
        var aDraw = hw_fv_c.getOption("acceleration");
        var data = hw_fv_c.numDiff(function(s) {return {"P": position(s)};}, hw_fv_c.lastDrawTime());
        var v = data.diff["P"];
        var a = data.ddiff["P"];
        var vError = v.angleFrom(vDraw);
        var aError = a.angleFrom(aDraw);
        var vErrorDeg = Math.floor(hw_fv_c.radToDeg(vError));
        var aErrorDeg = Math.floor(hw_fv_c.radToDeg(aError));
        var vErrorString = "(" + vErrorDeg + "° error)";
        var aErrorString = "(" + aErrorDeg + "° error)";
        var score = Math.max(0, 100 - vErrorDeg - aErrorDeg);
        var bothErrorString = "(velocity error " + vErrorDeg + "°, acceleration error " + aErrorDeg + "°, score " + score + ")";

        var maxError = 30;
        var checkText;
        var success = false;
        if (Math.max(vErrorDeg, aErrorDeg) <= 0 ) {
            checkText = "unbelievable! " + bothErrorString;
            success = true;
        } else if (Math.max(vErrorDeg, aErrorDeg) <= 2) {
            checkText = "awesome! " + bothErrorString;
            success = true;
        } else if (Math.max(vErrorDeg, aErrorDeg) <= 5) {
            checkText = "excellent! " + bothErrorString;
            success = true;
        } else if (Math.max(vErrorDeg, aErrorDeg) <= 15) {
            checkText = "pretty good! " + bothErrorString;
            success = true;
        } else if (Math.max(vErrorDeg, aErrorDeg) <= maxError) {
            checkText = "close enough! " + bothErrorString;
            success = true;
        } else if (vErrorDeg < maxError) {
            checkText = "velocity is ok " + vErrorString + ", but acceleration is wrong " + aErrorString;
        } else if (aErrorDeg < maxError) {
            checkText = "acceleration is ok " + aErrorString + ", but velocity is wrong " + vErrorString;
        } else {
            checkText = "both velocity " + vErrorString + " and acceleration " + aErrorString + " are wrong";
        }
        $('span[class~="solution:hw-fv-c"]').text(checkText);

        if (success) {
            if (score > bestScore) {
                bestScore = score;
                $('span[class~="bestScore:hw-fv-c"]').text(bestScore);
                $('span[class~="bestScoreContainer:hw-fv-c"]').css('background', 'rgb(255, 50, 50)');
                window.setTimeout(function() {
                    $('span[class~="bestScoreContainer:hw-fv-c"]').css('background', 'rgb(255, 255, 255)');
                }, 600);
            }
            if (vErrorDeg < bestVErrorDeg) {
                bestVErrorDeg = vErrorDeg;
                $('span[class~="bestVErrorDeg:hw-fv-c"]').text(bestVErrorDeg);
                $('span[class~="bestVErrorDegContainer:hw-fv-c"]').css('background', 'rgb(255, 50, 50)');
                window.setTimeout(function() {
                    $('span[class~="bestVErrorDegContainer:hw-fv-c"]').css('background', 'rgb(255, 255, 255)');
                }, 600);
            }
            if (aErrorDeg < bestAErrorDeg) {
                bestAErrorDeg = aErrorDeg;
                $('span[class~="bestAErrorDeg:hw-fv-c"]').text(bestAErrorDeg);
                $('span[class~="bestAErrorDegContainer:hw-fv-c"]').css('background', 'rgb(255, 50, 50)');
                window.setTimeout(function() {
                    $('span[class~="bestAErrorDegContainer:hw-fv-c"]').css('background', 'rgb(255, 255, 255)');
                }, 600);
            }
            $('*[class~="best:hw-fv-c"]').css('visibility', 'visible');
        }
    });

    $('button[class~="tryAgain:hw-fv-c"]').click(function() {
        path = genPath();
        hw_fv_c.reset();
        hw_fv_c.clearOptionValue("runTime");
        hw_fv_c.clearOptionValue("timeToGo");
        disableStep(3);
        disableStep(4);
        enableStep(1);
    });

}); // end of document.ready()
