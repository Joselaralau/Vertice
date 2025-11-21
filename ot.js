// JSFormValidation.js
/*
 * Run init() after the page is loaded
 */
window.onload = init;

/*
 * Initialization
 */
function init() {
   // Bind "onsubmit" event handler to the "submit" button
	  // document.getElementById("idForma").onsubmit = validaForma;
	   // Bind "onclick" event handler to "reset" button
	   //document.getElementById("idCancelar").onclick = fRegresaIndex;
	   // Set initial focus
	  // document.getElementById("idNombre").focus();
}
 
/*
 * The "onsubmit" event handler to validate the input fields.
 *
 * Most of the input validation functions take 3 arguments:
 *   inputElm: Input element to be validated.
 *   errMsg: the error message to be displayed if validation fails.
 *   errElm: to place the error message
 *
 * @param theForm: the form to be validated
 */
function validaForma(laForma) {
   with(laForma) {
      // return false would prevent default submission
      estaOK=(isNotEmpty(idNombre, "Nombre vacio!", elmError));
   }
    if (estaOK==true)
   {
   	return (true);
   }
   else
   {
   	return (false);
   }
}

     	//&& isNotEmpty(idApellido, "Apellido vacio!", elmError)
      //&& isNumeric(idEdad, "Edad inválida!", elmError) 

 
/*
 * Helper function, to be called after validation, to show or clear
 *   existing error message, and to set focus to the input element
 *   for correcting error.
 * If isValid is false, show the errMsg on errElm, and place the
 *   focus on the inputElm for correcting the error.
 * Else, clear previous errMsg on errElm, if any.
 *
 * @param isValid (boolean): flag indicating the result of validation
 * @param errMsg (string)(optional): error message
 * @param errElm (object)(optional): if isValid is false, show errMsg; else, clear.
 * @param inputElm (object)(optional): set focus to this element,
 *        if isValid is false
 */
function postValidate(isValid, errMsg, errElm, inputElm) {
   if (!isValid) {
      // Show errMsg on errElm, if provided.
      if (errElm !== undefined && errElm !== null
            && errMsg !== undefined && errMsg !== null) {
         errElm.innerHTML = errMsg;
      }
      // Set focus on Input Element for correcting error, if provided.
      if (inputElm !== undefined && inputElm !== null) {
         inputElm.classList.add("errorBox");  // Add class for styling
         inputElm.focus();
      }
   } else {
      // Clear previous error message on errElm, if provided.
      if (errElm !== undefined && errElm !== null) {
         errElm.innerHTML = "";
      }
      if (inputElm !== undefined && inputElm !== null) {
         inputElm.classList.remove("errorBox");
      }
   }
}
 
/*
 * Validate that input value is not empty.
 *
 * @param inputElm (object): input element
 * @param errMsg (string): error message
 * @param errElm (object): element to place error message
 */
function isNotEmpty(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim() !== "");
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
/* Validate that input value contains one or more digits */
function isNumeric(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim().match(/^\d+$/) !== null);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
/* Validate that input value contains only one or more letters */
function isAlphabetic(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim().match(/^[a-zA-Z]+$/) !== null) ;
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
/* Validate that input value contains one or more digits or letters */
function isAlphanumeric(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim().match(/^[0-9a-zA-Z]+$/) !== null);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
/* Validate that input value length is between minLength and maxLength */
function isLengthMinMax(inputElm, minLength, maxLength, errMsg, errElm) {
   var inputValue = inputElm.value.trim();
   var isValid = (inputValue.length >= minLength) && (inputValue.length <= maxLength);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
 
/*
 * Validate that a selection is made (not default of "") in <select> input
 *
 * @param selectElm (object): the <select> element
 */
function isSelected(selectElm, errMsg, errElm) {
   // You need to set the default value of <select>'s <option> to "".
   var isValid = (selectElm.value !== "");   // value in selected <option>
   postValidate(isValid, errMsg, errElm, selectElm);
   return isValid;
}
 
/*
 * Validate that one of the checkboxes or radio buttons is checked.
 * Checkbox and radio are based on name attribute, not id.
 *
 * @param inputName (string): name attribute of the checkbox or radio
 */
function isChecked(inputName, errMsg, errElm) {
   var elms = document.getElementsByName(inputName);
   var isChecked = false;
   for (var i = 0; i < elms.length; ++i) {
      if (elms[i].checked) {
         isChecked = true;
         break;
      }
   }
   postValidate(isChecked, errMsg, errElm, null);  // no focus element
   return isChecked;
}
 
// Validate password, 6-8 characters of [a-zA-Z0-9_]
function isValidPassword(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim().match(/^\w{6,8}$/) !== null);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}
 
