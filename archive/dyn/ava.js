
$(document).ready(function() {

    new PrairieDrawAnim("ava-fp-c", function(t) {
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

    new PrairieDrawAnim("ava-fr-c", function(t) {
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

    new PrairieDrawAnim("ava-fm-c", function(t) {
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

    new PrairieDrawAnim("ava-fc-c", function(t) {
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
        
}); // end of document.ready()
