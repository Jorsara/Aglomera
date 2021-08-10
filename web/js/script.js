$(document).ready(function() {
    $("#buscador").keyup(function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {            
            window.location.href = `busqueda.html?local=${document.getElementById('buscador').value}`
        }
    });
});