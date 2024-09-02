
$(document).ready(function() {

    var rvs_fd_c = new PrairieDraw("rvs-fd-c", function() {
        this.setUnits(11, 11);

        this.addOption("r", 4);
        this.addOption("thetaDeg", 45);
        this.addOption("phiDeg", 45);

        this.addOption("showLabels", true);
        this.addOption("showCoords", true);
        this.addOption("showBasis", false);

        this.addOption("showCoordLineR", false);
        this.addOption("showCoordLineTheta", false);
        this.addOption("showCoordLinePhi", false);

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
        var phiDeg = this.getOption("phiDeg");
        var phi = this.degToRad(phiDeg);

        var p = this.sphericalToRect($V([r, theta, phi]));
        var rXY = $V([p.e(1), p.e(2), 0]);
        var rXY_mod = rXY.modulus();
        var nXY = rXY.cross(Vector.k);
        var pZ = $V([0, 0, r]);

        if (this.getOption("showLabels")) {
            this.labelIntersection(O, [rX, rY, rZ, p, rXY], "TEX:$O$");
            this.labelIntersection(p, [O, rXY, pZ], "TEX:$P$");
        }

        if (this.getOption("showCoordLineR")) {
            var pExt = this.sphericalToRect($V([7, theta, phi]));
            this.save();
            this.setProp("shapeStrokePattern", "dashed");
            this.line(pExt, p);
            this.restore();
        }

        if (this.getOption("showCoordLineTheta")) {
            var pTheta = $V([0, 0, r * Math.cos(phi)]);
            var rTheta = r * Math.sin(phi);
            this.save();
            this.setProp("shapeStrokePattern", "dashed");
            this.arc3D(pTheta, rTheta, Vector.k);
            this.restore();
        }

        if (this.getOption("showCoordLinePhi")) {
            this.save();
            this.setProp("shapeStrokePattern", "dashed");
            this.arc3D(O, r, nXY, Vector.k, -Math.PI, 0);
            this.restore();
        }

        this.arrow(O, p, "position");
        if (this.getOption("showLabels")) {
            this.labelLine(O, p, $V([0, 1]), "TEX:$\\vec{r}$");
        }

        if (this.getOption("showCoords")) {
            this.save();
            this.setProp("shapeStrokePattern", "dashed");
            this.setProp("arrowLinePattern", "dashed");
            if (phiDeg !== 90) {
                this.line(O, rXY);
            }

            if (!(this.getOption("showCoordLineTheta") && phiDeg === 90)) {
                this.circleArrow3D(O, rXY_mod, Vector.k, Vector.i, 0, theta);
                if (phiDeg !== 90) {
                    this.line(rXY, p);
                    this.rightAngle(rXY, $V([0, 0, p.e(3)]), rXY.x(-1));
                }
            }
            if (this.getOption("showLabels")) {
                var thetaText = undefined;
                if (theta > 0) {
                    thetaText = "TEX:$\\theta$";
                } else if (theta < 0) {
                    thetaText = "TEX:$-\\theta$";
                }
                this.labelCircleLine3D(thetaText, $V([0, 1]), O, rXY_mod, Vector.k, Vector.i, 0, theta);
            }

            if (!this.getOption("showCoordLinePhi")) {
                this.circleArrow3D(O, r, nXY, pZ, 0, -phi);
            }
            if (this.getOption("showLabels")) {
                this.labelCircleLine3D("TEX:$\\phi$", $V([0, 1]), O, r, nXY, pZ, 0, -phi);
            }
            this.restore();
        }

        if (this.getOption("showBasis")) {
            var sBasis = this.sphericalBasis($V([r, theta, phi]));

            var eR = sBasis[0];
            var eTheta = sBasis[1];
            var ePhi = sBasis[2];
            this.arrow(p, p.add(eR));
            this.arrow(p, p.add(eTheta));
            this.arrow(p, p.add(ePhi));
            if (this.getOption("showLabels")) {
                this.labelLine(p, p.add(eR), $V([1, 0]), "TEX:$\\hat{e}_r$");
                this.labelLine(p, p.add(eTheta), $V([1, 0]), "TEX:$\\hat{e}_\\theta$");
                this.labelLine(p, p.add(ePhi), $V([1, 0]), "TEX:$\\hat{e}_\\phi$");
            }
        }
    });

    rvs_fd_c.activate3DControl();

    var rvs_ec_c = new PrairieDraw("rvs-ec-c", function() {
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
        var phi = 1.2 * Math.PI / 4;

        var p = this.sphericalToRect($V([r, theta, phi]));
        var pXY = $V([p.e(1), p.e(2), 0]);
        var pX = $V([p.e(1), 0, 0]);
        var pZ = $V([0, 0, p.e(3)]);

        this.arrow(O, p, "position");
        this.labelLine(O, p, $V([0, 1]), "TEX:$r$");

        this.save();
        this.setProp("shapeStrokePattern", "dashed");

        this.line(O, pXY);
        this.labelLine(O, pXY, $V([0.3, 1]), "TEX:$\\ell$");

        this.line(pXY, p);
        this.labelLine(pXY, p, $V([0, -1]), "TEX:$z$");

        this.line(pX, pXY);
        this.labelLine(pX, pXY, $V([0, -1]), "TEX:$y$");

        this.labelLine(O, pX, $V([0, -1]), "TEX:$x$");

        this.labelAngle(O, p, pZ, "TEX:$\\phi$");
        this.labelAngle(O, pX, pXY, "TEX:$\\theta$");

        this.restore();
    });

    rvs_ec_c.activate3DControl();

}); // end of document.ready()
