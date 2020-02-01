(function(){
"use strict";

const axesDimensions = ["1", "1"];

const chairmat = {
    isSquare: false,
    largeAxisMax: undefined,
    smallAxisMax: undefined,
    sides: [
        "","","","","","",
    ],
    determineAxes: function(dimensions) {
        if(dimensions[0] === dimensions[1]) {
            this.isSquare = true;
            this.largeAxisMax = dimensions[0];
            this.smallAxisMax = dimensions[0];
        } else if (dimensions[0] > dimensions[1]) {
            this.largeAxisMax = dimensions[0];
            this.smallAxisMax = dimensions[1];
        } else {
            this.largeAxisMax = dimensions[1];
            this.smallAxisMax = dimensions[0];
        }
    },
}

chairmat.determineAxes(axesDimensions);

console.log(chairmat)

}());