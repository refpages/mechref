
var bus = {
    radius: 50, // m
    mass: 12600, // kg
    gravity: 9.81, // m/s^2

    busScale: 0.4,
    forceScale: 5e-6,
    motionScale: 1e-1,

    width: 2.54,
    totalWidth: 2.90,
    height: 3.11,

    centerOfMass: $V([0, 0.87]),
    leftContact: $V([-0.97, 0]),
    rightContact: $V([0.97, 0]),
    centerContact: $V([0, 0]),
    body: [
        $V([1.13, 3.11]),
        $V([-1.13, 3.11]),
        $V([-1.27, 2.18]),
        $V([-1.24, 0.21]),
        $V([1.24, 0.21]),
        $V([1.27, 2.18]),
    ],
    wheelLeft: [
        $V([-1.10, 0.21]),
        $V([-1.10, 0.00]),
        $V([-0.84, 0.00]),
        $V([-0.84, 0.21]),
    ],
    wheelRight: [
        $V([1.10, 0.21]),
        $V([1.10, 0.00]),
        $V([0.84, 0.00]),
        $V([0.84, 0.21]),
    ],
    mirrorLeft: [
        $V([-1.16, 2.91]),
        $V([-1.45, 2.81]),
        $V([-1.45, 2.31]),
        $V([-1.30, 2.24]),
        $V([-1.22, 2.78]),
        $V([-1.33, 2.79]),
        $V([-1.17, 2.84]),
    ],
    mirrorRight: [
        $V([1.16, 2.91]),
        $V([1.45, 2.81]),
        $V([1.45, 2.31]),
        $V([1.30, 2.24]),
        $V([1.22, 2.78]),
        $V([1.33, 2.79]),
        $V([1.17, 2.84]),
    ],
    stripe: [
        $V([1.20, 1.04]),
        $V([1.04, 0.80]),
        $V([0.00, 0.75]),
        $V([-1.04, 0.80]),
        $V([-1.20, 1.04]),
        $V([-0.81, 1.00]),
        $V([0.00, 0.98]),
        $V([0.81, 1.00]),
    ],
    headlightLeft: [
        $V([-1.20, 1.04]),
        $V([-1.21, 1.15]),
        $V([-0.88, 1.07]),
        $V([-0.76, 0.78]),
    ],
    headlightRight: [
        $V([1.20, 1.04]),
        $V([1.21, 1.15]),
        $V([0.88, 1.07]),
        $V([0.76, 0.78]),
    ],
    license: [
        $V([0.28, 0.44]),
        $V([-0.28, 0.44]),
        $V([-0.28, 0.30]),
        $V([0.28, 0.30]),
    ],
    windshield: [
        $V([1.08, 3.00]),
        $V([-1.08, 3.00]),
        $V([-1.20, 2.18]),
        $V([-1.19, 1.23]),
        $V([1.19, 1.23]),
        $V([1.20, 2.18]),
    ]
};

bus.draw = function(pd) {
    pd.polyLine(bus.body, true);
    pd.polyLine(bus.wheelLeft, false);
    pd.polyLine(bus.wheelRight, false);
    pd.polyLine(bus.mirrorLeft, false);
    pd.polyLine(bus.mirrorRight, false);
    pd.polyLine(bus.stripe, true);
    pd.polyLine(bus.headlightLeft, false);
    pd.polyLine(bus.headlightRight, false);
    pd.polyLine(bus.license, true);
    pd.polyLine(bus.windshield, true);
}

bus.drawForce = function(pd, posDw, f1Dw, f2Dw) {
    if (pd.getOption("components") || f2Dw === undefined) {
        pd.arrowTo(posDw, f1Dw.x(this.forceScale), "force");
        if (f2Dw !== undefined) {
            pd.arrowTo(posDw, f2Dw.x(this.forceScale), "force");
        }
    } else {
        pd.arrowTo(posDw, f1Dw.add(f2Dw).x(this.forceScale), "force");
    }
};


