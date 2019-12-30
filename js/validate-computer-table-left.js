(function(){

    /* submitButton constant */
    const submitButton = document.getElementById("AddToCart-product-template");

    /*Pull product tags from hidden elements with class name ["product-tag-handle"]
    and parses them into two axis dimension for the mat [axisDimensions] */
    let tags = document.getElementsByClassName("product-tag-handle");
    let tagsArray = [];
    for(let i=0;i<tags.length;i++){
        tagsArray.push(tags[i].textContent);
    };
    let tagsString = tagsArray.join("");
    let pendingAxisDimensions = tagsString.match(/[0-9][0-9]x[0-9][0-9]/);
    const axisDimensions = pendingAxisDimensions[0].split("x");

    console.log(axisDimensions);

    console.log("Hello from validate-computer-table-left.js");

}());