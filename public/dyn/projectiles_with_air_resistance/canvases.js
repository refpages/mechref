$(document).ready(function() {

    /********************************************************************************/

    afp_ff_c = new PrairieDraw("afp-ff-c", function(t) {
        this.addOption("vAngleDeg", 30);
        var vAngle = PrairieGeom.degToRad(this.getOption("vAngleDeg"));

	this.setUnits(11, 11 / this.goldenRatio);

        var O = $V([0, 0]);
        this.drawImage("/dyn/projectiles_with_air_resistance/afp_baseball.png", O, O, 1);

        var v = PrairieGeom.vector2DAtAngle(vAngle).x(2.5);
        var Fd = PrairieGeom.vector2DAtAngle(vAngle + Math.PI).x(1.5);
        var Fg = $V([0, -3]);

        this.arrow(O, v, "velocity");
        this.arrow(O, Fd, "force");
        this.arrow(O, Fg, "force");

        this.labelLine(O, v, $V([0, 1]), "TEX:$\\vec{v}$");
        this.labelLine(O, Fd, $V([0, -1]), "TEX:$\\vec{F}_{\\rm D}$");
        this.labelLine(O, Fg, $V([0, 1]), "TEX:$m\\vec{g}$");
    });

    /********************************************************************************/

    afp_ft_c = new PrairieDraw("afp-ft-c", function() {
        this.addOption("v0", 30);
        var v0 = this.getOption("v0");
        this.addOption("v0AngleDeg", 45);
        var v0Angle = PrairieGeom.degToRad(this.getOption("v0AngleDeg"));
        this.addOption("m_g", 145);
        var m = this.getOption("m_g") / 1000;
        this.addOption("D_cm", 7.5);
        var D = this.getOption("D_cm") / 100;

        this.setUnits(10, 6.3);

        var dt = 0.03;
        var nt = 300;

        var rkStep = function(f, x, dt) {
            var x0 = $V(x);
            var k1 = $V(f(x0.elements));
            var k2 = $V(f(x0.add(k1.x(dt/2)).elements));
            var k3 = $V(f(x0.add(k2.x(dt/2)).elements));
            var k4 = $V(f(x0.add(k3.x(dt)).elements));
            var x1 = x0.add(k1.x(dt/6)).add(k2.x(dt/3)).add(k3.x(dt/3)).add(k4.x(dt/6));
            return x1.elements;
        };
        var rk = function(f, x0, dt, nt) {
            var traj = [x0];
            for (var i = 0; i < nt; i++) {
                traj.push(rkStep(f, traj[traj.length - 1], dt));
            }
            return traj;
        };

        var fVacuum = function(x) {
            var rx = x[0];
            var ry = x[1];
            var vx = x[2];
            var vy = x[3];
            return [vx, vy, 0, -9.81];
        }
        var fDrag = function(x) {
            var rx = x[0];
            var ry = x[1];
            var vx = x[2];
            var vy = x[3];
            var v = $V([vx, vy]);
            var rho = 1.225;
            var c = Math.PI / 16 * rho * D*D;
            var aD = v.x(-c / m * v.modulus());
            return [vx, vy, aD.e(1), -9.81 + aD.e(2)];
        }

        var v0 = PrairieGeom.vector2DAtAngle(v0Angle).x(v0);
        var x0 = [0, 1, v0.e(1), v0.e(2)];
        var stateTrajVacuum = rk(fVacuum, x0, dt, nt);
        var stateTrajDrag = rk(fDrag, x0, dt, nt);

        var stateTrajToPosTraj = function(stateTraj) {
            var posTraj = [];
            for (var i = 0; i < stateTraj.length; i++) {
                posTraj.push($V([stateTraj[i][0], stateTraj[i][1]]));
            }
            return posTraj;
        };

        var posTrajVacuum = stateTrajToPosTraj(stateTrajVacuum);
        var posTrajDrag = stateTrajToPosTraj(stateTrajDrag);
        console.log(1)
        var originDw = $V([-4.2, -2.35]);
        var sizeDw = $V([8.8, 5.252]);
        var originData = $V([0, 0]);
        var sizeData = $V([124, 74]);
        var options = {
            drawXGrid: true,
            drawYGrid: true,
            dXGrid: 10,
            dYGrid: 10,
            drawXTickLabels: true,
            drawYTickLabels: true,
            xLabelPos: 0.5,
            yLabelPos: 0.5,
            xLabelAnchor: $V([0, 3]),
            yLabelAnchor: $V([0, -3]),
            yLabelRotate: true,
        };
        console.log(2)
        this.plot(posTrajVacuum, originDw, sizeDw, originData, sizeData, "TEX:\\text{horizontal position} \\ $x$ / m", "TEX:\\text{vertical position} \\ $y$ / m", "blue", true, false, null, null, options);
        this.plot(posTrajDrag, originDw, sizeDw, originData, sizeData, null, null, "red", false);

        var findPeak = function(posTraj) {
            var peak = $V([0, 0]);
            for (var i = 0; i < posTraj.length; i++) {
                if (posTraj[i].e(2) > peak.e(2)) {
                    peak = posTraj[i];
                }
            }
            return peak;
        };
        
        var peakVacuum = findPeak(posTrajVacuum);
        var peakDrag = findPeak(posTrajDrag);

        peakVacuum = $V([
            (peakVacuum.e(1) - originData.e(1)) / sizeData.e(1) * sizeDw.e(1) + originDw.e(1),
            (peakVacuum.e(2) - originData.e(2)) / sizeData.e(2) * sizeDw.e(2) + originDw.e(2),
        ]);
        peakDrag = $V([
            (peakDrag.e(1) - originData.e(1)) / sizeData.e(1) * sizeDw.e(1) + originDw.e(1),
            (peakDrag.e(2) - originData.e(2)) / sizeData.e(2) * sizeDw.e(2) + originDw.e(2),
        ]);

        this.text(peakVacuum, $V([0, -1]), "TEX:\\text{vacuum}");
        this.text(peakDrag, $V([0, 1]), "TEX:\\text{drag}");
    });

    /********************************************************************************/

    $( window ).on( "resize", function() {
        afp_ft_c.redraw();
        afp_ff_c.redraw();
    } );
}); // end of document.ready()
