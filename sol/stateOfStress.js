var MohrView = Backbone.View.extend({
    initialize: function(options) {
        var that = this;
        this.pd = new PrairieDraw(options.el);
        _.extend(this.pd, Backbone.Events);
        this.pd.on("imgLoad", this.render, this);
        this.pd.registerMouseLineDrawCallback(function() {
            that.trigger("mouseLineDraw", this.mouseLineDrawStart, this.mouseLineDrawEnd);
        });
        this.pd.registerRedrawCallback(function() {
            that.render();
        });
        this.listenTo(this.model, "all", this.render);
    },

    render: function() {
	// ----------- Input variables --------------------------------------- 
	var size = 25;
        this.pd.setUnits(size,size / this.pd.goldenRatio);
	
	// Origin of square element 
	var OX = -7;
	var OY = 0; 
	var rO = $V([OX,OY]);
	// Size of square element is given by 2L
	var L = 2;
	// Fixed size of arrows: when using drawing feature (arrows are the solution)
	// Variable size of arrows: when arrows are given as input of the problem
	var arrowlengthfixed = false;

	// Origin of Mohr's circle axis
	var OMX = 6;
	var OMY = 0; 
	var rMO = $V([OMX,OMY]);
	var domain = 4.5;		

	// ---------------------------------------------------------------------		
	// ----------- Getting angle -------------------------------------------
	// ---------------------------------------------------------------------
	// Get theta from "range" button (or question input)	
	var theta = 0;
	theta = this.model.get("theta"); // theta input in degrees
	var thetaRad = PrairieGeom.degToRad(theta);	 
	// ---------------------------------------------------------------------		
	// ----------- Getting stress values -----------------------------------
	// ---------------------------------------------------------------------
	// Stress values will be needed when arrowlengthfixed = false
	var maxsigma = this.model.get("maxsigma");
    var sigmax = Number(this.model.get("sigmax"));
    var sigmay = Number(this.model.get("sigmay"));
    var tauxy = Number(this.model.get("tauxy"));
	console.log(sigmax,sigmay,tauxy);
	// ---------------------------------------------------------------------		
	// Calculating stresses in rotated system of coordinates
	// ---------------------------------------------------------------------
	var sigma_average = (sigmax + sigmay)/2 ;
	console.log("sigma_ave = ",sigma_average);
	var sigma_diff = (sigmax-sigmay)/2;
	console.log("sigma-diff = ",sigma_diff);

	var sigmaxp = sigma_average + sigma_diff*Math.cos(2*thetaRad) + tauxy*Math.sin(2*thetaRad);
	var sigmayp = sigma_average - sigma_diff*Math.cos(2*thetaRad) - tauxy*Math.sin(2*thetaRad);	
	var tauxyp = - sigma_diff*Math.sin(2*thetaRad) + tauxy*Math.cos(2*thetaRad);
	console.log(theta,sigmaxp,sigmayp,tauxyp);
	// ---------------------------------------------------------------------		
	// Calculating principal stresses
	// ---------------------------------------------------------------------
	var R = Math.sqrt(Math.pow(sigma_diff,2) + Math.pow(tauxy,2));		
	var sigma1 = sigma_average + R;
	var sigma2 = sigma_average - R;
	var thetap1Rad = 0.5*Math.atan2(tauxy,sigma_diff);
	thetap1 = PrairieGeom.radToDeg(thetap1Rad);	
	// Normalized stresses
	var sx = L*sigmaxp/Math.abs(sigma1);
	var sy = L*sigmayp/Math.abs(sigma1);
	var txy =L*tauxyp/Math.abs(sigma1);	
	//console.log(sigma1,sigma2,thetap1,R);

	// ---------------------------------------------------------------------		
	// ------------------ START DRAW ELEMENT FUNCTION ----------------------- //	
	// ---------------------------------------------------------------------		
	// Defining corners of the square when theta is zero
	var rA = $V([OX-L, OY-L]);
	var rB = $V([OX+L, OY-L]);
	var rC = $V([OX+L, OY+L]);
	var rD = $V([OX-L, OY+L]);
	
	// Rotating the square
	rA = rA.rotate(thetaRad, rO);
	rB = rB.rotate(thetaRad, rO);
	rC = rC.rotate(thetaRad, rO);
	rD = rD.rotate(thetaRad, rO);

	// Drawing the square		
	this.pd.line(rA, rB);
	this.pd.line(rB, rC);
	this.pd.line(rC, rD);
	this.pd.line(rD, rA);
	
 	//Set up system of coordinates
	var r2 = $V([OX + 3*L, OY]);
	var r3 = $V([OX, OY + 3*L]);
	this.pd.save();
	this.pd.setProp("arrowLineWidthPx", 0.5);
	this.pd.setProp("arrowheadLengthRatio",16);   
        this.pd.arrow(rO,r2);
	this.pd.labelLine(rO, r2, $V([1.1, 0]), "x");	
        this.pd.arrow(rO,r3);
	this.pd.labelLine(rO, r3, $V([1.1, 0]), "y");	
	this.pd.circleArrow(rO, L/3, 0 , thetaRad);
	this.pd.setProp("arrowheadLengthRatio",7);   
	var r4 = $V([OX+0.7*L, 0]);
	r4 = r4.rotate(thetaRad, rO);
	this.pd.arrow(rO,r4);   
	//this.pd.labelCircleLine(rO,1,0,0.25*Math.PI, $V([0,1.5]),"th" );		
	this.pd.restore();
	
	// Creating points for stress arrows
	if (arrowlengthfixed) {
	    var d1 = 1.5*L;
	    var d2 = L;
	    var d3 = d2;
	    var x = 1.2*L;
	    var y = 0.5*L;
	}
	else	{
	    var d1 = 1.4*L;
	    var d2 = Math.abs(sx)/2;
	    var d3 = Math.abs(sy)/2;
	    var x = 1.2*L;
	    var y = Math.abs(txy)/2;
	}	
	var rE = $V([OX+d1,OY]);
	var rF = $V([OX+d1+d2, OY]);	
	var rG = $V([(OX-d1), OY]);
	var rH = $V([(OX-d1-d2), OY]);			
	var rI = $V([OX,OY+d1]);
	var rJ = $V([OX,OY+d1+d3]);	
	var rK = $V([OX,OY-d1]);
	var rL = $V([OX,OY-d1-d3]);
	var rM = $V([OX+x,OY-y]);
	var rN = $V([OX+x,OY+y]);	
	var rP = $V([OX+y,OY+x]);
	var rQ = $V([OX-y,OY+x]);
	var rR = $V([OX-x,OY+y]);
	var rS = $V([OX-x,OY-y]);	
	var rT = $V([OX-y,OY-x]);
	var rU = $V([OX+y,OY-x]);			
	
	// Rotating the points
	rE = rE.rotate(thetaRad, rO);
	rF = rF.rotate(thetaRad, rO);
	rG = rG.rotate(thetaRad, rO);
	rH = rH.rotate(thetaRad, rO);
	rI = rI.rotate(thetaRad, rO);
	rJ = rJ.rotate(thetaRad, rO);
	rK = rK.rotate(thetaRad, rO);
	rL = rL.rotate(thetaRad, rO);		
	rM = rM.rotate(thetaRad, rO);
	rN = rN.rotate(thetaRad, rO);
	rP = rP.rotate(thetaRad, rO);
	rQ = rQ.rotate(thetaRad, rO);
	rR = rR.rotate(thetaRad, rO);
	rS = rS.rotate(thetaRad, rO);
	rT = rT.rotate(thetaRad, rO);
	rU = rU.rotate(thetaRad, rO);
	
	if (arrowlengthfixed) { // then draw the points for drawing
	    this.pd.save();
	    this.pd.setProp("pointRadiusPx", 5);
	    this.pd.point(rE); 
	    this.pd.point(rF); 
	    this.pd.point(rG); 
	    this.pd.point(rH); 
	    this.pd.point(rI); 
	    this.pd.point(rJ); 
	    this.pd.point(rK); 
	    this.pd.point(rL); 	
	    this.pd.point(rM); 
	    this.pd.point(rN); 
	    this.pd.point(rP); 
	    this.pd.point(rQ); 
	    this.pd.point(rR); 
	    this.pd.point(rS); 
	    this.pd.point(rT); 
	    this.pd.point(rU); 				
	    this.pd.restore();
	}
	else { // then draw the arrows			
	    if (sx > 0) {
		this.pd.arrow(rE,rF);
		this.pd.labelLine(rE, rF, $V([0.6, 1.2]), Math.abs(sigmaxp).toFixed(1).toString() + " MPa");
		this.pd.arrow(rG,rH);
	    }
	    else if (sx < 0) {
		this.pd.arrow(rF,rE);			
		this.pd.labelLine(rE, rF, $V([0.6, 1.2]), Math.abs(sigmaxp).toFixed(1).toString() + " MPa");
		this.pd.arrow(rH,rG);
	    } 
	    
	    if (sy > 0) {
		this.pd.arrow(rI,rJ);
		this.pd.labelLine(rI, rJ, $V([0.6, 1.2]), Math.abs(sigmayp).toFixed(1).toString() + " MPa");
		this.pd.arrow(rK,rL);
	    }
	    else if (sy < 0) {
		this.pd.arrow(rJ,rI);
		this.pd.labelLine(rI, rJ, $V([0.6, 1.2]), Math.abs(sigmayp).toFixed(1).toString() + " MPa");
		this.pd.arrow(rL,rK);
	    } 
	    if (txy > 0) {
		this.pd.arrow(rM,rN);
		this.pd.arrow(rQ,rP);
		this.pd.arrow(rR,rS);
		this.pd.arrow(rU,rT);
		this.pd.labelLine(rT, rU, $V([0.6, -1.2]), Math.abs(tauxyp).toFixed(1).toString() + " MPa");
	    }
	    else if (txy < 0){
		this.pd.arrow(rN,rM);
		this.pd.arrow(rP,rQ);
		this.pd.arrow(rS,rR);
		this.pd.arrow(rT,rU);
		this.pd.labelLine(rT, rU, $V([0.6, -1.2]), Math.abs(tauxyp).toFixed(1).toString() + " MPa");
	    } 			
	}		
	// ------------------ END DRAW ELEMENT FUNCTION ----------------------- //	
	
	
	// -------------- START DRAW MOHR'S CIRCLE  FUNCTION ----------------------- //	
	
 	//Set up system of coordinates
	var rM1 = $V([OMX + 1.2*domain,OMY]);
	var rM2 = $V([OMX - 1.2*domain,OMY]);
	var rM3 = $V([OMX,OMY+1.2*domain]);		
	var rM4 = $V([OMX,OMY-1.2*domain]);			
	
	var sigma_max = Math.abs(sigma1);
	if (Math.abs(sigma2) > sigma_max) sigma_max = Math.abs(sigma2);
	var sigma_ave_scale = sigma_average*domain/sigma_max;
	//console.log(sigma_ave_scale,OMX + sigma_ave_scale);
	var rMC = $V([OMX + sigma_ave_scale,OMY]);

	this.pd.circle(rMC,R*domain/sigma_max);
	
	this.pd.arrow(rMO,rM1);
        this.pd.line(rMO,rM2);
	this.pd.labelLine(rMO, rM1, $V([0.9, -1]), "sigma");	
        this.pd.arrow(rMO,rM4);
        this.pd.line(rMO,rM3);
	this.pd.labelLine(rMO, rM4, $V([1.1, 0]), "tau");
	
	// Fixed point X
	var Xp = $V([OMX+sigmax*domain/sigma_max,OMY-tauxy*domain/sigma_max]);
	var Yp = $V([OMX+sigmay*domain/sigma_max,OMY+tauxy*domain/sigma_max]);
	this.pd.save();
	this.pd.setProp("pointRadiusPx", 5);
	this.pd.point(Xp);
	this.pd.line(Xp,Yp);
	this.pd.labelLine(Yp, Xp, $V([1.1, 1]), "X");
	this.pd.restore();
	
	// Transformation of stress
	var Xpos = $V([OMX+sigmaxp*domain/sigma_max,OMY-tauxyp*domain/sigma_max]);
	var Ypos = $V([OMX+sigmayp*domain/sigma_max,OMY+tauxyp*domain/sigma_max]);
	this.pd.save();
	this.pd.setProp("pointRadiusPx", 5);
	this.pd.setProp("shapeOutlineColor","rgb(255,0,0)");
	this.pd.point(Xpos);
	this.pd.point(Ypos);
	this.pd.line(Xpos,Ypos);
	this.pd.labelLine(Ypos, Xpos, $V([1.1, 1]), "X'");
	this.pd.restore();
    },

    activateMouseLineDraw: function() {
        this.pd.activateMouseLineDraw();
    },

    activate3DControl: function() {
        this.pd.activate3DControl();
    },
});

