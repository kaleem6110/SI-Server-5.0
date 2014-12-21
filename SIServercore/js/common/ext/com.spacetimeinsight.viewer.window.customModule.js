
		function selectCustomEvent(businessViewId,businessViewName,businessViewMetaData,breadCrum) {
			console.log("Select Event " +businessViewId + " name " + businessViewName + " Bred Crum " +breadCrum );	
		}
		
		function unSelectCustomEvent(businessViewId,businessViewName,businessViewMetaData,breadCrum) {
			console.log("DeSelect Event " +businessViewId + " name " + businessViewName + " Bred Crum " +breadCrum );	
		}	
		

		function actionJsPriority(attrName,value,ecosid,artefactName){
			console.log(' actionJsPriority  attrname :'+attrName+' val:'+value+' ecosid :'+ecosid+" artifact name :"+artefactName);
		}
	     function formatJsPriority(attrName,value,extData){
	    	console.log('formatJsPriority attrname :'+attrName+' val:'+value+' ecosid :'+extData.ecosid+' artfiact name :'+extData.artefactName);
	    	return value +"-formated";
	    //	return e;
	    }
	     function actionJsFL(attrName,value,ecosid,artefactName){
					console.log(' actionJsFL  attrname :'+attrName+' val:'+value+' ecosid :'+ecosid+" artifact name :"+artefactName);
				}
		function formatJsFL(attrName,value,extData){
			    	console.log('formatJsFL attrname :'+attrName+' val:'+value+' ecosid :'+extData.ecosid+' artfiact name :'+extData.artefactName);
			    	return value +"-formated";
			    //	return e;
	    }
	     function actionJsNum(attrName,value,ecosid,artefactName){
					console.log(' actionJsNum  attrname :'+attrName+' val:'+value+' ecosid :'+ecosid+" artifact name :"+artefactName);
				}
		function formatJsNum(attrName,value,extData){
			    	console.log('formatJsNum attrname :'+attrName+' val:'+value+' ecosid :'+extData.ecosid+' artfiact name :'+extData.artefactName);
			    	return value +"-formated";
			    //	return e;
	    }
	    /** example for script window 
	     *props contains
	     *  artifactname,ecoexpmodel,ecosid,jessionid,layerid,layername
	     */
	    function scriptCode(windowId,props){

			console.log('script function called Bid'+props.layerid);
		}