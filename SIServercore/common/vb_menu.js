/**
* Don't change or remove the head comments!
* 
* DHTML hierarchical, object oriented menu: VB MENU 1.5
* Copyright (C) 2003-2004  Vladimir Bodurov
* 								
*   Version  1.5  2004-03-06  
* 								
* This library is free software; you can redistribute it and/or
* modify it under the terms of the GNU Lesser General Public
* License as published by the Free Software Foundation; either
* version 2.1 of the License, or (at your option) any later version.
* 																  
* This library is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
* Lesser General Public License for more details.
											   
* You should have received a copy of the GNU Lesser General Public
* License along with this library; if not, write to the Free Software
* Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA
* 																		 
* Copy of GNU Lesser General Public License at: http://www.gnu.org/copyleft/lesser.txt
* 													 
* Source code home page: http://www.bodurov.com/menu.html
*/

with (document) {
	// this we need for IE for MAC
	if(typeof Array.prototype.push=="undefined"){
		Array.prototype.push=function(){ 
			var i=0; b=this.length,a=arguments; 
			for(i;i<a.length;i++)
				this[b+i]=a[i];
			return this.length 
		};
		Array.prototype.pop=function(){
			var len = this.length;
			var lastVal = "";
			if(len>0){
				len--;
				lastVal = this[len];
				this.length = len;
			}
			return lastVal; 
		};
	} 
}


// ----------------------------- Square object starts here ---
function S_IsIn(x,y){
	if((x>=this.sqStartX && x<=this.sqEndX) && (y>=this.sqStartY && y<=this.sqEndY)){
		return true;
	}else{
		return false;
	}
}
// to be used for debuging (if you need less file size you can remove it)
function S_ToString(){
	return "[ id:"+this.id +"|StartX:"+this.sqStartX+"|StartY:"+this.sqStartY+"|EndX:"+this.sqEndX+"|EndY"+this.sqEndY+" ]";
}
// to get a copy of this square object
function S_GetCopy(){
	return new Square(this.id,this.sqStartX,this.sqStartY,(this.sqEndX-this.sqStartX),(this.sqEndY-this.sqStartY));
}
// constructor of object Square
function Square(id,sqX,sqY,sqWidth,sqHeight){
	// properties 
	this.id = id;
	this.sqStartX = sqX;
	this.sqStartY = sqY;
	this.sqEndX = sqWidth+sqX;
	this.sqEndY = sqHeight+sqY;
	
	// methods
	this.IsIn = S_IsIn;
	this.ToString = S_ToString;
	this.GetCopy = S_GetCopy;
}
// ----------------------------- Square object ends here ---
// ----------------------------- Polygon object starts here ---
// to be used for debuging (if you need less file size you can remove it)
function P_ToString(){
	var result = "";
	var len = this.squares.length;
	for(var i=0;i<len;i++){
		result += this.squares[i].ToString();
	}
	return "Length:"+len+"; "+result;
}
// check if this square is already in polygon
function P_IsInPolygon(id){
	var len = this.squares.length;
	if(len>1){
		for(var i=0;i<len;i++){
			var currId = this.squares[i].id;
			if(id==currId){
				return true;
			}
		}
	}
	return false;
}
// set the polygon (consists of two squares)
function P_Set(square_1,square_2){
	if(!this.IsInPolygon(square_1.id)){
		this.id = square_1.id;
		this.squares[0] = square_1;
		this.squares[1] = square_2;
	}
}
// check if x and y is withinn this polygon
function P_IsIn(x,y){
	for(var i=0;i<this.squares.length;i++){
		if(this.squares[i].IsIn(x,y)) return true;
	}
	return false
}
// to get a copy of the object Polygon
function P_GetCopy(){
	var polygon = new Polygon();
	polygon.Set(this.squares[0].GetCopy(),this.squares[1].GetCopy());
	return polygon;
}
// constructor of object Polygon
function Polygon(){
	// properties
	this.squares = new Array(new Square(0,0,0,0,0),new Square(0,0,0,0,0)); // array of squares
	this.id;
	
	// methods
	this.Set = P_Set;
	this.IsInPolygon = P_IsInPolygon;
	this.IsIn = P_IsIn;
	this.ToString = P_ToString;
	this.GetCopy = P_GetCopy;
}
// ----------------------------- Polygon object ends here ---
// ----------------------------- Link object starts here ---
// constructor of object Link
function Link(text,url,target,id,parent){
	// properties
	this.text = text;
	this.url = url;
	this.target = target;
	this.id = id;
	this.parent = parent;
}
// ----------------------------- Link object ends here ---

