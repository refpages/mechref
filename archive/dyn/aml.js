
$(document).ready(function() {

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

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
                this.text(pB, $V([-1.5, -1.5]), "TEX:$B$");
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

    aml_ft_c.setOption("a", 25, undefined, undefined, true);
    aml_ft_c.setOption("b", 35, undefined, undefined, true);
    aml_ft_c.setOption("f", 55, undefined, undefined, true);
    aml_ft_c.setOption("g", 55, undefined, undefined, true);
    linkageConvertFromLengths(aml_ft_c, true);

    aml_ft_c.setOption("yTranslate", -5, undefined, undefined, true);
    aml_ft_c.setOption("showCoupler", false, undefined, undefined, true);

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var aml_fr_c = new PrairieDrawAnim("aml-fr-c", linkagePDFunction);

    aml_fr_c.setOption("a", 25, undefined, undefined, true);
    aml_fr_c.setOption("b", 35, undefined, undefined, true);
    aml_fr_c.setOption("f", 55, undefined, undefined, true);
    aml_fr_c.setOption("g", 55, undefined, undefined, true);
    linkageConvertFromLengths(aml_fr_c, true);

    aml_fr_c.setOption("yTranslate", -5, undefined, undefined, true);
    aml_fr_c.setOption("showCoupler", false, undefined, undefined, true);

    aml_fr_c.registerOptionCallback("a", function(value) {linkageConvertFromLengths(this);});
    aml_fr_c.registerOptionCallback("b", function(value) {linkageConvertFromLengths(this);});

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var aml_fc_c = new PrairieDrawAnim("aml-fc-c", linkagePDFunction);

    aml_fc_c.setOption("a", 25, undefined, undefined, true);
    aml_fc_c.setOption("b", 25, undefined, undefined, true);
    aml_fc_c.setOption("f", 20, undefined, undefined, true);
    aml_fc_c.setOption("g", 50, undefined, undefined, true);
    linkageConvertFromLengths(aml_fc_c, true);

    aml_fc_c.setOption("traceC", true, undefined, undefined, true);
    aml_fc_c.setOption("traceD", true, undefined, undefined, true);
    aml_fc_c.setOption("traceP", true, undefined, undefined, true);

    aml_fc_c.setOption("phaseOffset", -0.2, undefined, undefined, true);

    aml_fc_c.setOption("POffset", 60, undefined, undefined, true);

    aml_fc_c.registerOptionCallback("PPosition", function(value) {this.clearAllHistory();});
    aml_fc_c.registerOptionCallback("POffset", function(value) {this.clearAllHistory();});

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var aml_fi_c = new PrairieDrawAnim("aml-fi-c", linkagePDFunction);

    aml_fi_c.setOption("a", 40, undefined, undefined, true);
    aml_fi_c.setOption("b", 40, undefined, undefined, true);
    aml_fi_c.setOption("f", 20, undefined, undefined, true);
    aml_fi_c.setOption("g", 20, undefined, undefined, true);
    linkageConvertFromLengths(aml_fi_c, true);

    aml_fi_c.setOption("xTranslate", -30, undefined, undefined, true);
    aml_fi_c.setOption("gAngleDeg", -90, undefined, undefined, true);
    aml_fi_c.setOption("oscInput", true, undefined, undefined, true);
    aml_fi_c.setOption("showInputRange", true, undefined, undefined, true);
    aml_fi_c.setOption("PPosition", 100, undefined, undefined, true);
    aml_fi_c.setOption("POffset", 150, undefined, undefined, true);

    aml_fi_c.setOption("oscCenter", 25, undefined, undefined, true);
    aml_fi_c.setOption("oscMagnitude", 20, undefined, undefined, true);

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var aml_fl_c = new PrairieDrawAnim("aml-fl-c", linkagePDFunction);

    aml_fl_c.registerOptionCallback("controlMethod", function(value) {
        if (value === "lengths") {
            // controlling the lenths directly
            var a = Math.min(Math.max(aml_fl_c.getOption("a"), 5), 40);
            var b = Math.min(Math.max(aml_fl_c.getOption("b"), 5), 40);
            var g = Math.min(Math.max(aml_fl_c.getOption("g"), 5), 40);
            var f = Math.min(Math.max(aml_fl_c.getOption("f"), 5), 40);
            aml_fl_c.setOption("a", a);
            aml_fl_c.setOption("b", b);
            aml_fl_c.setOption("g", g);
            aml_fl_c.setOption("f", f);
            $("input.lengthInput").css("visibility", "visible");
            $("input.excessInput").css("visibility", "hidden");
        } else if (value === "excesses") {
            // controlling the excess T_i inputs
            var L = Math.min(Math.max(aml_fl_c.getOption("L"), 10), 200);
            var T1 = Math.min(Math.max(aml_fl_c.getOption("T1"), -40), 40);
            var T2 = Math.min(Math.max(aml_fl_c.getOption("T2"), -40), 40);
            var T3 = Math.min(Math.max(aml_fl_c.getOption("T3"), -40), 40);
            aml_fl_c.setOption("L", L);
            aml_fl_c.setOption("T1", T1);
            aml_fl_c.setOption("T2", T2);
            aml_fl_c.setOption("T3", T3);
            $("input.lengthInput").css("visibility", "hidden");
            $("input.excessInput").css("visibility", "visible");
        } else {
            throw new Error("unknown controlMethod: " + value);
        }
    });

    aml_fl_c.registerOptionCallback("oscInput", function(value) {
        if (value) {
            $(".oscInput").css("visibility", "visible");
        } else {
            $(".oscInput").css("visibility", "hidden");
        }
    });

    aml_fl_c.registerOptionCallback("limitedRange", function(value) {
        if (value) {
            $(".limitedDesc").show();
            $(".unlimitedDesc").hide();
        } else {
            $(".limitedDesc").hide();
            $(".unlimitedDesc").show();
        }
    });

    aml_fl_c.registerOptionCallback("a", function(value) {linkageConvertFromLengths(this);});
    aml_fl_c.registerOptionCallback("b", function(value) {linkageConvertFromLengths(this);});
    aml_fl_c.registerOptionCallback("g", function(value) {linkageConvertFromLengths(this);});
    aml_fl_c.registerOptionCallback("f", function(value) {linkageConvertFromLengths(this);});

    aml_fl_c.registerOptionCallback("T1", function(value) {linkageConvertFromExcesses(this);});
    aml_fl_c.registerOptionCallback("T2", function(value) {linkageConvertFromExcesses(this);});
    aml_fl_c.registerOptionCallback("T3", function(value) {linkageConvertFromExcesses(this);});
    aml_fl_c.registerOptionCallback("L", function(value) {linkageConvertFromExcesses(this);});

    aml_fl_c.registerOptionCallback("reversed", function(value) {this.clearAllHistory();});
    aml_fl_c.registerOptionCallback("flipped", function(value) {this.clearAllHistory();});
    aml_fl_c.registerOptionCallback("g", function(value) {this.clearAllHistory();});
    aml_fl_c.registerOptionCallback("a", function(value) {this.clearAllHistory();});
    aml_fl_c.registerOptionCallback("b", function(value) {this.clearAllHistory();});
    aml_fl_c.registerOptionCallback("f", function(value) {this.clearAllHistory();});
    aml_fl_c.registerOptionCallback("PPosition", function(value) {this.clearAllHistory();});
    aml_fl_c.registerOptionCallback("POffset", function(value) {this.clearAllHistory();});
    aml_fl_c.registerOptionCallback("gAngleDeg", function(value) {this.clearAllHistory();});

    aml_fl_c.registerOptionCallback("oscInput", function(value) {this.clearAllHistory();});
    aml_fl_c.registerOptionCallback("oscCenter", function(value) {this.clearAllHistory();});
    aml_fl_c.registerOptionCallback("oscMagnitude", function(value) {this.clearAllHistory();});

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var drawLinkage = function(pd, t, pivots, links, flipped, alphaMax, pivotPosFcn, symmetricOsc) {
        var pivotA = pivots[0];
        var pivotB = pivots[1];
        var pivotC = pivots[2];
        var pivotD = pivots[3];

        var alphaMin = pd.angleFrom(pivotB.subtract(pivotA), pivotD.subtract(pivotA));
        var alpha;

        if (alphaMax === undefined) {
            alpha = alphaMin + t;
        } else {
            if (symmetricOsc !== undefined && symmetricOsc === true) {
                var v = (1 + Math.sin(t)) / 2;
                alpha = pd.linearInterp(2 * alphaMin - alphaMax, alphaMax, v);
            } else {
                var v = (1 - Math.cos(t)) / 2;            
                alpha = pd.linearInterp(alphaMin, alphaMax, v);
            }
        }
        
        var a = pivotD.subtract(pivotA).modulus();
        var b = pivotC.subtract(pivotB).modulus();
        var g = pivotB.subtract(pivotA).modulus();
        var f = pivotC.subtract(pivotD).modulus();
        var beta = pd.solveFourBar(g, f, a, b, alpha, flipped);
        var newPivotA, newPivotB;
        if (pivotPosFcn === undefined) {
            newPivotA = pivotA;
            newPivotB = pivotB;
        } else {
            var newBasePos = pivotPosFcn(pivotA, pivotB, t, alpha, alphaMin, alphaMax, beta);
            newPivotA = newBasePos[0];
            newPivotB = newBasePos[1];
        }
        var unitAB = newPivotB.subtract(newPivotA).toUnitVector();
        var newPivotC = newPivotB.add(unitAB.rotate(beta, $V([0, 0])).x(b));
        var newPivotD = newPivotA.add(unitAB.rotate(alpha, $V([0, 0])).x(a));
        var newPivots = [newPivotA, newPivotB, newPivotC, newPivotD];
        
        // fade out the image
        pd.save();
        pd.setProp("shapeInsideColor", "rgba(0, 0, 0, 0.5)");
        pd.rectangle(700, 600);
        pd.restore();
        
        pd.save();
        var i, j, base, trans, u, v, coupler, history;
        for (i = 0; i < links.length; i++) {
            link = links[i];
            // shapes
            pd.save();
            pd.transformByPoints(pivots[link.startPivot], pivots[link.endPivot],
                                   newPivots[link.startPivot], newPivots[link.endPivot]);
            pd.setProp("shapeOutlineColor", link.outlineColor);
            pd.setProp("shapeInsideColor", link.insideColor);
            pd.polyLine(link.outlineData, true, true);
            pd.restore();

            if (link.forces !== undefined
                && pd.getOption("showForces")
                && link.forcesActive(t)) {
                trans = pd.identityTransform();
                trans = pd.transformByPointsTransform(trans,
                                                      pivots[link.startPivot], pivots[link.endPivot],
                                                      newPivots[link.startPivot], newPivots[link.endPivot]);
                pd.setProp("shapeOutlineColor", link.outlineColor);
                for (j = 0; j < link.forces.length; j++) {
                    base = pd.transformPos(trans, link.forces[j][0]);
                    pd.arrow(base, base.add(link.forces[j][1]));
                }
            }
        }
        for (i = 0; i < links.length; i++) {
            link = links[i];
            // linkage rods
            pd.save();
            pd.transformByPoints(pivots[link.startPivot], pivots[link.endPivot],
                                   newPivots[link.startPivot], newPivots[link.endPivot]);
            pd.setProp("shapeOutlineColor", "rgb(0, 0, 0)");
            pd.setProp("shapeStrokeWidthPx", 6);
            pd.line(pivots[link.startPivot], pivots[link.endPivot]);
            pd.setProp("shapeOutlineColor", link.outlineColor);
            pd.setProp("shapeStrokeWidthPx", 2);
            pd.line(pivots[link.startPivot], pivots[link.endPivot]);
            pd.restore();
        }
        for (i = 0; i < links.length; i++) {
            link = links[i];
            // link labels
            if (link.label !== undefined) {
                trans = pd.identityTransform();
                trans = pd.transformByPointsTransform(trans,
                                                      pivots[link.startPivot], pivots[link.endPivot],
                                                      newPivots[link.startPivot], newPivots[link.endPivot]);
                pd.text(pd.transformPos(trans, link.labelPos), link.labelAnchor, link.label, true);
            }
            // coupler
            if (link.couplerPosition !== undefined) {
                u = newPivots[link.endPivot].subtract(newPivots[link.startPivot]);
                v = u.rotate(Math.PI / 2, $V([0, 0]));
                coupler = newPivots[link.startPivot].add(u.x((link.couplerPosition + 1) / 2)).add(v.x(link.couplerOffset));
                pd.save();
                pd.setProp("shapeOutlineColor", link.outlineColor);
                pd.setProp("pointRadiusPx", 5);
                pd.setProp("shapeStrokeWidthPx", 3);
                pd.point(coupler);
                if (link.couplerLabel !== undefined) {
                    pd.text(coupler, link.couplerAnchor, link.couplerLabel, true);
                }
                if (link.couplerHistory !== undefined && link.couplerHistory === true) {
                    history = pd.history("coupler" + i, 0.05, Math.PI * 4 + 0.05, t, coupler);
                    pd.polyLine(pd.historyToTrace(history));
                }
                pd.restore();
            }
        }
        
        pd.setProp("shapeOutlineColor", "rgb(0, 0, 0)");
        pd.setProp("pointRadiusPx", 5);
        for (i = 0; i < pivots.length; i++) {
            // linkage pivots
            pd.point(newPivots[i]);
        }
        
        pd.restore();
    };

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var pumpLinkAB = [
        $V([-79, 65]), $V([-81, 74]), $V([-82, 84]), $V([-88, 87]),
        $V([-98, 82]), $V([-98, 72]), $V([-142, -120]), $V([-142, -142]),
        $V([234, -143]), $V([236, -127]), $V([228, -127]), $V([228, -94]),
        $V([64, -23]), $V([-5, -24]), $V([6, -72]), $V([5, -122]),
        $V([-9, -122])
    ];

    var pumpLinkBC = [
        $V([38, 64]), $V([-132, 136]), $V([-124, 149]), $V([-141, 160]),
        $V([-153, 156]), $V([-168, 142]), $V([-180, 124]), $V([-187, 108]),
        $V([-189, 92]), $V([-190, 70]), $V([-182, 68]), $V([-152, 110]),
        $V([-98, 89]), $V([-96, 75]), $V([-89, 70]), $V([-75, 78]),
        $V([9, 43]), $V([10, 30]), $V([14, 24]), $V([22, 24]),
        $V([27, 36])
    ];

    var pumpLinkCD = [
        $V([34, -100]), $V([39, -90]), $V([35, -84]), $V([27, -23]),
        $V([28, -14]), $V([26, 6]), $V([29, 6]), $V([25, 24]),
        $V([22, 28]), $V([22, 36]), $V([11, 35]), $V([13, 21]),
        $V([9, 21]), $V([12, 6]), $V([15, 6]), $V([17, -16]),
        $V([21, -25]), $V([27, -84]), $V([23, -92])
    ];

    var pumpPivotA = $V([25, -47]);
    var pumpPivotB = $V([-88, 76]);
    var pumpPivotC = $V([17, 30]);
    var pumpPivotD = $V([32, -92]);
    
    var pumpLinkDA = [
        $V([-4, 11]),
        $V([-10, 5]),   // A
        $V([-10, -30]), // B
        $V([-38, -30]), // C
        $V([-38, -40]),     
        $V([-28, -53]), // D
        $V([-10, -53]), // E
        $V([-10, -90]),  // F
        $V([10, -90]),  // F
        $V([10, -53]),  // E
        $V([28, -53]),  // D
        $V([38, -40]),      
        $V([38, -30]),  // C
        $V([10, -30]),  // B
        $V([10, 5]),     // A
        $V([4, 11]),
    ];

    for (var i = 0; i < pumpLinkDA.length; i++) {
        pumpLinkDA[i] = pumpLinkDA[i].rotate(0.17, $V([0, 0])).add(pumpPivotA);
    }

    var pumpPivots = [pumpPivotA, pumpPivotB, pumpPivotC, pumpPivotD];
    var pumpLinks = [
        {outlineData: pumpLinkAB,
         startPivot: 0,
         endPivot: 1,
         outlineColor: "rgb(0, 255, 255)",
         insideColor: "rgba(0, 255, 255, 0.3)"
        },
        {outlineData: pumpLinkBC,
         startPivot: 1,
         endPivot: 2,
         outlineColor: "rgb(255, 0, 255)",
         insideColor: "rgba(255, 0, 255, 0.3)"
        },
        {outlineData: pumpLinkCD,
         startPivot: 2,
         endPivot: 3,
         outlineColor: "rgb(0, 255, 0)",
         insideColor: "rgba(0, 255, 0, 0.3)"
        },
        {outlineData: pumpLinkDA,
         startPivot: 3,
         endPivot: 0,
         outlineColor: "rgb(255, 0, 0)",
         insideColor: "rgba(255, 0, 0, 0.3)"
        }
    ];

    var aml_fp_c = new PrairieDrawAnim("aml-fp-c", function(t) {
        this.addOption("showLinkage", false);

	this.setUnits(600, 431);
        this.drawImage("aml_7632673158_small.jpg", $V([0, 0]), $V([0, 0]));

        if (this.getOption("showLinkage")) {
            drawLinkage(this, t, pumpPivots, pumpLinks, true);
        }
    });

    $('button[class~="reset-time:aml-fp-c"]').click(function() {
        aml_fp_c.stopAnim();
        aml_fp_c.resetTime();
    });

    aml_fp_c.registerOptionCallback("showLinkage", function(value) {
        if (value) {
            this.stopAnim();
            this.resetTime();
            $('button[class~="anim-toggle:aml-fp-c"]').css("visibility", "visible");
            $('button[class~="reset-time:aml-fp-c"]').css("visibility", "visible");
        } else {
            this.stopAnim();
            this.resetTime(false);
            $('button[class~="anim-toggle:aml-fp-c"]').css("visibility", "hidden");
            $('button[class~="reset-time:aml-fp-c"]').css("visibility", "hidden");
        }
    });

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var bikeLinkAB = [
        $V([30, -137]), $V([29, -143]), $V([35, -149]), $V([40, -144]),
        $V([57, -141]), $V([117, -134]), $V([142, -130]), $V([145, -123]),
        $V([64, -48]), $V([70, -28]), $V([89, -27]), $V([96, -23]),
        $V([100, -20]), $V([107, -13]), $V([111, -2]), $V([112, 13]),
        $V([109, 18]), $V([109, 28]), $V([80, 31]), $V([64, 30]),
        $V([47, 23]), $V([47, 18]), $V([43, 15]), $V([43, 8]),
        $V([48, -6]), $V([55, -13]), $V([62, -24]), $V([33, -129])
    ];

    var bikeLinkBC= [
        $V([15, -49]), $V([69, -25]), $V([75, -25]), $V([83, -18]),
        $V([89, -8]), $V([90, 3]), $V([82, 12]), $V([78, 14]),
        $V([68, 18]), $V([58, 17]), $V([45, 12]), $V([24, 1]),
        $V([0, -12]), $V([-8, -17]), $V([-14, -22]), $V([-17, -26]),
        $V([-17, -35]), $V([-15, -40]), $V([-9, -45]), $V([4, -49])
    ];

    var bikeLinkCD = [
        $V([14, -50]), $V([11, -40]), $V([4, -32]), $V([-2, -27]),
        $V([-9, -24]), $V([-14, -24]), $V([-18, -26]), $V([-21, -30]),
        $V([-21, -42]), $V([-19, -112]), $V([-2, -118]), $V([-9, -125]),
        $V([-16, -125]), $V([-21, -134]), $V([-30, -137]), $V([-38, -138]),
        $V([-40, -144]), $V([-28, -150]), $V([-11, -148]), $V([-1, -148]),
        $V([10, -148]), $V([23, -149]), $V([22, -131]), $V([19, -130]),
        $V([17, -118]), $V([19, -116]), $V([17, -99]), $V([16, -79])
    ];

    var bikeLinkDA = [
        $V([35, -136]), $V([-4, -145]), $V([-7, -151]), $V([35, -146]),
        $V([39, -144]), $V([38, -139])
    ];

    var bikePivotA = $V([33, -142]);
    var bikePivotB = $V([74, 1]);
    var bikePivotC = $V([-3, -40]);
    var bikePivotD = $V([-3, -149]);

    var bikePivots = [bikePivotA, bikePivotB, bikePivotC, bikePivotD];
    var bikeLinks = [
        {outlineData: bikeLinkAB,
         startPivot: 0,
         endPivot: 1,
         outlineColor: "rgb(0, 255, 255)",
         insideColor: "rgba(0, 255, 255, 0.3)"
        },
        {outlineData: bikeLinkBC,
         startPivot: 1,
         endPivot: 2,
         outlineColor: "rgb(255, 0, 255)",
         insideColor: "rgba(255, 0, 255, 0.3)"
        },
        {outlineData: bikeLinkCD,
         startPivot: 2,
         endPivot: 3,
         outlineColor: "rgb(0, 255, 0)",
         insideColor: "rgba(0, 255, 0, 0.3)"
        },
        {outlineData: bikeLinkDA,
         startPivot: 3,
         endPivot: 0,
         outlineColor: "rgb(255, 0, 0)",
         insideColor: "rgba(255, 0, 0, 0.3)"
        }
    ];

    var aml_fb_c = new PrairieDrawAnim("aml-fb-c", function(t) {
        this.addOption("showLinkage", false);

	this.setUnits(600, 400);
        this.drawImage("aml_7705967112_small.jpg", $V([0, 0]), $V([0, 0]));

        if (this.getOption("showLinkage")) {
            drawLinkage(this, t, bikePivots, bikeLinks, false);
        }
    });

    $('button[class~="reset-time:aml-fb-c"]').click(function() {
        aml_fb_c.stopAnim();
        aml_fb_c.resetTime();
    });

    aml_fb_c.registerOptionCallback("showLinkage", function(value) {
        if (value) {
            this.stopAnim();
            this.resetTime();
            $('button[class~="anim-toggle:aml-fb-c"]').css("visibility", "visible");
            $('button[class~="reset-time:aml-fb-c"]').css("visibility", "visible");
        } else {
            this.stopAnim();
            this.resetTime(false);
            $('button[class~="anim-toggle:aml-fb-c"]').css("visibility", "hidden");
            $('button[class~="reset-time:aml-fb-c"]').css("visibility", "hidden");
        }
    });

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var kneeLinkCD = [
        $V([-75, 760]), $V([-101, 296]), $V([-114, 64]), $V([-118, 55]),
        $V([-99, 7]), $V([-70, -20]), $V([-37, -34]), $V([-5, -26]),
        $V([1, -25]), $V([32, 0]), $V([53, 28]), $V([54, 46]),
        $V([63, 61]), $V([58, 91]), $V([45, 106]), $V([27, 160]),
        $V([19, 220]), $V([10, 296]), $V([-44, 752])
    ];

    var kneeLinkAB = [
        $V([24, -530]), $V([72, -302]), $V([84, -245]), $V([98, -203]),
        $V([117, -174]), $V([129, -160]), $V([136, -146]), $V([128, -129]),
        $V([107, -113]), $V([86, -97]), $V([82, -76]), $V([49, -74]),
        $V([29, -79]), $V([13, -83]), $V([-40, -82]), $V([-54, -84]),
        $V([-85, -91]), $V([-89, -95]), $V([-97, -182]), $V([-92, -200]),
        $V([-80, -217]), $V([-71, -253]), $V([-65, -280]), $V([-62, -301]),
        $V([-32, -511])
    ];

    var kneeLinkDA = [
        $V([-9, -58]), $V([-32, -79]), $V([-32, -84]), $V([-29, -88]),
        $V([-19, -90]), $V([-8, -90]), $V([4, -90]), $V([13, -86]),
        $V([19, -82]), $V([23, -71]), $V([41, -50]), $V([60, -30]),
        $V([68, -14]), $V([77, 20]), $V([82, 44]), $V([75, 66]),
        $V([65, 71]), $V([61, 66]), $V([55, 57]), $V([55, 42]),
        $V([54, 31]), $V([44, 15]), $V([34, -1]), $V([17, -27])
    ];

    var kneeLinkBC = [
        $V([16, -2]), $V([4, -12]), $V([8, -27]), $V([21, -27]),
        $V([37, -27]), $V([57, -21]), $V([79, -36]), $V([84, -48]),
        $V([88, -93]), $V([93, -105]), $V([100, -116]), $V([112, -124]),
        $V([121, -130]), $V([138, -130]), $V([130, -103]), $V([118, -75]),
        $V([105, -43]), $V([86, -15]), $V([65, -3]), $V([42, -1]),
        $V([28, -1])
    ];

    var kneePivotA = $V([-30, -82]);
    var kneePivotB = $V([110, -80]);
    var kneePivotC = $V([13, -6]);
    var kneePivotD = $V([70, 52]);

    var kneePivots = [kneePivotA, kneePivotB, kneePivotC, kneePivotD];
    var kneeLinks = [
        {outlineData: kneeLinkAB,
         startPivot: 0,
         endPivot: 1,
         outlineColor: "rgb(0, 255, 255)",
         insideColor: "rgba(0, 255, 255, 0.3)",
         label: "TEX:tibia",
         labelPos: $V([0, -200]),
         labelAnchor: $V([0, 0])
        },
        {outlineData: kneeLinkBC,
         startPivot: 1,
         endPivot: 2,
         outlineColor: "rgb(255, 0, 255)",
         insideColor: "rgba(255, 0, 255, 0.3)",
         label: "TEX:PCL",
         labelPos: $V([140, -100]),
         labelAnchor: $V([-1, 0])
        },
        {outlineData: kneeLinkCD,
         startPivot: 2,
         endPivot: 3,
         outlineColor: "rgb(0, 255, 0)",
         insideColor: "rgba(0, 255, 0, 0.3)",
         label: "TEX:femur",
         labelPos: $V([-30, 80]),
         labelAnchor: $V([0, 0])
        },
        {outlineData: kneeLinkDA,
         startPivot: 3,
         endPivot: 0,
         outlineColor: "rgb(255, 0, 0)",
         insideColor: "rgba(255, 0, 0, 0.3)",
         label: "TEX:ACL",
         labelPos: $V([90, 60]),
         labelAnchor: $V([-1, 0])
        }
    ];

    var kneePivotPosFcn = function(pivotA, pivotB, t, alpha, alphaMin, alphaMax, beta) {
        var theta = -1.3 * (alpha - alphaMin);
        var mid = pivotA.add(pivotB).x(0.5);
        var newPivotB = pivotB.rotate(theta, mid);
        var newPivotA = pivotA.rotate(theta, mid);
        return [newPivotA, newPivotB];
    };

    var aml_fk_c = new PrairieDrawAnim("aml-fk-c", function(t) {
        this.addOption("showLinkage", false);

	this.setUnits(600, 596);
        this.drawImage("aml_MRT_ACL_PCL_01_small.jpg", $V([0, 0]), $V([0, 0]));

        if (this.getOption("showLinkage")) {
            drawLinkage(this, t, kneePivots, kneeLinks, true, 0.25, kneePivotPosFcn);
        }
    });

    $('button[class~="reset-time:aml-fk-c"]').click(function() {
        aml_fk_c.stopAnim();
        aml_fk_c.resetTime();
    });

    aml_fk_c.registerOptionCallback("showLinkage", function(value) {
        if (value) {
            this.stopAnim();
            this.resetTime();
            $('button[class~="anim-toggle:aml-fk-c"]').css("visibility", "visible");
            $('button[class~="reset-time:aml-fk-c"]').css("visibility", "visible");
        } else {
            this.stopAnim();
            this.resetTime(false);
            $('button[class~="anim-toggle:aml-fk-c"]').css("visibility", "hidden");
            $('button[class~="reset-time:aml-fk-c"]').css("visibility", "hidden");
        }
    });

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var aml_fs_c = new PrairieDraw("aml-fs-c", function() {
        this.addOption("showPivot", false);

	this.setUnits(250, 155);
        this.drawImage("aml_Blaireau_small.jpg", $V([0, 0]), $V([0, 0]));

        if (this.getOption("showPivot")) {
            this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
            this.setProp("shapeStrokeWidthPx", 5);
            this.arc($V([26, -28]), 7, 0, 2 * Math.PI);
        }
    });

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var wattLinkAB = [
        $V([-219, 119]), $V([-166, 67]), $V([-166, 33]), $V([-161, 26]),
        $V([-151, 24]), $V([-138, 60]), $V([-127, 88]), $V([126, 80]),
        $V([139, 14]), $V([148, 16]), $V([155, -9]), $V([165, -11]),
        $V([170, -5]), $V([171, 67]), $V([200, 119]),
    ];

    var wattPivotA = $V([-160, 35]);
    var wattPivotD = $V([12, 16]);
    var wattPivotC = $V([-9, -19]);
    var wattPivotB = $V([163, 0]);

    var linkFromPivots = function(p1, p2, r) {
        var u = p2.subtract(p1).toUnitVector();
        var v = u.rotate(Math.PI / 2, $V([0, 0]));
        return [p1.add(v.x(r)),
                p1.add(v.x(0.7 * r)).add(u.x(-0.7 * r)),
                p1.add(u.x(-r)),
                p1.add(v.x(-0.7 * r)).add(u.x(-0.7 * r)),
                p1.add(v.x(-r)),
                p2.add(v.x(-r)),
                p2.add(v.x(-0.7 * r)).add(u.x(0.7 * r)),
                p2.add(u.x(r)),
                p2.add(v.x(0.7 * r)).add(u.x(0.7 * r)),
                p2.add(v.x(r))];
    }

    var wattLinkBC = linkFromPivots(wattPivotB, wattPivotC, 5);
    var wattLinkCD = linkFromPivots(wattPivotC, wattPivotD, 10);
    var wattLinkDA = linkFromPivots(wattPivotD, wattPivotA, 5);

    var wattPivots = [wattPivotA, wattPivotB, wattPivotC, wattPivotD];
    var wattLinks = [
        {outlineData: wattLinkAB,
         startPivot: 0,
         endPivot: 1,
         outlineColor: "rgb(0, 255, 255)",
         insideColor: "rgba(0, 255, 255, 0.3)"
        },
        {outlineData: wattLinkBC,
         startPivot: 1,
         endPivot: 2,
         outlineColor: "rgb(255, 0, 255)",
         insideColor: "rgba(255, 0, 255, 0.3)"
        },
        {outlineData: wattLinkCD,
         startPivot: 2,
         endPivot: 3,
         outlineColor: "rgb(0, 255, 0)",
         insideColor: "rgba(0, 255, 0, 0.3)",
         couplerPosition: 0,
         couplerOffset: 0,
         //couplerLabel: "TEX:$P$",
         //couplerAnchor: $V([1, 1]),
         couplerHistory: true
        },
        {outlineData: wattLinkDA,
         startPivot: 3,
         endPivot: 0,
         outlineColor: "rgb(255, 0, 0)",
         insideColor: "rgba(255, 0, 0, 0.3)"
        }
    ];

    var aml_fw_c = new PrairieDrawAnim("aml-fw-c", function(t) {
        this.addOption("showLinkage", false);

	this.setUnits(600, 288);
        this.drawImage("aml_GSFRRearViewUnderCropped_small.jpg", $V([0, 0]), $V([0, 0]));

        if (this.getOption("showLinkage")) {
            drawLinkage(this, t, wattPivots, wattLinks, true, 0.15, undefined, true);
        }
    });

    $('button[class~="reset-time:aml-fw-c"]').click(function() {
        aml_fw_c.stopAnim();
        aml_fw_c.clearAllHistory();
        aml_fw_c.resetTime();
    });

    aml_fw_c.registerOptionCallback("showLinkage", function(value) {
        if (value) {
            this.stopAnim();
            this.clearAllHistory();
            this.resetTime();
            $('button[class~="anim-toggle:aml-fw-c"]').css("visibility", "visible");
            $('button[class~="reset-time:aml-fw-c"]').css("visibility", "visible");
        } else {
            this.stopAnim();
            this.resetTime(false);
            $('button[class~="anim-toggle:aml-fw-c"]').css("visibility", "hidden");
            $('button[class~="reset-time:aml-fw-c"]').css("visibility", "hidden");
        }
    });

    //FIXME remove: aml_fw_c.activateMouseSampling();

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var aml_fg_c = new PrairieDrawAnim("aml-fg-c", function(t) {
	this.setUnits(12, 12);

        //          F
        // A  B  C     E
        //          D

        var BAE = 0.5 * Math.sin(t);
        var AB = 2;
        var CD = 3;

        var AC = 2 * AB * Math.cos(BAE);
        var AE_0 = 2 * AB + Math.sqrt(2) * CD;
        var AE = AE_0 / Math.cos(BAE);
        var CE = AE - AC;
        var DF = Math.sqrt(4 * CD * CD - CE * CE);
        var u = $V([1, 0]).rotate(BAE, $V([0, 0]));
        var v = u.rotate(Math.PI / 2, $V([0, 0]));

        var A = $V([-4, 0]);
        var B = A.add($V([AB, 0]));
        var C = A.add(u.x(AC));
        var E = C.add(u.x(CE));
        var D = C.add(u.x(CE / 2)).add(v.x(-DF / 2));
        var F = C.add(u.x(CE / 2)).add(v.x(DF / 2));

        //this.line(A.add($V([AE_0, -5])), A.add($V([AE_0, 5])));

        var pivotH = 0.6;
        var pivotW = 0.6;
        this.pivot(A.subtract($V([0, pivotH])), A, pivotW);
        this.pivot(B.subtract($V([0, pivotH])), B, pivotW);
        this.ground(A.add(B).x(0.5).subtract($V([0, pivotH])), $V([0, 1]), A.subtract(B).modulus() + 2 * pivotW);

        this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
        this.line(A, B);
        this.line(B, C);
        this.setProp("shapeOutlineColor", "rgb(0, 0, 255)");
        this.line(C, D);
        this.line(D, E);
        this.line(E, F);
        this.line(F, C);
        this.setProp("shapeOutlineColor", "rgb(0, 200, 0)");
        this.line(A, D);
        this.line(A, F);

        this.setProp("shapeOutlineColor", "rgb(0, 0, 0)");
        this.point(A);
        this.point(B);
        this.point(C);
        this.point(D);
        this.point(F);

        this.setProp("shapeOutlineColor", "rgb(255, 0, 255)");
        this.setProp("pointRadiusPx", 3);
        this.point(E);

        var EHistory = this.history("E", 0.05, 2 * Math.PI + 0.05, t, E);
        this.polyLine(this.historyToTrace(EHistory));
    });

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var fishJawAB = [
        $V([180, -45]), $V([186, -38]), $V([166, 0]), $V([148, 15]),
        $V([110, 84]), $V([63, 132]), $V([11, 162]), $V([-58, 195]),
        $V([-92, 209]), $V([-112, 192]), $V([-101, 183]), $V([-104, 150]),
        $V([-126, 113]), $V([-126, 98]), $V([-111, 54]), $V([-137, -21]),
        $V([-145, -62]), $V([-148, -122]), $V([-152, -140]), $V([-146, -164]),
        $V([-130, -170]), $V([-113, -169]), $V([-57, -179]), $V([-3, -184]),
        $V([37, -188]), $V([56, -190]), $V([61, -193]), $V([66, -188]),
        $V([66, -184]), $V([60, -174]), $V([56, -173]), $V([47, -169]),
        $V([35, -142]), $V([22, -101]), $V([35, -66]), $V([56, -53]),
        $V([94, -58]), $V([119, -63]), $V([133, -60]), $V([160, -44])
    ];

    var fishJawBC = [
        $V([63, -192]), $V([74, -193]), $V([79, -202]), $V([95, -203]),
        $V([98, -189]), $V([104, -185]), $V([123, -173]), $V([137, -159]),
        $V([139, -153]), $V([132, -146]), $V([106, -156]), $V([92, -158]),
        $V([73, -163]), $V([58, -167]), $V([67, -180])
    ];

    var fishJawCD = [
        $V([104, -186]), $V([110, -199]), $V([143, -197]), $V([182, -187]),
        $V([192, -176]), $V([206, -145]), $V([196, -147]), $V([183, -147]),
        $V([154, -129]), $V([129, -133]), $V([105, -140]), $V([82, -142]),
        $V([74, -130]), $V([78, -124]), $V([89, -127]), $V([105, -127]),
        $V([109, -117]), $V([105, -100]), $V([88, -95]), $V([75, -93]),
        $V([57, -103]), $V([49, -113]), $V([58, -138]), $V([71, -149]),
        $V([87, -157]), $V([103, -158]), $V([124, -151]), $V([133, -148]),
        $V([137, -150]), $V([139, -155]), $V([134, -160]), $V([126, -170]),
        $V([119, -176]), $V([110, -182])
    ];

    var fishJawDA = [
        $V([83, -131]), $V([100, -139]), $V([121, -127]), $V([140, -120]),
        $V([154, -122]), $V([165, -135]), $V([183, -136]), $V([185, -140]),
        $V([203, -141]), $V([223, -146]), $V([229, -140]), $V([233, -130]),
        $V([234, -106]), $V([226, -80]), $V([174, 14]), $V([166, 26]),
        $V([150, 40]), $V([152, 14]), $V([170, -2]), $V([187, -36]),
        $V([186, -45]), $V([161, -45]), $V([137, -64]), $V([122, -81]),
        $V([96, -98])
    ];

    var fishPivotA = $V([173, -46]);
    var fishPivotB = $V([66, -184]);
    var fishPivotC = $V([138, -153]);
    var fishPivotD = $V([101, -123]);

    var fishPivots = [fishPivotA, fishPivotB, fishPivotC, fishPivotD];
    var fishLinks = [
        {outlineData: fishJawAB,
         startPivot: 0,
         endPivot: 1,
         outlineColor: "rgb(0, 255, 255)",
         insideColor: "rgba(0, 255, 255, 0.3)",
        },
        {outlineData: fishJawBC,
         startPivot: 1,
         endPivot: 2,
         outlineColor: "rgb(255, 0, 255)",
         insideColor: "rgba(255, 0, 255, 0.3)",
         forces: [
             [$V([79, -202]), $V([-50, 10])]
         ],
         forcesActive: function(t) {return (Math.sin(t) >= 0);}
        },
        {outlineData: fishJawCD,
         startPivot: 2,
         endPivot: 3,
         outlineColor: "rgb(0, 255, 0)",
         insideColor: "rgba(0, 255, 0, 0.3)",
        },
        {outlineData: fishJawDA,
         startPivot: 3,
         endPivot: 0,
         outlineColor: "rgb(255, 0, 0)",
         insideColor: "rgba(255, 0, 0, 0.3)",
         forces: [
             [$V([97, -100]), $V([-100, 50])],
             [$V([125, -79]), $V([-85, 60])],
             [$V([142, -62]), $V([-70, 70])]
         ],
         forcesActive: function(t) {return (Math.sin(t) < 0);}
        }
    ];

    var aml_fj_c = new PrairieDrawAnim("aml-fj-c", function(t) {
        this.addOption("showLinkage", false);
        this.addOption("showForces", false);

	this.setUnits(600, 550);
        this.drawImage("aml_id82373_resized.jpg", $V([0, 0]), $V([0, 0]));

        if (this.getOption("showLinkage")) {
            drawLinkage(this, t, fishPivots, fishLinks, false, 0.25);
        }
    });

    $('button[class~="reset-time:aml-fj-c"]').click(function() {
        aml_fj_c.stopAnim();
        aml_fj_c.setOption("showForces", false);
        aml_fj_c.resetTime();
    });

    aml_fj_c.registerOptionCallback("showLinkage", function(value) {
        if (value) {
            this.stopAnim();
            this.setOption("showForces", false);
            this.resetTime();
            $('button[class~="anim-toggle:aml-fj-c"]').css("visibility", "visible");
            $('button[class~="option-toggle:aml-fj-c:showForces"]').css("visibility", "visible");
            $('button[class~="reset-time:aml-fj-c"]').css("visibility", "visible");
        } else {
            this.stopAnim();
            this.setOption("showForces", false);
            this.resetTime(false);
            $('button[class~="anim-toggle:aml-fj-c"]').css("visibility", "hidden");
            $('button[class~="option-toggle:aml-fj-c:showForces"]').css("visibility", "hidden");
            $('button[class~="reset-time:aml-fj-c"]').css("visibility", "hidden");
        }
    });

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

    var morayJaws = [
        [$V([-1.56, 18.36]),
         $V([5.47, 19.14]),
         $V([16.41, 19.92]),
         $V([21.88, 23.77]),
         $V([19.14, 25.61]),
         $V([12.11, 26.39]),
         $V([5.47, 25.61]),
         $V([-0.78, 24.44])
         ],
        [$V([7.03, 20.31]),
         $V([12.11, 21.09]),
         $V([16.80, 24.05]),
         $V([18.36, 27.17]),
         $V([15.23, 28.73]),
         $V([9.77, 28.73]),
         $V([5.86, 27.17]),
         $V([2.73, 25.22])
        ],
        [$V([-3.13, -46.48]),
         $V([3.91, -42.19]),
         $V([9.38, -39.06]),
         $V([12.50, -33.77]),
         $V([10.55, -30.25]),
         $V([3.52, -27.91]),
         $V([-3.52, -29.08]),
         $V([-8.81, -31.03])
        ],
        [$V([-5.08, -31.42]),
         $V([-13.11, -31.53])
        ]
    ];

    var aml_fm_c = new PrairieDraw("aml-fm-c", function() {
        this.addOption("showJaws", false);

	this.setUnits(100, 125);
        this.drawImage("aml_moray_pharyngeal_closed.png", $V([0, 0]), $V([0, -1]), 100);
        this.drawImage("aml_moray_pharyngeal_open.png", $V([0, 0]), $V([0, 1]), 100);

        if (this.getOption("showJaws")) {
            this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
            for (var i = 0; i < morayJaws.length; i++) {
                this.polyLine(morayJaws[i]);
            }
        }
    });

    /*************************************************************
    **************************************************************
    **************************************************************
    *************************************************************/

}); // end of document.ready()
