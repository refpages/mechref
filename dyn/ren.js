$(document).ready(function() {
    var ren_xgp_c = new PrairieDraw("ren-xgp-c", function() {

        this.setUnits(6, 4);

        var O = $V([0, 0]);

        this.rectangle(1, 1, O);
        this.text(O, O, "TEX:$m$");
        this.arrow($V([-1.5, 0.5]), $V([-1.5, -0.5]), "acceleration");
        this.labelLine($V([-1.5, 0.5]), $V([-1.5, -0.5]), $V([1, 0]), "TEX:$g$");      
    });

    var ren_xsp_c = new PrairieDraw("ren-xsp-c", function() {

        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var springStart = $V([-2.8, -1.3]);
        var segmentNumber = 20;
        var spacing = 0.08;
        var segmentStart = springStart.add($V([0.2, 0]));
        var xStart = segmentStart.e(1);
        var yStart = segmentStart.e(2);

        this.ground(O.add($V([0.2, -1.8])), $V([0, 1]), 6);
        this.ground(O.add($V([-2.8, 0.2])), $V([1, 0]), 4);
        this.line(springStart, segmentStart);

        for (var n = 0; n < segmentNumber; n++) {
            var x = xStart + spacing;
            var y;

            if (n % 2 == 0) {
                y = yStart - 0.15;
            }
            else {
                y = springStart.e(2);
            };

            this.line($V([xStart, yStart]), $V([x, y]));
            xStart = x;
            yStart = y;
        };

        this.line($V([xStart, yStart]), $V([xStart + 0.2, yStart]));
        this.rectangle(1, 1, O.subtract($V([0.28, 1.3])));
        this.text(O.subtract($V([0.28, 1.3])), O, "TEX:$m$");
    });

    var ren_cf_c = new PrairieDraw("ren-cf-c", function() {

        this.setUnits(8, 4);

        var O = $V([0, 0]);

        var A = $V([-3, -1]);
        var B = A.x(-1);

        this.save();
        this.text(A, O.subtract($V([-1, -1])), "TEX:$A$");
        this.text(B, O.subtract($V([1, 1])), "TEX:$B$");
        this.setProp('shapeOutlineColor', "rgb(0, 0, 255)");
        this.line(A, B);
        this.restore();
        this.setProp('shapeOutlineColor', "rgb(255, 0, 0)");
        this.cubicBezier(A, O, O.add($V([-2, 2])), B);
        this.restore();
        this.setProp('shapeOutlineColor', "rgb(0, 200, 0)");
        this.cubicBezier(A, O, O.add($V([-2, -3])), B);
        this.setProp("pointRadiusPx", 4);
        this.setProp('shapeOutlineColor', "rgb(0, 0, 0)");
        this.point(A);
        this.point(B);
    });
});