/*
 * EcoWeb Javascript
 */

//global variables
var pageName='';
var selectedObjectName='';
var loadDBTable='';
var connectionPropsArray = new Array();
var dbDriversDtlsArray = [];
var modeType = null;            
var fileType = null;

var xmlhttpGetMsg;
function GetXmlHttpObject(){
    var objXMLHttp = null;
    if (window.XMLHttpRequest){
        objXMLHttp=new XMLHttpRequest();
    }else if (window.ActiveXObject){
        objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    return objXMLHttp;
}

/*
    Loading......Data
*/
function loadData(operation, selectedObject, callbackFunction, mode){
      modeType = mode;
	
    var url = getURL(operation, selectedObject);
    fileType =   selectedObject;
    if(url == ''){            
            return false;     
      } 
      
    xmlhttpGetMsg = GetXmlHttpObject();
      if(operation == 'TestDBConnectionStatus'){
            showProgressDialog(MSG_GETTING_DB_CON, MSG_DB_DS);
            //reset the values
            resetAllValues();
            document.getElementById('indicatorSuccess').style.display='none'; 
    }else if(operation == 'TestDatabaseConnectionStatus'){
		showProgressDialog(DB_CONN_PROGRESS, MSG_DATASOURCE);
	}

      if(operation == "getAttributeNames"){
            showProgressDialog(MSG_GETTING_ATTR, MSG_JOIN_DS);
      }
    
    xmlhttpGetMsg.onreadystatechange = callbackFunction;  
   var qryString = url.substring(url.indexOf('?')+1);
   url = url.substring(0,url.indexOf('?'));
    xmlhttpGetMsg.open("POST",url,true);
xmlhttpGetMsg.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttpGetMsg.send(qryString);     
}



function getURL(operation, selectedObject){
    var url='';
    var selectedValue;
    if(operation == 'LoadDrivers'){

        url= "EcoWebAjaxAction.do?operation="+operation;        
    }else if(operation == 'LoadDBUrl'){

        url = "EcoWebAjaxAction.do?operation="+operation+"&param1="+selectedObject.value;
    }else if(operation == 'TestDBConnectionStatus'){

           document.getElementById('indicator').style.display='';
        url = "EcoWebAjaxAction.do?operation="+operation+"&param1=Button&dbDriverName="+dijit.byId('driverName').attr('value')+"&dbUrl="+document.getElementById('dbUrl').value+
                "&dbuserId="+document.getElementById('dbuserId').value+"&dbPwd="+document.getElementById('dbPwd').value+"&dbTableQry="+document.getElementById('tableQry').value+"&dbColumnQry="+document.getElementById("columnQry").value+"&dbConType="+document.getElementById("conType").value+"&dbClass="+document.getElementById("dbClass").value;
    }else if(operation == 'UploadFile'){

        url = "EcoWebAjaxAction.do?operation="+operation+"&param1=Button&fileName="+document.getElementById(selectedObject).value;
    }else if(operation == 'LoadValues'){

        url = "EcoWebAjaxAction.do?operation="+operation+"&param1=Button&fileName="+selectedObject;
    }else if(operation == 'loadExcelValues'){

        url = "EcoWebAjaxAction.do?operation="+operation+"&param1=Button&fileName="+selectedObject.value;
    }else if(operation == 'loadExcelValues1'){

            try {
                  url = "EcoWebAjaxAction.do?operation=loadExcelValues&param1=Button&fileName="+selectedObject.fileInput.value;  
            }catch (err) {}        
    }else if(operation == 'LoadFileData'){

        url = "EcoWebAjaxAction.do?operation=UploadFile&param1=Button&fileName="+document.getElementById(selectedObject).value;
    }else if(operation  == 'LoadDBColumns' && selectedObject.value != ''){

                  if(selectedObject.value != ''){
                        dijit.byId('runQry').setAttribute('disabled', true);
                        dijit.byId('query').setAttribute('disabled', true);
                  }else{
                        dijit.byId('runQry').setAttribute('disabled', false);
                        dijit.byId('query').setAttribute('disabled', false);
                  }
                 viewColumns(true);
        url = "EcoWebAjaxAction.do?operation=LoadDBColumns&param1=Button&dbDriverName="+dijit.byId('driverName').attr('value')+"&dbUrl="+document.getElementById('dbUrl').value+
                  "&dbuserId="+document.getElementById('dbuserId').value+"&dbPwd="+document.getElementById('dbPwd').value+'&tableName='+selectedObject.value+"&dbTableQry="+document.getElementById('tableQry').value+"&dbColumnQry="+document.getElementById("columnQry").value+"&dbConType="+document.getElementById("conType").value+"&dbClass="+document.getElementById("dbClass").value;
    }else if(operation  == 'LoadDBColumnsQry' && dijit.byId('query').value != ''){

                  if(selectedObject.value == ''){
                        dijit.byId('tableName').setAttribute('disabled', false);
                  }else{
                        dijit.byId('tableName').setAttribute('disabled', true);     
                  }
                  viewColumns(true);
          url = "EcoWebAjaxAction.do?operation=LoadDBColumnsQry&param1=Button&dbDriverName="+dijit.byId('driverName').attr('value')+"&dbUrl="+document.getElementById('dbUrl').value+
                  "&dbuserId="+document.getElementById('dbuserId').value+"&dbPwd="+document.getElementById('dbPwd').value+'&tableName='+selectedObject.value+"&dbTableQry="+document.getElementById('tableQry').value+"&dbColumnQry="+dijit.byId('query').value+"&dbConType="+document.getElementById("conType").value+"&dbClass="+document.getElementById("dbClass").value;
    }else if(operation  == 'CheckDatasourceName'){

        url = "EcoWebAjaxAction.do?operation=CheckDatasourceName&param1=Button&datasourceName="+selectedObject.value;
    }if(operation  == 'CheckJ2eeDatasourceName'){

        url = "EcoWebAjaxAction.do?operation=CheckJ2eeDatasourceName&param1=Button&datasourceName="+selectedObject.value;
    }
	else if(operation  == 'rssFeedLoad'){
		
        if((document.getElementById('rssfeedUrl').value=="")||((document.getElementById('rssfeedUrl').value).length<=0))
            {
				showEmptyDialog(MSG_URL_REQUIRED, CAPTION_ALERT);	
                
                return false;
            }
        else
                url = "EcoWebAjaxAction.do?operation="+operation+"&param1=Button&rssfeedUrl="+encodeURIComponent(document.getElementById('rssfeedUrl').value);                                                
                //url = "EcoWebAjaxAction.do?operation="+operation+"&param1=Button&rssfeedUrl="+document.getElementById('rssfeedUrl').value;
    }else if(operation == 'LoadFilePaths'){
           	if(selectedObject == '.shp'){
          		  showProgressDialog(MSG_GETTING_FILENAMES, "Getting Shape Files..");
			}else{
			      showProgressDialog(MSG_GETTING_FILENAMES, MSG_EXCEL_FILE);
			}
        url = "EcoWebAjaxAction.do?operation=LoadFilePaths&param1=Button&fileExtensions="+selectedObject;  
    }else if ( operation == 'loadHibernateData'){
		
      url = "EcoWebAjaxAction.do?operation=loadHibernateModelData&param1=Button&hibModelName="+selectedObject.value;
    }else if ( operation == 'loadHibernateModels'){

      url = "EcoWebAjaxAction.do?operation=loadHibernateModels&param1=Button&datasourceName="+selectedObject.value;
    }else if(operation  == 'CheckTimerName'){

        url = "EcoWebAjaxAction.do?operation=CheckTimerName&param1=Button&timerName="+selectedObject.value;
    }else if(operation  == 'getAttributeNames'){

        url = "EcoWebAjaxAction.do?operation=getAttributeNames&param1=Button&datasourceName="+selectedObject.value;
    }else if(operation == 'TestDatabaseConnectionStatus'){
		showProgressDialog(MSG_GETTING_DB_CON, '');
		url = 'EcoWebAjaxAction.do?operation=TestDatabaseConnectionStatus&param1=Button&'+selectedObject;
	}else if(operation == "getAllTableNames"){
		showProgressDialog( MSG_GET_TB_NAME,MSG_ERR_ALERT);
		var primaryDS = dijit.byId('primaryDatasourceName').value;
		var secondaryDS = dijit.byId('secondaryDatasourceName').value;
		if((selectedObject.name == 'secondaryDatasourceName' )&& document.getElementById('primaryIndicatorSuccess').style.display == ''){
			hideProgressDialog();
			return "";
		}
		dijit.byId('tableName').setValue('');
		resetColumns();
		viewColumns(true);
		if(primaryDS == null || primaryDS == ""){
			resetTableStoreFilterSelect();
			setConnectionStatus(null);
			dijit.byId('query').setValue('');
			dijit.byId('tableName').setValue('');
			dijit.byId('query').setAttribute('disabled', true);
			dijit.byId('tableName').setAttribute('disabled', true);
			dijit.byId('runQry').setAttribute('disabled', true);
			
			resetColumnStoreFilterSelect();
			
			hideProgressDialog();
			return "";
		}



		url = 'EcoWebAjaxAction.do?operation=getAllTableNames&param1=Button&primaryDatasourceName='+primaryDS+"&secondaryDatasourceName="+secondaryDS;
	}
else if(operation == "validateQuery"){
			var queryDtls = dijit.byId('query').attr('value');
			if(queryDtls == null || queryDtls == ""){
				hideProgressDialog();
				return "";
			}

			url = 'EcoWebAjaxAction.do?operation=getAllColumnNames&param1=Button&primaryDatasourceName='+dijit.byId('primaryDatasourceName').value+"&secondaryDatasourceName="+dijit.byId('secondaryDatasourceName').value+'&tableName=&sqlQuery='+dijit.byId('query').value;		
		
	}
	else if(operation == "searchGroup"){
		url = 'manageADGroup.do?operation=searchGroup&searchString='+selectedObject.value;		
	}
	else if(operation == "getAllColumnNames"){
		showProgressDialog(MSG_GET_COL_NAME, MSG_ERR_ALERT);
		if(selectedObject.name == "tableName"){
			var tableNameDtls = dijit.byId('tableName').value;

			if(tableNameDtls == null || tableNameDtls == ""){
				resetColumnStoreFilterSelect();
				viewColumns(true);
				resetColumns();	
				dijit.byId('query').setAttribute('disabled', false);
				hideProgressDialog();
				return "";
			}
			url = 'EcoWebAjaxAction.do?operation=getAllColumnNames&param1=Button&primaryDatasourceName='+dijit.byId('primaryDatasourceName').value+"&secondaryDatasourceName="+dijit.byId('secondaryDatasourceName').value+'&tableName='+dijit.byId('tableName').value+'&sqlQuery=';
		}
		
		
		else{
			var queryDtls = dijit.byId('query').attr('value');

			if(queryDtls == null || queryDtls == ""){
				resetColumnStoreFilterSelect();
				resetColumns();	
				viewColumns(true);
				dijit.byId('tableName').setValue('');
				hideProgressDialog();
				return "";
			}

			url = 'EcoWebAjaxAction.do?operation=getAllColumnNames&param1=Button&primaryDatasourceName='+dijit.byId('primaryDatasourceName').value+"&secondaryDatasourceName="+dijit.byId('secondaryDatasourceName').value+'&tableName=&sqlQuery='+dijit.byId('query').value;
		}
	}
        
    return url + '&csrf=' + document.getElementById('csrf').value;
}

function viewColumns(viewStatus){
	dijit.byId('latitude').setAttribute('disabled', viewStatus);
	dijit.byId('longitude').setAttribute('disabled', viewStatus);
	dijit.byId('order').setAttribute('disabled', viewStatus);
	dijit.byId('coordinates').setAttribute('disabled', viewStatus);
dijit.byId("address").setAttribute('disabled', viewStatus);
	dijit.byId("addCity").setAttribute('disabled', viewStatus);
	dijit.byId("addCounty").setAttribute('disabled', viewStatus);
	dijit.byId("addState").setAttribute('disabled', viewStatus);
	dijit.byId("addCountry").setAttribute('disabled', viewStatus);
	dijit.byId("addZipCode").setAttribute('disabled', viewStatus);
}

function resetColumns(){
	dijit.byId('latitude').setValue('');
	dijit.byId('longitude').setValue('');
	dijit.byId('order').setValue('');
	dijit.byId('coordinates').setValue('');
	dijit.byId("address").setValue('');
	dijit.byId("addCity").setValue('');
	dijit.byId("addCounty").setValue('');
	dijit.byId("addState").setValue('');
	dijit.byId("addCountry").setValue('');
	dijit.byId("addZipCode").setValue('');
	dijit.byId('latitude').setAttribute('disabled', true);
	dijit.byId('longitude').setAttribute('disabled', true);
	dijit.byId('order').setAttribute('disabled', true);
	dijit.byId('coordinates').setAttribute('disabled', true);
dijit.byId("address").setAttribute('disabled', true);
	dijit.byId("addCity").setAttribute('disabled', true);
	dijit.byId("addCounty").setAttribute('disabled', true);
	dijit.byId("addState").setAttribute('disabled', true);
	dijit.byId("addCountry").setAttribute('disabled', true);
	dijit.byId("addZipCode").setAttribute('disabled', true);



}



function setTableNamesDtls(){
	try{
	if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
		var msgDOM = xmlhttpGetMsg.responseXML;
        try{
			var root = msgDOM.getElementsByTagName("tables")[0];               
            //If Connnection Fails
            if(root == null){
				showEmptyDialog(MSG_PROB_LOAD_TBNAME, CAPTION_ALERT);
				resetTableStoreFilterSelect();
				setConnectionStatus(null);
				resetColumns();
				dijit.byId('query').setAttribute('disabled', true);
				dijit.byId('tableName').setAttribute('disabled', true);
				dijit.byId('runQry').setAttribute('disabled', true);
   				hideProgressDialog();
            }
			var tables = root.getElementsByTagName("table");
			var primaryStyleValue = document.getElementById('primaryIndicatorSuccess').style.display;
			var secondaryStyleValue = document.getElementById('secondaryIndicatorSuccess').style.display
			if(tables != null ){
				showProgressDialog("Getting the table names", "");
			}
			if(tables != null && !(primaryStyleValue == "" || secondaryStyleValue =="")){
				dijit.byId('query').setAttribute('disabled', false);
				dijit.byId('query').setValue('');
				dijit.byId('tableName').setAttribute('disabled', false);				
				resetColumns();
			}

			var i;
			var tableNameArray = [];
	        tableNameArray.push({table: "" , label: MSG_SELECT});    
			for(i=0;i<tables.length;i++){
				var table_name=tables[i].firstChild.nodeValue;
				var table_id=tables[i].firstChild.nodeValue;
				tableNameArray.push({table: table_name+'_'+i , label: table_id});     
				if(i == (tables.length-1)){
					hideProgressDialog();
				}
		    }
			tableList = {identifier:"table",items:tableNameArray};
	        tableStore = new dojo.data.ItemFileReadStore({data: tableList});
            dijit.byId("tableName").store = tableStore; 
			dijit.byId("tableName").searchAttr= 'label'; 
			dijit.byId("tableName").setValue('');
			var connectedDatasourceDtls = root.getElementsByTagName("connectedDatasource")[0];
			var connectedDatabaseTypeId = root.getElementsByTagName("connectedDatabaseTypeId")[0];
			document.getElementById("datasourceDatabaseTypeId").value = connectedDatabaseTypeId.firstChild.nodeValue; 			
			setConnectionStatus(connectedDatasourceDtls.firstChild.nodeValue);
			if(modeType == "update"){
				setTableFormValue();
			}
           
            }catch(er1){
              
            }
            
        } 
		
	}catch(er){
		 hideProgressDialog();
	}

} 

