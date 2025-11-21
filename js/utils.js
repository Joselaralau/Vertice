function filtraTabla()
{
var busqueda = document.getElementById('filtro');
var table = document.getElementById("idTabla").tBodies[0];
buscaTabla = function(){
  texto = busqueda.value.toLowerCase();
  var r=1;
  while(row = table.rows[r++])
  {
    if ( row.innerText.toLowerCase().indexOf(texto) !== -1 )
      row.style.display = null;
    else
      row.style.display = 'none';
  }
}
busqueda.addEventListener('keyup', buscaTabla);


}
function enciendeBotones(){
     var oChk = document.getElementById('idCheckEjecuta');
  if (oChk.checked != true)
  {
    document.getElementById('idBtnNuevo').disabled=true;
    document.getElementById('idBtnEditar').disabled=true;
    document.getElementById('idBtnEliminar').disabled=true;
  }
  else{
    document.getElementById('idBtnNuevo').disabled=false;
    document.getElementById('idBtnEditar').disabled=false;
    document.getElementById('idBtnEliminar').disabled=false;
  }
}

function propSelect2(){

   $.fn.select2.defaults.set('language', 'es');
   $.fn.select2.defaults.set('matcher', function(params, data) {
      if ($.trim(params.term) === '') {
         return data;
      }
      if (typeof data.text === 'undefined') {
         return null;
      }
      var words = params.term.toUpperCase().split(" ");
      for (var i = 0; i < words.length; i++) {
         if (data.text.toUpperCase().indexOf(words[i]) < 0) {
            return null;
         }
      }
      return data;
   });
   $('.selectFiltro').select2({placeholder: "Selecciona",allowClear: true,width:"resolve"});

}