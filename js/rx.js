// JSFormValidation.js
/*
 * Run init() after the page is loaded
 */
 esto es un error;
 esto es otro errer
window.onload = init;

/*
 * Initialization
 */
function init() {
   // Bind "onsubmit" event handler to the "submit" button
	   document.getElementById("idForma").onsubmit = validaForma;
	   document.getElementById("idNombre").focus();
}
 
function validaForma(laForma) {
   alert("Dentro de validaForma");
   with(laForma) {
      // return false would prevent default submission
      estaOK=(isNotEmpty(idNombre, "Nombre vacio!", elmError)
     	&& isNotEmpty(idApellido, "Apellido vacio!", elmError)
      && isNumeric(idEdad, "Edad inválida!", elmError) 
      );
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
   alert("Dentro de postValidate");
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
   alert("Dentro de isNotEmpty");
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
function colectaDatos(){
	sNombre=document.getElementById("idNombre").value.trim();
	sApellido=document.getElementById("idApellido").value.trim();
	sOcupacion=document.getElementById("idOcupacion").value.trim();
	nEdad=parseInt(document.getElementById("idEdad").value.trim());
	sFecha=document.getElementById("idFecha").value.trim();
	bUsaLentes=document.getElementById("idUsadoLentes").value.trim();
	nUltimoExamen=Number(document.getElementById("idUltimoExamen").value.trim());
	bHipertension=document.getElementById("idHipertension").value.trim();
	bDiabetes=document.getElementById("idDiabetes").value.trim();
	sLensoD= document.getElementById("idLensoD").value.trim();
	sLensoI= document.getElementById("idLensoI").value.trim();
	nAVD= Number(document.getElementById("idAVD").value.trim());
	nAVI= Number(document.getElementById("idAVI").value.trim());
	nEsfD= Number(document.getElementById("idEsfD").value.trim());
	nCilD= Number(document.getElementById("idCilD").value.trim());
	nEjeD= Number(document.getElementById("idEjeD").value.trim());
	nEsfI= Number(document.getElementById("idEsfI").value.trim());
	nCilI= Number(document.getElementById("idCilI").value.trim());
	nEjeI= Number(document.getElementById("idEjeI").value.trim());
	nDIP= Number(document.getElementById("idDIP").value.trim());
	nADD= Number(document.getElementById("idAdd").value.trim());
	sNotas= document.getElementById("idNotas").value.trim();
	console.log("colectaDatos() -- Nombre:["+sNombre+"], Apellido:["+sApellido +"], ocupacion: ["+sOcupacion+"], edad["+nEdad+"], fecha["+sFecha+"],usaLentes:["+bUsaLentes+"], ultimoExamen["+nUltimoExamen+"], hipertension["+bHipertension+"], diabetes["+bDiabetes+"], lensoD["+sLensoD+"], lensoI["+sLensoI+"], AVD["+nAVD+"], AVI["+nAVI+"], esfD["+nEsfD+"], cilD["+nCilD+"], ejeD["+nEjeD+"], esfI["+nEsfI+"], cilI["+nCilI+"], ejeI["+nEjeI+"], DIP["+nDIP+"], Add["+nADD+"], Notas["+sNotas+"]");
	alert("esperar");
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

function ready0(){
   a=1;
   //Inicializacion de componentes convierte select a select2
//   $("#gradEsf").pattern="\+?(\d+(\.?((25)|(50)|(5)|(75)|(0)|(00))?$";
   

}; //Fin de ready0

$(document).ready(ready0);

