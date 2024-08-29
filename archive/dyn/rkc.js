$(document).ready(function() {
    var rkc_cm_c = new PrairieDrawAnim("rkc-cm-c", function(t) {
        this.setUnits(6, 6)

        this.addOption("showLabels", true);
        this.addOption("movement", "rodCircle");
        this.addOption("showVelocity", false);
        this.addOption("showBPath", false);
        this.addOption("showBTrace", true);
        this.addOption("flipSystem", false);
        this.addOption("showQTrace", true);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        dt = this.deltaTime();

        if (this.getOption("movement") === "sliderCrank") {
            this.addOption("vC", $V([0.5, 0]));
            this.addOption("rC", $V([2, -0.3/2]));
            this.addOption("rB", $V([-1, 0.5]));
            
            if (this.getOption("flipSystem")) {
                this.rotate(Math.PI/2)
            }
            var wC = 0.5;
            var hC = 0.3;
            var rC = this.getOption("rC");
            var vC = this.getOption("vC");
            var rB = this.getOption("rB");
            var rA = $V([-1.5, -0.4]);
            var rBC = rC.subtract(rB);
            var rAB = rB.subtract(rA);
            var r = (rA.subtract(rB)).modulus();

            this.addOption("vB", $V([vC.e(1)*(-rA.e(2) * rB.e(1) + rA.e(2) * rC.e(1) + rB.e(1) * rB.e(2) - rB.e(2) * rC.e(1))/(rA.e(1) * rB.e(2) - rA.e(1) * rC.e(2) - rA.e(2) * rB.e(1) + rA.e(2) * rC.e(1) + rB.e(1) * rC.e(2) - rB.e(2) * rC.e(1)), 
            vC.e(1)*(rA.e(1) * rB.e(1) - rA.e(1) * rC.e(1) - rB.e(1) * rB.e(1) + rB.e(1) * rC.e(1))/(rA.e(1) * rB.e(2) - rA.e(1) * rC.e(2) - rA.e(2) * rB.e(1) + rA.e(2) * rC.e(1) + rB.e(1) * rC.e(2) - rB.e(2) * rC.e(1))]));
            var vB = this.getOption("vB");

            this.ground($V([2, 0]), ej.x(-1), 1.2);
            this.ground($V([2, -0.3]), ej, 1.2);
            this.rectangle(wC, hC, $V([rC.e(1), rC.e(2)]));
            this.ground(rA.subtract($V([0, 0.15])), ej, 0.3);
            this.pivot(rA.subtract($V([0, 0.15])), rA, 0.15);
            this.rod(rA, rB, 0.1);
            this.rod(rB, rC, 0.1);
            this.point(rA);
            this.point(rB);
            this.point(rC);

            if (this.getOption("showLabels")) {
                this.text(rA, ei.x(1.5), "TEX:$A$");
                var tang = this.perp(rAB);
                this.labelIntersection(rB, [rA, rC, rB.add(tang), rB.subtract(tang), rB.add(vB)], "TEX:$B$", 1.4);
                this.labelIntersection(rC, [rB, rC.add(ej), rC.subtract(ej), rC.add(vC)], "TEX:$C$", 1.6);
            }

            if (this.getOption("showBTrace")) {
                rBHistory = this.history("rB", 0.05, 4*Math.PI + 0.05, t, rB);
                rBTrace = this.historyToTrace(rBHistory);
                this.save();
                this.setProp("shapeOutlineColor", "rgb(0, 0, 255)");
                this.polyLine(rBTrace);
                this.restore();
            }

            if (this.getOption("showBPath")) {
                this.save();
                this.setProp("shapeStrokeWidthPx", 1);
                this.setProp("shapeOutlineColor", "rgb(200, 200, 200)");
                this.circle(rA, r, false);
                this.restore();
            }

            if (this.getOption("showVelocity")){
                this.arrow(rB, rB.add(vB), "velocity");
                this.arrow(rC, rC.add(vC), "velocity");
                if (this.getOption("showLabels")) {
                    this.labelLine(rB, rB.add(vB), ei, "TEX:$\\vec{v}_B$");
                    this.labelLine(rC, rC.add(vC), ei, "TEX:$\\vec{v}_C$");
                }
            }
        } else if (this.getOption("movement") === "rodCircle") {
            var omegaRod = 0.8;
            var omegaP = 1/2;
            var rodLength = 1;

            var PAngle = omegaP*t + Math.PI/4;
            var rodAngle = omegaRod*t - Math.PI/6;

            var rP = $V([1.45, 0]).rotate(PAngle, O);
            var vP = this.perp(rP).x(omegaP);

            var rPQ = $V([rodLength, 0]).rotate(rodAngle, O);
            var rQ = rPQ.add(rP);
            var vQ = vP.add(this.cross2D(omegaRod, rPQ));
            
            this.circle(O, 1.5);
            this.circle(O, 1.4);
            this.pivot(O.subtract($V([0, 0.15])), O, 0.15);
            this.ground(O.subtract($V([0, 0.15])), ej, 0.3);
            this.rod(rP, rQ, 0.1);
            this.point(O);
            this.point(rP);
            this.point(rQ);

            if (this.getOption("showVelocity")) {
                this.arrow(rP, rP.add(vP), "velocity");
                this.arrow(rQ, rQ.add(vQ), "velocity");
                if (this.getOption("showLabels")) {
                    this.labelLine(rP, rP.add(vP), ei, "TEX:$\\vec{v}_P$");
                    this.labelLine(rQ, rQ.add(vQ), ei, "TEX:$\\vec{v}_Q$");
                }
            }

            if (this.getOption("showLabels")) {
                this.text(O, $V([1, -1]), "TEX:$O$");
                this.labelIntersection(rP, [rQ, rP.add(vP)], "TEX:$P$", 1.5);
                this.labelIntersection(rQ, [rP, rQ.add(vQ)], "TEX:$Q$", 1.5);
            }

            if (this.getOption("showQTrace")) {
                rQHistory = this.history("rQ", 0.05, 4*Math.PI + 0.05, t, rQ);
                rQTrace = this.historyToTrace(rQHistory);
                this.save();
                this.setProp("shapeOutlineColor", "rgb(0, 0, 255)");
                this.polyLine(rQTrace);
                this.restore(); 
            }
        }

        if (dt > 0 && dt < 0.1) {
            if (this.getOption("movement") === "sliderCrank") {
                if (rC.e(1) + wC/2 > 2 + 1.2/2 || rC.e(1) - wC/2 < 2 - 1.2/2) {
                    vC = vC.x(-1)
                }
                rC = rC.add(vC.x(dt));
                vB = $V([vC.e(1)*(-rA.e(2) * rB.e(1) + rA.e(2) * rC.e(1) + rB.e(1) * rB.e(2) - rB.e(2) * rC.e(1))/(rA.e(1) * rB.e(2) - rA.e(1) * rC.e(2) - rA.e(2) * rB.e(1) + rA.e(2) * rC.e(1) + rB.e(1) * rC.e(2) - rB.e(2) * rC.e(1)), 
                vC.e(1)*(rA.e(1) * rB.e(1) - rA.e(1) * rC.e(1) - rB.e(1) * rB.e(1) + rB.e(1) * rC.e(1))/(rA.e(1) * rB.e(2) - rA.e(1) * rC.e(2) - rA.e(2) * rB.e(1) + rA.e(2) * rC.e(1) + rB.e(1) * rC.e(2) - rB.e(2) * rC.e(1))])
                rB = rB.add(vB.x(dt));
                this.setOption("rC", rC, false);
                this.setOption("vC", vC, false);
                this.setOption("rB", rB, false);
                this.setOption("vB", vB, false);

            }
        }
    });

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

    var rkc_xlc_c = new PrairieDraw("rkc-xlc-c", function() {

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

    var rkc_xtp_c = new PrairieDraw("rkc-xtp-c", function() {
        
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
        this.arrow($V([-1, 1]), $V([-1, 0]), "acceleration");
        this.text(O.add($V([0.2, -1.25])), O, "TEX:$m_1$");
        this.text(O.add($V([1.4, -0.35])), O, "TEX:$m_2$");
        this.text(O.add($V([0.2, -0.35])), ej.x(-2.7), "TEX:$A$");
        this.text(O.add($V([1, 0.8])), $V([1/2, -Math.sqrt(3)/2]).x(3), "TEX:$B$");
        this.labelLine($V([-1, 1]), $V([-1, 0]), ei, "TEX:$\\vec{g}$");
    });

    var rkc_xtp_sa = new PrairieDraw("rkc-xtp-sa", function() {
        
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.circle(O, 0.4, false);
        this.arrow($V([0.4, 0]), $V([0.4, 1]), "force");
        this.arrow($V([-0.4, 0]), $V([-0.4, 1]), "force");
        this.arrow($V([0, -0.4]), $V([0, -1.4]), "force");
        this.labelLine($V([0.4, 0]), $V([0.4, 1]), ei, "TEX:$\\vec{T}$");
        this.labelLine($V([-0.4, 0]), $V([-0.4, 1]), ei, "TEX:$\\vec{T}$");
        this.labelLine($V([0, -0.4]), $V([0, -1.4]), ei, "TEX:$\\vec{T}_2$");
    });

    var rkc_xtp_s1 = new PrairieDraw("rkc-xtp-s1", function() {
        
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.rectangle(0.5, 0.5, O, false, false);
        this.arrow(O, O.add(ej), "force");
        this.arrow(O, O.add(ej.x(-1)), "force");
        this.labelLine(O, O.add(ej), ei, "TEX:$\\vec{T}_2$");
        this.labelLine(O, O.add(ej.x(-1)), ei, "TEX:$m\\vec{g}$");
    });

    var rkc_xtp_s2 = new PrairieDraw("rkc-xtp-s2", function() {
        
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.rectangle(0.5, 0.5, O, false, false);
        this.arrow(O, O.add(ej), "force");
        this.arrow(O, O.add(ej.x(-1)), "force");
        this.labelLine(O, O.add(ej), ei, "TEX:$\\vec{T}$");
        this.labelLine(O, O.add(ej.x(-1)), ei, "TEX:$m\\vec{g}$");
    });
});