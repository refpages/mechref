$(document).ready(function() {

    /********************************************************************************/
    rvp_fc_c = new PrairieDraw("rvp-fc-c", function() {
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
        this.text($V([2, 1]), $V([-1.2, 0]), "TEX: $x = 2$ \\\\ $y = 1$");
        this.restore();

        this.save();
        this.setProp("shapeOutlineColor", "blue");
        this.setProp("pointRadiusPx", 4);
        this.line($V([0, 0]), $V([-3, 0]));
        this.line($V([-3, 0]), $V([-3, 2]));
        this.point($V([-3, 2]));
        this.text($V([-3, 2]), $V([-1.2, 0]), "TEX: $x = -3$ \\\\ $y = 2$");
        this.restore();

        this.save();
        this.setProp("shapeOutlineColor", "red");
        this.setProp("pointRadiusPx", 4);
        this.line($V([0, 0]), $V([0, -2]));
        this.point($V([0, -2]));
        this.text($V([0, -2]), $V([-1.2, 0]), "TEX: $x = 0$ \\\\ $y = -2$");
        this.restore();
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

    $( window ).on( "resize", function() {
        rvp_fc_c.redraw();
        rvv_fb_c.redraw();
        rvv_f3_c.redraw();
    })
}); // end of document.ready()
