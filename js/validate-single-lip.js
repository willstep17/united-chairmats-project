(function(){
    "use strict";

    $(document).ready( function(){
        setTimeout(function(){

            const submitButton = $("#AddToCart-product-template");
            const userPrompt = $("#validate-script-user-prompt");

            /*Pull product tags from hidden elements with class name ["product-tag-handle"]
            and parses them into two axis dimension for the mat [axisDimensions] */
            let tags = $(".product-tag-handle");
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
                    "","","","","","","","","",
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

            const sideA = $("[name='properties[Side A]']");
            chairmat.sides[0] = sideA.val();
            sideA.on("change", function(){
                chairmat.sides[0] = sideA.val();
                evaluateChairmatDimensions(chairmat);
            });
            const sideB = $("[name='properties[Side B]']");
            chairmat.sides[1] = sideB.val();
            sideB.on("change", function(){
                chairmat.sides[1] = sideB.val();
                evaluateChairmatDimensions(chairmat);
            });
            const sideC = $("[name='properties[Side C]']");
            chairmat.sides[2] = sideC.val();
            sideC.on("change", function(){
                chairmat.sides[2] = sideC.val();
                evaluateChairmatDimensions(chairmat);
            });
            const sideD = $("[name='properties[Side D]']");
            chairmat.sides[3] = sideD.val();
            sideD.on("change", function(){
                chairmat.sides[3] = sideD.val();
                evaluateChairmatDimensions(chairmat);
            });
            const sideE = $("[name='properties[Side E]']");
            chairmat.sides[4] = sideE.val();
            sideE.on("change", function(){
                chairmat.sides[4] = sideE.val();
                evaluateChairmatDimensions(chairmat);
            });
            const sideF = $("[name='properties[Side F]']");
            chairmat.sides[5] = sideF.val();
            sideF.on("change", function(){
                chairmat.sides[5] = sideF.val();
                evaluateChairmatDimensions(chairmat);
            });
            const sideG = $("[name='properties[Side G]']");
            chairmat.sides[6] = sideG.val();
            sideG.on("change", function(){
                chairmat.sides[6] = sideG.val();
                evaluateChairmatDimensions(chairmat);
            });
            const sideH = $("[name='properties[Side H]']");
            chairmat.sides[7] = sideH.val();
            sideH.on("change", function(){
                chairmat.sides[7] = sideH.val();
                evaluateChairmatDimensions(chairmat);
            });
            const sideI = $("[name='properties[Side I]']");
            chairmat.sides[8] = sideI.val();
            sideI.on("change", function(){
                chairmat.sides[8] = sideI.val();
                evaluateChairmatDimensions(chairmat);
            });


            function evaluateChairmatDimensions(inputChairmat) {
                for(let i=0;i<inputChairmat.sides.length;i++) {
                    if(inputChairmat.sides[i] === "") {
                        return;
                    }
                }
                submitButton.attr("disabled", true);
                let HTMLString = '';
                if(!chairmat.isSquare) {
                    if(parseInt(chairmat.sides[0]) > parseInt(chairmat.smallAxisMax) &&
                        parseInt(chairmat.sides[1]) > parseInt(chairmat.smallAxisMax)) {
                        userPrompt.empty();
                        HTMLString = "<p style='color: red; font-weight: bold;'>Side A and B cannot both be larger than " + chairmat.smallAxisMax + ".</p><br />" +
                        "<p></p>";
                        userPrompt.append(HTMLString);
                        return;
                    }
                }
                if(parseInt(chairmat.sides[6]) + parseInt(chairmat.sides[8]) !== parseInt(chairmat.sides[0])) {
                    userPrompt.empty();
                    HTMLString = "<p style='color: red; font-weight: bold;'>The sum of Side G + Side I must equal the measurement of Side A</p>" +
                        "<p>Currently: </p>" +
                        "<p>Side G (" + chairmat.sides[6] + ") + Side I (" + chairmat.sides[8] + ") = " +
                        (parseInt(chairmat.sides[6]) + parseInt(chairmat.sides[8])) + "</p>" +
                        "<p>Side A = " + chairmat.sides[0] + "</p><br />";
                    userPrompt.append(HTMLString);
                    return;
                }
                if(parseInt(chairmat.sides[2]) + parseInt(chairmat.sides[4]) !== parseInt(chairmat.sides[6]) + parseInt(chairmat.sides[8])) {
                    userPrompt.empty();
                    HTMLString = "<p style='color: red; font-weight: bold;'>The sum of Side C + Side E must equal the sum of Side G + Side I</p>" +
                        "<p>Currently: </p>" +
                        "<p>Side C (" + chairmat.sides[2] + ") + Side E (" + chairmat.sides[4] + ") = " +
                        (parseInt(chairmat.sides[2]) + parseInt(chairmat.sides[4])) + "</p>" +
                        "<p>Side G (" + chairmat.sides[6] + ") + Side I (" + chairmat.sides[8] + ") = " +
                        (parseInt(chairmat.sides[6]) + parseInt(chairmat.sides[8])) + "</p><br />";
                    userPrompt.append(HTMLString);
                    return;
                }
                if(parseInt(chairmat.sides[6]) + parseInt(chairmat.sides[8]) !== parseInt(chairmat.sides[0])) {
                    userPrompt.empty();
                    HTMLString = "<p style='color: red; font-weight: bold;'>The sum of Side G + Side I must equal the measurement of Side A</p>" +
                        "<p>Currently: </p>" +
                        "<p>Side B = " + chairmat.sides[0] + "</p>" +
                        "<p>Side G (" + chairmat.sides[6] + ") + Side I (" + chairmat.sides[8] + ") = " +
                        (parseInt(chairmat.sides[6]) + parseInt(chairmat.sides[8])) + "</p><br />";
                    userPrompt.append(HTMLString);
                    return;
                }
                userPrompt.empty();
                submitButton.attr("disabled", false);
            }

        }, 5000);
    });
})();