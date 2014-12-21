/*++++++++++++++++++++++++++++++++++++++++++++++
* Intercept Operations -- Space-Time Insight
*+++++++++++++++++++++++++++++++++++++++++++++++*/


/*
Example: 
crudObj.xmlString = <rubberbandregions><rubberbandregion regionTypeId='0' regionName='test_1' label='test_1' regionColor='ff00'  startDate='null' endDate='null' coordinates='-108.29458618164062,31.7445125579834,0.0 -95.37493133544922,41.331539154052734,0.0 -111.5032272338867,40.11515426635742,0.0' viewPort='0gizrH_zk2SAyrognD-gHAA' ecoexpmlIds='null' refreshInterval='0' listType='userList'/></rubberbandregions>

'regionName' in above xmlString is the unique id.


Note: Please use try catch block to handle the exceptions and use any custom alert message in catch block.

 */

/*
* @param crudObj- CRUDInterceptArgs
* @retruns true/false
*
* crudObj.rbLabel - String  Returns the rubber band region label.
* 
*/
function rb_pre_add(crudObj){
	//alert("rb_pre_add :: rbLabel - "+ crudObj.rbLabel);
	//alert("rb_pre_add :: xmlString - "+ crudObj.xmlString);
    return true;
}
 
/*
* @param crudObj- CRUDInterceptArgs
*
* crudObj.rbLabel - String  Returns the rubber band region label.
*/ 
function rb_post_add(crudObj){
	//alert("rb_post_add :: rbLabel - "+ crudObj.rbLabel);
	//alert("rb_post_add :: xmlString - "+ crudObj.xmlString);
}

/*
* @param crudObj- CRUDInterceptArgs
* @retruns true/false
*
* crudObj.rbLabel - String  Returns the rubber band region label.
*/
function rb_pre_edit(crudObj){
	//alert("rb_pre_edit :: rbLabel - "+ crudObj.rbLabel);
	//alert("rb_pre_edit :: xmlString - "+ crudObj.xmlString);
	return true;

}

/*
* @param crudObj- CRUDInterceptArgs
*
* crudObj.rbLabel - String  Returns the rubber band region label.
*/
function rb_post_edit(crudObj){
	//alert("rb_post_edit :: rbLabel - "+ crudObj.rbLabel);
	//alert("rb_post_edit :: xmlString - "+ crudObj.xmlString);
}

/*
* If category is selected/send to delete, crudObj.xmlString example is as below. Please modify your checks accordingly.
*
* <rubberbandcategory label="cat1" userId="1" moduleId="4"><rubberbandcategory label="cat2"><rubberbandcategory 
*label="cat3"></rubberbandcategory><rubberbandregions><rubberbandregion regionTypeId='0' regionName='rb2' label='rb2' regionColor='ff00'  startDate='null' endDate='null' 
*coordinates='-123.51902770996094,37.45585250854492,0.0 -123.27691650390626,41.2292594909668,0.0 -128.81455993652344,39.66612243652344,0.0 
*-123.51902770996094,37.45585250854492,0.0' viewPort='0gizrHh0k2SAyrognD-gHAA' ecoexpmlIds='' refreshInterval='0' 
*listType='userList'/></rubberbandregions></rubberbandcategory><rubberbandregions><rubberbandregion regionTypeId='0' regionName='rb1' label='rb1' regionColor='ff00'  
*startDate='null' endDate='null' coordinates='-125.95549011230467,36.056766510009766,0.0 -122.43440246582032,41.824073791503906,0.0 -134.67535400390625,41.39177703857422,0.0 
*-125.95549011230467,36.056766510009766,0.0' viewPort='0gizrH_zk2SAyrognD-gHAA' ecoexpmlIds='' refreshInterval='0' listType='userList'/></rubberbandregions></rubberbandcategory>
* 
* 
* @param crudObj- CRUDInterceptArgs
* @retruns true/false
*
* crudObj.rbLabel - String  Returns the rubber band region label.
*/
function rb_pre_delete(crudObj){
	//alert("rb_pre_delete :: rbLabel - "+ crudObj.rbLabel);
	//alert("rb_pre_delete :: xmlString - "+ crudObj.xmlString);
	return true;
}

/*
* @param crudObj- CRUDInterceptArgs
*
* crudObj.rbLabel - String  Returns the rubber band region label.
*/
function rb_post_delete(crudObj){
	//alert("rb_post_delete :: rbLabel - "+ crudObj.rbLabel);
	//alert("rb_post_delete :: xmlString - "+ crudObj.xmlString);
}

/*
* @param crudObj- CRUDInterceptArgs
* @retruns true/false
*
* crudObj.rbLabel - String  Returns the rubber band region label.
*/
function rb_pre_load(crudObj){
	//alert("rb_pre_load :: rbLabel - "+ crudObj.rbLabel);
	//alert("rb_pre_load :: xmlString - "+ crudObj.xmlString);
    return true;
}

