		function checkValidPassword(password,encryptPassword,passwordNullAllow, isUpdateMode){
		if(password == null || password.length == 0){

		if(!passwordNullAllow){

		showEmptyDialog(MSG_REENTER_PASSWORD_SPLCH_CHECK,POPUP_ALERT);
		return false;

		}

		}


		if((password == encryptPassword) && isUpdateMode){
		return true;
		}


		if(isCharExist(password, ' ')){
		showEmptyDialog(MSG_PASSWORD_SPACE_CHECK,POPUP_ALERT);
		return false;
		}

		if(isCharExist(password, VALIDTAION_PASSWORD_CECK_TILDA)){
		showEmptyDialog(MSG_PASSWORD_SPL_CHECK,POPUP_ALERT);
		return false;
		}

		if(isAllCharactersSame(password)){
		showEmptyDialog(MSG_REPEAT_PASSWORD_CHECK,POPUP_ALERT);
		return false;
		}

		return true;
		}

		function isAllCharactersSame(str){

		if(str != null && str.length > 1){
		for(var i = 0 ; i < str.length; i++){

		var firstLoopChar = str.charAt(i);

		for(var j = 0 ; j < str.length ; j++){

		var secondLoopChar =  str.charAt(j);

		if(firstLoopChar != secondLoopChar){

		return false;

		}

		}

		}

		return true;
		}

		return false;
		}

		function isCharExist(str, charToCheck){

		if(str != null && str.length > 0){

		for(var i = 0 ; i < str.length; i++ ){

		var charAt = str.charAt(i);

		if(charAt == charToCheck){

		return true;

		}

		}

		}

		return false;

		}

		function isNotAllowCharactersExist(valueToCheck,notAllowCharacters){

		if(notAllowCharacters == null || notAllowCharacters.length <= 0){
		return false;
		}

		if(valueToCheck != null && valueToCheck.length > 0){
		for(var i = 0 ;i < notAllowCharacters.length;i++){
		if(isCharExist(valueToCheck,notAllowCharacters.charAt(i))){
		return true;
		}
		}
		return false;
		}
		} 



		function validateForUniqueName(inputNameObject, triggerMethod, callbackMethod, mode){
		var  isValidName = isSplCharInVaraible(inputNameObject.value);	
		if(!isValidName){
		document.getElementById("result").innerHTML=RESULT_INNER_HTML;			
		return false;
		}
		loadData(triggerMethod,inputNameObject.value, callbackMethod, mode);
		}

		function isSplCharInVaraible(str){
		var regex=/^[a-zA-Z0-9_]+$/; 
		if(regex.test(str)){                  
		return true; 
		}else {
		return false;
		}
		}



		function isSpecialChar(str, allowedChar) {             

		return isSpecialCharInValue(str,allowedChar);

		}


		function isSpecialCharInValue(str, allowedChar) {

		for (i=0; i < str.length; i++) {
		if (allowedChar.indexOf(str.charAt(i)) == -1)  {
		return false; 
		}
		}

		return true;

		}

		function validateSplOnTxtBox(str) {
		if(SPLON_TXTBOX == "" || SPLON_TXTBOX.length == 0)
		return true
		var allowedChar =  SPLON_TXTBOX;
		if(!isSpecialChar(str,allowedChar)){
		showEmptyDialog(MSG_SPLON_TXTBOX, POPUP_ALERT);	
		return false;
		}
		return true;

		}



		function ajaxTxtBoxSplCh(str) { 

		if(AJAX_TXTBOX_SPL_CH == "" || AJAX_TXTBOX_SPL_CH.length == 0)
		return true;
		var allowedChar =  AJAX_TXTBOX_SPL_CH;
		var validationstatus =  isSpecialChar(str,allowedChar)
		if(!validationstatus){
		showEmptyDialog(MSG_AJAX_TXTBOX_SPL_CH, POPUP_ALERT); 
		return false;
		}
		return true;

		}



		function directoryTxtBoxSplCh(str) {
		if(DIRECTORY_TXTBOXSPLCH == "" || DIRECTORY_TXTBOXSPLCH.length == 0)
		return true
		var allowedChar = DIRECTORY_TXTBOXSPLCH;
		if(!isSpecialChar(str,allowedChar)){
		showEmptyDialog(MSG_DIRECTORY_TXTBOXSPLCH, POPUP_ALERT);  
		return false;
		}
		return true;

		}



		function urlTxtBoxSplCh(str) {  
		/*if(URL_TxtBOXSPLCH == "" || URL_TxtBOXSPLCH.length == 0)
		return true
		var allowedChar =  URL_TxtBOXSPLCH;
		if(!isSpecialChar(str,allowedChar)){

		showEmptyDialog(MSG_URL_TxtBOXSPLCH, POPUP_ALERT);  
		return false;
		}
		*/
		return true;

		}


		function fileTypeSplCh(str) { 
			
		if(FILE_TYPE_SPL_CH == "" || FILE_TYPE_SPL_CH.length == 0)
		return true
		var allowedChar =  FILE_TYPE_SPL_CH;
		if(!isSpecialChar(str,allowedChar)){

		showEmptyDialog(MSG_FILE_TYPE_SPL_CH, POPUP_ALERT);  
		return false;
		}
		return true;

		}
		function validatePhoneNumber(phonevalue) {			
		if(PHONE_VALIDATION_EXP == "" || PHONE_VALIDATION_EXP.length == 0)
		return true
		if(!isSpecialChar(phonevalue,PHONE_VALIDATION_EXP) ){
		showEmptyDialog(VALIDATE_MSG_PHONENUMBER, POPUP_ALERT);  
		return false;
		}
		return true;

		}
		
		function validateServerPort(portvalue) {			
			if(!isSpecialChar(portvalue,PHONE_VALIDATION_EXP) ){
			showEmptyDialog(MSG_SERVER_PORT, POPUP_ALERT);  
			return false;
			}
			return true;

			}

		function validateServerName(name){
		/*	if(!isSpecialChar(name,VALIDATE_USER_ID) ){
			showEmptyDialog(MSG_SERVER_NAME, POPUP_ALERT);  
			return false;
			} */
			return true;

			}
		function validateServerIP(ip) {			
			if(!isSpecialChar(ip,VALIDATE_SERVER_IP) ){
			showEmptyDialog(MSG_SERVER_IP, POPUP_ALERT);  
			return false;
			}
			return true;

			}
		
		
		
		function validateZipCode(zipvalue) {		
			if(ZIP_VALIDATION_EXP == "" || ZIP_VALIDATION_EXP.length == 0)
			return true;
		
	
		
			if(!isSpecialChar(zipvalue,ZIP_VALIDATION_EXP) ){
				showEmptyDialog(VALIDATE_MSG_ZIP, POPUP_ALERT);  
				return false;
			}

						if(zipvalue.length != 0){
				if(zipvalue.length < 5  || zipvalue.length > 6){
					showEmptyDialog(VALIDATE_ZIP_SIZE,POPUP_ALERT);
					return false;
				}
			return true;
			}
			return true;
		}


		function validatePassword(passValue,passLength) {

		var result = false;

		var iChars = "";
		for (var i = 0; i < passLength; i++) {
		if (iChars.indexOf(passValue.charAt(i)) != -1)
		return false;
		}
		return true;

		}

		function validateUserId(str) {
		if(VALIDATE_USER_ID == "" || VALIDATE_USER_ID.length == 0)
		return true
		var allowedChar = VALIDATE_USER_ID;
		if(!isSpecialChar(str,allowedChar)){
		showEmptyDialog(VALIDATION_MSG_LOGINID, POPUP_ALERT);  
		return false;
		}
		return true;

		}



		function validatefilename(str) {
		VALIDATE_FILE_SPL_NAME = "'";
		if(VALIDATE_FILE_SPL_NAME == "" || VALIDATE_FILE_SPL_NAME.length == 0)
		return true
		var allowedChar = VALIDATE_FILE_SPL_NAME;
	    if (str.indexOf(VALIDATE_FILE_SPL_NAME) != -1)  {		  
		return false;
		}
		return true;

		}
		function getTimeZone(){
		 var date=new Date();
		return date.getTimezoneOffset()* (-1);
		}