function setConnectionStatus(primaryOrSecondary){
	if(primaryOrSecondary == 'Primary'){
		document.getElementById('primaryIndicatorSuccess').style.display='';
		document.getElementById('secondaryIndicatorSuccess').style.display='none';
	}else if(primaryOrSecondary == 'Secondary') {
		document.getElementById('primaryIndicatorSuccess').style.display='none';
		document.getElementById('secondaryIndicatorSuccess').style.display='';
	}else{
		document.getElementById('primaryIndicatorSuccess').style.display='none';
		document.getElementById('secondaryIndicatorSuccess').style.display='none';
	}
}



function showQueryStatus(){
	try{
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
		var msgDOM = xmlhttpGetMsg.responseXML;
        try{
			var root = msgDOM.getElementsByTagName("columns")[0];                         
            if(root == null){
                showEmptyDialog('<label class="error">'+ MSG_QUERY_NOT_VALID +'</label>',CAPTION_ALERT);  
            } 
			else
			{
				   document.forms[0].submit();			
			}
        }catch(er1){}
	}
	}catch(er){
	}
}



function setColumnDtls(){
	try{
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
		var msgDOM = xmlhttpGetMsg.responseXML;
        try{
        	var root = null;
 		    if(msgDOM != null) {
			 root = msgDOM.getElementsByTagName("columns")[0];  
 		    }
            if(root == null){
				hideProgressDialog(); 
				resetColumnStoreFilterSelect();
				resetColumns();
                showEmptyDialog('<label class="error">'+PRB_LOADING_COLUMNS , CAPTION_ALERT);  
				viewColumns(true);				
            }                             
        
			var columns = root.getElementsByTagName("column");
			if(columns != null){
				resetColumns();
				viewColumns(false);
				if(dijit.byId('tableName').value == ""){
					dijit.byId('query').setAttribute('disabled', false);
					dijit.byId('tableName').setAttribute('disabled', true);
				}

				if(dijit.byId('tableName').value != ""){
					dijit.byId('query').setAttribute('disabled', true);
					dijit.byId('tableName').setAttribute('disabled', false);
				}
			}
			if(columns != null ){
				showProgressDialog("Getting the column names", "");
			}
			var dbColumnsArray = [];
			dbColumnsArray.push({column: "" , label: ""});   
			for(i=0;i<columns.length;i++){
				var column_name=columns[i].firstChild.nodeValue;
				var column_id=columns[i].firstChild.nodeValue;
				dbColumnsArray.push({column: column_name , label: column_id});  
				if(i == (columns.length-1)){
					hideProgressDialog();
				}
			}
			columnList = {identifier:"column",items:dbColumnsArray};
			columnStore = new dojo.data.ItemFileReadStore({data: columnList});
			dijit.byId("latitude").store = columnStore;
			dijit.byId("longitude").store = columnStore;
			dijit.byId("order").store = columnStore;
			dijit.byId("coordinates").store = columnStore;
			dijit.byId("address").store    = columnStore;
			dijit.byId("addCity").store    = columnStore;
			dijit.byId("addCounty").store  = columnStore;
			dijit.byId("addState").store   = columnStore;
			dijit.byId("addCountry").store = columnStore;
			dijit.byId("addZipCode").store = columnStore;					
		 
			
			
			if(modeType == "update"){
				setColumnFormValue();
			}
        }catch(er1){

        }
            
	}
	//hideProgressDialog();
	}catch(er){
		hideProgressDialog();
	}
	
}


