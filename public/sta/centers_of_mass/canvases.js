$(document).ready(function() {

    var rcm_cm_c = new PrairieDraw("rcm-cm-c", function() {
        this.setUnits(4, 2.2);

        var l = 2;
        var h = 0.7;
        var d = 0.15;

        var p000 = $V([-l/2, -l/2, -h/2]);
        var p001 = $V([-l/2, -l/2,  h/2]);
        var p010 = $V([-l/2,  l/2, -h/2]);
        var p011 = $V([-l/2,  l/2,  h/2]);
        var p100 = $V([ l/2, -l/2, -h/2]);
        var p101 = $V([ l/2, -l/2,  h/2]);
        var p110 = $V([ l/2,  l/2, -h/2]);
        var p111 = $V([ l/2,  l/2,  h/2]);

        var P = $V([l/2, -l/2, h/2]);
        var a0 = P.add($V([0, 0, -0.5]));
        var a1 = P.add($V([0, 0, h + 0.85]));

        var B = $V([-l/2, l/4, h/2 - d]);
        var v000 = B.add($V([0, 0, 0]));
        var v001 = B.add($V([0, 0, d]));
        var v010 = B.add($V([0, d, 0]));
        var v011 = B.add($V([0, d, d]));
        var v100 = B.add($V([d, 0, 0]));
        var v101 = B.add($V([d, 0, d]));
        var v110 = B.add($V([d, d, 0]));
        var v111 = B.add($V([d, d, d]));

        var D = v101;
        var Ba = $V([P.e(1), P.e(2), D.e(3)]);

        this.save();
        this.translate($V([-0.1, -0.05]));

        this.line(p000, p001);
        this.line(p100, p000);
        this.line(p010, p000);

        this.line(v000, v001);
        this.line(v010, v011);
        this.line(v000, v100);
        this.line(v010, v110);
        this.line(v000, v010);
        this.line(v100, v101);
        this.line(v110, v111);
        this.line(v100, v110);

        // this.arrow(a0, a1);
        // this.labelLine(a0, a1, $V([1, -1]), "TEX:$\\hat{k}$");

        this.save();
        var alpha = 0.8;
        this.save();
        this.setProp("shapeInsideColor", "rgba(255, 255, 255, " + alpha + ")");
        this.polyLine([p100, p110, p111, p101], true, true, false);
        this.polyLine([p010, p110, p111, p011], true, true, false);
        this.polyLine([p101, p111, p011, p001], true, true, false);
        this.restore();

        this.line(p100, p101);
        this.line(p110, p111);
        this.line(p010, p011);
        this.line(p100, p110);
        this.line(p101, p111);
        this.line(p110, p010);
        this.line(p111, p011);
        this.line(p101, p001);
        this.line(p011, p001);

        this.line(v001, v101);
        this.line(v011, v111);
        this.line(v001, v011);
        this.line(v101, v111);

        this.save();
        this.setProp("pointRadiusPx", 3);
        this.point(P);
        this.restore();
        this.text(P, $V([1, 0]), "TEX:$O$");
        this.text(v011, $V([0, -1.1]), "TEX:$dV$");

        this.labelLine(p010, p110, $V([0, 1]), "TEX:$\\mathcal{B}$");

        this.save();
        this.setProp("shapeOutlineColor", "rgb(150, 150, 150)");
        this.arrow(Ba, D, "position");
        this.labelLine(Ba, D, $V([0.2, 1]), "TEX:$\\vec{r}$");
        this.restore();

        this.restore();
    });

    var rcm_xc_c = new PrairieDraw("rcm-xc-c", function() {

        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var p1 = ei.x(-2.5);
        var p2 = O;
        var p3 = $V([-2.5, 2.5]);
        
        this.save();
        this.translate($V([0, -1]));
        this.polyLine([p1, p2, p3], true, true);
        this.arrow(ei, ei.add(ei.x(1.5)));
        this.arrow(ei, ei.add(ej.x(1.5)));
        this.text(p1.x(0.5), $V([1, 1.3]), "TEX:$w$");
        this.text($V([p3.e(1), p3.e(2)/2]), $V([1.3, 1]), "TEX:$h$");
        this.labelLine(ei, ei.add(ei.x(1.5)), ei, "TEX:$\\hat{\\imath}$");
        this.labelLine(ei, ei.add(ej.x(1.5)), ei, "TEX:$\\hat{\\jmath}$");
        this.restore();
    });

    var rcm_xc_s1 = new PrairieDraw("rcm-xc-s1", function() {
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var p1 = $V([-1.5, -1.5]);
        var p2 = $V([1.5, -1.5]);
        var p3 = $V([-1.5, 1.5]);
        var C = $V([p1.e(1) + 2/3 * p2.e(1), p2.e(2) + 2/3 * p2.e(1)]);

        this.save();
        this.polyLine([p1, p2, p3], true, false);
        this.setProp("pointRadiusPx", 3);
        this.point(p1);
        this.restore();
        this.point(C);
        this.arrow(p1, C, "position");
        this.text(p1, $V([1, 1]), "TEX:$O$");
        this.labelIntersection(C, [p1.add(C)], "TEX:$C$");
    });

    var rcm_xc_s2 = new PrairieDraw("rcm-xc-s2", function() {
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var p = 1.5;
        var aW = 0.3;
        var aH = 0.3;

        var v1 = $V([-p, -p]);
        var v2 = $V([p, -p]);
        var v3 = $V([-p, p]);

        var a = $V([-p/2, -p/6]);
        var a1 = a.add($V([-aW/2, aH/2]));
        var a2 = a.add($V([aW/2, aH/2]));
        var a3 = a.add($V([aW/2, -aH/2]));
        var a4 = a.add($V([-aW/2, -aH/2]));

        this.polyLine([v1, v2, v3], true, false);
        this.text($V([0, -p]), $V([1, 1]), "TEX:$w$");
        this.text($V([-p, 0]), $V([1, 1]), "TEX:$h$");

        this.save();
        this.setProp("pointRadiusPx", 3);
        this.point(v1);
        this.restore();
        this.text(v1, $V([1, 1]), "TEX:$O$");

        this.polyLine([a1, a2, a3, a4], true, false);
        this.text(a.add($V([0, aH/2 + 0.2])), O, "TEX:$dx$");
        this.text(a.add($V([aW/2 + 0.25, 0])), O, "TEX:$dy$");

        this.arrow(v1, a, "position");
        this.labelLine(v1, a, ej, "TEX:$\\vec{r}$");

        this.labelLine(v2, v3, ej.x(-1.3), "TEX:$y = h - \\frac{h}{w}x$");
    });

    var rcm_cm_cb = new PrairieDraw("rcm-cm-cb", function() {
        this.setUnits(5, 3.4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var P1 = O;
        var P2 = P1.add(ei.x(1));
        var P3 = P2.add(ej.x(1));
        var P4 = P3.add(ei.x(2));
        var P5 = P4.add(ej);
        var P6 = P5.add(ei.x(-2));
        var P7 = P6.add(ej);
        var P8 = P7.add(ei.x(-1));

        var C1 = P1.add(P2).add(P7).add(P8).x(1/4);
        var C2 = P3.add(P4).add(P5).add(P6).x(1/4);
        var C = (C1.add(C2)).x(1/2);

        this.save();
        this.translate(C1.x(-1).add($V([-1, 0.1])));

        this.polyLine([P1, P2, P3, P4, P5, P6, P7, P8], true, true);
        this.save();
        this.setProp("shapeOutlineColor", "rgb(200, 200, 200)");
        this.line(P3, P6);
        this.restore();

        this.point(P1);
        this.point(C1);
        this.point(C2);
        this.centerOfMass(C);
        this.arrow(P1, C1, "position");
        this.arrow(P1, C2, "position");
    
        this.text(P1, $V([1, 1]), "TEX:$O$");
        this.text(C, $V([0, -1.5]), "TEX:$C$");
        this.labelLine(P1, C1, $V([0.3, 1]), "TEX:$\\vec{r}_1$");
        this.labelLine(P1, C2, $V([-0.3, -1]), "TEX:$\\vec{r}_2$");
        this.text(C1, $V([0, -1]), "TEX:$C_1$");
        this.text(C2, $V([-1, 0]), "TEX:$C_2$");
        this.text(C1, $V([3.5, 0]), "TEX:$\\mathcal{B}_1$");
        this.text(C2, $V([0, 3.5]), "TEX:$\\mathcal{B}_2$");
        this.text(P6, $V([-3, -3]), "TEX:$\\mathcal{B}$");

        this.restore();
    });

    var rcm_xl_c = new PrairieDraw("rcm-xl-c", function() {
        this.setUnits(5, 5 / this.goldenRatio);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var P1 = O;
        var P2 = P1.add(ei.x(3));
        var P3 = P2.add(ej);
        var P4 = P3.add(ei.x(-2));
        var P5 = P4.add(ej);
        var P6 = P5.add(ei.x(-1));

        this.save();
        this.translate($V([-2, -1]));
        this.polyLine([P1, P2, P3, P4, P5, P6], true, true);
        this.point(P1);
        this.text(P1, $V([1, 1]), "TEX:$O$");
        this.labelLine(P1, P2, $V([0, -1]), "TEX:$6d$");
        this.labelLine(P2, P3, $V([0, -1]), "TEX:$2d$");
        this.labelLine(P3, P4, $V([0, -1]), "TEX:$4d$");
        this.labelLine(P4, P5, $V([0, -1]), "TEX:$2d$");
        this.labelLine(P5, P6, $V([0, -1]), "TEX:$2d$");
        this.labelLine(P6, P1, $V([0, -1]), "TEX:$4d$");
        this.restore();

        this.save();
        this.translate($V([1.2, 0.3]));
        this.arrow(O, ei);
        this.arrow(O, ej);
        this.labelLine(O, ei, $V([0.7, -1.3]), "TEX:$\\hat{\\imath}$");
        this.labelLine(O, ej, $V([0.7, 1.3]), "TEX:$\\hat{\\jmath}$");
        this.restore();
    });

    var rcm_xl_cd = new PrairieDraw("rcm-xl-cd", function() {
        this.setUnits(5, 5 / this.goldenRatio);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var P = [];
        for (var i = 0; i < 4; i++) {
            P[i] = [];
            for (var j = 0; j < 3; j++) {
                P[i][j] = $V([i, j]);
            }
        }

        var P1 = O;
        var P2 = P1.add(ei.x(3));
        var P3 = P2.add(ej);
        var P4 = P3.add(ei.x(-2));
        var P5 = P4.add(ej);
        var P6 = P5.add(ei.x(-1));

        this.save();
        this.translate($V([-2, -1]));
        this.polyLine([P[0][0], P[3][0], P[3][1], P[1][1], P[1][2], P[0][2]], true, true);
        this.line(P[0][1], P[1][1]);
        this.line(P[1][0], P[1][1]);
        this.line(P[2][0], P[2][1]);
        this.line(P[3][0], P[3][1]);
        this.point(P1);
        this.text(P1, $V([1, 1]), "TEX:$O$");
        this.labelLine(P[0][0], P[1][0], $V([0, -1]), "TEX:$2d$");
        this.labelLine(P[1][0], P[2][0], $V([0, -1]), "TEX:$2d$");
        this.labelLine(P[2][0], P[3][0], $V([0, -1]), "TEX:$2d$");
        this.labelLine(P[3][0], P[3][1], $V([0, -1]), "TEX:$2d$");
        this.labelLine(P[3][1], P[2][1], $V([0, -1]), "TEX:$2d$");
        this.labelLine(P[2][1], P[1][1], $V([0, -1]), "TEX:$2d$");
        this.labelLine(P[1][1], P[1][2], $V([0, -1]), "TEX:$2d$");
        this.labelLine(P[1][2], P[0][2], $V([0, -1]), "TEX:$2d$");
        this.labelLine(P[0][2], P[0][1], $V([0, -1]), "TEX:$2d$");
        this.labelLine(P[0][1], P[0][0], $V([0, -1]), "TEX:$2d$");
        this.point(P[0][1].add($V([0.5, 0.5])));
        this.point(P[0][0].add($V([0.5, 0.5])));
        this.point(P[1][0].add($V([0.5, 0.5])));
        this.point(P[2][0].add($V([0.5, 0.5])));
        this.text(P[0][1].add($V([0.5, 0.5])), $V([-1, 1]), "TEX:$C_1$");
        this.text(P[0][0].add($V([0.5, 0.5])), $V([-1, 1]), "TEX:$C_2$");
        this.text(P[1][0].add($V([0.5, 0.5])), $V([-1, 1]), "TEX:$C_3$");
        this.text(P[2][0].add($V([0.5, 0.5])), $V([-1, 1]), "TEX:$C_4$");
        this.restore();

        this.save();
        this.translate($V([1.2, 0.3]));
        this.arrow(O, ei);
        this.arrow(O, ej);
        this.labelLine(O, ei, $V([0.7, -1.3]), "TEX:$\\hat{\\imath}$");
        this.labelLine(O, ej, $V([0.7, 1.3]), "TEX:$\\hat{\\jmath}$");
        this.restore();
    });

    var rcm_xl_cf = new PrairieDraw("rcm-xl-cf", function() {
        this.setUnits(5, 5 / this.goldenRatio);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var P = [];
        for (var i = 0; i < 4; i++) {
            P[i] = [];
            for (var j = 0; j < 3; j++) {
                P[i][j] = $V([i, j]);
            }
        }

        var P1 = O;
        var P2 = P1.add(ei.x(3));
        var P3 = P2.add(ej);
        var P4 = P3.add(ei.x(-2));
        var P5 = P4.add(ej);
        var P6 = P5.add(ei.x(-1));

        var C1 = P[0][1].add($V([0.5, 0.5]));
        var C2 = P[0][0].add($V([0.5, 0.5]));
        var C3 = P[1][0].add($V([0.5, 0.5]));
        var C4 = P[2][0].add($V([0.5, 0.5]));
        var C = C1.add(C2).add(C3).add(C4).x(1/4);

        this.save();
        this.translate($V([-1.5, -1]));
        this.polyLine([P1, P2, P3, P4, P5, P6], true, true);
        this.point(P1);
        this.text(P1, $V([1, 1]), "TEX:$O$");
        this.labelLine(P1, P2, $V([0, -1]), "TEX:$6d$");
        this.labelLine(P2, P3, $V([0, -1]), "TEX:$2d$");
        this.labelLine(P3, P4, $V([0, -1]), "TEX:$4d$");
        this.labelLine(P4, P5, $V([0, -1]), "TEX:$2d$");
        this.labelLine(P5, P6, $V([0, -1]), "TEX:$2d$");
        this.labelLine(P6, P1, $V([0, -1]), "TEX:$4d$");
        this.centerOfMass(C);
        this.restore();
    });

    var rcm_er_c = new PrairieDraw("rcm-er-c", function() {
        this.setUnits(5, 5 / this.goldenRatio);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var P1 = ei.x(-1);
        var P2 = ei;
        var P3 = ei.add(ej);
        var P4 = ei.x(-1).add(ej);

        this.save();
        this.translate(ej.x(-1));
        this.scale($V([2, 2]));
        this.polyLine([P1, P2, P3, P4], true, true);
        this.setProp("pointRadiusPx", 2.5);
        this.point(P1);
        this.setProp("arrowLineWidthPx", 2.5);
        // this.arrow(P1, P1.add(ei.x(0.5)));
        // this.arrow(P1, P1.add(ej.x(0.5)));
        this.text(P1, ei.add(ej), "TEX:$O$");
        // this.labelLine(P1, P1.add(ei.x(0.5)), $V([0.5, -1.5]), "TEX:$\\hat{\\imath}$");
        // this.labelLine(P1, P1.add(ej.x(0.5)), $V([0.5, 1.5]), "TEX:$\\hat{\\jmath}$");
        this.restore();
        this.centerOfMass(O);
        this.text(ej, $V([0, -1.5]), "TEX:$\\ell_x$");
        this.text(ei.x(2), $V([-1.5, 0]), "TEX:$\\ell_y$");
    });

    var rcm_et_c = new PrairieDraw("rcm-et-c", function() {
        this.setUnits(5, 5 / this.goldenRatio);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var P1 = ei.x(-1);
        var P2 = $V([-2, 1]);
        var P3 = ei.x(1.5);
        var C = $V([(P1.e(1) + P2.e(1) + P3.e(1))/3, P2.e(2)/3]);

        this.save();
        this.scale($V([1, 2]));
        this.translate(C.x(-1));
        this.polyLine([P1, P2, P3], true, true);
        this.setProp("pointRadiusPx", 2.5);
        this.point(P1);
        this.point(P2);
        this.point(P3);
        this.setProp("arrowLineWidthPx", 2.5);
        // this.arrow(P1, P1.add(ei.x(0.7)));
        // this.arrow(P1, P1.add(ej.x(0.4)));
        this.text(P1, ei.add(ej), "TEX:$O$");
        this.text(P2, ei, "TEX:$Q$");
        this.text(P3, ei.x(-1).add(ej), "TEX:$P$");
        // this.labelLine(P1, P1.add(ei.x(0.5)), $V([1, 1.5]), "TEX:$\\hat{\\imath}$");
        // this.labelLine(P1, P1.add(ej.x(0.5)), $V([0.7, 0]), "TEX:$\\hat{\\jmath}$");
        this.restore();
        this.centerOfMass(O);
    });

    var rcm_ee_c = new PrairieDraw("rcm-ee-c", function() {
        this.setUnits(6, 6);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var theta = 4*Math.PI/6;
        var a = 2.8; // semimajor axis (a)
        var b = 2; // semiminor axis (b)
        var P = $V([a * Math.cos(theta), b * Math.sin(theta)]);
        var C = $V([2*a*Math.sin(theta)/(3 * theta), 2 * b * (1 - Math.cos(theta))/(3 * theta)]);

        var pointsE = [];
        var pointsA = [];
        var i, alpha, beta;
        for (i = 0; i <= 500; i++) {
            alpha = i / 500 * 2*Math.PI;
            pointsE.push($V([a * Math.cos(alpha), b * Math.sin(alpha)]));
        };

        for (i = 0; i <= 500; i++) {
            beta = i / 500 * theta;
            pointsA.push($V([a * Math.cos(beta), b * Math.sin(beta)]));
        }

        this.save();
        this.setProp("shapeOutlineColor", "rgba(0, 0, 0, 0.3)");
        this.polyLine(pointsE, true, undefined);
        this.restore();
        this.line(O, ei.x(a));
        this.line(O, ej.x(-b));
        this.line(O, P);
        this.polyLine(pointsA);
        this.save();
        this.setProp("shapeOutlineColor", "rgb(0, 0, 255)");
        this.circleArrow(O, 0.5, 0, theta);
        this.restore();
        this.labelCircleLine(O, 0.5, 0, theta, $V([-0.2, 1]), "TEX:$\\theta$");
        this.save();
        // this.setProp("arrowLineWidthPx", 2.5);
        this.setProp("pointRadiusPx", 2.5);
        // this.arrow(O, ei.x(r/2.5));
        // this.arrow(O, ej.x(r/2.5));
        this.point(O);
        this.centerOfMass(C);
        this.text(O, $V([1, 1]), "TEX:$O$");
        this.text(ei.x(a/2), ej, "TEX:$a$");
        this.text(ej.x(-b/2), $V([1, 0]), "TEX:$b$");
        this.restore();
    });

    var rcm_eg_c = new PrairieDraw("rcm-eg-c", function() {
        this.setUnits(5, 5 / this.goldenRatio);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var P1 = ei.x(-1);
        var P2 = $V([-1, 1]);
        var P3 = ei.x(1.5);
        var C = $V([(P1.e(1) + P2.e(1) + P3.e(1))/3, P2.e(2)/3]);

        this.save();
        this.scale($V([1, 2]));
        this.translate(C.x(-1));
        this.polyLine([P1, P2, P3], true, true);
        this.setProp("pointRadiusPx", 2.5);
        this.point(P1);
        this.point(P2);
        this.point(P3);
        this.setProp("arrowLineWidthPx", 2.5);
        // this.arrow(P1, P1.add(ei.x(0.7)));
        // this.arrow(P1, P1.add(ej.x(0.4)));
        this.text(P1, ei.add(ej), "TEX:$O$");
        this.text(P2, ei, "TEX:$Q$");
        this.text(P3, ei.x(-1).add(ej), "TEX:$P$");
        this.labelLine(P1, P3, ej.x(-1), "TEX:$b$");
        this.labelLine(P1, P2, ej, "TEX:$h$");
        // this.labelLine(P1, P1.add(ei.x(0.5)), $V([1, 1.5]), "TEX:$\\hat{\\imath}$");
        // this.labelLine(P1, P1.add(ej.x(0.5)), $V([0.7, 0]), "TEX:$\\hat{\\jmath}$");
        this.restore();
        this.centerOfMass(O);
    });

    var rcm_ei_c = new PrairieDraw("rcm-ei-c", function() {
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var P1 = ei.x(-1);
        var P2 = $V([0.25, 1]);
        var P3 = ei.x(1.5);
        var C = $V([(P1.e(1) + P2.e(1) + P3.e(1))/3, P2.e(2)/3]);

        this.save();
        this.scale($V([1, 2]));
        this.translate(C.x(-1));
        this.polyLine([P1, P2, P3], true, true);
        this.setProp("pointRadiusPx", 2.5);
        this.point(P1);
        this.point(P2);
        this.point(P3);
        this.setProp("arrowLineWidthPx", 2.5);
        // this.arrow(P1, P1.add(ei.x(0.7)));
        // this.arrow(P1, P1.add(ej.x(0.4)));
        this.text(P1, ei.add(ej), "TEX:$O$");
        this.text(P2, $V([0, -1]), "TEX:$Q$");
        this.text(P3, ei.x(-1).add(ej), "TEX:$P$");
        this.labelLine(P1, P3, ej.x(-1), "TEX:$b$");
        this.labelLine(P1, P2, ej, "TEX:$h$");
        // this.labelLine(P1, P1.add(ei.x(0.5)), $V([1, 1.5]), "TEX:$\\hat{\\imath}$");
        // this.labelLine(P1, P1.add(ej.x(0.5)), $V([0.7, 0]), "TEX:$\\hat{\\jmath}$");
        this.restore();
        this.centerOfMass(O);
    });

    var rcm_ec_c = new PrairieDraw("rcm-ec-c", function() {
        this.setUnits(6, 6);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var theta = 4.5*Math.PI/6;
        var r = 2.5;
        var P = this.vector2DAtAngle(theta).x(r);
        var C = $V([2*r*Math.sin(theta) / (3 * theta), 2*r*(1 - Math.cos(theta))/(3 * theta)]);

        this.save();
        this.setProp("shapeOutlineColor", "rgba(0, 0, 0, 0.3)");
        this.circle(O, r);
        this.restore();
        this.line(O, ei.x(r));
        this.line(O, P);
        this.arc(O, r, 0, theta);
        this.save();
        this.setProp("shapeOutlineColor", "rgb(0, 0, 255)");
        this.circleArrow(O, 0.5, 0, theta);
        this.restore();
        this.labelCircleLine(O, 0.5, 0, theta, $V([-0.2, 1]), "TEX:$\\theta$");
        this.save();
        // this.setProp("arrowLineWidthPx", 2.5);
        this.setProp("pointRadiusPx", 2.5);
        // this.arrow(O, ei.x(r/2.5));
        // this.arrow(O, ej.x(r/2.5));
        this.point(O);
        this.text(O, $V([1, 1]), "TEX:$O$");
        this.text(ei.x(r/2), ej, "TEX:$r$");
        this.centerOfMass(C);
        this.restore();
    });

    var rcm_es_c = new PrairieDraw("rcm-es-c", function() {
        this.setUnits(6, 6);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var theta = 6*Math.PI/6;
        var r = 2.5;
        var P = this.vector2DAtAngle(theta).x(r);
        var C = $V([2*r*Math.sin(theta) / (3 * theta), 2*r*(1 - Math.cos(theta))/(3 * theta)]);

        this.save();
        this.setProp("shapeOutlineColor", "rgba(0, 0, 0, 0.3)");
        this.circle(O, r);
        this.restore();
        this.line(O, ei.x(r));
        this.line(O, P);
        this.arc(O, r, 0, theta);
        // this.save();
        // this.setProp("shapeOutlineColor", "rgb(0, 0, 255)");
        // this.circleArrow(O, 0.5, 0, theta);
        // this.restore();
        // this.labelCircleLine(O, 0.5, 0, theta, $V([-0.2, 1]), "TEX:$\\theta$");
        this.save();
        // this.setProp("arrowLineWidthPx", 2.5);
        this.setProp("pointRadiusPx", 2.5);
        // this.arrow(O, ei.x(r/2.5));
        // this.arrow(O, ej.x(r/2.5));
        this.point(O);
        this.text(O, $V([0, 1]), "TEX:$O$");
        this.text(ei.x(r/2), ej, "TEX:$r$");
        this.centerOfMass(C);
        this.restore();
    });

    ava_fr_c = new PrairieDrawAnim("ava-fr-c", function(t) {
        this.addOption("components", true);
        
        var stateTogether = {bodyOffset: 0};
        var stateApart = {bodyOffset: 2};
        var states = [stateTogether, stateApart];
        var transTimes = [0.5, 0.5];
        var holdTimes = [-1, -1];
        var interps = {};
        var names = ["together", "apart"];
        var fbdState = this.newSequence("fbd", states, transTimes, holdTimes, interps, names, t);
        var drawForces = false;
        if ((fbdState.inTransition == false) && (fbdState.index == 1)) {
            drawForces = true;
        }
        
        var motionState = Car.getMotion(this, t);

	this.setUnits(8, 2.5 + fbdState.bodyOffset, 600);
        var desiredPos = this.pos2Dw($V([0, this.heightPx() - this.getProp("groundDepthPx") * 3]));
        this.translate($V([-Car.centerOfMass.e(1), desiredPos.e(2)]));

        fAir = Car.fAir(motionState.v);
        var fDrive = fAir + Car.mass * motionState.a;
        var fRearDrive, fFrontDrive;
        if (fDrive > 0) {
            fRearDrive = fDrive;
            fFrontDrive = 0;
        } else {
            fRearDrive = 0.5 * fDrive;
            fFrontDrive = 0.5 * fDrive;
        }
        var fg = Car.mass * 9.81;
        var dr = Car.centerOfMass.e(1) - Car.rearWheelC.e(1);
        var df = Car.frontWheelC.e(1) - Car.centerOfMass.e(1);
        var h = Car.centerOfMass.e(2) - Car.rearContact.e(2);
        var fRearContactY = (dr * fg + h * fDrive) / (dr + df);
        var fFrontContactY = (df * fg - h * fDrive) / (dr + df);
        
        var groundOffset = - motionState.x * Car.motionScale;
        var wheelAngle = groundOffset / Car.wheelR;
        
        // body and wheels
        this.save();
        this.translate($V([0, fbdState.bodyOffset]));
        Car.drawBody(this);
        Car.drawWheels(this, 0);
        if (drawForces) {
            this.centerOfMass(Car.centerOfMass);
            Car.drawForce(this, Car.centerOfMass, $V([0, -fg]));
            Car.drawForce(this, Car.windContact, $V([-fAir, 0]));
            Car.drawForce(this, Car.rearContact, $V([fRearDrive, fRearContactY]));
            Car.drawForce(this, Car.frontContact, $V([fFrontDrive, fFrontContactY]));
            this.arrowFrom(Car.centerOfMass, $V([motionState.a, 0]).x(Car.motionScale), "acceleration");
            this.arrowFrom(Car.centerOfMass, $V([motionState.v, 0]).x(Car.motionScale), "velocity");
        }
        this.restore();
        
        // ground
        this.groundHashed($V([0, 0]), $V([0, 1]), 15, groundOffset);
        if (drawForces) {
            Car.drawForce(this, Car.rearContact, $V([-fRearDrive, -fRearContactY]));
            Car.drawForce(this, Car.frontContact, $V([-fFrontDrive, -fFrontContactY]));
        }
    });

    ava_fm_c = new PrairieDrawAnim("ava-fm-c", function(t) {
        this.addOption("components", true);
        
        var stateTogether = {wheelOffset: 0, bodyOffset: 0};
        var stateApart = {wheelOffset: 2.1, bodyOffset: 4.2};
        var states = [stateTogether, stateApart];
        var transTimes = [0.5, 0.5];
        var holdTimes = [-1, -1];
        var interps = {};
        var names = ["together", "apart"];
        var fbdState = this.newSequence("fbd", states, transTimes, holdTimes, interps, names, t);
        var drawForces = false;
        if ((fbdState.inTransition == false) && (fbdState.index == 1)) {
            drawForces = true;
        }
        
        var motionState = Car.getMotion(this, t);
        
	this.setUnits(8, 2.5 + fbdState.bodyOffset, 600);
        var desiredPos = this.pos2Dw($V([0, this.heightPx() - this.getProp("groundDepthPx") * 3]));
        this.translate($V([-Car.centerOfMass.e(1), desiredPos.e(2)]));
        
        var mw = Car.wheelMass;
        var mb = Car.bodyMass;
        var Iw = Car.wheelMomentInertia;
        var l2 = Car.centerOfMass.e(1) - Car.rearWheelC.e(1);
        var l3 = Car.frontWheelC.e(1) - Car.centerOfMass.e(1);
        var h1 = Car.wheelR;
        var h2 = Car.centerOfMass.e(2) - Car.rearWheelC.e(2);
        var D = Car.fAir(motionState.v);
        var W = Car.mass * 9.81;
        var a = motionState.a;
        
        var Fr, Ff, Nr, Nf, Rr, Rf;
        
        // assume we are braking
        Ff = 0.25 * (mb * a + D);
        if (Ff >= 0) {
            // we are actually driving
            Rf = -(Iw / Math.pow(h1, 2)) * a;
            Ff = Rf - mw * a;
            Fr = 0.5 * (D + mb * a) - Ff;
        } else {
            // we really are braking
            Fr = Ff;
        }
        
        // compute all other wheel forces from Fr, Ff
        Rr = Fr + mw * a;
        Rf = Ff + mw * a;
        Mr = h1 * Rr + (Iw / h1) * a;
        Mf = h1 * Rf + (Iw / h1) * a;
        
        // compute vertical forces
        Nr = (W / 2) * l3 / (l2 + l3) + ((Ff + Fr) * h2 + Mr + Mf) / (l2 + l3);
        Nf = (W / 2) - Nr;
        
        var groundOffset = - motionState.x * Car.motionScale;
        var wheelAngle = groundOffset / Car.wheelR;
        
        // body
        this.save();
        this.translate($V([0, fbdState.bodyOffset]));
        Car.drawBody(this);
        if (drawForces) {
            this.centerOfMass(Car.centerOfMass);
            Car.drawForce(this, Car.centerOfMass, $V([0, -W]));
            Car.drawForce(this, Car.rearWheelC, $V([Fr, Nr]).x(2));
            Car.drawForce(this, Car.frontWheelC, $V([Ff, Nf]).x(2));
            Car.drawForce(this, Car.windContact, $V([-D, 0]));
            this.arrowFrom(Car.centerOfMass, $V([motionState.a, 0]).x(Car.motionScale), "acceleration");
            this.arrowFrom(Car.centerOfMass, $V([motionState.v, 0]).x(Car.motionScale), "velocity");
            this.circleArrowCentered(Car.rearWheelC, Car.wheelR + 0.1, - Math.PI / 2, Mr * Car.momentScale * 2, "moment");
            this.circleArrowCentered(Car.frontWheelC, Car.wheelR + 0.1, - Math.PI / 2, Mf * Car.momentScale * 2, "moment");
        }
        this.restore();
        
        // wheels
        this.save();
        this.translate($V([0, fbdState.wheelOffset]));
        Car.drawWheels(this, wheelAngle);
        if (drawForces) {
            Car.drawForce(this, Car.rearWheelC, $V([-Fr, -Nr]).x(2));
            Car.drawForce(this, Car.frontWheelC, $V([-Ff, -Nf]).x(2));
            Car.drawForce(this, Car.rearContact, $V([Rr, Nr]).x(2));
            Car.drawForce(this, Car.frontContact, $V([Rf, Nf]).x(2));
            this.circleArrowCentered(Car.rearWheelC, Car.wheelR + 0.1, Math.PI / 2, - Mr * Car.momentScale * 2, "moment");
            this.circleArrowCentered(Car.frontWheelC, Car.wheelR + 0.1, Math.PI / 2, - Mf * Car.momentScale * 2, "moment");
        }
        this.restore();
        
        // ground
        this.groundHashed($V([0, 0]), $V([0, 1]), 15, groundOffset);
        if (drawForces) {
            Car.drawForce(this, Car.rearContact, $V([-Rr, -Nr]).x(2));
            Car.drawForce(this, Car.frontContact, $V([-Rf, -Nf]).x(2));
        }
    });

    var ava_fc_c = new PrairieDrawAnim("ava-fc-c", function(t) {
	this.setUnits(8 * 2 / 3, 2.2);
        
        this.translate($V([-Car.width / 2, -Car.height / 2]));
        Car.drawBody(this);
        Car.drawWheels(this, 0);
        this.centerOfMass(Car.centerOfMass);
        var O = $V([0,0]);
        var P1 = $V([Car.rearContact.e(1), 0]);
        var P2 = $V([Car.centerOfMass.e(1), 0]);
        var P3 = $V([Car.frontContact.e(1), 0]);
        var P4 = $V([Car.width, 0]);
        this.measurement(O, P1, "TEX:$\\ell_1$");
        this.measurement(P1, P2, "TEX:$\\ell_2$");
        this.measurement(P2, P3, "TEX:$\\ell_3$");
        this.measurement(P3, P4, "TEX:$\\ell_4$");
        var Q1 = $V([0, Car.rearWheelC.e(2)]);
        var Q2 = $V([0, Car.centerOfMass.e(2)]);
        var Q3 = $V([0, Car.height]);
        this.measurement(Q1, O, "TEX:$h_1$");
        this.measurement(Q2, Q1, "TEX:$h_2$");
        this.measurement(Q3, Q2, "TEX:$h_3$");
    });

    window.avb_fr_c = new PrairieDrawAnim("avb-fr-c", function(t) {

        this.addOption("thetaDeg", 45);
        this.addOption("velocity", 30);
        this.addOption("components", true);

	this.setUnits(8, 8 / this.goldenRatio);

        var theta = this.getOption("thetaDeg") / 180 * Math.PI;

        fbdTrans = this.activationSequence("fbd", 0.5, t);
        fbdOffset = fbdTrans * (2 + 2 * Math.sin(theta));
        var drawForces = (fbdTrans == 1);

        var velocity = this.getOption("velocity"); // m/s
        var acceleration = Math.pow(velocity, 2) / bus.radius; // m/s^2

        var normal = bus.mass * acceleration * Math.sin(theta) + bus.mass * bus.gravity * Math.cos(theta);
        var friction = - bus.mass * acceleration * Math.cos(theta) + bus.mass * bus.gravity * Math.sin(theta);

        var h = bus.centerOfMass.e(2);
        var dL = bus.centerOfMass.e(1) - bus.leftContact.e(1);
        var dR = bus.rightContact.e(1) - bus.centerOfMass.e(1);
        var normalLeft = normal * dR / (dL + dR) + friction * h / (dL + dR);
        var normalRight = normal * dL / (dL + dR) - friction * h / (dL + dR);

        var frictionLeft = friction / 2;
        var frictionRight = friction / 2;

        var u = this.vector2DAtAngle(theta);
        var v = this.vector2DAtAngle(theta + Math.PI/2);

        this.translate($V([fbdTrans * 0.5 * Math.sin(theta), -1 + fbdOffset / 4]));

        var C = v.x(bus.busScale * bus.centerOfMass.e(2));
        var PL = u.x(bus.busScale * bus.leftContact.e(1));
        var PR = u.x(bus.busScale * bus.rightContact.e(1));

        // ground
        this.save();
        this.translate(v.x(-fbdOffset / 2));
        this.groundHashed($V([0, 0]), v, 10, 0);
        if (drawForces) {
            bus.drawForce(this, PL, u.x(-frictionLeft), v.x(-normalLeft));
            bus.drawForce(this, PR, u.x(-frictionRight), v.x(-normalRight));
        }
        this.restore();

        // bus
        this.save();
        this.translate(v.x(fbdOffset / 2));
        this.save();
        this.rotate(this.angleOf(u));
        this.scale($V([bus.busScale, bus.busScale]));
        bus.draw(this);
        this.restore();
        if (drawForces) {
            this.centerOfMass(C);
            if (Math.abs(acceleration) > 1e-5) {
                this.arrowFrom(C, $V([-acceleration, 0]).x(bus.motionScale), "acceleration");
                this.labelLine(C, C.add($V([-acceleration, 0]).x(bus.motionScale)), $V([1,0]), "TEX:$\\vec{a}$");
            }
            bus.drawForce(this, C, $V([0, -bus.mass * bus.gravity]));
            bus.drawForce(this, PL, u.x(frictionLeft), v.x(normalLeft));
            bus.drawForce(this, PR, u.x(frictionRight), v.x(normalRight));
        }
        this.restore();

    });

    window.avb_fb_c = new PrairieDrawAnim("avb-fb-c", function(t) {
	this.setUnits(3.5, 3.5);
        this.translate($V([0.1, -bus.height / 2 + 0.15]));
        bus.draw(this);
        this.centerOfMass(bus.centerOfMass);
        var L2 = $V([-bus.width / 2, 0]);
        var L1 = $V([bus.leftContact.e(1), 0]);
        var O = $V([0,0]);
        var R1 = $V([bus.rightContact.e(1), 0]);
        var R2 = $V([bus.width / 2, 0]);
        this.measurement(L2, L1, "TEX:$\\ell_1$");
        this.measurement(L1,  O, "TEX:$\\ell_2$");
        this.measurement( O, R1, "TEX:$\\ell_3$");
        this.measurement(R1, R2, "TEX:$\\ell_4$");
        var Q1 = $V([-bus.totalWidth / 2, 0]);
        var Q2 = $V([-bus.totalWidth / 2, bus.centerOfMass.e(2)]);
        var Q3 = $V([-bus.totalWidth / 2, bus.height]);
        this.measurement(Q2, Q1, "TEX:$h_1$");
        this.measurement(Q3, Q2, "TEX:$h_2$");
    });
});

