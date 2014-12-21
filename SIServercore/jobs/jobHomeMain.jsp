<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib prefix="tiles" uri="/tags/struts-tiles"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<html>
<head>
<style>
    @import "<%=ServerUtils.getContextName(request)%>/js/dojo/resources/dojo.css";
    @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra.css";
    @import "<%=ServerUtils.getContextName(request)%>/js/dijit/themes/tundra/tundra_rtl.css";
            
    .thumbnail-item {
        float: left; 
        margin: 5px; 
        padding: 25px; 
        border: 2px #fff solid; 
        cursor: pointer;
        text-align: center;
        background-color: #fafafa;
        width: 150px;
        height: 150px;
        font-size: 11px;
        color: #990000;
    }

    .thumbnail-item img {
        margin: 0px;
    }
</style>
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true"></script>
<script type="text/javascript">
            dojo.require("dijit.layout.ContentPane");
</script>


<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>STI Admin Jobs Home</title>
<link href="css/style.css" rel="stylesheet" type="text/css" />
</head>
<body style="overflow-x:hidden;overflow-y:auto">
<form action="displayPageAction.do" name="jobHomeForm" method="post" >
<input type="hidden" id="csrf" name="csrf" value="${csrf}">

<table width="40%" cellspacing="0" cellpadding="0" align="center">
    <tr>
    <td align="center">
    <fieldset>
    </br>
        <legend align="center" class="bigtext"><strong>STI Admin Jobs Scheduler Home</stronger></legend>
        </br>
        <table border="0" width="500" id="table2" height="54" cellspacing="2" cellpadding="2" align="center">
            <tr>
                <td height="27" align="center" style="width: 227px">
                    <table width="500" class="lfr-table" align="center" border="0">
                        <tbody>
                            <tr>
                                <td align="center">
                                </td>
                                <td align="center">
        <div dojoType="dijit.layout.ContentPane" id="featuerContent" region="center" style="margin-left: 70px;"> 
                                        <div  class="thumbnail-item" onMouseOver="this.style.borderColor='#f8d582';this.style.background='#fff';"style ="border-color:blue" onMouseOut="this.style.borderColor='#cccccc'; this.style.background='#fafafa';">
                                        <a href="<%=ServerUtils.getContextName(request)%>/startStopAction.do?operation=onLoad"><img src="<%=ServerUtils.getContextName(request)%>/images/start_stop.GIF" />                                        </a>
                                        <br />
                                        Start/Stop
                                        </div>                                 
                    
        </div>  

                                </td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </table>
        <table border="0" width="500" id="table7" cellspacing="0" cellpadding="0">
            <tr>
                <td height="8px"></td>
            </tr>
        </table>
    </fieldset>
    </td>
    </tr>
    <tr>
        <td>
        <input type="hidden" name="operation" id="operation"
				value="onLoad" />
        </td>
    </tr>
    <tr>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td>&nbsp;</td>
    </tr>
</table>
</form>
</body>
</html>
