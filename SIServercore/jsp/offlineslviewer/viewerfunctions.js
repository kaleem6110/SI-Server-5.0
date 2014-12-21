function refreshTileWindows() {
    try {
        for (intLength = 0; intLength <= document.body.childNodes.length - 1; intLength++) {
            if (document.body.childNodes[intLength].childNodes.length > 0) {
                if (document.body.childNodes[intLength].childNodes[0].nodeName == "IFRAME") {
				if (window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".swf") != -1 || window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".flv") != -1) {
						var flashMovie = document.body.childNodes[intLength].childNodes[0].contentWindow.document[0];
						//Addition : minimized window is not getting refresh
						if (flashMovie != undefined && flashMovie != null) {
							//if (document.body.childNodes[intLength].childNodes[0].contentWindow.checkIsCameraSensitive() == "True") {
							var flashOuterHtml = document.body.childNodes[intLength].childNodes[0].contentWindow.document[0].outerHTML;
							if (flashOuterHtml.search('ArtifactSelectionDashboard.swf') <= 0) {
								var searchText = flashOuterHtml.search('callFlashFromJS="null"');
								if (searchText > 0) {
									flashOuterHtml = flashOuterHtml.replace('callFlashFromJS="null"', '');
									flashMovie.outerHTML = flashOuterHtml;
								}
								//Addition ended here
								else if (flashMovie.callFlashFromJS != undefined && flashMovie.callFlashFromJS != null) {
									flashMovie.callFlashFromJS('_refresh', '');
								}
							}
							//}
						}
					}
                }
            }
        }
    }
    catch (err) { }
}

