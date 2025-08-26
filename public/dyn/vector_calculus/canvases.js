$(document).ready(function(){
    rvv_ed_c = new PrairieDraw("rvv-ed-c", function() {
        this.setUnits(5, 3);
        this.translate($V([-2, -1]));
        this.addOption("angles", false);
        this.addOption("components", false);
                
        if (this.getOption("angles")) {
            this.line($V([-2, 0]), $V([5, 0]));
            this.line($V([0, -2]), $V([0, 3]));
        }
                
        var O = $V([0, 0]);
        var A = $V([4, 1]);
        var B = $V([2, 2]);
                
        var Ab = $V([A.e(1), 0]);
        var Bb = $V([B.e(1), 0]);
                
        var aType = "position";
        var bType = "angMom";
                
        this.arrow(O, A, aType);
        this.labelLine(O, A, $V([0.5, 1]), "TEX:$\\vec{a}$");
        this.arrow(O, B, "angMom");
        this.labelLine(O, B, $V([0, 1]), "TEX:$\\vec{b}$");
                
        var theta_a = this.angleOf(A);
        var theta_b = this.angleOf(B);
                
        this.circleArrow(O, 2, theta_a, theta_b);
        this.labelCircleLine(O, 2, theta_a, theta_b, $V([0, 1]), "TEX:$\\theta$");
        if (this.getOption("angles")) {
            this.circleArrow(O, 1.5, 0, theta_a, aType);
            this.labelCircleLine(O, 1.5, 0, theta_a, $V([0, 1]), "TEX:$\\theta_a$");
            this.circleArrow(O, 1, 0, theta_b, bType);
            this.labelCircleLine(O, 1, 0, theta_b, $V([0.5, 1]), "TEX:$\\theta_b$");
        }
                
        if (this.getOption("components")) {
            this.line(O, Ab, aType);
            this.labelLine(O, Ab, $V([0.5, -1]), "TEX:$a_1$");
                
            this.line(Ab, A, aType);
            this.labelLine(Ab, A, $V([0, -1]), "TEX:$a_2$");
                
            this.line(O, $V([B.e(1), 0]), bType);
            this.labelLine(O, Bb, $V([0, -1]), "TEX:$b_1$");
                
            this.line(Bb, B, bType);
            this.labelLine(Bb, B, $V([0, -1]), "TEX:$b_2$");
        }
    });

    rvv_fn_c = new PrairieDrawAnim("rvv-fn-c", function(t) {
        this.setUnits(8, 6);

        this.addOption("showComponents", false);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var theta = t / 2 + Math.PI / 8;

        var a = $V([2.8, 0]).rotate(theta, O);
        var aPerp = a.rotate(Math.PI / 2, O);
        var aColor = "red";
        var aPerpColor = "blue";

        this.arrow(O, a, aColor);
        this.labelLine(O, a, $V([0, 1]), "TEX:$\\vec{a}$");
        if (this.getOption("showComponents")) {
            this.arrow(O, ei.x(a.e(1)), aColor);
            this.arrow(ei.x(a.e(1)), a, aColor);
            this.labelLine(O, ei.x(a.e(1)), $V([0, -this.sign(a.e(1))]), "TEX:$a_1\\,\\hat\\imath$");
            this.labelLine(ei.x(a.e(1)), a, $V([0, -this.sign(a.e(2))]), "TEX:$a_2\\,\\hat\\jmath$");
        }

        this.arrow(O, aPerp, aPerpColor);
        this.labelLine(O, aPerp, $V([0, -1]), "TEX:$\\vec{a}^\\perp$");
        if (this.getOption("showComponents")) {
            this.arrow(O, ei.x(aPerp.e(1)), aPerpColor);
            this.arrow(ei.x(aPerp.e(1)), aPerp, aPerpColor);
            this.labelLine(O, ei.x(aPerp.e(1)), $V([0, -this.sign(aPerp.e(1))]), "TEX:$-a_2\\,\\hat\\imath$");
            this.labelLine(ei.x(aPerp.e(1)), aPerp, $V([0, this.sign(aPerp.e(2))]), "TEX:$a_1\\,\\hat\\jmath$");
        }

        this.rightAngle(O, a);
    });

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

    rvv_eo_c = new PrairieDraw("rvv-eo-c", function() {
        this.setUnits(10, 2.6);

        var d = 0.2; // plus/minus sign size
        var r = 0.8; // circle arrow radius
        var a = 0.3; // circle arrow offset
        var q = 0.3; // right-angle size

        var O = $V([0, 0]);
        var ei3 = $V([-1, -0.5]);
        var ej3 = $V([1, -0.5]);
        var ek3 = $V([0, 1.2]);

        var ei3q = ei3.toUnitVector().x(q);
        var ej3q = ej3.toUnitVector().x(q);
        var ek3q = ek3.toUnitVector().x(q);

        this.save();
        this.translate($V([-3, 0]));
        this.line($V([-d, 0]), $V([d, 0]));
        this.line($V([0, -d]), $V([0, d]));
        this.text(this.vector2DAtAngle(Math.PI * 7 / 6).x(r), O, "TEX:$\\hat\\imath$");
        this.text(this.vector2DAtAngle(Math.PI * 11 / 6).x(r), O, "TEX:$\\hat\\jmath$");
        this.text(this.vector2DAtAngle(Math.PI / 2).x(r), O, "TEX:$\\hat{k}$");
        this.circleArrow(O, r, -Math.PI / 6 + a, Math.PI / 2 - a, undefined, true);
        this.circleArrow(O, r, Math.PI / 2 + a, Math.PI * 7 / 6 - a, undefined, true);
        this.circleArrow(O, r, Math.PI * 7 / 6 + a, Math.PI * 11 / 6 - a, undefined, true);
        this.restore();

        this.save();
        this.translate(O);
        this.line($V([-d, 0]), $V([d, 0]));
        this.text(this.vector2DAtAngle(Math.PI * 7 / 6).x(r), O, "TEX:$\\hat\\imath$");
        this.text(this.vector2DAtAngle(Math.PI * 11 / 6).x(r), O, "TEX:$\\hat\\jmath$");
        this.text(this.vector2DAtAngle(Math.PI / 2).x(r), O, "TEX:$\\hat{k}$");
        this.circleArrow(O, r, Math.PI / 2 - a, -Math.PI / 6 + a, undefined, true);
        this.circleArrow(O, r, Math.PI * 7 / 6 - a, Math.PI / 2 + a, undefined, true);
        this.circleArrow(O, r, Math.PI * 11 / 6 - a, Math.PI * 7 / 6 + a, undefined, true);
        this.restore();

        this.save();
        this.translate($V([3, -0.3]));
        this.arrow(O, ei3);
        this.arrow(O, ej3);
        this.arrow(O, ek3);
        this.labelLine(O, ei3, $V([1, 1]), "TEX:$\\hat\\imath$");
        this.labelLine(O, ej3, $V([1, -1]), "TEX:$\\hat\\jmath$");
        this.labelLine(O, ek3, $V([1, 1]), "TEX:$\\hat{k}$");
        this.setProp("shapeStrokeWidthPx", 1);
        this.polyLine([ei3q, ei3q.add(ej3q), ej3q]);
        this.polyLine([ej3q, ej3q.add(ek3q), ek3q]);
        this.polyLine([ek3q, ek3q.add(ei3q), ei3q]);
        this.restore();
    });

    rvv_fx_c = new PrairieDraw("rvv-fx-c", function() {
        this.setUnits(8, 4);

        var O = $V([0, 0]);
        var a = $V([4, 0]);
        var b = $V([2, 2]);
        var aColor = "red";
        var bColor = "blue";

        this.translate($V([-3, -1]));

        this.arrow(O, a, aColor);
        this.labelLine(O, a, $V([0, -1]), "TEX:$\\vec{a}$");

        this.arrow(O, b, bColor);
        this.labelLine(O, b, $V([0, 1]), "TEX:$\\vec{b}$");

        this.arrow(b, b.add(a), aColor);
        this.labelLine(b, b.add(a), $V([0, 1]), "TEX:$\\vec{a}$");

        this.arrow(a, a.add(b), bColor);
        this.labelLine(a, a.add(b), $V([0, -1]), "TEX:$\\vec{b}$");

        this.text(O, $V([-3, -1]), "TEX:$\\theta$");

        this.line(b, $V([b.e(1), 0]), "darkgreen");
        this.labelLine(b, $V([b.e(1), 0]), $V([0.3, -1.1]), "TEX:$b \\sin\\theta$");
        this.rightAngle($V([b.e(1), 0]), $V([0, 1]));

        this.text($V([3.3, 1]), $V([0, 0]), "TEX:$A = a b \\sin\\theta$");
    });

    rvc_fd_c = new PrairieDraw("rvc-fd-c", function() {
        this.setUnits(12, 4);
        
        this.addOption("t", 0);
        
        this.addOption("showLabels", true);
        this.addOption("showIncrement", false);
        this.addOption("showExactDeriv", false);
        this.addOption("showApproxDeriv", false);
        this.addOption("dt", 2);

        var v_f = function(t) {
            return $V([t, 1 + Math.cos(t)]);
        };
        var dv_f = function(t) {
            return $V([1, - Math.sin(t)]);
        };

        var t = Number(this.getOption("t"));
    
        var dt = Number(this.getOption("dt"));
        if (dt === 0) {
            dt = 0.001;
        }

        var O = $V([0, 0]);
        var v = v_f(t);
        var v_next = v_f(t + dt);

        var dv_exact = dv_f(t);
        var dv_approx;
        dv_approx = v_next.subtract(v).x(1 / dt);

        this.translate($V([-5, -1]));

        var s;
        var path = [];
        for (s = 0; s < 12; s += 0.1) {
            path.push(v_f(s));
        }
        this.polyLine(path);

        var side = (this.vec2To3(v_next).cross(this.vec2To3(v)).dot(Vector.k) > 0) ? 1 : -1;
        this.save();

        this.arrow(O, v, "position");
        this.arrow(O, v_next, "position");
        if (this.getOption("showLabels")) {
            this.labelLine(O, v, $V([0, side]), "TEX:$\\vec{a}(t)$");
            this.labelLine(O, v_next, $V([0, -1.2 * side]), "TEX:$\\vec{a}(t + \\Delta t)$");
        }
        if (this.getOption("showIncrement")) {
            this.arrow(v, v_next, "position");
            if (this.getOption("showLabels")) {
                this.labelLine(v, v_next, $V([0, -side]), "TEX:$\\Delta \\vec{a}$");
            }
        }
        if (this.getOption("showExactDeriv")) {
            this.arrow(v, v.add(dv_exact), "velocity");
            if (this.getOption("showLabels")) {
                this.labelLine(v, v.add(dv_exact), $V([0, side]), "TEX:$\\dot{\\vec{a}}$");
            }
        }
        if (this.getOption("showApproxDeriv")) {
            this.arrow(v, v.add(dv_approx), "acceleration");
            if (this.getOption("showLabels")) {
            this.labelLine(v, v.add(dv_approx), $V([0, 1.2 * side]), "TEX:$\\Delta \\vec{a} / \\Delta t$");
            }
        }

        this.restore();
    });

    rvc_fp_c = new PrairieDrawAnim("rvc-fp-c", function(t) {
        this.setUnits(12, 8);
        
        this.addOption("showVelocity0", false);
        this.addOption("showVelocity", false);
        this.addOption("showFixedBase", false);
        this.addOption("movement", "bounce");

        var O = $V([0, 0]);

        var f;
        if (this.getOption("movement") === "rotate") {
            f = function(t) {
                var m = 2;
                var a = $V([-m * Math.sin(t), -m * Math.cos(t)]);
                return {
                    aSign: 1,
                    vSign: 1,
                    a: a,
                    base: a};
            }.bind(this);
        } else if (this.getOption("movement") === "vertical") {
            f = function(t) {
                var m = 2;
                var a = $V([m, this.intervalMod(m * t, -m, m)]);
                return {
                    aSign: 1,
                    vSign: 1,
                    a: a,
                    base: a};
            }.bind(this);
        } else if (this.getOption("movement") === "bounce") {
            f = function(t) {
                var m = 2;
                return {
                    zeroDerivative: true,
                    aSign: 1,
                    vSign: 1,
                    a: $V([m, m / 2]),
                    base: $V([m / 2 + m / 2 * Math.sin(2 * t), m / 4 + m * Math.sin(t)])};
            }.bind(this);
        } else if (this.getOption("movement") === "stretch") {
            f = function(t) {
                var m = 2;
                return {
                    aSign: this.sign(Math.sin(t + Math.PI / 4)),
                    vSign: this.sign(Math.cos(t + Math.PI / 4)),
                    a: $V([m, m / 4]).x(Math.sin(t + Math.PI / 4)),
                    base: $V([m * Math.cos(t), m * Math.sin(t)])};
            }.bind(this);
        } else if (this.getOption("movement") === "circle") {
            f = function(t) {
                var m = 2;
                return {
                    aSign: 1,
                    vSign: 1,
                    a: $V([-m * Math.sin(t), m * Math.cos(t)]),
                    base: $V([-m * Math.cos(t), -m * Math.sin(t)])};
            }.bind(this);
        } else if (this.getOption("movement") === "twist") {
            f = function(t) {
                var m = 2;
                return {
                    aSign: 1,
                    vSign: 1,
                    a: $V([m * Math.sin(t), m * Math.cos(t)]),
                    base: $V([m / 4 * Math.cos(t), m / 4 * Math.sin(t)])};
            }.bind(this);
        } else if (this.getOption("movement") === "slider") {
            f = function(t) {
                var m = 2;
                var a = $V([m * (1 + Math.sin(t)) / 2, m * (1 - Math.cos(t)) / 2]);
                return {
                    aSign: 1,
                    vSign: 1,
                    a: a,
                    base: a};
            }.bind(this);
        } else if (this.getOption("movement") === "fly") {
            f = function(t) {
                var m = 2;
                var length = m * (2 + Math.sin(2 * t)) / 3;
                var angle = t + Math.sin(t);
                var baseLength = m * Math.sin(2 * t);
                var baseAngle = -t;
                return {
                    aSign: 1,
                    vSign: 1,
                    a: this.polarToRect($V([length, angle])),
                    base: this.polarToRect($V([baseLength, baseAngle]))};
            }.bind(this);
        }

        var val0 = this.numDiff(f, 0);
        var val = this.numDiff(f, t);

        var a0 = val0.a;
        var a = val.a;
        var v0 = val0.diff.a;
        var v = val.diff.a;
        var base0 = val0.base;
        var base = val.base;
        var aSign = val.aSign;
        var vSign = val.vSign;
        var zeroDerivative0 = (val0.zeroDerivative === undefined) ? false : val0.zeroDerivative;
        var zeroDerivative = (val.zeroDerivative === undefined) ? false : val.zeroDerivative;

        this.save();
        this.translate($V([-3, 0]));
        this.save();
        this.translate(base0.x(-1));
        this.arrow(O, a0, "position");
        this.labelLine(O, a0, $V([0, -1]), "TEX:$\\vec{a}(0)$");
        if (this.getOption("showVelocity0")) {
            if (zeroDerivative0) {
                this.labelLine(O, a0, $V([1, 0]), "TEX:$\\dot{\\vec{a}}(0) = 0$");
            } else {
                this.arrow(a0, a0.add(v0), "velocity");
                this.labelLine(a0, a0.add(v0), $V([0, 1]), "TEX:$\\dot{\\vec{a}}(0)$");
            }
        }
        this.restore();
        this.save();
        this.translate(base.x(-1));
        this.arrow(O, a, "position");
        this.labelLine(O, a, $V([0, aSign]), "TEX:$\\vec{a}(t)$");
        if (this.getOption("showVelocity")) {
            if (zeroDerivative) {
                this.labelLine(O, a, $V([1, 0]), "TEX:$\\dot{\\vec{a}}(t) = 0$");
            } else {
                this.arrow(a, a.add(v), "velocity");
                this.labelLine(a, a.add(v), $V([0, -vSign]), "TEX:$\\dot{\\vec{a}}(t)$");
            }
        }
        this.restore();
        this.restore();

        if (this.getOption("showFixedBase")) {
            this.save();
            this.translate($V([3, 0]));
            this.arrow(O, a0, "position");
            this.labelLine(O, a0, $V([0, -1]), "TEX:$\\vec{a}(0)$");
            if (this.getOption("showVelocity0")) {
                if (!zeroDerivative0) {
                    this.arrow(a0, a0.add(v0), "velocity");
                    this.labelLine(a0, a0.add(v0), $V([0, 1]), "TEX:$\\dot{\\vec{a}}(0)$");
                }
            }
            this.arrow(O, a, "position");
            this.labelLine(O, a, $V([0, aSign]), "TEX:$\\vec{a}(t)$");
            if (this.getOption("showVelocity")) {
                if (!zeroDerivative) {
                    this.arrow(a, a.add(v), "velocity");
                    this.labelLine(a, a.add(v), $V([0, -vSign]), "TEX:$\\dot{\\vec{a}}(t)$");
                }
            }
            this.restore();
        }
    });

    rvc_fp_c.registerOptionCallback("movement", function (value) {
        rvc_fp_c.resetTime(false);
        rvc_fp_c.resetOptionValue("showVelocity0");
        rvc_fp_c.resetOptionValue("showVelocity");
        rvc_fp_c.resetOptionValue("showFixedBase");
    });

    rvc_fc_c = new PrairieDraw("rvc-fc-c", function() {
        this.setUnits(12, 8);

        this.addOption("t", 0);
        this.addOption("showLabels", true);
        this.addOption("showComponent1", false);
        this.addOption("showComponent2", false);
        this.addOption("showVelocity", false);
        this.addOption("basis", "ij");

        var v_f = function(t) {
            return $V([5 * Math.sin(Math.PI * t / 10), 1.5 * Math.cos(Math.PI * 3 * t / 10)]);
        };
        var dv_f = function(t) {
            return $V([5 * Math.PI / 10 * Math.cos(Math.PI * t / 10), - 4.5 / 10 * Math.PI * Math.sin(Math.PI * 3 * t / 10)]);
        };

        var t = this.getOption("t");

        var O = $V([0, 0]);
        if (this.getOption("basis") === "ij") {
            var e1 = $V([1, 0]);
            var e2 = $V([0, 1]);
        } else {
            var e1 = $V([1, 0]).rotate(Math.PI / 6, O);
            var e2 = $V([0, 1]).rotate(Math.PI / 6, O);
        }

        var v = v_f(t);
        var dv = dv_f(t);

        // add fuzzing to avoid exact zeros
        var v1c = e1.dot(v) + 1e-6
        var v2c = e2.dot(v) + 1e-6
        var v1 = e1.x(v1c);
        var v2 = e2.x(v2c);
        var dv1c = e1.dot(dv) + 1e-6;
        var dv2c = e2.dot(dv) + 1e-6;
        var dv1 = e1.x(dv1c);
        var dv2 = e2.x(dv2c);

        var t_max = 10;

        var i, s;
        var path = [], path_v1 = [], path_v2 = [], path_dv1 = [], path_dv2 = [];
        var n = Math.round(t_max / 0.1);
        for (i = 0; i <= n; i++) {
            s = i / n * t_max;
            var v_s = v_f(s);
            var dv_s = dv_f(s);
            path.push(v_s);
            path_v1.push($V([s, e1.dot(v_s)]));
            path_v2.push($V([s, e2.dot(v_s)]));
            path_dv1.push($V([s, e1.dot(dv_s)]));
            path_dv2.push($V([s, e2.dot(dv_s)]));
        }

        var labelA = "TEX:$\\vec{a}$";
        var labelDotA = "TEX:$\\dot{\\vec{a}}$";
        var labelE1, labelE2, labelA1c, labelA2c, labelDotA1c, labelDotA2c, labelA1, labelA2, labelDotA1, labelDotA2;
        if (this.getOption("basis") === "ij") {
            labelE1 = "TEX:$\\hat\\imath$";
            labelE2 = "TEX:$\\hat\\jmath$";
            labelA1c = "TEX:$a_i$";
            labelA2c = "TEX:$a_j$";
            labelDotA1c = "TEX:$\\dot{a}_i$";
            labelDotA2c = "TEX:$\\dot{a}_j$";
            labelA1 = "TEX:$a_i\\hat\\imath$";
            labelA2 = "TEX:$a_j\\hat\\jmath$";
            labelDotA1 = "TEX:$\\dot{a}_i\\hat\\imath$";
            labelDotA2 = "TEX:$\\dot{a}_j\\hat\\jmath$";
        } else {
            labelE1 = "TEX:$\\hat{u}$";
            labelE2 = "TEX:$\\hat{v}$";
            labelA1c = "TEX:$a_u$";
            labelA2c = "TEX:$a_v$";
            labelDotA1c = "TEX:$\\dot{a}_u$";
            labelDotA2c = "TEX:$\\dot{a}_v$";
            labelA1 = "TEX:$a_u\\hat{u}$";
            labelA2 = "TEX:$a_v\\hat{v}$";
            labelDotA1 = "TEX:$\\dot{a}_u\\hat{u}$";
            labelDotA2 = "TEX:$\\dot{a}_v\\hat{v}$";
        }
        if (!this.getOption("showLabels")) {
            labelA = undefined;
            labelDotA = undefined;
            labelA1 = undefined;
            labelA2 = undefined;
            labelDotA1 = undefined;
            labelDotA2 = undefined;
        }

        var axSizeDw = $V([5, 3]);
        var axPOriginData = $V([0, -4]);
        var axPSizeData = $V([t_max * 1.1, 10]);
        var axVOriginData = $V([0, -2]);
        var axVSizeData = $V([t_max * 1.1, 5]);

        this.save();
        this.translate($V([-5.3, -3.5]));
        if (this.getOption("showComponent1")) {
            this.plot(path_v1, O, axSizeDw, axPOriginData, axPSizeData, "TEX:$t$", undefined, "position", true, false, undefined, undefined, {"horizAxisPos": 0});
            this.plot([$V([t, v1c])], O, axSizeDw, axPOriginData, axPSizeData, "TEX:$t$", undefined, "position", false, true, labelA1c, $V([1, 1]));
            if (this.getOption("showVelocity")) {
                this.plot(path_dv1, O, axSizeDw, axVOriginData, axVSizeData, undefined, undefined, "velocity", false, false);
                this.plot([$V([t, dv1c])], O, axSizeDw, axVOriginData, axVSizeData, undefined, undefined, "velocity", false, true, labelDotA1c, $V([-1, -1]));
            }
        } else {
            this.plot([], O, axSizeDw, axPOriginData, axPSizeData, "TEX:$t$", undefined, "position", true, false, undefined, undefined, {"horizAxisPos": 0});
        }
        this.restore();

        this.save();
        this.translate($V([0.5, -3.5]));
        if (this.getOption("showComponent2")) {
            this.plot(path_v2, O, axSizeDw, axPOriginData, axPSizeData, "TEX:$t$", undefined, "position", true, false, undefined, undefined, {"horizAxisPos": 0});
            this.plot([$V([t, v2c])], O, axSizeDw, axPOriginData, axPSizeData, "TEX:$t$", undefined, "position", false, true, labelA2c, $V([-1, -1]));
            if (this.getOption("showVelocity")) {
                this.plot(path_dv2, O, axSizeDw, axVOriginData, axVSizeData, undefined, undefined, "velocity", false, false);
                this.plot([$V([t, dv2c])], O, axSizeDw, axVOriginData, axVSizeData, undefined, undefined, "velocity", false, true, labelDotA2c, $V([1, 1]));
            }
        } else {
            this.plot([], O, axSizeDw, axPOriginData, axPSizeData, "TEX:$t$", undefined, "position", true, false, undefined, undefined, {"horizAxisPos": 0});
        }
        this.restore();

        var v_offset = 0.1;

        this.save();
        this.translate($V([-1.5, 1.5]));
        this.polyLine(path);
        this.arrow(O, v, "position");
        this.labelLine(O, v, $V([-1, 0]), labelA);
        if (this.getOption("showComponent1")) {
            this.arrow(v2, v, "position");
            this.labelLine(v2, v, $V([0, 1]), labelA1);
        }
        if (this.getOption("showComponent2")) {
            this.arrow(v1, v, "position");
            this.labelLine(v1, v, $V([0, 1]), labelA2);
        }
        if (this.getOption("showVelocity")) {
            this.arrow(v, v.add(dv), "velocity");
            this.labelLine(v, v.add(dv), $V([1, 0]), labelDotA);
            if (this.getOption("showComponent1")) {
                this.arrow(v, v.add(dv1), "velocity");
                this.labelLine(v, v.add(dv1), $V([0, 1]), labelDotA1);
            }
            if (this.getOption("showComponent2")) {
                this.arrow(v, v.add(dv2), "velocity");
                this.labelLine(v, v.add(dv2), $V([0, 1]), labelDotA2);
            }
        }
        this.restore();

        this.save();
        this.translate($V([-4.5, 1.5]));
        this.arrow(O, e1);
        this.arrow(O, e2);
        this.labelLine(O, e1, $V([1, -1]), labelE1);
        this.labelLine(O, e2, $V([1, 1]), labelE2);
        this.restore();
    });

    rvc_fi_c = new PrairieDraw("rvc-fi-c", function() {
        this.setUnits(12, 8);

        this.addOption("t", 0);
        this.addOption("logN", 0);
        this.addOption("N", 1);
        this.addOption("showLabels", true);
        this.addOption("showAnchoredVelocity", true);
        this.addOption("showExact", false);
        this.addOption("showApprox", false);
        this.addOption("movement", "translate");

        var t = this.getOption("t");
        var logN = this.getOption("logN");

        var N = Math.floor(Math.exp(logN));
        this.setOption("N", N, false);

        var tMax = 10;
        var O = $V([0, 0]);

        var f = function(t) {
            return $V([
                2 * Math.cos(t / tMax * 3 / 2 * Math.PI) - 2 + 6 * Math.sin(t / tMax / 2 * Math.PI) + t * t / 20,
                3 - 3 * Math.cos(t / tMax * 3 / 2 * Math.PI)
            ]);
        }.bind(this);

        var df = function(t) {
            return $V([
                -2 * Math.sin(t / tMax * 3 / 2 * Math.PI) * 1 / tMax * 3 / 2 * Math.PI
                    + 6 * Math.cos(t / tMax / 2 * Math.PI) * 1 / tMax / 2 * Math.PI + 2 * t / 20,
                3 * Math.sin(t / tMax * 3 / 2 * Math.PI) * 1 / tMax * 3 / 2 * Math.PI
            ]);
        }.bind(this);

        var nExact = 100;
        var pExact = [];
        for (var i = 0; i <= nExact; i++) {
            pExact.push(f(i / nExact * t));
        }

        var vExactEnd = df(t);

        var pApprox = [O];
        for (var i = 0; i < N; i++) {
            var tI = i / N * t;
            var dtI = t / N;
            pApprox.push(pApprox[pApprox.length - 1].add(df(tI).x(dtI)));
        }

        var pExactEnd = pExact[pExact.length - 1];
        var pApproxEnd = pApprox[pApprox.length - 1];

        if (this.getOption("showAnchoredVelocity")) {
            this.save();
            this.translate($V([3, 2]));
            this.arrow(O, vExactEnd, "velocity");
            if (this.getOption("showLabels")) {
                this.labelLine(O, vExactEnd, $V([0, 1]), "TEX:$\\vec{a}(t)$");
            }
            this.restore();
        }

        this.translate($V([-5, -3]));

        if (this.getOption("showApprox") && t > 0) {
            for (var i = 1; i < pApprox.length; i++) {
                this.arrow(pApprox[i - 1], pApprox[i], "angle");
            }
            if (this.getOption("showLabels")) {
                var iLabel = Math.floor(pApprox.length / 2);
                if (pApprox.length % 2 === 0) {
                    var labelPoint = pApprox[iLabel - 1].add(pApprox[iLabel]).x(0.5);
                    if (pApprox.length > 2) {
                        var pPrev = pApprox[iLabel - 1];
                        var dpPrev = pApprox[iLabel - 2].subtract(pPrev);
                        var pNext = pApprox[iLabel];
                        var dpNext = pApprox[iLabel + 1].subtract(pNext);
                        var otherPoints = [pPrev.add(dpPrev.x(0.1)), pNext.add(dpNext.x(0.1))];
                    } else {
                        var otherPoints = [pApprox[iLabel - 1], pApprox[iLabel].add($V([0, -0.01]))];
                    }
                } else {
                    var labelPoint = pApprox[iLabel];
                    var otherPoints = [pApprox[iLabel - 1], pApprox[iLabel + 1]];
                }
                this.labelIntersection(labelPoint, otherPoints, "TEX:$\\vec{a}(\\tau_i)\\Delta\\tau$");
            }
            this.arrow(O, pApproxEnd, "acceleration");
            if (this.getOption("showLabels")) {
                this.labelLine(O, pApproxEnd, $V([0, -1]), "TEX:$\\vec{S}_N$");
            }
        }

        if (this.getOption("showExact")) {
            if (t > 0) {
                this.polyLine(pExact);
                this.arrow(O, pExactEnd, "position");
                if (this.getOption("showLabels")) {
                    this.labelLine(O, pExactEnd, $V([0, 1]), "TEX:$\\int_0^t \\vec{a}(\\tau)\\,d\\tau$");
                }
            }
            this.arrow(pExactEnd, pExactEnd.add(vExactEnd), "velocity");
            if (this.getOption("showLabels")) {
                this.labelLine(pExactEnd, pExactEnd.add(vExactEnd), $V([0, 1]), "TEX:$\\vec{a}(t)$");
            }
        }
    });

    $( window ).on( "resize", function() {
        rvv_ed_c.redraw();
        rvv_fn_c.redraw();
        aos_fm_c.redraw();
        rvv_eo_c.redraw();
        rvv_fx_c.redraw();
        rvc_fd_c.redraw();
        rvc_fp_c.redraw();
        rvc_fc_c.redraw();
        rvc_fi_c.redraw();
    } );
})