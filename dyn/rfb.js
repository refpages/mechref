$(document).ready(function () {
    var rfb_xpm_c = new PrairieDraw("rfb-xpm-c", function() {
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var en = this.vector2DAtAngle(Math.PI/3);
        var et = this.perp(en).x(-1);

        this.ground(O, en, 50);
        this.rectangle(0.6, 0.6, O.add(en.x(0.3)).subtract(et.x(1.2)), Math.PI/3, true);
        this.arrow($V([2, 1]), $V([2, 0]), "acceleration");
        this.save();
        this.setProp("shapeStrokePattern", "dashed");
        this.line(O.add(et.x(2)), O.add(et.x(2)).subtract(ei.x(2)));
        this.restore();
        this.circleArrow(O.add(et.x(2)), 1, Math.PI, 5*Math.PI/6);
        this.text(O.add(en.x(0.3)).subtract(et.x(1.2)), O, "TEX:$m$");
        this.labelLine($V([2, 1]), $V([2, 0]), ei, "TEX:$g$");
        this.labelCircleLine(O.add(et.x(2)), 1, Math.PI, 5*Math.PI/6, ej.x(2).subtract(ei), "TEX:$\\theta$");
    });

    var rfb_xpm_f = new PrairieDraw("rfb-xpm-f", function() {
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var en = this.vector2DAtAngle(Math.PI/3);
        var et = this.perp(en).x(-1);

        this.save();
        this.setProp("shapeInsideColor", "rgb(0, 0, 0)");
        this.circle(O, 0.1, true);
        this.restore();
        this.arrow($V([-2.5, 0.5]), $V([-2.5, 0.5]).add(et));
        this.arrow($V([-2.5, 0.5]), $V([-2.5, 0.5]).add(en));
        this.arrow(O, O.subtract(ej), "force");
        this.arrow(O, O.add(en), "force");
        this.arrow(O, O.add(et), "force");
        this.labelLine(O, O.subtract(ej), ei, "TEX:$mg$");
        this.labelLine(O, O.add(en), ei, "TEX:$N$");
        this.labelLine(O, O.add(et), ei, "TEX:$F_s$");
        this.labelLine($V([-2.5, 0.5]), $V([-2.5, 0.5]).add(et), ei, "TEX:$\\hat{e}_t$");
        this.labelLine($V([-2.5, 0.5]), $V([-2.5, 0.5]).add(en), ei, "TEX:$\\hat{e}_n$");
    });

    var rfb_xcm_c = new PrairieDrawAnim("rfb-xcm-c", function(t) {
        this.setUnits(6, 4);
        this.addOption("showBasis", false);

        dt = this.deltaTime();

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var omega = 0.8;
        var theta = omega*t + Math.PI/4;
        var r = 1.3;
        
        var rP = $V([r, 0]).rotate(theta, O);
        var er = this.vector2DAtAngle(theta);
        var etheta = this.perp(er);

        this.startAnim();

        this.circle(O, r, false);
        this.save();
        this.setProp("shapeInsideColor", "rgb(0, 0, 0)");
        this.circle(er.x(r), 0.1, true);
        this.restore();
        var thetaArrow = this.fixedMod(theta, 2 * Math.PI);
        this.arrow(O, O.add(rP), "position");
        this.circleArrow(O, 0.5, 0, thetaArrow, undefined, true);
        this.setProp("shapeStrokePattern", "dashed");
        this.line(O, O.add(ei));
        this.restore();
        this.point(O);
        this.labelIntersection(O, [O, O.add(rP), O.add(ei)], "TEX:$O$");
        this.labelCircleLine(O, 0.5, 0, thetaArrow, ej, "TEX:$\\theta$");
        this.labelLine(O, O.add(rP), $V([-1/4, 1]), "TEX:$\\vec{r}$");
        if (this.getOption("showBasis")) {
            this.arrow(rP, rP.add(er));
            this.arrow(rP, rP.add(etheta));
            this.labelLine(rP, rP.add(er), ei, "TEX:$\\hat{e}_r$");
            this.labelLine(rP, rP.add(etheta), ei, "TEX:$\\hat{e}_\\theta$");
        };
    });

    var rfb_xcm_f = new PrairieDraw("rfb-xcm-f", function() {
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var theta = Math.PI/6;
        
        var er = this.vector2DAtAngle(theta);
        var etheta = this.perp(er);

        this.save();
        this.setProp("shapeInsideColor", "rgb(0, 0, 0)");
        this.circle(O, 0.1, true);
        this.restore();
        this.arrow(O, O.subtract(er.x(1.5)), "force");
        this.arrow(O, O.add(er.add(etheta)), "force");
        this.arrow($V([-2, 0.5]), $V([-2, 0.5]).add(er));
        this.arrow($V([-2, 0.5]), $V([-2, 0.5]).add(etheta));
        this.labelLine($V([-2, 0.5]), $V([-2, 0.5]).add(er), ei, "TEX:$\\hat{e}_r$");
        this.labelLine($V([-2, 0.5]), $V([-2, 0.5]).add(etheta), ei, "TEX:$\\hat{e}_\\theta$");
        this.labelLine(O, O.subtract(er.x(1.5)), ei, "TEX:$mg$");
        this.labelLine(O, O.add(er.add(etheta)), ei, "TEX:$F$");
    });

    var rfb_xrs_c = new PrairieDraw("rfb-xrs-c", function() {
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        
        this.save();
        this.ground(ej.x(-1), ej, 100);
        this.circle(O, 1);
        this.arrow(ej, ej.add($V([0.5, 0.5])), "force");
        this.arrow($V([2, 1]), $V([2, 0]), "acceleration");
        this.point(ej);
        this.point(O);
        this.point(ej.x(-1));
        this.labelLine($V([2, 1]), $V([2, 0]), ei, "TEX:$g$");
        this.labelLine(ej, ej.add($V([0.5, 0.5])), ei, "TEX:$F$");
        this.labelIntersection(ej, [ej.add($V([0.5, 0.5]))], "TEX:$P$");
        this.labelIntersection(O, [ej, ej.x(-1)], "TEX:$C$");
        this.text(ej.x(-1), ej.x(-1), "TEX:$Q$");
    });

    var rfb_xrs_f = new PrairieDraw("rfb-xrs-f", function() {
        this.setUnits(6, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        
        this.save();
        this.circle(O, 1, false);
        this.arrow(ej, ej.add($V([0.5, 0.5])), "force");
        this.arrow(O, O.subtract(ej.x(0.5)), "force");
        this.arrow(ej.x(-1), $V([0, -0.5]), "force");
        this.arrow(ej.x(-1), $V([1, -1]), "force");
        this.point(ej);
        this.point(O);
        this.point(ej.x(-1));
        this.labelLine(ej, ej.add($V([0.5, 0.5])), ei, "TEX:$F$");
        this.labelLine(O, O.subtract(ej.x(0.5)), ej, "TEX:$mg$");
        this.labelLine(ej.x(-1), $V([0, -0.5]), ej.x(-1), "TEX:$N$");
        this.labelLine(ej.x(-1), $V([1, -1]), ei, "TEX:$F_s$");
    });

    var rfb_xzf_f = new PrairieDraw("rfb-xzf-f", function() {
        this.setUnits(6, 4);

        this.addOption("stage", 0);
        this.addOption("FBD", false);

        var stage = this.getOption("stage");

        var label;

        switch(stage) {
            case 0:
                label = "TEX:\\sf Initial truss";
                break;
            case 1:
                label = "TEX:\\sf Inspect $G$";
                break;
            case 2:
                label = "TEX:\\sf Inspect $C$";
                break;
            case 3:
                label = "TEX:\\sf Inspect $F$";
                break;
            case 4:
                label = "TEX:\\sf Inspect $B$";
                break;
            case 5:
                label = "TEX:\\sf Inspect $G$, $F$, $C$, $B$"
                break;
            case 6:
                label = "TEX:\\sf Simplified truss";
                break;
        };

        var optB = 0;
        var optD = 1;
        var optG = 0;

        var a = 1;

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        
        var rA = $V([0, 0]);  
		var rB = $V([-a, 0]);
		var rC = $V([-2*a, 0]); 
		var rD = $V([-3*a, 0]); 
		var rE = $V([-4*a, 0]); 
		var rF = $V([-a, a]); 
		var rG = $V([-3*a, a]); 
		var rH = $V([-2*a, 2*a]);
		var rb = rB.add(this.vector2DAtAngle(-Math.PI/4).x(.5));
		var rd = rD.add(ej.x(-.5));
		var rg = rG.add(ei.x(-.5));
		var rh = rH.add(ej.x(.5));
		
		// ghost points for bounding box
		
        var bbox = PrairieGeom.boundingBox2D([rA,rh,rE,rd]);	
		var scale = 1;
        var scale = Math.min(6 / bbox.extent.e(1), 6 / this.goldenRatio / bbox.extent.e(2));
        rA = rA.x(scale);
		rB = rB.x(scale);
        rC = rC.x(scale);
		rD = rD.x(scale);
		rE = rE.x(scale);
		rF = rF.x(scale);
		rG = rG.x(scale);
		rH = rH.x(scale);
		rb = rb.x(scale);
		rd = rd.x(scale);
		rg = rg.x(scale);
		rh = rh.x(scale);
		
        var bbox = PrairieGeom.boundingBox2D([rA,rh,rE,rd]);
       
        this.save();
        this.translate(bbox.center.x(-1));

        w = 0.1;

        switch(stage) {
            case 0:
                this.rod(rH, rF, w);
                this.rod(rH, rB, w);
                this.rod(rH, rC, w);
                this.rod(rH, rD, w);
                this.rod(rH, rG, w);

                this.rod(rA, rF, w);
                this.rod(rB, rF, w);
                this.rod(rD, rG, w);
                this.rod(rE, rG, w);
                
                this.rod(rA, rB, w);
                this.rod(rB, rC, w);
                this.rod(rC, rD, w);
                this.rod(rD, rE, w);
                break;
            case 1:
                this.save();
                this.setProp("shapeOutlineColor", "rgba(0, 0, 0, 0.3)");
                this.setProp("shapeInsideColor", "rgba(255, 255, 255, 0.3)");
                this.rod(rH, rF, w);
                this.rod(rH, rB, w);
                this.rod(rH, rC, w);
                this.rod(rH, rD, w);
                this.rod(rH, rG, w);

                this.rod(rA, rF, w);
                this.rod(rB, rF, w);
                this.rod(rE, rG, w);
                
                this.rod(rA, rB, w);
                this.rod(rB, rC, w);
                this.rod(rC, rD, w);
                this.rod(rD, rE, w);
                this.restore();
                this.rod(rD, rG, w);
                this.save();
                this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
                this.circle(rG, 0.2, false);
                this.restore();
                break;
            case 2:
                this.save();
                this.setProp("shapeOutlineColor", "rgba(0, 0, 0, 0.3)");
                this.setProp("shapeInsideColor", "rgba(255, 255, 255, 0.3)");
                this.rod(rH, rF, w);
                this.rod(rH, rB, w);
                this.rod(rH, rD, w);
                this.rod(rH, rG, w);

                this.rod(rA, rF, w);
                this.rod(rB, rF, w);
                this.rod(rE, rG, w);
                
                this.rod(rA, rB, w);
                this.rod(rB, rC, w);
                this.rod(rC, rD, w);
                this.rod(rD, rE, w);
                this.restore();
                this.rod(rH, rC, w);
                this.save();
                this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
                this.circle(rC, 0.2, false);
                this.restore();
                break;
            case 3:
                this.save();
                this.setProp("shapeOutlineColor", "rgba(0, 0, 0, 0.3)");
                this.setProp("shapeInsideColor", "rgba(255, 255, 255, 0.3)");
                this.rod(rH, rF, w);
                this.rod(rH, rB, w);
                this.rod(rH, rD, w);
                this.rod(rH, rG, w);

                this.rod(rA, rF, w);
                this.rod(rE, rG, w);
                
                this.rod(rA, rB, w);
                this.rod(rB, rC, w);
                this.rod(rC, rD, w);
                this.rod(rD, rE, w);
                this.restore();
                this.rod(rB, rF, w);
                this.save();
                this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
                this.circle(rF, 0.2, false);
                this.restore();
                break;
            case 4:
                this.save();
                this.setProp("shapeOutlineColor", "rgba(0, 0, 0, 0.3)");
                this.setProp("shapeInsideColor", "rgba(255, 255, 255, 0.3)");
                this.rod(rH, rF, w);
                this.rod(rH, rD, w);
                this.rod(rH, rG, w);

                this.rod(rA, rF, w);
                this.rod(rE, rG, w);
                
                this.rod(rA, rB, w);
                this.rod(rB, rC, w);
                this.rod(rC, rD, w);
                this.rod(rD, rE, w);
                this.restore();
                this.rod(rH, rB, w);
                this.save();
                this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
                this.circle(rB, 0.2, false);
                this.restore();
                break;
            case 5:
                this.rod(rH, rF, w);
                this.rod(rH, rD, w);
                this.rod(rH, rG, w);

                this.rod(rA, rF, w);
                this.rod(rE, rG, w);
                
                this.rod(rA, rB, w);
                this.rod(rB, rC, w);
                this.rod(rC, rD, w);
                this.rod(rD, rE, w);

                this.save();
                this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
                this.circle(rG, 0.2, false);
                this.circle(rF, 0.2, false);
                this.circle(rC, 0.2, false);
                this.circle(rB, 0.2, false);
                this.restore();
                break;
            case 6:
                this.rod(rH, rA, w);
                this.rod(rH, rD, w);
                this.rod(rH, rE, w);

                this.rod(rA, rD, w);
                
                this.rod(rD, rE, w);
                break;
        };
        this.save();
	
		z = .2;
		w = z/4;
		var baseA = rA.add(ej.x(-.25));
		var baseE = rE.add(ej.x(-.25));
        if ((stage === 0 || stage === 6) && !this.getOption("FBD")) {
            this.pivot(baseA, rA, z);		
            this.pivot(baseE, rE, z);
            this.restore();
            
            this.ground(baseA, ej, .4);
            this.ground(baseE, ej, .4);
        };
		
		// force vectors
		this.save();
		
		////////////////////////////////////
		if ( optB == 1 ) {
			this.arrow(rb, rB, "force");
			this.text(rb, $V([-1, -1]), "TEX:$P$"); 
		};
		
		//////////////////////////////////////
		if ( optD == 1 ) {
			this.arrow(rd, rD, "force");
			this.text(rd, $V([-1, 0]), "TEX:$P$");
		};

		//////////////////////////////////////
		if ( optG == 1 ) {
			this.arrow(rg, rG, "force");
			this.text(rg, $V([1, 1]), "TEX:$P$");
		};
		
		//////////////////////////////////////
		// force at H
		this.arrow(rH, rh, "force");
		this.text(rh, $V([1, 0]), "TEX:$P$");
		this.restore();

        if (this.getOption("FBD")) {
            var thetaReaction = Math.PI/4;
            this.arrow(rE, rE.add($V([Math.cos(thetaReaction), Math.sin(thetaReaction)])), "force");
            this.arrow(rA, rA.add($V([-Math.cos(thetaReaction), Math.sin(thetaReaction)])), "force");

            this.labelLine(rE, rE.add($V([Math.cos(thetaReaction), Math.sin(thetaReaction)])), ej.x(2), "TEX:$F_E$");
            this.labelLine(rA, rA.add($V([-Math.cos(thetaReaction), Math.sin(thetaReaction)])), ej.x(-2), "TEX:$F_A$");
        };
		
        if (stage <= 5) {
            this.point(rA);
            this.point(rB);
            this.point(rC);
            this.point(rD);
            this.point(rE);
            this.point(rF);
            this.point(rG);
            this.point(rH);

            this.text(rA, $V([-2.5, 0]), "TEX:$A$");  
            this.text(rB, $V([1.5, 1.5]), "TEX:$B$");
            this.text(rC, $V([1.5, 1.5]), "TEX:$C$");
            this.text(rD, $V([1.5, 1.5]), "TEX:$D$");
            this.text(rE, $V([1, -2]), "TEX:$E$");  
            this.text(rF, $V([-1, -1.5]), "TEX:$F$");
            this.text(rG, $V([1, -1.5]), "TEX:$G$");
            this.text(rH, $V([2, 0]), "TEX:$H$");
        } else {
            this.point(rA);
            this.point(rD);
            this.point(rE);
            this.point(rH);

            this.text(rA, $V([-2.5, 0]), "TEX:$A$");  
            this.text(rD, $V([1.5, 1.5]), "TEX:$D$");
            this.text(rE, $V([1, -2]), "TEX:$E$");  
            this.text(rH, $V([2, 0]), "TEX:$H$");
        };
        
        this.text(O.add(ej.x(2.5)).add(ei.x(-4.5)), O, label);		
        
        this.restore();

    });

    var rfb_ft_c = new PrairieDraw("rfb-ft-c", function() {
        
        this.setUnits(8, 3);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var w = 0.1;

        var rA = $V([-1, 0]);
        var rB = $V([1, 0]);
        var rC = $V([0, 1]);

        this.save();

        this.translate($V([-2, -0.5]));

        this.rod(rA, rB, w);
        this.rod(rB, rC, w);
        this.rod(rC, rA, w);

        this.point(rA);
        this.point(rB);
        this.point(rC);

        this.labelIntersection(rA, [rA.add(rB), rA.add(rC)], "TEX:$A$");
        this.labelIntersection(rB, [rB.add(rA), rB.add(rC)], "TEX:$B$");
        this.text(rC, ej.x(-2), "TEX:$C$");

        this.restore();

        rA = rA.add($V([1, -0.5]));
        rB = rB.add($V([2, -0.5]));
        rC = rC.add($V([1.5, 0]));

        var theta = Math.PI/4;
        var offsetAC = (Math.sqrt(2) * 1.5 - 1) / 2;
        
        var explodedAB = {
            rA: rA.add($V([1, 0])),
            rB: rB.add($V([-1, 0])),
            fAB: $V([0.5, 0])
        };

        var explodedAC = {
            rA: rA.add($V([Math.cos(theta), Math.sin(theta)]).x(offsetAC)),
            rC: rC.add($V([Math.cos(theta), Math.sin(theta)]).x(-offsetAC)),
            fAC: $V([Math.cos(theta), Math.sin(theta)]).x(offsetAC/1.5)
        };

        var explodedBC = {
            rB: rB.add($V([-Math.cos(theta), Math.sin(theta)]).x(offsetAC)),
            rC: rC.add($V([-Math.cos(theta), Math.sin(theta)]).x(-offsetAC)),
            fBC: $V([-Math.cos(theta), Math.sin(theta)]).x(offsetAC/1.5)
        };

        this.save();

        this.rod(explodedAB.rA, explodedAB.rB, w);
        this.rod(explodedAC.rA, explodedAC.rC, w);
        this.rod(explodedBC.rB, explodedBC.rC, w);

        this.arrow(explodedAB.rA, explodedAB.rA.add(explodedAB.fAB.x(-1)), "force");
        this.arrow(explodedAB.rB, explodedAB.rB.add(explodedAB.fAB), "force");
        this.arrow(explodedAC.rA, explodedAC.rA.add(explodedAC.fAC.x(-1)), "force");
        this.arrow(explodedAC.rC, explodedAC.rC.add(explodedAC.fAC), "force");
        this.arrow(explodedBC.rB, explodedBC.rB.add(explodedBC.fBC.x(-1)), "force");
        this.arrow(explodedBC.rC, explodedBC.rC.add(explodedBC.fBC), "force");

        this.point(explodedAB.rA);
        this.point(explodedAB.rB);
        this.point(explodedAC.rA);
        this.point(explodedAC.rC);
        this.point(explodedBC.rB);
        this.point(explodedBC.rC);

        this.point(rA);
        this.point(rB);
        this.point(rC);

        this.labelLine(explodedAB.rA, explodedAB.rA.add(explodedAB.fAB.x(-1)), ei, "TEX:$F_{AB}$");
        this.labelLine(explodedAB.rB, explodedAB.rB.add(explodedAB.fAB), ei, "TEX:$F_{AB}$");
        this.labelLine(explodedAC.rA, explodedAC.rA.add(explodedAC.fAC.x(-1)), ej.x(-2), "TEX:$F_{AC}$");
        this.labelLine(explodedAC.rC, explodedAC.rC.add(explodedAC.fAC), ej.x(2), "TEX:$F_{AC}$");
        this.labelLine(explodedBC.rB, explodedBC.rB.add(explodedBC.fBC.x(-1)), ej.x(2), "TEX:$F_{BC}$");
        this.labelLine(explodedBC.rC, explodedBC.rC.add(explodedBC.fBC), ej.x(-2), "TEX:$F_{BC}$");
        
        this.text(rA, $V([1, 1]), "TEX:$A$");
        this.text(rB, $V([-1, 1]), "TEX:$B$");
        this.text(rC, ej.x(-2), "TEX:$C$");
    });

    var rfb_it_c = new PrairieDrawAnim("rfb-it-c", function(t) {

        this.setUnits(10, 4);

        this.addOption("cut", false);
        this.addOption("forces", "tension");

        var forces = this.getOption("forces");

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var w = 0.3;
        var rectWidth = 1.5;
        
        var rM = this.mousePositionDw();
        var dt = this.deltaTime();
    
        var rP = ei.x(-3.5);
        var rQ = ei.x(3.5);

        var length = rP.subtract(rQ).modulus();

        var rCx;
        
        if (dt > 0) {
            if (rM.e(1) <= rP.e(1) + 0.15*length) {
                rCx = rP.e(1) + 0.15*length
            } else if (rM.e(1) >= rQ.e(1) - 0.15*length) {
                rCx = rQ.e(1) - 0.15*length
            } else {
                rCx = rM.e(1)
            };
        } else {
            rCx = 0;
        };
        
        var rC = $V([rCx, 0]);

        var p00 = $V([rCx + 0.1, 0.3]);
        var p10 = $V([rCx + -0.15, 0.2]);
        var p20 = rC;

        var p01 = rC;
        var p11 = $V([rCx + 0.15, -0.2]);
        var p21 = $V([rCx + -0.1, -0.3]);

        this.rod(rP, rQ, w);

        this.point(rP);
        this.point(rQ);
        this.point(rC);

        if (!this.getOption("cut")) {

            this.save();

            this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
            this.quadraticBezier(p00, p10, p20);
            this.quadraticBezier(p01, p11, p21);

            this.restore();
        } else {
            this.save();

            this.setProp("shapeOutlineColor", "rgb(255, 255, 255)");
            this.rectangle(rectWidth, 2*w, rC);

            this.restore();

            this.save();

            this.translate($V([rectWidth/2, 0]));
            this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
            this.quadraticBezier(p00, p10, p20);
            this.quadraticBezier(p01, p11, p21);

            this.restore();

            this.save();

            this.translate($V([-rectWidth/2, 0]));
            this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
            this.quadraticBezier(p00, p10, p20);
            this.quadraticBezier(p01, p11, p21);
            
            this.restore();

            this.point(rC);
        };
        
        if (forces === "tension") {
            this.arrow(rP, rP.add($V([-rectWidth/2 + 0.1, 0])), "force");
            this.arrow(rQ, rQ.add($V([rectWidth/2 - 0.1, 0])), "force");

            if (this.getOption("cut")) {
                this.arrow(rC.subtract($V([rectWidth/2, 0])), rC.subtract($V([0.1, 0])), "force");
                this.arrow(rC.add($V([rectWidth/2, 0])), rC.add($V([0.1, 0])), "force");

                this.labelLine(rC.subtract($V([rectWidth/2, 0])), rC.subtract($V([0.1, 0])), ej.x(1.5), "TEX:$N$");
                this.labelLine(rC.add($V([rectWidth/2, 0])), rC.add($V([0.1, 0])), ej.x(-1.5), "TEX:$N$");
            };

            this.labelLine(rP, rP.add($V([-rectWidth/2 + 0.1, 0])), ej.x(-1.5), "TEX:$P$");
            this.labelLine(rQ, rQ.add($V([rectWidth/2 - 0.1, 0])), ej.x(1.5), "TEX:$P$");
        } else {
            this.arrow(rP.add($V([-rectWidth/2 + 0.1, 0])), rP, "force");
            this.arrow(rQ.add($V([rectWidth/2 - 0.1, 0])), rQ, "force");

            if (this.getOption("cut")) {
                this.arrow(rC.subtract($V([0.1, 0])), rC.subtract($V([rectWidth/2, 0])), "force");
                this.arrow(rC.add($V([0.1, 0])), rC.add($V([rectWidth/2, 0])), "force");

                this.labelLine(rC.subtract($V([0.1, 0])), rC.subtract($V([rectWidth/2, 0])), ej.x(-1.5), "TEX:$N$");
                this.labelLine(rC.add($V([0.1, 0])), rC.add($V([rectWidth/2, 0])), ej.x(1.5), "TEX:$N$");
            };

            this.labelLine(rP.add($V([-rectWidth/2 + 0.1, 0])), rP, ej.x(1.5), "TEX:$P$");
            this.labelLine(rQ.add($V([rectWidth/2 - 0.1, 0])), rQ, ej.x(-1.5), "TEX:$P$");
        };
    });
    rfb_it_c.activateMouseTracking();
    rfb_it_c.activateAnimOnClick();

    var rfb_it_b = new PrairieDrawAnim("rfb-it-b", function(t) {

        this.setUnits(10, 6);

        this.addOption("cut", false);
        this.addOption("forces", "tension");
        this.addOption("components", false);

        var forces = this.getOption("forces");

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var w = 0.3;

        var rM = this.mousePositionDw();
        var dt = this.deltaTime();

        var rP = ei.x(-2).add($V([0, -1]));
        var rR = ej.x(2).add($V([0, -1]));
        var rQ = ei.x(2).add($V([0, -1]));

        var lengthRQ = rQ.subtract(rR).modulus();
        var theta = this.angleOf(rQ.subtract(rR));
        var eT = this.vector2DAtAngle(theta);
        var eN = this.perp(eT);
        var proj = this.orthProj(rM, eT);

        var rC;
        if (dt > 0) {
            if (proj.e(1) >= eT.e(1) && proj.e(2) <= eT.e(2)) {
                rC = rR.add(eT);
            } else if (proj.e(1) <= eT.x(-1).e(1) && proj.e(2) >= eT.x(-1).e(2)) {
                rC = rR.add(eT.x(-1));
            } else {
                rC = rR.add(proj);
            };
        } else {
            rC = rR.add(eT.x(lengthRQ/2));
        };
        
        this.LshapeRod(rP, rR, rQ, 0.3);
        this.point(rP);
        this.point(rQ);
        this.point(rC);

        if (forces === "tension") {
            this.arrow(rP, rP.add(ei.x(-1)), "force");
            this.arrow(rQ, rQ.add(ei), "force");

            this.labelLine(rP, rP.add(ei.x(-1)), ej.x(-1.5), "TEX:$P$");
            this.labelLine(rQ, rQ.add(ei), ej.x(1.5), "TEX:$P$");

        } else {
            this.arrow(rP.add(ei.x(-1)), rP, "force");
            this.arrow(rQ.add(ei), rQ, "force");

            this.labelLine(rP.add(ei.x(-1)), rP, ej.x(1.5), "TEX:$P$");
            this.labelLine(rQ.add(ei), rQ, ej.x(-1.5), "TEX:$P$");
        }
    });
    rfb_it_b.activateMouseTracking();
    rfb_it_b.activateAnimOnClick();
})