
$(document).ready(function() {

    var rem_ei_c = new PrairieDraw("rem-ei-c", function() {
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

        var P = $V([l/2, -l/2, -h/2]);
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

        this.arrow(a0, a1);
        this.labelLine(a0, a1, $V([1, -1]), "TEX:$\\hat{a}$");

        this.save();
        this.setProp("rightAngleStrokeWidthPx", 2);
        this.rightAngle(Ba, Vector.k.x(-1), D.subtract(Ba));
        this.restore();

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

        this.point(P);
        this.text(P, $V([1, 0]), "TEX:$P$");
        this.text(v011, $V([0, -1.1]), "TEX:$dV$");

        this.labelLine(p010, p110, $V([0, 1]), "TEX:$\\mathcal{B}$");

        this.save();
        this.setProp("shapeOutlineColor", "rgb(150, 150, 150)");
        this.line(Ba, D);
        this.labelLine(Ba, D, $V([0.2, 1]), "TEX:$r$");
        this.restore();

        this.restore();
    });

    var rem_ec_c = new PrairieDraw("rem-ec-c", function() {
        this.setUnits(4, 4 / this.goldenRatio);

        var d = 0.15;

        var O = $V([0, 0, 0]);
        var ei = $V([1, 0, 0]);
        var ej = $V([0, 1, 0]);
        var ek = $V([0, 0, 1]);
        var P = $V([1.5, 1.5, 1]);
        var Pi = $V([P.e(1), 0, 0]);
        var Pj = $V([0, P.e(2), 0]);
        var Pk = $V([0, 0, P.e(3)]);
        var Pij = $V([P.e(1), P.e(2), 0]);

        var bi = ei.x(2);
        var bj = ej.x(2);
        var bk = ek.x(1.4);

        var v000 = P.add($V([0, 0, 0]));
        var v001 = P.add($V([0, 0, d]));
        var v010 = P.add($V([0, d, 0]));
        var v011 = P.add($V([0, d, d]));
        var v100 = P.add($V([d, 0, 0]));
        var v101 = P.add($V([d, 0, d]));
        var v110 = P.add($V([d, d, 0]));
        var v111 = P.add($V([d, d, d]));

        this.save();
        this.translate($V([-0.5, -0.3]));

        this.line(v000, v001);
        this.line(v100, v000);
        this.line(v010, v000);

        this.arrow(O, bi);
        this.arrow(O, bj);
        this.arrow(O, bk);
        this.labelLine(O, bi, $V([1, -1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, bj, $V([0.9, -1.3]), "TEX:$\\hat\\jmath$");
        this.labelLine(O, bk, $V([0.9, -1.3]), "TEX:$\\hat{k}$");
        this.text(O, $V([1.3, -0.5]), "TEX:$P$");

        this.rightAngle(Pi, Vector.j, Vector.i.x(-1));
        this.rightAngle(Pj, Vector.j.x(-1), Vector.i);
        this.rightAngle(Pk, Vector.k.x(-1), Pij);
        this.rightAngle(Pij, Vector.k, Vector.i.x(-1));

        this.save();
        this.setProp("shapeOutlineColor", "rgb(150, 150, 150)");
        this.line(Pi, Pij);
        this.line(Pj, Pij);
        this.line(O, Pij);
        this.line(Pij, P);
        this.line(Pk, P);
        this.labelLine(Pk, P, $V([0, 1]), "TEX:$r$");
        this.labelLine(O, Pij, $V([-0.2, -1]), "TEX:$r$");
        this.labelLine(Pi, Pij, $V([0, -1]), "TEX:$y$");
        this.labelLine(Pj, Pij, $V([0, 1]), "TEX:$x$");
        this.labelLine(Pij, P, $V([-0.2, 1]), "TEX:$z$");
        this.restore();

        this.save();
        var alpha = 0.8;
        this.save();
        this.setProp("shapeInsideColor", "rgba(255, 255, 255, " + alpha + ")");
        this.polyLine([v100, v110, v111, v101], true, true, false);
        this.polyLine([v010, v110, v111, v011], true, true, false);
        this.polyLine([v101, v111, v011, v001], true, true, false);
        this.restore();

        this.line(v100, v101);
        this.line(v110, v111);
        this.line(v010, v011);
        this.line(v100, v110);
        this.line(v101, v111);
        this.line(v110, v010);
        this.line(v111, v011);
        this.line(v101, v001);
        this.line(v011, v001);

        this.text(v010, $V([-1, -1]), "TEX:$dV$");

        this.restore();
    });

    var rem_xs_c = new PrairieDraw("rem-xs-c", function() {
        this.setUnits(4, 4 / this.goldenRatio);

        var O = $V([0, 0]);
        var l = 1.5;
        var b = 1;
        var ei = $V([b, 0]);
        var ej = $V([0, b]);

        this.save();
        this.translate($V([-0.8, 0]));
        this.rectangle(l, l);
        this.text($V([-l/2, 0]), $V([1.3, 0]), "TEX:$\\ell$");
        this.text($V([0, -l/2]), $V([0, 1.3]), "TEX:$\\ell$");
        this.point(O);
        this.text(O, $V([1, 1]), "TEX:$C$");
        this.restore();

        this.save();
        this.translate($V([0.6, -0.5]));
        this.arrow(O, ei);
        this.arrow(O, ej);
        this.labelLine(O, ei, $V([1, -1]), "TEX:$x$");
        this.labelLine(O, ej, $V([1, -1]), "TEX:$y$");
        this.restore();
    });

    var rem_xs_c3 = new PrairieDraw("rem-xs-c3", function() {
        this.setUnits(4, 4 / this.goldenRatio);

        var l = 2;
        var h = 0.3;
        var b = 2;

        var p000 = $V([-l/2, -l/2, -h/2]);
        var p001 = $V([-l/2, -l/2,  h/2]);
        var p010 = $V([-l/2,  l/2, -h/2]);
        var p011 = $V([-l/2,  l/2,  h/2]);
        var p100 = $V([ l/2, -l/2, -h/2]);
        var p101 = $V([ l/2, -l/2,  h/2]);
        var p110 = $V([ l/2,  l/2, -h/2]);
        var p111 = $V([ l/2,  l/2,  h/2]);

        var O = $V([0, 0, 0]);
        var a1 = $V([l/2, 0, 0]);
        var a2 = $V([0, l/2, 0]);
        var a3 = $V([0, 0, h/2]);
        var b1 = $V([1.3 * b, 0, 0]);
        var b2 = $V([0, b, 0]);
        var b3 = $V([0, 0, b/2]);

        this.save();
        this.translate($V([-0.1, 0]));

        this.line(p000, p001);
        this.line(p100, p000);
        this.line(p010, p000);

        this.line(O, a1);
        this.line(O, a2);
        this.line(O, a3);
        this.point(O);

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

        this.arrow(a1, b1);
        this.arrow(a2, b2);
        this.arrow(a3, b3);

        this.labelLine(a1, b1, $V([1, -1]), "TEX:$x$");
        this.labelLine(a2, b2, $V([0.8, -1.3]), "TEX:$y$");
        this.labelLine(a3, b3, $V([0.8, -1.3]), "TEX:$z$");

        this.labelLine(p100, p110, $V([0.3, -1.2]), "TEX:$\\ell$");
        this.labelLine(p101, p001, $V([0, 1.2]), "TEX:$\\ell$");
        this.labelLine(p100, p101, $V([0, 1.2]), "TEX:$h$");

        this.text(O, $V([1, -0.6]), "TEX:$C$");

        this.restore();
    });

    var rem_el_c = new PrairieDraw("rem-el-c", function() {
        this.setUnits(4, 3);

        var l = 2.7;
        var h = 0.5;
        var b = 2;
        var d = 0.15;

        var p000 = $V([-l/2, -l/2, -h/2]);
        var p001 = $V([-l/2, -l/2,  h/2]);
        var p010 = $V([-l/2,  l/2, -h/2]);
        var p011 = $V([-l/2,  l/2,  h/2]);
        var p100 = $V([ l/2, -l/2, -h/2]);
        var p101 = $V([ l/2, -l/2,  h/2]);
        var p110 = $V([ l/2,  l/2, -h/2]);
        var p111 = $V([ l/2,  l/2,  h/2]);

        var O = $V([0, 0, 0]);
        var a1 = $V([l/2, 0, 0]);
        var a2 = $V([0, l/2, 0]);
        var a3 = $V([0, 0, h/2]);
        var b1 = $V([1.3 * b, 0, 0]);
        var b2 = $V([0, b, 0]);
        var b3 = $V([0, 0, 0.6 * b]);

        var P = $V([-l/2, -l/2, -h/2]);

        var Pk = P.add($V([0, 0, 0.6 * b]));

        var B = $V([l/2 - d, -l/4, h/2 - d]);
        var v000 = B.add($V([0, 0, 0]));
        var v001 = B.add($V([0, 0, d]));
        var v010 = B.add($V([0, d, 0]));
        var v011 = B.add($V([0, d, d]));
        var v100 = B.add($V([d, 0, 0]));
        var v101 = B.add($V([d, 0, d]));
        var v110 = B.add($V([d, d, 0]));
        var v111 = B.add($V([d, d, d]));

        var D = v011;
        var Ba = $V([P.e(1), P.e(2), D.e(3)]);
        var Ca = $V([O.e(1), O.e(2), D.e(3)]);

        this.save();
        this.translate($V([-0.05, -0.3]));

        this.line(p000, p001);
        this.line(p100, p000);
        this.line(p010, p000);

        this.line(v000, v001);
        this.line(v010, v011);
        this.line(v000, v100);
        this.line(v010, v110);
        this.line(v000, v010);

        this.line(O, a1);
        this.line(O, a2);
        this.line(O, a3);
        this.point(O);

        this.arrow(P, Pk);
        this.point(P);
        this.labelLine(P, Pk, $V([0.9, -1.3]), "TEX:$\\hat{k} = \\hat{a}$");

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

        this.arrow(a1, b1);
        this.arrow(a2, b2);
        this.arrow(a3, b3);

        this.labelLine(O, b1, $V([1, -1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, b2, $V([0.9, -1.3]), "TEX:$\\hat\\jmath$");
        this.labelLine(O, b3, $V([0.9, -1.3]), "TEX:$\\hat{k} = \\hat{a}$");

        this.text(O, $V([-0.5, 1]), "TEX:$C$");

        this.line(v001, v101);
        this.line(v011, v111);
        this.line(v001, v011);
        this.line(v101, v111);
        this.line(v100, v101);
        this.line(v110, v111);
        this.line(v100, v110);

        this.text(P, $V([-0.5, 1]), "TEX:$P$");
        this.text(v100, $V([0, 1.1]), "TEX:$dV$");

        this.save();
        this.setProp("shapeOutlineColor", "rgb(150, 150, 150)");
        this.line(Ba, D);
        this.line(Ca, D);
        this.line(Ba, Ca);
        this.labelLine(Ba, D, $V([0.1, -1]), "TEX:$r_P$");
        this.labelLine(Ca, D, $V([0, 1]), "TEX:$r_C$");
        this.labelLine(Ba, Ca, $V([0.2, 1]), "TEX:$d$");
        this.restore();

        this.restore();
    });

    var rem_xc_c = new PrairieDraw("rem-xc-c", function() {
        this.setUnits(4, 4 / this.goldenRatio);

        var O = $V([0, 0]);
        var l = 1.5;
        var b = 1;
        var ei = $V([b, 0]);
        var ej = $V([0, b]);
        var P = $V([-l/2, -l/2]);

        this.save();
        this.translate($V([-0.8, 0]));
        this.rectangle(l, l);
        this.text($V([-l/2, 0]), $V([1.3, 0]), "TEX:$\\ell$");
        this.text($V([0, -l/2]), $V([0, 1.3]), "TEX:$\\ell$");
        this.point(O);
        this.text(O, $V([1, 1]), "TEX:$C$");
        this.point(P);
        this.text(P, $V([1, 1]), "TEX:$P$");
        this.restore();

        this.save();
        this.translate($V([0.6, -0.5]));
        this.arrow(O, ei);
        this.arrow(O, ej);
        this.labelLine(O, ei, $V([1, -1]), "TEX:$x$");
        this.labelLine(O, ej, $V([1, -1]), "TEX:$y$");
        this.restore();
    });

    var rem_xc_c3 = new PrairieDraw("rem-xc-c3", function() {
        this.setUnits(4, 4 / this.goldenRatio);

        var l = 2;
        var h = 0.3;

        var p000 = $V([-l/2, -l/2, -h/2]);
        var p001 = $V([-l/2, -l/2,  h/2]);
        var p010 = $V([-l/2,  l/2, -h/2]);
        var p011 = $V([-l/2,  l/2,  h/2]);
        var p100 = $V([ l/2, -l/2, -h/2]);
        var p101 = $V([ l/2, -l/2,  h/2]);
        var p110 = $V([ l/2,  l/2, -h/2]);
        var p111 = $V([ l/2,  l/2,  h/2]);

        var O = $V([0, 0, 0]);
        var P = $V([-l/2, -l/2, 0]);
        var ei = $V([l + 0.7, 0, 0]);
        var ej = $V([0, l + 0.5, 0]);
        var ek = $V([0, 0, h/2 + 0.4]);

        this.save();
        this.translate($V([0, -0.2]));

        this.save();
        this.translate3D(P);

        this.arrow(O, ei);
        this.arrow(O, ej);
        this.arrow(O, ek);

        this.labelLine(O, ei, $V([1, -1]), "TEX:$x$");
        this.labelLine(O, ej, $V([0.9, -1.3]), "TEX:$y$");
        this.labelLine(O, ek, $V([0.8, -1.3]), "TEX:$z$");

        this.restore();

        this.point(P);
        this.line(p000, p001);
        this.line(p100, p000);
        this.line(p010, p000);

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

        this.labelLine(p001, p011, $V([0, 1.2]), "TEX:$\\ell$");
        this.labelLine(p101, p001, $V([0, 1.2]), "TEX:$\\ell$");
        this.labelLine(p110, p111, $V([0, 1]), "TEX:$h$");

        this.text(P, $V([-1, 1]), "TEX:$P$");

        this.restore();
    });

    var rem_ea_c = new PrairieDraw("rem-ea-c", function() {
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

        this.save();
        this.translate(C1.x(-1).add($V([-1, 0.1])));

        this.polyLine([P1, P2, P3, P4, P5, P6, P7, P8], true, true);
        this.save();
        this.setProp("shapeOutlineColor", "rgb(200, 200, 200)");
        this.line(P3, P6);
        this.restore();
        this.point(P2);
        this.text(P2, $V([-1, 1]), "TEX:$P$");
        this.text(C1, $V([0, 0]), "TEX:$\\mathcal{B}_1$");
        this.text(C2, $V([0, 0]), "TEX:$\\mathcal{B}_2$");
        this.text(P6, $V([-3, -3]), "TEX:$\\mathcal{B}$");

        this.restore();
    });

    var rem_xl_c = new PrairieDraw("rem-xl-c", function() {
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
        this.text(P1, $V([1, 1]), "TEX:$P$");
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
        this.labelLine(O, ei, $V([0.7, -1.3]), "TEX:$x$");
        this.labelLine(O, ej, $V([0.7, 1.3]), "TEX:$y$");
        this.restore();
    });

    var rem_xl_cd = new PrairieDraw("rem-xl-cd", function() {
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
        this.text(P1, $V([1, 1]), "TEX:$P$");
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
        this.labelLine(O, ei, $V([0.7, -1.3]), "TEX:$x$");
        this.labelLine(O, ej, $V([0.7, 1.3]), "TEX:$y$");
        this.restore();
    });

    var rem_ep_c = new PrairieDraw("rem-ep-c", function() {
        this.setUnits(4, 2);

        var O = $V([0, 0, 0]);
        var ei = $V([1, 0, 0]);
        var ej = $V([0, 1, 0]);
        var ek = $V([0, 0, 1]);
        var P = $V([1, 1, 0]);
        var Pi = $V([P.e(1), 0, 0]);
        var Pj = $V([0, P.e(2), 0]);

        var bi = ei.x(2);
        var bj = ej.x(2);
        var bk = ek.x(1);

        this.save();
        this.translate($V([-0.5, -0.15]));

        this.arrow(O, bi);
        this.arrow(O, bj);
        this.arrow(O, bk);
        this.labelLine(O, bi, $V([1, -1]), "TEX:$x$");
        this.labelLine(O, bj, $V([0.9, -1.3]), "TEX:$y$");
        this.labelLine(O, bk, $V([0.9, -1.3]), "TEX:$z$");
        this.text(O, $V([1.3, -0.5]), "TEX:$P$");

        this.save();
        this.setProp("shapeOutlineColor", "rgb(150, 150, 150)");
        this.line(Pi, P);
        this.line(Pj, P);
        this.line(O, P);
        this.labelLine(O, P, $V([0.3, 1]), "TEX:$r$");
        this.restore();

        this.save();
        this.setProp("pointRadiusPx", 4);
        this.point(P);
        this.text(P, $V([-1, 1]), "TEX:$m$");
        this.restore();

        this.restore();
    });

    var rem_er_c = new PrairieDraw("rem-er-c", function() {
        this.setUnits(4, 2.2);

        var l = 2;
        var h = 0.6;
        var b = 2;

        var p000 = $V([-l/2, -l/2, -h/2]);
        var p001 = $V([-l/2, -l/2,  h/2]);
        var p010 = $V([-l/2,  l/2, -h/2]);
        var p011 = $V([-l/2,  l/2,  h/2]);
        var p100 = $V([ l/2, -l/2, -h/2]);
        var p101 = $V([ l/2, -l/2,  h/2]);
        var p110 = $V([ l/2,  l/2, -h/2]);
        var p111 = $V([ l/2,  l/2,  h/2]);

        var O = $V([0, 0, 0]);
        var a1 = $V([l/2, 0, 0]);
        var a2 = $V([0, l/2, 0]);
        var a3 = $V([0, 0, h/2]);
        var b1 = $V([1.3 * b, 0, 0]);
        var b2 = $V([0, b, 0]);
        var b3 = $V([0, 0, b/2]);

        this.save();
        this.translate($V([-0.1, -0.05]));

        this.line(p000, p001);
        this.line(p100, p000);
        this.line(p010, p000);

        this.line(O, a1);
        this.line(O, a2);
        this.line(O, a3);

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

        this.arrow(a1, b1);
        this.arrow(a2, b2);
        this.arrow(a3, b3);

        this.labelLine(O, b1, $V([1, -1]), "TEX:$x$");
        this.labelLine(O, b2, $V([0.9, -1.3]), "TEX:$y$");
        this.labelLine(O, b3, $V([0.9, -1.3]), "TEX:$z$");

        this.labelLine(p100, p110, $V([0.3, -1.2]), "TEX:$\\ell_y$");
        this.labelLine(p101, p001, $V([0, 1.3]), "TEX:$\\ell_x$");
        this.labelLine(p100, p101, $V([0, 1.2]), "TEX:$\\ell_z$");

        this.text(O, $V([1, -0.4]), "TEX:$C$");

        this.restore();
    });

    var rem_ey_c = new PrairieDraw("rem-ey-c", function() {
        this.setUnits(4, 3);

        var r1 = 0.6;
        var r2 = 1.2;
        var h = 1.5;

        var O = $V([0, 0, 0]);
        var ei = $V([1, 0, 0]);
        var ej = $V([0, 1, 0]);
        var ek = $V([0, 0, 1]);

        var A = ek.x(-h/2);
        var B = ek.x(h/2);

        var ai = ei.x(r2);
        var aj = ej.x(r2);
        var ak = ek.x(h/2);

        var bi = ei.x(3.4);
        var bj = ej.x(2);
        var bk = ek.x(1.6);

        this.save();
        this.translate($V([-0.2, -0.2]));

        this.save();
        this.setProp("shapeInsideColor", "rgb(240, 240, 240)");
        this.cylinder(A, B.subtract(A), r1, {strokeBottomBack: false, strokeBottomFront: false, strokeSides: false,
                                             strokeTop: false, fillFront: false, fillTop: true});
        this.restore();
        this.line(O, ai);
        this.line(O, aj);
        this.line(O, ak);
        this.save();
        this.setProp("shapeInsideColor", "rgba(255, 255, 255, 0.8)");
        this.cylinder(A, B.subtract(A), r1, {strokeTop: false, fillFront: false, fillTop: false});
        var offset = this.cylinder(A, B.subtract(A), r2, {topInnerRadius: r1});
        this.cylinder(A, B.subtract(A), r1, {strokeBottomBack: false, strokeBottomFront: false, strokeSides: false,
                                             fillFront: false, fillTop: false});
        this.restore();

        this.arrow(ai, bi);
        this.arrow(aj, bj);
        this.arrow(ak, bk);
        this.labelLine(O, bi, $V([1, -1]), "TEX:$x$");
        this.labelLine(O, bj, $V([0.9, -1.3]), "TEX:$y$");
        this.labelLine(O, bk, $V([0.9, -1.3]), "TEX:$z$");

        this.labelLine(B.subtract(offset), A.subtract(offset), $V([0, -1]), "TEX:$\\ell$");

        this.save();
        this.setProp("shapeOutlineColor", "rgb(150, 150, 150)");
        var T1 = B.add($V([0.5, 1, 0]).toUnitVector().x(r1));
        var T2 = B.add($V([-2, 1, 0]).toUnitVector().x(r2));
        this.line(B, T1);
        this.line(B, T2);
        this.labelLine(B, T1, $V([0.4, 0.9]), "TEX:$r_1$");
        this.labelLine(B, T2, $V([0.5, -1.1]), "TEX:$r_2$");
        this.restore();

        this.text(O, $V([1, -0.5]), "TEX:$C$");

        this.restore();
    });

    var rem_es_c = new PrairieDraw("rem-es-c", function() {
        this.setUnits(4, 3.25);

        var r1 = 0.8;
        var r2 = 1.3;
        var b = 2.6;

        var O = $V([0, 0, 0]);
        var a1 = $V([r2, 0, 0]);
        var a2 = $V([0, r2, 0]);
        var a3 = $V([0, 0, r2]);
        var b1 = $V([1.3 * b, 0, 0]);
        var b2 = $V([0, 0.8 * b, 0]);
        var b3 = $V([0, 0, 0.7 * b]);

        this.save();
        this.translate($V([-0.1, -0.25]));

        this.line(O, a1);
        this.line(O, a2);
        this.line(O, a3);

        this.sphere(O, r1, false);
        this.sphereSlice(O, r1, Vector.k, 0, true, true);
        this.sphereSlice(O, r2, Vector.k, 0, true, false);

        this.save();
        var alpha = 0.8;
        this.save();
        this.setProp("shapeInsideColor", "rgba(255, 255, 255, " + alpha + ")");
        this.sphere(O, r2, true);
        this.sphereSlice(O, r2, Vector.k, 0, false, true);
        this.restore();

        this.arrow(a1, b1);
        this.arrow(a2, b2);
        this.arrow(a3, b3);

        this.labelLine(O, b1, $V([1, -1]), "TEX:$x$");
        this.labelLine(O, b2, $V([0.9, -1.3]), "TEX:$y$");
        this.labelLine(O, b3, $V([0.9, -1.3]), "TEX:$z$");

        this.save();
        this.setProp("shapeOutlineColor", "rgb(150, 150, 150)");
        var T1 = $V([0.5, 1, 0]).toUnitVector().x(r1);
        var T2 = $V([-1.7, 1, 0]).toUnitVector().x(r2);
        this.line(O, T1);
        this.line(O, T2);
        this.labelLine(O, T1, $V([-0.1, -0.9]), "TEX:$r_1$");
        this.labelLine(O, T2, $V([0.6, -1.1]), "TEX:$r_2$");
        this.restore();

        this.text(O, $V([1, -0.4]), "TEX:$C$");

        this.restore();
    });

    var rem_eo_c = new PrairieDraw("rem-eo-c", function() {
        this.setUnits(4, 2.15);

        var l = 2;
        var r = 0.1;
        var d = 0.7;

        var O = $V([0, 0, 0]);
        var ei = $V([1, 0, 0]);
        var ej = $V([0, 1, 0]);
        var ek = $V([0, 0, 1]);

        var A = O;
        var B = ej.x(l);
        var C = ej.x(l/2);

        var Ad = A.add($V([0, 0, -d]));
        var Bd = B.add($V([0, 0, -d]));

        var bi = ei.x(2);
        var bj = ej.x(2.8);
        var bk = ek.x(1);

        this.save();
        this.translate($V([-1.1, -0.1]));

        this.point(O);
        this.arrow(O, bk);
        this.labelLine(O, bk, $V([0.9, -1.3]), "TEX:$z$");

        this.point(C);
        this.arrow(C, C.add(bk));
        this.labelLine(C, C.add(bk), $V([0.9, -1.3]), "TEX:$z$");

        this.save();
        this.setProp("shapeInsideColor", "rgba(255, 255, 255, 0.8)");
        this.cylinder(A, B.subtract(A), r);
        this.restore();

        this.arrow(B, bj);
        this.labelLine(O, bj, $V([0.9, -1.3]), "TEX:$x$");

        this.text(O, $V([0, 1.8]), "TEX:$P$");
        this.text(C, $V([0, 1.8]), "TEX:$C$");

        this.measurement(Ad, Bd, "TEX:$\\ell$", Vector.k);

        this.restore();
    });

    var rem_ek_c = new PrairieDraw("rem-ek-c", function() {
        this.setUnits(4, 3);

        var r = 1.2;
        var h = 1.5;

        var O = $V([0, 0, 0]);
        var ei = $V([1, 0, 0]);
        var ej = $V([0, 1, 0]);
        var ek = $V([0, 0, 1]);

        var A = ek.x(-h/2);
        var B = ek.x(h/2);

        var ai = ei.x(r);
        var aj = ej.x(r);
        var ak = ek.x(h/2);

        var bi = ei.x(3.4);
        var bj = ej.x(2);
        var bk = ek.x(1.6);

        this.save();
        this.translate($V([-0.2, -0.2]));

        this.line(O, ai);
        this.line(O, aj);
        this.line(O, ak);
        this.save();
        this.setProp("shapeInsideColor", "rgba(255, 255, 255, 0.8)");
        var offset = this.cylinder(A, B.subtract(A), r);
        this.restore();

        this.arrow(ai, bi);
        this.arrow(aj, bj);
        this.arrow(ak, bk);
        this.labelLine(O, bi, $V([1, -1]), "TEX:$x$");
        this.labelLine(O, bj, $V([0.9, -1.3]), "TEX:$y$");
        this.labelLine(O, bk, $V([0.9, -1.3]), "TEX:$z$");

        this.labelLine(B.subtract(offset), A.subtract(offset), $V([0, -1]), "TEX:$\\ell$");

        this.save();
        this.setProp("shapeOutlineColor", "rgb(150, 150, 150)");
        var T = B.add($V([-2, 1, 0]).toUnitVector().x(r));
        this.line(B, T);
        this.labelLine(B, T, $V([0, -1]), "TEX:$r$");
        this.restore();

        this.text(O, $V([1, -0.5]), "TEX:$C$");

        this.restore();
    });

    var rem_eh_c = new PrairieDraw("rem-eh-c", function() {
        this.setUnits(4, 3);

        var r = 1.2;
        var h = 1.5;

        var O = $V([0, 0, 0]);
        var ei = $V([1, 0, 0]);
        var ej = $V([0, 1, 0]);
        var ek = $V([0, 0, 1]);

        var A = ek.x(-h/2);
        var B = ek.x(h/2);

        var ai = ei.x(r);
        var aj = ej.x(r);
        var ak = ek.x(h/2);

        var bi = ei.x(3.4);
        var bj = ej.x(2);
        var bk = ek.x(1.6);

        this.save();
        this.translate($V([-0.2, -0.2]));

        this.save();
        this.setProp("shapeInsideColor", "rgb(240, 240, 240)");
        this.cylinder(A, B.subtract(A), r, {strokeBottomBack: false, strokeBottomFront: false, strokeSides: false,
                                            strokeTop: false, fillFront: false, fillTop: true});
        this.restore();
        this.line(O, ai);
        this.line(O, aj);
        this.line(O, ak);
        this.save();
        this.setProp("shapeInsideColor", "rgba(255, 255, 255, 0.8)");
        var offset = this.cylinder(A, B.subtract(A), r, {fillTop: false});
        this.restore();

        this.arrow(ai, bi);
        this.arrow(aj, bj);
        this.arrow(ak, bk);
        this.labelLine(O, bi, $V([1, -1]), "TEX:$x$");
        this.labelLine(O, bj, $V([0.9, -1.3]), "TEX:$y$");
        this.labelLine(O, bk, $V([0.9, -1.3]), "TEX:$z$");

        this.labelLine(B.subtract(offset), A.subtract(offset), $V([0, -1]), "TEX:$\\ell$");

        this.save();
        this.setProp("shapeOutlineColor", "rgb(150, 150, 150)");
        var T = B.add($V([-2, 1, 0]).toUnitVector().x(r));
        this.line(B, T);
        this.labelLine(B, T, $V([0, -1]), "TEX:$r$");
        this.restore();

        this.text(O, $V([1, -0.5]), "TEX:$C$");

        this.restore();
    });

    var rem_eb_c = new PrairieDraw("rem-eb-c", function() {
        this.setUnits(4, 3.25);

        var r = 1.3;
        var b = 2.6;

        var O = $V([0, 0, 0]);
        var a1 = $V([r, 0, 0]);
        var a2 = $V([0, r, 0]);
        var a3 = $V([0, 0, r]);
        var b1 = $V([1.3 * b, 0, 0]);
        var b2 = $V([0, 0.8 * b, 0]);
        var b3 = $V([0, 0, 0.7 * b]);

        this.save();
        this.translate($V([-0.1, -0.25]));

        this.line(O, a1);
        this.line(O, a2);
        this.line(O, a3);

        this.sphereSlice(O, r, Vector.k, 0, true, false);

        this.save();
        var alpha = 0.8;
        this.save();
        this.setProp("shapeInsideColor", "rgba(255, 255, 255, " + alpha + ")");
        this.sphere(O, r, true);
        this.sphereSlice(O, r, Vector.k, 0, false, true);
        this.restore();

        this.arrow(a1, b1);
        this.arrow(a2, b2);
        this.arrow(a3, b3);

        this.labelLine(O, b1, $V([1, -1]), "TEX:$x$");
        this.labelLine(O, b2, $V([0.9, -1.3]), "TEX:$y$");
        this.labelLine(O, b3, $V([0.9, -1.3]), "TEX:$z$");

        this.save();
        this.setProp("shapeOutlineColor", "rgb(150, 150, 150)");
        var T = $V([-1.7, 1, 0]).toUnitVector().x(r);
        this.line(O, T);
        this.labelLine(O, T, $V([0.2, -1]), "TEX:$r$");
        this.restore();

        this.text(O, $V([1, -0.4]), "TEX:$C$");

        this.restore();
    });

    var rem_ew_c = new PrairieDraw("rem-ew-c", function() {
        this.setUnits(4, 3.25);

        var r = 1.3;
        var b = 2.6;

        var O = $V([0, 0, 0]);
        var a1 = $V([r, 0, 0]);
        var a2 = $V([0, r, 0]);
        var a3 = $V([0, 0, r]);
        var b1 = $V([1.3 * b, 0, 0]);
        var b2 = $V([0, 0.8 * b, 0]);
        var b3 = $V([0, 0, 0.7 * b]);

        this.save();
        this.translate($V([-0.1, -0.25]));

        this.line(O, a1);
        this.line(O, a2);
        this.line(O, a3);

        this.sphereSlice(O, r, Vector.k, 0, true, false);

        this.save();
        var alpha = 0.8;
        this.save();
        this.setProp("shapeInsideColor", "rgba(240, 240, 240, " + alpha + ")");
        this.sphere(O, r, true);
        this.sphereSlice(O, r, Vector.k, 0, false, true);
        this.restore();

        this.arrow(a1, b1);
        this.arrow(a2, b2);
        this.arrow(a3, b3);

        this.labelLine(O, b1, $V([1, -1]), "TEX:$x$");
        this.labelLine(O, b2, $V([0.9, -1.3]), "TEX:$y$");
        this.labelLine(O, b3, $V([0.9, -1.3]), "TEX:$z$");

        this.save();
        this.setProp("shapeOutlineColor", "rgb(150, 150, 150)");
        var T = $V([-1.7, 1, 0]).toUnitVector().x(r);
        this.line(O, T);
        this.labelLine(O, T, $V([0.2, -1]), "TEX:$r$");
        this.restore();

        this.text(O, $V([1, -0.4]), "TEX:$C$");

        this.restore();
    });

}); // end of document.ready()