function activateExecuteQuery(obj){
	if(dijit.byId('query').attr('value') != ""){
		dijit.byId('tableName').setAttribute('disabled', true);
		dijit.byId('runQry').setAttribute('disabled', false);
	}else{
		dijit.byId('tableName').setAttribute('disabled', false);
		dijit.byId('runQry').setAttribute('disabled', true);
	}
	dijit.byId('tableName').setValue('');
	
	resetColumns();
	viewColumns(true);
	
	
	
}

function resetColumnStoreFilterSelect(){
	var columnList = {identifier:"column",items:[{column:"",label:""}]};
	var columnStore = new dojo.data.ItemFileReadStore({data: columnList});
	dijit.byId("latitude").store = columnStore;
	dijit.byId("longitude").store = columnStore;
	dijit.byId("order").store = columnStore;
	dijit.byId("coordinates").store = columnStore;	
	dijit.byId("address").store    = columnStore;
	dijit.byId("addCity").store    = columnStore;
	dijit.byId("addCounty").store  = columnStore;
	dijit.byId("addState").store   = columnStore;
	dijit.byId("addCountry").store = columnStore;
	dijit.byId("addZipCode").store = columnStore;

}



function resetTableStoreFilterSelect(){
	var tableList = {identifier:"table",items:[{table:"",label:""}]};
	var tableStore = new dojo.data.ItemFileReadStore({data: tableList});
	dijit.byId("tableName").store = tableStore; 

}
    function getNodeValue(objElement, name) {
        try 
        {
            return objElement.getElementsByTagName(name)[0].firstChild.nodeValue ;         
        }
        catch (err)
        { 
        }
        return "";
    }

    function setDrivers(){
        if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED") {
            var msgDOM = xmlhttpGetMsg.responseXML;
            var root = msgDOM.getElementsByTagName("drivers")[0];
            var driverDtls = root.getElementsByTagName("driver");                    
           
            dbDriversArray = [];
            
            if(pageName != ''){
                dbDriversArray.push({value: pageName , label: pageName});
            }
            
                  
            for(i=0;i<driverDtls.length;i++)
            {
            
                var driver_name = getNodeValue(driverDtls[i], "driverClass");
                var driver_id = getNodeValue(driverDtls[i], "driverName");
                var driver_connectionUrl = getNodeValue(driverDtls[i], "connectionUrl");
                var driver_tableQry = getNodeValue(driverDtls[i], "tableQry");
                var driver_columnQry = getNodeValue(driverDtls[i], "columnQry");
                var driver_dbConnectionType = getNodeValue(driverDtls[i], "dbConnectionType");
                
                dbDriversDtlsArray.push({dName: driver_id, dClass: driver_name, dUrl: driver_connectionUrl, tblQry: driver_tableQry, colQry: driver_columnQry, conType: driver_dbConnectionType});
                dbDriversArray.push({driver: driver_id, label: driver_name});
              } 
                        
                  driverList = {identifier:"label",items:dbDriversArray};
                  driverStore = new dojo.data.ItemFileReadStore({data: driverList});
                  dijit.byId("driverName").store = driverStore;

                  //Invoked for update
                  
                              try{
                                    setSavedData();
                              }catch(err){}
                  
        }
    }
    
   
function setDBUrl() {
    for(i=0;i<dbDriversDtlsArray.length;i++){
            if(dbDriversDtlsArray[i].dClass == dijit.byId('driverName').attr('value')){
                  dojo.byId('dbUrl').value = dbDriversDtlsArray[i].dUrl;
                  dojo.byId('tableQry').value = dbDriversDtlsArray[i].tblQry;
                  dojo.byId('columnQry').value = dbDriversDtlsArray[i].colQry;
                  dojo.byId('conType').value = dbDriversDtlsArray[i].conType;
                  dojo.byId('dbClass').value = dbDriversDtlsArray[i].dClass;
            }
      }    
}