function reloadTileWindows(layerId, windowName, dashboardId) {
    try {
        for (intLength = 0; intLength <= document.body.childNodes.length - 1; intLength++) {
            if (document.body.childNodes[intLength].childNodes.length > 0) {
                if (document.body.childNodes[intLength].childNodes[0].nodeName == "IFRAME") {
                    if (window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".swf") != -1 || window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".flv") != -1) {
                        var flashMovie = document.body.childNodes[intLength].childNodes[0].contentWindow.document[0];
                        //Addition : minimized window is not getting refresh
                        if (flashMovie != undefined && flashMovie != null) {
                            //if (document.body.childNodes[intLength].childNodes[0].contentWindow.document[0].parentNode.children[1].value == layerId && document.body.childNodes[intLength].childNodes[0].contentWindow.document[0].parentNode.children[2].value == dashboardId && document.body.childNodes[intLength].childNodes[0].contentWindow.document[0].parentNode.children[3].value == windowName) {
                            if (document.body.childNodes[intLength].childNodes[0].contentWindow.getLayerId() == layerId && document.body.childNodes[intLength].childNodes[0].contentWindow.getDashBoardId() == dashboardId) {
                                var flashOuterHtml = document.body.childNodes[intLength].childNodes[0].contentWindow.document[0].outerHTML;
                                var searchText = flashOuterHtml.search('callFlashFromJS="null"');
                                if (searchText > 0) {
                                    flashOuterHtml = flashOuterHtml.replace('callFlashFromJS="null"', '');
                                    flashMovie.outerHTML = flashOuterHtml;
                                }
                                //Addition ended here
                                else if (flashMovie.callFlashFromJS != undefined && flashMovie.callFlashFromJS != null) {
                                    flashMovie.callFlashFromJS('_refresh', '');
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    catch (err) { }
}



function _lookat(coordStr) {
    try {
        if (coordStr != null) {
            //We have added parent. because jsp was not containg the apphost object
            var control = parent.document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.LookatFunction(coordStr, null);
            }
            else {
                control = document.getElementById("appHostObject");
                if (control != undefined && control != null) {
                    control.Content.Page.LookatFunction(coordStr, null);
                }
                else {
                    control = window.opener.document.getElementById("appHostObject");
                    if (control != undefined && control != null) {
                        control.Content.Page.LookatFunction(coordStr, null);
                    }
                }
            }
        }
    }
    catch (err) { alert(err); }
}

function _lookat(coordStr, rangeStr) {
    try {
        if (coordStr != null) {
            //We have added parent. because jsp was not containg the apphost object
            var control = parent.document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.LookatFunction(coordStr, rangeStr);
            }
            else {
                control = document.getElementById("appHostObject");
                if (control != undefined && control != null) {
                    control.Content.Page.LookatFunction(coordStr, rangeStr);
                }
                else {
                    control = window.opener.document.getElementById("appHostObject");
                    if (control != undefined && control != null) {
                        control.Content.Page.LookatFunction(coordStr, rangeStr);
                    }
                }
            }
        }
    }
    catch (err) { alert(err); }
}

function _setHighlightPlacemarkStyle(highlightPlacemarkStyle) {
    try {
        if (highlightPlacemarkStyle != null) {

            //We have added parent. because jsp was not containg the apphost object
            var control = parent.document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.SetHighlightPlacemarkStyle(highlightPlacemarkStyle);
            }
            else {
                control = document.getElementById("appHostObject");
                if (control != undefined && control != null) {
                    control.Content.Page.SetHighlightPlacemarkStyle(highlightPlacemarkStyle);
                }
                else {
                    control = window.opener.document.getElementById("appHostObject");
                    if (control != undefined && control != null) {
                        control.Content.Page.SetHighlightPlacemarkStyle(highlightPlacemarkStyle);
                    }
                }
            }
        }
    }
    catch (err) { alert(err); }
}

function _highlight(coordStr, dashboardId, layerId) {
    try {
        if (coordStr != null) {

            //We have added parent. because jsp was not containg the apphost object
            var control = parent.document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                if (coordStr != "") {
                    control.Content.Page.DashBoardHighlightPlacemark(coordStr[0], dashboardId, layerId);
                }
                else {
                    control.Content.Page.RemoveHighlightPlacemark(dashboardId, layerId);
                }
            }
            else {
                control = document.getElementById("appHostObject");
                if (control != undefined && control != null) {
                    if (highlightPlacemarkCoords != "") {
                        control.Content.Page.DashBoardHighlightPlacemark(coordStr[0], dashboardId, layerId);
                    }
                    else {
                        control.Content.Page.RemoveHighlightPlacemark(dashboardId, layerId);
                    }
                }
                else {
                    control = window.opener.document.getElementById("appHostObject");
                    if (control != undefined && control != null) {
                        if (coordStr != "") {
                            control.Content.Page.DashBoardHighlightPlacemark(coordStr[0], dashboardId, layerId);
                        }
                        else {
                            control.Content.Page.RemoveHighlightPlacemark(dashboardId, layerId);
                        }
                    }
                }
            }
        }
    }
    catch (err) { alert(err); }
}


function openInfoframe(urlToOpen) {
    try {
        var control = document.getElementById("appHostObject");
        var name = "Info Frame Window";
        if (control != undefined && control != null) {
            control.Content.Page.OpenInfoWindow(name, urlToOpen);
        }
        else {
            control = parent.document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.OpenInfoWindow(name, urlToOpen);
            }
            else {
                control = window.opener.document.getElementById("appHostObject");
                if (control != undefined && control != null) {
                    control.Content.Page.OpenInfoWindow(name, urlToOpen);
                }
            }
        }
    } catch (er) { }
}

function openInfoframeById(urlId, urlToOpen) {
    try {
        var control = document.getElementById("appHostObject");
        var name = "Info Frame Window";
        if (control != undefined && control != null) {
            control.Content.Page.OpenInfoWindow(name, urlToOpen);
        }
        else {
            control = parent.document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.OpenInfoWindow(name, urlToOpen);
            }
            else {
                control = window.opener.document.getElementById("appHostObject");
                if (control != undefined && control != null) {
                    control.Content.Page.OpenInfoWindow(name, urlToOpen);
                }
            }
        }
    } catch (er) { }
}

function openDashboardFrameById(urlId, urlToOpen, layerId, layerName, dashboardId) {
    try {
        var control = document.getElementById("appHostObject");
        if (control != undefined && control != null) {
            control.Content.Page.OpenDashBoardInfoWindow(urlId, urlToOpen, layerId, layerName, dashboardId);
        }
        else {
            control = parent.document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.OpenDashBoardInfoWindow(urlId, urlToOpen, layerId, layerName, dashboardId);
            }
            else {
                control = window.opener.document.getElementById("appHostObject");
                if (control != undefined && control != null) {
                    control.Content.Page.OpenDashBoardInfoWindow(urlId, urlToOpen, layerId, layerName, dashboardId);
                }
            }
        }
    } catch (er) { }
}