// ----------------------------- LinkBox object starts here ---
// pushes a link into LinkBox object
function LB_PushLink(level,linkObj){
	this.links.push(linkObj);
	this.id = linkObj.parent;
	this.level = level;
}

// constructor of object LinkBox
function LinkBox(){
	// properties
	this.links = new Array(); // array of Link objects
	this.id = 0;
	this.level = 0;
	
	// methods
	this.PushLink = LB_PushLink;
}
// ----------------------------- LinkBox object ends here ---
// ----------------------------- MenuCreator object starts here ---
function MC_DocMoveHandler(e) {
	var x = (mc.isNS || mc.isMO)? e.pageX:event.clientX + self.document.body.scrollLeft;
	var y = (mc.isNS || mc.isMO)? e.pageY:event.clientY + self.document.body.scrollTop;
	if(mc.is_shown){
		if( !mc.polygon.IsIn(x,y) ){
			mc.Hide();
		}
	}
}

function MC_InitMouseHandlers() {
	document.onmousemove = this.DocMoveHandler;
	if (this.isNS || this.isMO){
		document.captureEvents(Event.MOUSEMOVE);
	}
}

// draw invisible boxes
function MC_Draw(){
	if(this.ok){
		
		var all = "";
		var text;
		var url;
		var target;
		var id;
		// var parent;
		var len = this.boxes.length;
		var level = 0;
		var start;
		// if this.write_first_level == false then the first level will be enetered manually
		if(this.write_first_level) start = 0;
		else start = 1;
		
		for(var i=start;i<len;i++){
		var css = "";
			level = this.boxes[i].level;

			for(var j=0;j<this.boxes[i].links.length;j++){
				text = this.boxes[i].links[j].text;
				url = this.boxes[i].links[j].url;
				target = this.boxes[i].links[j].target;
				id = this.boxes[i].links[j].id;
				if(target!="") target = " TARGET="+target;
				var linkTagStart = "";
				var linkTagEnd = "";
				if(url!=""){
					linkTagStart = "<a href='"+url+"'"+target+" class='MenuLink'>";
					linkTagEnd = "</a>";
				}
				if(level==1) css = " class='FirstMenuElement'";
				else css = " class='MenuElement'";
				all += "<div id='link_"+id+"' onmouseover='mc.Show(this);mc.OverStyle(this)' onmouseout='mc.NormalStyle(this)'"+css+">"+
					   linkTagStart+text+linkTagEnd+"</div>\n<img id='img_"+id+"' name='img_"+id+"' src='menu_arrow.gif' style='position:absolute;display:none'>";
			}
	
		}
	
		document.write(all);
		// make first level visible and place it in proper place	
		this.ShowFirstLevel();
		// initialise mousemove event
		this.InitMouseHandlers();
	}
}
// places the first level boxes on the screen at the tags <div id="MenuLine" style="position:relative"></div>
function MC_ShowFirstLevel(){
	if(this.write_first_level){
		var links = this.boxes[0].links;
		var len = links.length;
		var leftShift = 0;
		var topShift = 0;
		var posObj = document.getElementById("MenuLine");
		if(this.isIE || this.isMO){
			
			var posObjIe = document.getElementById("MenuLineIE");
			
			if(posObjIe!=null) posObj = posObjIe;
			
		}
		
		
		for(var i=0;i<len;i++){
			var id = links[i].id;
			var linkObj = document.getElementById("link_"+id);
			linkObj.style.display="block";

			
			var posX = parseInt(posObj.offsetLeft)+parseInt(this.posBodyLeft);
			var posY = parseInt(posObj.offsetTop)+parseInt(this.posBodyTop);
			linkObj.style.left = posX+leftShift;
			linkObj.style.top = posY+topShift;
			if(this.is_vertical) topShift += linkObj.offsetHeight;
			else leftShift += linkObj.offsetWidth;
		}
	}else{
		var links = this.boxes[0].links;
		var len = links.length;
		var idArray = new Array(len);
		for(var i=0;i<len;i++){
			idArray[i] = links[i].id;
		}
		var br_type  = (this.isIE || this.isMO) ? "IE" : "";
		var elements = document.getElementsByName("MenuBox"+br_type);
		// in case MenuBoxIE is not defined
		if(elements==null){
			elements = document.getElementsByName("MenuBox");
		}
		for(var j=0;j<elements.length;j++){
			elements[j].id = "link_"+idArray[j];
		}
	}
}
// removes all boxes from the screen
function MC_HideAll(){
	var len1 = this.boxes.length;
	for(var i=0;i<len1;i++){
		var box = this.boxes[i];
		if(box.level>1){
			var len2 = box.links.length;
			for(var j=0;j<len2;j++){
				var id = box.links[j].id;
				var div = document.getElementById("link_"+id);
				if(div!=null) div.style.display="none";
				var img = document.getElementById("img_"+id);
				if(img!=null) img.style.display="none";
			}
		}
	}
	this.polygonsLine = new Array(this.polygon);
}
// shows box
function MC_Show(obj){

	if(this.ok){
		var box = this.GetBoxById(this.IsolateId(obj.id));
		if(box!=null){
			if(this.currentBox.level!=0 && this.currentBox.level!=(box.level-1) && this.currentBox.id!=box.id){
				if(box.level==2) this.HideAll();
				else this.Hide();
			}
	
			this.is_shown = true;
			this.currentBox = box;
			var len = box.links.length;
			var vertShift = 0;
			var initX = 0;
			var initY = 0;
			for(var i=0;i<len;i++){
				
				var id = box.links[i].id;
				var subObj = document.getElementById("link_"+id);
				var coordY = this.CalculateY(obj,box.level,vertShift);
				var coordX = this.CalculateX(obj,box.level);
				if(this.isNS){
					coordX = coordX + this.posBodyLeft;
					coordY = coordY + this.posBodyTop;
				}
				
				
				var winWidth = document.getElementsByTagName("body")[0].offsetWidth;
				subObj.style.display="block";
				subObj.style.top = coordY;
				var correction = this.CenterCorrection(subObj.offsetWidth,obj.offsetWidth,box.level);

				if((coordX + obj.offsetWidth) > winWidth && box.level>2){
					coordX -= obj.offsetWidth*2 - this.pad;
				}
				subObj.style.left = coordX + correction;
				
				vertShift += subObj.offsetHeight;
				if(this.HasChildren(id)) this.AddImage(coordX+correction,coordY,subObj.offsetWidth,id);
				if(i==0){
					initX = coordX;
					initY = coordY;
				}
				
			}
			
			this.polygon = new Polygon();
			this.polygon.Set(new Square(box.id,initX-this.pad,initY-this.pad,subObj.offsetWidth+this.pad,vertShift+this.pad),
							 new Square(box.id,obj.offsetLeft,obj.offsetTop,obj.offsetWidth,obj.offsetHeight+this.pad));
	
			if(!this.IsInPolygonsLine(this.polygon.id)) 
				this.polygonsLine.push(this.polygon.GetCopy());		
	
		}
	}
}
// to center the box
function MC_CenterCorrection(boxWidth,trigetWidth,level){
	if(!this.is_vertical && level==2 && this.is_centered){
		return (trigetWidth/2)-(boxWidth/2);
	}
	return 0;
}
// check if box has children
function MC_HasChildren(id){
	for(var i=0;i<this.boxes.length;i++){
		if(this.boxes[i].id==id) return true;
	}
	return false
}
// add an arrow image
function MC_AddImage(coordX,coordY,width,id){
	var imgObj = document.getElementById("img_"+id);
	imgObj.style.display="block";
	imgObj.style.top = coordY+5;
	imgObj.style.left = coordX+(width-12);
}
// calculates Y coordinate
function MC_CalculateY(obj,level,vertShift){
	var i;
	if(!this.is_vertical && level==2) i = obj.offsetTop + obj.offsetHeight + vertShift;
	else i = obj.offsetTop + vertShift;
	return i;
}
// calculates X coordinate
function MC_CalculateX(obj,level){
	var i;
	if(!this.is_vertical && level==2) i = obj.offsetLeft;
	else  i = obj.offsetLeft + obj.offsetWidth-10;
	return i;
}
// hides box when the mouse is out of it
function MC_Hide(){
	if(this.ok){
		var box = this.GetBoxById(this.currentBox.id);
		if(box!=null){
			this.is_shown = false;
			var len = box.links.length;
			for(var i=0;i<len;i++){
				var id = box.links[i].id;
				var subObj = document.getElementById("link_"+id);
				if(subObj!=null) subObj.style.display="none";
				var imgObj = document.getElementById("img_"+id);
				if(imgObj!=null) imgObj.style.display="none";
			}
			len = this.polygonsLine.length;
			if(len>1){
				this.polygon = this.polygonsLine[len-2];
				this.currentBox = this.GetBoxById(this.polygon.id);
				this.is_shown = true;
				this.polygonsLine.pop();
			}
		}

	}

}
// changes the style when mouseover
function MC_OverStyle(obj){
	if(obj.className=="MenuElement") obj.className = "MenuElementOver";
	else if(obj.className=="FirstMenuElement") obj.className = "FirstMenuElementOver";
}
// changes the style back when mouseout
function MC_NormalStyle(obj){
	if(obj.className=="MenuElementOver") obj.className = "MenuElement";
	else if(obj.className=="FirstMenuElementOver") obj.className = "FirstMenuElement";
}
// to be used for debugging (if you need less file size you can remove it)
function MC_ToString(){
	var boxesInfo = "";
	for(var i=0;i<this.boxes.length;i++){
		boxesInfo += " [ ";
		for(var j=0;j<this.boxes[i].links.length;j++){
			boxesInfo += " (text:"+this.boxes[i].links[j].text+
						 ", url:"+this.boxes[i].links[j].url+
						 ", target:"+this.boxes[i].links[j].target+
						 ", id:"+this.boxes[i].links[j].id+
						 ", parent:"+this.boxes[i].links[j].parent+") \n";
		}
		boxesInfo += " ] id:"+this.boxes[i].id+" level:"+this.boxes[i].level+"\n";
	}
	return  "boxes:{"+boxesInfo+"}";
}
// give integer only
function MC_IsolateId(id){
	if(id.indexOf("link_")==0) id=id.substr(5);
	return id;
}
// get box object by its id
function MC_GetBoxById(id){
	var len = this.boxes.length;
	for(var i=0;i<len;i++){
		if(this.boxes[i].id==id){
			return this.boxes[i];
		}
	}
	return null;
}
// add a link to the menu
function MC_Add(text,url,target){
	if(target=="undefined") target = "";
	if(url=="undefined") url = "";
	var level = 0;
	this.id++;
	
	this.boxes[this.currBoxCount].PushLink(this.level,new Link(text,url,target,this.id,this.parent));
}
// start adding box
function MC_Start(){
	this.level++;
	this.boxCount++;
	this.parent = this.id;
	this.boxes[this.boxCount] = new LinkBox();
	this.parentsLine.push(this.parent);
	this.boxesLine.push(this.boxCount);
	this.currBoxCount = this.boxCount;

}
// end adding box
function MC_End(){
	this.level--;
	this.parentsLine.pop();
	var len = this.parentsLine.length;
	if(len>0) this.parent = this.parentsLine[len-1];
	else this.parent = 0;
	if(this.parent=="undefined") this.parent = 0;
	this.boxesLine.pop();
	var i = this.boxesLine.length-1;
	this.currBoxCount = this.boxesLine[i];
}
// check if this polygon is already in the array of current polygons
function MC_IsInPolygonsLine(id){
	var len = this.polygonsLine.length;
	for(var i=0;i<len;i++){
		var curr = this.polygonsLine[i]
		if(curr.id==id) return true;
	}
	return false;
}
// make it vertical
function MC_Vertical(){
	this.is_vertical = true;
}
// center the box
function MC_Center(){
	this.is_centered = true;
}
// do not write first level links
function MC_DoNotWriteFirstLevel(){
	this.write_first_level = false;
}
function MC_SetBodyMargins(){
	var posBody = document.getElementsByTagName("BODY");
	var posBodyTop = 0;
	var posBodyLeft = 0;
	if(this.isNS || this.isMO){
		this.posBodyTop = posBody[0].offsetTop;
		this.posBodyLeft = posBody[0].offsetLeft;
	}else{
		this.posBodyTop = posBody[0].topMargin;
		this.posBodyLeft = posBody[0].leftMargin;
	}
}
function MC_DetectBrowser(){
	// browser detection
	
	var appVer = parseInt(navigator.appVersion);
	
	if(navigator.userAgent.indexOf("Netscape")>=0){
		this.isNS = true; // is Netscape 6+
		this.isIE = false;
		if(navigator.userAgent.indexOf("Netscape/6")<0){ // if is NS7+ is like Mozilla
			this.isNS = false;
			this.isMO = true;
		}
	}else{
		if(navigator.userAgent.indexOf("Opera")>=0){
			this.isOP = true; // is Opera
			this.isIE = false;
		}else{
			if(navigator.appName.indexOf("Netscape")>=0){
				this.isMO = true; // is Mozilla
				this.isIE = false;
			}
		}
	}
	
	
	if(((this.isNS || this.isMO) && appVer<5) || ((this.isOP || this.isIE) && appVer<4)) this.ok=false;
}
// constructor
function MenuCreator(){
	
	// properties
	this.img   = new Image(9,9);
	this.img.src   = "menu_arrow.gif";
	this.boxes = new Array(); // array of Box objects
	this.is_vertical = false; // is the first level vertical, if false it is horisontal
	this.is_centered = false; // is the first level centered
	this.currentBox = new LinkBox(); // currently shown box 
	this.is_shown = false; // is there shown box
	this.write_first_level = true; // to write or not wirst level

	this.isNS = false;
	this.isOP = false;
	this.isMO = false;
	this.isIE = true;
	this.ok = true;
	
	this.id = 0;
	this.parent = 0;
	this.boxCount = -1;
	this.level = 0;
	this.currBoxCount = 0;
	this.boxesLine =  new Array(); // array of box numbers
	this.parentsLine = new Array(); // array of parents
	this.polygon = new Polygon(); // empty Polygon object
	this.polygonsLine = new Array(); // array of Polygons used
	this.pad = 10; // pad arrownd the polygon
	

	// methods
	this.Add = MC_Add;
	this.Start = MC_Start;
	this.End = MC_End;
	this.IsolateId = MC_IsolateId;
	this.ToString = MC_ToString;
	this.Draw = MC_Draw;
	this.Show = MC_Show;
	this.Hide = MC_Hide;
	this.InitMouseHandlers = MC_InitMouseHandlers;
	this.GetBoxById = MC_GetBoxById;
	this.ShowFirstLevel = MC_ShowFirstLevel;
	this.CalculateX = MC_CalculateX;
	this.CalculateY = MC_CalculateY;
	this.IsInPolygonsLine = MC_IsInPolygonsLine;
	this.InitMouseHandlers = MC_InitMouseHandlers;
	this.DocMoveHandler = MC_DocMoveHandler;
	this.AddImage = MC_AddImage;
	this.HasChildren = MC_HasChildren;
	this.HideAll = MC_HideAll;
	this.CenterCorrection = MC_CenterCorrection;
	this.OverStyle = MC_OverStyle;
	this.NormalStyle = MC_NormalStyle;
	this.Vertical = MC_Vertical;
	this.Center = MC_Center;
	this.DoNotWriteFirstLevel = MC_DoNotWriteFirstLevel;
	this.DetectBrowser = MC_DetectBrowser;
	this.SetBodyMargins = MC_SetBodyMargins;
	
	this.DetectBrowser();
	this.SetBodyMargins();
	
	
	
	
}
// ----------------------------- MenuCreator Object ends here ---
