
$(document).ready(function() {

    var rvp_fc_c = new PrairieDraw("rvp-fc-c", function() {
        this.setUnits(8, 8);

        var d = 3;
        var e = 0.6;

        var i;
        for (i = -d; i <= d; i++) {
            this.line($V([-d, i]), $V([d, i]), "grid");
            this.line($V([i, -d]), $V([i, d]), "grid");
        }

        this.arrow($V([-d - e, 0]), $V([d + e, 0]));
        this.arrow($V([0, -d - e]), $V([0, d + e]));
        this.labelLine($V([-d - e, 0]), $V([d + e, 0]), $V([1, -1]), "TEX:$x$");
        this.labelLine($V([0, -d - e]), $V([0, d + e]), $V([1, 1]), "TEX:$y$");

        this.text($V([0, 0]), $V([1, 1]), "TEX:$O$")

        this.save();
        this.setProp("shapeOutlineColor", "green");
        this.setProp("pointRadiusPx", 4);
        this.line($V([0, 0]), $V([2, 0]));
        this.line($V([2, 0]), $V([2, 1]));
        this.point($V([2, 1]));
        this.text($V([2, 1]), $V([-1.2, 0]), "TEX:\\noindent $x = 2$ \\\\ $y = 1$");
        this.restore();

        this.save();
        this.setProp("shapeOutlineColor", "blue");
        this.setProp("pointRadiusPx", 4);
        this.line($V([0, 0]), $V([-3, 0]));
        this.line($V([-3, 0]), $V([-3, 2]));
        this.point($V([-3, 2]));
        this.text($V([-3, 2]), $V([-1.2, 0]), "TEX:\\noindent $x = -3$ \\\\ $y = 2$");
        this.restore();

        this.save();
        this.setProp("shapeOutlineColor", "red");
        this.setProp("pointRadiusPx", 4);
        this.line($V([0, 0]), $V([0, -2]));
        this.point($V([0, -2]));
        this.text($V([0, -2]), $V([-1.2, 0]), "TEX:\\noindent $x = 0$ \\\\ $y = -2$");
        this.restore();
    });

    var rvp_fp_c = new PrairieDraw("rvp-fp-c", function() {
        this.setUnits(8, 8);

        var d = 3;
        var e = 0.6;
        var O = $V([0, 0]);
        var P;

        var i;
        this.save();
        this.setProp("shapeOutlineColor", this.getProp("gridColor"));
        for (i = 1; i <= d; i++) {
            this.arc(O, i);
        }
        var n = 12;
        for (i = 0; i < n; i++) {
            this.line(O, this.vector2DAtAngle(i / n * 2 * Math.PI).x(d));
        }
        this.restore();

        this.arrow(O, $V([3.7, 0]));
        this.labelLine(O, $V([3.5, 0]), $V([1, -1.4]), "TEX:$r$");
        this.circleArrow(O, 3.2, 0, 1.2, undefined, true, 0.1);
        this.labelCircleLine(O, 3.2, 0, 1.2, $V([0.7, 1.3]), "TEX:$\\theta$");

        this.text(O, $V([1, 1]), "TEX:$O$")

        this.save();
        this.setProp("shapeOutlineColor", "green");
        this.setProp("pointRadiusPx", 4);
        P = this.vector2DAtAngle(Math.PI / 6).x(2);
        this.arc(O, 1.6, 0, Math.PI / 6);
        this.line(O, P);
        this.point(P);
        this.text(P, $V([0, -1.2]), "TEX:\\noindent $r = 2$ \\\\ $\\theta = \\frac{\\pi}{6}$");
        this.restore();

        this.save();
        this.setProp("shapeOutlineColor", "blue");
        this.setProp("pointRadiusPx", 4);
        P = this.vector2DAtAngle(Math.PI).x(3);
        this.arc(O, 1.2, 0, Math.PI);
        this.line(O, P);
        this.point(P);
        this.text(P, $V([0, -1.2]), "TEX:\\noindent $r = 3$ \\\\ $\\theta = \\pi$");
        this.restore();

        this.save();
        this.setProp("shapeOutlineColor", "red");
        this.setProp("pointRadiusPx", 4);
        P = this.vector2DAtAngle(-Math.PI / 4).x(2);
        this.arc(O, 1.4, -Math.PI / 4, 0);
        this.line(O, P);
        this.point(P);
        this.text(P, $V([0, 1.2]), "TEX:\\noindent $r = 2$ \\\\ $\\theta = -\\frac{\\pi}{4}$");
        this.restore();
    });

    var rvp_fm_c = new PrairieDrawAnim("rvp-fm-c", function(t) {
        this.setUnits(8, 8);

        this.addOption("movementType", "point");

        var O1, O2, P;

        if (this.getOption("movementType") === "point") {
            O1 = $V([-3, 2]);
            O2 = $V([2, -3]);
            P = $V([2.8 * Math.cos(t + Math.PI / 2), 1.8 * Math.sin(2 * t + Math.PI)]);
        } else {
            // "coordinates"
            O1 = $V([-1 - 2 * Math.cos(t), 2 + 0.5 * Math.sin(t)]);
            O2 = $V([2 + 2 * (Math.cos(t - Math.PI / 4) - Math.cos(Math.PI / 4)), -2 + Math.sin(2 * t - Math.PI / 2)]);
            P = $V([0, 0]);
        }

        var x = P.e(1) - O1.e(1);
        var y = P.e(2) - O1.e(2);
        var pc = this.rectToPolar(P.subtract(O2));
        var r = pc.e(1);
        var theta = pc.e(2);

        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.arrow(O1, O1.add(ei));
        this.arrow(O1, O1.add(ej));
        this.labelLine(O1, O1.add(ei), $V([1, -1]), "TEX:$x$");
        this.labelLine(O1, O1.add(ej), $V([1, 1]), "TEX:$y$");
        this.text(O1, $V([0.5, 1]), "TEX:$O_1$");

        this.arrow(O2, O2.add(ei));
        this.arrow(O2, O2.add(ej));
        this.text(O2, $V([0.5, 1]), "TEX:$O_2$");

        this.save();
        this.setProp("shapeOutlineColor", "green");
        var Px = O1.add($V([x, 0]));
        this.line(O1, Px);
        this.line(Px, P);
        this._ctx.font = "14px sans-serif";
        this.labelLine(O1, Px, $V([0, 1]), "x = " + x.toFixed(1), $V([0, -1]));
        this.labelLine(Px, P, $V([0, 1]), "y = " + y.toFixed(1), $V([-1.8, 0]));
        this.restore();

        this.save();
        this.setProp("shapeOutlineColor", "blue");
        this.line(O2, P);
        this.arc(O2, 0.6, 0, theta);
        this._ctx.font = "14px sans-serif";
        this.labelLine(O2, P, $V([0, 1]), "r = " + r.toFixed(1));
        this.labelCircleLine(O2, 0.6, 0, theta, $V([0, 1]), "θ = " + theta.toFixed(1));
        this.restore();

        this.save();
        this.setProp("shapeOutlineColor", "red");
        this.setProp("pointRadiusPx", 4);
        this.point(P);
        this.text(P, $V([1.2, 1.2]), "TEX:$P$");
        this.restore();
    });

}); // end of document.ready()