function _refreshLink(name) {
    try {
        if (name) {
            var control = parent.document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.RefreshLinkWithParameters(name);
            }
            else {
                control = document.getElementById("appHostObject");
                if (control != undefined && control != null) {
                    control.Content.Page.RefreshLinkWithParameters(name);
                }
                else {
                    control = window.opener.document.getElementById("appHostObject");
                    if (control != undefined && control != null) {
                        control.Content.Page.RefreshLinkWithParameters(name);
                    }
                }
            }
        }
    } catch (e) {
        alert('Error [' + e.message + '] occurred while refreshing link [' + name + ']');
    }
}


function _setTimeRange(timeStr) {
    var control = parent.document.getElementById("appHostObject");
    if (control != undefined && control != null) {
        control.Content.Page.SetSliderTimer(timeStr);
    }
    else {
        control = document.getElementById("appHostObject");
        if (control != undefined && control != null) {
            control.Content.Page.SetSliderTimer(timeStr);
        }
        else {
            control = window.opener.document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.SetSliderTimer(timeStr);
            }
        }
    }
}


function _getCurrentBoundingBox() {
    var latLonBox;
    var control = parent.document.getElementById("appHostObject");
    if (control != undefined && control != null) {
        latLonBox = control.Content.Page.GetCurrentViewport();
    }
    else {
        control = document.getElementById("appHostObject");
        if (control != undefined && control != null) {
            latLonBox = control.Content.Page.GetCurrentViewport();
        }
        else {
            control = window.opener.document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                latLonBox = control.Content.Page.GetCurrentViewport();
            }
        }
    }
    return latLonBox;
}

function openDashboardHelpWindow(ecoexpml, ecosid, artifactName, dashboardId, dashboardName) {
    var url = 'jsp/help/dashboardHelpContent.jsp?ecoexpml=' + ecoexpml + '&ecosid=' + ecosid + '&artifactName=' + artifactName + '&dashboardId=' + dashboardId + '&dashboardName=' + dashboardName;
    var control = parent.document.getElementById("appHostObject");
    if (control != undefined && control != null) {
        control.Content.Page.OpenDashboardHelpWindow(url, ecoexpml, ecosid, artifactName, dashboardId, dashboardName);
    }
    else {
        control = document.getElementById("appHostObject");
        if (control != undefined && control != null) {
            control.Content.Page.OpenDashboardHelpWindow(url, ecoexpml, ecosid, artifactName, dashboardId, dashboardName);
        }
        else {
            control = window.opener.document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.OpenDashboardHelpWindow(url, ecoexpml, ecosid, artifactName, dashboardId, dashboardName);
            }
        }
    }
}

function openDashboardExternalWindow(url, dashboardId) {
    var control = parent.document.getElementById("appHostObject");
    if (control != undefined && control != null) {
        control.Content.Page.OpenDashboardExternalWindow(url, dashboardId);
    }
    else {
        control = document.getElementById("appHostObject");
        if (control != undefined && control != null) {
            control.Content.Page.OpenDashboardExternalWindow(url, dashboardId);
        }
    }
}


function showControls(dashboardDivId, flag) {
    var control = parent.document.getElementById("appHostObject");
    if (control != undefined && control != null) {
        control.Content.Page.ShowDashboardControls(dashboardDivId, flag);
    }
    else {
        control = document.getElementById("appHostObject");
        if (control != undefined && control != null) {
            control.Content.Page.ShowDashboardControls(dashboardDivId, flag);
        }
        else {
            control = window.opener.document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.ShowDashboardControls(dashboardDivId, flag);
            }
        }
    }
}