function setDBConnectionStatus(){
      
         if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            var msgDOM = xmlhttpGetMsg.responseXML;
                  
            try{
                var root = msgDOM.getElementsByTagName("tables")[0];               
                        //If Connnection Fails
                        if(root == null){
							 showEmptyDialog("<label class=MSG_ERR_ERROR>"+ xmlhttpGetMsg.responseText, CAPTION_ALERT);
                             
                              document.getElementById('indicatorError').style.display='';
                              document.getElementById('indicator').style.display='none';
                              dijit.byId('query').setAttribute('disabled', true);
                              dijit.byId('tableName').setAttribute('disabled', true);
                              hideProgressDialog();
                              if(modeType == 'update'){
                                    document.getElementById('indicatorTable').style.display='none';
                                    document.getElementById('indicatorQry').style.display='none';
                                    document.getElementById('indicatorLongitude').style.display='none';
                                    document.getElementById('indicatorLatitude').style.display='none';
                                    document.getElementById('indicatorCord').style.display='none';
                                   // document.getElementById('indicatorOrder').style.display='none';               

                                    document.getElementById('indicatorTableError').style.display='';
                                    document.getElementById('indicatorQryError').style.display='';
                                    document.getElementById('indicatorLongError').style.display='';
                                    document.getElementById('indicatorLatError').style.display='';
                                    document.getElementById('indicatorCordError').style.display='';
                                 //   document.getElementById('indicatorOrderError').style.display='';              
                              }

                              if(xmlhttpGetMsg.responseText.length > 100){
                                    openAlertDialog(MSG_PROB_CONNECT_SERVER);
                              }else{
                                    openAlertDialog(xmlhttpGetMsg.responseText);
                              }                       
                        }

                      var tables = root.getElementsByTagName("table");
                var i;
                        
                  
                        connectionPropsArray[0] =  document.getElementById('dbuserId').value;
                        connectionPropsArray[1] = document.getElementById('dbPwd').value
                        connectionPropsArray[2] = dijit.byId('driverName').attr('value');
                        connectionPropsArray[3] = document.getElementById('dbUrl').value;

                        var tableNameArray = [];
                         tableNameArray.push({table: "" , label: ""});    

                        for(i=0;i<tables.length;i++)
                {
                    var table_name=tables[i].firstChild.nodeValue;
                    var table_id=tables[i].firstChild.nodeValue;
                    tableNameArray.push({table: table_name , label: table_id});     
                              document.getElementById('indicator').style.display='';                    
                }
                        tableList = {identifier:"table",items:tableNameArray};
                        tableStore = new dojo.data.ItemFileReadStore({data: tableList});
                        dijit.byId("tableName").store = tableStore;
                        
                        document.getElementById('indicator').style.display='none';
                        document.getElementById('indicatorError').style.display='none';
                        document.getElementById('indicatorSuccess').style.display='';
                        dijit.byId('query').setAttribute('disabled', false);
                        dijit.byId('runQry').setAttribute('disabled', true);
                        dijit.byId('tableName').setAttribute('disabled', false);
                        
                        //Invoked for update
                        if(modeType == 'update'){
                              try{
                                    setSavedDBInputDtls();
                              }catch(err){}
                        }
                        modeType = null;
                        hideProgressDialog();
                        //waitDone();
            }catch(er1){
              
            }
            
        }
}

function returnConnectionStatus(){
	try{
	 if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
		
		var msgDOM = xmlhttpGetMsg.responseXML;
		var root =  msgDOM.getElementsByTagName("dbconfigurations")[0];		

		var dbconnectionStatusNode = root.getElementsByTagName("dbconnectionStatus")[0];
		var dbconnectionStatusNodeValue=dbconnectionStatusNode.firstChild.nodeValue;
		
		var rootDbConfigNameStatus = '';
		var dbConfigNameStatusNode = '';
		var dbConfigNameStatusNodeValue = '';

		try{		
			dbConfigNameStatusNode = root.getElementsByTagName("dbNameUniqueStatus")[0];
			dbConfigNameStatusNodeValue = dbConfigNameStatusNode.firstChild.nodeValue;
			hideProgressDialog();
		}catch(er){
		
		}
	    //populateData(xmlhttpGetMsg);
		if( dbconnectionStatusNodeValue  == "success" && dbConfigNameStatusNodeValue == "Available"){
			dijit.byId('databaseConnectionTypeId').setAttribute('disabled', false);
			resetFormValues(false);
			document.forms[0].submit();
		}else if(dbConfigNameStatusNodeValue == "Not Available"){
			showEmptyDialog(DB_CONFIGURATION_NOT_AVAIL, CAPTION_ALERT);
		}else{
			showEmptyDialog(dbconnectionStatusNodeValue,CAPTION_ALERT);
		}
			
     }
	 //hideProgressDialog();
	}catch(error){
		hideProgressDialog();
	}
}




function setConfiguredDBConnectionStatus(){
    if (xmlhttpGetMsg1.readyState == 4 || xmlhttpGetMsg1.readyState == "COMPLETED"){
        var msgDOM = xmlhttpGetMsg1.responseXML;
        try{
            var root = msgDOM.getElementsByTagName("tables")[0];
            var tables = root.getElementsByTagName("table");
            var i;
            for(i=tableName.options.length-1;i>=0;i--)
            {
                tableName.removeOption(i);
            }
            var tableNameArray = [];
            tableNameArray.push({value:  dbTableName, label: dbTableName});
            tableNameArray.push({value:  "", label: MSG_SELECT});
            
          
            for(i=0;i<tables.length;i++)
            {
                var table_name=tables[i].firstChild.nodeValue;
                var table_id=tables[i].firstChild.nodeValue;
                if(dbTableName!= table_name){
                    tableNameArray.push({value: table_name + "", label: table_id});
                }                
            }
            tableName.addOption(tableNameArray);        
             
             if(loadDBTable != 'back')
                 openAlertDialog(MSG_CON_SUCCESS);
                            
        }catch(er1){
        }
        
    }
}

function setDBColumns(){
      showProgressDialog(MSG_GET_COLS, MSG_DB_DS);
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            var msgDOM = xmlhttpGetMsg.responseXML;
            try{
                var root = msgDOM.getElementsByTagName("columns")[0];                                 
                        if(root == null){

                              if(modeType == 'update'){
                                    document.getElementById('indicatorLongitude').style.display='none';
                                    document.getElementById('indicatorLatitude').style.display='none';
                                    document.getElementById('indicatorCord').style.display='none';
                                    document.getElementById('indicatorOrder').style.display='none';               

                                    document.getElementById('indicatorLongError').style.display='';
                                    document.getElementById('indicatorLatError').style.display='';
                                    document.getElementById('indicatorCordError').style.display='';
                                    document.getElementById('indicatorOrderError').style.display='';              
                              }
                              hideProgressDialog();
                              if(xmlhttpGetMsg.responseText.length >100){
                                    //showProgressDialog('<label class="error">'+ xmlhttpGetMsg.responseText, MSG_DB_DS);   
                                    showProgressDialog(MSG_PROB_LOAD_COLS, MSG_DB_DS);     
                                                      showEmptyDialog(MSG_PROB_LOAD_COLS , CAPTION_ALERT);
                                                      hideProgressDialog();
                                    //openAlertDialog("Problem in Loading the Columns...");
                              }else{
                                    showProgressDialog('<label class="error">'+ xmlhttpGetMsg.responseText, MSG_DB_DS); 
                                                      showEmptyDialog(MSG_PROB_LOAD_COLS, CAPTION_ALERT);
                                                      hideProgressDialog();
                                    //openAlertDialog(xmlhttpGetMsg.responseText);
                              }                             
                              
                              
                        }
                var columns = root.getElementsByTagName("column");
                                        
                var dbColumnsArray = [];
                 dbColumnsArray.push({column: MSG_SELECT , label: ""});   
                for(i=0;i<columns.length;i++)
                {
                    var column_name=columns[i].firstChild.nodeValue;
                    var column_id=columns[i].firstChild.nodeValue;
                    dbColumnsArray.push({column: column_name , label: column_id});                           
                }
           
                        columnList = {identifier:"column",items:dbColumnsArray};
                        columnStore = new dojo.data.ItemFileReadStore({data: columnList});
                        
                dijit.byId("latitude").store = columnStore;
                        dijit.byId("longitude").store = columnStore;
                        dijit.byId("order").store = columnStore;
                        dijit.byId("coordinates").store = columnStore;
						      dijit.byId("address").store       = columnStore;
                        dijit.byId("addCity").store      = columnStore;
                        dijit.byId("addCounty").store    = columnStore;
                        dijit.byId("addState").store          = columnStore;
                        dijit.byId("addCountry").store       = columnStore;
                        dijit.byId("addZipCode").store      = columnStore;
				viewColumns(false);
                  /*dijit.byId('latitude').setAttribute('disabled', false);
                  dijit.byId('longitude').setAttribute('disabled', false);
                  dijit.byId('order').setAttribute('disabled', false);
                  dijit.byId('coordinates').setAttribute('disabled', false);*/
                  
                  //if(modeType == 'update'){
                        try{
                              setSavedDBColumnDtls(modeType);
                        }catch(err){}
                  //}
                  //modeType = null;
                  hideProgressDialog();
            }catch(er1){
            }
            
        }
}


