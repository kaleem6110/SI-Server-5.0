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

//open the popup window
function loadDashboardExternalWindow(url,dashboardId){
	refreshPopUpList();
	var popWin = window.open(url,dashboardId,'left='+screen.width/4+', top='+screen.height/4+', width='+screen.width/2+',height='+screen.height/2+',resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no,scrollbars=yes');//,fullscreen=yes
	if (popWin != null) {
		if(!popupWindows.hasOwnProperty(dashboardId))       //check for duplicate windows, helps to avoid duplication of window references.
		{
			swfObjectsPopup.push(dashboardId);							
			popupWindows[dashboardId] = popWin;
		}
		if (window.focus) { popWin.focus() }
	}
}

//Refresh the data on the basis of advance search dashboard
function onSearchDashboardsPopUp(advancedSearchArgs, method) {
    refreshPopUpList();
    for (i = 0; i < swfObjectsPopup.length; i++) {
        var id = swfObjectsPopup[i];
        //All dashboard of same layer are refreshed.
        if (id.indexOf(advancedSearchArgs.layerId) == 0) {
            var searchDashboardData = advancedSearchArgs.searchCriteria;
            sendToFlashFromPopUp(id, method, searchDashboardData);
        }
    }
}

//Refresh the data in camera sensitive mode
function fireViewChangedPopUp(method, data) {
    refreshPopUpList();
    for (i = 0; i < swfObjectsPopup.length; i++) {
        var id = swfObjectsPopup[i];
        var popUpObj = popupWindows[id];
        // check for xcelsius type in the dashboard url for xmldatatype property
        //if its xcelsius referesh frame otherwise skip.
        if (popUpObj.location.href.indexOf("xcelcius") != -1) {
            var url = popUpObj.location.href;
            var index = url.indexOf("random");
            if (index > 0) {
                url = url.substring(0, (index + 6)) + "%3D" + Math.random();

            }
            popUpObj.location.href = url;
        }
        sendToFlashFromPopUp(id, method, data);
    }
}


//Call the flash method
function sendToFlashFromPopUp(id, method, data) {
    try {
        var win = popupWindows[id];
        var flashMovie = win.getSwfObject();
        if (flashMovie.callFlashFromJS != undefined && flashMovie.callFlashFromJS != null) {
            flashMovie.callFlashFromJS(method, data);
        }
    }
    catch (e) {
        //alert('Error ['+e.message+'] occurred while calling a function on the flash object');
    }
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

function closeAllLayerPopUp() {
    for (i = 0; i < swfObjectsPopup.length; i++) {
        var id = swfObjectsPopup[i];
        popupWindows[id].close();
    }
    refreshPopUpList();
}

