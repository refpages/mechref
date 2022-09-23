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
});