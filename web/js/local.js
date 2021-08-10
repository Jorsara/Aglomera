$(document).ready(function() {
    // Buscar parametros
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const local = urlParams.get('id');

    // Definir local
    $.getJSON("../locales.json", function(json) {        
        // Establecer resultado
        let result = json.filter(obj => {
            return obj.id == local;
        });
        
        // Modificar html segun resultado
        $('.horarios img').attr('src', `/img/${result[0].logo}`);
        $('.horarios h4').html(result[0].nombre);
        result[0].sucursales.forEach(e => {
            let estado;
            if(e.abierto){
                estado = '<img src="img/check.png"><p>ABIERTO</p>'
            }else{
                estado = '<img src="img/check.png"><p>CERRADO</p>'
            }
            $('.horarios-cont .row').append(`
                <div class="hora-cont">
                    <div class="hora">
                        <p>${e.direccion}</p>
                        <p><img src="img/clock.png">${e.horario}</p>
                    </div>
                    <div class="estado">
                        ${estado}
                    </div>
                </div>
            `);
        });
    });
});
