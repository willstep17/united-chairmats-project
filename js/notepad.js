<script
    src="https://code.jquery.com/jquery-3.4.1.slim.js"
    integrity="sha256-BTlTdQO9/fascB1drekrDVkaKd9PkwBymMlHOiG+qLI="
    crossOrigin="anonymous" defer="defer"></script>

< script >
window.onload = function () {
    if (window.jQuery) {
        // jQuery is loaded
        alert("Yeah!");
    } else {
        // jQuery is not loaded
        alert("Doesn't Work");
    }
}
</script>

// make the current product object available to the front-end app
$('body').data("current_product", {{ product | json }});

// make the currently selected variant object available to the front-end app
$('body').data("selected_variant", variant);

// hide or show form depending on which variant is selected
if ((variant.inventory_policy == 'deny') && (! variant.available)) {
    $('#myapp_container').show();
    $('#myapp_form').show();
} else {
    $('#myapp_container').hide();
}