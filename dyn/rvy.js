
$(document).ready(function() {

    var rvy_fd_c = new PrairieDraw("rvy-fd-c", function() {
        this.setUnits(11, 11);

        this.addOption("r", 4);
        this.addOption("thetaDeg", 45);
        this.addOption("z", 4);

        this.addOption("showLabels", true);
        this.addOption("showCoords", true);
        this.addOption("showBasis", false);

        this.addOption("showCoordLineR", false);
        this.addOption("showCoordLineTheta", false);
        this.addOption("showCoordLineZ", false);

        var O = $V([0, 0, 0]);
        var rX = $V([5, 0, 0]);
        var rY = $V([0, 5, 0]);
        var rZ = $V([0, 0, 5]);
        this.arrow(O, rX);
        this.arrow(O, rY);
        this.arrow(O, rZ);
        if (this.getOption("showLabels")) {
            this.labelLine(O, rX, $V([1, -1]), "TEX:$x$");
            this.labelLine(O, rY, $V([1, 1]), "TEX:$y$");
            this.labelLine(O, rZ, $V([1, 1]), "TEX:$z$");
        }

        var r = this.getOption("r");
        var theta = this.degToRad(this.getOption("thetaDeg"));
        var z = this.getOption("z");

        var p = this.cylindricalToRect($V([r, theta, z]));
        var pXY = this.cylindricalToRect($V([r, theta, 0]));
        var pZ = this.cylindricalToRect($V([0, 0, z]));
        var pX = this.cylindricalToRect($V([r, 0, 0]));
        var pXZ = this.cylindricalToRect($V([r, 0, z]));

        if (this.getOption("showLabels")) {
            this.labelIntersection(O, [rX, rY, rZ, p, pXY], "TEX:$O$");
            this.labelIntersection(p, [O, pXY], "TEX:$P$");
        }

        if (this.getOption("showCoordLineR")) {
            var pZExt = this.cylindricalToRect($V([6, theta, z]));
            this.save();
            this.setProp("shapeStrokePattern", "dashed");
            this.line(pZ, pZExt);
            this.restore();
        }

        if (this.getOption("showCoordLineTheta")) {
            this.save();
            this.setProp("shapeStrokePattern", "dashed");
            this.arc3D(pZ, r, Vector.k);
            this.restore();
        }

        if (this.getOption("showCoordLineZ")) {
            var pZ1 = this.cylindricalToRect($V([r, theta, -5]));
            var pZ2 = this.cylindricalToRect($V([r, theta, 5]));
            this.save();
            this.setProp("shapeStrokePattern", "dashed");
            this.line(pZ1, pZ2);
            this.restore();
        }

        this.arrow(O, p, "position");
        if (this.getOption("showLabels")) {
            this.labelLine(O, p, $V([0, 1]), "TEX:$\\vec{\\rho}$");
        }

        if (this.getOption("showCoords")) {
            this.save();
            this.setProp("shapeStrokePattern", "dashed");
            this.setProp("arrowLinePattern", "dashed");
            if (z !== 0 && theta !== 0) {
                this.arrow(O, pXY);
            }
            if (this.getOption("showLabels")) {
                this.labelLine(O, pXY, $V([0, -1]), "TEX:$r$");
            }
            if (z !== 0) {
                this.line(pZ, p);
            }
            if (z !== 0 && theta !== 0) {
                this.line(pZ, pXZ);
            }

            if (!(this.getOption("showCoordLineTheta") && z === 0)) {
                this.circleArrow3D(O, r, Vector.k, Vector.i, 0, theta);
            }
            if (!this.getOption("showCoordLineTheta")) {
                this.arc3D(pZ, r, Vector.k, Vector.i, 0, theta);
            }
            if (this.getOption("showLabels")) {
                var thetaText = undefined;
                if (theta > 0) {
                    thetaText = "TEX:$\\theta$";
                } else if (theta < 0) {
                    thetaText = "TEX:$-\\theta$";
                }
                this.labelCircleLine3D(thetaText, $V([0, 1]), O, r, Vector.k, Vector.i, 0, theta);
            }

            if (!this.getOption("showCoordLineZ")) {
                this.arrow(pXY, p);
            }
            if (theta !== 0) {
                this.line(pX, pXZ);
            };
            if (z < 0) {
                this.line(O, pZ);
            }
            if (this.getOption("showLabels")) {
                if (z > 0) {
                    this.labelLine(pXY, p, $V([0, -1]), "TEX:$z$");
                } else if (z < 0) {
                    this.labelLine(pXY, p, $V([0, 1]), "TEX:$-z$");
                }
            }
            this.restore();
        }

        if (this.getOption("showBasis")) {
            var eR = this.cylindricalToRect($V([1, theta, 0]));
            var eTheta = $V([-Math.sin(theta), Math.cos(theta), 0]);
            var eZ = $V([0, 0, 1]);
            this.arrow(p, p.add(eR));
            this.arrow(p, p.add(eTheta));
            this.arrow(p, p.add(eZ));
            if (this.getOption("showLabels")) {
                this.labelLine(p, p.add(eR), $V([1, 0]), "TEX:$\\hat{e}_r$");
                this.labelLine(p, p.add(eTheta), $V([1, 0]), "TEX:$\\hat{e}_\\theta$");
                this.labelLine(p, p.add(eZ), $V([1, 0]), "TEX:$\\hat{e}_z$");
            }
        }
    });

    rvy_fd_c.activate3DControl();

    var rvy_ec_c = new PrairieDraw("rvy-ec-c", function() {
        this.setUnits(11, 11);

        var O = $V([0, 0, 0]);
        var rX = $V([5, 0, 0]);
        var rY = $V([0, 5, 0]);
        var rZ = $V([0, 0, 5]);
        this.arrow(O, rX);
        this.arrow(O, rY);
        this.arrow(O, rZ);

        var r = 7;
        var theta = Math.PI / 4;
        var phi = Math.PI / 4;

        var p = this.sphericalToRect($V([r, theta, phi]));
        var pXY = $V([p.e(1), p.e(2), 0]);
        var pX = $V([p.e(1), 0, 0]);

        this.arrow(O, p, "position");
        this.labelLine(O, p, $V([0, 1]), "TEX:$\\rho$");

        this.save();
        this.setProp("shapeStrokePattern", "dashed");

        this.line(O, pXY);
        this.labelLine(O, pXY, $V([0, 1]), "TEX:$r$");

        this.line(pXY, p);
        this.labelLine(pXY, p, $V([0, -1]), "TEX:$z$");

        this.line(pX, pXY);
        this.labelLine(pX, pXY, $V([0, -1]), "TEX:$y$");

        this.labelLine(O, pX, $V([0, -1]), "TEX:$x$");

        this.labelAngle(O, pX, pXY, "TEX:$\\theta$");

        this.restore();
    });

    rvy_ec_c.activate3DControl();

}); // end of document.ready()
