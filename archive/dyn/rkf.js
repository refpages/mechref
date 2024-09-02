$(document).ready(function() {

    var rkf_fi_c = new PrairieDraw("rkf-fi-c", function() {
        this.setUnits(10, 6);

        var O = $V([0, 0, 0]);
        var ei = $V([3, 0, 0]);
        var ej = $V([0, 2, 0]);
        var ek = $V([0, 0, 2]);

        this.save();
        this.translate($V([-3, 0, 0]))
        this.arrow(O, ei);
        this.arrow(O, ej);
        this.arrow(O, ek);
        this.text(O, ej, "TEX:$O$");
        this.text(ek, $V([1.5, 1]), "TEX:$\\mathcal{I}$");
        this.text(ei, $V([1, 1]), "TEX:$x$");
        this.text(ej, $V([-1, 0]), "TEX:$y$");
        this.text(ek, $V([-1, 0]), "TEX:$z$");
        this.restore();

        this.translate($V([2, 0, 0]));
        this.arrow(O, ei);
        this.arrow(O, ej);
        this.arrow(O, ek);
        this.text(O, ej, "TEX:$O'$");
        this.text(ek, $V([1.5, 1]), "TEX:$\\mathcal{F}$");
        this.text(ei, $V([1, 1]), "TEX:$u$");
        this.text(ej, $V([-1, 0]), "TEX:$v$");
        this.text(ek, $V([-1, 0]), "TEX:$w$");
        this.restore();
    });

    var rkf_xf_c = new PrairieDraw("rkf-xf-c", function() {
        this.setUnits(4, 4);

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);

        var r = 2;
        var radius = 0.8;
        var thetaR = 0.4;
        var thetaC = Math.PI/4;
        var thetaP = Math.PI/2;

        var er = this.vector2DAtAngle(thetaC);
        var etheta = this.perp(er);

        var rC = er.x(r);
        var rCP = this.vector2DAtAngle(thetaP).x(radius);
        var rP = rC.add(rCP);

        this.save();
        this.translate($V([-1, -1]));

        this.circle(rC, radius);
        this.arrow(O, ei);
        this.arrow(O, ej);
        this.arrow(O, rC, "position");
        this.circleArrow(O, thetaR, 0, thetaC, "angle");
        this.arrow(rC, rC.add(er.x(1/2)));
        this.arrow(rC, rC.add(etheta.x(1/2)));

        this.save();
        this.setProp("shapeStrokePattern", "dashed");
        this.line(rC, rP);
        this.restore();

        this.circleArrow(rC, thetaR/2, thetaC, thetaP, "angle");

        this.circleArrow(rC, radius + 0.2, Math.PI/10, Math.PI/3, "angVel");

        this.save();
        this.setProp("pointRadiusPx", 2.5);
        this.point(rC);
        this.point(rP);
        this.restore();

        this.text(O, $V([1, 1]), "TEX:$O$");
        this.text(rC, $V([0, 1.5]), "TEX:$C$");
        this.labelIntersection(rP, [rC, rCP, etheta], "TEX:$P$");
        this.labelLine(O, ei, $V([1, -1]), "TEX:$\\hat{\\imath}$");
        this.labelLine(O, ej, $V([1, 1]), "TEX:$\\hat{\\jmath}$");
        this.labelLine(O, rC, ej, "TEX:$\\vec{r}$");
        this.text(rC.add(er.x(1/2)), ej.x(1.5), "TEX:$\\hat{e}_r$");
        this.text(rC.add(etheta.x(1/2)), ej.x(1.5), "TEX:$\\hat{e}_\\theta$");
        this.labelCircleLine(O, thetaR, 0, thetaC, ej, "TEX:$\\theta$");
        this.labelCircleLine(rC, thetaR/2, thetaC, thetaP, ej, "TEX:$\\phi$");
        this.labelCircleLine(rC, radius + 0.2, Math.PI/10, Math.PI/3, ej, "TEX:$\\vec\\omega$");
        this.restore();
    });

    var rkf_cv_c = new PrairieDraw("rkf-cv-c", function() {
        this.setUnits(3, 3 / this.goldenRatio);

        this.translate($V([-1.2, -0.7]));

        var O = $V([0, 0]);
        var ei = $V([1, 0]);
        var ej = $V([0, 1]);
        var rOp = $V([1.5, 0.4]);
        var rP = $V([1.7, 1.2]);
        var vOp = $V([0.4, 0.2]);

        this.arrow(O, ei);
        this.arrow(O, ej);

        this.save();
        this.setProp("arrowLinePattern", "dashed");
        this.arrow(rOp, rOp.add(ei));
        this.arrow(rOp, rOp.add(ej));
        this.restore();

        this.text(O, $V([1, 1]), "TEX:$O$");
        this.labelLine(O, ej, $V([0.5, 1.5]), "TEX:$\\mathcal{I}$");
        this.labelLine(rOp, rOp.add(ej), $V([0.5, 1.5]), "TEX:$\\mathcal{F}$");

        this.point(rOp);
        this.point(rP);
        this.text(rOp, $V([0, 1.2]), "TEX:$O'$");
        this.text(rP, $V([-1.2, 0]), "TEX:$P$");

        this.arrow(O, rOp, "position");
        this.arrow(O, rP, "position");
        this.labelLine(O, rOp, $V([0, -1.1]), "TEX:$\\vec{r}_{O'}$");
        this.labelLine(O, rP, $V([0, 1.1]), "TEX:$\\vec{r}_P$");

        this.arrow(rOp, rP, "position");
        this.labelLine(rOp, rP, $V([0, -1.1]), "TEX:$\\vec{r}_{O'P}$");

        this.arrow(rOp, rOp.add(vOp), "velocity");
        this.labelLine(rOp, rOp.add(vOp), $V([1, -1]), "TEX:$\\vec{v}_{\\mathcal{I}}(O')$");
    });
})