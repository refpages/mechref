
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


$(document).ready(function() {

    ava_fp_c = new PrairieDrawAnim("ava-fp-c", function(t) {
        this.addOption("components", true);
        
        var stateTogether = {bodyOffset: 0};
        var stateApart = {bodyOffset: 3};
        var states = [stateTogether, stateApart];
        var transTimes = [0.5, 0.5];
        var holdTimes = [-1, -1];
        var interps = {};
        var names = ["together", "apart"];
        var fbdState = this.newSequence("fbd", states, transTimes, holdTimes, interps, names, t);
        var drawForces = false;
        if ((fbdState.inTransition == false) && (fbdState.index == 1)) {
            drawForces = true;
        }
        
        var motionState = Car.getMotion(this, t);
        
	this.setUnits(16, 3.5 + fbdState.bodyOffset, 600);
        var desiredPos = this.pos2Dw($V([0, this.heightPx() - this.getProp("groundDepthPx") * 3]));
        this.translate($V([-Car.centerOfMass.e(1), desiredPos.e(2)]));

        var fAir = Car.fAir(motionState.v)
        var fDrive = fAir + Car.mass * motionState.a;
        var fg = Car.mass * 9.81;
        
        var groundOffset = - motionState.x * Car.motionScale;
        var centerContact = $V([Car.centerOfMass.e(1), Car.rearContact.e(2)]);
        
        // body and wheels
        this.save();
        this.translate($V([0, fbdState.bodyOffset]));
        Car.drawBody(this);
        Car.drawWheels(this, 0);
        if (drawForces) {
            this.centerOfMass(Car.centerOfMass);
            Car.drawForce(this, Car.centerOfMass, $V([0, -fg]));
            Car.drawForce(this, Car.windContact, $V([-fAir, 0]));
            Car.drawForce(this, centerContact, $V([fDrive, fg]));
            this.arrowFrom(Car.centerOfMass, $V([motionState.a, 0]).x(Car.motionScale), "acceleration");
            this.arrowFrom(Car.centerOfMass, $V([motionState.v, 0]).x(Car.motionScale), "velocity");
        }
        this.restore();
        
        // ground
        this.groundHashed($V([0, 0]), $V([0, 1]), 25, groundOffset);
        if (drawForces) {
            Car.drawForce(this, centerContact, $V([-fDrive, -fg]));
        }
    });

    ava_fr_c = new PrairieDrawAnim("ava-fr-c", function(t) {
        this.addOption("components", true);
        
        var stateTogether = {bodyOffset: 0};
        var stateApart = {bodyOffset: 2};
        var states = [stateTogether, stateApart];
        var transTimes = [0.5, 0.5];
        var holdTimes = [-1, -1];
        var interps = {};
        var names = ["together", "apart"];
        var fbdState = this.newSequence("fbd", states, transTimes, holdTimes, interps, names, t);
        var drawForces = false;
        if ((fbdState.inTransition == false) && (fbdState.index == 1)) {
            drawForces = true;
        }
        
        var motionState = Car.getMotion(this, t);

	this.setUnits(8, 2.5 + fbdState.bodyOffset, 600);
        var desiredPos = this.pos2Dw($V([0, this.heightPx() - this.getProp("groundDepthPx") * 3]));
        this.translate($V([-Car.centerOfMass.e(1), desiredPos.e(2)]));

        fAir = Car.fAir(motionState.v);
        var fDrive = fAir + Car.mass * motionState.a;
        var fRearDrive, fFrontDrive;
        if (fDrive > 0) {
            fRearDrive = fDrive;
            fFrontDrive = 0;
        } else {
            fRearDrive = 0.5 * fDrive;
            fFrontDrive = 0.5 * fDrive;
        }
        var fg = Car.mass * 9.81;
        var dr = Car.centerOfMass.e(1) - Car.rearWheelC.e(1);
        var df = Car.frontWheelC.e(1) - Car.centerOfMass.e(1);
        var h = Car.centerOfMass.e(2) - Car.rearContact.e(2);
        var fRearContactY = (dr * fg + h * fDrive) / (dr + df);
        var fFrontContactY = (df * fg - h * fDrive) / (dr + df);
        
        var groundOffset = - motionState.x * Car.motionScale;
        var wheelAngle = groundOffset / Car.wheelR;
        
        // body and wheels
        this.save();
        this.translate($V([0, fbdState.bodyOffset]));
        Car.drawBody(this);
        Car.drawWheels(this, 0);
        if (drawForces) {
            this.centerOfMass(Car.centerOfMass);
            Car.drawForce(this, Car.centerOfMass, $V([0, -fg]));
            Car.drawForce(this, Car.windContact, $V([-fAir, 0]));
            Car.drawForce(this, Car.rearContact, $V([fRearDrive, fRearContactY]));
            Car.drawForce(this, Car.frontContact, $V([fFrontDrive, fFrontContactY]));
            this.arrowFrom(Car.centerOfMass, $V([motionState.a, 0]).x(Car.motionScale), "acceleration");
            this.arrowFrom(Car.centerOfMass, $V([motionState.v, 0]).x(Car.motionScale), "velocity");
        }
        this.restore();
        
        // ground
        this.groundHashed($V([0, 0]), $V([0, 1]), 15, groundOffset);
        if (drawForces) {
            Car.drawForce(this, Car.rearContact, $V([-fRearDrive, -fRearContactY]));
            Car.drawForce(this, Car.frontContact, $V([-fFrontDrive, -fFrontContactY]));
        }
    });

    ava_fm_c = new PrairieDrawAnim("ava-fm-c", function(t) {
        this.addOption("components", true);
        
        var stateTogether = {wheelOffset: 0, bodyOffset: 0};
        var stateApart = {wheelOffset: 2.1, bodyOffset: 4.2};
        var states = [stateTogether, stateApart];
        var transTimes = [0.5, 0.5];
        var holdTimes = [-1, -1];
        var interps = {};
        var names = ["together", "apart"];
        var fbdState = this.newSequence("fbd", states, transTimes, holdTimes, interps, names, t);
        var drawForces = false;
        if ((fbdState.inTransition == false) && (fbdState.index == 1)) {
            drawForces = true;
        }
        
        var motionState = Car.getMotion(this, t);
        
	this.setUnits(8, 2.5 + fbdState.bodyOffset, 600);
        var desiredPos = this.pos2Dw($V([0, this.heightPx() - this.getProp("groundDepthPx") * 3]));
        this.translate($V([-Car.centerOfMass.e(1), desiredPos.e(2)]));
        
        var mw = Car.wheelMass;
        var mb = Car.bodyMass;
        var Iw = Car.wheelMomentInertia;
        var l2 = Car.centerOfMass.e(1) - Car.rearWheelC.e(1);
        var l3 = Car.frontWheelC.e(1) - Car.centerOfMass.e(1);
        var h1 = Car.wheelR;
        var h2 = Car.centerOfMass.e(2) - Car.rearWheelC.e(2);
        var D = Car.fAir(motionState.v);
        var W = Car.mass * 9.81;
        var a = motionState.a;
        
        var Fr, Ff, Nr, Nf, Rr, Rf;
        
        // assume we are braking
        Ff = 0.25 * (mb * a + D);
        if (Ff >= 0) {
            // we are actually driving
            Rf = -(Iw / Math.pow(h1, 2)) * a;
            Ff = Rf - mw * a;
            Fr = 0.5 * (D + mb * a) - Ff;
        } else {
            // we really are braking
            Fr = Ff;
        }
        
        // compute all other wheel forces from Fr, Ff
        Rr = Fr + mw * a;
        Rf = Ff + mw * a;
        Mr = h1 * Rr + (Iw / h1) * a;
        Mf = h1 * Rf + (Iw / h1) * a;
        
        // compute vertical forces
        Nr = (W / 2) * l3 / (l2 + l3) + ((Ff + Fr) * h2 + Mr + Mf) / (l2 + l3);
        Nf = (W / 2) - Nr;
        
        var groundOffset = - motionState.x * Car.motionScale;
        var wheelAngle = groundOffset / Car.wheelR;
        
        // body
        this.save();
        this.translate($V([0, fbdState.bodyOffset]));
        Car.drawBody(this);
        if (drawForces) {
            this.centerOfMass(Car.centerOfMass);
            Car.drawForce(this, Car.centerOfMass, $V([0, -W]));
            Car.drawForce(this, Car.rearWheelC, $V([Fr, Nr]).x(2));
            Car.drawForce(this, Car.frontWheelC, $V([Ff, Nf]).x(2));
            Car.drawForce(this, Car.windContact, $V([-D, 0]));
            this.arrowFrom(Car.centerOfMass, $V([motionState.a, 0]).x(Car.motionScale), "acceleration");
            this.arrowFrom(Car.centerOfMass, $V([motionState.v, 0]).x(Car.motionScale), "velocity");
            this.circleArrowCentered(Car.rearWheelC, Car.wheelR + 0.1, - Math.PI / 2, Mr * Car.momentScale * 2, "moment");
            this.circleArrowCentered(Car.frontWheelC, Car.wheelR + 0.1, - Math.PI / 2, Mf * Car.momentScale * 2, "moment");
        }
        this.restore();
        
        // wheels
        this.save();
        this.translate($V([0, fbdState.wheelOffset]));
        Car.drawWheels(this, wheelAngle);
        if (drawForces) {
            Car.drawForce(this, Car.rearWheelC, $V([-Fr, -Nr]).x(2));
            Car.drawForce(this, Car.frontWheelC, $V([-Ff, -Nf]).x(2));
            Car.drawForce(this, Car.rearContact, $V([Rr, Nr]).x(2));
            Car.drawForce(this, Car.frontContact, $V([Rf, Nf]).x(2));
            this.circleArrowCentered(Car.rearWheelC, Car.wheelR + 0.1, Math.PI / 2, - Mr * Car.momentScale * 2, "moment");
            this.circleArrowCentered(Car.frontWheelC, Car.wheelR + 0.1, Math.PI / 2, - Mf * Car.momentScale * 2, "moment");
        }
        this.restore();
        
        // ground
        this.groundHashed($V([0, 0]), $V([0, 1]), 15, groundOffset);
        if (drawForces) {
            Car.drawForce(this, Car.rearContact, $V([-Rr, -Nr]).x(2));
            Car.drawForce(this, Car.frontContact, $V([-Rf, -Nf]).x(2));
        }
    });

    var ava_fc_c = new PrairieDrawAnim("ava-fc-c", function(t) {
	this.setUnits(8 * 2 / 3, 2.2);
        
        this.translate($V([-Car.width / 2, -Car.height / 2]));
        Car.drawBody(this);
        Car.drawWheels(this, 0);
        this.centerOfMass(Car.centerOfMass);
        var O = $V([0,0]);
        var P1 = $V([Car.rearContact.e(1), 0]);
        var P2 = $V([Car.centerOfMass.e(1), 0]);
        var P3 = $V([Car.frontContact.e(1), 0]);
        var P4 = $V([Car.width, 0]);
        this.measurement(O, P1, "TEX:$\\ell_1$");
        this.measurement(P1, P2, "TEX:$\\ell_2$");
        this.measurement(P2, P3, "TEX:$\\ell_3$");
        this.measurement(P3, P4, "TEX:$\\ell_4$");
        var Q1 = $V([0, Car.rearWheelC.e(2)]);
        var Q2 = $V([0, Car.centerOfMass.e(2)]);
        var Q3 = $V([0, Car.height]);
        this.measurement(Q1, O, "TEX:$h_1$");
        this.measurement(Q2, Q1, "TEX:$h_2$");
        this.measurement(Q3, Q2, "TEX:$h_3$");
    });

    $(window).on("resize", function(){
        ava_fp_c.redraw();
        ava_fr_c.redraw();
        ava_fm_c.redraw();
        ava_fc_c.redraw();
    });
});