rivets.configure({
    prefix: 'data',
    templateDelimiters: ['{{', '}}'],
});

rivets.adapters['.'] = {
    observe: function(obj, keypath, callback) {
        obj.on('change:' + keypath, callback)
    },
    unobserve: function(obj, keypath, callback) {
        obj.off('change:' + keypath, callback)
    },
    get: function(obj, keypath) {
        return obj.get(keypath)
    },
    set: function(obj, keypath, value) {
        obj.set(keypath, value)
    },
};

rivets.binders.instavalue = {
    publishes: true,
    bind: function(el) {
        return rivets._.Util.bindEvent(el, 'input', this.publish);
    },
    unbind: function(el) {
        return rivets._.Util.unbindEvent(el, 'input', this.publish);
    },
    routine: function(el, value) {
        var _ref;
        
        el = $(el);
        if ((value != null ? value.toString() : void 0) !== ((_ref = el.val()) != null ? _ref.toString() : void 0)) {
            return el.val(value != null ? value : '');
        }
    }
};

$(function() {
    var mohrData = new Backbone.Model({
        theta: 0,
        maxsigma: 3,
        sigmax: 0,
        sigmay: 0,
        tauxy: 0,
    });

    rivets.bind($('#mohr-container'), mohrData)

    var mohrView = new MohrView({
        model: mohrData,
        el: "rot-elem",
    });

    mohrView.render();
});
