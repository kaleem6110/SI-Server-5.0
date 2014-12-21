// Confirm Dialog using  Window JS


function openConfirmDialog(data2Show, typeName) {
    Dialog.confirm("<center>"+data2Show +"</center>", 
                {windowParameters: {width:300, height:100}, okLabel: MSG_YES, cancelLabel: MSG_NO, 
                    onOk:function(win){
                            if(typeName == 'update'){
                                updateDS();
                            }else if(typeName == 'delete'){
                                deleteDS();
                            }                                   
                        },
                    cancel:function(win) {return false},
                    ok:function(win) { return true}
                });
}

//Alert Dialog using Window Js
function openAlertDialog(data2Show) {
        Dialog.alert(data2Show, 
            {windowParameters: {top:100,left:800}, okLabel: '+MSG_OK+', 
                ok:function(win) { return true}
            });
    }

function openDialog() {
        Dialog.alert(MSG_LOADING+'<center><img src="/SIServer/images/portal/indicator.gif"></center>', 
            {windowParameters: {top:400,left:400}, okLabel: "",width:400,height:100, 
                ok:function(win) { return true}
            });
    
    Dialog.closeInfo(); 
    }

var timeout ;
function waitDialog(data2Show){
        Dialog.info("<center><font color='gray'>"+MSG_WAIT+"</font>",
                        {windowParameters: {width:300, height:100},  showProgress: true,top:300,left:450});
    timeout=3;
//  infoTimeout();
    // setTimeout("infoTimeout()", 1000)
}


function waitDone(){
    
    /*while(timeout > 0){
        timeout--;
        waitDone();
    }  */
     Dialog.closeInfo();
}

