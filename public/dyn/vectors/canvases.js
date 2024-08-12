$(document).ready(function(){
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

        rvp_fp_c = new PrairieDraw("rvp-fp-c", function() {
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
    
        rvv_fu_c = new PrairieDraw("rvv-fu-c", function() {
	this.setUnits(8, 4);

        var O = $V([0, 0]);

        var a = $V([0.6, -1]);
        var b = $V([1.5, 1.5]);
        var c = $V([-0.5, 0.4]);

        var aHat = a.toUnitVector();
        var bHat = b.toUnitVector();
        var cHat = c.toUnitVector();

        this.save();
        this.translate($V([-3, 0]));
        this.arrow(O, a, "red");
        this.arrow(O, b, "blue");
        this.arrow(O, c, "darkgreen");
        this.labelLine(O, a, $V([1, -1]), "TEX:$\\vec{a}$");
        this.labelLine(O, b, $V([1, -1]), "TEX:$\\vec{b}$");
        this.labelLine(O, c, $V([1, 1]), "TEX:$\\vec{c}$");
        this.restore();

        this.save();
        this.translate($V([-0.2, -0.7]));
        var d = 0.4;
        this.line(O, $V([0, a.modulus()]), "red");
        this.text($V([0, -0.4]), $V([0, -1]), "TEX:$a$");
        this.translate($V([d, 0]));
        this.line(O, $V([0, b.modulus()]), "blue");
        this.text($V([0, -0.4]), $V([0, -1]), "TEX:$b$");
        this.translate($V([d, 0]));
        this.line(O, $V([0, c.modulus()]), "darkgreen");
        this.text($V([0, -0.4]), $V([0, -1]), "TEX:$c$");
        this.restore();

        this.save();
        this.translate($V([2.5, 0]));
        this.arrow(O, aHat, "red");
        this.arrow(O, bHat, "blue");
        this.arrow(O, cHat, "darkgreen");
        this.labelLine(O, aHat, $V([1, -1]), "TEX:$\\hat{a}$");
        this.labelLine(O, bHat, $V([1, -1]), "TEX:$\\hat{b}$");
        this.labelLine(O, cHat, $V([1, -1]), "TEX:$\\hat{c}$");
        this.restore();

        this.text($V([0.3, -2]), $V([0, -1]), "TEX:vectors\\qquad$=$\\qquad lengths\\qquad$\\times$\\qquad directions");

    });

    rvv_fu_c = new PrairieDraw("rvv-fu-c", function() {
        this.setUnits(8, 4);
    
        var O = $V([0, 0]);

        var a = $V([0.6, -1]);
        var b = $V([1.5, 1.5]);
        var c = $V([-0.5, 0.4]);

        var aHat = a.toUnitVector();
        var bHat = b.toUnitVector();
        var cHat = c.toUnitVector();

        this.save();
        this.translate($V([-3, 0]));
        this.arrow(O, a, "red");
        this.arrow(O, b, "blue");
        this.arrow(O, c, "darkgreen");
        this.labelLine(O, a, $V([1, -1]), "TEX:$\\vec{a}$");
        this.labelLine(O, b, $V([1, -1]), "TEX:$\\vec{b}$");
        this.labelLine(O, c, $V([1, 1]), "TEX:$\\vec{c}$");
        this.restore();

        this.save();
        this.translate($V([-0.2, -0.7]));
        var d = 0.4;
        this.line(O, $V([0, a.modulus()]), "red");
        this.text($V([0, -0.4]), $V([0, -1]), "TEX:$a$");
        this.translate($V([d, 0]));
        this.line(O, $V([0, b.modulus()]), "blue");
        this.text($V([0, -0.4]), $V([0, -1]), "TEX:$b$");
        this.translate($V([d, 0]));
        this.line(O, $V([0, c.modulus()]), "darkgreen");
        this.text($V([0, -0.4]), $V([0, -1]), "TEX:$c$");
        this.restore();

        this.save();
        this.translate($V([2.5, 0]));
        this.arrow(O, aHat, "red");
        this.arrow(O, bHat, "blue");
        this.arrow(O, cHat, "darkgreen");
        this.labelLine(O, aHat, $V([1, -1]), "TEX:$\\hat{a}$");
        this.labelLine(O, bHat, $V([1, -1]), "TEX:$\\hat{b}$");
        this.labelLine(O, cHat, $V([1, -1]), "TEX:$\\hat{c}$");
        this.restore();

        this.text($V([0.3, -2]), $V([0, -1]), "TEX:vectors\\qquad$=$\\qquad lengths\\qquad$\\times$\\qquad directions");

    });

    rvv_fb_c = new PrairieDraw("rvv-fb-c", function() {
	    this.setUnits(6, 4);

        var O = $V([0, 0]);
        var a = $V([3, 2]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.translate($V([-2.3, -1.3]));

        this.arrow(O, ei);
        this.arrow(O, ej);
        this.labelLine(O, ei, $V([1, -1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, ej, $V([1, 1]), "TEX:$\\hat\\jmath$");

        this.translate($V([1.3, 0.5]));

        this.arrow(O, a, "red");
        this.labelLine(O, a, $V([0, -1]), "TEX:$\\vec{a}$");

        this.arrow(O, ei.x(a.e(1)));
        this.labelLine(O, ei.x(a.e(1)), $V([0, -1]), "TEX:$3\\hat\\imath$");

        this.arrow(ei.x(a.e(1)), a);
        this.labelLine(ei.x(a.e(1)), a, $V([0, -1]), "TEX:$2\\hat\\jmath$");

    });

    rvv_fb_c = new PrairieDraw("rvv-fb-c", function() {
        this.setUnits(6, 4);
    
        var O = $V([0, 0]);
        var a = $V([3, 2]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.translate($V([-2.3, -1.3]));

        this.arrow(O, ei);
        this.arrow(O, ej);
        this.labelLine(O, ei, $V([1, -1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, ej, $V([1, 1]), "TEX:$\\hat\\jmath$");

        this.translate($V([1.3, 0.5]));

        this.arrow(O, a, "red");
        this.labelLine(O, a, $V([0, -1]), "TEX:$\\vec{a}$");

        this.arrow(O, ei.x(a.e(1)));
        this.labelLine(O, ei.x(a.e(1)), $V([0, -1]), "TEX:$3\\hat\\imath$");

        this.arrow(ei.x(a.e(1)), a);
        this.labelLine(ei.x(a.e(1)), a, $V([0, -1]), "TEX:$2\\hat\\jmath$");

    });
    
    rvv_f3_c = new PrairieDraw("rvv-f3-c", function() {
        this.setUnits(6, 3);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.save();
        this.translate($V([-2, -0.5]));
        this.arrow(O, ei);
        this.arrow(O, ej);
        this.arrowOutOfPage(O);
        this.labelLine(O, ei, $V([1, -1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, ej, $V([1, 1]), "TEX:$\\hat\\jmath$");
        this.text(O, $V([1.4, 1.2]), "TEX:$\\hat{k}$");
        this.restore();

        this.save();
        this.translate($V([1, -0.5]));
        this.arrow(O, ei);
        this.arrow(O, ej);
        this.arrowIntoPage(O);
        this.labelLine(O, ei, $V([1, -1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, ej, $V([1, 1]), "TEX:$\\hat{k}$");
        this.text(O, $V([1.4, 1.4]), "TEX:$\\hat\\jmath$");
        this.restore();
    });

    rvv_fy_c = new PrairieDrawAnim("rvv-fy-c", function(t) {
        this.setUnits(6.1, 6.1);
    
        var a = 4;
        var b = 2;
        var d = (a + b) / 2;

        var states = [{"theta": 0},
                        {"theta": Math.PI / 2},
                        {"theta": 0}];
        var transTimes = [2, 2, 0];
        var holdTimes = [0, 1, 1];
        var interps = {};
        var names = ["c", "ab", "c2"];
        var state = this.newSequence(name, states, transTimes, holdTimes, interps, names, t);
        var theta = state.theta;

        var p1 = $V([0, 0]);
        var p2 = $V([0, b]);
        var p3 = $V([-a, 0]);
        var drawTri = function(m) {
            var tp1 = this.transformPos(m, p1);
            var tp2 = this.transformPos(m, p2);
            var tp3 = this.transformPos(m, p3);
            this.polyLine([tp1, tp2, tp3], true);
            this.labelLine(tp1, tp2, $V([0, 1]), "TEX:$b$");
            this.labelLine(tp2, tp3, $V([0, 1]), "TEX:$c$");
            this.labelLine(tp3, tp1, $V([0, 1]), "TEX:$a$");
        }.bind(this);

        this.save();
        this.setProp("shapeInsideColor", "rgb(200, 200, 200)");
        this.rectangle(2 * d, 2 * d);
        this.restore();

        var m;

        m = this.identityTransform();
        m = this.translateTransform(m, $V([d, -d]));
        m = this.translateTransform(m, $V([-a, 0]));
        m = this.rotateTransform(m, theta);
        m = this.translateTransform(m, $V([a, 0]));
        drawTri(m);

        this.save();
        m = this.identityTransform();
        m = this.translateTransform(m, $V([d, d]));
        m = this.translateTransform(m, $V([-b, 0]));
        m = this.rotateTransform(m, -theta);
        m = this.translateTransform(m, $V([b, 0]));
        m = this.rotateTransform(m, Math.PI / 2);
        drawTri(m);

        m = this.identityTransform();
        m = this.translateTransform(m, $V([-d, d]));
        m = this.rotateTransform(m, Math.PI);
        drawTri(m);

        m = this.identityTransform();
        m = this.translateTransform(m, $V([-d, -d]));
        m = this.rotateTransform(m, -Math.PI / 2);
        drawTri(m);

        if (!state.inTransition && (state.index === 0 || state.index === 2)) {
            this.text($V([0, 0]), $V([0, 0]), "TEX:$c^2$", true);
        }
        if (!state.inTransition && state.index === 1) {
            this.line($V([b / 2, b / 2]), $V([d, b / 2]));
            this.text($V([a / 2, a / 2]), $V([0, 0]), "TEX:$b^2$", true);
            this.text($V([b / 2, -b / 2]), $V([0, 0]), "TEX:$a^2$", true);
        }
    });

    rvv_fr_c = new PrairieDrawAnim("rvv-fr-c", function(t) {
        this.setUnits(2.4, 2.4);
    
        var O = $V([0, 0, 0]);
        var ei = $V([1, 0, 0]);
        var ej = $V([0, 1, 0]);
        var ek = $V([0, 0, 1]);

        var a = $V([0.7, 0.8, 0.9]);
        var ax = $V([a.e(1), 0, 0]);
        var axy = $V([a.e(1), a.e(2), 0]);

        this.arrow(O, ei);
        this.arrow(O, ej);
        this.arrow(O, ek);
        this.labelLine(O, ei, $V([1, -1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, ej, $V([1, -1]), "TEX:$\\hat\\jmath$");
        this.labelLine(O, ek, $V([1, 1]), "TEX:$\\hat{k}$");

        this.line(O, ax);
        this.labelLine(O, ax, $V([0, -1]), "TEX:$a_1$");

        this.rightAngle(ax, ej, ei.x(-1));
        this.line(ax, axy);
        this.labelLine(ax, axy, $V([0, -1]), "TEX:$a_2$");

        this.line(O, axy);
        this.labelLine(O, axy, $V([0.2, 1]), "TEX:$\\ell$");

        this.rightAngle(axy, axy.x(-1), ek);
        this.line(axy, a);
        this.labelLine(axy, a, $V([0, -1]), "TEX:$a_3$");

        this.arrow(O, a, "position");
        this.labelLine(O, a, $V([-0.2, 1]), "TEX:$a$");
    });

    rvv_fr_c.activate3DControl();

    rvv_fl_c = new PrairieDraw("rvv-fl-c", function() {
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var a = $V([4, 3]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.translate($V([-2, -1.5]));

        this.arrow(O, a, "red");
        this.labelLine(O, a, $V([0, 1.4]), "TEX:$a = \\sqrt{4^2 + 3^2} = 5$");

        this.arrow(O, ei.x(a.e(1)));
        this.labelLine(O, ei.x(a.e(1)), $V([0, -1]), "TEX:$4\\hat\\imath$");

        this.arrow(ei.x(a.e(1)), a);
        this.labelLine(ei.x(a.e(1)), a, $V([0, -1]), "TEX:$3\\hat\\jmath$");
    });
    
    rvv_ft_c = new PrairieDraw("rvv-ft-c", function() {
        this.setUnits(1.4, 1.4);
    
        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.translate($V([-0.5, -0.5]));

        this.arrow(O, ei.x(1.1));
        this.arrow(O, ej.x(1.1));

        this.save();
        this.setProp("shapeStrokeWidthPx", 1);
        var d = 0.03;

        this.line($V([0, -d]), $V([0, 0]));
        this.text($V([0, -d]), $V([0, 1]), "TEX:$0$");

        this.line($V([1, -d]), $V([1, 0]));
        this.text($V([1, -d]), $V([0, 1]), "TEX:$2000$");

        this.line($V([-d, 0]), $V([0, 0]));
        this.text($V([-d, 0]), $V([1, 0]), "TEX:$0$");

        this.line($V([-d, 1]), $V([0, 1]));
        //this.text($V([-d, 1]), $V([1, 0]), "TEX:$2000$");

        this.labelLine(O, ei, $V([0, -2]), "TEX:$a$");
        this.labelLine(O, ej, $V([0, 2]), "TEX:$b$");

        this.restore();

        this.save();
        this.setProp("pointRadiusPx", 0.5);
        this.scale($V([0.0005, 0.0005]));
        var i, p;
        for (i = 0; i < py_triples.length; i++) {
            p = py_triples[i];
            this.point(p);
            this.point($V([p.e(2), p.e(1)]));
        }
        this.restore();

    });

    rvv_xn_c = new PrairieDraw("rvv-xn-c", function() {
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var a = $V([3, 2]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var eu = $V([1, 1]).toUnitVector();
        var ev = $V([-1, 1]).toUnitVector();

        var ai = a.dot(ei);
        var aj = a.dot(ej);
        var au = a.dot(eu);
        var av = a.dot(ev);

        this.save();
        this.translate($V([-0.7, -1.5]));
        this.arrow(O, a, "red");
        this.labelLine(O, a, $V([0, -1]), "TEX:$\\vec{a}$");
        this.arrow(O, ei.x(ai));
        this.arrow(ei.x(ai), a);
        this.labelLine(O, ei.x(ai), $V([0, -1]), "TEX:$3 \\hat\\imath$");
        this.labelLine(ei.x(ai), a, $V([0, -1]), "TEX:$2 \\hat\\jmath$");
        this.arrow(O, eu.x(au), "blue");
        this.arrow(eu.x(au), a, "blue");
        this.labelLine(O, eu.x(au), $V([0, 1.2]), "TEX:?$\\hat{u}$");
        this.labelLine(eu.x(au), a, $V([0, 1]), "TEX:?$\\hat{v}$");
        this.restore();

        this.save();
        this.translate($V([-1.8, 0.5]));
        this.arrow(O, ei);
        this.arrow(O, ej);
        this.labelLine(O, ei, $V([1, -1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, ej, $V([1, 1]), "TEX:$\\hat\\jmath$");
        this.arrow(O, eu, "blue");
        this.arrow(O, ev, "blue");
        this.labelLine(O, eu, $V([1, -1]), "TEX:$\\hat{u}$");
        this.labelLine(O, ev, $V([1, 1]), "TEX:$\\hat{v}$");
        this.text(O, $V([-2, -1]), "TEX:$45^\\circ$");
        this.restore();
    });

    rvv_e2_c = new PrairieDraw("rvv-e2-c", function() {
        this.setUnits(4, 1.7);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var eu = this.vector2DAtAngle(Math.PI / 3);
        var ev = this.vector2DAtAngle(Math.PI * 5 / 6);

        this.translate($V([0, -0.5]));
        this.arrow(O, ei);
        this.arrow(O, ej);
        this.labelLine(O, ei, $V([1, -1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, ej, $V([1, 1]), "TEX:$\\hat\\jmath$");
        this.arrow(O, eu, "blue");
        this.arrow(O, ev, "blue");
        this.labelLine(O, eu, $V([1, -1]), "TEX:$\\hat{u}$");
        this.labelLine(O, ev, $V([1, 1]), "TEX:$\\hat{v}$");
        this.text(O, $V([-2, -1]), "TEX:$\\theta$");
    });

    rvv_xa_c = new PrairieDraw("rvv-xa-c", function() {
        this.setUnits(10, 6);

        this.addOption("showBasis", "none");

        var O = $V([0, 0]);
        var a = $V([3, 2]);
        var b = $V([3, -1]);
        var c = a.add(b);

        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var eu = $V([1, 1]).toUnitVector();
        var ev = $V([-1, 1]).toUnitVector();

        var ai = ei.x(a.dot(ei));
        var aj = ej.x(a.dot(ej));
        var au = eu.x(a.dot(eu));
        var av = ev.x(a.dot(ev));

        var bi = ei.x(b.dot(ei));
        var bj = ej.x(b.dot(ej));
        var bu = eu.x(b.dot(eu));
        var bv = ev.x(b.dot(ev));

        var ci = ei.x(c.dot(ei));
        var cj = ej.x(c.dot(ej));
        var cu = eu.x(c.dot(eu));
        var cv = ev.x(c.dot(ev));

        // console.log(au, av, bu, bv, cu, cv);
        // 3.5355339059327373 -0.7071067811865475 1.414213562373095 -2.82842712474619 4.949747468305832 -3.5355339059327373

        this.save();
        this.translate($V([-2, -0.3]));
        this.arrow(O, a, "red");
        this.labelLine(O, a, $V([0, -1]), "TEX:$\\vec{a}$");
        if (this.getOption("showBasis") === "ij" || this.getOption("showBasis") === "mixed") {
            this.arrow(O, aj);
            this.arrow(aj, a);
            this.labelLine(O, aj, $V([0, 1]), "TEX:$2 \\hat\\jmath$");
            this.labelLine(aj, a, $V([0, 1]), "TEX:$3 \\hat\\imath$");
        }
        if (this.getOption("showBasis") === "uv") {
            this.arrow(O, au);
            this.arrow(au, a);
            this.labelLine(O, au, $V([0, 1.2]), "TEX:$3.5 \\hat{u}$");
            this.labelLine(au, a, $V([-1, 1]), "TEX:$-0.7 \\hat{v}$");
        }

        this.arrow(O, c, "darkgreen");
        this.labelLine(O, c, $V([0, -1]), "TEX:$\\vec{c}$");
        if (this.getOption("showBasis") === "ij") {
            this.arrow(O, ci);
            this.arrow(ci, c);
            this.labelLine(O, ci, $V([0, -1]), "TEX:$6 \\hat\\imath$");
            this.labelLine(ci, c, $V([0, -1]), "TEX:$\\hat\\jmath$");
        }
        if (this.getOption("showBasis") === "uv") {
            this.arrow(O, cv);
            this.arrow(cv, c);
            this.labelLine(O, cv, $V([0, -1.2]), "TEX:$-3.5 \\hat{v}$");
            this.labelLine(cv, c, $V([0, -1.2]), "TEX:$4.9 \\hat{u}$");
        }
        if (this.getOption("showBasis") === "mixed") {
            this.arrow(O, ai);
            this.arrow(ai, ai.add(bv));
            this.arrow(ai.add(bv), ai.add(bv).add(aj));
            this.arrow(ai.add(bv).add(aj), c);
            this.labelLine(O, ai, $V([0, -1.2]), "TEX:$3 \\hat\\imath$");
            this.labelLine(ai, ai.add(bv), $V([0, -1.2]), "TEX:$-2.8 \\hat{v}$");
            this.labelLine(ai.add(bv), ai.add(bv).add(aj), $V([0, -1.2]), "TEX:$2 \\hat\\jmath$");
            this.labelLine(ai.add(bv).add(aj), c, $V([0, -1.2]), "TEX:$1.4 \\hat{u}$");
        }

        this.translate(a);
        this.arrow(O, b, "blue");
        this.labelLine(O, b, $V([0, -1]), "TEX:$\\vec{b}$");
        if (this.getOption("showBasis") === "ij") {
            this.arrow(O, bi);
            this.arrow(bi, b);
            this.labelLine(O, bi, $V([0, 1]), "TEX:$3 \\hat\\imath$");
            this.labelLine(bi, b, $V([0, 1]), "TEX:$- \\hat\\jmath$");
        }
        if (this.getOption("showBasis") === "uv" || this.getOption("showBasis") === "mixed") {
            this.arrow(O, bu);
            this.arrow(bu, b);
            this.labelLine(O, bu, $V([0.5, 1.5]), "TEX:$1.4 \\hat{u}$");
            this.labelLine(bu, b, $V([0, 1.2]), "TEX:$-2.8 \\hat{v}$");
        }
        this.restore();

        this.save();
        this.translate($V([-3.5, -2]));
        this.arrow(O, ei);
        this.arrow(O, ej);
        this.labelLine(O, ei, $V([1, -1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, ej, $V([1, 1]), "TEX:$\\hat\\jmath$");
        this.arrow(O, eu);
        this.arrow(O, ev);
        this.labelLine(O, eu, $V([1, -1]), "TEX:$\\hat{u}$");
        this.labelLine(O, ev, $V([1, 1]), "TEX:$\\hat{v}$");
        this.text(O, $V([-2, -1]), "TEX:$45^\\circ$");
        this.restore();
    });
})