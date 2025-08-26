$(document).ready(function(){
        rvp_fc_c = new PrairieDraw("rvp-fc-c", function() {
            this.setUnits(8, 8);
    
            var d = 3;
            var e = 0.6;
    
            var i;
            for (i = -d; i <= d; i++) {
                this.line($V([-d, i]), $V([d, i]), "grid");
                this.line($V([i, -d]), $V([i, d]), "grid");
            }
    
            this.arrow($V([-d - e, 0]), $V([d + e, 0]));
            this.arrow($V([0, -d - e]), $V([0, d + e]));
            this.labelLine($V([-d - e, 0]), $V([d + e, 0]), $V([1, -1]), "TEX:$x$");
            this.labelLine($V([0, -d - e]), $V([0, d + e]), $V([1, 1]), "TEX:$y$");
    
            this.text($V([0, 0]), $V([1, 1]), "TEX:$O$")
    
            this.save();
            this.setProp("shapeOutlineColor", "green");
            this.setProp("pointRadiusPx", 4);
            this.line($V([0, 0]), $V([2, 0]));
            this.line($V([2, 0]), $V([2, 1]));
            this.point($V([2, 1]));
            this.text($V([2, 1]), $V([-1.2, 0]), "TEX: $x = 2$ \\\\ $y = 1$");
            this.restore();
    
            this.save();
            this.setProp("shapeOutlineColor", "blue");
            this.setProp("pointRadiusPx", 4);
            this.line($V([0, 0]), $V([-3, 0]));
            this.line($V([-3, 0]), $V([-3, 2]));
            this.point($V([-3, 2]));
            this.text($V([-3, 2]), $V([-1.2, 0]), "TEX: $x = -3$ \\\\ $y = 2$");
            this.restore();
    
            this.save();
            this.setProp("shapeOutlineColor", "red");
            this.setProp("pointRadiusPx", 4);
            this.line($V([0, 0]), $V([0, -2]));
            this.point($V([0, -2]));
            this.text($V([0, -2]), $V([-1.2, 0]), "TEX: $x = 0$ \\\\ $y = -2$");
            this.restore();
        });

        rvp_fp_c = new PrairieDraw("rvp-fp-c", function() {
            this.setUnits(8, 8);
    
            var d = 3;
            var e = 0.6;
            var O = $V([0, 0]);
            var P;
    
            var i;
            this.save();
            this.setProp("shapeOutlineColor", this.getProp("gridColor"));
            for (i = 1; i <= d; i++) {
                this.arc(O, i);
            }
            var n = 12;
            for (i = 0; i < n; i++) {
                this.line(O, this.vector2DAtAngle(i / n * 2 * Math.PI).x(d));
            }
            this.restore();
    
            this.arrow(O, $V([3.7, 0]));
            this.labelLine(O, $V([3.5, 0]), $V([1, -1.4]), "TEX:$r$");
            this.circleArrow(O, 3.2, 0, 1.2, undefined, true, 0.1);
            this.labelCircleLine(O, 3.2, 0, 1.2, $V([0.7, 1.3]), "TEX:$\\theta$");
    
            this.text(O, $V([1, 1]), "TEX:$O$")
    
            this.save();
            this.setProp("shapeOutlineColor", "green");
            this.setProp("pointRadiusPx", 4);
            P = this.vector2DAtAngle(Math.PI / 6).x(2);
            this.arc(O, 1.6, 0, Math.PI / 6);
            this.line(O, P);
            this.point(P);
            this.text(P, $V([0, -1.2]), "TEX: $r = 2$ \\\\ $\\theta = \\frac{\\pi}{6}$");
            this.restore();
    
            this.save();
            this.setProp("shapeOutlineColor", "blue");
            this.setProp("pointRadiusPx", 4);
            P = this.vector2DAtAngle(Math.PI).x(3);
            this.arc(O, 1.2, 0, Math.PI);
            this.line(O, P);
            this.point(P);
            this.text(P, $V([0, -1.2]), "TEX: $r = 3$ \\\\ $\\theta = \\pi$");
            this.restore();
    
            this.save();
            this.setProp("shapeOutlineColor", "red");
            this.setProp("pointRadiusPx", 4);
            P = this.vector2DAtAngle(-Math.PI / 4).x(2);
            this.arc(O, 1.4, -Math.PI / 4, 0);
            this.line(O, P);
            this.point(P);
            this.text(P, $V([0, 1.2]), "TEX: $r = 2$ \\\\ $\\theta = -\\frac{\\pi}{4}$");
            this.restore();
        });

    rvs_fd_c = new PrairieDraw("rvs-fd-c", function() {
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

    rvs_ec_c = new PrairieDraw("rvs-ec-c", function() {
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

    var compressMap = function(data) {
        var smoothTol = 1; // degrees
        var patchTol = 1; // degrees

        var mapSize = function(d) {
            var n = 0;
            for (var i = 0; i < d.length; i++) {
                n += d[i].length;
            }
            return n;
        }

        var dist = function(p1, p2) {
            return $V(p1).subtract($V(p2)).modulus();
        };

        var compressLine = function(points) {
            if (points.length < 1) {
                return points;
            }
            var newPoints = [points[0]];
            for (var i = 1; i < points.length - 1; i++) {
                if (dist(newPoints[newPoints.length - 1], points[i + 1]) > smoothTol) {
                    newPoints.push(points[i]);
                }
            }
            newPoints.push(points[points.length - 1]);
            return newPoints;
        };

        var compressAllLines = function(d) {
            var newD = [];
            for (var i = 0; i < d.length; i++) {
                newD.push(compressLine(d[i]));
            }
            return newD;
        };

        var joinSegments = function(d) {
            if (d.length < 1) {
                return d;
            }
            var newD = [d[0]];
            for (var i = 1; i < d.length; i++) {
                var found = false;
                var addLine = d[i];
                var joinedLine;
                for (var j = 0; j < newD.length; j++) {
                    var oldLine = newD[j];
                    if (dist(oldLine[0], addLine[0]) < patchTol) {
                        addLine.reverse();
                        joinedLine = addLine.concat(oldLine);
                        found = true;
                    } else if (dist(oldLine[0], addLine[addLine.length - 1]) < patchTol) {
                        joinedLine = addLine.concat(oldLine);
                        found = true;
                    } else if (dist(oldLine[oldLine.length - 1], addLine[0]) < patchTol) {
                        joinedLine = oldLine.concat(addLine);
                        found = true;
                    } else if (dist(oldLine[oldLine.length - 1], addLine[addLine.length - 1]) < patchTol) {
                        addLine.reverse();
                        joinedLine = oldLine.concat(addLine);
                        found = true;
                    }
                    if (found) {
                        break;
                    }
                }
                if (found) {
                    newD.splice(j, 1, joinedLine);
                } else {
                    newD.push(addLine);
                }
            }
            return newD;
        };

        console.log("original number of segments", data.length);
        console.log("original size", mapSize(data));

        var data2 = joinSegments(data);
        console.log("new number of segments", data2.length);

        var data3 = compressAllLines(data2);
        console.log("new size", mapSize(data3));

        return data3;
    };

    var logMap = function(name, data, prec) {
        console.log(name + " = [");
        for (var i = 0; i < data.length; i++) {
            console.log("    [");
            for (var j = 0; j < data[i].length; j++) {
                console.log("        ["
                            + data[i][j][0].toFixed(prec) + ", "
                            + data[i][j][1].toFixed(prec) + "],");
            }
            console.log("    ],");
        }
        console.log("];")
    }

    //var compressedWorldCoastline = compressMap(worldCoastline);
    //logMap("worldCoastline", compressedWorldCoastline, 1);

    aos_fm_c = new PrairieDraw("aos-fm-c", function() {
        this.setUnits(360, 180);

        this.addOption("showMapPath", false);
        this.addOption("showShortestPath", false);

        this.save();
        this.setProp("shapeStrokeWidthPx", 1);
        this.setProp("shapeOutlineColor", "rgb(200, 200, 200)");
        var i;
        for (i = -170; i <= 170; i += 10) {
            this.line($V([i, -90]), $V([i, 90]));
        }
        for (i = -80; i <= 80; i += 10) {
            this.line($V([-180, i]), $V([180, i]));
        }
        this.restore();

        this.save();
        this.setProp("shapeStrokeWidthPx", 1);
        for (i = 0; i < worldCoastline.length; i++) {
            this.polyLine(this.pairsToVectors(worldCoastline[i]));
        }
        this.restore();

        var greatCircleWidthPx = 4;
        var greatCircleColor = "rgb(0, 255, 0)";
        var cityRadiusPx = 6;
        var cityColor1 = "rgb(255, 0, 0)";
        var cityColor2 = "rgb(0, 0, 255)";

        var aLat = 40 + 6 / 60 + 35 / 3600;       // Urbana
        var aLong = -(88 + 12 / 60 + 15 / 3600);
        var bLat = 28 + 36 / 60 + 36 / 3600;      // Delhi
        var bLong = 77 + 13 / 60 + 48 / 3600;

        var aP = $V([aLong, aLat]);
        var bP = $V([bLong, bLat]);

        var aS = $V([1, this.degToRad(aLong), Math.PI/2 - this.degToRad(aLat)]);
        var bS = $V([1, this.degToRad(bLong), Math.PI/2 - this.degToRad(bLat)]);

        var aR = this.sphericalToRect(aS);
        var bR = this.sphericalToRect(bS);

        var earthRad = 6.371e6;
        var shortestDist = earthRad * Math.acos(aR.dot(bR));
        var shortestDistStr = (shortestDist / 1000).toFixed(0) + " km";

        var mapDist = 0;
        var nSegments = 100;
        var lastR = aR;
        var vR;
        for (i = 1; i <= nSegments; i++) {
            vR = this.sphericalToRect(this.linearInterpVector(aS, bS, i / nSegments));
            mapDist += vR.subtract(lastR).modulus() * earthRad;
            lastR = vR;
        }
        var mapDistStr = (mapDist / 1000).toFixed(0) + " km";

        if (this.getOption("showMapPath")) {
            this.text(this.linearInterpVector(aP, bP, 0.5), $V([0, 1]), mapDistStr, true);
            this.save();
            this.setProp("shapeOutlineColor", "rgb(255, 0, 255)");
            this.setProp("shapeStrokeWidthPx", greatCircleWidthPx);
            this.line(aP, bP);
            this.restore();
        }

        if (this.getOption("showShortestPath")) {
            var points = [];
            var vS;
            for (i = 0; i <= nSegments; i++) {
                vR = this.linearInterpVector(aR, bR, i / nSegments);
                vS = this.rectToSpherical(vR);
                points.push($V([this.radToDeg(vS.e(2)), this.radToDeg(Math.PI/2 - vS.e(3))]));
            }

            var labelPoint = points[Math.floor(nSegments / 2)];
            this.text(labelPoint, $V([0, 1]), shortestDistStr, true);
            this.save();
            this.setProp("shapeOutlineColor", greatCircleColor);
            this.setProp("shapeStrokeWidthPx", greatCircleWidthPx);
            this.polyLine(points);
            this.restore();
        }

        this.save();
        this.setProp("pointRadiusPx", cityRadiusPx);
        this.setProp("shapeOutlineColor", cityColor1);
        this.text(aP, $V([1.1, 0]), "TEX:Urbana", true);
        this.point(aP);
        this.setProp("shapeOutlineColor", cityColor2);
        this.text(bP, $V([-1.2, 0]), "TEX:Delhi", true);
        this.point(bP);
        this.restore();

        if (false) {
            // solutions to worksheet
            aR = aR.x(earthRad);
            bR = bR.x(earthRad);
            aS = $V([earthRad, aS.e(2), aS.e(3)]);
            bS = $V([earthRad, bS.e(2), bS.e(3)]);
            console.log("**************************************************");
            console.log("Urbana spherical", aS.inspect());
            console.log("Delhi spherical", bS.inspect());
            console.log("Urbana rect", aR.inspect());
            console.log("Delhi rect", bR.inspect());
            console.log("straight line distance", aR.subtract(bR).modulus());
            var theta = Math.acos(aR.dot(bR) / (aR.modulus() * bR.modulus()));
            console.log("great circle distance", earthRad * theta);
            var norm = aR.cross(bR);
            console.log("max latitude (deg)", this.radToDeg(norm.angleFrom(Vector.k)));
            var abHat = bR.subtract(aR).toUnitVector();
            console.log("unit vector U->D", abHat.inspect());
            var tang = this.orthComp(abHat, aR).toUnitVector();
            console.log("tangent", tang.inspect());
            var sBasis = this.sphericalBasis(aS);
            var eR = sBasis[0];
            var eTheta = sBasis[1];
            var ePhi = sBasis[2];
            console.log("eR", eR.inspect());
            console.log("eTheta", eTheta.inspect());
            console.log("ePhi", ePhi.inspect());
            console.log("tang bearing (deg)", this.radToDeg(tang.angleFrom(ePhi.x(-1))));
            // Mercator projection
            aM = $V([aS.e(2), Math.log(Math.tan(Math.PI / 2 - aS.e(3) / 2))]);
            bM = $V([bS.e(2), Math.log(Math.tan(Math.PI / 2 - bS.e(3) / 2))]);
            console.log("mercator bearing (deg)", this.radToDeg(bM.subtract(aM).angleFrom($V([0, 1]))));
        }
    });

    rvy_fd_c = new PrairieDraw("rvy-fd-c", function() {
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

    $( window ).on( "resize", function() {
        rvp_fc_c.redraw();
        rvp_fp_c.redraw();
        rvs_fd_c.redraw();
        rvs_ec_c.redraw();
        aos_fm_c.redraw();
        rvy_fd_c.redraw();
    } );
})