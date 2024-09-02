
$(document).ready(function() {

    var rkr_fc_c = new PrairieDrawAnim("rkr-fc-c", function(t) {
        this.setUnits(4.5, 3);

        this.addOption("showLabels", true);
        this.addOption("showAngVel", true);
        this.addOption("axis", "k");
        this.addOption("showVectors", false);

        var O = $V([0, 0, 0]);
        var rX = $V([1, 0, 0]);
        var rY = $V([0, 1, 0]);
        var rZ = $V([0, 0, 1]);
        var gS = 2; // ground size

        var theta = t - 0.5 * Math.sin(t);
        var omega = 1 - 0.5 * Math.cos(t);

        var axis;
        if (this.getOption("axis") === "i") {
            axis = Vector.i;
        } else if (this.getOption("axis") === "j") {
            axis = Vector.j;
        } else if (this.getOption("axis") === "k") {
            axis = Vector.k;
        } else if (this.getOption("axis") === "ij") {
            axis = Vector.i.add(Vector.j);
        } else if (this.getOption("axis") === "ijk") {
            axis = Vector.i.add(Vector.j).add(Vector.k);
        }

        var omegaVec = axis.toUnitVector().x(omega);

        var splitLine = function(p1, p2, type, drawAbove) {
            var above = [], below = [];
            if (p1.e(3) >= 0 && p2.e(3) >= 0) {
                above = [p1, p2];
            } else if (p1.e(3) <= 0 && p2.e(3) <= 0) {
                below = [p1, p2];
            } else {
                var alpha = p1.e(3) / (p1.e(3) - p2.e(3));
                var p3 = p1.x(1 - alpha).add(p2.x(alpha));
                if (p1.e(3) >= 0) {
                    above = [p1, p3];
                    below = [p3, p2];
                } else {
                    above = [p3, p2];
                    below = [p1, p3];
                }
            }
            if (drawAbove) {
                if (above.length === 2) {
                    this.line(above[0], above[1], type);
                }
            } else {
                if (below.length === 2) {
                    this.line(below[0], below[1], type);
                }
            }
        }.bind(this);

        var cube = {};
        cube["000"] = $V([-1, -1, -1]).rotate(theta, $L(O, axis));
        cube["001"] = $V([-1, -1,  1]).rotate(theta, $L(O, axis));
        cube["010"] = $V([-1,  1, -1]).rotate(theta, $L(O, axis));
        cube["011"] = $V([-1,  1,  1]).rotate(theta, $L(O, axis));
        cube["100"] = $V([ 1, -1, -1]).rotate(theta, $L(O, axis));
        cube["101"] = $V([ 1, -1,  1]).rotate(theta, $L(O, axis));
        cube["110"] = $V([ 1,  1, -1]).rotate(theta, $L(O, axis));
        cube["111"] = $V([ 1,  1,  1]).rotate(theta, $L(O, axis));

        if (this.getOption("showVectors")) {
            for (var c in cube) {
                if (cube[c].e(3) < 0) {
                    this.arrow(O, cube[c], "position");
                }
            }
        }

        splitLine(cube["000"], cube["001"], undefined, false);
        splitLine(cube["010"], cube["011"], undefined, false);
        splitLine(cube["100"], cube["101"], undefined, false);
        splitLine(cube["110"], cube["111"], undefined, false);
        splitLine(cube["000"], cube["010"], undefined, false);
        splitLine(cube["010"], cube["110"], undefined, false);
        splitLine(cube["110"], cube["100"], undefined, false);
        splitLine(cube["100"], cube["000"], undefined, false);
        splitLine(cube["001"], cube["011"], undefined, false);
        splitLine(cube["011"], cube["111"], undefined, false);
        splitLine(cube["111"], cube["101"], undefined, false);
        splitLine(cube["101"], cube["001"], undefined, false);

        var groundBorder = [$V([-gS, -gS, 0]), $V([-gS, gS, 0]), $V([gS, gS, 0]), $V([gS, -gS, 0])];
        var groundAlpha = 0.8;
        this.save();
        this.setProp("shapeInsideColor", "rgba(255, 255, 255, " + groundAlpha + ")");
        this.polyLine(groundBorder, true, true);
        this.restore();

        var nGrid = 3;
        for (var i = -nGrid; i <= nGrid; i++) {
            this.line($V([i / nGrid * gS, -gS, 0]), $V([i / nGrid * gS, gS, 0]), "grid");
            this.line($V([-gS, i / nGrid * gS, 0]), $V([gS, i / nGrid * gS, 0]), "grid");
        }
        var faceLine = function(points) {
            var line = [];
            var lastPoint = points[3];
            var lastAbove = (lastPoint.e(3) > 0);
            for (var i = 0; i < 4; i++) {
                var above = (points[i].e(3) > 0);
                if (above !== lastAbove) {
                    var alpha = this.linearDeinterp(points[i].e(3), lastPoint.e(3), 0);
                    line.push(this.linearInterpVector(points[i], lastPoint, alpha));
                }
                lastPoint = points[i];
                lastAbove = above;
            }
            if (line.length === 2) {
                this.line(line[0], line[1], "grid");
            }
        }.bind(this);

        faceLine([cube["000"], cube["001"], cube["011"], cube["010"]]);
        faceLine([cube["100"], cube["101"], cube["111"], cube["110"]]);
        faceLine([cube["000"], cube["001"], cube["101"], cube["100"]]);
        faceLine([cube["010"], cube["011"], cube["111"], cube["110"]]);
        faceLine([cube["000"], cube["010"], cube["110"], cube["100"]]);
        faceLine([cube["001"], cube["011"], cube["111"], cube["101"]]);

        this.polyLine(groundBorder, true, false);
        this.arrow(O, rX);
        this.arrow(O, rY);
        this.arrow(O, rZ);
        if (this.getOption("showLabels")) {
            this.labelLine(O, rX, $V([1, -1]), "TEX:$x$");
            this.labelLine(O, rY, $V([1, 1]), "TEX:$y$");
            this.labelLine(O, rZ, $V([1, 1]), "TEX:$z$");
        }

        if (this.getOption("showVectors")) {
            for (var c in cube) {
                if (cube[c].e(3) >= 0) {
                    this.arrow(O, cube[c], "position");
                }
            }
        }

        splitLine(cube["000"], cube["001"], undefined, true);
        splitLine(cube["010"], cube["011"], undefined, true);
        splitLine(cube["100"], cube["101"], undefined, true);
        splitLine(cube["110"], cube["111"], undefined, true);
        splitLine(cube["000"], cube["010"], undefined, true);
        splitLine(cube["010"], cube["110"], undefined, true);
        splitLine(cube["110"], cube["100"], undefined, true);
        splitLine(cube["100"], cube["000"], undefined, true);
        splitLine(cube["001"], cube["011"], undefined, true);
        splitLine(cube["011"], cube["111"], undefined, true);
        splitLine(cube["111"], cube["101"], undefined, true);
        splitLine(cube["101"], cube["001"], undefined, true);

        if (this.getOption("showAngVel")) {
            this.arrow(O, omegaVec, "angVel");
            if (this.getOption("showLabels")) {
                this.labelLine(O, omegaVec, $V([1, 1]), "TEX:$\\vec{\\omega}$");
            }
        }

    });

    rkr_fc_c.activate3DControl();

    var rkr_fe_c = new PrairieDrawAnim("rkr-fe-c", function(t) {
        this.setUnits(4.5, 3);

        this.addOption("showLabels", true);
        this.addOption("showVelocity", false);

        var O = $V([0, 0, 0]);
        var rX = $V([1, 0, 0]);
        var rY = $V([0, 1, 0]);
        var rZ = $V([0, 0, 1]);
        var gS = 2; // ground size

        var theta = 1.2 * Math.sin(t);
        var omega = 1.2 * Math.cos(t);
        var omegaVec = $V([0, 0, omega]);

        var p = $V([1.2, 0, 0]).rotate(theta, $L(O, Vector.k));
        var v = omegaVec.cross(p);

        if (omegaVec.e(3) < 0) {
            this.arrow(O, omegaVec, "angVel");
            this.labelLine(O, omegaVec, $V([1, 1]), "TEX:$\\vec{\\omega}$");
        }

        var groundBorder = [$V([-gS, -gS, 0]), $V([-gS, gS, 0]), $V([gS, gS, 0]), $V([gS, -gS, 0])];
        var groundAlpha = 0.8;
        this.save();
        this.setProp("shapeInsideColor", "rgba(255, 255, 255, " + groundAlpha + ")");
        this.polyLine(groundBorder, true, true);
        this.restore();

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

        if (omegaVec.e(3) >= 0) {
            this.arrow(O, omegaVec, "angVel");
            this.labelLine(O, omegaVec, $V([1, 1]), "TEX:$\\vec{\\omega}$");
        }

        this.arrow(O, p, "position");
        this.labelLine(O, p, $V([1, 0]), "TEX:$\\hat{a}$");

        if (this.getOption("showVelocity")) {
            this.arrow(p, p.add(v), "velocity");
            this.labelLine(p, p.add(v), $V([1, 0]), "TEX:$\\dot{\\hat{a}}$");
        }

        this.circleArrow3D(O, 0.7, Vector.k, Vector.i, -omega / 2, omega / 2, "angVel");
        var omegaText = (omega >= 0) ? "TEX:$\\omega$" : "TEX:$-\\omega$";
        this.labelCircleLine3D(omegaText, $V([1, 1]), O, 0.7, Vector.k, Vector.i, -omega / 2, omega / 2);

        this.circleArrow3D(O, 0.5, Vector.k, Vector.i, 0, theta, "angle");
        var thetaText = (theta >= 0) ? "TEX:$\\theta$" : "TEX:$-\\theta$";
        this.labelCircleLine3D(thetaText, $V([0, -1]), O, 0.5, Vector.k, Vector.i, 0, theta);
    });

    rkr_fe_c.activate3DControl();

    var rkr_fg_c = new PrairieDrawAnim("rkr-fg-c", function(t) {
        this.setUnits(9, 6);

        this.addOption("showLabels", true);
        this.addOption("showMoving", true);
        this.addOption("showRigid", false);
        this.addOption("showFixed", false);
        this.addOption("showDerivatives", false);

        var O = $V([0, 0]);
        var theta = t - 1.5 * Math.cos(t) + Math.PI / 2;
        var omega = 1 + 1.5 * Math.sin(t);

        var bases = [
            $V([-0.7, -0.7]).rotate(theta, O),
            $V([0.7, 0.2]).rotate(theta, O),
            $V([-0.3, 0.5]).rotate(theta, O),
            $V([0.4, -0.9]).rotate(theta, O),
        ];

        var moveBases = [
            $V([0.4 * Math.sin(0.4 * t), Math.sin(0.9 * t + 0.5)]),
            $V([0.4 * Math.cos(0.6 * t), Math.sin(1.5 * t)]),
            $V([0.4 * Math.sin(0.7 * t + 3), Math.cos(1.3 * t + 3)]),
            $V([0.4 * Math.sin(1.2 * t + 0.8), Math.cos(0.2 * t + 1.2)]),
        ];

        var vecs = [
            $V([0.7, 0.7]).rotate(theta, O),
            $V([0.2, -0.5]).rotate(theta, O),
            $V([-0.6, 0.8]).rotate(theta, O),
            $V([-0.5, -0.4]).rotate(theta, O),
        ];

        var derivatives = [
            vecs[0].rotate(Math.PI / 2, O).x(omega),
            vecs[1].rotate(Math.PI / 2, O).x(omega),
            vecs[2].rotate(Math.PI / 2, O).x(omega),
            vecs[3].rotate(Math.PI / 2, O).x(omega),
        ];

        var offset = $V([0.3 * Math.sin(0.8 * t), Math.sin(2 * 0.8 * t)]);

        var omegaText = (omega >= 0) ? "TEX:$\\omega$" : "TEX:$-\\omega$";

        if (this.getOption("showMoving")) {
            this.save();
            this.translate($V([-3, 0]));
            this.arrow(moveBases[0], moveBases[0].add(vecs[0]), "position");
            this.arrow(moveBases[1], moveBases[1].add(vecs[1]), "acceleration");
            this.arrow(moveBases[2], moveBases[2].add(vecs[2]), "angMom");
            this.arrow(moveBases[3], moveBases[3].add(vecs[3]));
            /*if (this.getOption("showLabels")) {
                this.labelLine(moveBases[0], moveBases[0].add(vecs[0]), $V([1, 0]), "TEX:$\\vec{a}$");
                this.labelLine(moveBases[1], moveBases[1].add(vecs[1]), $V([1, 0]), "TEX:$\\vec{b}$");
                this.labelLine(moveBases[2], moveBases[2].add(vecs[2]), $V([1, 0]), "TEX:$\\vec{c}$");
                this.labelLine(moveBases[3], moveBases[3].add(vecs[3]), $V([1, 0]), "TEX:$\\vec{d}$");
            }*/
            if (this.getOption("showDerivatives")) {
                this.arrow(moveBases[0].add(vecs[0]), moveBases[0].add(vecs[0]).add(derivatives[0]), "velocity");
                this.arrow(moveBases[1].add(vecs[1]), moveBases[1].add(vecs[1]).add(derivatives[1]), "velocity");
                this.arrow(moveBases[2].add(vecs[2]), moveBases[2].add(vecs[2]).add(derivatives[2]), "velocity");
                this.arrow(moveBases[3].add(vecs[3]), moveBases[3].add(vecs[3]).add(derivatives[3]), "velocity");
            }
            this.circleArrow(O, 1, Math.PI / 2 - omega / 2, Math.PI / 2 + omega / 2, "angVel", true, 0.1);
            this.labelCircleLine(O, 1, Math.PI / 2 - omega / 2, Math.PI / 2 + omega / 2, $V([0, 1]), omegaText, true);
            this.restore();
        }

        if (this.getOption("showRigid")) {
            this.save();
            this.translate($V([0, 0]));
            this.translate(offset);
            this.arrow(bases[0], bases[0].add(vecs[0]), "position");
            this.arrow(bases[1], bases[1].add(vecs[1]), "acceleration");
            this.arrow(bases[2], bases[2].add(vecs[2]), "angMom");
            this.arrow(bases[3], bases[3].add(vecs[3]));
            /*if (this.getOption("showLabels")) {
                this.labelLine(bases[0], bases[0].add(vecs[0]), $V([1, 0]), "TEX:$\\vec{a}$");
                this.labelLine(bases[1], bases[1].add(vecs[1]), $V([1, 0]), "TEX:$\\vec{b}$");
                this.labelLine(bases[2], bases[2].add(vecs[2]), $V([1, 0]), "TEX:$\\vec{c}$");
                this.labelLine(bases[3], bases[3].add(vecs[3]), $V([1, 0]), "TEX:$\\vec{d}$");
            }*/
            if (this.getOption("showDerivatives")) {
                this.arrow(bases[0].add(vecs[0]), bases[0].add(vecs[0]).add(derivatives[0]), "velocity");
                this.arrow(bases[1].add(vecs[1]), bases[1].add(vecs[1]).add(derivatives[1]), "velocity");
                this.arrow(bases[2].add(vecs[2]), bases[2].add(vecs[2]).add(derivatives[2]), "velocity");
                this.arrow(bases[3].add(vecs[3]), bases[3].add(vecs[3]).add(derivatives[3]), "velocity");
            }
            this.circleArrow(O, 1, theta + Math.PI / 2 - omega / 2, theta + Math.PI / 2 + omega / 2, "angVel", true, 0.1);
            this.labelCircleLine(O, 1, theta + Math.PI / 2 - omega / 2, theta + Math.PI / 2 + omega / 2, $V([0, 1]), omegaText, true);
            this.restore();
        }

        if (this.getOption("showFixed")) {
            this.save();
            this.translate($V([3, 0]));
            this.arrow(O, vecs[0], "position");
            this.arrow(O, vecs[1], "acceleration");
            this.arrow(O, vecs[2], "angMom");
            this.arrow(O, vecs[3]);
            /*if (this.getOption("showLabels")) {
                this.labelLine(O, vecs[0], $V([1, 0]), "TEX:$\\vec{a}$");
                this.labelLine(O, vecs[1], $V([1, 0]), "TEX:$\\vec{b}$");
                this.labelLine(O, vecs[2], $V([1, 0]), "TEX:$\\vec{c}$");
                this.labelLine(O, vecs[3], $V([1, 0]), "TEX:$\\vec{d}$");
            }*/
            if (this.getOption("showDerivatives")) {
                this.arrow(vecs[0], vecs[0].add(derivatives[0]), "velocity");
                this.arrow(vecs[1], vecs[1].add(derivatives[1]), "velocity");
                this.arrow(vecs[2], vecs[2].add(derivatives[2]), "velocity");
                this.arrow(vecs[3], vecs[3].add(derivatives[3]), "velocity");
            }
            this.circleArrow(O, 1, Math.PI / 2 - omega / 2, Math.PI / 2 + omega / 2, "angVel", true, 0.1);
            this.labelCircleLine(O, 1, Math.PI / 2 - omega / 2, Math.PI / 2 + omega / 2, $V([0, 1]), omegaText, true);
            this.restore();
        }
    });

}); // end of document.ready()
