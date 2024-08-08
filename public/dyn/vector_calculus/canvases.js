$(document).ready(function(){
    rvv_ed_c = new PrairieDraw("rvv-ed-c", function() {
        this.setUnits(5, 3);
        this.translate($V([-2, -1]));
        this.addOption("angles", false);
        this.addOption("components", false);
                
        if (this.getOption("angles")) {
            this.line($V([-2, 0]), $V([5, 0]));
            this.line($V([0, -2]), $V([0, 3]));
        }
                
        var O = $V([0, 0]);
        var A = $V([4, 1]);
        var B = $V([2, 2]);
                
        var Ab = $V([A.e(1), 0]);
        var Bb = $V([B.e(1), 0]);
                
        var aType = "position";
        var bType = "angMom";
                
        this.arrow(O, A, aType);
        this.labelLine(O, A, $V([0.5, 1]), "TEX:$\\vec{a}$");
        this.arrow(O, B, "angMom");
        this.labelLine(O, B, $V([0, 1]), "TEX:$\\vec{b}$");
                
        var theta_a = this.angleOf(A);
        var theta_b = this.angleOf(B);
                
        this.circleArrow(O, 2, theta_a, theta_b);
        this.labelCircleLine(O, 2, theta_a, theta_b, $V([0, 1]), "TEX:$\\theta$");
        if (this.getOption("angles")) {
            this.circleArrow(O, 1.5, 0, theta_a, aType);
            this.labelCircleLine(O, 1.5, 0, theta_a, $V([0, 1]), "TEX:$\\theta_a$");
            this.circleArrow(O, 1, 0, theta_b, bType);
            this.labelCircleLine(O, 1, 0, theta_b, $V([0.5, 1]), "TEX:$\\theta_b$");
        }
                
        if (this.getOption("components")) {
            this.line(O, Ab, aType);
            this.labelLine(O, Ab, $V([0.5, -1]), "TEX:$a_1$");
                
            this.line(Ab, A, aType);
            this.labelLine(Ab, A, $V([0, -1]), "TEX:$a_2$");
                
            this.line(O, $V([B.e(1), 0]), bType);
            this.labelLine(O, Bb, $V([0, -1]), "TEX:$b_1$");
                
            this.line(Bb, B, bType);
            this.labelLine(Bb, B, $V([0, -1]), "TEX:$b_2$");
        }
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
})