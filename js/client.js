define(["sylvester", "text!./question.html", "text!./answer.html", "text!./submission.html", "SimpleClient", "SimpleFigure", "PrairieGeom"], function(Sylvester, questionTemplate, answerTemplate, submissionTemplate, SimpleClient, SimpleFigure, PrairieGeom) {
    var $V = Sylvester.Vector.create;
	
	var drawFcn = function() {
		
        this.pd.setUnits(7, 7 / this.pd.goldenRatio);

        var a = this.params.get("a");
		var b = this.params.get("b");
		var t = this.params.get("t");
		var ybar = this.params.get("ybar");
		
        var ex = $V([1, 0]);
        var ey = $V([0, 1]);
        
        var w = .025;
		
		var rA = $V([0, (a + 2*t)/2]);
		var rB = $V([-(a/2 + t + b/2), t + (1/2)*(a + t)]);
		var rC = $V([(a/2 + t + b/2), t + (1/2)*(a + t)]);
		var rD = $V([0, (a + t)/2]);
		
		var r1 = $V([-(a/2 + t + b), t]);
		var r2 = $V([-(a/2 + t), t]);
		var r3 = $V([-(a/2 + t), a + 2*t]);
		var r10 = $V([-a/2, a + t]);
		var r11 = $V([-a/2, 0]);
		var r12 = $V([-(a/2 + t + b), 0]);
		
		var r6 = $V([-r1.e(1), r1.e(2)]);
		var r5 = $V([-r2.e(1), r2.e(2)]);
		var r4 = $V([-r3.e(1), r3.e(2)]);
		var r9 = $V([-r10.e(1), r10.e(2)]);
		var r8 = $V([-r11.e(1), r11.e(2)]);
		var r7 = $V([-r12.e(1), r12.e(2)]);
	
		var rE = $V([-a/2, r4.e(2) + .3*w]);
		var rF = $V([-a/2 + t, r4.e(2) + .3*w]);
		
		var rx = $V([-(a/2 + t + b + w), ybar]);
		var rX = $V([(a/2 + t + b), ybar]);
		
		var ry = $V([-(a/2 + t + b + .5*w), 0]);
		var rY = $V([-(a/2 + t + b + .5*w), ybar]);
		
		// ghost points for bounding box;
		bB = $V([0, -w]);
		bT = $V([0, a + 2*t + w]);
		bL = $V([-(a/2 + t + b + w), 0]);
		bR = $V([(a/2 + t + b + w), 0]);
		
        var bbox = PrairieGeom.boundingBox2D([bB,bT,bL,bR]);	
		var scale = 1
        var scale = Math.min(6 / bbox.extent.e(1), 6 / this.pd.goldenRatio / bbox.extent.e(2));
        rA = rA.x(scale);
		rB = rB.x(scale);
		rC = rC.x(scale);
		rD = rD.x(scale);
		rE = rE.x(scale);
		rF = rF.x(scale);
		
		r1 = r1.x(scale);
		r2 = r2.x(scale);
		r3 = r3.x(scale);
		r4 = r4.x(scale);
		
		r5 = r5.x(scale);
		r6 = r6.x(scale);
		r7 = r7.x(scale);
		r8 = r8.x(scale);
		
		r9 = r9.x(scale);
		r10 = r10.x(scale);
		r11 = r11.x(scale);
		r12 = r12.x(scale);
		
		w = w*scale;
		a = a*scale;
		b = b*scale;
		t = t*scale;
		ybar = ybar*scale;
		
		rx = rx.x(scale);
		rX = rX.x(scale);
		ry = ry.x(scale);
		rY = rY.x(scale);
		
		bB = bB.x(scale);
		bT = bT.x(scale);
		bL = bL.x(scale);
		bR = bR.x(scale);
	
        var bbox = PrairieGeom.boundingBox2D([bB,bT,bL,bR]);
       
        this.pd.save();
        this.pd.translate(bbox.center.x(-1));
		
		this.pd.save();
		this.pd.setProp("shapeInsideColor", "rgb(180,220,195)");
		this.pd.setProp("shapeOutlineColor", "rgb(255,255,255)");
		this.pd.rectangle(2*b + 2*t + a, a + 2*t, rA);
		this.pd.setProp("shapeInsideColor", "rgb(255,255,255)");
		this.pd.setProp("shapeOutlineColor", "rgb(255,255,255)");
		this.pd.rectangle(b, a + t, rB);
		this.pd.rectangle(b, a + t, rC);
		this.pd.rectangle(a, a + t, rD);
		this.pd.restore();
		
		this.pd.line(r1,r2);
		this.pd.line(r2,r3);
		this.pd.line(r3,r4);
		
		this.pd.line(r4,r5);
		this.pd.line(r5,r6);
		this.pd.line(r6,r7);
		
		this.pd.line(r7,r8);
		this.pd.line(r8,r9);
		this.pd.line(r9,r10);
		
		this.pd.line(r10,r11);
		this.pd.line(r11,r12);
		this.pd.line(r12,r1);
		
		// neutral axis
		this.pd.save();
		this.pd.setProp("arrowLineWidthPx", 1);
		this.pd.arrow(rX,rx);
		this.pd.setProp("shapeOutlineColor", "rgb(255,0,0)");
		this.pd.setProp("arrowLineWidthPx", 3);
		this.pd.arrow(ry,rY);
		this.pd.restore();

		// reference lines
		this.pd.save();
		this.pd.setProp("shapeStrokePattern", "dashed");
		this.pd.setProp("shapeStrokeWidthPx", 1);
		this.pd.setProp("shapeOutlineColor", "rgb(100,100,100)");
		this.pd.line($V([-(a/2 + t + b + w), 0]), r12);
		this.pd.restore();
		
		// glue lines
		this.pd.save();
		this.pd.setProp("shapeOutlineColor", "rgb(255,0,0)");
		this.pd.setProp("shapeStrokeWidthPx", 3);
		this.pd.line(r2, $V([-a/2, r2.e(2)]));
		this.pd.line(r5, $V([a/2, r5.e(2)]));
		this.pd.line(rE,rF);
		this.pd.restore();

		// measurement lines
		this.pd.save();
		this.pd.setProp("measurementOffsetPx", 50);
		this.pd.measurement(r12, $V([r2.e(1),r12.e(2)]), "TEX:$b$");
		this.pd.measurement($V([r2.e(1),r12.e(2)]), r11, "TEX:$t$");
		this.pd.measurement(r11, r8, "TEX:$a$");
		this.pd.measurement(r8, $V([r5.e(1), r8.e(2)]), "TEX:$t$");
		this.pd.measurement($V([r5.e(1), r8.e(2)]), r7, "TEX:$b$");
		this.pd.setProp("measurementOffsetPx", 50);
		this.pd.measurement(r7, r6, "TEX:$t$");
		this.pd.measurement(r6, $V([r6.e(1), r9.e(2)]), "TEX:$a$");
		this.pd.measurement($V([r6.e(1), r9.e(2)]), $V([r6.e(1), r4.e(2)]), "TEX:$t$");
		this.pd.restore();

		// text
		this.pd.text(rx, $V([0,-1]), "TEX:$z$");
		this.pd.text(rY, $V([2,1.5]), "TEX:$\\bar y$");
		this.pd.text(rF, $V([-1.1,0]), "TEX:$= glue\\hspace{1mm} layer$");
		
        this.pd.restore();
    };
	
    var client = new SimpleClient.SimpleClient({questionTemplate: questionTemplate, answerTemplate: answerTemplate, submissionTemplate: submissionTemplate});

    client.on("renderQuestionFinished", function() {
        var figureView0 = SimpleFigure.addFigure(client, "#figure1", drawFcn);       
        
    });

    return client;
});
