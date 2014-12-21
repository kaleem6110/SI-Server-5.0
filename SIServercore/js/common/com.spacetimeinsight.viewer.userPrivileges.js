define(['siViewerData'],function($si) {
	$si.userPrivileges = {

		_rights : [],
		_rightName : {
			siViewerBusinessView :"BUSINESSVIEW",
			siViewerManageFavoriteComponent:"MANAGE-FAVORITE",
			siViewerHtmlViewer:"HTMLVIEWER",
			siViewerPieChart:"PIE-CHART",
			siViewerPieChart:"MAP-WINDOW",
		},
		
		getPrivilege : function(rightName,subRightName){
			var $this = this;
			//No rights defined
			if(!rightName){
				return true;
			}
			rightName =rightName.toUpperCase() ;
			if(!$si.viewer.privilegeObservable.privileges) {
				return true;
			}
			this._getRight(rightName);
			var right = $this._rights[rightName];
			if(!right) return true;
			
			if(right.hasfullAccess ){
				return true;
			}
			return $this._checkSubRight(right,subRightName)	;		
		},

		_getRight:function(rightName){
			var $this = this;
			var right = $si.viewer.privilegeObservable.privileges[rightName];
			if(right) return right;
			$.each($si.viewer.privilegeObservable.privileges,function(index,right){
        		if(right != null && right.name === rightName ){
					$this._rights[rightName] = right;
        		}
        	});
		},	

		_checkSubRight:function(right,subRightName){
			var hasAccess = true;
			subRightName = right.name+ "_" + subRightName;
			$.each(right.subRights,function(index,subRight){
				if(subRight.name === subRightName) {
					if( !subRight.hasCreate){
						hasAccess = false;
					}
				}
			});			
			return hasAccess;
		},


		getRightName:function(windowPlugInName){
			return this._rightName[windowPlugInName];
		}		
		

	};

})