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
    
rvv_fp1_c = new PrairieDraw("rvv-fp1-c", function() {
    this.setUnits(12, 4);

        var O = $V([0, 0]);
        var a = $V([2.5, 0]);
        var b = $V([2, 2]);
        var aColor = "red";
        var bColor = "blue";

        this.translate($V([-2.5, -1]));

        this.arrow(O, a, aColor);
        this.labelLine(O, a, $V([0, -1]), "TEX:$\\vec{a}$");

        this.arrow(O, b, bColor);
        this.labelLine(O, b, $V([0, 1]), "TEX:$\\vec{b}$");

        this.arrow(b, b.add(a), aColor);
        this.labelLine(b, b.add(a), $V([0, 1]), "TEX:$\\vec{a}$");

        this.arrow(a, a.add(b), bColor);
        this.labelLine(a, a.add(b), $V([0, -1]), "TEX:$\\vec{b}$");

        this.arrow(O, a.add(b), "darkgreen");
        this.labelLine(O, a.add(b), $V([0, -1]), "TEX:$\\vec{a} + \\vec{b}$");


    });

    rvv_fp2_c = new PrairieDraw("rvv-fp2-c", function() {
        this.setUnits(12, 4);
    
            var O = $V([0, 0]);
            var a = $V([2.5, 0]);
            var b = $V([2, 2]);
            var aColor = "red";
            var bColor = "blue";

            this.translate($V([-5, -1]));

            this.arrow(O, a, aColor);
            this.labelLine(O, a, $V([0, -1]), "TEX:$\\vec{a}$");

            this.arrow(O, b, bColor);
            this.labelLine(O, b, $V([0, 1]), "TEX:$\\vec{b}$");

            this.translate($V([4.5, 0]));

            this.arrow(O, a.x(2), "darkred");
            this.labelLine(O, a.x(2), $V([0, -1]), "TEX:$2\\vec{a}$");

            this.translate($V([4.5, 2]));
            this.arrow(O, b.x(-0.7), "darkblue");
            this.labelLine(O, b.x(-0.7), $V([0, 1]), "TEX:$-0.7\\vec{b}$");

    
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

    rvv_fn_c = new PrairieDrawAnim("rvv-fn-c", function(t) {
        this.setUnits(8, 6);

        this.addOption("showComponents", false);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var theta = t / 2 + Math.PI / 8;

        var a = $V([2.8, 0]).rotate(theta, O);
        var aPerp = a.rotate(Math.PI / 2, O);
        var aColor = "red";
        var aPerpColor = "blue";

        this.arrow(O, a, aColor);
        this.labelLine(O, a, $V([0, 1]), "TEX:$\\vec{a}$");
        if (this.getOption("showComponents")) {
            this.arrow(O, ei.x(a.e(1)), aColor);
            this.arrow(ei.x(a.e(1)), a, aColor);
            this.labelLine(O, ei.x(a.e(1)), $V([0, -this.sign(a.e(1))]), "TEX:$a_1\\,\\hat\\imath$");
            this.labelLine(ei.x(a.e(1)), a, $V([0, -this.sign(a.e(2))]), "TEX:$a_2\\,\\hat\\jmath$");
        }

        this.arrow(O, aPerp, aPerpColor);
        this.labelLine(O, aPerp, $V([0, -1]), "TEX:$\\vec{a}^\\perp$");
        if (this.getOption("showComponents")) {
            this.arrow(O, ei.x(aPerp.e(1)), aPerpColor);
            this.arrow(ei.x(aPerp.e(1)), aPerp, aPerpColor);
            this.labelLine(O, ei.x(aPerp.e(1)), $V([0, -this.sign(aPerp.e(1))]), "TEX:$-a_2\\,\\hat\\imath$");
            this.labelLine(ei.x(aPerp.e(1)), aPerp, $V([0, this.sign(aPerp.e(2))]), "TEX:$a_1\\,\\hat\\jmath$");
        }

        this.rightAngle(O, a);
    });

    rvv_eo_c = new PrairieDraw("rvv-eo-c", function() {
        this.setUnits(10, 2.6);

        var d = 0.2; // plus/minus sign size
        var r = 0.8; // circle arrow radius
        var a = 0.3; // circle arrow offset
        var q = 0.3; // right-angle size

        var O = $V([0, 0]);
        var ei3 = $V([-1, -0.5]);
        var ej3 = $V([1, -0.5]);
        var ek3 = $V([0, 1.2]);

        var ei3q = ei3.toUnitVector().x(q);
        var ej3q = ej3.toUnitVector().x(q);
        var ek3q = ek3.toUnitVector().x(q);

        this.save();
        this.translate($V([-3, 0]));
        this.line($V([-d, 0]), $V([d, 0]));
        this.line($V([0, -d]), $V([0, d]));
        this.text(this.vector2DAtAngle(Math.PI * 7 / 6).x(r), O, "TEX:$\\hat\\imath$");
        this.text(this.vector2DAtAngle(Math.PI * 11 / 6).x(r), O, "TEX:$\\hat\\jmath$");
        this.text(this.vector2DAtAngle(Math.PI / 2).x(r), O, "TEX:$\\hat{k}$");
        this.circleArrow(O, r, -Math.PI / 6 + a, Math.PI / 2 - a, undefined, true);
        this.circleArrow(O, r, Math.PI / 2 + a, Math.PI * 7 / 6 - a, undefined, true);
        this.circleArrow(O, r, Math.PI * 7 / 6 + a, Math.PI * 11 / 6 - a, undefined, true);
        this.restore();

        this.save();
        this.translate(O);
        this.line($V([-d, 0]), $V([d, 0]));
        this.text(this.vector2DAtAngle(Math.PI * 7 / 6).x(r), O, "TEX:$\\hat\\imath$");
        this.text(this.vector2DAtAngle(Math.PI * 11 / 6).x(r), O, "TEX:$\\hat\\jmath$");
        this.text(this.vector2DAtAngle(Math.PI / 2).x(r), O, "TEX:$\\hat{k}$");
        this.circleArrow(O, r, Math.PI / 2 - a, -Math.PI / 6 + a, undefined, true);
        this.circleArrow(O, r, Math.PI * 7 / 6 - a, Math.PI / 2 + a, undefined, true);
        this.circleArrow(O, r, Math.PI * 11 / 6 - a, Math.PI * 7 / 6 + a, undefined, true);
        this.restore();

        this.save();
        this.translate($V([3, -0.3]));
        this.arrow(O, ei3);
        this.arrow(O, ej3);
        this.arrow(O, ek3);
        this.labelLine(O, ei3, $V([1, 1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, ej3, $V([1, -1]), "TEX:$\\hat\\jmath$");
        this.labelLine(O, ek3, $V([1, 1]), "TEX:$\\hat{k}$");
        this.setProp("shapeStrokeWidthPx", 1);
        this.polyLine([ei3q, ei3q.add(ej3q), ej3q]);
        this.polyLine([ej3q, ej3q.add(ek3q), ek3q]);
        this.polyLine([ek3q, ek3q.add(ei3q), ei3q]);
        this.restore();
    });

    rvv_fx_c = new PrairieDraw("rvv-fx-c", function() {
        this.setUnits(8, 4);

        var O = $V([0, 0]);
        var a = $V([4, 0]);
        var b = $V([2, 2]);
        var aColor = "red";
        var bColor = "blue";

        this.translate($V([-3, -1]));

        this.arrow(O, a, aColor);
        this.labelLine(O, a, $V([0, -1]), "TEX:$\\vec{a}$");

        this.arrow(O, b, bColor);
        this.labelLine(O, b, $V([0, 1]), "TEX:$\\vec{b}$");

        this.arrow(b, b.add(a), aColor);
        this.labelLine(b, b.add(a), $V([0, 1]), "TEX:$\\vec{a}$");

        this.arrow(a, a.add(b), bColor);
        this.labelLine(a, a.add(b), $V([0, -1]), "TEX:$\\vec{b}$");

        this.text(O, $V([-3, -1]), "TEX:$\\theta$");

        this.line(b, $V([b.e(1), 0]), "darkgreen");
        this.labelLine(b, $V([b.e(1), 0]), $V([0.3, -1.1]), "TEX:$b \\sin\\theta$");
        this.rightAngle($V([b.e(1), 0]), $V([0, 1]));

        this.text($V([3.3, 1]), $V([0, 0]), "TEX:$A = a b \\sin\\theta$");
    });

    rvv_fm_c = new PrairieDraw("rvv-fm-c", function() {
        this.setUnits(8, 4);

        var O = $V([0, 0]);
        var a = $V([1.7, 2.8]);
        var b = $V([5, 3]);
        var ap = b.toUnitVector().x(a.dot(b) / b.modulus());
        var ac = a.subtract(ap);
        var aColor = "red";
        var bColor = "blue";

        this.translate($V([-2, -1.5]));

        this.arrow(O, a, aColor);
        this.labelLine(O, a, $V([0, 1]), "TEX:$\\vec{a}$");

        this.arrow(O, b, bColor);
        this.labelLine(O, b, $V([0.7, -1.4]), "TEX:$\\vec{b}$");

        this.text(O, $V([-3.5, -2.5]), "TEX:$\\theta$");

        this.arrow(O, ap, "darkred");
        this.labelLine(O, ap, $V([0, -1.2]), "TEX:$\\operatorname{Proj}(\\vec{a},\\vec{b})$");

        this.arrow(O, ac, "darkgreen");
        this.arrow(ap, a, "darkgreen");
        this.labelLine(O, ac, $V([1, -1]), "TEX:$\\operatorname{Comp}(\\vec{a},\\vec{b})$");

        this.rightAngle(O, b);
        this.rightAngle(ap, ac);
    });

    $( window ).on( "resize", function() {
        rvv_fc_c.redraw();
        rvv_fp1_c.redraw();
        rvv_fp2_c.redraw();
        rvv_fu_c.redraw();
        rvv_fl_c.redraw();
        rvv_fn_c.redraw();
        rvv_eo_c.redraw();
        rvv_fx_c.redraw();
        rvv_fm_c.redraw();
    });
});