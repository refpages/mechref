$(document).ready(function(){
    test = new PrairieDrawAnim("test", function(t) {
        this.setUnits(6, 4);

        O = $V([0,0])
        P = $V([Math.cos(t), 2*Math.sin(t)])

        this.rod(O, $V([Math.cos(t), 2*Math.sin(t)]), .1)
        this.rod(P, P.add($V([Math.cos(5*t)/4, Math.sin(5*t)/4])), .1)

        this.point(P)
        this.text(P, $V([-1, -1]), "TEST text")
        this.restore();

    });

    $( window ).on( "resize", function() {
        test.redraw();
    })
})