function setExcelFileValues(){
      showProgressDialog(MSG_GET_EXL_HEADER, MSG_EXL_FILE_DS);
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            var msgDOM = xmlhttpGetMsg.responseXML;
            //alert(msgDOM.getElementsByTagName("loadDtls")[0]);
            try{
                var root = msgDOM.getElementsByTagName("loadDtls")[0];                    
                        if (root == null) {
                                                      
                              hideProgressDialog();
                              //showProgressDialog('<label class="error">Problem in Loading the Values. Press ESC to exit </label>' , 'Excel Datasource'); 
                               showEmptyDialog('<label class="error"><font color = "black">'+MSG_PROB_LOAD_VALUES+'</font></br></br></br></label>' , MSG_ERR_ERROR); 
                        }
                
                var columns = root.getElementsByTagName("load");
                                        
                var dbColumnsArray = [];
                 dbColumnsArray.push({column: "" , label: ""});
                
                try {    
                      for(i=0;i<columns.length;i++)
                      {
                          var column_name=columns[i].firstChild.nodeValue;
                          var column_id=columns[i].firstChild.nodeValue;
                          dbColumnsArray.push({column: column_name , label: column_id});                           
                      }
                  } catch(err){}
                  
                        columnList = {identifier:"column",items:dbColumnsArray};
                        columnStore = new dojo.data.ItemFileReadStore({data: columnList});
                        
                //dijit.byId("excelName").store = columnStore;
                        try{
                         dijit.byId("excelLatitude").store = columnStore;
                        dijit.byId("excelLongitude").store = columnStore;
                        dijit.byId("excelCoordinates").store = columnStore;

                        dijit.byId("address").store       = columnStore;
                        dijit.byId("addCity").store      = columnStore;
                        dijit.byId("addCounty").store    = columnStore;
                        dijit.byId("addState").store          = columnStore;
                        dijit.byId("addCountry").store       = columnStore;
                        dijit.byId("addZipCode").store      = columnStore;
                     

                        //dijit.byId('excelName').setAttribute('disabled', false);
                        dijit.byId('excelLatitude').setAttribute('disabled', false);
                        dijit.byId('excelLongitude').setAttribute('disabled', false);
                        dijit.byId('excelCoordinates').setAttribute('disabled', false);
                        dijit.byId("address").setAttribute('disabled', false);
                        dijit.byId("addCity").setAttribute('disabled', false);
                        dijit.byId("addCounty").setAttribute('disabled', false);
                        dijit.byId("addState").setAttribute('disabled', false);
                        dijit.byId("addCountry").setAttribute('disabled', false);
                        dijit.byId("addZipCode").setAttribute('disabled', false);
                        } catch(err){}
                        //alert("modeType"+ modeType);
                        if(modeType == 'update'){
                              try{
                                    setSavedDBColumnDtls(modeType);
                              }catch(err){}
                        } else {
                              //setFocus();
                        }
                        modeType = null;
                        hideProgressDialog();
            }catch(er1){
            }
            
        }
}


function setHibernateColumns(){
//alert("setting" + modeType);
    showProgressDialog(MSG_GET_HIBER_HEADERS, MSG_HIBER_DS);
    invalidModel = "";
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            var msgDOM = xmlhttpGetMsg.responseXML;
            //alert(msgDOM.getElementsByTagName("loadDtls")[0]);
            try{
                var root = msgDOM.getElementsByTagName("loadDtls")[0];              
                if (root == null) {
                                
                    hideProgressDialog();
                    showProgressDialog('<label class="error">'+ xmlhttpGetMsg.responseText, MSG_HIBER_DS);    
                    
                }else{
					       
				}	
                
                var columns = root.getElementsByTagName("load");
                //alert(columns[0].firstChild.nodeValue);
                if (columns.length == 1 && (columns[0].firstChild.nodeValue == 'INVALIDMODELNAME' 
                    || columns[0].firstChild.nodeValue == 'InvalidModelName')) {
                    hideProgressDialog();
					
                    showEmptyDialog("<label class=MSG_ERR_ERROR>"+MSG_INVALID_HIB_MODEL, CAPTION_ALERT);
                    invalidModel = "true";
                }
                
                var dbColumnsArray = [];
                dbColumnsArray.push({column: ""});
                
                try {    
                    for(i=0;i<columns.length;i++) {
                        var column_name=columns[i].firstChild.nodeValue;
                       dbColumnsArray.push({column: column_name , label: column_name});  

                    }
                } catch(err){}
                
                columnList = {identifier:"column", items:dbColumnsArray};
                columnStore = new dojo.data.ItemFileReadStore({data: columnList});
                
                try{
                    
                    //alert(invalidModel == "");
                    if (invalidModel == "") {
                    
                        dijit.byId("hibernateLatitude").store       = columnStore;
                        dijit.byId("hibernateLongitude").store      = columnStore;
                        dijit.byId("hibernateCoordinates").store    = columnStore;
                        dijit.byId("hibernateOrder").store          = columnStore;
                        dijit.byId("address").store       = columnStore;
                        dijit.byId("addCity").store      = columnStore;
                        dijit.byId("addCounty").store    = columnStore;
                        dijit.byId("addState").store          = columnStore;
                        dijit.byId("addCountry").store       = columnStore;
                        dijit.byId("addZipCode").store      = columnStore;
                     

                        dijit.byId('hibernateLatitude').setAttribute('disabled', false);
                        dijit.byId('hibernateLongitude').setAttribute('disabled', false);
                        dijit.byId('hibernateCoordinates').setAttribute('disabled', false);
                        dijit.byId('hibernateOrder').setAttribute('disabled', false);
                        dijit.byId("address").setAttribute('disabled', false);
                        dijit.byId("addCity").setAttribute('disabled', false);
                        dijit.byId("addCounty").setAttribute('disabled', false);
                        dijit.byId("addState").setAttribute('disabled', false);
                        dijit.byId("addCountry").setAttribute('disabled', false);
                        dijit.byId("addZipCode").setAttribute('disabled', false);
                
                    }

                } catch(err){}
                //alert("modeType"+ modeType);
                if(modeType == 'update' && invalidModel == "" || modeType == null){
                    try{
                        setSavedDBColumnDtls(modeType);
                    }catch(err){}
                } else {
                    //setFocus();
                }
                modeType = null;
                if (invalidModel == "") hideProgressDialog();

            }catch(er1){
            }
            
        }
}


function setHibernateModels(){
    //alert('here');
    showProgressDialog(MSG_GET_HIB_MODELS, MSG_HIBER_DS);
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            var msgDOM = xmlhttpGetMsg.responseXML;
            try{
                var root = msgDOM.getElementsByTagName("loadDtls")[0];              
                if (root == null) {
                                    
                    hideProgressDialog();
                    showProgressDialog('<label class="error">'+ xmlhttpGetMsg.responseText, MSG_HIBER_DS);    
                    
                }
                //alert(root.getElementsByTagName("load"));
                var models = root.getElementsByTagName("load");
                                
                var modelsArray = [];
                modelsArray.push({model: MSG_SELECT});
                
                try {    
                    for(i=0;i < models.length;i++)
                    {
                        var model_name=models[i].firstChild.nodeValue;
                        modelsArray.push({model: model_name});                           
                    }
                } catch(err){}
                
                modelList = {identifier:"model", items:modelsArray};
                modelStore = new dojo.data.ItemFileReadStore({data: modelList});
                
                try{
                
                dijit.byId("hibernateName").store = modelStore;
				dijit.byId("hibernateName").setValue(MSG_SELECT);
                dijit.byId('hibernateName').setAttribute('disabled', false);
                //dijit.byId("hibernateName").setValue('<bean:write name="ecoDatasourceListData" property="hibernateName" />');

                } catch(err){}
			
                if(modeType == 'update'){
					try{
                   //     dijit.byId("hibernateName").setValue('<bean:write name="ecoDatasourceListData" property="hibernateName" />');
                        //setSavedDBColumnDtls(modeType);
						//setSavedDBColumnDtls(modeType);	
						setHibernateModel(modeType)
                    }catch(err){}
                } else {
                    //setFocus();
                }
                modeType = null;
                hideProgressDialog();
            }catch(er1){
            }
            
        }
}

