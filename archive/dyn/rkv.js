
$(document).ready(function() {

    var rkv_fp_c = new PrairieDrawAnim("rkv-fp-c", function(t) {
        this.setUnits(8, 4);

        var O = $V([0, 0]);
        var P = $V([3, 2.5]).add($V([2 * Math.sin(t - 0.7), 0.5 * Math.cos(t - 0.7)]));
        var Q = $V([5, 0.6]).add($V([1.4 * Math.cos(0.7 * t), 0.5 * Math.cos(0.7 * 2 * t)]));

        var e1 = $V([1, 0]);
        var e2 = $V([0, 1]);

        this.translate($V([-3.5, -1.5]));

        this.arrow(O, O.add(e1));
        this.arrow(O, O.add(e2));
        this.labelLine(O, O.add(e1), $V([1, -1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, O.add(e2), $V([1, 1]), "TEX:$\\hat\\jmath$");
        this.text(O, $V([0.5, 1]), "TEX:$O$");

        this.arrow(O, P, "position");
        this.point(P);
        this.text(P, $V([-1, -1]), "TEX:$P$");

        this.arrow(O, Q, "position");
        this.point(Q);
        this.text(Q, $V([-1, 1]), "TEX:$Q$");

        this.arrow(P, Q, "position");
        this.labelLine(O, P, $V([0, 1]), "TEX:$\\vec{r}_{P}$");
        this.labelLine(O, Q, $V([0, -1]), "TEX:$\\vec{r}_{Q}$");
        this.labelLine(P, Q, $V([0, 1]), "TEX:$\\vec{r}_{PQ}$");
    });

    var rkv_fo_c = new PrairieDrawAnim("rkv-fo-c", function(t) {
        this.setUnits(8, 4);

        this.addOption("showLabels", true);
        this.addOption("r1Basis", "none");
        this.addOption("r2Basis", "none");

        var O1 = $V([-2.5, -1.1]);
        var O2 = $V([2, -1.5]);
        var P = $V([Math.sin(t), 0.8 + 0.5 * Math.sin(2 * t)]);

        var r1 = P.subtract(O1);
        var r2 = P.subtract(O2);

        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var eu = ei.rotate(Math.PI / 6, $V([0, 0]));
        var ev = ej.rotate(Math.PI / 6, $V([0, 0]));

        var e11, e12, e21, e22;
        var r11Label, r21Label, r21Label, r22Label;
        if (this.getOption("r1Basis") === "ij") {
            e11 = ei;
            e12 = ej;
            r11Label = "TEX:$r_{1i} \\hat\\imath$";
            r12Label = "TEX:$r_{1j} \\hat\\jmath$";
        } else {
            e11 = eu;
            e12 = ev;
            r11Label = "TEX:$r_{1u} \\hat{u}$";
            r12Label = "TEX:$r_{1v} \\hat{v}$";
        }
        if (this.getOption("r2Basis") === "ij") {
            e21 = ei;
            e22 = ej;
            r21Label = "TEX:$r_{2i} \\hat\\imath$";
            r22Label = "TEX:$r_{2j} \\hat\\jmath$";
        } else {
            e21 = eu;
            e22 = ev;
            r21Label = "TEX:$r_{2u} \\hat{u}$";
            r22Label = "TEX:$r_{2v} \\hat{v}$";
        }

        var r11c = r1.dot(e11);
        var r12c = r1.dot(e12);
        var r21c = r2.dot(e21);
        var r22c = r2.dot(e22);
        var r11 = e11.x(r11c);
        var r12 = e12.x(r12c);
        var r21 = e21.x(r21c);
        var r22 = e22.x(r22c);

        this.arrow(O1, O1.add(ei));
        this.arrow(O1, O1.add(ej));
        if (this.getOption("showLabels")) {
            this.labelLine(O1, O1.add(ei), $V([1, 1]), "TEX:$\\hat\\imath$");
            this.labelLine(O1, O1.add(ej), $V([1, -1]), "TEX:$\\hat\\jmath$");
            this.text(O1, $V([0.5, 1]), "TEX:$O_1$");
        }

        this.arrow(O2, O2.add(eu));
        this.arrow(O2, O2.add(ev));
        if (this.getOption("showLabels")) {
            this.labelLine(O2, O2.add(eu), $V([1, -1]), "TEX:$\\hat{u}$");
            this.labelLine(O2, O2.add(ev), $V([1, -1]), "TEX:$\\hat{v}$");
            this.text(O2, $V([-0.5, 1]), "TEX:$O_2$");
        }

        this.point(P);
        this.arrow(O1, P, "position");
        this.arrow(O2, P, "position");
        this.arrow(O1, O2, "position");
        if (this.getOption("showLabels")) {
            this.text(P, $V([0, -1]), "TEX:$P$");
            this.labelLine(O1, P, $V([0, -1]), "TEX:$\\vec{r}_{O_1P}$");
            this.labelLine(O2, P, $V([0, 1]), "TEX:$\\vec{r}_{O_2P}$");
            this.labelLine(O1, O2, $V([0, -1]), "TEX:$\\vec{r}_{O_1O_2}$");
        }

        if (this.getOption("r1Basis") !== "none") {
            this.arrow(O1, O1.add(r12), "position");
            this.arrow(O1.add(r12), P, "position");
            if (this.getOption("showLabels")) {
                this.labelLine(O1, O1.add(r12), $V([0, this.sign(r12c)]), r12Label);
                this.labelLine(O1.add(r12), P, $V([0, 1]), r11Label);
            }
        }
        if (this.getOption("r2Basis") !== "none") {
            this.arrow(O2, O2.add(r22), "position");
            this.arrow(O2.add(r22), P, "position");
            if (this.getOption("showLabels")) {
                this.labelLine(O2, O2.add(r22), $V([0, -1]), r22Label);
                this.labelLine(O2.add(r22), P, $V([0, this.sign(r21c)]), r21Label);
            }
        }
    });

    var rkv_fa_c = new PrairieDrawAnim("rkv-fa-c", function(t) {
        this.setUnits(12, 8);

        this.addOption("movement", "circle");
        this.addOption("showLabels", true);
        this.addOption("showZeroTime", false);
        this.addOption("showPath", false);
        this.addOption("showVelocity", false);
        this.addOption("showAcceleration", false);
        this.addOption("showAnchoredVelocity", false);
        this.addOption("showVelDecomp", false);
        this.addOption("showAccDecomp", false);

        var O = $V([0, 0]);
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
                t += 2.5;
                return {
                    "period": 2 * Math.PI / 0.5,
                    "P": this.polarToRect($V([3, 0.5 * t]))
                };
            };
        } else if (this.getOption("movement") === "varCircle") {
            f = function(t) {
                t += 1.8;
                return {
                    "period": 2 * Math.PI / 0.5,
                    "P": this.polarToRect($V([3, -0.5 * t + 0.2 * Math.sin(t)]))
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
                    "P": this.polarToRect($V([3, -Math.PI / 2 + Math.cos(0.6 * t)]))
                };
            };
        }
        f = f.bind(this);

        var display = function(t, zeroTime) {
            var val = this.numDiff(f, t);
            var period = val.period;
            var r = val.P;
            var v = val.diff.P;
            var a = val.ddiff.P;

            var vp = this.orthProj(v, r);
            var vc = this.orthComp(v, r);
            var ap = this.orthProj(a, v);
            var ac = this.orthComp(a, v);

            var OLabel, PLabel, rLabel, vLabel, aLabel, vProjLabel, vCompLabel, aProjLabel, aCompLabel;
            if (this.getOption("showLabels")) {
                if (zeroTime) {
                    PLabel = "TEX:$P(0)$";
                    rLabel = "TEX:$\\vec{r}(0)$";
                    vLabel = "TEX:$\\vec{v}(0)$";
                    aLabel = "TEX:$\\vec{a}(0)$";
                    vProjLabel = "TEX:$\\vec{v}_\\text{proj}(0)$";
                    vCompLabel = "TEX:$\\vec{v}_\\text{comp}(0)$";
                    aProjLabel = "TEX:$\\vec{a}_\\text{proj}(0)$";
                    aCompLabel = "TEX:$\\vec{a}_\\text{comp}(0)$";
                } else {
                    OLabel = "TEX:$O$";
                    PLabel = "TEX:$P$";
                    rLabel = "TEX:$\\vec{r}$";
                    vLabel = "TEX:$\\vec{v}$";
                    aLabel = "TEX:$\\vec{a}$";
                    vProjLabel = "TEX:$\\vec{v}_\\text{proj}$";
                    vCompLabel = "TEX:$\\vec{v}_\\text{comp}$";
                    aProjLabel = "TEX:$\\vec{a}_\\text{proj}$";
                    aCompLabel = "TEX:$\\vec{a}_\\text{comp}$";
                }
            }

            this.save();
            this.translate($V([-2, 0]));
            if (this.getOption("showPath") && !zeroTime) {
                var n = 200;
                var path = [], s;
                for (var i = 0; i < n; i++) {
                    s = i / n * period;
                    path.push(f(s).P);
                }
                this.polyLine(path, true, false);
            }
            this.point(O);
            this.text(O, $V([1, 1]), OLabel);
            this.point(r);
            this.labelIntersection(r, [O, r.add(v)], PLabel);
            this.arrow(O, r, "position");
            this.labelLine(O, r, $V([0, 1]), rLabel);
            if (this.getOption("showVelocity")) {
                this.arrow(r, r.add(v), "velocity");
                this.labelLine(r, r.add(v), $V([0, -1]), vLabel);
            }
            if (this.getOption("showAcceleration")) {
                this.arrow(r.add(v), r.add(v).add(a), "acceleration");
                this.labelLine(r.add(v), r.add(v).add(a), $V([1, 0]), aLabel);
            }
            if (this.getOption("showVelDecomp")) {
                this.arrow(r, r.add(vp), "velocity");
                this.arrow(r, r.add(vc), "velocity");
                this.labelLine(r, r.add(vp), $V([1, 1]), vProjLabel);
                this.labelLine(r, r.add(vc), $V([1, 1]), vCompLabel);
            }
            if (this.getOption("showAccDecomp")) {
                this.arrow(r.add(v), r.add(v).add(ap), "acceleration");
                this.arrow(r.add(v), r.add(v).add(ac), "acceleration");
                this.labelLine(r.add(v), r.add(v).add(ap), $V([1, 1]), aProjLabel);
                this.labelLine(r.add(v), r.add(v).add(ac), $V([1, 1]), aCompLabel);
            }
            this.restore();

            if (this.getOption("showAnchoredVelocity")) {
                this.save();
                this.translate($V([4, 0]));
                if (this.getOption("showPath") && !zeroTime) {
                    var n = 200;
                    var path = [], s;
                    for (var i = 0; i < n; i++) {
                        s = i / n * period;
                        path.push(this.numDiff(f, s).diff.P);
                    }
                    this.save();
                    this.setProp("shapeOutlineColor", "rgb(0, 100, 0)");
                    this.polyLine(path, true, false);
                    this.restore();
                }
                this.arrow(O, v, "velocity");
                this.labelLine(O, v, $V([0, -1]), vLabel);
                if (this.getOption("showAcceleration")) {
                    this.arrow(v, v.add(a), "acceleration");
                    this.labelLine(v, v.add(a), $V([1, 0]), aLabel);
                }
                if (this.getOption("showAccDecomp")) {
                    this.arrow(v, v.add(ap), "acceleration");
                    this.arrow(v, v.add(ac), "acceleration");
                    this.labelLine(v, v.add(ap), $V([1, 1]), aProjLabel);
                    this.labelLine(v, v.add(ac), $V([1, 1]), aCompLabel);
                }
                this.restore();
            }
        }.bind(this);

        if (this.getOption("showZeroTime")) {
            display(0, true);
        }
        display(t, false);

    });

    rkv_fa_c.registerOptionCallback("movement", function (value) {
        rkv_fa_c.resetTime(false);
        rkv_fa_c.resetOptionValue("showPath");
        rkv_fa_c.resetOptionValue("showVelocity");
        rkv_fa_c.resetOptionValue("showAcceleration");
        rkv_fa_c.resetOptionValue("showAnchoredVelocity");
        rkv_fa_c.resetOptionValue("showVelDecomp");
        rkv_fa_c.resetOptionValue("showAccDecomp");
    });

    rkv_fa_c.registerOptionCallback("showAcceleration", function (value) {
        if (value) {
            rkv_fa_c.setOption("showVelocity", true);
        }
    });

    rkv_fa_c.registerOptionCallback("showAccDecomp", function (value) {
        if (value) {
            rkv_fa_c.setOption("showVelocity", true);
        }
    });

    var rkv_fr_c = new PrairieDrawAnim("rkv-fr-c", function(t) {
        this.setUnits(12, 8);

        this.addOption("movement", "circle");
        this.addOption("showLabels", true);
        this.addOption("showPath", false);
        this.addOption("showVelocity", false);
        this.addOption("showAcceleration", false);
        this.addOption("showVelDecomp", false);
        this.addOption("showAccDecomp", false);
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

        var er = r.subtract(O).toUnitVector();
        var et = er.rotate(Math.PI / 2, $V([0, 0]));

        var vr = this.orthProj(v, er);
        var vt = this.orthProj(v, et);
        var ar = this.orthProj(a, er);
        var at = this.orthProj(a, et);

        var label = this.getOption("showLabels") ? true : undefined;

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
        this.labelIntersection(r, [O, r.add(er), r.add(et)], label && "TEX:$P$");
        this.arrow(O, r, "position");
        this.labelLine(O, r, $V([0, 1]), label && "TEX:$\\vec{r}$");
        this.arrow(r, r.add(er));
        this.arrow(r, r.add(et));
        this.labelLine(r, r.add(er), $V([1, 1]), label && "TEX:$\\hat{e}_r$");
        this.labelLine(r, r.add(et), $V([1, 1]), label && "TEX:$\\hat{e}_\\theta$");
        if (this.getOption("showVelocity")) {
            this.arrow(r, r.add(v), "velocity");
            this.labelLine(r, r.add(v), $V([0, -1]), label && "TEX:$\\vec{v}$");
        }
        if (this.getOption("showAcceleration")) {
            this.arrow(r, r.add(a), "acceleration");
            this.labelLine(r, r.add(a), $V([1, 0]), label && "TEX:$\\vec{a}$");
        }
        if (this.getOption("showVelDecomp") && vr.modulus() > 1e-3) {
            this.arrow(r, r.add(vr), "velocity");
            this.labelLine(r, r.add(vr), $V([1, 1]), label && "TEX:$\\vec{v}_r$");
        }
        if (this.getOption("showVelDecomp") && vt.modulus() > 1e-3) {
            this.arrow(r, r.add(vt), "velocity");
            this.labelLine(r, r.add(vt), $V([1, 1]), label && "TEX:$\\vec{v}_\\theta$");
        }
        if (this.getOption("showAccDecomp") && ar.modulus() > 1e-3) {
            this.arrow(r, r.add(ar), "acceleration");
            this.labelLine(r, r.add(ar), $V([1, 1]), label && "TEX:$\\vec{a}_r$");
        }
        if (this.getOption("showAccDecomp") && at.modulus() > 1e-3) {
            this.arrow(r, r.add(at), "acceleration");
            this.labelLine(r, r.add(at), $V([1, 1]), label && "TEX:$\\vec{a}_\\theta$");
        }

    });

    rkv_fr_c.registerOptionCallback("movement", function (value) {
        rkv_fr_c.resetTime(false);
        rkv_fr_c.resetOptionValue("showPath");
        rkv_fr_c.resetOptionValue("showVelocity");
        rkv_fr_c.resetOptionValue("showAcceleration");
        rkv_fr_c.resetOptionValue("showVelDecomp");
        rkv_fr_c.resetOptionValue("showAccDecomp");
    });

}); // end of document.ready()