/*
* @param crudObj- CRUDInterceptArgs
*
* crudObj.rbLabel - String  Returns the rubber band region label.
*/
function rb_post_load(crudObj){
	//alert("rb_post_load :: rbLabel - "+ crudObj.rbLabel);
	//alert("rb_post_load :: xmlString - "+ crudObj.xmlString);
}


/*
 * google earth events pre & post operations API.. all pre events should return true or false..
 * when true is returned the out of the box functionality is exectued otherwise it skips
 * post event methods are called all the times the event is triggered
 */
/**
* frame end event handler.. A frameend event is fired when Earth has finished rendering the viewport. 
* This event will be called many times in succession when the viewport is changing
*/
function preGEFrameEndEvent(){
	return true;
}
/**
* frame end event handler.. A frameend event is fired when Earth has finished rendering the viewport. 
* This event will be called many times in succession when the viewport is changing
*/
function postGEFrameEndEvent(){
	
}
/**
 * view change begin event handler,Event fired when the view begins changing in Earth. This event will be fired once, 
 * followed by successive viewchange events, and ending with a viewchangeend event. 
 */
function preGEViewChangeBeginEvent(){
return true;
}
/**
 * view change begin event handler,Event fired when the view begins changing in Earth. This event will be fired once, 
 * followed by successive viewchange events, and ending with a viewchangeend event. 
 */
function postGEViewChangeBeginEvent(){

}
/**
 * view change end event handler,Event fired when the view stops changing in Earth. 
 */
function preGEViewChangeEndEvent(){
return true;
}
/**
 * view change end event handler,Event fired when the view stops changing in Earth. 
 */
function postGEViewChangeEndEvent(){

}

/**
 * view change begin event handler,Event fired while the view is changing in Earth. 
 * This event will be triggered in rapid succession while the camera is in motion. 
 */
function preGEViewChangeEvent(){
return true;
}
/**
 * view change begin event handler,Event fired while the view is changing in Earth. 
 * This event will be triggered in rapid succession while the camera is in motion. 
 */
function postGEViewChangeEvent(){

}

/**
 * mouse click  event handler,Triggers an event when the user clicks a location in Google Earth with the mouse
  */
function preGEMouseClickEvent(event){
return true;
}
/**
 * mouse click  event handler,Triggers an event when the user clicks a location in Google Earth with the mouse
  */
function postGEMouseClickEvent(event){

}
/**
 * mouse double click  event handler, Triggers an event when the user double clicks a location in Google Earth with the mouse. 
 */
function preGEMouseDblClickEvent(){
return true;
	
}
/**
 * mouse double click  event handler, Triggers an event when the user double clicks a location in Google Earth with the mouse. 
 */
function postGEMouseDblClickEvent(){

}

/**
 * mouse over  event handler,Triggers an event when the user moves the mouse pointer over a location in Google Earth. 
 */
function preGEMouseOverEvent(event){
	return true;
}
/**
 * mouse over  event handler,Triggers an event when the user moves the mouse pointer over a location in Google Earth. 
 */
function postGEMouseOverEvent(event){
	
}

/**
 * mouse down event handler,Triggers an event when the user presses the mouse button over a location in Google Earth. 
 */
function preGEMouseDownEvent(event){
return true;
}
/**
 * mouse down event handler,Triggers an event when the user presses the mouse button over a location in Google Earth. 
 */
function postGEMouseDownEvent(event){
	
}

/**
 * mouse up event handler, Triggers an event when the user releases the mouse button over a location in Google Earth. 
 */
function preGEMouseUpEvent(event){
return true;
}

/**
 * mouse up event handler, Triggers an event when the user releases the mouse button over a location in Google Earth. 
 */
function postGEMouseUpEvent(event){
	
}
/**
 * mouse out event handler,Triggers an event when the user moves the mouse off of the object in Google Earth. 
  */
function preGEMouseOutEvent(event){
return true;
}
/**
 * mouse out event handler,Triggers an event when the user moves the mouse off of the object in Google Earth. 
  */
function postGEMouseOutEvent(event){

}
/**
 * mouse out event handler,Triggers an event when the user moves the mouse inside Google Earth. 
 */
function preGEMouseMoveEvent(event){
return true;
}
/**
 * mouse out event handler,Triggers an event when the user moves the mouse inside Google Earth. 
 */
function postGEMouseMoveEvent(event){
}
	    
/**
 * balloon close event handler..,Event fired when the current balloon is closed. 
 */
function preGEBalloonCloseEvent(){
return true;
}
/**
 * balloon close event handler..,Event fired when the current balloon is closed. 
 */
function postGEBalloonCloseEvent(){
//e.g  open  a dashboard of a layer after close a placemark popup
//openLayerDashboardByLayerName("GEViewer2_Category/DashboardMetadata","SummaryDashboard16","postballoonclose");
}
/**
 * balloon close event handler,Event fired when the current balloon is opening. 
 */
function preGEBalloonOpeningEvent(event){
return  true;
}
/**
 * balloon close event handler,Event fired when the current balloon is opening. 
  */
function postGEBalloonOpeningEvent(event){
	
}

/**
 * Fired when a layer is deselected
 *
*/
function deselectLayersByName(layer){
	
}