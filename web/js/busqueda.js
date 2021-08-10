$(document).ready(function() {
    // Buscar parametros
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const local = urlParams.get('local');

    // Definir local
    $.getJSON("../locales.json", function(json) {          
        // Establecer resultado
        let result = json.filter(obj => {
            return obj.nombre.toLowerCase().includes(local.toLowerCase());
        });

        // Mostrar mensaje de error
        if(result.length===0){
            $('#busqueda-error').addClass('activar');
        }

        // Modificar html segun resultado
        result.forEach(e => {
            $('.locacion-cont').append(`
                <div class="locacion-item">
                    <img src="img/${e.logo}" />
                    <h4>${e.nombre}</h4>
                    <a href="/local.html?id=${e.id}" class="btn btn-primary">Ver local</a>
                </div>    
            `);
        });
    });
});
