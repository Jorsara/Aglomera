$(document).ready(function() {
    // Buscar parametros
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const local = urlParams.get('local');

    // Definir local
    $.getJSON("../lugares.json", function(json) {          
        // Establecer resultado
        let result = json.filter(obj => {
            return obj.cadena.toLowerCase().includes(local.toLowerCase());
        });
        console.log(result);           
       
        const result2 = [];
        const map = new Map();
        for (const item of result) {
            if(!map.has(item.cadena)){
                map.set(item.cadena, true);    // set any value to Map
                result2.push({
                    cadena: item.cadena,
                    imagen_logo: item.imagen_logo
                });
            }
        }
        console.log(result2);

        // Mostrar mensaje de error
        if(result.length===0){
            $('#busqueda-error').addClass('activar');
        }

        // Modificar html segun resultado
        result2.forEach(e => {
            $('.locacion-cont').append(`
                <div class="locacion-item">
                    <img src="img/${e.imagen_logo}" />
                    <h4>${e.cadena}</h4>
                    <a href="/local.html?id=${e.cadena}" class="btn btn-primary">Ver local</a>
                </div>    
            `);
        });
    });
});