function showOnlyPrimaryControls(layerId, header, flag) {
    try {
        for (intLength = 0; intLength <= document.body.childNodes.length - 1; intLength++) {
            if (document.body.childNodes[intLength].childNodes.length > 0) {
                if (document.body.childNodes[intLength].childNodes[0].nodeName == "IFRAME") {
                    if (window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".swf") != -1 || window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".flv") != -1) {
                        if (document.body.childNodes[intLength].childNodes[0].contentWindow.hdnLayerId != null && document.body.childNodes[intLength].childNodes[0].contentWindow.hdnName != null) {
                            if (document.body.childNodes[intLength].childNodes[0].contentWindow.hdnLayerId.value == layerId &&
                document.body.childNodes[intLength].childNodes[0].contentWindow.hdnName.value == header) {
                                var flashMovie = document.body.childNodes[intLength].childNodes[0].contentWindow.document[0];
                                //Addition : minimized window is not getting refresh
                                if (flashMovie != undefined && flashMovie != null) {
                                    //if (document.body.childNodes[intLength].childNodes[0].contentWindow.checkIsCameraSensitive() == "True") {
                                    var flashOuterHtml = document.body.childNodes[intLength].childNodes[0].contentWindow.document[0].outerHTML;
                                    if (flashOuterHtml.search('ArtifactSelectionDashboard.swf') <= 0) {
                                        var searchText = flashOuterHtml.search('callFlashFromJS="null"');
                                        if (searchText > 0) {
                                            flashOuterHtml = flashOuterHtml.replace('callFlashFromJS="null"', '');
                                            flashMovie.outerHTML = flashOuterHtml;
                                        }
                                        //Addition ended here
                                        else if (flashMovie.callFlashFromJS != undefined && flashMovie.callFlashFromJS != null) {
                                            flashMovie.callFlashFromJS('_showOnlyPrimaryControls', flag);
                                        }
                                    }
                                }
                                //}
                            }
                        }
                    }
                }
            }
        }
    }
    catch (err) { alert(err); }
}


function refreshDashboards(layerName, dashboardId) {
    try {
        var control = parent.document.getElementById("appHostObject");
        if (control != undefined && control != null) {
            control.Content.Page.RefreshDashboards(layerName, dashboardId);
        }
        else {
            control = document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.RefreshDashboards(layerName, dashboardId);
            }
            else {
                control = window.opener.document.getElementById("appHostObject");
                if (control != undefined && control != null) {
                    control.Content.Page.RefreshDashboards(layerName, dashboardId);
                }
            }
        }
    }
    catch (err) { alert(err); }
}

function popup(url, windowname) {
    try {
        var width = screen.width / 2;
        var height = screen.height / 2;
        var left = (screen.width / 4);
        var top = (screen.height / 4);
        var params = 'width=' + width + ', height=' + height;
        params += ', top=' + top + ', left=' + left;
        params += ', directories=no';
        params += ', location=no';
        params += ', menubar=no';
        params += ', resizable=yes';
        params += ', scrollbars=no';
        params += ', status=no';
        params += ', toolbar=no';
        popWin = window.open(url, windowname, params);
        if (window.focus) { popWin.focus() }
    }
    catch (e) {
        alert(e.Message);
    }
}

function reloadWindows(layerId, header, url) {
    try {
        for (intLength = 0; intLength <= document.body.childNodes.length - 1; intLength++) {
            if (document.body.childNodes[intLength].childNodes.length > 0) {
                if (document.body.childNodes[intLength].childNodes[0].nodeName == "IFRAME") {
                    if (window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".swf") != -1 || window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".flv") != -1) {
                        if (document.body.childNodes[intLength].childNodes[0].contentWindow.hdnLayerId != null && document.body.childNodes[intLength].childNodes[0].contentWindow.hdnName != null) {
                            if (document.body.childNodes[intLength].childNodes[0].contentWindow.hdnLayerId.value == layerId &&
                document.body.childNodes[intLength].childNodes[0].contentWindow.hdnName.value == header) {
                                var id = "iFrame" + "_" + layerId + "_" + header;
                                parent.frames[id].window.location.href = url;
                                setTimeout("reloadWindows()", 10000);
                                //document.body.childNodes[intLength].childNodes[0].contentWindow.location.reload(true);
                                //var iframe = document.getElementById(id);
                                //iframe.style.display = "none";
                                //iframe.src = iframe.src;
                                //parent.frames[id].window.location.reload(false);
                            }
                        }
                    }
                }
            }
        }
    }
    catch (err) { alert(err); }
}

