(function(){

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

    console.log(submitButton);
    console.log(userPrompt);
    console.log(chairmat);
    console.log("Hello from validate-extension-left.js");

}());