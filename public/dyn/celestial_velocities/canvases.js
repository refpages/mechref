
$(document).ready(function() {

    aov_fe_c = new PrairieDrawAnim("aov-fe-c", function(t) {
        this.setUnits(40, 20);

        var daysInYear = 8; // solar days
        var omega = 0.5; // orbital angular velocity
        var orbitRad = 8;
        var earthRad = 1;
        var sunRad = 2;
        var starRad = 0.8;
        var sunColor = "rgb(200, 150, 0)";
        var starColor = "rgb(0, 100, 150)";

        var states = [];
        var transTimes = [];
        var holdTimes = [];
        var interps = {};
        var names = [];
        var i, theta0, theta1;
        var that = this;
        var thetaOfState = function(iState) {
            if (iState % 2 === 0) {
                // solar day
                return that.linearInterp(0, 2 * Math.PI, iState / 2 / daysInYear);
            } else {
                // sidereal day
                return that.linearInterp(0, 2 * Math.PI, (iState + 1) / 2 / (daysInYear + 1));
            }
        };
        for (i = 0; i <= 2 * daysInYear; i++) {
            theta0 = thetaOfState(i);
            theta1 = thetaOfState(i + 1);
            states.push({"theta": theta0});
            transTimes.push((theta1 - theta0) / omega);
            if (i === 0) {
                holdTimes.push(0);
            } else if (i === 2 * daysInYear) {
                holdTimes.push(1);
            } else {
                holdTimes.push(0.2);
            }
            names.push("");
        }

        var state = this.newSequence("motion", states, transTimes, holdTimes, interps, names, t);
        i = state.index;
        theta = state.theta;
        var earthTheta = theta * (daysInYear + 1);

        var O = $V([0, 0]);
        var P = $V([Math.cos(theta), Math.sin(theta)]).x(orbitRad);

        // stars
        var drawStar = function(pos) {
            that.save();
            that.translate(pos);
            that.setProp("shapeOutlineColor", starColor);
            that.line($V([-starRad, 0]), $V([starRad, 0]));
            that.line($V([0, -starRad]), $V([0, starRad]));
            that.line($V([-starRad * 0.7, -starRad * 0.7]), $V([starRad * 0.7, starRad * 0.7]));
            that.line($V([starRad * 0.7, -starRad * 0.7]), $V([-starRad * 0.7, starRad * 0.7]));
            that.restore();
        }
        drawStar($V([-18, 5]));
        drawStar($V([-16, 8]));
        drawStar($V([-17, -8]));
        drawStar($V([-15, 2]));
        drawStar($V([-16.5, -1]));
        drawStar($V([-15.5, 4]));
        drawStar($V([-17.5, 7]));
        drawStar($V([-15.2, -6]));
        drawStar($V([-16.3, -3]));
        drawStar($V([-17.4, -7]));

        // earth-sun system
        this.save();
        this.translate($V([10, 0]));

        // line to sun
        if (!state.inTransition && i % 2 === 0 && i > 0) {
            this.save();
            if (i === 2 * daysInYear) {
                this.setProp("shapeOutlineColor", starColor);
                this.line(P, $V([-40, P.e(2)]));
            }
            this.setProp("shapeOutlineColor", sunColor);
            this.line(O, P);
            this.restore();
        }

        // line to stars
        if (!state.inTransition && i % 2 === 1) {
            this.save();
            this.setProp("shapeOutlineColor", starColor);
            this.line(P, $V([-40, P.e(2)]));
            this.restore();
        }

        // sun
        this.save();
        this.setProp("pointRadiusPx", 20);
        this.setProp("shapeInsideColor", "rgb(255, 255, 0)");
        this.setProp("shapeOutlineColor", sunColor);
        this.arc(O, sunRad, undefined, undefined, true);
        this.restore();

        // earth
        this.save();
        this.translate(P);
        this.rotate(earthTheta);
        this.arc(O, earthRad);
        this.arrow(O, $V([-2.2 * earthRad, 0]));
        this.restore();

        this.restore(); // end of earth-sun system

        var iSolar = Math.floor(i / 2);
        var iSidereal = Math.floor((i + 1) / 2) + Math.floor(i / 2 / daysInYear);
        this.save();
        this._ctx.font = "16px sans-serif";
        this.text($V([-12, 7.5]), $V([-1,-1]), "Solar days: " + iSolar.toFixed());
        this.text($V([-12, 6]), $V([-1,-1]), "Sidereal days: " + iSidereal.toFixed());
        this.restore();
    });

    aov_fd_c = new PrairieDrawAnim("aov-fd-c", function(t) {
        this.setUnits(40, 20);

        var daysInYear = 8; // solar days
        var orbitRad = 16;
        var earthRad = 1;
        var sunRad = 2;
        var starRad = 0.8;
        var sunColor = "rgb(200, 150, 0)";
        var starColor = "rgb(0, 100, 150)";

        var theta0 = 0;
        var theta1 = Math.PI / 8;
        var theta2 = Math.PI / 5;

        var earthTheta0 = 0;
        var earthTheta1 = 0;
        var earthTheta2 = theta2;

        var O = $V([0, 0]);
        var P0 = $V([1, 0]).x(orbitRad);
        var P1 = $V([Math.cos(theta1), Math.sin(theta1)]).x(orbitRad);
        var P2 = $V([Math.cos(theta2), Math.sin(theta2)]).x(orbitRad);

        // earth-sun system
        this.save();
        this.translate($V([-11, -5]));

        // line to stars
        this.save();
        this.setProp("shapeOutlineColor", starColor);
        this.line(P0, $V([-40, P0.e(2)]));
        this.line(P1, $V([-40, P1.e(2)]));
        this.setProp("shapeOutlineColor", "black");
        this.setProp("shapeStrokePattern", "dashed");
        this.line(P2, $V([-40, P2.e(2)]));
        this.restore();

        // line to sun
        this.save();
        this.setProp("shapeOutlineColor", sunColor);
        this.line(O, P0);
        this.line(O, P2);
        this.setProp("shapeOutlineColor", "black");
        this.setProp("shapeStrokePattern", "dashed");
        this.line(O, P1);
        this.line(P0, P0.add(P0.toUnitVector().x(6 * earthRad)));
        this.line(P1, P1.add(P1.toUnitVector().x(6 * earthRad)));
        this.line(P2, P2.add(P2.toUnitVector().x(6 * earthRad)));
        this.restore();

        // sun
        this.save();
        this.setProp("pointRadiusPx", 20);
        this.setProp("shapeInsideColor", "rgb(255, 255, 0)");
        this.setProp("shapeOutlineColor", sunColor);
        this.arc(O, sunRad, undefined, undefined, true);
        this.restore();

        // earths
        var Ps = [P0, P1, P2];
        var thetas = [theta0, theta1, theta2];
        var earthThetas = [earthTheta0, earthTheta1, earthTheta2];
        for (i = 0; i < 3; i++) {
            this.save();
            this.translate(Ps[i]);
            this.arc(O, earthRad, undefined, undefined, true);
            this.save();
            this.rotate(earthThetas[i]);
            this.arrow(O, $V([-2.2 * earthRad, 0]));
            this.restore();
            this.save();
            this.rotate(thetas[i]);
            this.circleArrow(O, 2 * earthRad, -1, 1, "angVel", true);
            if (i === 0) {
                this.labelCircleLine(O, 2 * earthRad, -1, 1, $V([-1, 1]), "TEX:$\\omega_{\\rm E}$", true);
            }
            this.restore();
            this.restore();
        }

        // days
        this.circleArrow(O, orbitRad + 4 * earthRad, 0, theta2, undefined, true, 0.02);
        this.labelCircleLine(O, orbitRad + 4 * earthRad, 0, theta2, $V([0.6, 1.3]), "TEX:solar day", true);
        this.circleArrow(O, orbitRad + 5 * earthRad, 0, theta1, undefined, true, 0.02);
        this.labelCircleLine(O, orbitRad + 5 * earthRad, 0, theta1, $V([0, 1.1]), "TEX:sidereal day", true);

        // orbital velocity
        this.circleArrow(O, 3 * sunRad, -0.3, 1, "angVel", true, 0.05);
        this.labelCircleLine(O, 3 * sunRad, -0.3, 1, $V([-1, 0]), "TEX:$\\omega_{\\rm S}$", true);

        this.restore(); // end of earth-sun system
    });

    $( window ).on( "resize", function() {
        aov_fe_c.redraw();
        aov_fd_c.redraw();
    } );

}); // end of document.ready()
