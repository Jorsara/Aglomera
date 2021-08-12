$(document).ready(function() {
    // Buscar parametros
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const local = urlParams.get('id');

    const horas = new Date().getHours();
    const minutos = new Date().getMinutes();
    let horasInt = horas + (minutos / 60);
    console.log(horasInt);

    // Definir local
    $.getJSON("../lugares.json", function(json) {        
        // Establecer resultado
        let result = json.filter(obj => {
            return obj.cadena == local;
        });
        let sucursales = json.filter(obj => {
            return obj.cadena.toLowerCase().includes(local.toLowerCase());
        });        
        
        // Modificar html segun resultado
        $('.horarios img').attr('src', `/img/${result[0].imagen_redonda}`);
        $('.horarios h4').html(result[0].cadena);
        $('section.horarios').attr('style', `background: url(../img/${result[0].imagen_fondo});`)
        sucursales.forEach(e => {
            let estado;
            let horaSucursalA = parseInt(e.horario[0] + e.horario[1]) + (parseInt(e.horario[3] + e.horario[4]) / 60);
            let horaSucursalC = parseInt(e.horario[6] + e.horario[7]) + (parseInt(e.horario[9] + e.horario[10]) / 60);
            let claseEstado = 'abierto';

            if(horas >= horaSucursalA && horas <= horaSucursalC){
                estado = '<img src="img/check.png"><p>ABIERTO</p>'
            }else{
                estado = '<img src="img/cerrado.png"><p>CERRADO</p>'
                claseEstado = 'cerrado';
            } 

            $('.horarios-cont .row').append(`
                <div class="hora-cont ${claseEstado}">
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
