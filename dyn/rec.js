$(document).ready(function() {
    var rec_xr_c = new PrairieDraw("rec-xr-c", function() {

        this.setUnits(12, 4);
        
        var O = $V([0,0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var O_P = $V([-5.5, -1.5]);

        // Drawing the origin and basis vectors
        this.text(O_P.add($V([-0.2, -0.2])), $V([-1, 0]), "TEX:$O$");
        this.arrow(O_P, O_P.add(ei));
        this.arrow(O_P, O_P.add(ej));
        this.labelLine(O_P, O_P.add(ei), $V([1, 0]), "TEX:$\\hat\\imath$");
        this.labelLine(O_P, O_P.add(ej), $V([1, 0]), "TEX:$\\hat\\jmath$");

        // Drawing rocket body
        this.line(ei.x(-1), O.add(ei));
        this.line(ei.x(-1), ei.x(-1).add(ej));
        this.line(ei.x(-1).add(ej), $V([1, 1]));

        // Drawing rocket nose
        this.line($V([1, 1]), $V([1.2, 0.8]));
        this.line(ei, $V([1.2, 0.2]));

        this.line($V([1.2, 0.8]), $V([2.2, 0.8]));
        this.line($V([1.2, 0.2]), $V([2.2, 0.2]));

        this.line($V([2.2, 0.8]), $V([2.5, 0.5]));
        this.line($V([2.2, 0.2]), $V([2.5, 0.5]));

        // Drawing rocket nozzle
        this.setProp("shapeInsideColor", "rgb(0,0,0)");
        this.polyLine([$V([-1.4, 0.1]), $V([-1, 0.3]), $V([-1, 0.7]), $V([-1.4, 0.9])], true, true);

        // Drawing rocket burn
        this.setProp("shapeInsideColor", "rgb(230,230,230");
        this.polyLine([$V([-3, -0.2]), $V([-1.4, 0.1]), $V([-1.4, 0.9]), $V([-3, 1.2])], true, true);

        // Drawing effective exhaust velocity and velocity of the rocket vectors
        this.text($V([0, 0.5]), $V([-1, 0]), "TEX:$m$");
        this.arrow($V([2.7, 0.5]), $V([4, 0.5]), "velocity");
        this.labelLine($V([2.7, 0.5]), $V([4, 0.5]), $V([0, 1]), "TEX:$\\vec{v}$");
        this.arrow($V([-1.6, 0.5]), $V([-2.6, 0.5]), "velocity");
        this.labelLine($V([-1.6, 0.5]), $V([-2.6, 0.5]), $V([0, -1]), "TEX:$\\vec{c}$");
    });

    var rec_co_c = new PrairieDrawAnim("rec-co-c", function(t) {

        var xViewMax = 6;
        var yViewMax = 2;
        var xWorldMax = xViewMax * 1.1;
        var yWorldMax = yViewMax * 1.1;

        var r1x = -4;
        var r1y = -1.55;
        var r2x = -2;
        var v2x = -1;
        var groundX = -5.6;

        var O = $V([0,0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var width_m1 = 0.5;
        var height_m1 = width_m1;

        var P = $V([-5.8, r1y])

        var coll = 0;
        dt = this.deltaTime();

        this.setUnits(2*xViewMax, 2*yViewMax);

        this.addOption("r1", $V([r1x, r1y]));
        this.addOption("r2", $V([r2x, r1y]));
        this.addOption("v1", $V([0, 0]));
        this.addOption("v2", $V([v2x, 0]));

        this.addOption("m2", "m21");

        var m1 = 10;
        var m2 = 10000000;

        var r1 = this.getOption("r1");
        var v1 = this.getOption("v1");
        var r2 = this.getOption("r2");
        var v2 = this.getOption("v2");

        if (dt > 0 && dt < 0.1) {
            // Check wall collision
            if (r1.e(1) - width_m1/2 <= P.e(1)) {
                r1 = $V([P.e(1) + width_m1/2,r1y])
                coll++;
                v1 = v1.x(-1);
            };
            // Check blocks collision
            if (r1.e(1) + width_m1 >= r2.e(1)) {
                r1 = $V([r2.e(1) - width_m1, r1y]);

                p1 = m1*v1.e(1) + m2*v2.e(1);

                v2fx = (m1 * v2.e(1) - m1 * v1.e(1) - p1)/(-1 * m2 - m1);
                v1fx = v2.e(1) + v2fx - v1.e(1);

                v1 = $V([v1fx, 0]);
                v2 = $V([v2fx, 0]);
                coll++;
            };
            r1 = r1.add(v1.x(dt));
            r2 = r2.add(v2.x(dt));
            this.setOption("r1", r1, false);
            this.setOption("v1", v1, false);
            this.setOption("r2", r2, false);
            this.setOption("v2", v2, false);
        };
        
        this.save();
        this.ground($V([0.2, -1.8]), ej, 12);
        this.ground($V([-5.8, 0.2]), ei, 4);
        this.rectangle(width_m1, height_m1, r1);
        this.rectangle(width_m1, height_m1, r2);
        
    });
});