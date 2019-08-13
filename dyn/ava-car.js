
var Car = {
    width: 4.60,
    height: 1.39,
    outline: [$V([1.37, 0.27]), $V([3.49, 0.27]), $V([4.23, 0.35]),
              $V([4.49, 0.35]), $V([4.60, 0.55]), $V([4.49, 0.60]),
              $V([4.56, 0.83]), $V([4.49, 0.89]), $V([4.25, 0.93]),
              $V([3.05, 0.98]), $V([2.55, 1.36]), $V([2.27, 1.39]),
              $V([1.96, 1.38]), $V([1.56, 1.32]), $V([1.16, 1.20]),
              $V([0.57, 0.98]), $V([0.35, 0.95]), $V([0.08, 0.93]),
              $V([0.00, 0.61]), $V([0.22, 0.38]), $V([0.70, 0.35])],
    sideLines: [$V([4.43, 0.75]), $V([3.03, 0.76]), $V([1.44, 0.75]),
                $V([1.56, 0.47]), $V([3.32, 0.46])],
    windowOutline: [$V([2.91, 0.95]), $V([2.48, 1.28]), $V([2.26, 1.30]),
                    $V([1.97, 1.29]), $V([1.69, 1.24]), $V([1.66, 1.20]),
                    $V([1.73, 0.96])],
    rearLine: [$V([1.71, 0.94]), $V([1.57, 0.93]), $V([1.46, 0.98]),
               $V([1.13, 0.98]), $V([0.54, 0.96])],
    rearWheelC: $V([0.98, 0.31]),
    frontWheelC: $V([3.80, 0.31]),
    centerOfMass: $V([2.39, 0.60]),
    rearContact: $V([0.98, 0.00]),
    frontContact: $V([3.80, 0]),
    windContact: $V([4.60, 0.60]),
    wheelR: 0.31,
    rimR: 0.20,
    axleR: 0.07,
    nSpokes: 6,
    wheelMass: 20,
    bodyMass: 1100,
    mass: 1180,
    wheelMomentInertia: 0.961,
    crossSectionArea: 2.2,
    dragCoeff: 0.3,
    airDensity: 1.23e-3,
    forceScale: 1e-4,
    motionScale: 0.05,
    momentScale: 1e-3
};

Car.drawBody = function(pd) {
    pd.polyLine(this.outline, true);
    pd.polyLine(this.sideLines);
    pd.polyLine(this.windowOutline, true);
    pd.polyLine(this.rearLine);
    pd.setProp("pointRadiusPx", 4);
    pd.filledCircle(this.rearWheelC, this.axleR);
    pd.filledCircle(this.frontWheelC, this.axleR);
};

Car.drawWheels = function(pd, wheelAngle) {
    pd.circle(this.rearWheelC, this.wheelR);
    pd.circle(this.rearWheelC, this.rimR);
    pd.circle(this.frontWheelC, this.wheelR);
    pd.circle(this.frontWheelC, this.rimR);
    var theta;
    for (var i = 0; i < this.nSpokes; i++) {
        theta = wheelAngle + 2 * Math.PI * i / this.nSpokes;
        pd.line(this.rearWheelC, this.rearWheelC.add(pd.vector2DAtAngle(theta).x(this.rimR)));
        pd.line(this.frontWheelC, this.frontWheelC.add(pd.vector2DAtAngle(theta).x(this.rimR)));
    }
    pd.filledCircle(this.rearWheelC, this.axleR);
    pd.filledCircle(this.frontWheelC, this.axleR);
};

Car.getMotion = function(pd, t) {
    var xHold = function(s0, dt) {
        if (s0 == null) {
            return 0;
        }
        return s0.x;
    };

    var vExtrap = function(s0, dt) {
        return s0.v + dt * s0.a;
    };

    var xExtrap = function(s0, dt) {
        return s0.x + dt * s0.v + 0.5 * dt * dt * s0.a;
    };

    var vInterp = function(s0, s1, dt) {
        return s0.v + dt * s0.a + 0.5 * dt * dt / (s1.t - s0.t) * (s1.a - s0.a);
    };

    var xInterp = function(s0, s1, dt) {
        return s0.x + dt * s0.v + 0.5 * dt * dt * s0.a + (1/6) * dt * dt * dt / (s1.t - s0.t) * (s1.a - s0.a);
    };

    var stateStationary = {a: 0, v: 0, x: xHold};
    var stateAccelerating = {a: 10, v: vExtrap, x: xExtrap};
    var stateCruising = {a: 0, v: vExtrap, x: xExtrap};
    var stateBraking = {a: -10, v: vExtrap, x: xExtrap};
    var states = [stateStationary, stateAccelerating, stateCruising, stateBraking];

    var interps = {v: vInterp, x: xInterp};
    var transTimes = [1, 1, 1, 1];
    var holdTimes = [-1, 3, -1, 3];
    var names = ["stationary", "accelerating", "cruising", "braking"];

    var motionState = pd.newSequence("motion", states, transTimes, holdTimes, interps, names, t);
    return motionState;
};

Car.fAir = function(v) {
    var fAir = 0.5 * Car.airDensity * Math.pow(v, 2) * Car.dragCoeff * Car.crossSectionArea;
    fAir *= 1e4;
    return fAir;
};

Car.drawForce = function(pd, posDw, fDw) {
    if (pd.getOption("components")) {
        pd.arrowTo(posDw, $V([fDw.e(1), 0]).x(this.forceScale), "force");
        pd.arrowTo(posDw, $V([0, fDw.e(2)]).x(this.forceScale), "force");
    } else {
        pd.arrowTo(posDw, fDw.x(this.forceScale), "force");
    }
};
