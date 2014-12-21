// holds ids of popup windows
var swfObjectsPopup=new Array();

// Holds all popup windows
var popupWindows= new Array();


//Remove the closed popup windows from popup list.
function refreshPopUpList()
{
	var id;
	var win;
	for(i=0;i < swfObjectsPopup.length;i++)
	{
		id = swfObjectsPopup[i];
		win = popupWindows[id];
		if(win!= null && win.closed)
		{
			swfObjectsPopup.splice(i,1);   //Remove from array
			delete popupWindows[id];		// Remove from associative array 
			i--;							//element is removed from array so restoring the index
		}
	}
}

function getSwfObjectsPopupCollection(){
		refreshPopUpList();
		var id = "";
		for(i=0;i < swfObjectsPopup.length;i++){
		if(id == ""){
			id = swfObjectsPopup[i];
		}else{
			id = id+","+swfObjectsPopup[i];
		}
	}
		return id ;
}
//open the popup window
function loadDashboardInExternalWindow(url,dashboardId){
	refreshPopUpList();
	//Removing space from dashboard id.
	var win=window.open( url, dashboardId,'left='+screen.width/4+', top='+screen.height/4+', width='+screen.width/2+',height='+screen.height/2+',resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no,scrollbars=yes');//,fullscreen=yes
	if(win != null){
		if(!popupWindows.hasOwnProperty(dashboardId))       //check for duplicate windows, helps to avoid duplication of window references.
		{
			swfObjectsPopup.push(dashboardId);		
		}
		popupWindows[dashboardId]=win;	
	}
	//return win;
}

//Refresh the data on the basis of advance search dashboard
function onSearchDashboardsPopUp(advancedSearchArgs,method)
{
	refreshPopUpList();
	for(i=0;i<swfObjectsPopup.length;i++)
	{
		var id = swfObjectsPopup[i];
		//All dashboard of same layer are refreshed.
		if(id.indexOf(advancedSearchArgs.layerId) == 0){
			sendToFlashFromPopUp(id,method,advancedSearchArgs);
		}			
	}
}

//Send onLoadStart and onLoadComplete methods to dashboard opened in external window
function handleEventInExternalWindow(method,layerId,extData)
{
	refreshPopUpList();
	for(i=0;i<swfObjectsPopup.length;i++)
	{
		var id = swfObjectsPopup[i];
		if(id.indexOf(layerId) == 0){
			sendToFlashFromPopUp(id,method,extData);
		}			
	}
}

//Refresh the data on the basis of artifact selection dashboard
function refreshDashboardsPopUp(method,data)
{
	refreshPopUpList();
	for(i=0;i<swfObjectsPopup.length;i++)
	{
		var id = swfObjectsPopup[i];
		sendToFlashFromPopUp(id,method,data);
	}
}

//Refresh the data in camera sensitive mode
function fireViewChangedPopUp(method,data) {
	
	refreshPopUpList();
	for(i=0;i<swfObjectsPopup.length;i++)
	{
		var id = swfObjectsPopup[i];
		var popUpObj = popupWindows[id];
		// check for xcelsius type in the dashboard url for xmldatatype property
		//if its xcelsius referesh frame otherwise skip.
		if(popUpObj.location.href.indexOf("xcelcius")!=-1){
			var url = popUpObj.location.href;
			var index = url.indexOf("random");
			if(index > 0) {
				url = url.substring(0,(index+6))+"%3D"+Math.random();

			}
		  popUpObj.location.href=url;
		}
        sendToFlashFromPopUp(id, method, data);
	}
}


//Call the flash method
function sendToFlashFromPopUp(id, method, data)
{
	try {
		var win = popupWindows[id];
        var flashMovie = getFlashMovieObjectFromPopUp(getSWFId(id),win);
        return flashMovie.callFlashFromJS(method, data);
    }
    catch (e) {
        //alert('Error ['+e.message+'] occurred while calling a function on the flash object');
    }
}

function getSWFId(iframeId) {
    return "swf_"+iframeId.replaceAll(" ","_");
}

function _getDashboardImagePopUp(iframeId) {
    refreshPopUpList();
	sendToFlashFromPopUp(iframeId,"_getDashboardImage");
}
//Return the swf object for specific popup.
function getFlashMovieObjectFromPopUp(movieName,popUpWindowOject){
    if (popUpWindowOject.document[movieName]){
        return popUpWindowOject.document[movieName];
    }
    return null;
}

//Remove all popups belong to specific layer. This method is called frome geframe
function closeLayerPopUp(layerId)
{
	for(i=0;i<swfObjectsPopup.length;i++)
	{
		var id = swfObjectsPopup[i];
		if(id.indexOf(layerId) == 0 && !popupWindows[id].closed)
		{
			popupWindows[id].close();
		}
	}
	refreshPopUpList();
}

//recieve comma separted list of id's
function closeLaunchDashboardById(dashboardIds){
	var dashboards = dashboardIds.split(',');
	var dashboardId;
	for(i=0;i<dashboards.length;i++){
		dashboardId = dashboards[i];
		if(popupWindows.hasOwnProperty(dashboardId) && !popupWindows[dashboardId].closed){
			popupWindows[dashboardId].close();
		}
	}
	refreshPopUpList();
}

//close all dashboards on module change and browser change
function closeAllLaunchDashboards(){
	for(i=0;i<swfObjectsPopup.length;i++)
	{
		var id = swfObjectsPopup[i];
		if(!popupWindows[id].closed)
		{
			popupWindows[id].close();
		}
	}
}

//Dispatch close event
function closeEvent(dashboardId){
	sendToFlashFromPopUp(dashboardId, "_closeWindow", "");
}

//Refresh the popup dashboards on the basis of Time
 function _setDashboardTimePopUp(timeRange,layerId,refreshDashboardIdList,excludeDashboardId) {
	excludeDashboardId = excludeDashboardId + "_popup";
	if(refreshDashboardIdList == null){
		//refresh all popup dashboards
		for(i=0;i<swfObjectsPopup.length;i++){
			if(swfObjectsPopup[i] != excludeDashboardId){
				sendToFlashFromPopUp(swfObjectsPopup[i], "_setTime", timeRange);
			}
		}
	}else{
		var id;
		for(i=0;i<refreshDashboardIdList.length;i++){
			id = refreshDashboardIdList[i] + "_popup";
			sendToFlashFromPopUp(id, "_setTime", timeRange);
		}
	}
 }