$(document).ready(function() {

    avb_fg_c = new PrairieDrawAnim("avb-fg-c", function(t) {
        this.addOption("vectors", false);
        
	this.setUnits(11, 11 / this.goldenRatio);

        var d = 4;
        var h = 4;
        var w = 1;

        this.rod($V([-d/2, 0]), $V([d/2, 0]), h);
        this.rod($V([-d/2, 0]), $V([d/2, 0]), h - 2 * w);

        var r = (h - w) / 2; // radius of track center
        var l1 = d; // top horizontal center length
        var l2 = Math.PI * r; // right curve center length
        var l3 = d; // bottom horizontal center length
        var l4 = Math.PI * r; // left curve center length
        var l = l1 + l2 + l3 + l4; // total length of track center
        var v = 2; // velocity of vehicle

        var computePos = function(t) {
            var dataNow = {};
            // dataNow.P = position of vechicle
            // dataNow.theta = angle of normal
            var s = (t * v) % l; // distance along track
            if (s < l1) {
                // top horizontal
                dataNow.P = $V([-d/2 + s, r]);
                dataNow.theta = Math.PI / 2;
            } else if (s < l1 + l2) {
                // right curve
                dataNow.theta = Math.PI/2 - (s - l1) / r;
                dataNow.P = $V([d/2 + r * Math.cos(dataNow.theta), r * Math.sin(dataNow.theta)]);
            } else if (s < l1 + l2 + l3) {
                // bottom horizontal
                dataNow.P = $V([d/2 - (s - l1 - l2), -r]);
                dataNow.theta = -Math.PI/2;
            } else {
                // left curve
                dataNow.theta = -Math.PI/2 - (s - l1 - l2 - l3) / r;
                dataNow.P = $V([-d/2 + r * Math.cos(dataNow.theta), r * Math.sin(dataNow.theta)]);
            }
            return dataNow;
        }
        var data = this.numDiff(computePos, t);

        this.save();
        this.translate(data.P);
        this.rotate(data.theta - Math.PI/2);
        this.rectangle(0.4, 0.2);
        this.restore();

        if (this.getOption("vectors")) {
            this.arrowFrom(data.P, data.diff.P.x(0.4), "velocity");
            this.labelLine(data.P, data.P.add(data.diff.P.x(0.4)), $V([1, 0]), "TEX:$\\vec{v}$");
            if (data.ddiff.P.modulus() > 1e-5) {
                this.arrowFrom(data.P, data.ddiff.P.x(0.4), "acceleration");
                this.labelLine(data.P, data.P.add(data.ddiff.P.x(0.4)), $V([1, 0]), "TEX:$\\vec{a}$");
                this.arrowTo(data.P, data.ddiff.P.x(0.6), "force");
                this.labelLine(data.P, data.P.add(data.ddiff.P.x(-0.6)), $V([1, 0]), "TEX:$\\vec{F}$");
            }
        }
    });

    avb_fp_c = new PrairieDrawAnim("avb-fp-c", function(t) {

        this.addOption("thetaDeg", 45);
        this.addOption("velocity", 30);
        this.addOption("components", true);

	this.setUnits(8, 8 / this.goldenRatio);

        var theta = this.getOption("thetaDeg") / 180 * Math.PI;

        fbdTrans = this.activationSequence("fbd", 0.5, t);
        fbdOffset = fbdTrans * (2 + 2 * Math.sin(theta));
        var drawForces = (fbdTrans == 1);
        
        var velocity = this.getOption("velocity"); // m/s
        var acceleration = Math.pow(velocity, 2) / bus.radius; // m/s^2

        var normal = bus.mass * acceleration * Math.sin(theta) + bus.mass * bus.gravity * Math.cos(theta);
        var friction = - bus.mass * acceleration * Math.cos(theta) + bus.mass * bus.gravity * Math.sin(theta);

        var u = this.vector2DAtAngle(theta);
        var v = this.vector2DAtAngle(theta + Math.PI/2);

        this.translate($V([fbdTrans * 0.5 * Math.sin(theta), -1 + fbdOffset / 4]));

        // ground
        this.save();
        this.translate(v.x(-fbdOffset / 2));
        this.groundHashed($V([0, 0]), v, 10, 0);
        if (drawForces) {
            bus.drawForce(this, $V([0, 0]), u.x(-friction), v.x(-normal));
        }
        this.restore();

        // bus
        this.save();
        this.translate(v.x(fbdOffset / 2));
        var busScale = 0.4;
        var C = v.x(busScale * bus.centerOfMass.e(2));
        this.save();
        this.rotate(this.angleOf(u));
        this.scale($V([busScale, busScale]));
        bus.draw(this);
        this.restore();
        if (drawForces) {
            this.centerOfMass(C);
            if (Math.abs(acceleration) > 1e-5) {
                this.arrowFrom(C, $V([-acceleration, 0]).x(bus.motionScale), "acceleration");
                this.labelLine(C, C.add($V([-acceleration, 0]).x(bus.motionScale)), $V([1,0]), "TEX:$\\vec{a}$");
            }
            bus.drawForce(this, C, $V([0, -bus.mass * bus.gravity]));
            bus.drawForce(this, $V([0, 0]), u.x(friction), v.x(normal));
        }
        this.restore();

    });

    window.avb_fr_c = new PrairieDrawAnim("avb-fr-c", function(t) {

        this.addOption("thetaDeg", 45);
        this.addOption("velocity", 30);
        this.addOption("components", true);

	this.setUnits(8, 8 / this.goldenRatio);

        var theta = this.getOption("thetaDeg") / 180 * Math.PI;

        fbdTrans = this.activationSequence("fbd", 0.5, t);
        fbdOffset = fbdTrans * (2 + 2 * Math.sin(theta));
        var drawForces = (fbdTrans == 1);

        var velocity = this.getOption("velocity"); // m/s
        var acceleration = Math.pow(velocity, 2) / bus.radius; // m/s^2

        var normal = bus.mass * acceleration * Math.sin(theta) + bus.mass * bus.gravity * Math.cos(theta);
        var friction = - bus.mass * acceleration * Math.cos(theta) + bus.mass * bus.gravity * Math.sin(theta);

        var h = bus.centerOfMass.e(2);
        var dL = bus.centerOfMass.e(1) - bus.leftContact.e(1);
        var dR = bus.rightContact.e(1) - bus.centerOfMass.e(1);
        var normalLeft = normal * dR / (dL + dR) + friction * h / (dL + dR);
        var normalRight = normal * dL / (dL + dR) - friction * h / (dL + dR);

        var frictionLeft = friction / 2;
        var frictionRight = friction / 2;

        var u = this.vector2DAtAngle(theta);
        var v = this.vector2DAtAngle(theta + Math.PI/2);

        this.translate($V([fbdTrans * 0.5 * Math.sin(theta), -1 + fbdOffset / 4]));

        var C = v.x(bus.busScale * bus.centerOfMass.e(2));
        var PL = u.x(bus.busScale * bus.leftContact.e(1));
        var PR = u.x(bus.busScale * bus.rightContact.e(1));

        // ground
        this.save();
        this.translate(v.x(-fbdOffset / 2));
        this.groundHashed($V([0, 0]), v, 10, 0);
        if (drawForces) {
            bus.drawForce(this, PL, u.x(-frictionLeft), v.x(-normalLeft));
            bus.drawForce(this, PR, u.x(-frictionRight), v.x(-normalRight));
        }
        this.restore();

        // bus
        this.save();
        this.translate(v.x(fbdOffset / 2));
        this.save();
        this.rotate(this.angleOf(u));
        this.scale($V([bus.busScale, bus.busScale]));
        bus.draw(this);
        this.restore();
        if (drawForces) {
            this.centerOfMass(C);
            if (Math.abs(acceleration) > 1e-5) {
                this.arrowFrom(C, $V([-acceleration, 0]).x(bus.motionScale), "acceleration");
                this.labelLine(C, C.add($V([-acceleration, 0]).x(bus.motionScale)), $V([1,0]), "TEX:$\\vec{a}$");
            }
            bus.drawForce(this, C, $V([0, -bus.mass * bus.gravity]));
            bus.drawForce(this, PL, u.x(frictionLeft), v.x(normalLeft));
            bus.drawForce(this, PR, u.x(frictionRight), v.x(normalRight));
        }
        this.restore();

    });

    window.avb_fb_c = new PrairieDrawAnim("avb-fb-c", function(t) {
	this.setUnits(3.5, 3.5);
        this.translate($V([0.1, -bus.height / 2 + 0.15]));
        bus.draw(this);
        this.centerOfMass(bus.centerOfMass);
        var L2 = $V([-bus.width / 2, 0]);
        var L1 = $V([bus.leftContact.e(1), 0]);
        var O = $V([0,0]);
        var R1 = $V([bus.rightContact.e(1), 0]);
        var R2 = $V([bus.width / 2, 0]);
        this.measurement(L2, L1, "TEX:$\\ell_1$");
        this.measurement(L1,  O, "TEX:$\\ell_2$");
        this.measurement( O, R1, "TEX:$\\ell_3$");
        this.measurement(R1, R2, "TEX:$\\ell_4$");
        var Q1 = $V([-bus.totalWidth / 2, 0]);
        var Q2 = $V([-bus.totalWidth / 2, bus.centerOfMass.e(2)]);
        var Q3 = $V([-bus.totalWidth / 2, bus.height]);
        this.measurement(Q2, Q1, "TEX:$h_1$");
        this.measurement(Q3, Q2, "TEX:$h_2$");
    });

    $(window).on("resize", function(){
        avb_fg_c.redraw();
        avb_fp_c.redraw();
        avb_fr_c.redraw();
        avb_fb_c.redraw();
    });
});

