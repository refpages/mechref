$(document).ready(function(){
    avs_ft_c = new PrairieDrawAnim("avs-ft-c", function(t) {
        this.setUnits(26, 26 / this.goldenRatio);
    
            var width = 2;
            var length = 4;
            
            this.addOption("radius", 5);
            this.addOption("offset", 0);
            this.addOption("showLabels", true);
            this.addOption("showCornerVelocities", false);
            this.addOption("showRadialLines", false);

            var theta = 0.5 * t;
            var velocityScale = 0.55;
            var r = Number(this.getOption("radius"));
            var dPerc = Number(this.getOption("offset"));
            var d = length / 2 * dPerc / 100;
    
            var rP = $V([r, 0]).rotate(theta, $V([0, 0]));
            var vP = rP.rotate(Math.PI / 2, $V([0, 0])).x(velocityScale);
    
            // car
            this.save();
            this.rotate(theta);
            this.translate($V([r, d]));
            this.rectangle(width, length);
            this.restore();
    
            // center point
            this.save();
            this.setProp("pointRadiusPx", 6);
            this.point($V([0, 0]));
            if (this.getOption("showLabels")) {
                this.text($V([0, 0]), $V([1.2, 1.2]), "TEX:$O$");
            }
            this.restore();
    
            // P
            this.save();
            this.setProp("pointRadiusPx", 3);
            this.point(rP);
            if (this.getOption("showLabels")) {
                this.text(rP, vP.toUnitVector().x(1.5), "TEX:$P$");
            }
            this.arrow(rP, rP.add(vP), "velocity");
            if (this.getOption("showLabels")) {
                this.labelLine(rP, rP.add(vP), $V([1, 0]), "TEX:$\\vec{v}$");
            }
            var rad = 1.2;
            this.circleArrow(rP, rad, theta - 2.2, theta + 2.2 , "angVel", true);
            if (this.getOption("showLabels")) {
                this.labelCircleLine(rP, rad, theta - 2.2, theta + 2.2, $V([0, 1]), "TEX:$\\omega$", true);
            }
            this.restore();
    
            var rFL = $V([-width / 2 + r, length / 2 + d]).rotate(theta, $V([0, 0]));
            var rFR = $V([width / 2 + r, length / 2 + d]).rotate(theta, $V([0, 0]));
            var rRL = $V([-width / 2 + r, -length / 2 + d]).rotate(theta, $V([0, 0]));
            var rRR = $V([width / 2 + r, -length / 2 + d]).rotate(theta, $V([0, 0]));
            var vFL = rFL.rotate(Math.PI / 2, $V([0, 0])).x(velocityScale);
            var vFR = rFR.rotate(Math.PI / 2, $V([0, 0])).x(velocityScale);
            var vRL = rRL.rotate(Math.PI / 2, $V([0, 0])).x(velocityScale);
            var vRR = rRR.rotate(Math.PI / 2, $V([0, 0])).x(velocityScale);
    
            if (this.getOption("showCornerVelocities")) {
                this.arrow(rFL, rFL.add(vFL), "velocity");
                this.arrow(rFR, rFR.add(vFR), "velocity");
                this.arrow(rRL, rRL.add(vRL), "velocity");
                this.arrow(rRR, rRR.add(vRR), "velocity");
            }
            if (this.getOption("showRadialLines")) {
                this.save();
                this.setProp("shapeStrokePattern", "dashed");
                this.line($V([0, 0]), rP);
                this.rightAngle(rP, vP);
                this.line($V([0, 0]), rFL);
                this.line($V([0, 0]), rFR);
                this.line($V([0, 0]), rRL);
                this.line($V([0, 0]), rRR);
                this.restore();
                if (this.getOption("showCornerVelocities")) {
                    this.rightAngle(rFL, vFL);
                    this.rightAngle(rFR, vFR);
                    this.rightAngle(rRL, vRL);
                    this.rightAngle(rRR, vRR);
                }
            }
        });
        var f1car = {
            width: 2, // m
            length: 4, // m
            wheelWidth: 0.4, // m
            wheelLength: 1, // m
            wheelOffset: 0.3, // m
            trackRodOffset: 0.6, // m
            connectWidth: 0.2, // m
            connectExtension: 0.1, // m
        };
    
        f1car.drawFrontWheel = function(pd, trackRodShorten) {
            var theta = Math.atan2(trackRodShorten, this.trackRodOffset);
            var d = this.connectWidth/2 / Math.tan((Math.PI/2 + theta)/2);
            var p = $V([trackRodShorten, -this.trackRodOffset]);
            var pe = p.toUnitVector().x(p.modulus() + this.connectExtension);
            var v = p.rotate(Math.PI/2, $V([0,0])).toUnitVector();
            var points = [
                $V([-this.wheelOffset, this.connectWidth/2]),
                $V([d, this.connectWidth/2]),
                pe.add(v.x(this.connectWidth/2)),
                pe.add(v.x(-this.connectWidth/2)),
                $V([-d, -this.connectWidth/2]),
                $V([-this.wheelOffset, -this.connectWidth/2])
                ];
            pd.polyLine(points, true);
            pd.point($V([0, 0]));
            pd.point(p);
            pd.save();
            pd.translate($V([-this.wheelOffset - this.wheelWidth/2, 0]));
            pd.rectangle(this.wheelWidth, this.wheelLength);
            pd.restore();
        };
    
        f1car.findAngles = function(pd, w, a, h, d) {
            var cosMaxAngle = (w * w + h * h - a * a) / (2 * w * h);
            var maxD = a + h * cosMaxAngle / 2 - w / 2;
            if (Math.abs(d) >= maxD) {
                return [NaN, NaN];
            }
    
            // bisection method
            var alpha0 = 0;
            var alpha1 = Math.PI;
            var i, alpha, beta, dTest;
            for (i = 0; i < 10; i++) {
                // 10 iterations starting from pi, so tolerance of pi/1024
                alpha = (alpha0 + alpha1) / 2;
                beta = pd.solveFourBar(w, h, a, a, alpha, false);
                dTest = (a * Math.cos(alpha) + a * Math.cos(beta)) / 2;
                if (dTest - d > 0) {
                    alpha0 = alpha;
                } else {
                    alpha1 = alpha;
                }
            }
            alpha = (alpha0 + alpha1) / 2;
            beta = pd.solveFourBar(w, h, a, a, alpha, false);
            return [alpha, Math.PI - beta];
        };
    
        f1car.findRadii = function(pd, w, l, a, d, trackRodShorten, alpha1, alpha2) {
            var r1, r2;
            var trackRodAngle = Math.asin(trackRodShorten / a);
            if (d === 0) {
                r1 = -Infinity;
                r2 = Infinity;
            } else {
                var theta1 = alpha1 + trackRodAngle - Math.PI / 2;
                var theta2 = -alpha2 - trackRodAngle + Math.PI / 2;
                if (d > 0) {
                    theta1 = Math.min(theta1, 0);
                    theta2 = Math.min(theta2, 0);
                } else {
                    theta1 = Math.max(theta1, 0);
                    theta2 = Math.max(theta2, 0);
                }
                r1 = -w / 2 + l / Math.tan(theta1);
                r2 = w / 2 + l / Math.tan(theta2);
            }
            return [r1, r2]
        };
    
        f1car.draw = function(pd, trackRodShorten, rackOffset, showRadii, showArmLines, showLabels) {
            var t = $V([trackRodShorten, this.trackRodOffset])
            var theta = Math.PI/2 - pd.angleOf(t);
            var a = t.modulus();
            var h = this.width - 2 * trackRodShorten;
            var angles = this.findAngles(pd, this.width, a, h, rackOffset);
            var alpha1 = angles[0];
            var alpha2 = angles[1];
            var frontLeft = $V([-this.width/2, this.length/2]);
            var frontRight = $V([this.width/2, this.length/2]);
            var p1 = frontLeft.add($V([a, 0]).rotate(-alpha1, $V([0, 0])));
            var p2 = frontRight.add($V([-a, 0]).rotate(alpha2, $V([0, 0])));
    
            // front wheels
            pd.rectangle(this.width, this.length);
            pd.save();
            pd.translate(frontLeft);
            pd.rotate(Math.PI/2 - alpha1 - theta);
            this.drawFrontWheel(pd, trackRodShorten);
            pd.restore();
            pd.save();
            pd.translate(frontRight);
            pd.scale($V([-1, 1]));
            pd.rotate(Math.PI/2 - alpha2 - theta);
            this.drawFrontWheel(pd, trackRodShorten);
            pd.restore();
            pd.line(p1, p2);
            var mid = p1.add(p2).x(0.5);
            pd.point(mid);
            var arrowY = frontLeft.e(2) - this.trackRodOffset - 0.1;
            pd.arrow($V([0, arrowY]), $V([mid.e(1), arrowY]), 'position');
            if (showLabels) {
                pd.text($V([mid.e(1) / 2, arrowY]), $V([0, 1]), "TEX:$d$");
                pd.text(frontLeft, $V([0, -2]), "TEX:$A$");
                pd.text(frontRight, $V([0, -2]), "TEX:$B$");
                pd.text(p2, $V([1, 1.5]), "TEX:$C$");
                pd.text(p1, $V([-1, 1.5]), "TEX:$D$");
            }
    
            // rear wheels
            pd.save();
            pd.translate($V([0, -this.length/2]));
            var d = -this.width/2 - this.wheelOffset - this.wheelWidth/2;
            pd.rectangle(2 * d, this.connectWidth);
            pd.point($V([-this.width/2, 0]));
            pd.point($V([this.width/2, 0]));
            pd.save();
            pd.translate($V([-d, 0]));
            pd.rectangle(this.wheelWidth, this.wheelLength);
            pd.restore();
            pd.save();
            pd.translate($V([d, 0]));
            pd.rectangle(this.wheelWidth, this.wheelLength);
            pd.restore();
            pd.restore();
    
            // radii
            var rVec = this.findRadii(pd, this.width, this.length, a, rackOffset, trackRodShorten, alpha1, alpha2);
            var r1 = rVec[0];
            var r2 = rVec[1];
            if (showRadii) {
                pd.save();
                pd.setProp("shapeStrokePattern", "dashed");
                pd.setProp("shapeOutlineColor", "blue");
                if (isFinite(r1)) {
                    pd.line(frontLeft, $V([r1, -this.length / 2]));
                } else {
                    pd.line(frontLeft, $V([-this.width * 5, this.length / 2]));
                }
                pd.setProp("shapeOutlineColor", "red");
                if (isFinite(r2)) {
                    pd.line(frontRight, $V([r2, -this.length / 2]));
                } else {
                    pd.line(frontRight, $V([-this.width * 5, this.length / 2]));
                }
                pd.setProp("shapeOutlineColor", "black");
                pd.line($V([0, -this.length / 2]), $V([-this.width * 5, -this.length / 2]));
                pd.restore();
    
                if (showLabels) {
                    var r1MeasX = isFinite(r1) ? r1 : -100;
                    var r1MeasY = -this.length / 2 + this.wheelLength / 2;
                    pd.measurement($V([0, r1MeasY]), $V([r1MeasX, r1MeasY]), "TEX:$r_1$");
                    var r2MeasX = isFinite(r2) ? r2 : -100;
                    var r2MeasY = -this.length / 2 + this.wheelLength / 2 + 0.4;
                    pd.measurement($V([0, r2MeasY]), $V([r2MeasX, r2MeasY]), "TEX:$r_2$");
                }
            }
            if (showArmLines) {
                pd.save();
                pd.setProp("shapeStrokePattern", "dashed");
                if (trackRodShorten === 0 && rackOffset === 0) {
                    pd.line(frontLeft, frontLeft.add($V([0, -this.trackRodOffset - this.connectExtension])));
                    pd.line(frontRight, frontRight.add($V([0, -this.trackRodOffset - this.connectExtension])));
                } else {
                    pd.line(frontLeft, frontLeft.add($V([this.length * Math.tan(Math.PI/2 - alpha1), -this.length])));
                    pd.line(frontRight, frontRight.add($V([-this.length * Math.tan(Math.PI/2 - alpha2), -this.length])));
                }
                pd.restore();
    
                if (showLabels && trackRodShorten !== 0) {
                    var angleRad = 2.5;
                    var refLineRad = 2.7;
                    pd.save();
                    pd.setProp("shapeStrokePattern", "dashed");
                    var leftRefLineUnit = $V([1, 0]).rotate(-alpha1 - theta, $V([0, 0]));
                    var rightRefLineUnit = $V([1, 0]).rotate(alpha2 + theta - Math.PI, $V([0, 0]));
                    pd.line(frontLeft, frontLeft.add(leftRefLineUnit.x(refLineRad)));
                    pd.line(frontRight, frontRight.add(rightRefLineUnit.x(refLineRad)));
                    pd.restore();
                    pd.circleArrow(frontLeft, angleRad, -alpha1 - theta, -alpha1, undefined, true);
                    pd.circleArrow(frontRight, angleRad, alpha2 + theta - Math.PI, alpha2 - Math.PI, undefined, true);
                    if (trackRodShorten > 0) {
                        pd.text(frontLeft.add(leftRefLineUnit.x(angleRad)),
                                leftRefLineUnit.rotate(Math.PI / 2, $V([0, 0])), "TEX:$\\theta$");
                        pd.text(frontRight.add(rightRefLineUnit.x(angleRad)),
                                rightRefLineUnit.rotate(-Math.PI / 2, $V([0, 0])), "TEX:$\\theta$");
                    } else if (trackRodShorten < 0) {
                        pd.text(frontLeft.add(leftRefLineUnit.x(angleRad)),
                                leftRefLineUnit.rotate(-Math.PI / 2, $V([0, 0])), "TEX:$-\\theta$");
                        pd.text(frontRight.add(rightRefLineUnit.x(angleRad)),
                                rightRefLineUnit.rotate(Math.PI / 2, $V([0, 0])), "TEX:$-\\theta$");
                    }
                }
            }
            return rVec;
        };
        avs_fr_c = new PrairieDrawAnim("avs-fr-c", function(t) {
            this.addOption("pivotAngleDeg", 0);
            this.addOption("showLabels", true);
            
        this.setUnits(11, 10);
    
            var trackRodShorten = Math.atan2(this.degToRad(this.getOption("pivotAngleDeg")), f1car.trackRodOffset);
    
            var dMax = 0.38;
            var d = dMax * 0.5 * (1 - Math.cos(t));
            this.save();
            this.translate($V([3, 2]));
            var showLabels = this.getOption("showLabels");
            var rVec = f1car.draw(this, trackRodShorten, d, true, true, showLabels);
            this.restore();
            var r1 = rVec[0];
            var r2 = rVec[1];
    
            var ir1History = this.history("ir1", 0.05, 2 * Math.PI + 0.05, t, $V([d, -1 / r1]));
            var ir2History = this.history("ir2", 0.05, 2 * Math.PI + 0.05, t, $V([d, -1 / r2]));
                
            var ir1Trace = this.historyToTrace(ir1History);
            var ir2Trace = this.historyToTrace(ir2History);
    
            var origin = $V([-4.4, -4.1]);
            var size = $V([9.2, 3]);
            var pointLabel = undefined;
            var pointAnchor = undefined;
            if (this.getOption("showLabels")) {
                pointLabel = "TEX:$\\displaystyle \\frac{1}{r_1}$";
                pointAnchor = $V([-1, 1]);
            }
            this.plot(ir1Trace, origin, size, $V([0, 0]), $V([dMax * 1.2, 0.3]),
                      "TEX:$d$", "TEX:$\\displaystyle \\frac{1}{r}$",
                      "blue", true, true, pointLabel, pointAnchor);
            if (this.getOption("showLabels")) {
                pointLabel = "TEX:$\\displaystyle \\frac{1}{r_2}$";
                pointAnchor = $V([1, -1]);
            }
            this.plot(ir2Trace, origin, size, $V([0, 0]), $V([dMax * 1.2, 0.3]), "", "",
                      "red", false, true, pointLabel, pointAnchor);
        });
    
        avs_fr_c.registerOptionCallback("pivotAngleDeg", function(value) {this.clearAllHistory();});    

        $(window).on("resize", function(){
            avs_ft_c.redraw();
            avs_fr_c.redraw();
        });
})
