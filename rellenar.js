$(document).ready(function() {

	var selectorForInsertBefore = 'div.contenedor_contenido';
	if (!$(selectorForInsertBefore).length) {
		console.log('No selector found!');
		return;
	}
	var sHTML = "<DIV width='100%' style='display: inline-table;'><TEXTAREA id='ta' rows='10' cols='25'></TEXTAREA><BUTTON id='buttonRellenar'>Rellenar</BUTTON></DIV>";
	$(sHTML).insertBefore(selectorForInsertBefore);
	
	var rellenarColumna = (aColumnas, c) => {
		if(c >= 2 && $('li.column_list').length < c){
			//todavía se está cargando la anterior columna; se intentará de nuevo dentro de unos ms
			window.setTimeout(rellenarColumna, 700, aColumnas, c);
			return;
		}
    	for(var p = 0; p <= 13; p++){
    		$buttonId = "#partido" + (p + 1) + "_" + aColumnas[c][p];
    		$($buttonId).click();
    	}
        $("#confirmarColumna").click();
        if((c + 1) < aColumnas.length){
			rellenarColumna(aColumnas, c + 1);
		}
	};
	
	$('#buttonRellenar').click(function(){
        var sPronosticos = $("#ta").val();
        var aColumnas = sPronosticos.split("\n");
        
        //pleno al 15
        var sGolesLocal = (aColumnas[0][0] == "M") ? "30" : aColumnas[0][0];
        var $buttonId = "#pleno151_" + sGolesLocal;
        $($buttonId).click();
        var sGolesVisitante = (aColumnas[0][1] == "M") ? "30" : aColumnas[0][1];
        $buttonId = "#pleno152_" + sGolesVisitante;
        $($buttonId).click();
        
        //columnas normales
        rellenarColumna(aColumnas, 1);
        /*
        for(var c=1; c<aColumnas.length; c++){
        	window.setTimeout(sPronosticosColumna => {
	        	for(var p=0; p<=13; p++){
	        		$buttonId = "#partido" + (p+1) + "_" + sPronosticosColumna[p];
	        		$($buttonId).click();
	        	}
		        $("#confirmarColumna").click();
        	}, (c-1) * 2500, aColumnas[c]);
        }
        */
        return false;
    });
});