function setUploadFileStatus(){
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            var msgDOM = xmlhttpGetMsg.responseXML;
            try{
                var root = msgDOM.getElementsByTagName("excelDtls")[0];
                var excel = root.getElementsByTagName("excel");
                if(selectedObjectName != 'importFileName'){
                    openAlertDialog(MSG_FILE_UPLOAD_SUCCESS);
                }           

                for(i=excelName.options.length-1;i>=0;i--){
                    excelName.removeOption(i);
                }
                
                for(i=excelLatitude.options.length-1;i>=0;i--){
                    excelLatitude.removeOption(i);
                }
                
                for(i=excelLongitude.options.length-1;i>=0;i--){
                    excelLongitude.removeOption(i);
                }
                
                for(i=excelCoordinates.options.length-1;i>=0;i--){
                    excelCoordinates.removeOption(i);
                }
                
                var excelIds = [];
                excelIds.push({value:  " ", label: MSG_SELECT});
                for(i=1;i<excel.length;i++)
                {
                    var excel_name=excel[i].firstChild.nodeValue;
                    var excel_id=excel[i].firstChild.nodeValue;         
                    excelIds.push({value: excel_name + "", label: excel_id});
                }
                excelName.addOption( excelIds); 
                excelLatitude.addOption( excelIds); 
                excelLongitude.addOption( excelIds);    
                excelCoordinates.addOption( excelIds);  
                
                
            }catch(er1){
                if(selectedObjectName != 'importFileName'){
                    openAlertDialog(MSG_SRY_FILE_NOT_UPLOADED);
                }
                var i;
                for(i=excelName.options.length-1;i>=0;i--){
                    excelName.removeOption(i);                          
                }
                
                for(i=excelLatitude.options.length-1;i>=0;i--){
                    excelLatitude.removeOption(i);                  
                }
                
                for(i=excelLongitude.options.length-1;i>=0;i--) {
                    excelLongitude.removeOption(i);                 
                }
                
                for(i=excelCoordinates.options.length-1;i>=0;i--){
                    excelCoordinates.removeOption(i);                   
                }
                excelName.options.length=0;
                excelLatitude.options.length=0;
                excelLongitude.options.length=0;
                excelCoordinates.options.length=0;
                excelName.addOption(" ", MSG_SELECT);
                excelLatitude.addOption(" ", MSG_SELECT);   
                excelLongitude.addOption(" ", MSG_SELECT);  
                excelCoordinates.addOption(" ", MSG_SELECT);    
            }
            
        }
}


    


function setLoadFileData(){
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            
            var msgDOM = xmlhttpGetMsg.responseXML;
            try{
                var root = msgDOM.getElementsByTagName("excelDtls")[0];
                var excel = root.getElementsByTagName("excel");
            
                if(excelName.value == ""){          
                    for(i=excelName.options.length-1;i>=0;i--){
                        excelName.removeOption(i);
                    }
                }
                
                if(excelLatitude.value == ""){
                    for(i=excelLatitude.options.length-1;i>=0;i--){
                        excelLatitude.removeOption(i);
                    }
                }
                
                if(excelLongitude.value == ""){
                    for(i=excelLongitude.options.length-1;i>=0;i--){
                        excelLongitude.removeOption(i);
                    }
                }

                if(excelCoordinates.value == ""){
                    for(i=excelCoordinates.options.length-1;i>=0;i--){
                        excelCoordinates.removeOption(i);
                    }
                }
                
               
                var excelNameArray = [];
                var excelLatitudeArray = [];
                var excelLongitudeArray = [];
                var excelCoordinatesArray = [];
                excelNameArray.push({value:  " ", label: MSG_SELECT});
                excelLatitudeArray.push({value:  " ", label: MSG_SELECT});  
                excelLongitudeArray.push({value:  " ", label: MSG_SELECT}); 
                excelCoordinatesArray.push({value:  " ", label: MSG_SELECT});   
                
                for(i=1;i<excel.length;i++)
                {
                    var excel_name=excel[i].firstChild.nodeValue;
                    var excel_id=excel[i].firstChild.nodeValue;                     
                    try{
                        if(excelName.getValue() !=  excel_name)
                            excelNameArray.push({value: excel_name + "", label: excel_id});
                            
                    }catch(e1){
                    }
                    try{
                        if(excelLatitude.getValue() !=  excel_name)
                            excelLatitudeArray.push({value: excel_name + "", label: excel_id});
                    }catch(e2){}
    
                    try{
                        if(excelLongitude.getValue() !=  excel_name)
                            excelLongitudeArray.push({value: excel_name + "", label: excel_id});
                            
                    }catch(e3){}
                    try{
                        if(excelCoordinates.getValue() !=  excel_name)
                            excelCoordinatesArray.push({value: excel_name + "", label: excel_id});          
                             
                    }catch(e4){}
                    
                    
                }
                
                excelName.addOption(excelNameArray);
                excelLatitude.addOption(excelLatitudeArray);
                excelLongitude.addOption(excelLongitudeArray);
                excelCoordinates.addOption(excelCoordinatesArray);
                
                
            }catch(er1){
        
            }
            
        }
}

function openAlertDialog(info) {
    Dialog.alert('<center>'+info+'</center>', 
                    {windowParameters: {width:200, height:50}, okLabel: MSG_CLOSE, 
                        ok:function(win) {debug(MSG_VALIDATE_ALERT_PANEL); return true}
                        });
    }
    
function handleLatLong(excelCordinatesObj){
    
    if(excelCoordinates.value != ' '){          
        excelLatitude.setAttribute("disabled", true);
        excelLongitude.setAttribute("disabled", true);
    }else if(excelCoordinates.value == ' '){
        excelLatitude.setAttribute("disabled", false);
        excelLongitude.setAttribute("disabled", false);
    } 
}   

function handleCoOrdinates(excelLatLogObject){
    if(excelLatLogObject.value != ' '){         
        excelCoordinates.setAttribute("disabled", true);        
    }else if(excelLongitude.value == ' ' && excelLatitude.value == ' '){
        excelCoordinates.setAttribute("disabled", false);       
    }
}

function setLoadValuesStatus(){
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            var msgDOM = xmlhttpGetMsg.responseXML;
            
            try{
                var root = msgDOM.getElementsByTagName("loadDtls")[0];
                
                var load = root.getElementsByTagName("load");
                
                
                var placemarkNameArray = [];
                for(i=0;i<load.length;i++){
                    var load_name=load[i].firstChild.nodeValue;
                    var load_id=load[i].firstChild.nodeValue;           
                    if(placemarkName.getValue() != load_name  ) 
                        placemarkNameArray.push({value: load_name + "", label: load_id});                       
                }
                placemarkName.addOption(placemarkNameArray);
                
            }catch(er1){
                var i;
                for(i=placemarkName.options.length-1;i>=0;i--){
                    placemarkName.removeOption(i);                          
                }
                placemarkName.options.length=0;
                placemarkName.addOption(" ", MSG_SELECT);
                
            }
            
        }
}


function setLoadSearchValues(){
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            var msgDOM = xmlhttpGetMsg.responseXML;
            try{
                var root = msgDOM.getElementsByTagName("loadDtls")[0];
                var load = root.getElementsByTagName("load");
                
                for(i=searchAttributes.options.length-1;i>=0;i--){
                    searchAttributes.removeOption(searchAttributes.getOptions(i));
                }
                        
                var serchAttributesArray = [];

                for(i=0;i<load.length;i++){
                    var load_name=load[i].firstChild.nodeValue;
                    var load_id=load[i].firstChild.nodeValue;
                    serchAttributesArray.push({value: load_name + "", label: load_id});         
                                                
                }
                searchAttributes.addOption(serchAttributesArray);   
                
            }catch(er1){
                var i;
                try{
                    for(i=searchAttributes.options.length-1;i>=0;i--){
                        searchAttributes.removeOption(searchAttributes.getOptions(i));                  
                }
                }catch(err){
                    
                }
            }
            
        }   
}

function setCheckDatasourceNameStatus(){
    //document.getElementById('result').innerHTML = MSG_CHECKING;
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            var msgDOM = xmlhttpGetMsg.responseXML;
            try{
                var root = msgDOM.getElementsByTagName("searchDtls")[0];
                var load = root.getElementsByTagName("result");
                   if(document.forms[0].datasourceName.value != ""){
                 	if(load[0].firstChild.nodeValue!=MSG_NOT_AVAILABLE){
						document.getElementById('result').innerHTML = '<font color="#0000FF"><b>'+load[0].firstChild.nodeValue+'</b></font>';
                	}else{
                		document.getElementById('result').innerHTML = '<font color="#FF0000"><b>'+load[0].firstChild.nodeValue+'</b></font>';
                	}
                    
                }else if(document.forms[0].datasourceName.value == ""){
                    document.getElementById('result').innerHTML = '';
                }
                
            }catch(er1){
                
            }
            
        }   
}

