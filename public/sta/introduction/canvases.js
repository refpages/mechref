$(document).ready(function() {

    /********************************************************************************/

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

    rvv_fc_c = new PrairieDrawAnim("rvv-fc-c", function(t) {
        this.setUnits(8, 4);
    
            this.addOption("otherLength", false);
            this.addOption("otherDir", false);
    
            var O1 = $V([1.96 * Math.sin(1.6 * t - 0.7), 0.97 * Math.cos(0.9 * t + 1)]);
            var O2 = $V([2.4 * Math.sin(t + 1), 0.94 * Math.cos(0.6 * t + 2)]);
            var V1 = $V([1.5, 0.7]);
            var V2 = $V([1.5, 0.7]);
    
            var sameVecs = true;
    
            if (this.getOption("otherDir")) {
                sameVecs = false;
                V1 = V1.rotate(-Math.PI/6, $V([0, 0]));
                V2 = V2.rotate(Math.PI/6, $V([0, 0]));
            }
            if (this.getOption("otherLength")) {
                sameVecs = false;
                V1 = V1.x(1.4);
                V2 = V2.x(0.8);
            }
            this.translate($V([-0.9, -0.3]));
            this.arrow(O1, O1.add(V1), "position");
            this.labelLine(O1, O1.add(V1), $V([0, 1]), "TEX:$\\vec{a}$");
            this.arrow(O2, O2.add(V2), "angMom");
            this.labelLine(O2, O2.add(V2), $V([0, -1]), "TEX:$\\vec{b}$");
            
            var msg;
            if (sameVecs) {
                msg = "TEX:\\sf $\\vec{a}$ is the same as $\\vec{b}$";
            } else {
                msg = "TEX:\\sf $\\vec{a}$ is different to $\\vec{b}$";
            }
            var T = this.posNm2Dw($V([0.5, 0]));
            this.text(T, $V([0, -1]), msg);
        });

    

        $( window ).on( "resize", function() {
            rvv_fc_c.redraw();
            rep_ff_c.redraw();
        })
}); // end of document.ready()