function ackAllEventMessages(_selectedEventId) {
    var priorityId, alertName, ackTime, time, userName, message, description, alertTranId, modeId, canAck, alertId, alertSourceType, ackcomm, snoozeInterval
    for (var i = 0; i < _selectedEventId.length; i++) {
        var x = _selectedEventId[i];
        if (i == 0) {
            priorityId = x[0].priorityId;
            alertName = x[0].alertName;
            ackTime = x[0].ackTime;
            time = x[0].time;
            userName = x[0].userName;
            message = x[0].message;
            description = x[0].description;
            alertTranId = x[0].alertTranId;
            modeId = x[0].modeId;
            canAck = x[0].canAck;
            alertId = x[0].alertId;
            alertSourceType = x[0].alertSourceType;
        }
        else if (i == 1) {
            ackcomm = x[0].ackcomm;
            snoozeInterval = x[0].snoozeInterval;
        }

    }
    var pluginid = "appHostObject";
    if (window.parent.document.getElementById(pluginid) != undefined && window.parent.document.getElementById(pluginid) != null) {
        window.parent.document.getElementById(pluginid).content.Page.AcknowledgeAlert(priorityId, alertName, ackTime, time, userName, message, description, alertTranId, modeId, canAck, alertId, alertSourceType, ackcomm, snoozeInterval);
    }
}
var msgs;

function getMessage() {
    return msgs;
}

