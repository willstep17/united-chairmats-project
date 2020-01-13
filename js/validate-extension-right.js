(function(){
    "use strict";

    $(document).ready( function(){
        setTimeout(function(){

            const sideA = $("[name='properties[Side A]']");
            sideA.on("change", function(){
                chairmat.sides[0] = sideA.val();
            });
            const sideB = $("[name='properties[Side B]']");
            sideB.on("change", function(){
                chairmat.sides[1] = sideB.val();
            });
            const sideC = $("[name='properties[Side C]']");
            sideC.on("change", function(){
                chairmat.sides[2] = sideC.val();
            });
            const sideD = $("[name='properties[Side D]']");
            sideD.on("change", function(){
                chairmat.sides[3] = sideD.val();
            });
            const sideE = $("[name='properties[Side E]']");
            sideE.on("change", function(){
                chairmat.sides[4] = sideE.val();
            });
            const sideF = $("[name='properties[Side F]']");
            sideF.on("change", function(){
                chairmat.sides[5] = sideF.val();
                console.log(chairmat);
            });

            const submitButton = document.getElementById("AddToCart-product-template");
            const userPrompt = document.getElementById("validate-script-user-prompt");

            /*Pull product tags from hidden elements with class name ["product-tag-handle"]
            and parses them into two axis dimension for the mat [axisDimensions] */
            let tags = document.getElementsByClassName("product-tag-handle");
            let tagsArray = [];
            for(let i=0;i<tags.length;i++) {
                tagsArray.push(tags[i].textContent);
            }
            let tagsString = tagsArray.join("");
            let pendingAxisDimensions = tagsString.match(/[0-9][0-9]x[0-9][0-9]/);
            const axesDimensions = pendingAxisDimensions[0].split("x");

            //Initialize Chairmat Object
            const chairmat = {
                isSquare: false,
                largeAxisMax: "",
                smallAxisMax: "",
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
            };
            chairmat.determineAxes(axesDimensions);

            function evaluateChairmatDimensions(chairmat) {

            }

        }, 5000);
    });
})();