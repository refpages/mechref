$(document).ready(function(){
    rkg_fw_c = new PrairieDrawAnim("rkg-fw-c", function(t) {
        this.setUnits(3, 3 / this.goldenRatio);

        this.addOption("showAngles", false);
        this.addOption("showAngVels", false);

        this.translate($V([-1.2, -0.7]));

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        this.arrow(O, ei);
        this.arrow(O, ej);
        this.text(O, $V([1, 1]), "TEX:$O$");
        this.labelLine(O, ei, $V([1, -1]), "TEX:$\\hat{\\imath}$");
        this.labelLine(O, ej, $V([1, 1]), "TEX:$\\hat{\\jmath}$");

        var omega1 = 0.4;
        var omega2 = 0.2;

        var theta1 = omega1 * t;
        var theta2 = omega2 * t;

        var rP1 = $V([0.7, 0.7]);
        var rP1Q1rel = $V([-0.35, -0.2]);
        var rQ1 = rP1.add(rP1Q1rel.rotate(theta1, $V([0, 0])));

        var rP2 = $V([2, 0.7 + 0.3 * Math.sin(t)]);
        var rP2Q2rel = $V([-0.2, 0]);
        var rQ2 = rP2.add(rP2Q2rel.rotate(theta2, $V([0, 0])));
        var rP2Q3rel = $V([0.2, 0]);
        var rQ3 = rP2.add(rP2Q3rel.rotate(theta2, $V([0, 0])));

        var ra = 0.15;
        var rc = 0.15;
        var rw = 0.32;

        var drawAxes = function(p, theta, label) {
            this.save();
            this.translate(p);
            this.save();
            this.rotate(theta);
            this.polyLine([ei.x(ra), O, ej.x(ra)]);
            this.restore();
            if (this.getOption("showAngles")) {
                this.save();
                this.setProp("shapeStrokePattern", "dashed");
                this.line(O, ei.x(2 * ra));
                this.restore();
                var modTheta = this.fixedMod(theta, 2 * Math.PI);
                this.circleArrow(O, rc, 0, modTheta, "angle", true);
                this.labelCircleLine(O, rc, 0, modTheta, $V([0, 1]), label, true);
            }
            this.restore();
        }.bind(this);

        var drawOmega = function(p, theta, omega, label) {
            this.save();
            this.translate(p);
            var a1 = theta + Math.PI / 2 - 3 * omega;
            var a2 = theta + Math.PI / 2 + 3 * omega;
            this.circleArrow(O, rw, a1, a2, "angVel", true);
            this.labelCircleLine(O, rw, a1, a2, $V([0, 1]), label, true);
            this.restore();
        }.bind(this);

        this.save();
        this.translate(rP1);
        this.rotate(theta1);
        this.rectangle(0.8, 0.8 / this.goldenRatio);
        this.text($V([0.33, -0.18]), $V([0, 0]), "TEX:$\\mathcal{B}_1$");
        this.restore();

        this.save();
        this.translate(rP2);
        this.rotate(theta2);
        this.rectangle(0.8, 0.8 / this.goldenRatio);
        this.text($V([0.33, -0.18]), $V([0, 0]), "TEX:$\\mathcal{B}_2$");
        this.restore();

        drawAxes(rP1, theta1, "TEX:$\\theta_1$");
        drawAxes(rQ1, theta1, "TEX:$\\theta_1$");
        drawAxes(rQ2, theta2, "TEX:$\\theta_2$");
        drawAxes(rQ3, theta2, "TEX:$\\theta_2$");

        if (this.getOption("showAngVels")) {
            drawOmega(rP1, theta1, omega1, "TEX:$\\omega_1$");
            drawOmega(rP2, theta2, omega2, "TEX:$\\omega_2$");
        }
    });

    rkg_fr_c = new PrairieDraw("rkg-fr-c", function() {
        this.setUnits(3, 3 / this.goldenRatio);

        this.addOption("showType", "none");

        this.translate($V([-1.2, -0.7]));

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var rP = $V([1.5, 0.4]);
        var rQ = $V([1.7, 1.2]);
        var vP = $V([0.3, -0.2]);
        var omega = 0.8;
        var rPQ = rQ.subtract(rP);
        var vQRel = this.perp(rPQ).x(omega);
        var vQ = vP.add(vQRel);
        var alpha = 1.1;
        var aP = $V([0.6, 0.2]);
        var aQAlpha = this.perp(rPQ).x(alpha);
        var aQCent = rPQ.x(-omega * omega);
        var aQ = aP.add(aQAlpha).add(aQCent);

        this.arrow(O, ei);
        this.arrow(O, ej);
        this.text(O, $V([1, 1]), "TEX:$O$");
        this.labelLine(O, ei, $V([1, -1]), "TEX:$\\hat{\\imath}$");
        this.labelLine(O, ej, $V([1, 1]), "TEX:$\\hat{\\jmath}$");

        this.save();
        this.translate($V([1.6, 0.8]));
        this.rotate(0.7);
        this.rectangle(1.2, 1.2 / this.goldenRatio);
        this.restore();

        this.point(rP);
        this.point(rQ);
        this.text(rP, $V([0, 1.2]), "TEX:$P$");
        this.text(rQ, $V([-1.2, 0]), "TEX:$Q$");

        if (this.getOption("showType") === "position") {
            this.arrow(O, rP, "position");
            this.arrow(O, rQ, "position");
            this.labelLine(O, rP, $V([0, -1.1]), "TEX:$\\vec{r}_P$");
            this.labelLine(O, rQ, $V([0, 1.1]), "TEX:$\\vec{r}_Q$");

            this.arrow(rP, rQ);
            this.labelLine(rP, rQ, $V([0, -1.1]), "TEX:$\\vec{r}_{PQ}$");
        }

        if (this.getOption("showType") === "velocity") {
            this.arrowFrom(rP, vP, "velocity");
            this.arrowFrom(rQ, vQ, "velocity");
            this.labelLine(rP, rP.add(vP), $V([1, 0]), "TEX:$\\vec{v}_P$");
            this.labelLine(rQ, rQ.add(vQ), $V([1, 0]), "TEX:$\\vec{v}_Q$");

            this.arrowFrom(rQ, vQRel);
            this.labelLine(rQ, rQ.add(vQRel), $V([1, 0]), "TEX:$\\vec{\\omega} \\times \\vec{r}_{PQ}$");
        }

        if (this.getOption("showType") === "velocity"
            || this.getOption("showType") === "acceleration") {
            var omegaRad = 0.2;
            this.circleArrow(rP, omegaRad, Math.PI / 2 - omega, Math.PI / 2 + omega, "angVel", true);
            this.labelCircleLine(rP, omegaRad, Math.PI / 2 - omega, Math.PI / 2 + omega, $V([0, -1]),
                                 "TEX:$\\vec{\\omega}$", true);
        }

        if (this.getOption("showType") === "acceleration") {
            var alphaRad = 0.25;
            this.circleArrow(rP, alphaRad, Math.PI / 2 - alpha, Math.PI / 2 + alpha, "angAcc", true);
            this.labelCircleLine(rP, alphaRad, Math.PI / 2 - alpha, Math.PI / 2 + alpha, $V([0, 1]),
                                 "TEX:$\\vec{\\alpha}$", true);

            this.arrowFrom(rQ, aQAlpha);
            this.labelLine(rQ, rQ.add(aQAlpha), $V([0, -1.1]), "TEX:$\\vec{\\alpha} \\times \\vec{r}_{PQ}$");

            this.arrowFrom(rQ, aQCent);
            this.labelLine(rQ, rQ.add(aQCent), $V([0, 1.1]), "TEX:$\\vec{\\omega} \\times (\\vec{\\omega} \\times \\vec{r}_{PQ})$");

            this.arrowFrom(rP, aP, "acceleration");
            this.arrowFrom(rQ, aQ, "acceleration");
            this.labelLine(rP, rP.add(aP), $V([1, 0]), "TEX:$\\vec{a}_P$");
            this.labelLine(rQ, rQ.add(aQ), $V([1, 0]), "TEX:$\\vec{a}_Q$");
        }
        
    });

    rkg_xp_c = new PrairieDraw("rkg-xp-c", function() {
        this.setUnits(4, 4 / this.goldenRatio);

        var P = $V([-0.8, -0.8]);
        var Q = P.add($V([2, 0]).rotate(0.5, $V([0, 0])));
        var h = 1;
        var d = this.perp(Q.subtract(P)).toUnitVector().x(h);
        var Pd = P.add(d);
        var Qd = Q.add(d);

        this.groundHashed(P, $V([0, 1]), 6);

        this.rectangleGeneric(P, Q, h);

        this.point(P);
        this.text(P, $V([-0.3, -1.4]), "TEX:$P$");

        this.point(Q);
        this.text(Q, $V([-1, 0]), "TEX:$Q$");

        this.labelLine(Pd, Qd, $V([0, 1.2]), "TEX:$2\\rm\\ m$");
        this.labelLine(Qd, Q, $V([0, 1.2]), "TEX:$1\\rm\\ m$");
    });

    rkg_xc_c = new PrairieDraw("rkg-xc-c", function() {
        this.setUnits(12, 6);

        var O = $V([0, 0]);
        var P = $V([3, 3]);
        var Q = $V([7, 0]);
        var G = $V([0, -1]);

        this.translate($V([-4, -1]));
        this.groundHashed(G, $V([0, 1]), 24);
        this.rectangle(3, 2, Q);
        this.rod(O, P, 1);
        this.pivot(G, O, 0.5);
        this.rod(P, Q, 0.5);
        this.point(O);
        this.point(P);
        this.point(Q);
        this.text(O, $V([-1.2, -1.2]), "TEX:$O$");
        this.text(P, $V([1.2, 1.2]), "TEX:$P$");
        this.text(Q, $V([-1.6, 0]), "TEX:$Q$");
        this.labelLine(O, P, $V([-0.3, 2.3]), "TEX:$\\mathcal{B}_1$");
        this.labelLine(P, Q, $V([0.2, 1.7]), "TEX:$\\mathcal{B}_2$");
        this.text(Q.add($V([1.5, 0])), $V([-1, 0]), "TEX:$\\mathcal{B}_3$");
        this.save();
        this.setProp("shapeStrokePattern", "dashed");
        this.line(O.add($V([1, 0])), O.add($V([3, 0])));
        this.restore();
        this.circleArrow(O, 2, 0, Math.PI / 4, "angle", true);
        this.labelCircleLine(O, 2, 0, Math.PI / 4, $V([-0.3, 1]), "TEX:$\\theta_1$", true);

        var theta1 = Math.PI / 4;
        var theta2 = this.angleOf(P.subtract(Q));
        this.circleArrow(O, 3, theta1 - 0.5, theta1 + 0.5, "angVel", true);
        this.circleArrow(Q, 3, theta2 - 0.5, theta2 + 0.5, "angVel", true);
        this.labelCircleLine(O, 3, theta1 - 0.5, theta1 + 0.5, $V([1, 0]), "TEX:$\\omega_1$", true);
        this.labelCircleLine(Q, 3, theta2 - 0.5, theta2 + 0.5, $V([-1, 0]), "TEX:$\\omega_2$", true);
    });

    rkg_fd_c = new PrairieDrawAnim("rkg-fd-c", function(t) {
        this.setUnits(6, 4);

        this.addOption("showLabels", true);
        this.addOption("movement", "translate");
        this.addOption("PAtCorner", false);
        this.addOption("showPVel", false);
        this.addOption("showPAcc", false);
        this.addOption("showPAngVel", false);
        this.addOption("showPAngAcc", false);
        this.addOption("showAngVel", false);
        this.addOption("showAngAcc", false);
        this.addOption("velField", "none");
        this.addOption("accField", "none");
        this.addOption("showInstRot", false);
        this.addOption("showPPath", false);
        this.addOption("showQPath", false);
        this.addOption("showVelField", false);
        this.addOption("showAccField", false);

        var O = $V([0, 0]);

        var label = this.getOption("showLabels") ? true : undefined;

        var width = 2;
        var height = 1;
        var n1 = 7, n2 = 4;

        var f;
        if (this.getOption("movement") === "translate") {
            f = function(t) {
                return {
                    theta: Math.PI / 2,
                    rC: $V([this.intervalMod(t, -3.7, 3.7), 0]),
                    pathStart: 0,
                    pathPeriod: 2 * 3.7,
                    closePath: true,
                };
            };
        } else if (this.getOption("movement") === "varTranslate") {
            f = function(t) {
                return {
                    theta: Math.PI / 2,
                    rC: $V([2 * Math.sin(t / 2), 0.6 * Math.sin(t)]),
                    pathStart: 0,
                    pathPeriod: 4 * Math.PI,
                    closePath: true,
                };
            };
        } else if (this.getOption("movement") === "rotate") {
            f = function(t) {
                return {
                    theta: t / 2 + Math.PI / 2,
                    rC: $V([0, 0]),
                    pathStart: 0,
                    pathPeriod: 4 * Math.PI,
                    closePath: true,
                };
            };
        } else if (this.getOption("movement") === "varRotate") {
            f = function(t) {
                return {
                    theta: 0.3 * t + 1 - Math.cos(0.6 * t) + Math.PI / 2,
                    rC: $V([0, 0]),
                    pathStart: 0,
                    pathPeriod: 2 * Math.PI / 0.3,
                    closePath: true,
                };
            };
        } else if (this.getOption("movement") === "slide") {
            f = function(t) {
                return {
                    theta: t / 1.5 + Math.PI / 2,
                    rC: $V([this.intervalMod(t, -1.5 * Math.PI, 1.5 * Math.PI), 0]),
                    pathStart: -1.5 * Math.PI + 1e-8,
                    pathPeriod: 2 * Math.PI * 1.5 - 2e-8,
                    closePath: false,
                };
            };
        } else if (this.getOption("movement") === "hinge") {
            f = function(t) {
                var theta = 0.5 * (1 - Math.cos(t / 2)) * Math.PI; 
                return {
                    theta: theta,
                    rC: $V([width / 2, height / 2]).rotate(theta, O).add($V([0, -0.6])),
                    pathStart: 0,
                    pathPeriod: 4 * Math.PI,
                    closePath: true,
                };
            };
        } else if (this.getOption("movement") === "circle") {
            f = function(t) {
                var theta = t / 2;
                return {
                    theta: theta + Math.PI / 2,
                    rC: $V([height, 0]).rotate(theta, O),
                    pathStart: 0,
                    pathPeriod: 4 * Math.PI,
                    closePath: true,
                };
            };
        } else if (this.getOption("movement") === "spin") {
            f = function(t) {
                var theta = t / 2.5;
                return {
                    theta: 2 * theta + Math.PI / 2,
                    rC: $V([height, 0]).rotate(theta, O),
                    pathStart: 0,
                    pathPeriod: 2 * Math.PI * 2.5,
                    closePath: true,
                };
            };
        } else if (this.getOption("movement") === "reverse") {
            f = function(t) {
                var theta = t / 2.5;
                return {
                    theta: -2 * theta + Math.PI / 2,
                    rC: $V([height, 0]).rotate(theta, O),
                    pathStart: 0,
                    pathPeriod: 2 * Math.PI * 2.5,
                    closePath: true,
                };
            };
        } else if (this.getOption("movement") === "osc") {
            f = function(t) {
                return {
                    theta: t / 4 + 1 - Math.cos(t / 2) + Math.PI / 2,
                    rC: $V([1.7 * Math.sin(t / 2), 0.6 * Math.sin(t)]),
                    pathStart: 0,
                    pathPeriod: 8 * Math.PI,
                    closePath: true,
                };
            };
        }
        f = f.bind(this);

        var val = this.numDiff(f, t);
        var pathStart = val.pathStart;
        var pathPeriod = val.pathPeriod;
        var closePath = val.closePath;

        var theta = val.theta;
        var omega = val.diff.theta;
        var alpha = val.ddiff.theta;

        var rC = val.rC;
        var vC = val.diff.rC;
        var aC = val.ddiff.rC;

        var e1 = $V([1, 0]).rotate(theta, O);
        var e2 = $V([0, 1]).rotate(theta, O);

        var Qs = [];
        for (var i1 = 0; i1 < n1; i1++) {
            for (var i2 = 0; i2 < n2; i2++) {
                var s1 = (i1 / (n1 - 1) - 0.5) * width;
                var s2 = (i2 / (n2 - 1) - 0.5) * height;
                Qs.push(rC.add(e1.x(s1)).add(e2.x(s2)));
            }
        }

        var rCM = this.cross2D(omega, vC).x(1 / (omega * omega));
        var rM = rC.add(rCM);

        var rPLoc;
        if (this.getOption("PAtCorner")) {
            rPLoc = $V([-width / 2, -height / 2]);
        } else {
            rPLoc = $V([0, 0]);
        }

        var rP = rC.add(e1.x(rPLoc.e(1))).add(e2.x(rPLoc.e(2)));
        var rCP = rP.subtract(rC);
        var vP = vC.add(this.cross2D(omega, rCP));
        var aP = aC.add(this.cross2D(alpha, rCP)).add(this.cross2D(omega, this.cross2D(omega, rCP)));

        var fPQ = function(t) {
            var val = f(t);
            var theta = val.theta;
            var rC = val.rC;
            var e1 = $V([1, 0]).rotate(theta, O);
            var e2 = $V([0, 1]).rotate(theta, O);
            var rP = rC.add(e1.x(rPLoc.e(1))).add(e2.x(rPLoc.e(2)));
            var rQ = rC.add(e1.x(width / 2)).add(e2.x(height / 2));
            return [rP, rQ];
        };

        var nPath = 150;

        var QPath = [], PPath = [];
        for (var i = 0; i < nPath; i++) {
            var tau = i / nPath * pathPeriod + pathStart;
            var rPrQ = fPQ(tau);
            PPath.push(rPrQ[0]);
            QPath.push(rPrQ[1]);
        }

        if (this.getOption("showPPath")) {
            this.save();
            this.setProp("shapeOutlineColor", "rgb(150, 150, 150)");
            this.polyLine(PPath, closePath, false);
            this.restore();
        }

        if (this.getOption("showQPath")) {
            this.save();
            this.setProp("shapeOutlineColor", "rgb(200, 200, 200)");
            this.polyLine(QPath, closePath, false);
            this.restore();
        }

        if (this.getOption("showInstRot")) {
            Qs.forEach(function(Q) {
                this.save();
                this.setProp("shapeOutlineColor", "rgb(255, 200, 255)");
                this.line(rM, Q);
                this.restore();
            }, this);

            if (this.getOption("velField") === "total") {
                Qs.forEach(function(Q) {
                    var PQ = Q.subtract(rP);
                    var QVR = this.cross2D(omega, PQ);
                    var QV = vP.add(QVR);
                    this.rightAngle(Q, QV, rM.subtract(Q));
                }, this);
            }

            this.point(rM);
            this.labelIntersection(rM, [rC], label && "TEX:$M$");
        }

        this.rectangle(width, height, rC, theta, false);

        this.save();
        this.setProp("pointRadiusPx", 4);
        this.point(rP);
        this.restore();
        this.labelIntersection(rP, [rP.add(e1), rP.add(e2)], label && "TEX:$P$");
        if (this.getOption("showPVel")) {
            this.arrow(rP, rP.add(vP), "velocity");
            this.labelLine(rP, rP.add(vP), $V([1, 0]), label && "TEX:$\\vec{v}_P$");
        }
        if (this.getOption("showPAcc")) {
            this.arrow(rP, rP.add(aP), "acceleration");
            this.labelLine(rP, rP.add(aP), $V([1, 0]), label && "TEX:$\\vec{a}_P$");
        }
        var omegaLabel = (omega >= 0) ? "TEX:$\\omega$" : "TEX:$-\\omega$";
        var alphaLabel = (alpha >= 0) ? "TEX:$\\alpha$" : "TEX:$-\\alpha$";
        if (this.getOption("showPAngVel")) {
            this.circleArrow(rP, 0.2, theta - 3 * omega, theta + 3 * omega, "angVel");
            this.labelCircleLine(rP, 0.2, theta - 3 * omega, theta + 3 * omega, $V([0, 1]), label && omegaLabel);
        }
        if (this.getOption("showAngVel")) {
            this.circleArrow(rC, 0.75, -Math.PI / 2 + theta - 3 * omega / 3.75, -Math.PI / 2 + theta + 3 * omega / 3.75, "angVel");
            this.labelCircleLine(rC, 0.75, -Math.PI / 2 + theta - 3 * omega / 3.75, -Math.PI / 2 + theta + 3 * omega / 3.75, $V([0, 1]), label && omegaLabel);
        }
        if (this.getOption("showPAngAcc")) {
            this.circleArrow(rP, 0.2, Math.PI + theta - 3 * alpha, Math.PI + theta + 3 * alpha, "angAcc");
            this.labelCircleLine(rP, 0.2, Math.PI + theta - 3 * alpha, Math.PI + theta + 3 * alpha, $V([0, 1]), label && alphaLabel);
        }
        if (this.getOption("showAngAcc")) {
            this.circleArrow(rC, 0.75, Math.PI / 2 + theta - 3 * alpha / 3.75, Math.PI / 2 + theta + 3 * alpha / 3.75, "angAcc");
            this.labelCircleLine(rC, 0.75, Math.PI / 2 + theta - 3 * alpha / 3.75, Math.PI / 2 + theta + 3 * alpha / 3.75, $V([0, 1]), label && alphaLabel);
        }

        var iQShow = Qs.length - 1;
        this.labelIntersection(Qs[iQShow], [rC], label && "TEX:$Q$");

        var i;
        Qs.forEach(function(Q, i) {
            var rPQ = Q.subtract(rP);
            var vQR = this.cross2D(omega, rPQ);
            var vQ = vP.add(vQR);
            var aQR = this.cross2D(alpha, rPQ);
            var aQC = this.cross2D(omega, vQR);
            var aQ = aP.add(aQR).add(aQC);
            this.point(Q);
            qLabel = (i == iQShow) ? label : undefined;
            if (this.getOption("showVelField") || i === iQShow) {
                if (this.getOption("velField") === "base") {
                    this.arrow(Q, Q.add(vP), "velocity");
                    this.labelLine(Q, Q.add(vP), $V([1, 0]), qLabel && "TEX:$\\vec{v}_P$");
                } else if (this.getOption("velField") === "omega") {
                    this.arrow(Q, Q.add(vQR), "velocity");
                    this.labelLine(Q, Q.add(vQR), $V([1, 0]), qLabel && "TEX:$\\vec{\\omega} \\times \\vec{r}_{PQ}$");
                } else if (this.getOption("velField") === "total") {
                    this.arrow(Q, Q.add(vQ), "velocity");
                    this.labelLine(Q, Q.add(vQ), $V([1, 0]), qLabel && "TEX:$\\vec{v}_Q$");
                }
            }
            if (this.getOption("showAccField") || i === iQShow) {
                if (this.getOption("accField") === "base") {
                    this.arrow(Q, Q.add(aP), "acceleration");
                    this.labelLine(Q, Q.add(aP), $V([1, 0]), qLabel && "TEX:$\\vec{a}_P$");
                } else if (this.getOption("accField") === "alpha") {
                    this.arrow(Q, Q.add(aQR), "acceleration");
                    this.labelLine(Q, Q.add(aQR), $V([1, 0]), qLabel && "TEX:$\\vec{\\alpha} \\times \\vec{r}_{PQ}$");
                } else if (this.getOption("accField") === "cent") {
                    this.arrow(Q, Q.add(aQC), "acceleration");
                    this.labelLine(Q, Q.add(aQC), $V([1, 0]), qLabel && "TEX:$\\vec{\\omega} \\times (\\vec{\\omega} \\times \\vec{r}_{PQ})$");
                } else if (this.getOption("accField") === "total") {
                    this.arrow(Q, Q.add(aQ), "acceleration");
                    this.labelLine(Q, Q.add(aQ), $V([1, 0]), qLabel && "TEX:$\\vec{a}_Q$");
                }
            }
        }, this);
    });

    rkc_cm_c = new PrairieDrawAnim("rkc-cm-c", function(t) {
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
})