// Verify password.
function verifyPassword(pwElm, pwVerifiedElm, errMsg, errElm) {
   var isTheSame = (pwElm.value === pwVerifiedElm.value);
   postValidate(isTheSame, errMsg, errElm, pwVerifiedElm);
   return isTheSame;
}
 
/*
 * The "onclick" handler for the "reset" button to clear the display,
 * including the previous error messages and error box.
 */
function clearForm() {
   // Remove class "errorBox" from input elements
   var elms = document.querySelectorAll('.errorBox');  // class
   for (var i = 0; i < elms.length; i++) {
      elms[i].classList.remove("errorBox");
   }
 
   // Remove previous error messages
   elms = document.querySelectorAll('[id$="Error"]');  // id ends with Error
   for (var i = 0; i < elms.length; i++) {
      elms[i].innerHTML = "";
   }
 
   // Set initial focus
   document.getElementById("idNombre").focus();
}

function rellenaCampos(nId){
if (nId=0){
	//Los campos son vacios para llenar un nuevo registro
	nId=0;
}else{
	// Los campos se llenan con el contenido de un registro almacenado

}
}
function fRegresaIndex() {
    window.location.href="index.php";
  }
function creaNuevoRegistro()
{
	console.log("Inicia crear registro");
	

}

/*


<script type="text/javascript">
var nIdxArmazon=0;
var nIdxTratamiento=0;
var nIdxMaterial=0;
var nIdxVision=0;
var nIdxSerie=0;
var nIdxOtros=0;
var nTotal=0;
var nDesc=1;

$("input[data-type='currency']").on({
    'change keydown paste input onmouseup': function() {
      formatCurrency($(this));
    },
    blur: function() { 
      formatCurrency($(this), "blur");
    }
});


function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function camBio(){
	console.log("entro a cambio");
}

function formatCurrency(input, blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  
  // get input value
  var input_val = input.val();
  
  // don't validate empty input
  if (input_val === "") { return; }
  
  // original length
  var original_len = input_val.length;

  // initial caret position 
  var caret_pos = input.prop("selectionStart");
    
  // check for decimal
  if (input_val.indexOf(".") >= 0) {

    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);
    
    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }
    
    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "$" + left_side + "." + right_side;

  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "$" + input_val;
    
    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }
  
  // send updated string to input
  input.val(input_val);

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input[0].setSelectionRange(caret_pos, caret_pos);
}

$(".clDesc").change(function(){
        var sDesc = $(".clDesc:checked").val();
        nDesc=Number(sDesc);
        fCambiaPrecio("a");
        //alert(sDesc);

   });
function ready0(){
   //Inicializacion de componentes convierte select a select2
   
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
   $('.selectFiltro').select2({placeholder: "Elige",allowClear: true,width:"resolve"});



   //Deshabilita los controles que se pueden activas hasta que suceda lo necesario y establece los valores iniciales
   $("#lIdArmazon").val(0);

}; //Fin de ready0

function fCambiaPrecio(a){
ar=$('#lIdArmazon :selected').text().split(",");
a1=Number.isInteger(parseInt(ar[1]))?parseInt(ar[1]):0;
ar=$('#lIdMaterial :selected').text().split(",");
a2=Number.isInteger(parseInt(ar[1]))?parseInt(ar[1]):0;
ar=$('#lIdTratamiento :selected').text().split(",");
a3=Number.isInteger(parseInt(ar[1]))?parseInt(ar[1]):0;
ar=$('#lIdVision :selected').text().split(",");
a4=Number.isInteger(parseInt(ar[1]))?parseInt(ar[1]):0;
ar=$('#lIdSerie :selected').text().split(",");
a5=Number.isInteger(parseInt(ar[1]))?parseInt(ar[1]):0;
ar=$('#lIdOtros :selected').text().split(",");
a6=Number.isInteger(parseInt(ar[1]))?parseInt(ar[1]):0;
var nTotal = (a1+a2+a3+a4+a5+a6)*nDesc;
document.getElementById("currency-field").value= nTotal;
formatCurrency($('#currency-field'));
 }
$(document).ready(ready0);
*/