function setCheckTimerNameStatus(){
    document.getElementById('result').innerHTML = MSG_CHECKING;
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            var msgDOM = xmlhttpGetMsg.responseXML;
            try{
                var root = msgDOM.getElementsByTagName("searchDtls")[0];
                var load = root.getElementsByTagName("result");
                if(document.forms[0].jobName.value != ""){
                 	if(load[0].firstChild.nodeValue!=MSG_NOT_AVAILABLE){
						document.getElementById('result').innerHTML = '<font color="#0000FF"><b>'+load[0].firstChild.nodeValue+'</b></font>';
                	}else{
                		document.getElementById('result').innerHTML = '<font color="#FF0000"><b>'+load[0].firstChild.nodeValue+'</b></font>';
                	}
                    
                }else if(document.forms[0].jobName.value == ""){
                    document.getElementById('result').innerHTML = '';
                }
                
            }catch(er1){
                
            }
            
        }   
}


function setFilePaths(){
      if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
            var msgDOM = xmlhttpGetMsg.responseXML;
            try{
                        var root = msgDOM.getElementsByTagName("filePaths")[0];
                var filePaths = root.getElementsByTagName("filePath");
                        

                        var filePathsArray = [];
                filePathsArray.push({filePath: MSG_SELECT , label: ""});   
                for(i=0;i<filePaths.length;i++)
                {
                              var filepath_name= filePaths[i].firstChild.nodeValue;
                    var filepath_id=filePaths[i].getAttribute("absolutePath");                              
                    filePathsArray.push({filePath: filepath_name , label: filepath_id});                                      
                }
  
                filePathList = {identifier:"label",items:filePathsArray};
                var filePathStore = new dojo.data.ItemFileReadStore({data: filePathList});
                        if(fileType.indexOf('.shp') != -1 ){
                              dijit.byId("shapeFile").store = filePathStore;
								 dijit.byId("shapeFile").setValue('');
                        }else if(fileType.indexOf('.xls') != -1){
                              dijit.byId("excelName").store = filePathStore;
							   dijit.byId("excelName").setValue('');
                        }
                hideProgressDialog();   
				if(modeType=='update'){
					try{
						loadExcelValues();
					}catch(er){}
				}
                try{
                             // populate();
                        }catch(err){
                        }
            }catch(er1){
                
            }
            
        }   
}

function resetAllValues(){
      var tableNameArray = [];
            tableNameArray.push({table: "" , label: ""}); 
            tableList = {identifier:"table",items:tableNameArray};
            tableStore = new dojo.data.ItemFileReadStore({data: tableList});
            dijit.byId("tableName").store = tableStore;
            dijit.byId('tableName').setValue('');
            
            var dbColumnsArray = [];
        dbColumnsArray.push({column: "" , label: ""});   
            columnList = {identifier:"column",items:dbColumnsArray};
            columnStore = new dojo.data.ItemFileReadStore({data: columnList});
         dijit.byId("latitude").store = columnStore;
             dijit.byId("longitude").store = columnStore;
             dijit.byId("order").store = columnStore;
             dijit.byId("coordinates").store = columnStore;
            viewColumns(false);
             
            
            try{
                  dijit.byId('latitude').setValue('');
            }catch(err){
            }
            try{
                  dijit.byId('longitude').setValue('');
            }catch(err){
            }
            try{
                  dijit.byId('order').setValue('');
            }catch(err){
            }
            try{
                  dijit.byId('coordinates').setValue('');
            }catch(err){
            }
      
            viewColumns(true);
            document.getElementById('indicatorError').style.display='none';
            try{
                  document.getElementById('indicatorTable').style.display='none';
                  document.getElementById('indicatorQry').style.display='none';
                  document.getElementById('indicatorLongitude').style.display='none';
                  document.getElementById('indicatorLatitude').style.display='none';
                  document.getElementById('indicatorCord').style.display='none';
                  document.getElementById('indicatorOrder').style.display='none';               

                  document.getElementById('indicatorTableError').style.display='none';
                  document.getElementById('indicatorQryError').style.display='none';
                  document.getElementById('indicatorLongError').style.display='none';
                  document.getElementById('indicatorLatError').style.display='none';
                  document.getElementById('indicatorCordError').style.display='none';
                  document.getElementById('indicatorOrderError').style.display='none';                
            }catch(err){
            }
}

//Callback method for RSS Feed
function rssFeedCallback()
{

   if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
          var msgDOM = xmlhttpGetMsg.responseXML;
          try{
              var root = msgDOM.getElementsByTagName("FeedType")[0];
              var load = root.getElementsByTagName("type");
                    //hideProgressDialog();
                    if(load[0].firstChild.nodeValue=="VALID")
                    {
                          //alert("RSS Feed URL is valid");
                          showEmptyDialog(MSG_RSS_FEED_URL_VALID, MSG_ERR_ALERT);
                          
						  
                    }
                    else if(load[0].firstChild.nodeValue=="INVALID")
                    {
                          //alert("RSS Feed URL is Invalid");
                          showEmptyDialog(MSG_RSS_FEED_URL_INVALID, MSG_ERR_ERROR);
						  
                          
                    }
              //document.getElementById('result').innerHTML = '<b>'+load[0].firstChild.nodeValue+'</b>';
            }catch(er1){}
        }
}

var firstAttrCount = 0;
function setFirstDatasourceAttributes()
{  
	 var indexes=getIndexList();
	 
	 for(index=0;index<indexes.length;index++) {
         dijit.byId("mapFirstDSNAttr"+indexes[index]).setAttribute('value', '');
     }
	 
     if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
	      var msgDOM = xmlhttpGetMsg.responseXML;
	     
          try{
              var root = msgDOM.getElementsByTagName("loadAtributes")[0];
              var load = root.getElementsByTagName("attribute");
                    attributesArray = [];
                    attributesArray.push({attr: "", label: ""});  
                     for(i=0;i<load.length;i++){
                              var attr_name = load[i].firstChild.nodeValue;
                              var attr_id = load[i].firstChild.nodeValue;     
                              attributesArray.push({attr: attr_id, label: attr_name});
                          }
                  firstAttrList = {identifier:"label",items:attributesArray};
                  firstAttrStore = new dojo.data.ItemFileReadStore({data: firstAttrList});
                  
                  for(index=0;index<indexes.length;index++) {
	                   dijit.byId("mapFirstDSNAttr"+indexes[index]).store = firstAttrStore;
                  }
                  
                        try{
                              if(modeType == "insert" && firstAttrCount == 0){								  
                                    loadFirstDSAttributes();      
									++firstAttrCount;
                              }
                        }catch(err){
                        	   
                        }
                        
            }catch(er1){
            	 
            }
        }

      hideProgressDialog();
}

