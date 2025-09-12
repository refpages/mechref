$(document).ready(function(){
    var limitsFourBar = function(pd, g, f, a, b) {
        var limits = {};
        limits.L = g + f + a + b;
        limits.ValidityIndex = limits.L - 2 * Math.max(g, f, a, b);
        limits.valid = ((limits.ValidityIndex >= 0) && (Math.min(g, f, a, b) >= 0));
        if (limits.ValidityIndex >= 0) {
            limits.ValidityRelation = "≥ 0";
        } else {
            limits.ValidityRelation = "< 0";
        }

        limits.GrashofIndex = limits.L - 2 * (Math.max(g, f, a, b) + Math.min(g, f, a, b));
        if (limits.GrashofIndex > 0) {
            limits.GrashofRelation = "> 0";
        } else if (limits.GrashofIndex == 0) {
            limits.GrashofRelation = "= 0";
        } else {
            limits.GrashofRelation = "< 0";
        }

        limits.T1 = g + f - a - b;
        limits.T2 = b + g - a - f;
        limits.T3 = b + f - a - g;
        var charVal = function(TVal) {
            if (TVal > 0) {
                return "+";
            } else if (TVal == 0) {
                return "0";
            } else { // TVal < 0
                return "-";
            }
        };
        var linkageKey = (charVal(limits.T1) + charVal(limits.T2) + charVal(limits.T3));

        var limitAngles = [
            pd.cosLawAngle(a, g, f + b),
            -pd.cosLawAngle(a, g, f + b),
            pd.cosLawAngle(a, g, f - b),
            2 * Math.PI - pd.cosLawAngle(a, g, f - b),
            pd.cosLawAngle(a, g, b - f),
            2 * Math.PI - pd.cosLawAngle(a, g, b - f)
        ];

        var keyMap = {
            "+++": ["crank",    "rocker",   true,  0, 0, -1, -1],
            "0++": ["crank",    "π-rocker", true,  0, 2, -1, -1],
            "-++": ["π-rocker", "π-rocker", false, 0, 2,  2,  3],
            "+0+": ["crank",    "0-rocker", true,  0, 2, -1, -1],
            "00+": ["crank",    "crank",    true,  0, 2, -1, -1],
            "-0+": ["crank",    "crank",    true,  0, 2, -1, -1],
            "+-+": ["π-rocker", "0-rocker", false, 0, 2,  4,  5],
            "0-+": ["crank",    "crank",    true,  0, 2, -1, -1],
            "--+": ["crank",    "crank",    true,  0, 0, -1, -1],
            "++0": ["crank",    "π-rocker", true,  1, 2, -1, -1],
            "0+0": ["crank",    "π-rocker", true,  0, 1, -1, -1],
            "-+0": ["π-rocker", "π-rocker", true,  1, 1,  2,  3],
            "+00": ["crank",    "crank",    true,  0, 1, -1, -1],
            "000": ["crank",    "crank",    true,  0, 1, -1, -1],
            "-00": ["crank",    "crank",    true,  0, 1, -1, -1],
            "+-0": ["π-rocker", "crank",    true,  1, 1,  4,  5],
            "0-0": ["crank",    "crank",    true,  0, 1, -1, -1],
            "--0": ["crank",    "crank",    true,  1, 2, -1, -1],
            "++-": ["0-rocker", "π-rocker", false, 0, 2,  1,  0],
            "0+-": ["0-rocker", "π-rocker", true,  1, 1,  1,  0],
            "-+-": ["rocker",   "rocker",   true,  0, 2,  2,  0],
            "+0-": ["0-rocker", "crank",    true,  1, 1,  1,  0],
            "00-": ["0-rocker", "crank",    true,  1, 1,  1,  0],
            "-0-": ["0-rocker", "0-rocker", true,  1, 1,  1,  0],
            "+--": ["rocker",   "crank",    true,  0, 2,  4,  0],
            "0--": ["0-rocker", "crank",    true,  1, 1,  1,  0],
            "---": ["0-rocker", "0-rocker", false, 0, 2,  1,  0]
        }
        var data = keyMap[linkageKey];
        limits.inputType = data[0];
        limits.outputType = data[1];
        limits.canFlip = (data[4] > 0);
        limits.limited = (data[5] >= 0);
        limits.Grashof = data[2];
        limits.flipPhase = data[3];
        limits.flipPeriod = data[4];
        limits.alphaMin = (data[5] >= 0 ? limitAngles[data[5]] : 0);
        limits.alphaMax = (data[6] >= 0 ? limitAngles[data[6]] : 0);

        if (limits.Grashof) {
            limits.GrashofType = "Grashof";
            limits.GrashofInfo = "rotates fully";
        } else {
            limits.GrashofType = "non-Grashof";
            limits.GrashofInfo = "reciprocates";
        }

        return limits;
    };

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var linkagePDFunction = function(t) {
        this.addOption("controlMethod", "lengths");
        this.addOption("reversed", false);
        this.addOption("flipped", false);

        this.addOption("g", 40);
        this.addOption("a", 20);
        this.addOption("b", 30);
        this.addOption("f", 40);

        this.addOption("T1", 30);
        this.addOption("T2", 10);
        this.addOption("T3", 10);
        this.addOption("L", 130);

        this.addOption("PPosition", 0);
        this.addOption("POffset", 0);

        this.addOption("gAngleDeg", 0);

        this.addOption("oscInput", false);
        this.addOption("oscCenter", 50);
        this.addOption("oscMagnitude", 50);

        this.addOption("phaseOffset", 0.1);

        this.addOption("traceC", false);
        this.addOption("traceD", false);
        this.addOption("traceP", false);

        this.addOption("showLabels", true);
        this.addOption("showPivots", true);
        this.addOption("showInputRange", false);
        this.addOption("showCoupler", true);

        this.addOption("zoom", 100);
        var zoom = this.getOption("zoom");
        
	this.setUnits(130, 130 / this.goldenRatio);
        this.scale($V([zoom / 100, zoom / 100]));

        this.addOption("xTranslate", 0);
        this.addOption("yTranslate", 0);
        this.translate($V([this.getOption("xTranslate"), this.getOption("yTranslate")]));

        var a = this.getOption("a");
        var b = this.getOption("b");
        var g = this.getOption("g");
        var f = this.getOption("f");

        var PPosition = this.getOption("PPosition");
        var POffset = this.getOption("POffset");

        var gAngle = this.degToRad(this.getOption("gAngleDeg"));

        var limits = limitsFourBar(this, g, f, a, b);

        this.addOption("inputType", limits.inputType);
        this.addOption("outputType", limits.outputType);
        this.addOption("ValidityIndex", limits.ValidityIndex);
        this.addOption("ValidityRelation", limits.ValidityRelation);
        this.addOption("GrashofIndex", limits.GrashofIndex);
        this.addOption("Grashof", limits.Grashof);
        this.addOption("GrashofType", limits.GrashofType);
        this.addOption("GrashofRelation", limits.GrashofRelation);
        this.addOption("GrashofInfo", limits.GrashofInfo);
        this.addOption("limitedRange", limits.limited);

        if (!limits.valid) {
            this.text($V([0, 0]), $V([0, 0]), "TEX:impossible geometry");
            return;
        }

        var oscInput = this.getOption("oscInput");
        var oscCenter = this.getOption("oscCenter");
        var oscMagnitude = this.getOption("oscMagnitude");

        var alphaLimited, alphaMin, alphaMax, alphaCent;

        var phase, alpha;
        var flipped = false;
        if (limits.limited) {
            var r, c;
            if (oscInput) {
                c = oscCenter / 100;
                r = Math.min(c, 1 - c) * oscMagnitude / 100;
            } else {
                c = 0.5;
                r = 0.5;
            }
            alphaLimited = true;
            alphaMin = this.linearInterp(limits.alphaMin, limits.alphaMax, c - r);
            alphaMax = this.linearInterp(limits.alphaMin, limits.alphaMax, c + r);
            alphaCent = this.linearInterp(limits.alphaMin, limits.alphaMax, c);

            var alphaRange = alphaMax - alphaMin;
            phase = (alphaRange > 0) ? (t / Math.max(alphaRange, 0.3) - this.getOption("phaseOffset")) : 0;
            var w = c + r * Math.sin(phase * Math.PI);
            alpha = this.linearInterp(limits.alphaMin, limits.alphaMax, w);
            if (limits.canFlip) {
                if (oscInput) {
                    if (limits.flipPeriod == 2) {
                        if (oscMagnitude == 100) {
                            if (oscCenter > 50) {
                                flipped = (Math.cos((phase + 0.5) * Math.PI / 2) < 0);
                            } else if (oscCenter == 50) {
                                flipped = (Math.cos(phase * Math.PI) < 0);
                            } else { // oscCenter < 50
                                flipped = (Math.cos((phase - 0.5) * Math.PI / 2) < 0);
                            }
                        }
                    } else if (limits.flipPeriod == 1) {
                        if (oscMagnitude == 100) {
                            if (oscCenter > 50) {
                                if (Math.cos((phase / 4 + 1/8) * 2 * Math.PI) < 0) {
                                    flipped = (w > 0.5);
                                } else {
                                    flipped = (w < 0.5);
                                }
                            } else if (oscCenter == 50) {
                                flipped = (Math.cos((phase / limits.flipPeriod + limits.flipPhase / 4) * 2 * Math.PI) < 0);
                            } else { // oscCenter < 50
                                if (Math.cos((phase / 4 - 1/8) * 2 * Math.PI) < 0) {
                                    flipped = (w < 0.5);
                                } else {
                                    flipped = (w > 0.5);
                                }
                            }
                        } else { // oscMagnitude < 100
                            if (c + r > 0.5 && c - r < 0.5) {
                                flipped = (w > 0.5);
                            }
                        }
                    }
                } else {
                    flipped = (Math.cos((phase / limits.flipPeriod + limits.flipPhase / 4) * 2 * Math.PI) < 0);
                }
            }
        } else {
            if (oscInput) {
                var c = oscCenter / 100;
                var r = 0.5 * oscMagnitude / 100;
                var alphaRange = r * 4 * Math.PI;
                var oscPhase = (alphaRange > 0) ? (t / Math.max(alphaRange, 0.3) - this.getOption("phaseOffset")) : 0;
                var w = c + r * Math.sin(oscPhase * Math.PI);
                alpha = w * 2 * Math.PI;
                alphaLimited = true;
                alphaMin = (c - r) * 2 * Math.PI;
                alphaMax = (c + r) * 2 * Math.PI;
                alphaCent = c * 2 * Math.PI;
                if (limits.canFlip) {
                    phase = alpha / (2 * Math.PI);
                    flipped = (Math.sin((phase / limits.flipPeriod + limits.flipPhase / 4) * 2 * Math.PI) < 0);
                }
            } else {
                alpha = t + Math.PI/2 + 0.1 - this.getOption("phaseOffset");
                alphaLimited = false;
                if (limits.canFlip) {
                    phase = alpha / (2 * Math.PI);
                    flipped = (Math.sin((phase / limits.flipPeriod + limits.flipPhase / 4) * 2 * Math.PI) < 0);
                }
            }
        }
        flipped = (this.getOption("flipped") ? !flipped : flipped);
        var angleSign = (this.getOption("reversed") ? -1 : 1);

        var beta = this.solveFourBar(g, f, a, b, alpha, flipped);
        var pA = $V([-g/2, 0]).rotate(gAngle, $V([0, 0]));
        var pB = $V([g/2, 0]).rotate(gAngle, $V([0, 0]));
        var pD = pA.add(this.vector2DAtAngle(angleSign * alpha + gAngle).x(a));
        var pC = pB.add(this.vector2DAtAngle(angleSign * beta + gAngle).x(b));

        var pt = pC.subtract(pD);
        var po = pt.rotate(Math.PI/2, $V([0, 0]));
        var pP = pD.add(pt.x(0.5 + PPosition / 200)).add(po.x(POffset / 100));

        if (this.getOption("showPivots")) {
            var pivotHeight = 3;
            var pivotWidth = 3;
            this.pivot(pA.add($V([0, -pivotHeight])), pA, pivotWidth);
            this.pivot(pB.add($V([0, -pivotHeight])), pB, pivotWidth);
            this.ground(pA.add($V([0, -pivotHeight])), $V([0, 1]), 2 * pivotWidth);
            this.ground(pB.add($V([0, -pivotHeight])), $V([0, 1]), 2 * pivotWidth);
        }

        this.line(pA, pD);
        this.line(pD, pC);
        this.line(pC, pB);
        this.line(pB, pA);
        this.point(pA);
        this.point(pD);
        this.point(pC);
        this.point(pB);

        if (this.getOption("showCoupler")) {
            this.line(pD, pP);
            this.line(pC, pP);
            this.point(pP);
        }

        if (this.getOption("traceC")) {
            var pCHistory = this.history("pC", 0.05, 4 * Math.PI + 0.05, t, pC);
            var pCTrace = this.historyToTrace(pCHistory);
            this.save();
            this.setProp("shapeOutlineColor", "rgb(0, 0, 255)");
            this.polyLine(pCTrace);
            this.restore();
        } else {
            this.clearHistory("pC");
        }

        if (this.getOption("traceD")) {
            var pDHistory = this.history("pD", 0.05, 4 * Math.PI + 0.05, t, pD);
            var pDTrace = this.historyToTrace(pDHistory);
            this.save();
            this.setProp("shapeOutlineColor", "rgb(0, 255, 0)");
            this.polyLine(pDTrace);
            this.restore();
        } else {
            this.clearHistory("pD");
        }

        if (this.getOption("traceP")) {
            var pPHistory = this.history("pP", 0.05, 4 * Math.PI + 0.05, t, pP);
            var pPTrace = this.historyToTrace(pPHistory);
            this.save();
            this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
            this.polyLine(pPTrace);
            this.restore();
        } else {
            this.clearHistory("pP");
        }

        if (this.getOption("showLabels")) {
            var anchor, otherPoints;
            if (this.getOption("showPivots")) {
                this.text(pA, $V([2, 0]), "TEX:$A$");
                this.text(pB, $V([0.9, -1.5]), "TEX:$B$");
            } else {
                anchor = this.findAnchorForIntersection(pA, [pD, pB]);
                this.text(pA, anchor, "TEX:$A$");
                anchor = this.findAnchorForIntersection(pB, [pA, pC, pB.add(this.vector2DAtAngle(gAngle))]);
                this.text(pB, anchor, "TEX:$B$");
            }
            otherPoints = [pB, pD];
            if (this.getOption("showCoupler")) {
                otherPoints.push(pP);
            }
            anchor = this.findAnchorForIntersection(pC, otherPoints);
            this.text(pC, anchor, "TEX:$C$");
            otherPoints = [pC, pA];
            if (this.getOption("showCoupler")) {
                otherPoints.push(pP);
            }
            anchor = this.findAnchorForIntersection(pD, otherPoints);
            this.text(pD, anchor, "TEX:$D$");
            if (this.getOption("showCoupler")) {
                anchor = this.findAnchorForIntersection(pP, [pD, pC]);
                this.text(pP, anchor, "TEX:$P$");
            }
            this.labelLine(pA, pD, $V([0, 1]), "TEX:$a$");
            this.labelLine(pD, pC, $V([0, 1]), "TEX:$f$");
            this.labelLine(pC, pB, $V([0, 1]), "TEX:$b$");
            this.labelLine(pB, pA, $V([0, 1]), "TEX:$g$");

            var alphaR = Math.min(10, Math.min(g, a) * 0.7);
            var alphaShow = angleSign * this.fixedMod(alpha, 2 * Math.PI);
            this.circleArrow(pA, alphaR, gAngle, alphaShow + gAngle, undefined, true);
            this.labelCircleLine(pA, alphaR, gAngle, alphaShow + gAngle, $V([0, 1]), "TEX:$\\alpha$");

            var betaR = Math.min(10, Math.min(g, b) * 0.7);
            var betaShow = angleSign * this.fixedMod(beta, 2 * Math.PI);
            this.save();
            this.setProp("shapeStrokePattern", "dashed");
            this.line(pB, pB.add(this.vector2DAtAngle(gAngle).x(betaR * 1.4)));
            this.restore();
            this.circleArrow(pB, betaR, gAngle, betaShow + gAngle, undefined, true);
            this.labelCircleLine(pB, betaR, gAngle, betaShow + gAngle, $V([0, 1]), "TEX:$\\beta$");
        }

        if (this.getOption("showInputRange")) {
            var alphaR = Math.min(10, Math.min(g, a)) * 1.5;
            if (alphaLimited) {
                var alphaMinShow = gAngle + angleSign * alphaMin;
                var alphaMaxShow = gAngle + angleSign * alphaMax;
                var alphaCentShow = gAngle + angleSign * alphaCent;
                if (limits.limited) {
                    var limitAlphaMinShow = gAngle + angleSign * limits.alphaMin;
                    var limitAlphaMaxShow = gAngle + angleSign * limits.alphaMax;
                }
                this.save();
                this.setProp("arrowLinePattern", "dashed");
                this.setProp("shapeStrokePattern", "dashed");
                var anchorMin = this.vector2DAtAngle(alphaMinShow);
                var anchorMax = this.vector2DAtAngle(alphaMaxShow);
                var anchorCent = this.vector2DAtAngle(alphaCentShow);
                var anchorLimitMin, anchorLimitMax;
                if (limits.limited) {
                    anchorLimitMin = this.vector2DAtAngle(limitAlphaMinShow);
                    anchorLimitMax = this.vector2DAtAngle(limitAlphaMaxShow);
                }
                var innerScale = 1.2;
                var outerScale = 1.4;
                this.line(pA, pA.add(anchorMin.x(alphaR * innerScale)));
                this.line(pA, pA.add(anchorMax.x(alphaR * innerScale)));
                this.line(pA, pA.add(anchorCent.x(alphaR * innerScale)));
                if (limits.limited) {
                    this.line(pA, pA.add(anchorLimitMin.x(alphaR * outerScale)));
                    this.line(pA, pA.add(anchorLimitMax.x(alphaR * outerScale)));
                }
                anchorMin = anchorMin.x(-1 / this.supNorm(anchorMin));
                anchorMax = anchorMax.x(-1 / this.supNorm(anchorMax));
                anchorCent = anchorCent.x(-1 / this.supNorm(anchorCent));
                if (limits.limited) {
                    anchorLimitMin = anchorLimitMin.x(-1 / this.supNorm(anchorLimitMin));
                    anchorLimitMax = anchorLimitMax.x(-1 / this.supNorm(anchorLimitMax));
                }
                this.circleArrow(pA, alphaR, alphaCentShow, alphaMinShow, undefined, true);
                this.circleArrow(pA, alphaR, alphaCentShow, alphaMaxShow, undefined, true);
                this.restore();
                if (this.getOption("showLabels")) {
                    this.text(pA.add(this.vector2DAtAngle(alphaCentShow).x(alphaR * innerScale)), anchorCent, "TEX:$\\alpha_{\\rm cent}$");
                    this.labelCircleLine(pA, alphaR, alphaCentShow, alphaMinShow, $V([0, 1]), "TEX:$\\Delta\\alpha$");
                    this.labelCircleLine(pA, alphaR, alphaCentShow, alphaMaxShow, $V([0, 1]), "TEX:$\\Delta\\alpha$");
                    if (limits.limited) {
                        this.text(pA.add(this.vector2DAtAngle(limitAlphaMinShow).x(alphaR * outerScale)), anchorLimitMin, "TEX:$\\alpha_{\\rm min}$");
                        this.text(pA.add(this.vector2DAtAngle(limitAlphaMaxShow).x(alphaR * outerScale)), anchorLimitMax, "TEX:$\\alpha_{\\rm max}$");
                    }
                }
            } else {
                this.save();
                this.setProp("arrowLinePattern", "dashed");
                this.setProp("shapeStrokePattern", "dashed");
                this.circleArrow(pA, alphaR, gAngle, 2 * Math.PI + gAngle, undefined, true);
                if (this.getOption("showLabels")) {
                    this.labelCircleLine(pA, alphaR, gAngle, 2 * Math.PI + gAngle, $V([0, 1]), "TEX:$\\Delta\\alpha$");
                }
                this.restore();
            }
        }
    };

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var linkageConvertFromLengths = function(pd, setReset) {
        var a = pd.getOption("a");
        var b = pd.getOption("b");
        var g = pd.getOption("g");
        var f = pd.getOption("f");

        var limits = limitsFourBar(pd, g, f, a, b);
        pd.setOption("inputType", limits.inputType, false, undefined, setReset);
        pd.setOption("outputType", limits.outputType, false, undefined, setReset);
        pd.setOption("ValidityIndex", limits.ValidityIndex, false, undefined, setReset);
        pd.setOption("ValidityRelation", limits.ValidityRelation, false, undefined, setReset);
        pd.setOption("GrashofIndex", limits.GrashofIndex, false, undefined, setReset);
        pd.setOption("Grashof", limits.Grashof, false, undefined, setReset);
        pd.setOption("GrashofType", limits.GrashofType, false, undefined, setReset);
        pd.setOption("GrashofRelation", limits.GrashofRelation, false, undefined, setReset);
        pd.setOption("GrashofInfo", limits.GrashofInfo, false, undefined, setReset);
        pd.setOption("limitedRange", limits.limited, false, undefined, setReset);

        if (pd.getOption("controlMethod") === "lengths") {
            var L = a + b + g + f;
            var T1 = g + f - b - a;
            var T2 = b + g - f - a;
            var T3 = f + b - g - a;

            pd.setOption("L", L, false, undefined, setReset);
            pd.setOption("T1", T1, false, undefined, setReset);
            pd.setOption("T2", T2, false, undefined, setReset);
            pd.setOption("T3", T3, false, undefined, setReset);
        }
    };

    var linkageConvertFromExcesses = function(pd) {
        if (pd.getOption("controlMethod") === "excesses") {
            var L = pd.getOption("L");
            var T1 = pd.getOption("T1");
            var T2 = pd.getOption("T2");
            var T3 = pd.getOption("T3");

            var a = (L - T1 - T2 - T3) / 4;
            var b = (L - T1 + T2 + T3) / 4;
            var g = (L + T1 + T2 - T3) / 4;
            var f = (L + T1 - T2 + T3) / 4;

            pd.setOption("a", a, false);
            pd.setOption("b", b, false);
            pd.setOption("g", g, false);
            pd.setOption("f", f, false);
        }
    };

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var aml_ft_c = new PrairieDrawAnim("aml-ft-c", linkagePDFunction);

    aml_ft_c.addOption("movement", "translate");
    aml_ft_c.setOption("a", 25, undefined, undefined, true);
    aml_ft_c.setOption("b", 35, undefined, undefined, true);
    aml_ft_c.setOption("f", 55, undefined, undefined, true);
    aml_ft_c.setOption("g", 55, undefined, undefined, true);
    linkageConvertFromLengths(aml_ft_c, true);

    aml_ft_c.setOption("yTranslate", -5, undefined, undefined, true);
    aml_ft_c.setOption("showCoupler", false, undefined, undefined, true);

    $(window).on("resize", function(){
        aml_ft_c.redraw();
    });
})
