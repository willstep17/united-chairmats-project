VIG.registerSelectChange = function()
{
    //get all select elements and check options for values
    var variantIDs = Object.keys(VIG.variants);
    var selects = $('select');

    //find the select element which contains the variant ids as values
    //this should be available in every addtocart form, since the variant id
    //is needed to put the item into the cart
    var variantSelect = findVariantSelect(variantIDs,selects);

    //if found monitor the select element for value changes
    //unfortunately the jQuery val() function which is used by most themes to change the
    //value of the hidden select field doesn't trigger the change event
    //so we have to check very 500ms and compare the values, this is the not so
    //elegant part.

    if(variantSelect != undefined)
        console.log("variantSelect found. Registering change event.");
        var lastVal = variantSelect.val();

        VIG.triggerInterval = setInterval(function() {
            var newVal = variantSelect.val();
            if(newVal !== lastVal) {
                // it changed, fire an event or process it
                variant = {id:newVal};
                console.log('Variant changed!!!');


                //if the value has changed, trigger our event
                $(document).trigger({
                    type: 'variantImageChange',
                    variant: variant,
                    internalVIPTrigger: true
                });
            }
            lastVal = newVal;
        }, 500);

    }
}


var findVariantSelect = function(variantIDs,selects) {
    var variantSelect = undefined;

    selects.each(function(index,element){
        var options = $(element).children('option'),
            isVariantSelect = false;

        options.each(function(index,element){
            if(variantIDs.includes($(element).val())) {
                isVariantSelect = true;
            }
        });
        if(isVariantSelect) {
            variantSelect = $(element);
        }
    });
    return variantSelect;
}