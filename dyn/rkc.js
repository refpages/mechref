$(document).ready(function() {
    var rkc_xcl_c = new PrairieDraw("rkc-xcl-c", function() {

        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.ground(O.subtract($V([0, 1])), ej, 4);
        this.ground(O.subtract($V([2, 0])), ei, 2);
        this.rod(O.subtract($V([0, 0.9])), O.subtract($V([1.9, 0])), 0.2);
        this.point(O.subtract($V([0, 0.9])));
        this.point(O.subtract($V([1.9, 0])));
        this.point($V([-2, -1]));
        this.text(O.subtract($V([0, 0.9])), $V([-1, -1]), "TEX:$P$");
        this.text(O.subtract($V([1.9, 0])), $V([-1, -1]), "TEX:$Q$");
        this.text($V([-2, -1]), $V([1, 1]), "TEX:$O$");
        this.labelLine(O.subtract($V([0, 0.9])), O.subtract($V([1.9, 0])), $V([0, -1.5]), "TEX:$\\ell$");  
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
        this.line(O.add($V([0.2, -0.35])), O.add($V([0.2, -1])));
        this.rectangle(0.5, 0.5, O.add($V([0.2, -1.25])));
        this.rectangle(0.7, 0.7, O.add($V([1.4, -0.35])));
        this.text(O.add($V([0.2, -1.25])), O, "TEX:$m_1$");
        this.text(O.add($V([1.4, -0.35])), O, "TEX:$m_2$");
        this.text(O.add($V([0.2, -0.35])), ej.x(-2.7), "TEX:$A$");
        this.text(O.add($V([1, 0.8])), $V([1/2, -Math.sqrt(3)/2]).x(3), "TEX:$B$");
    });

    var rkc_xcp_cs = new PrairieDraw("rkc-xcp-cs", function() {
        
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
        this.line(O.add($V([0.2, -0.35])), O.add($V([0.2, -1])));
        this.rectangle(0.5, 0.5, O.add($V([0.2, -1.25])));
        this.rectangle(0.7, 0.7, O.add($V([1.4, -0.35])));
        this.text(O.add($V([0.2, -1.25])), O, "TEX:$m_1$");
        this.text(O.add($V([1.4, -0.35])), O, "TEX:$m_2$");
        this.save();
        this.setProp("shapeStrokePattern", 'dashed');
        this.line(O.add($V([-2.5, 1.2])), O.add($V([2.5, 1.2])));
        this.restore();
        this.arrow(O.add($V([-0.6,1.2])), O.add($V([-0.6, -0.35])));
        this.arrow(O.add($V([2, 1.2])), O.add($V([2, -0.35])));
        this.labelLine(O.add($V([-0.6,1.2])), O.add($V([-0.6, -0.35])), ej.x(-1.2), "TEX:$y_1$");
        this.labelLine(O.add($V([2, 1.2])), O.add($V([2, -0.35])), ej.x(1.2), "TEX:$y_2$");
    });

    var rkc_xcf_c = new PrairieDraw("rkc-xcf-c", function() {

        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var phi = 2*Math.PI - Math.atan(1.9, 0.9);

        this.ground(O.subtract($V([0, 1])), ej, 4);
        this.ground(O.subtract($V([2, 0])), ei, 2);
        this.rod(O.subtract($V([0, 0.9])), O.subtract($V([1.9, 0])), 0.2);
        this.arrow($V([2, 1]), $V([2, 0]), "acceleration");
        this.circleArrow($V([-1.9, 0]), 0.4, 3*Math.PI/2 - 0.2, phi + 0.3);
        this.point(O.subtract($V([0, 0.9])));
        this.point(O.subtract($V([1.9, 0])));
        this.point($V([-1.9/2, -0.9/2]));
        this.point($V([-2, -1]));
        this.text(O.subtract($V([0, 0.9])), $V([-1, -1]), "TEX:$P$");
        this.text(O.subtract($V([1.9, 0])), $V([-1, -1]), "TEX:$Q$");
        this.text($V([-2, -1]), $V([1, 1]), "TEX:$O$");
        this.text($V([-1.9/2, -0.9/2]), ej.x(1.5), "TEX:$C$");
        this.labelLine($V([2, 1]), $V([2, 0]), ei, "TEX:$\\vec{g}$");
        this.labelLine(O.subtract($V([0, 0.9])), O.subtract($V([1.9, 0])), $V([0, -1.5]), "TEX:$\\ell$");
        this.labelCircleLine($V([-1.9, 0]), 0.4, 3*Math.PI/2 - 0.2, phi + 0.3, ej, "TEX:$\\phi$");
    });

    var rkc_xcf_s = new PrairieDraw("rkc-xcf-s", function() {

        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var phi = Math.PI/2 - Math.atan(1.9, 0.9);
        var l = Math.sqrt(0.9*0.9 + 1.9*1.9);

        rP = $V([l/2*Math.cos(phi), -l/2*Math.sin(phi)]);
        rQ = $V([-l/2*Math.cos(phi), l/2*Math.sin(phi)]);

        this.rod(rP, rQ, 0.2);
        this.point(rP);
        this.point(rQ);
        this.point(rP.add(rQ).x(0.5));
        this.arrow(rP, rP.add(ej), "force");
        this.arrow(rQ, rQ.add(ei), "force");
        this.arrow(O, O.subtract(ej), "force");
        this.labelLine(rP, rP.add(ej), ei, "TEX:$\\vec{F}_P$");
        this.labelLine(rQ, rQ.add(ei), ei, "TEX:$\\vec{F}_Q$");
        this.labelLine(O, O.subtract(ej), ei, "TEX:$m\\vec{g}$");
    });
});