function infoTimeout() {
      timeout--;
      if (timeout >0) {
        Dialog.setInfoMessage("Test of info panel, it will close <br>in " + timeout + "s ...")
        //infoTimeout();
  //        setTimeout("infoTimeout()", 1000)
    }
      else
        Dialog.closeInfo()
    }

    dojo.require("dijit.Dialog");

    var progressDlg;
    var emptyDlg;
    var promptDlg;
	 var  confDtls;
    dojo.addOnLoad(function(){
        // create the dialog:
        progressDlg = new dijit.Dialog({
            title:'+MSG_LOADING+',
            style: "width: 450px;height:150px"
        }); 
        
        emptyDlg = new dijit.Dialog({
    	title: '+MSG_LOADING+',
            style: "width: 300px;height:auto"
        });
         
        promptDlg = new dijit.Dialog({
            title: '+MSG_LOADING+',
            style: "width: 400px;height:200px"
        }); 
        
	    confDtls = new dijit.Dialog({
	    	title:'+MSG_LOADING+',
	    	style: "width: 350px;height:125px"
        }); 

    });
   
    function showProgressDialog(data2Display, dialogTitle){
        // set the content of the dialog:
        if(progressDlg != null) {
            progressDlg.attr("title",  dialogTitle);
            progressDlg.attr("content", "<center><table ><tr><td align=center><img src='/SIServer/images/portal/loading.gif' /></tr><tr><td align='center'>"+data2Display+"</td></tr></table></center>");
            progressDlg.show();
        }
    }

    function hideProgressDialog(){
        if(progressDlg != null) {
            progressDlg.hide();
        }
    }

	function showEmptyDialog(data2Display, dialogTitle){
        // set the content of the dialog:
        if(emptyDlg != null) {          
            emptyDlg.attr("title",  dialogTitle);
            emptyDlg.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+data2Display+"</td></tr><tr><td align='center'>    <button dojoType=dijit.form.Button type='submit'>"+ MSG_OK+"</button></td></td></tr></table></center>");
            emptyDlg.show();
        }
    }
	
	function showEmptyDialogBoxEvent(data2Display, dialogTitle, buttonLabel,onclick ){
        // set the content of the dialog along with the button label:
			if(!onclick){
			onclick =""; 
			}
	  if(emptyDlg != null) {          
            emptyDlg.attr("title",  dialogTitle);
            emptyDlg.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+data2Display+"</td></tr><tr><td align='center'>    <button dojoType=dijit.form.Button type='submit' onClick='"+onclick+"'>"+ buttonLabel +"</button></td></td></tr></table></center>");
            emptyDlg.show();
        }
    }
	
	
	function showEmptyDialogBox(data2Display, dialogTitle, buttonLabel){
        // set the content of the dialog along with the button label:
        if(emptyDlg != null) {          
            emptyDlg.attr("title",  dialogTitle);
            emptyDlg.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+data2Display+"</td></tr><tr><td align='center'>    <button dojoType=dijit.form.Button type='submit'>"+ buttonLabel +"</button></td></td></tr></table></center>");
            emptyDlg.show();
        }
    }

    function hideEmptyDialog(){
        if(emptyDlg != null) {
            emptyDlg.hide();
        }
    }


    function showPromptDialog(data2Display, dialogTitle){
        
        // set the content of the dialog:
        if(promptDlg != null) {         
            promptDlg.attr("title",  dialogTitle);
            promptDlg.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+data2Display+"</td></tr><tr><td>Name:  <input type='text'  id='jobName' name='jobName'  class='medium1'   dojoType='dijit.form.ValidationTextBox' required='true' trim='true' ucfirst='true'  />  </td></tr><tr><td align='center'>  <input type='button' id='yes' value='Yes' onclick=\"hidePromptDialog();createTable(dojo.byId('jobName'))\"></input><button dojoType='dijit.form.Button' type='button' id='no' onclick='hidePromptDialog()'>No</button></td></td></tr></table></center>");
            promptDlg.show();
        }
    }

    function hidePromptDialog(){
        if(promptDlg != null) {
            promptDlg.hide();
        }
        try{
            ge.getWindow().setVisibility(true);
        }catch(er){}
    }

    function showCategoryManagerDialog(){       
        // set the content of the dialog:
		 uploadDlgEcoMap = new dijit.Dialog({
            title: MSG_LOADING,
            style: "width: 480px;height:480px"          
        }); 
        if(uploadDlgEcoMap != null) {
            uploadDlgEcoMap.attr("title",  MSG_CATEGORYMANAGER);            
			
            uploadDlgEcoMap.attr("content", "<iframe src='/SIServer/categoryManagerAction.do?operation=onLoad'  frameborder='1' scrolling='no' width='435px' height='425px'/>");
			
            uploadDlgEcoMap.show();
        }
    }   
	
	 function hideCategoryManager(){
        if(uploadDlgEcoMap != null) {         
            uploadDlgEcoMap.hide();
        }		
    }


   function confirmationDialog(data2Display){
	  var  dialogTitle = POPUP_ALERT;
       // set the content of the dialog:
        if(confDtls != null) { 
            confDtls.attr("title",  dialogTitle);
            confDtls.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+data2Display+"</td></tr><tr><td align='center'>  <button dojoType='dijit.form.Button' onClick='dodelete()' type='button'>Yes</button> <button dojoType='dijit.form.Button' onClick='confDtls.hide()' type='button'>No</button></td></td></tr></table></center>");
            confDtls.show();
           }
		}
		
	function openLangConfirmationDialog(data2Show) {
		var  dialogTitle = POPUP_ALERT;
		if(confDtls != null) { 
			confDtls.attr("title",  dialogTitle);
            confDtls.attr("content", "<center><table ><tr><td align=center></tr><tr><td align='center'>"+data2Show+"</td></tr><tr><td align='center'>  <button dojoType='dijit.form.Button' onClick='submitHandler()' type='button'>Yes</button> <button dojoType='dijit.form.Button' onClick='confDtls.hide()' type='button'>No</button></td></td></tr></table></center>");
            confDtls.show();
		}
}