var secondAttrCount = 0;
function setSecondDatasourceAttributes()
{
	
	var indexes=getIndexList();
	for(index=0;index<indexes.length;index++) {
		 dijit.byId("mapWithSecondDSNAttr"+indexes[index]).setAttribute('value', '');
    }
	
    if (xmlhttpGetMsg.readyState == 4 || xmlhttpGetMsg.readyState == "COMPLETED"){
          var msgDOM = xmlhttpGetMsg.responseXML;
          try{
              var root = msgDOM.getElementsByTagName("loadAtributes")[0];
              var load = root.getElementsByTagName("attribute");
                    attributesArray = [];
                    attributesArray.push({attr: "", label: ""});  
                     for(i=0;i<load.length;i++){
                              var attr_name = load[i].firstChild.nodeValue;
                              var attr_id = load[i].firstChild.nodeValue;     
                              attributesArray.push({attr: attr_id, label: attr_name});                            
                          } 
                                      
                  secondAttrList = {identifier:"label",items:attributesArray};
                  secondAttrStore = new dojo.data.ItemFileReadStore({data: secondAttrList});
                  
                  for(index=0;index<indexes.length;index++) {
	                   dijit.byId("mapWithSecondDSNAttr"+indexes[index]).store = secondAttrStore;
                  }
                  
                        try{
                              
                              if(modeType == "insert" && secondAttrCount == 0){
                                    loadSecondDSAttributes();
									secondAttrCount++;
                              }
                              modeType = null;
                        }catch(err){
                        }
                  modeType="null";
            }catch(er1){}
        }
      hideProgressDialog();
}

	function validateDSN(){
	      //var dsn1 = document.forms[0].mapFirstDSN.value;
	      //var dsn2 = document.forms[0].mapWithSecondDSN.value;
	      var dsn1 = dojo.byId('mapFirstDSN').value;
	      var dsn2 = dojo.byId('mapWithSecondDSN').value;
	
	      if(dsn1 == dsn2){
	            showEmptyDialog(MSG_CHOOSE_FILES, CAPTION_ALERT);
	            return false;
	      }
	      return true;
	}

	function getIndexList() {
		    var ctr=document.getElementById("mappingCount").value;
		    var innerCounter=1;
		    var index=1;
		    var elements = new Array();
		    while(index<=ctr) {
			  if(document.getElementById("mapFirstDSNAttr"+innerCounter)!=null) {
				  elements[index-1]=innerCounter;
			      index++;
			  }
			  innerCounter++;
		   }
		   return elements;
	}

	function checkAttributesISEmpty(){
		  var indexes=getIndexList();	  
		  for(index=0;index<indexes.length;index++) {
	 	  	     var firstAtt=document.getElementById("mapFirstDSNAttr"+indexes[index]).value;
				 var secondAtt=document.getElementById("mapWithSecondDSNAttr"+indexes[index]).value;
				 if((firstAtt == '') ||(secondAtt == '')) {
					 showEmptyDialog(MSG_PLS_CHOOSE_CROS_MAP_ATT,MSG_ERR_ERROR);
					 return false;
				 }
		  }
		  return true;
	}

	function validateFirstDSNAttributes() {
		  var indexes=getIndexList();
		  var finalDSNAttr = "";
		  for(index=0;index<indexes.length;index++) {
			     finalDSNAttr=finalDSNAttr+" "+document.getElementById("mapFirstDSNAttr"+indexes[index]).value+" ";
		  }
		  
	      for(index=0;index<indexes.length;index++) {
	    	  var attrValue=" "+document.getElementById("mapFirstDSNAttr"+indexes[index]).value+" ";
			  var uniqueCount=finalDSNAttr.split(attrValue).length-1;
			  if(uniqueCount>1 && attrValue!="") {
				   showEmptyDialog(attrValue +MSG_IS_MAP_MULTI_TIMES, CAPTION_ALERT);
		           return false;
			  }
	        }
	      return true;
	}

	function validateSecondDSNAttributes() {
		
		  var indexes=getIndexList();
		  var finalDSNAttr = "";
		  for(index=0;index<indexes.length;index++) {
			     finalDSNAttr=finalDSNAttr+" "+document.getElementById("mapWithSecondDSNAttr"+indexes[index]).value+" ";
		  }
		  
	      for(index=0;index<indexes.length;index++) {
	    	  var attrValue=" "+document.getElementById("mapWithSecondDSNAttr"+indexes[index]).value+" ";
			  var uniqueCount=finalDSNAttr.split(attrValue).length-1;
			  if(uniqueCount>1 && attrValue!="") {
				   showEmptyDialog(attrValue +MSG_IS_MAP_MULTI_TIMES, CAPTION_ALERT);
		           return false;
			  }
	        }
	      return true;
	}
	
	
 

        
          function isSplCharGivenExists(str,spchar)
        {      
// this validation should be remove afetr new manageconfiguration.jsp comes

            } 




        function trimAll(sString)
      	{
      	
      	   /*
      	   
      	    if(sString=='undefined' || sString==null)
      	        return "";
      	        
      	        */
      	        	        	     	      	      	      
			if(sString != null && sString.length >1)	
      		while (sString.substring(0,1) == ' ')
      		{
      			sString = sString.substring(1, sString.length);
      		}
			if(sString != null && sString.length >1)	      		
      		while (sString.substring(sString.length-1,  sString.length) == ' ')
      		{
      			sString = sString.substring(0,sString.length-1);
      		}
      		return sString;
      	}
      	
   
	function validateDataSourceName(dsInput) {

			if(!ajaxTxtBoxSplCh(dsInput.attr('value'))){
					return false;
			}		 
	 loadData('CheckDatasourceName',dsInput, setCheckDatasourceNameStatus, 'insert');
    }
	
	function validatej2eeDataSourceName(dsInput) {
		
		if(!ajaxTxtBoxSplCh(dsInput.attr('value'))){
				return false;
		}		 
loadData('CheckJ2eeDatasourceName',dsInput, setCheckDatasourceNameStatus, 'insert');
}
    
    function isOnlyAllowedCharactersExist(passedValue,allowedCharacters){
    	
    	if(allowedCharacters == null || trimAll(allowedCharacters).length == 0){
			
			return false;
			
		}
		
		if(passedValue != "") {
		
			var passedValueLength =  passedValue.length;
			
			for (var i = 0; i < passedValueLength ; i++) {
				
				if (allowedCharacters.indexOf(passedValue.charAt(i)) == -1){
					
					return false;
					
				}
				
			}
			
		}
	
		return true;
    } 

	function isCharactersExist(passedValue,allowedCharacters){
    	
    	if(allowedCharacters == null || trimAll(allowedCharacters).length == 0){
			
			return false;
			
		}
		
		if(passedValue != "") {
		
			var passedValueLength =  passedValue.length;
			
			for (var i = 0; i < passedValueLength ; i++) {
				
				if (allowedCharacters.indexOf(passedValue.charAt(i)) != -1){
					
					return true;
					
				}
				
			}
			
		}
	
		return false;
    } 
    
function validateIntervalValue(intervalValue, objName){
	
	if(intervalValue != '' || intervalValue != null){

		if(intervalValue < 0){
			showEmptyDialog( MSG_PLS_ENTER_VALID+objName+MSG_GREATER_SIGN, CAPTION_ALERT);   
			return false;
		}
		
		if(isNaN(intervalValue)==true){	
			showEmptyDialog(objName+MSG_SHOULD_BE_NUM, CAPTION_ALERT);
			return false;
		}
		
		if(intervalValue.indexOf('.') > -1){
			showEmptyDialog(objName+MSG_MUST_BE_INT, CAPTION_ALERT);
			return false;
		}
	}
	return true;
}
function validateIntervalValue(intervalValue, objName,allowNegative){
	
	if(intervalValue != '' || intervalValue != null){

		if(!allowNegative && intervalValue < 0){
			showEmptyDialog( MSG_PLS_ENTER_VALID+objName+MSG_GREATER_SIGN, CAPTION_ALERT);   
			return false;
		}
		
		if(isNaN(intervalValue)==true){	
			showEmptyDialog(objName+MSG_SHOULD_BE_NUM, CAPTION_ALERT);
			return false;
		}
		
		if(intervalValue.indexOf('.') > -1){
			showEmptyDialog(objName+MSG_MUST_BE_INT, CAPTION_ALERT);
			return false;
		}
	}
	return true;
}


  function resetNonAddressFields(tmpObj)
  {
    var nonAddressString = "address,addCity,addCounty,addState,addCountry,addZipCode";
    var nonAddressArray = nonAddressString.split(",");
    var addressFieldSelectStatus = true;
    var disablearray = "excelLatitude,excelLongitude,excelCoordinates,latitude,longitude,coordinates";
    var array = disablearray.split(",");
    var selectedVal = dijit.byId(tmpObj.id).getValue();
    try{

        for(var count=0;count < nonAddressArray;count++ ){
            
            if(dijit.byId(nonAddressArray[count]) != null  && dijit.byId(nonAddressArray[count]).getValue() != "")
            {
                addressFieldSelectStatus = false;
                break;
            }
        }   
     }catch(err){}


        
    if(addressFieldSelectStatus &&  selectedVal == "")
    {


        try{
            
             for(var j=0; j<array.length;j++){
                dijit.byId(array[j]).setAttribute('displayedValue', "");
                dijit.byId(array[j]).setAttribute('disabled', false);
            }
         }catch(err){}

    }else{

        try{
            
            for(var j=0; j<array.length;j++){
                //dijit.byId(array[j]).attr('value', SELECT_TEXT);
              dijit.byId(array[j]).setAttribute('disabled', true);
            }
         }catch(err){}

    
    }
  }