function showMessages(messages) {
    try {
        if (messages != undefined && messages != null) {
            msgs = messages;
        }
        else {
            msgs = window.parent.msgs;

            for (intLength = 0; intLength <= window.parent.document.body.childNodes.length - 1; intLength++) {
                if (window.parent.document.body.childNodes[intLength].childNodes.length > 0) {
                    if (window.parent.document.body.childNodes[intLength].childNodes[0].nodeName == "IFRAME") {
                        if (window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".swf") != -1 || window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".flv") != -1) {
                            var flashMovie = window.parent.document.body.childNodes[intLength].childNodes[0].contentWindow.document[0];
                            if (flashMovie != undefined && flashMovie != null) {
                                //if (document.body.childNodes[intLength].childNodes[0].contentWindow.checkIsCameraSensitive() == "True") {
                                var flashOuterHtml = window.parent.document.body.childNodes[intLength].childNodes[0].contentWindow.document[0].outerHTML;
                                if (flashOuterHtml.search('EventsGridContent.swf') >= 0) {
                                    if (flashMovie.showMsgs != undefined && flashMovie.showMsgs != null) {
                                        flashMovie.showMsgs(msgs);
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
    catch (ex) {
        alert(ex);
    }
}


function clearAckMessages(_headers) {
    for (intLength = 0; intLength <= window.parent.document.body.childNodes.length - 1; intLength++) {
        if (window.parent.document.body.childNodes[intLength].childNodes.length > 0) {
            if (window.parent.document.body.childNodes[intLength].childNodes[0].nodeName == "IFRAME") {
                if (window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".swf") != -1 || window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".flv") != -1) {
                    var flashMovie = window.parent.document.body.childNodes[intLength].childNodes[0].contentWindow.document[0];
                    if (flashMovie != undefined && flashMovie != null) {
                        //if (document.body.childNodes[intLength].childNodes[0].contentWindow.checkIsCameraSensitive() == "True") {
                        var flashOuterHtml = window.parent.document.body.childNodes[intLength].childNodes[0].contentWindow.document[0].outerHTML;
                        if (flashOuterHtml.search('EventsGridContent.swf') >= 0) {
                            if (flashMovie.callFlashFromJS != undefined && flashMovie.callFlashFromJS != null) {
                                flashMovie.callFlashFromJS('_refreshDataGrid', _headers);
                            }
                        }
                    }
                }
            }
        }
    }
    for (intLength = 0; intLength <= window.document.body.childNodes.length - 1; intLength++) {
        if (window.document.body.childNodes[intLength].childNodes.length > 0) {
            if (window.document.body.childNodes[intLength].childNodes[0].nodeName == "IFRAME") {
                if (window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".swf") != -1 || window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".flv") != -1) {
                    var flashMovie = window.document.body.childNodes[intLength].childNodes[0].contentWindow.document[0];
                    if (flashMovie != undefined && flashMovie != null) {
                        //if (document.body.childNodes[intLength].childNodes[0].contentWindow.checkIsCameraSensitive() == "True") {
                        var flashOuterHtml = window.document.body.childNodes[intLength].childNodes[0].contentWindow.document[0].outerHTML;
                        if (flashOuterHtml.search('EventsGridContent.swf') >= 0) {
                            if (flashMovie.callFlashFromJS != undefined && flashMovie.callFlashFromJS != null) {
                                flashMovie.callFlashFromJS('_refreshDataGrid', _headers);
                            }
                        }
                    }
                }
            }
        }
    }
}


var eventActonsMap = new Array();

function actionEvts(eventActionData, eventActionKey) {
    if (eventActionData != null) {
        var eventArray = eventActionData.split(",");
        var evtActionArray = new Array();
        if (eventArray.length > 0) {
            for (var i = 0; i < eventArray.length; i++) {
                if (eventArray[i] != ";") {
                    var eventAction = eventArray[i];
                    var localArray = eventAction.split(":");
                    evtActionArray[i] = localArray;
                }
            }
            if (!eventActonsMap.hasOwnProperty(eventActionKey)) {
                eventActonsMap[eventActionKey] = evtActionArray;
            }
        }
    }
}

function actionEvtMap() {
    return eventActonsMap;
}

function fireDashboardSilverlightEvent(eventArgs) {
    var obj = actionEvtMap();
    var keys;
    try {
        if (obj != null) {
            for (key in obj) {
                if (key == eventArgs.layerId + "_" + eventArgs.dashboardId) {
                    var eventFunctionArray = new Array();
                    eventFunctionsArray = obj[key];
                    for (var i = 0; i < eventFunctionsArray.length; i++) {
                        var eventFunctionArray = new Array();
                        eventFunctionArray = eventFunctionsArray[i];
                        if (eventArgs.eventName == eventFunctionArray[0]) {
                            try {
                                window[1][eventFunctionArray[1]](eventArgs);

                                //window[eventFunctionArray[1]](eventArgs); 
                            } catch (e) {
                                alert('Mapped javascript function :[' + eventFunctionArray[1] + '] was not found for the event :[' + eventFunctionArray[0] + ']');
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
        alert('Error [' + e.message + '] occurred while getting the eventArgs/firing the Dashboard Event');
    }
}

function clearDashboardActionEventMap(layerId) {
    var eventMap = actionEvtMap();
    var key;
    if (layerId != null && eventMap != null) {
        for (key in eventMap) {
            var keys = key.split("_");
            if (keys != null && keys[0] == layerId) {
                delete actionEvtMap()[key];
            }
        }
    }
}

function callToFlash(method, data) {
    try {
        for (intLength = 0; intLength <= window.parent.document.body.childNodes.length - 1; intLength++) {
            if (window.parent.document.body.childNodes[intLength].childNodes.length > 0) {
                if (window.parent.document.body.childNodes[intLength].childNodes[0].nodeName == "IFRAME") {
                    if (window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".swf") != -1 || window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".flv") != -1) {
                        var flashMovie = window.parent.document.body.childNodes[intLength].childNodes[0].contentWindow.document[0];
                        if (flashMovie != undefined && flashMovie != null) {
                            //if (document.body.childNodes[intLength].childNodes[0].contentWindow.checkIsCameraSensitive() == "True") {
                            var flashOuterHtml = window.parent.document.body.childNodes[intLength].childNodes[0].contentWindow.document[0].outerHTML;
                            //if (flashOuterHtml.search('EventsGridContent.swf') >= 0) {
                            if (flashMovie.callFlashFromJS != undefined && flashMovie.callFlashFromJS != null) {
                                flashMovie.callFlashFromJS(method, data);
                                //}
                            }
                        }
                    }
                }
            }
        }
        for (intLength = 0; intLength <= window.document.body.childNodes.length - 1; intLength++) {
            if (window.document.body.childNodes[intLength].childNodes.length > 0) {
                if (window.document.body.childNodes[intLength].childNodes[0].nodeName == "IFRAME") {
                    if (window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".swf") != -1 || window.document.body.childNodes[intLength].childNodes[0].src.indexOf(".flv") != -1) {
                        var flashMovie = window.document.body.childNodes[intLength].childNodes[0].contentWindow.document[0];
                        if (flashMovie != undefined && flashMovie != null) {
                            //if (document.body.childNodes[intLength].childNodes[0].contentWindow.checkIsCameraSensitive() == "True") {
                            var flashOuterHtml = window.document.body.childNodes[intLength].childNodes[0].contentWindow.document[0].outerHTML;
                            //if (flashOuterHtml.search('EventsGridContent.swf') >= 0) {
                            if (flashMovie.callFlashFromJS != undefined && flashMovie.callFlashFromJS != null) {
                                flashMovie.callFlashFromJS(method, data);
                            }
                        }
                    }
                }
            }
        }
    } catch (err) {
        alert("Error :" + err);
    }
}

function registerDashboardForEvents(ecodashbaordEvents, layerId_dashboardId) {
    try {
        var control = parent.document.getElementById("appHostObject");
        if (control != undefined && control != null) {
            control.Content.Page.RegisterDashboardForEvents(ecodashbaordEvents, layerId_dashboardId);
        }
        else {
            control = document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.RegisterDashboardForEvents(ecodashbaordEvents, layerId_dashboardId);
            }
            else {
                control = window.opener.document.getElementById("appHostObject");
                if (control != undefined && control != null) {
                    control.Content.Page.RegisterDashboardForEvents(ecodashbaordEvents, layerId_dashboardId);
                }
            }
        }
    }
    catch (err) { alert(err); }
}

function onSearchArtifacts(advancedSearchArgs) {
    try {
        var control = parent.document.getElementById("appHostObject");
        if (control != undefined && control != null) {
            control.Content.Page.OnSearchDashboardsPopUp(advancedSearchArgs, "_searchArtifacts", advancedSearchArgs.layerId, advancedSearchArgs.dashboardId);
        }
        else {
            control = document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.OnSearchDashboardsPopUp(advancedSearchArgs, "_searchArtifacts", advancedSearchArgs.layerId, advancedSearchArgs.dashboardId);
            }
            else {
                control = window.opener.document.getElementById("appHostObject");
                if (control != undefined && control != null) {
                    control.Content.Page.OnSearchDashboardsPopUp(advancedSearchArgs, "_searchArtifacts", advancedSearchArgs.layerId, advancedSearchArgs.dashboardId);
                }
            }
        }
        //onSearchDashboardsPopUp(advancedSearchArgs, "_searchArtifacts");
    } catch (err) {
        alert("Error :" + err);
    }
}

function onSearchDashboards(advancedSearchArgs) {
    try {
        var control = parent.document.getElementById("appHostObject");
        if (control != undefined && control != null) {
            control.Content.Page.OnSearchDashboardsPopUp(advancedSearchArgs, "_searchDashboardData", advancedSearchArgs.layerId, advancedSearchArgs.dashboardId);
        }
        else {
            control = document.getElementById("appHostObject");
            if (control != undefined && control != null) {
                control.Content.Page.OnSearchDashboardsPopUp(advancedSearchArgs, "_searchDashboardData", advancedSearchArgs.layerId, advancedSearchArgs.dashboardId);
            }
            else {
                control = window.opener.document.getElementById("appHostObject");
                if (control != undefined && control != null) {
                    control.Content.Page.OnSearchDashboardsPopUp(advancedSearchArgs, "_searchDashboardData", advancedSearchArgs.layerId, advancedSearchArgs.dashboardId);
                }
            }
        }
        //onSearchDashboardsPopUp(advancedSearchArgs, "_searchDashboardData");
    } catch (err) {
        alert("Error :" + err);
    }
}

function callToFlashMovie(iframe, advancedSearchArgs, method) {
    if (iframe != undefined && iframe != null) {
        var flashMovie = iframe.contentWindow.document[0];
        if (flashMovie.callFlashFromJS != undefined && flashMovie.callFlashFromJS != null) {
            var searchCriterias = advancedSearchArgs.searchCriteria;
            flashMovie.callFlashFromJS(method, searchCriterias);
        }
    }
}

function callScriptDashboardFunction(functionName, params) {
    // js object parsing params from key=value 
    var finalParams = {};
    var paramKeyVal = null;
    if (params.toString().indexOf(":") > 0) {
        var param = null;
        var paramsSplit = params.split(":");

        for (i = 0; i < paramsSplit.length; i++) {
            param = paramsSplit[i];
            paramKeyVal = param.split("=");
            finalParams[paramKeyVal[0]] = paramKeyVal[1];
        }
    } else if (params.toString().indexOf("=") > 0) {
        paramKeyVal = params.split("=");
        finalParams[paramKeyVal[0]] = paramKeyVal[1];
    } else {
        finalParams = params;
    }
    window[functionName](finalParams);
}
