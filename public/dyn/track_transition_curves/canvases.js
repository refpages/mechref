
$(document).ready(function() {

    avt_fc_c = new PrairieDrawAnim("avt-fc-c", function(t) {
        this.setUnits(11, 11 / this.goldenRatio);
            this.translate($V([0, 1]));
    
            var d = 4;
            var h = 4;
            var w = 1;
    
            var r = (h - w) / 2; // radius of track center
            var l1 = d; // top horizontal center length
            var l2 = Math.PI * r; // right curve center length
            var l3 = d; // bottom horizontal center length
            var l4 = Math.PI * r; // left curve center length
            var l = l1 + l2 + l3 + l4; // total length of track center
            var v = 1; // velocity of vehicle
    
            var computePos = function(t) {
                var dataNow = {};
                // dataNow.P = position of vechicle
                var s = (t * v) % l; // distance along track
                var theta; // angle of normal
                if (s < l1) {
                    // top horizontal
                    dataNow.P = $V([-d/2 + s, r]);
                } else if (s < l1 + l2) {
                    // right curve
                    dataNow.theta = Math.PI/2 - (s - l1) / r;
                    dataNow.P = $V([d/2 + r * Math.cos(dataNow.theta), r * Math.sin(dataNow.theta)]);
                } else if (s < l1 + l2 + l3) {
                    // bottom horizontal
                    dataNow.P = $V([d/2 - (s - l1 - l2), -r]);
                } else {
                    // left curve
                    theta = -Math.PI/2 - (s - l1 - l2 - l3) / r;
                    dataNow.P = $V([-d/2 + r * Math.cos(theta), r * Math.sin(theta)]);
                }
                return dataNow;
            };
    
            this.rod($V([-d/2, 0]), $V([d/2, 0]), h - w);
    
            var data = this.numDiff(computePos, t);
    
            var accTime = 1.5 * l / v;
            var accMax = v * v / r;
            var accHistory = this.history("a", 0.05, accTime, t, data.ddiff.P.modulus());
            this.plotHistory($V([-5, -3.9]), $V([10, 1.8]), $V([accTime, 1.8 * accMax]), Math.min(t, 0.95 * accTime), "TEX:$a$", accHistory, "acceleration");
    
            this.save();
            this.translate(data.P);
            this.rotate(this.angleOf(data.diff.P));
            this.rectangle(0.4, 0.2);
            this.restore();
    
            this.arrowFrom(data.P, data.diff.P.x(2 / v), "velocity");
            this.arrowFrom(data.P, data.ddiff.P.x(2 / (v * v)), "acceleration");
        });
        
        /********************************************************************************/
    
        avt_fe_c = new PrairieDrawAnim("avt-fe-c", function(t) {
            this.setUnits(11, 11 / this.goldenRatio);
                this.translate($V([0, 1]));
        
                // power series expansions accurate to 2e-4 on [0, 1]
                var fresnelC = function(z) {
                    return z
                        - Math.pow(Math.PI, 2) * Math.pow(z, 5) / 40
                        + Math.pow(Math.PI, 4) * Math.pow(z, 9) / 3456
                        - Math.pow(Math.PI, 6) * Math.pow(z, 13) / 599040;
                };
                var fresnelS = function(z) {
                    return Math.PI * Math.pow(z, 3) / 6
                        - Math.pow(Math.PI, 3) * Math.pow(z, 7) / 336
                        + Math.pow(Math.PI, 5) * Math.pow(z, 11) / 42240;
                };
        
                var d = 4;
                var h = 4;
                var w = 1;
                var r = (h - w) / 2; // radius of track center
                var lq = r / fresnelS(1); // length of quarter turn
                var f = (fresnelC(1) / fresnelS(1) - 1) * r;
        
                var l1 = d - f; // top horizontal center length
                var l20 = lq; // right curve top center length
                var l21 = lq; // right curve bottom center length
                var l2 = l20 + l21;
                var l3 = d - f; // bottom horizontal center length
                var l4 = Math.PI * r; // left curve center length
                var l = l1 + l2 + l3 + l4; // total length of track center
                var v = 1; // velocity of vehicle
        
                this.save();
                this.setProp("shapeOutlineColor", "rgb(255, 0, 0)");
                this.line($V([d/2 - f, r]), $V([d/2, r]));
                this.line($V([d/2 - f, -r]), $V([d/2, -r]));
                this.arc($V([d/2, 0]), r, - Math.PI / 2, Math.PI / 2);
                this.restore();
        
                var computePos = function(t) {
                    var dataNow = {};
                    // dataNow.P = position of vechicle
                    var s = (t * v) % l; // distance along track
                    var theta; // angle of normal
                    if (s < l1) {
                        // top horizontal
                        dataNow.P = $V([-d/2 + s, r]);
                    } else if (s < l1 + l20) {
                        // right curve top segment
                        sProp = (s - l1) / lq;
                        dataNow.P = $V([d/2 - f + lq * fresnelC(sProp), r - lq * fresnelS(sProp)]);
                    } else if (s < l1 + l2) {
                        // right curve bottom segment
                        sProp = (lq - (s - l1 - l20)) / lq;
                        dataNow.P = $V([d/2 - f + lq * fresnelC(sProp), -r + lq * fresnelS(sProp)]);
                    } else if (s < l1 + l2 + l3) {
                        // bottom horizontal
                        dataNow.P = $V([d/2 - f - (s - l1 - l2), -r]);
                    } else {
                        // left curve
                        theta = -Math.PI/2 - (s - l1 - l2 - l3) / r;
                        dataNow.P = $V([-d/2 + r * Math.cos(theta), r * Math.sin(theta)]);
                    }
                    return dataNow;
                };
        
                var N = 40;
                var points = [];
                var timePlot, dataPlot;
                for (var i = 0; i <= N; i++) {
                    timePlot = i / N * l2 / v + l1 / v;
                    dataPlot = computePos(timePlot);
                    points.push(dataPlot.P);
                }
                this.polyLine(points, false);
                this.line($V([-d/2, r]), $V([d/2 - f, r]));
                this.line($V([-d/2, -r]), $V([d/2 - f, -r]));
                this.arc($V([-d/2, 0]), r, Math.PI / 2, Math.PI * 3 / 2);
        
                var data = this.numDiff(computePos, t);
        
                var accTime = 1.5 * l / v;
                var accMax = v * v / r;
                var accHistory = this.history("a", 0.05, accTime, t, data.ddiff.P.modulus());
                this.plotHistory($V([-5, -3.9]), $V([10, 1.8]), $V([accTime, 1.8 * accMax]), Math.min(t, 0.95 * accTime), "TEX:$a$", accHistory, "acceleration");
        
                this.save();
                this.translate(data.P);
                this.rotate(this.angleOf(data.diff.P));
                this.rectangle(0.4, 0.2);
                this.restore();
        
                this.arrowFrom(data.P, data.diff.P.x(2 / v), "velocity");
                this.arrowFrom(data.P, data.ddiff.P.x(2 / (v * v)), "acceleration");
            });

        
    
        avt_ee_c = new PrairieDrawAnim("avt-ee-c", function(t) {
        this.setUnits(4, 4 / this.goldenRatio);
            this.translate($V([-1.7, -0.9]));
    
            var sx = 3.4;
            var sy = 2.0;
            this.save();
            this.setProp("arrowLineWidthPx", 1);
            this.setProp("arrowheadLengthRatio", 11);
            this.arrow($V([0, 0]), $V([sx, 0]));
            this.arrow($V([0, 0]), $V([0, sy]));
            this.text($V([sx, 0]), $V([1, 1.5]), "TEX:$x$");
            this.text($V([0, sy]), $V([1.5, 1]), "TEX:$y$");
            this.restore();
    
            var points = [];
            for (var x = 0; x <= 2.5; x += 0.01) {
                points.push($V([x, 0.25 * x * x]));
            }
            this.save();
            this.setProp("shapeOutlineColor", "rgb(0, 0, 255)");
            this.polyLine(points, false);
            this.restore();
    
            var x = 1.3;
            var y = 0.25 * x * x;
            var p = $V([x, y]);
            var et = $V([1, 0.5 * x]).toUnitVector();
            var en = $V([-et.e(2), et.e(1)]);
            this.arrow(p, p.add(et));
            this.arrow(p, p.add(en));
            this.save();
            this.setProp("shapeStrokeWidthPx", 1);
            this.line(p, p.add($V([1, 0])));
            this.restore();
    
            this.text(p.add(et), $V([-1, 0]), "TEX:$\\hat{e}_t$");
            this.text(p.add(en), $V([-1, -1]), "TEX:$\\hat{e}_n$");
            this.text(p, $V([-4, -1]), "TEX:$\\theta$");
        });

    /********************************************************************************/
    
    avt_fs_c = new PrairieDraw("avt-fs-c", function() {
        this.setUnits(1, 0.82);
            this.translate($V([-0.45, -0.36]));
    
            var sx = 0.9;
            var sy = 0.76;
            this.save();
            this.setProp("arrowLineWidthPx", 1);
            this.setProp("arrowheadLengthRatio", 11);
            this.arrow($V([0, 0]), $V([sx, 0]));
            this.arrow($V([0, 0]), $V([0, sy]));
            this.text($V([sx, 0]), $V([1, 1.5]), "TEX:$x$");
            this.text($V([0, sy]), $V([1.5, 1]), "TEX:$y$");
            this.restore();
    
            var points = [$V([0, 0])];
            var ds = 0.01;
            var N = 1000;
            var s, C = 0, S = 0;
            for (var i = 0; i < N; i++) {
                s = i * ds;
                C += Math.cos(0.5 * Math.PI * s * s) * ds;
                S += Math.sin(0.5 * Math.PI * s * s) * ds;
                points.push($V([C, S]));
            }
            this.save();
            this.setProp("shapeStrokeWidthPx", 1.2);
            this.setProp("shapeOutlineColor", "rgb(0, 0, 255)");
            this.polyLine(points, false);
            this.restore();
        });
    
        
    
        /********************************************************************************/

    $( window ).on( "resize", function() {
        avt_fc_c.redraw();
        avt_fe_c.redraw();
        avt_ee_c.redraw();
        avt_fs_c.redraw();
    } );

}); // end of document.ready()
