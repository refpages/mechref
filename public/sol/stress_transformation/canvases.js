$(document).ready(function(){
    const thetaSlider = document.getElementById("theta-slider");
    const thetaDisplay = document.getElementById("theta-display");

    // Try to set both controllers; if they don't exist yet, retry a few times
    function setThetaOnControllers(numericValue){
      let attempts = 0;
      const maxAttempts = 40; // ~2 seconds with 50ms interval
      const iv = setInterval(() => {
        attempts ++;
        let didSomething = false;

        // update stt_mc_c if present
        if (window.stt_mc_c && typeof window.stt_mc_c.setOption === "function"){
          try {
            window.stt_mc_c.setOption("theta", numericValue);
            if (typeof window.stt_mc_c.redraw === "function") window.stt_mc_c.redraw();
            didSomething = true;
          } catch (e){
            // ignore and keep trying
          }
        }

        // update stt_cb_c if present
        if (window.stt_cb_c && typeof window.stt_cb_c.setOption === "function"){
          try {
            window.stt_cb_c.setOption("theta", numericValue);
            if (typeof window.stt_cb_c.redraw === "function") window.stt_cb_c.redraw();
            didSomething = true;
          } catch (e){
            // ignore and keep trying
          }
        }

        // update any data-option spans via helper if available
        if (typeof window.updateOptionSpans === "function"){
          try {window.updateOptionSpans();} catch(e){}
        }

        // stop if both controllers are present or if we've exceeded attempts
        const bothReady = window.stt_mc_c && window.stt_cb_c;
        if (bothReady || attempts >= maxAttempts || didSomething){
          clearInterval(iv);
        }
      }, 50);
    }

    function updateTheta(valueStr){
      // convert to number because controllers may expect numeric values
      const valueNum = Number(valueStr);
      thetaDisplay.textContent = valueStr;

      // immediate attempt
      try {
        if (window.stt_mc_c && typeof window.stt_mc_c.setOption === "function"){
          window.stt_mc_c.setOption("theta", valueNum);
          if (typeof window.stt_mc_c.redraw === "function") window.stt_mc_c.redraw();
        }
      } catch(e){}

      try {
        if (window.stt_cb_c && typeof window.stt_cb_c.setOption === "function"){
          window.stt_cb_c.setOption("theta", valueNum);
          if (typeof window.stt_cb_c.redraw === "function") window.stt_cb_c.redraw();
        }
      } catch(e){}

      // Ensure controllers are updated even if they weren't ready yet
      setThetaOnControllers(valueNum);

      // keep your data-option spans consistent (if you rely on that mechanism)
      if (typeof window.updateOptionSpans === "function"){
        try {window.updateOptionSpans();} catch(e){}
      }
    }

    thetaSlider.addEventListener("input", e => updateTheta(e.target.value));
    thetaSlider.addEventListener("change", e => updateTheta(e.target.value));

    // Initialize once DOM is ready (value could be non-zero)
    document.addEventListener("DOMContentLoaded", () => {
      updateTheta(thetaSlider.value);
    });

    const container = document.querySelector("#anim-container");
    const cb = document.querySelector("#stt-cb-c");
    const mc = document.querySelector("#stt-mc-c");
  
    function resize_anim_container(){
      var container_width = container.clientWidth;
  
      if (container_width < 600){
        cb.width = Math.round(container_width)-8;
        cb.height = Math.round(container_width)-8;
        mc.width = Math.round(container_width)-8;
        mc.height = Math.round(container_width)-8;
      }else{
        cb.width = Math.round(container_width/2)-8;
        cb.height = Math.round(container_width/2)-8;
        mc.width = Math.round(container_width/2)-8;
        mc.height = Math.round(container_width/2)-8;
      }
      
    }
  
    resize_anim_container();
  
    window.addEventListener("resize", function(){
      resize_anim_container();
  
      stt_mc_c.redraw();
      stt_cb_c.redraw();
    })

        stt_mc_c = new PrairieDraw("stt-mc-c", function() {
          this.setUnits(5, 5);
          
          this.addOption("theta", 0)
  
          var sx = -80;
          var sy =  50;
          var tau =  -25;
  
          var theta_p = -Math.atan(2*tau/(sx-sy));
  
          var theta = Math.PI/180*this.getOption('theta');
  
          var savg = (sx+sy)/2;
          var R = Math.sqrt((sx-sy)**2/4 + tau**2);
          var radius = 1.7;
          var O = $V([0, 0]);
          
          this.circle(O, radius, false)
          this.line($V([(sx-savg)/R*radius, -tau/R*radius]), $V([(sy-savg)/R*radius, tau/R*radius]));
          this.text($V([(sx-savg)/R*radius, -tau/R*radius]), $V([-1,-1]), `  X (${sx}, ${tau})`);
          this.text($V([(sy-savg)/R*radius, tau/R*radius]), $V([1,1]), `Y (${sy}, ${-tau})  `);
          this.text(O, $V([1, 1]), `(${savg}, ${0})`);

  
          this.text($V([radius, 0]), $V([-1, 1]), `TEX:$\\sigma_1$`);
          this.text($V([-radius, 0]), $V([1, 1]), `TEX:$\\sigma_2$`);
  
          this.line(O, $V([Math.cos(theta_p+2*theta)*radius, Math.sin(theta_p+2*theta)*radius]), 'blue');
          this.point($V([Math.cos(theta_p+2*theta)*radius, Math.sin(theta_p+2*theta)*radius]), 'blue');
          this.line(O, $V([-Math.cos(theta_p+2*theta)*radius, -Math.sin(theta_p+2*theta)*radius]), 'blue');
          this.point($V([-Math.cos(theta_p+2*theta)*radius, -Math.sin(theta_p+2*theta)*radius]), 'blue');
  
          if (theta > 0){
            this.arc(O, radius/2, theta_p, theta_p+2*theta, false);
            this.text($V([Math.cos(theta_p+2*theta)*radius/2, Math.sin(theta_p+2*theta)*radius/2]), $V([-1, -1])," 2θ");
          }else if (theta < 0){
            this.arc(O, radius/2, theta_p+2*theta, theta_p, false);
            this.text($V([Math.cos(theta_p+2*theta)*radius/2, Math.sin(theta_p+2*theta)*radius/2]),$V([1, 1]), " 2θ");
          }
          
          document.querySelector("span#sigma_1").innerText = Math.round((savg + R)*100)/100;
          document.querySelector("span#sigma_2").innerText = Math.round((savg - R)*100)/100;
          document.querySelector("span#tau_max").innerText = Math.round((R)*100)/100;
  
          var current_angle = 2*theta;
  
          var sxp = Math.round((savg + (sx-sy)/2*Math.cos(current_angle)+tau*Math.sin(current_angle))*100)/100;
          var syp = Math.round((savg - (sx-sy)/2*Math.cos(current_angle)-tau*Math.sin(current_angle))*100)/100;
          var txpyp = Math.round((-(sx-sy)/2*Math.sin(current_angle)+tau*Math.cos(current_angle))*100)/100;
          
          document.querySelector("span#sigma_xp").innerText = sxp;
          document.querySelector("span#sigma_yp").innerText = syp;
          document.querySelector("span#tau_xpyp").innerText = txpyp;
  
          var xp_location = $V([-Math.cos(theta_p+2*theta)*radius, -Math.sin(theta_p+2*theta)*radius]);
          var yp_location = $V([Math.cos(theta_p+2*theta)*radius, Math.sin(theta_p+2*theta)*radius]);
  
  
          if(xp_location.dot($V([1, 0])) > 0){
            if(xp_location.dot($V([0, 1])) > 0){
              this.text(xp_location, $V([-1,-1]), `  X' (${Math.round(sxp)}, ${Math.round(txpyp)})`);
              this.text(yp_location, $V([1, 1]), `  Y' (${Math.round(syp)}, ${Math.round(-txpyp)})`);
            }else{
              this.text(xp_location, $V([-1, 1]), `  X' (${Math.round(sxp)}, ${Math.round(txpyp)})`);
              this.text(yp_location, $V([1, -1]), `  Y' (${Math.round(syp)}, ${Math.round(-txpyp)})`);
            }
          }else{
            if(xp_location.dot($V([0, 1])) > 0){
              this.text(xp_location, $V([1,-1]), `  X' (${Math.round(sxp)}, ${Math.round(txpyp)})`);
              this.text(yp_location, $V([-1, 1]), `  Y' (${Math.round(syp)}, ${Math.round(-txpyp)})`);
            }else{
              this.text(xp_location, $V([1, 1]), `  X' (${Math.round(sxp)}, ${Math.round(txpyp)})`);
              this.text(yp_location, $V([-1,-1]), `  Y' (${Math.round(syp)}, ${Math.round(-txpyp)})`);
            }
            
          }
          
          sigma_equals_0 = -savg/R*radius

          this.arrow($V([sigma_equals_0, radius+.5]), $V([sigma_equals_0, -radius-.5]))
          this.text($V([sigma_equals_0, -radius-.5]), $V([-1, 1]), "τ")

          this.arrow($V([-radius-.5, 0]), $V([radius+.5, 0]))
          this.text($V([radius+.5, 0]), $V([-1, 1]), "σ")

      })

      stt_cb_c = new PrairieDraw("stt-cb-c", function() {
        this.setUnits(4, 4);
  
        this.addOption("theta", 0)
  
        var O = $V([0, 0]);
        var theta = Math.PI/180*this.getOption('theta');
  
        var width = 2;
        var height = 2;
  
        var rC = $V([0, 0]);
  
        var axis_length = 1.5;
        
        var x = $V([Math.cos(theta)*axis_length,Math.sin(theta)*axis_length]);
        var y = $V([-Math.sin(theta)*axis_length, Math.cos(theta)*axis_length]);
  
        this.arrow(rC, rC.add(x));
        this.labelLine(rC, rC.add(x), $V([1, 1]), "x'")
        this.arrow(rC, rC.add(y));
        this.labelLine(rC, rC.add(y), $V([1, 1]), "y'")
  
        this.arrow(rC, rC.add($V([axis_length, 0])));
        this.arrow(rC, rC.add($V([0, axis_length])));
  
        if(theta > 0){
          this.text(rC.add($V([width/4, 0])), $V([0, 1]), "θ");
          this.arc(rC, width/4, 0, theta, false)
        }else if (theta < 0){
          this.text(rC.add($V([width/4, 0])), $V([0, -1]), "θ");
          this.arc(rC, width/4, theta, 0, false)
        }
        
        this.rectangle(width, height, O, theta, false);
  
        this.translate($V([0, -5.5]))
  
        this.circle(O, 2.5, false)
        
    })
})