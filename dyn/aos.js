
$(document).ready(function() {

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
        this.text(aP, $V([1.2, 0]), "TEX:Urbana", true);
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

    aos_fd_c = new PrairieDraw("aos-fd-c", function() {
        this.setUnits(2.5, 2.5);

        this.addOption("showLabels", true);
        this.addOption("showLatLongLines", true);
        this.addOption("showCityGreatCircle", false);
        this.addOption("showCityGreatCircleNormal", false);
        this.addOption("showCityPositionVectors", false);
        this.addOption("showCityLatLong", true);

        this.addOption("sphereTransPerc", 20);
        
        this.addOption("longitudeDeg1", -20);
        this.addOption("latitudeDeg1", 50);
        this.addOption("longitudeDeg2", 65);
        this.addOption("latitudeDeg2", -20);
        
        this.setProp("hiddenLinePattern", "solid");

        var O = $V([0, 0, 0]);
        var rX = $V([1.2, 0, 0]);
        var rY = $V([0, 1.2, 0]);
        var rZ = $V([0, 0, 1.2]);

        var longDeg1 = this.getOption("longitudeDeg1");
        var longDeg2 = this.getOption("longitudeDeg2");
        var latDeg1 = this.getOption("latitudeDeg1")
        var latDeg2 = this.getOption("latitudeDeg2")
        var theta1 = this.degToRad(longDeg1);
        var theta2 = this.degToRad(longDeg2);
        var phi1 = Math.PI/2 - this.degToRad(latDeg1);
        var phi2 = Math.PI/2 - this.degToRad(latDeg2);

        var p1 = this.sphericalToRect($V([1, theta1, phi1]));
        var p2 = this.sphericalToRect($V([1, theta2, phi2]));
        var p12Norm = p1.cross(p2);
        if (p12Norm.modulus() < 1e-10) {
            p12Norm = p1.cross(Vector.i);
            if (p12Norm.modulus() < 1e-10) {
                p12Norm = p1.cross(Vector.j);
            }
        }
        p12Norm = p12Norm.toUnitVector();

        var cityRadiusPx = 6;
        var cityColor1 = "rgb(255, 0, 0)";
        var cityColor2 = "rgb(0, 0, 255)";
        var greatCircleWidthPx = 4;
        var greatCircleColor = "rgb(0, 255, 0)";

        var rXS = $V([1, 0, 0]);
        var rYS = $V([0, 1, 0]);
        var rZS = $V([0, 0, 1]);
        var rXVw = this.posDwToVw(rX);
        var rYVw = this.posDwToVw(rY);
        var rZVw = this.posDwToVw(rZ);
        var rXBack = (rXVw.e(3) < 0);
        var rYBack = (rYVw.e(3) < 0);
        var rZBack = (rZVw.e(3) < 0);

        /***********************************************************/
        // back lines

        // cities
        var p1Vw = this.posDwToVw(p1);
        var p2Vw = this.posDwToVw(p2);
        var p1Back = (p1Vw.e(3) < 0);
        var p2Back = (p2Vw.e(3) < 0);
        if (p1Back) {
            this.save();
            this.setProp("pointRadiusPx", cityRadiusPx);
            this.setProp("shapeOutlineColor", cityColor1);
            this.point(p1);
            this.restore();
            if (this.getOption("showLabels")) {
                this.text(p1, $V([1.2, -1.2]), "TEX:$A$");
            }
        }
        if (p2Back) {
            this.save();
            this.setProp("pointRadiusPx", cityRadiusPx);
            this.setProp("shapeOutlineColor", cityColor2);
            this.point(p2);
            this.restore();
            if (this.getOption("showLabels")) {
                this.text(p2, $V([-1.2, -1.2]), "TEX:$B$");
            }
        }

        // great circle between cities
        if (this.getOption("showCityGreatCircle")) {
            this.save();
            this.setProp("hiddenLineWidthPx", greatCircleWidthPx);
            this.setProp("hiddenLineColor", greatCircleColor);
            this.sphereSlice(O, 1, p12Norm, 0, true, false);
            this.restore();
        }

        // city lat/long
        if (this.getOption("showCityLatLong")) {
            this.save();
            this.setProp("hiddenLineWidthPx", greatCircleWidthPx);
            this.setProp("hiddenLineColor", cityColor1);
            if (longDeg1 !== 0) {
                this.sphereSlice(O, 1, Vector.k, 0, true, false, Vector.i, 0, theta1);
            }
            if (latDeg1 !== 0) {
                var norm = $V([-Math.sin(theta1), Math.cos(theta1), 0]);
                this.sphereSlice(O, 1, norm, 0, true, false, p1, Math.PI/2 - phi1, 0);
            }
            this.setProp("hiddenLineColor", cityColor2);
            if (longDeg2 !== 0) {
                this.sphereSlice(O, 1, Vector.k, 0, true, false, Vector.i, 0, theta2);
            }
            if (latDeg2 !== 0) {
                var norm = $V([-Math.sin(theta2), Math.cos(theta2), 0]);
                this.sphereSlice(O, 1, norm, 0, true, false, p2, Math.PI/2 - phi2, 0);
            }
            this.restore();
        }

        // coordinate axes
        if (rXBack) {
            this.arrow(O, rX);
            if (this.getOption("showLabels")) {
                this.labelLine(O, rX, $V([1, -1]), "TEX:$x$");
            }
        } else {
            this.line(O, rXS);
        }
        if (rYBack) {
            this.arrow(O, rY);
            if (this.getOption("showLabels")) {
                this.labelLine(O, rY, $V([1, -1]), "TEX:$y$");
            }
        } else {
            this.line(O, rYS);
        }
        if (rZBack) {
            this.arrow(O, rZ);
            if (this.getOption("showLabels")) {
                this.labelLine(O, rZ, $V([1, -1]), "TEX:$z$");
            }
        } else {
            this.line(O, rZS);
        }
        if (this.getOption("showLabels")) {
            this.labelIntersection(O, [rX, rY, rZ], "TEX:$O$");
        }

        var i, norm, theta;
        var n_lat = 2;
        var n_long = 4;
        if (this.getOption("showLatLongLines")) {
            for (i = 0; i < n_long; i++) {
                theta = i / n_long * Math.PI;
                norm = $V([-Math.sin(theta), Math.cos(theta), 0]);
                this.sphereSlice(O, 1, norm, 0, true, false);
            }
            for (i = -n_lat; i <= n_lat; i++) {
                this.sphereSlice(O, 1, Vector.k, Math.sin(i * Math.PI / (2 * n_lat + 2)), true, false);
            }
        }

        // city position vectors
        if (this.getOption("showCityPositionVectors")) {
            this.save();
            this.setProp("arrowLineWidthPx", greatCircleWidthPx);
            this.arrow(O, p1, cityColor1);
            this.arrow(O, p2, cityColor2);
            this.restore();
        }

        /***********************************************************/
        // sphere with alpha

        this.save();
        var sphereAlpha = 1 - this.getOption("sphereTransPerc") / 100;
        this.setProp("shapeInsideColor", "rgba(255, 255, 255, " + sphereAlpha + ")");
        this.sphere(O, 1, true);
        this.restore();

        /***********************************************************/
        // front lines

        if (this.getOption("showLatLongLines")) {
            for (i = 0; i < n_long; i++) {
                theta = i / n_long * Math.PI;
                norm = $V([-Math.sin(theta), Math.cos(theta), 0]);
                this.sphereSlice(O, 1, norm, 0, false, true);
            }
            for (i = -n_lat; i <= n_lat; i++) {
                this.sphereSlice(O, 1, Vector.k, Math.sin(i * Math.PI / (2 * n_lat + 2)), false, true);
            }
        }

        // city lat/long
        if (this.getOption("showCityLatLong")) {
            this.save();
            this.setProp("shapeStrokeWidthPx", greatCircleWidthPx);
            this.setProp("shapeOutlineColor", cityColor1);
            if (longDeg1 !== 0) {
                this.sphereSlice(O, 1, Vector.k, 0, false, true, Vector.i, 0, theta1);
            }
            if (latDeg1 !== 0) {
                var norm = $V([-Math.sin(theta1), Math.cos(theta1), 0]);
                this.sphereSlice(O, 1, norm, 0, false, true, p1, Math.PI/2 - phi1, 0);
            }
            this.setProp("shapeOutlineColor", cityColor2);
            if (longDeg2 !== 0) {
                this.sphereSlice(O, 1, Vector.k, 0, false, true, Vector.i, 0, theta2);
            }
            if (latDeg2 !== 0) {
                var norm = $V([-Math.sin(theta2), Math.cos(theta2), 0]);
                this.sphereSlice(O, 1, norm, 0, false, true, p2, Math.PI/2 - phi2, 0);
            }
            this.restore();
        }

        // great circle between cities
        if (this.getOption("showCityGreatCircle")) {
            this.save();
            this.setProp("shapeStrokeWidthPx", greatCircleWidthPx);
            this.setProp("shapeOutlineColor", greatCircleColor)
            this.sphereSlice(O, 1, p12Norm, 0, false, true);
            this.restore();
        }

        // cities
        if (!p1Back) {
            this.save();
            this.setProp("pointRadiusPx", cityRadiusPx);
            this.setProp("shapeOutlineColor", cityColor1);
            this.point(p1);
            this.restore();
            if (this.getOption("showLabels")) {
                this.text(p1, $V([1.2, -1.2]), "TEX:$A$");
            }
        }
        if (!p2Back) {
            this.save();
            this.setProp("pointRadiusPx", cityRadiusPx);
            this.setProp("shapeOutlineColor", cityColor2);
            this.point(p2);
            this.restore();
            if (this.getOption("showLabels")) {
                this.text(p2, $V([-1.2, -1.2]), "TEX:$B$");
            }
        }

        // coordinate axes
        if (!rXBack) {
            this.arrow(rXS, rX);
            if (this.getOption("showLabels")) {
                this.labelLine(O, rX, $V([1, -1]), "TEX:$x$");
            }
        }
        if (!rYBack) {
            this.arrow(rYS, rY);
            if (this.getOption("showLabels")) {
                this.labelLine(O, rY, $V([1, -1]), "TEX:$y$");
            }
        }
        if (!rZBack) {
            this.arrow(rZS, rZ);
            if (this.getOption("showLabels")) {
                this.labelLine(O, rZ, $V([1, -1]), "TEX:$z$");
            }
        }
    });

    aos_fd_c.activate3DControl();

    aos_fp_c = new PrairieDraw("aos-fp-c", function() {
        this.setUnits(360, 360);

        this.addOption("projection", "equirectangular");

        var projFunc;
        if (this.getOption("projection") === "mercator") {
            projFunc = function(p) {
                var phi = Math.max(-89, Math.min(89, p[1])) / 180 * Math.PI
                return $V([p[0], Math.log(Math.tan(Math.PI / 4 + phi / 2)) * 180 / Math.PI]);
            };
        } else if (this.getOption("projection") === "hobo-dyer") {
            projFunc = function(p) {
                return $V([p[0], Math.sin(p[1] / 180 * Math.PI) / Math.pow(Math.cos(37.5 / 180 * Math.PI), 2) * 180 / Math.PI]);
            };
        } else if (this.getOption("projection") === "winkel") {
            projFunc = function(p) {
                var lambda = p[0] / 180 * Math.PI;
                var phi = p[1] / 180 * Math.PI;
                var phi1 = Math.acos(2 / Math.PI);
                var alpha = Math.acos(Math.cos(phi) * Math.cos(lambda / 2));
                var x = 0.5 * (lambda * Math.cos(phi1) + 2 * Math.cos(phi) * Math.sin(lambda / 2) / (Math.sin(alpha) / alpha));
                var y = 0.5 * (phi + Math.sin(phi) / (Math.sin(alpha) / alpha));
                return $V([x * 68, y * 68]);
            };
        } else {
            // equirectangular
            projFunc = function(p) {
                return $V([p[0], p[1]]);
            };
        }

        this.save();
        this.setProp("shapeStrokeWidthPx", 1);
        this.setProp("shapeOutlineColor", "rgb(200, 200, 200)");
        var i, j, p;
        for (i = -180; i <= 180; i += 10) {
            p = [];
            for (j = -90; j <= 90; j += 10) {
                p.push([i, j]);
            }
            this.polyLine(p.map(projFunc));
        }
        for (j = -90; j <= 90; j += 10) {
            p = [];
            for (i = -180; i <= 180; i+= 10) {
                p.push([i, j]);
            }
            this.polyLine(p.map(projFunc));
        }
        this.restore();

        this.save();
        this.setProp("shapeStrokeWidthPx", 1);
        for (i = 0; i < worldCoastline.length; i++) {
            this.polyLine(worldCoastline[i].map(projFunc));
        }
        this.restore();
    });

}); // end of document.ready()
