define(["QServer", "PrairieRandom", "sylvester", "PrairieGeom", "underscore"], function(QServer, PrairieRandom, Sylvester, PrairieGeom, _) {
    var $V = Sylvester.Vector.create;

    var server = new QServer();

    server.getData = function(vid) {
        
        var rand = new PrairieRandom.RandomGenerator(vid);
		
		var amm = rand.randElem([38,40,42]);
		var bmm = rand.randElem([28,30,32]);
		var tmm = 10;
		// shear force applied to cross section
		var VkN = rand.randElem([7,9,11]);
		
		// unit conversions
		var a = amm*Math.pow(10,-3);
		var b = bmm*Math.pow(10,-3);
		var t = tmm*Math.pow(10,-3);
		
		var V = VkN*Math.pow(10,3);
		
		var A1 = (a + 2*t)*(a + 2*t);
		var A2 = a*(a + t);
		var A3 = b*t;
		var Atot = A1 - A2 + 2*A3;
		var y1bar = (1/2)*(a + 2*t);
		var y2bar = (1/2)*(a + t);
		var y3bar = t/2;
		
		var ybar = (y1bar*A1 - y2bar*A2 + 2*y3bar*A3)/Atot;
		
		var I1 = (1/12)*(a + 2*t)*Math.pow(a + 2*t,3) + A1*Math.pow(ybar - y1bar,2);
		var I2 = (1/12)*a*Math.pow(a + t,3) + A2*Math.pow(ybar - y2bar,2);
		var I3 = (1/12)*b*Math.pow(t,3) + A3*Math.pow(ybar - y3bar,2);
		
		var I = I1 - I2 + 2*I3;
		
		// Iz and ybarMM for question file display
		var Iz = (Math.round((I*Math.pow(10,12))*Math.pow(10,-4)))*Math.pow(10,-2);
		var ybarMM = (Math.round((ybar*Math.pow(10,4))))/10;
		
		var Q = 2*(b + t)*t*(ybarMM*Math.pow(10,-3) - t/2);
		
		var tau = (V*Q)/(Iz*Math.pow(10,-6)*2*t);
		
		tau = tau*Math.pow(10,-6);

        var params = {
			amm:amm,
			bmm:bmm,
			tmm:tmm,
			a:a,
			b:b,
			t:t,
			ybar:ybar,
			ybarMM:ybarMM,
			Iz:Iz,
			VkN:VkN
        };

        var trueAnswer = {
			tau:tau
        };
		
        var questionData = {
            params: params,
            trueAnswer: trueAnswer,
        };
        return questionData;
    };
    

    return server;
});
