$(document).ready(function() {
    var rkc_xcl_c = new PrairieDraw("rkc-xcl-c", function() {

        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.ground(O.subtract($V([0, 1])), ej, 4);
        this.ground(O.subtract($V([2, 0])), ei, 2);
        this.save();
        this.setProp("shapeOutlineColor", this.getProp("positionColor"));
        this.setProp("shapeStrokeWidthPx", 4);
        this.line(O.subtract($V([0, 0.95])), O.subtract($V([2, 0])));
        this.labelLine(O.subtract($V([0, 1])), O.subtract($V([2, 0])), $V([0, -1.3]), "TEX:$\\ell$");
        this.restore();    
    });

    var rkc_xcp_c = new PrairieDraw("rkc-xcp-c", function() {
        
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.ground(O.add(ej.x(1.5)), ej.x(-1), 4);
        this.circle(O.add($V([1, 0.8])), 0.4);
        this.circle(O.add($V([0.2, -0.35])), 0.35);
        this.save();
        this.setProp("shapeOutlineColor", this.getProp("positionColor"));
        this.setProp("shapeStrokeWidthPx", 3.5);
        this.arc(O.add($V([1, 0.8])), 0.4, 0, Math.PI);
        this.line(O.add($V([1.4, 0.8])), O.add($V([1.4, 0])));
        this.line(O.add($V([-0.2, 1.5])), O.add([-0.2, -0.3]));
        this.arc(O.add($V([0.2, -0.3])), 0.4, Math.PI, 0);
        this.line(O.add($V([0.6, -0.3])), O.add($V([0.6, 0.8])));
        this.restore();
        this.pivot(O.add($V([1, 1.5])), O.add($V([1, 0.8])), 0.2);
    });
});