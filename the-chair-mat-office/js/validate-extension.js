(function(){
    "use strict";
    $(document).ready( function(){
        setTimeout(function(){

            const submitButton = $("#AddToCart");

            const userPrompt = $("#validate-user-prompt");

            /*Pull product tags from hidden elements with class name ["product-tag-handle"]
            and parses them into two axis dimension for the mat [axisDimensions] */
            let tags = $(".product-tag-handle");
            let tagsArray = [];
            for(let i=0;i<tags.length;i++) {
                tagsArray.push(tags[i].textContent);
            }
            let tagsString = tagsArray.join("");
            let pendingAxisDimensions = tagsString.match(/[0-9][0-9]X[0-9][0-9]/);
            const axesDimensions = pendingAxisDimensions[0].split("X");

            //Initialize Chairmat Object
            const chairmat = {
                isSquare: false,
                largeAxisMax: "",
                smallAxisMax: "",
                sides: [
                    null, null, null, null, null, null,
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

            function evaluateChairmatDimensions(inputChairmat) {
                for(let i=0;i<inputChairmat.sides.length;i++) {
                    if(inputChairmat.sides[i] === null) {
                        return;
                    }
                }
                $(".required").removeClass("validation_error");
                let errorMessage = generateErrorMessage(inputChairmat);
                submitButton.attr("disabled", true);
                let HTMLString = '';
                if(!inputChairmat.isSquare) {
                    if(parseInt(inputChairmat.sides[0]) > parseInt(inputChairmat.smallAxisMax) &&
                        parseInt(inputChairmat.sides[1]) > parseInt(inputChairmat.smallAxisMax)) {
                        userPrompt.empty();
                        HTMLString = "<div class='error-box'>" +
                            "<p>Thanks for filling out your measurements! We noticed the overall dimensions of your mat are larger than the " +
                            "sheet size you selected.  You can either change your measurements to fit within a " + inputChairmat.smallAxisMax + " X " + inputChairmat.largeAxisMax +
                            " size sheet or, if available, use the same measurements on a larger sheet of raw material.</p>" +
                            "<h3 class='error-heading'>Sides A and B cannot both be larger than " + inputChairmat.smallAxisMax + ".</h3><br />" +
                            "<p></p></div>";
                        userPrompt.append(HTMLString);
                        return;
                    }
                }
                if(parseInt(inputChairmat.sides[2]) + parseInt(inputChairmat.sides[4]) !== parseInt(inputChairmat.sides[1])) {
                    userPrompt.empty();
                    HTMLString = "<div class='error-box'>" +
                        errorMessage +
                        "<h3 class='error-heading'>The sum of Side C + Side E must equal the measurement of Side B</h3>" +
                        "<h3>Currently: </h3>" +
                        "<h3>Side C (" + inputChairmat.sides[2] + ") + Side E (" + inputChairmat.sides[4] + ") = <b>" +
                        (parseInt(inputChairmat.sides[2]) + parseInt(inputChairmat.sides[4])) + "</b></h3>" +
                        "<h3>Side B = <b>" + inputChairmat.sides[1] + "</b></h3></div>";
                    userPrompt.append(HTMLString);
                    return;
                }
                if(parseInt(inputChairmat.sides[3]) + parseInt(inputChairmat.sides[5]) !== parseInt(inputChairmat.sides[0])) {
                    userPrompt.empty();
                    HTMLString = "<div class='error-box'>" +
                        errorMessage +
                        "<h3 class='error-heading'>The sum of Side D + Side F must equal the measurement of Side A</h3>" +
                        "<h3>Currently: </h3>" +
                        "<h3>Side D (" + inputChairmat.sides[3] + ") + Side F (" + inputChairmat.sides[5] + ") = <b>" +
                        (parseInt(inputChairmat.sides[3]) + parseInt(inputChairmat.sides[5])) + "</b></h3>" +
                        "<h3>Side A = <b>" + inputChairmat.sides[0] + "</b></h3></div>";
                    userPrompt.append(HTMLString);
                    return;
                }
                userPrompt.empty();
                submitButton.attr("disabled", false);
            }

            //Generates plural or singular error message for side matching
            function generateErrorMessage(inputChairmat) {
                let numberOfErrors = 0;
                if(parseInt(inputChairmat.sides[2]) + parseInt(inputChairmat.sides[4]) !== parseInt(inputChairmat.sides[1])) {
                    numberOfErrors++;
                }
                if(parseInt(inputChairmat.sides[3]) + parseInt(inputChairmat.sides[5]) !== parseInt(inputChairmat.sides[0])) {
                    numberOfErrors++;
                }
                if(numberOfErrors <= 1) {
                    return "<p>Thanks for filling out your measurements! You're almost done, but <b>before we can activate the cart button</b>, we need your help to fix an error " +
                        "that we noticed. <b>Some of your measurements don't add up properly</b>. Please review the guidance below and update your measurements. Once you're done this " +
                        "message will disappear and the cart button will be activated.</p>"
                } else {
                    return "<p>Thanks for filling out your measurements! You're almost done, but <b>before we can activate the cart button</b>, we need your help to fix a few errors that we " +
                        "noticed. <b>Some of your measurements don't add up properly</b>. We started with the most critical error first. Please review the guidance below and update your measurements. " +
                        "Once you've fixed this error the next one will appear below. After you fix them all the cart button will activate.</p>"
                }
            }

        }, 5000);
    });
})();