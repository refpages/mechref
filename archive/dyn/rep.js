
$(document).ready(function() {

    var showHideTrans = function(jButton) {
        if (jButton.hasClass("active")) {
            jButton.removeClass("active");
            jButton.text("Show English translation");
            $(".trans").hide(1000);
            $(".transBlock").slideUp(1000);
        } else {
            jButton.addClass("active");
            jButton.text("Hide English translation");
            $(".trans").show(1000);
            $(".transBlock").slideDown(1000);
        }
    }

    $(".trans").hide(0); // the zero is necessary to make the later t=1000 show() work properly?
    $(".transBlock").hide();

    $("button.showHideTrans").click(function() {showHideTrans($(this));});

    var rep_ff_c = new PrairieDrawAnim("rep-ff-c", function(t) {

        var xViewMax = 3;
        var yViewMax = 2;
        var xWorldMax = xViewMax * 1.1;
        var yWorldMax = yViewMax * 1.1;

        this.setUnits(2 * xViewMax, 2 * yViewMax);

        this.addOption("r", $V([0, 0]));
        this.addOption("v", $V([1, 0]));

        this.addOption("showLabels", true);
        this.addOption("showPath", true);

        var label = this.getOption("showLabels") ? true : undefined;

        var r = this.getOption("r");
        var v = this.getOption("v");
        var f = $V([0, 0]);
        if (this.mouseDown()) {
            var rMod = this.vectorIntervalMod(r, $V([-xWorldMax, -yWorldMax]), $V([xWorldMax, yWorldMax]));
            var fr = this.mousePositionDw().subtract(rMod);
            // f = fr.x(1 / Math.pow(fr.modulus(), 2));
            // f = fr;
            f = fr.toUnitVector();
        }

        var dt = this.deltaTime();
        if (dt > 0 && dt < 0.1) {
            r = r.add(v.x(dt / 2));
            v = v.add(f.x(dt / 2));
            this.setOption("r", r, false);
            this.setOption("v", v, false);
        }

        var maxHistoryTime = 3;
        if (this.getOption("showPath")) {
            var rHistory = this.history("r", 0.05, maxHistoryTime, t, r);
        } else {
            this.clearHistory("r");
        }

        var xMin = r.e(1), xMax = r.e(1);
        var yMin = r.e(2), yMax = r.e(2);
        xMin = Math.min(xMin, r.e(1) + v.e(1));
        xMax = Math.max(xMax, r.e(1) + v.e(1));
        yMin = Math.min(yMin, r.e(2) + v.e(2));
        yMax = Math.max(yMax, r.e(2) + v.e(2));
        for (var i = 0; i < rHistory.length; i++) {
            xMin = Math.min(xMin, rHistory[i][1].e(1));
            xMax = Math.max(xMax, rHistory[i][1].e(1));
            yMin = Math.min(yMin, rHistory[i][1].e(2));
            yMax = Math.max(yMax, rHistory[i][1].e(2));
        }
        var nXMin = this.intervalDiv(xMin, -xWorldMax, xWorldMax);
        var nXMax = this.intervalDiv(xMax, -xWorldMax, xWorldMax);
        var nYMin = this.intervalDiv(yMin, -yWorldMax, yWorldMax);
        var nYMax = this.intervalDiv(yMax, -yWorldMax, yWorldMax);

        for (var nX = nXMin; nX <= nXMax; nX++) {
            for (var nY = nYMin; nY <= nYMax; nY++) {
                this.save();
                this.translate($V([-nX * 2 * xWorldMax, -nY * 2 * yWorldMax]));
                if (this.getOption("showPath")) {
                    this.fadeHistoryLine(rHistory, t, maxHistoryTime, [0, 0, 255], [255, 255, 255]);
                }
                this.save();
                this.setProp("pointRadiusPx", 4);
                this.point(r);
                this.restore();
                this.arrow(r, r.add(v), "velocity");
                if (v.modulus() > 1e-2) {
                    this.labelLine(r, r.add(v), $V([1, 0]), label && "TEX:$\\vec{v}$");
                }
                this.arrow(r, r.add(f), "force");
                if (f.modulus() > 1e-2) {
                    this.labelLine(r, r.add(f), $V([1, 0]), label && "TEX:$\\vec{F}$");
                }
                this.restore();
            }
        }
    });

    rep_ff_c.activateMouseTracking();
    rep_ff_c.activateAnimOnClick();

    var rep_xl_c = new PrairieDraw("rep-xl-c", function() {

        this.setUnits(6, 4);

        this.addOption("showBases", false);

        var len = 2;
        var theta = Math.PI / 4;
        var O = $V([0, 0]);
        var rP = $V([0, -len]).rotate(theta, O);

        this.translate($V([0, 0.5]));

        this.ground($V([0, 0.5]), $V([0, -1]), 2);
        this.pivot($V([0, 0.5]), O, 0.4);
        this.rod(O, rP, 0.2);
        this.arc(rP, 0.15, undefined, undefined, true);
        this.point(O);
        this.point(rP);
        this.text(rP.add($V([0, -0.15])), $V([0, 1]), "TEX:$m$");
        this.save();
        this.setProp("shapeStrokePattern", "dashed");
        this.line(O.add($V([0, -0.5])), O.add($V([0, -len])));
        this.restore();
        this.circleArrow(O, len * 0.6, -Math.PI / 2, -theta - 0.1, "angle", true);
        this.labelCircleLine(O, len * 0.6, -Math.PI / 2, -theta - 0.1, $V([0, 1]), "TEX:$\\theta$", true);
        this.arrow($V([-2, -0.4]), $V([-2, -1.4]), "acceleration");
        this.labelLine($V([-2, -0.4]), $V([-2, -1.4]), $V([0, 1]), "TEX:$g$");

        if (this.getOption("showBases")) {
            var ei = $V([1, 0]);
            var ej = $V([0, 1]);
            var eR = $V([0, -1]).rotate(theta, O);
            var eTheta = $V([1, 0]).rotate(theta, O);

            this.arrow(O, O.add(ei));
            this.arrow(O, O.add(ej));
            this.labelLine(O, O.add(ei), $V([1, 0]), "TEX:$\\hat\\imath$");
            this.labelLine(O, O.add(ej), $V([1, 0]), "TEX:$\\hat\\jmath$");

            this.arrow(rP, rP.add(eR));
            this.arrow(rP, rP.add(eTheta));
            this.labelLine(rP, rP.add(eR), $V([1, 0]), "TEX:$\\hat{e}_r$");
            this.labelLine(rP, rP.add(eTheta), $V([1, 0]), "TEX:$\\hat{e}_\\theta$");
        }
    });

    var rep_xl_f = new PrairieDraw("rep-xl-f", function() {

        this.setUnits(6, 4);

        var theta = Math.PI / 4;
        var O = $V([0, 0]);
        var eR = $V([0, -1]).rotate(theta, O);

        this.arc(O, 0.15, undefined, undefined, true);
        this.point(O);
        this.text(O.add($V([0.15, 0])), $V([-1, 0]), "TEX:$m$");
        this.arrow(O, O.add($V([0, -1.5])), "force");
        this.labelLine(O, O.add($V([0, -1.5])), $V([1, 0]), "TEX:$mg$");
        this.arrow(O, O.add($V([0, 1.5]).rotate(theta, O)), "force");
        this.labelLine(O, O.add($V([0, 1.5]).rotate(theta, O)), $V([1, 0]), "TEX:$T$");
    });

}); // end of document.ready()
