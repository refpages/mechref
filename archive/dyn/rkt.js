
$(document).ready(function() {

    var rkt_fb_c = new PrairieDrawAnim("rkt-fb-c", function(t) {
        this.setUnits(6.6, 4.4);

        this.addOption("showLabels", true);
        this.addOption("showPosition", true);
        this.addOption("showVelocity", false);
        this.addOption("showAcceleration", false);
        this.addOption("showAccDecomp", false);
        this.addOption("showCenter", false);
        this.addOption("showCircle", false);
        this.addOption("showAngVel", false);
        this.addOption("showAngVelDecomp", false);

        var label = this.getOption("showLabels") ? true : undefined;

        var O = $V([0, 0, 0]);
        var rX = $V([1, 0, 0]);
        var rY = $V([0, 1, 0]);
        var rZ = $V([0, 0, 1]);
        var gS = 2; // ground size

        var groundBorder = [$V([-gS, -gS, 0]), $V([-gS, gS, 0]), $V([gS, gS, 0]), $V([gS, -gS, 0])];
        var nGrid = 3;
        for (var i = -nGrid; i <= nGrid; i++) {
            this.line($V([i / nGrid * gS, -gS, 0]), $V([i / nGrid * gS, gS, 0]), "grid");
            this.line($V([-gS, i / nGrid * gS, 0]), $V([gS, i / nGrid * gS, 0]), "grid");
        }
        this.polyLine(groundBorder, true, false);
        this.arrow(O, rX);
        this.arrow(O, rY);
        this.arrow(O, rZ);
        if (this.getOption("showLabels")) {
            this.labelLine(O, rX, $V([1, -1]), "TEX:$x$");
            this.labelLine(O, rY, $V([1, 1]), "TEX:$y$");
            this.labelLine(O, rZ, $V([1, 1]), "TEX:$z$");
        }

        var f = function(t) {
            return {
                P: $V([1.8 * Math.cos(t / 2), 1.8 * Math.sin(t / 2), 1 - 0.9 * Math.cos(t)])
            };
        }

        var basis = function(t) {
            var val = this.numDiff(f, t);

            var b = {};
            b.r = val.P;
            b.v = val.diff.P;
            b.a = val.ddiff.P;

            b.et = b.v.toUnitVector();
            b.en = this.orthComp(b.a, b.v).toUnitVector();
            b.eb = b.et.cross(b.en);
            return b;
        }.bind(this);

        var b = this.numDiff(basis, t);
        var r = b.r;
        var v = b.v;
        var a = b.a;
        var et = b.et;
        var en = b.en;
        var eb = b.eb;

        var at = this.orthProj(a, et);
        var an = this.orthProj(a, en);

        var rho = Math.pow(v.modulus(), 2) / an.modulus();
        var kappa = 1 / rho;
        var C = r.add(en.x(rho));

        var ebDot = b.diff.eb;
        var tau = -ebDot.dot(en) / v.modulus();
        var omega = et.x(tau * v.modulus()).add(eb.x(kappa * v.modulus()));
        var omegat = this.orthProj(omega, et);
        var omegab = this.orthProj(omega, eb);

        var path = [];
        var nPoints = 100;
        for (var i = 0; i < nPoints; i++) {
            var tTemp = i / nPoints * 4 * Math.PI;
            path.push(f(tTemp).P);
        }
        this.polyLine(path, true, false);

        this.point(r);
        this.arrow(r, r.add(et));
        this.arrow(r, r.add(en));
        this.arrow(r, r.add(eb));
        this.labelLine(r, r.add(et), $V([1, 0]), label && "TEX:$\\hat{e}_t$");
        this.labelLine(r, r.add(en), $V([1, 0]), label && "TEX:$\\hat{e}_n$");
        this.labelLine(r, r.add(eb), $V([1, 0]), label && "TEX:$\\hat{e}_b$");
        if (this.getOption("showCircle")) {
            this.save();
            this.setProp("shapeOutlineColor", this.getProp("rotationColor"));
            this.arc3D(C, rho, eb);
            this.restore();
        }
        if (this.getOption("showCenter")) {
            this.save();
            this.setProp("shapeOutlineColor", this.getProp("rotationColor"));
            this.line(C, r);
            this.labelLine(C, r, $V([0, 1]), label && "TEX:$\\rho$");
            this.point(C);
            this.labelIntersection(C, [r], label && "TEX:$C$");
            this.restore();
        }

        if (this.getOption("showPosition")) {
            this.arrow(O, r, "position");
            this.labelLine(O, r, $V([0, 1]), label && "TEX:$\\vec{r}$");
        }
        if (this.getOption("showVelocity")) {
            this.arrow(r, r.add(v), "velocity");
            this.labelLine(r, r.add(v), $V([0, 1]), label && "TEX:$\\vec{v}$");
        }
        if (this.getOption("showAcceleration")) {
            this.arrow(r, r.add(a), "acceleration");
            this.labelLine(r, r.add(a), $V([0, 1]), label && "TEX:$\\vec{a}$");
        }
        if (this.getOption("showAccDecomp")) {
            this.arrow(r, r.add(at), "acceleration");
            this.arrow(r, r.add(an), "acceleration");
            this.labelLine(r, r.add(at), $V([0, 1]), label && "TEX:$\\vec{a}_t$");
            this.labelLine(r, r.add(an), $V([0, 1]), label && "TEX:$\\vec{a}_n$");
        }
        if (this.getOption("showAngVel")) {
            this.arrow(r, r.add(omega), "angVel");
            this.labelLine(r, r.add(omega), $V([0, 1]), label && "TEX:$\\vec\\omega$");
        }
        if (this.getOption("showAngVelDecomp")) {
            this.arrow(r, r.add(omegat), "angVel");
            this.arrow(r, r.add(omegab), "angVel");
            this.labelLine(r, r.add(omegat), $V([0, 1]), label && "TEX:$\\vec\\omega_t$");
            this.labelLine(r, r.add(omegab), $V([0, 1]), label && "TEX:$\\vec\\omega_b$");
        }
    });

    rkt_fb_c.activate3DControl();

    var rkt_fs_c = new PrairieDrawAnim("rkt-fs-c", function(t) {
        this.setUnits(6, 4);

        this.addOption("showLabels", true);
        this.addOption("showVelocity", false);

        var rad = 1;
        var thetaMax = 2.8;
        var theta = 0.5 * thetaMax * (1 - Math.cos(t));
        var thetaDot = 0.5 * thetaMax * Math.sin(t);
        var r = $V([-Math.cos(theta), Math.sin(theta)]).x(rad);
        var v = $V([Math.sin(theta), Math.cos(theta)]).x(rad * thetaDot);
        var speed = v.modulus();

        var s = (thetaDot < 0) ? (2 * thetaMax - rad * theta) : (rad * theta);

        var O = $V([0, 0]);

        var plotHistoryTime = 10;
        var sHistory = this.history("s", 0.05, plotHistoryTime * 1.5, t, s);
        var speedHistory = this.history("speed", 0.05, plotHistoryTime * 1.5, t, speed);

        this.save();
        this.translate($V([0, 0.2]));
        this.arc(O, rad, 0, Math.PI);
        this.save();
        this.setProp("arrowheadLengthRatio", this.getProp("arrowLineWidthPx") * this.getProp("arrowheadLengthRatio"));
        this.setProp("arrowLineWidthPx", 1);
        this.setProp("shapeStrokeWidthPx", 1);
        this.setProp("shapeOutlineColor", this.getProp("positionColor"));
        var d = 0.1;
        this.line($V([-rad - d - 0.05, 0]), $V([-rad - d + 0.05, 0]), "position");
        if (s < rad * thetaMax) {
            this.circleArrow(O, rad + d, Math.PI, Math.PI - theta, "position", true, 0.05);
        } else {
            this.arc(O, rad + d, Math.PI - thetaMax, Math.PI, false);
            var erMax = $V([-Math.cos(thetaMax), Math.sin(thetaMax)]);
            this.line(erMax.x(rad + d), erMax.x(rad - d), "position");
            this.circleArrow(O, rad - d, Math.PI - thetaMax, Math.PI - theta, "position", true, 0.05);
        }
        this.labelCircleLine(O, rad + d, Math.PI, Math.PI - Math.min(s / rad, thetaMax),
                             $V([0, 1 + 0.5 * Math.exp(-2 * theta)]), "TEX:$s$", true);
        this.restore();
        this.setProp("pointRadiusPx", 4);
        this.point(r);
        if (this.getOption("showVelocity")) {
            this.arrow(r, r.add(v), "velocity");
            this.labelLine(r, r.add(v), $V([0, 1]), "TEX:$\\vec{v}$");
        }
        this.restore();

        this.save();
        this.translate($V([-2.7, -1.7]));
        this.plot(this.pairsToVectors(sHistory), O, $V([5.4, 1.5]), $V([Math.max(0, t - 0.95 * plotHistoryTime), 0]),
                  $V([plotHistoryTime, 2 * thetaMax * 1.2]), "TEX:$t$", undefined, "position", true, true, "TEX:$s$", $V([-1, -1]));
        if (this.getOption("showVelocity")) {
            this.plot(this.pairsToVectors(speedHistory), O, $V([5.4, 1.5]), $V([Math.max(0, t - 0.95 * plotHistoryTime), 0]),
                      $V([plotHistoryTime, 1.8]), "TEX:$t$", undefined, "velocity", false, true, "TEX:$v = \\dot{s}$", $V([-1, 1]));
        }
        this.restore();
    });

    var rkt_ft_c = new PrairieDrawAnim("rkt-ft-c", function(t) {
        this.setUnits(12, 8);

        this.addOption("movement", "circle");
        this.addOption("showLabels", true);
        this.addOption("showPath", false);
        this.addOption("showCenter", false);
        this.addOption("showCircle", false);
        this.addOption("showPosition", true);
        this.addOption("showVelocity", false);
        this.addOption("showAcceleration", false);
        this.addOption("showAccDecomp", false);
        this.addOption("showAngVel", false);
        this.addOption("origin", "O1");

        var f;
        if (this.getOption("movement") === "arc") {
            f = function(t) {
                t = -t;
                t += 5;
                return {
                    "period": 2 * Math.PI / 0.5,
                    "P": this.polarToRect($V([2 - 0.5 * Math.cos(0.5 * t) - 0.5 * Math.cos(t), Math.PI / 2 + 2.5 * Math.sin(0.5 * t)]))
                };
            };
        } else if (this.getOption("movement") === "circle") {
            f = function(t) {
                return {
                    "period": 2 * Math.PI / 0.5,
                    "P": this.polarToRect($V([2.5, 0.5 * t]))
                };
            };
        } else if (this.getOption("movement") === "varCircle") {
            f = function(t) {
                return {
                    "period": 2 * Math.PI / 0.5,
                    "P": this.polarToRect($V([2.5, -0.5 * t + 0.2 * Math.sin(t)]))
                };
            };
        } else if (this.getOption("movement") === "ellipse") {
            f = function(t) {
                t += 3;
                return {
                    "period": 2 * Math.PI / 0.7,
                    "P": $V([Math.cos(0.7 * t), 3 * Math.sin(0.7 * t)])
                };
            };
        } else if (this.getOption("movement") === "trefoil") {
            f = function(t) {
                t += 4;
                return {
                    "period": 2 * Math.PI / 0.4,
                    "P": $V([Math.cos(0.4 * t) - 2 * Math.cos(2 * 0.4 * t), Math.sin(0.4 * t) + 2 * Math.sin(2 * 0.4 * t)])
                };
            };
        } else if (this.getOption("movement") === "eight") {
            f = function(t) {
                t += 2.5 * Math.PI;
                return {
                    "period": 2 * Math.PI / 0.5,
                    "P": this.polarToRect($V([3 * Math.cos(0.5 * t), Math.sin(0.5 * t)]))
                };
            };
        } else if (this.getOption("movement") === "comet") {
            f = function(t) {
                t += 1;
                var T = 2 * Math.PI / 0.7; // period
                var a = 2; // semi-major axis
                var e = 0.5; // eccentricity
                var b = a * Math.sqrt(1 - e*e); // semi-minor axis
                var M = 2 * Math.PI * t / T; // mean anomaly
                var E = M; // eccentric anomaly
                // solve M = E - e * sin(E) for E with Newton's method
                for (var i = 0; i < 5; i++) {
                    E = E + (M - (E - e * Math.sin(E))) / (1 - e * Math.cos(E));
                }
                return {
                "period": T,
                "P": $V([a * (Math.cos(E) - e), b * Math.sin(E)])
            };};
        } else if (this.getOption("movement") === "pendulum") {
            f = function(t) {
                t -= 1.5;
                return {
                    "period": 2 * Math.PI / 0.6,
                    "P": this.polarToRect($V([2.5, -Math.PI / 2 + Math.cos(0.6 * t)]))
                };
            };
        }
        f = f.bind(this);

        var O1 = $V([0, 0]);
        var O2 = $V([-3, -2]);

        var O;
        if (this.getOption("origin") === "O1") {
            O = O1;
        } else {
            O = O2;
        }

        var val = this.numDiff(f, t);
        var period = val.period;
        var r = val.P;
        var v = val.diff.P;
        var a = val.ddiff.P;

        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var et = v.toUnitVector();
        var en = this.orthComp(a, v).toUnitVector();

        var vt = this.orthProj(v, et);
        var vn = this.orthProj(v, en);
        var at = this.orthProj(a, et);
        var an = this.orthProj(a, en);

        var label = this.getOption("showLabels") ? true : undefined;

        var rho = Math.pow(v.modulus(), 2) / an.modulus();
        var C = r.add(en.x(rho));

        var kappa = 1 / rho;
        var omega = v.modulus() * kappa;

        if (this.getOption("showPath")) {
            var n = 200;
            var path = [], s;
            for (var i = 0; i < n; i++) {
                s = i / n * period;
                path.push(f(s).P);
            }
            this.polyLine(path, true, false);
        }
        this.point(O1);
        this.text(O1, $V([1, 1]), label && "TEX:$O_1$");
        this.point(O2);
        this.text(O2, $V([1, 1]), label && "TEX:$O_2$");
        this.point(r);
        this.labelIntersection(r, [O, r.add(et), r.add(en)], label && "TEX:$P$");
        if (this.getOption("showCircle")) {
            this.save();
            this.setProp("shapeOutlineColor", this.getProp("rotationColor"));
            this.arc(C, rho);
            this.restore();
        }
        if (this.getOption("showCenter")) {
            this.save();
            this.setProp("shapeOutlineColor", this.getProp("rotationColor"));
            this.line(C, r);
            this.labelLine(C, r, $V([0, 1]), label && "TEX:$\\rho$");
            this.point(C);
            this.labelIntersection(C, [r], label && "TEX:$C$");
            this.restore();
        }
        if (this.getOption("showPosition")) {
            this.arrow(O, r, "position");
            this.labelLine(O, r, $V([0, 1]), label && "TEX:$\\vec{r}$");
        }
        this.arrow(r, r.add(et));
        this.arrow(r, r.add(en));
        this.labelLine(r, r.add(et), $V([1, 1]), label && "TEX:$\\hat{e}_t$");
        this.labelLine(r, r.add(en), $V([1, 1]), label && "TEX:$\\hat{e}_n$");
        if (this.getOption("showVelocity")) {
            this.arrow(r, r.add(v), "velocity");
            this.labelLine(r, r.add(v), $V([0, -1]), label && "TEX:$\\vec{v}$");
        }
        if (this.getOption("showAcceleration")) {
            this.arrow(r, r.add(a), "acceleration");
            this.labelLine(r, r.add(a), $V([1, 0]), label && "TEX:$\\vec{a}$");
        }
        if (this.getOption("showAccDecomp") && at.modulus() > 1e-3) {
            this.arrow(r, r.add(at), "acceleration");
            this.labelLine(r, r.add(at), $V([1, 1]), label && "TEX:$\\vec{a}_t$");
        }
        if (this.getOption("showAccDecomp") && an.modulus() > 1e-3) {
            this.arrow(r, r.add(an), "acceleration");
            this.labelLine(r, r.add(an), $V([1, 1]), label && "TEX:$\\vec{a}_n$");
        }
        if (this.getOption("showAngVel") && Math.abs(omega) > 1e-3) {
            var ebSign = et.to3D().cross(en.to3D()).dot(Vector.k);
            var avOffset = (this.getOption("showPath") || this.getOption("showCircle")) ? Math.PI / 2 : 3 * Math.PI / 4;
            var a0 = this.angleOf(et) - ebSign * omega - ebSign * avOffset;
            var a1 = this.angleOf(et) + ebSign * omega - ebSign * avOffset;
            var omegaLabel = (ebSign > 0) ? "TEX:$\\omega$" : "TEX:$-\\omega$";
            this.circleArrow(r, 0.6, a0, a1, "angVel");
            this.labelCircleLine(r, 0.6, a0, a1, $V([0, 1]), label && omegaLabel);
        }
    });

    rkt_ft_c.registerOptionCallback("movement", function (value) {
        rkt_ft_c.resetTime(false);
        rkt_ft_c.resetOptionValue("showPath");
        rkt_ft_c.resetOptionValue("showVelocity");
        rkt_ft_c.resetOptionValue("showAcceleration");
        rkt_ft_c.resetOptionValue("showAccDecomp");
        rkt_ft_c.resetOptionValue("showCenter");
        rkt_ft_c.resetOptionValue("showCircle");
    });

    rkt_ft_c.registerOptionCallback("origin", function (value) {
        rkt_ft_c.setOption("showPosition", true);
    });

    var rkt_fo_c = new PrairieDrawAnim("rkt-fo-c", function(t) {
        this.setUnits(12, 8);

        this.addOption("showLabels", true);
        this.addOption("showPath", true);
        this.addOption("showLine", false);
        this.addOption("showCircle", false);
        this.addOption("showPosition", true);
        this.addOption("showVelocity", false);
        this.addOption("showAcceleration", false);
        this.addOption("showAccDecomp", false);
        this.addOption("matchPhasePercent", 0);

        var label = this.getOption("showLabels") ? true : undefined;

        var f = function(t) {
            var T = 2 * Math.PI / 0.7;
            var theta = 0.7 * t - 0.4 * Math.sin(0.7 * t);
            return {
                "period": T,
                "P": $V([3 * Math.cos(theta), 2.5 * Math.sin(theta)])
            };
        };

        var O = $V([0, 0]);

        var val = this.numDiff(f, t);
        var period = val.period;
        var r = val.P;
        var v = val.diff.P;
        var a = val.ddiff.P;

        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var et = v.toUnitVector();
        var en = this.orthComp(a, v).toUnitVector();

        var vt = this.orthProj(v, et);
        var vn = this.orthProj(v, en);
        var at = this.orthProj(a, et);
        var an = this.orthProj(a, en);

        var tMatch = this.getOption("matchPhasePercent") / 100 * period;
        var valMatch = this.numDiff(f, tMatch);
        var rM = valMatch.P;
        var vM = valMatch.diff.P;
        var aM = valMatch.ddiff.P;

        var etM = vM.toUnitVector();
        var enM = this.orthComp(aM, vM).toUnitVector();

        var vtM = this.orthProj(vM, etM);
        var vnM = this.orthProj(vM, enM);
        var atM = this.orthProj(aM, etM);
        var anM = this.orthProj(aM, enM);

        var rhoM = Math.pow(vM.modulus(), 2) / anM.modulus();
        var CM = rM.add(enM.x(rhoM));

        // interpolate [0,1] -> [0,1] with first derivative d1 and second derivative d2 at {0,1}
        var zoInterp = function(u, d1, d2) {
            var u2 = u * u;
            var u3 = u * u2;
            var u4 = u * u3;
            return u * (20 * u2 - 30 * u3 + 12 * u4) / 2
                + d1 * u * (2 - 20 * u2 + 30 * u3 - 12 * u4) / 2
                + d2 * u * (u - 2 * u2 + u3) / 2;
        };

        var fCircle = function(t) {
            var d1 = vtM.dot(etM) * period / (2 * Math.PI * rhoM);
            var d2 = atM.dot(etM) * period * period / (2 * Math.PI * rhoM);
            var theta = 2 * Math.PI * zoInterp(this.fixedMod(t - tMatch, period) / period, d1, d2);
            var theta0 = this.angleOf(enM.x(-1));
            return {P: CM.add(this.vector2DAtAngle(theta0 + theta).x(rhoM))};
        }.bind(this);

        var valCircle = this.numDiff(fCircle, t);
        var rQ = valCircle.P;
        var vQ = valCircle.diff.P;
        var aQ = valCircle.ddiff.P;

        var etQ = vQ.toUnitVector();
        var enQ = this.orthComp(aQ, vQ).toUnitVector();

        var vtQ = this.orthProj(vQ, etQ);
        var vnQ = this.orthProj(vQ, enQ);
        var atQ = this.orthProj(aQ, etQ);
        var anQ = this.orthProj(aQ, enQ);

        var fLine = function(t) {
            var tL = this.fixedMod(this.fixedMod(t - tMatch, period) + period / 2, period) - period / 2;
            var dL = tL * vtM.dot(etM);
            return {P: rM.add(etM.x(dL))};
        }.bind(this);

        var valLine = this.numDiff(fLine, t);
        var rR = valLine.P;
        var vR = valLine.diff.P;
        var aR = valLine.ddiff.P;

        var etR = vR.toUnitVector();
        var enR = etR.rotate(Math.PI / 2, $V([0, 0]));

        var vtR = this.orthProj(vR, etR);
        var vnR = this.orthProj(vR, enR);
        var atR = this.orthProj(aR, etR);
        var anR = this.orthProj(aR, enR);


        if (this.getOption("showPath")) {
            var n = 200;
            var path = [], s;
            for (var i = 0; i < n; i++) {
                s = i / n * period;
                path.push(f(s).P);
            }
            this.polyLine(path, true, false);
        }
        this.point(O);
        this.text(O, $V([1, 1]), label && "TEX:$O$");
        this.point(r);
        this.labelIntersection(r, [O, r.add(et), r.add(et.x(-1)), r.add(en)], label && "TEX:$P$");
        if (this.getOption("showLine")) {
            this.save();
            this.setProp("shapeOutlineColor", "rgb(0, 100, 0)");
            this.line(rM.add(etM.x(-20)), rM.add(etM.x(20)));
            this.restore();
            this.arrow(rR, rR.add(etR));
            this.arrow(rR, rR.add(enR));
            this.labelIntersection(rR.add(etR), [rR.add(etR.x(2)), rR.add(etR).add(enR), rR], label && "TEX:$\\hat{e}_{R,t}$");
            this.labelLine(rR, rR.add(enR), $V([1, 1]), label && "TEX:$\\hat{e}_{R,n}$");
            if (!this.getOption("showCircle")) {
                this.point(rM);
                this.labelIntersection(rM, [rM.add(etM), rM.subtract(enM), rM.subtract(etM)], label && "TEX:$M$");
            }
            this.point(rR);
            this.labelIntersection(rR, [rR.add(etR), rR.add(enR), rR.subtract(etR)], label && "TEX:$R$");
            if (this.getOption("showVelocity")) {
                this.arrow(rR, rR.add(vR), "velocity");
                this.labelLine(rR, rR.add(vR), $V([0, -1]), label && "TEX:$\\vec{v}_R$");
            }
        }
        if (this.getOption("showCircle")) {
            this.save();
            this.setProp("shapeOutlineColor", this.getProp("rotationColor"));
            this.arc(CM, rhoM);
            this.restore();
            this.point(CM);
            this.text(CM, $V([1, 1]), label && "TEX:$C$");
            this.point(rM);
            this.labelIntersection(rM, [rM.add(etM), rM.subtract(enM), rM.subtract(etM)], label && "TEX:$M$");
            this.point(rQ);
            this.labelIntersection(rQ, [rQ.add(etQ), rQ.add(enQ), rQ.subtract(etQ)], label && "TEX:$Q$");
            this.arrow(rQ, rQ.add(etQ));
            this.arrow(rQ, rQ.add(enQ));
            this.labelLine(rQ, rQ.add(etQ), $V([1, -1]), label && "TEX:$\\hat{e}_{Q,t}$");
            this.labelLine(rQ, rQ.add(enQ), $V([1, 1]), label && "TEX:$\\hat{e}_{Q,n}$");
            if (this.getOption("showPosition")) {
                this.arrow(CM, rQ, "position");
                this.labelLine(CM, rQ, $V([0, 1]), label && "TEX:$\\vec{r}_{CQ}$");
            }
            if (this.getOption("showVelocity")) {
                this.arrow(rQ, rQ.add(vQ), "velocity");
                this.labelLine(rQ, rQ.add(vQ), $V([0, -1]), label && "TEX:$\\vec{v}_Q$");
            }
            if (this.getOption("showAcceleration")) {
                this.arrow(rQ, rQ.add(aQ), "acceleration");
                this.labelLine(rQ, rQ.add(aQ), $V([1, 0]), label && "TEX:$\\vec{a}_Q$");
            }
            if (this.getOption("showAccDecomp") && at.modulus() > 1e-3) {
                this.arrow(rQ, rQ.add(atQ), "acceleration");
                this.labelLine(rQ, rQ.add(atQ), $V([1, 1]), label && "TEX:$\\vec{a}_{Q,\\theta}$");
            }
            if (this.getOption("showAccDecomp") && an.modulus() > 1e-3) {
                this.arrow(rQ, rQ.add(anQ), "acceleration");
                this.labelLine(rQ, rQ.add(anQ), $V([1, 1]), label && "TEX:$\\vec{a}_{Q,r}$");
            }
        }
        if (this.getOption("showPosition")) {
            this.arrow(O, r, "position");
            this.labelLine(O, r, $V([0, 1]), label && "TEX:$\\vec{r}_P$");
        }
        this.arrow(r, r.add(et));
        this.arrow(r, r.add(en));
        this.labelLine(r, r.add(et), $V([1, -1]), label && "TEX:$\\hat{e}_{P,t}$");
        this.labelLine(r, r.add(en), $V([1, 1]), label && "TEX:$\\hat{e}_{P,n}$");
        if (this.getOption("showVelocity")) {
            this.arrow(r, r.add(v), "velocity");
            this.labelLine(r, r.add(v), $V([0, -1]), label && "TEX:$\\vec{v}_P$");
        }
        if (this.getOption("showAcceleration")) {
            this.arrow(r, r.add(a), "acceleration");
            this.labelLine(r, r.add(a), $V([1, 0]), label && "TEX:$\\vec{a}_P$");
        }
        if (this.getOption("showAccDecomp") && at.modulus() > 1e-3) {
            this.arrow(r, r.add(at), "acceleration");
            this.labelLine(r, r.add(at), $V([1, 1]), label && "TEX:$\\vec{a}_{P,t}$");
        }
        if (this.getOption("showAccDecomp") && an.modulus() > 1e-3) {
            this.arrow(r, r.add(an), "acceleration");
            this.labelLine(r, r.add(an), $V([1, 1]), label && "TEX:$\\vec{a}_{P,n}$");
        }
    });

}); // end of document.ready()
