<%@ include file="/common/dojo.jsp" %>  
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
        border-color:'#cccccc'
    }

    .thumbnail-item img {
        margin: 0px;
    }
</style>
<script type="text/javascript" src="<%=ServerUtils.getContextName(request)%>/js/dojo/dojo.js" djConfig="isDebug: false, parseOnLoad: true"></script>
<script type="text/javascript">
            dojo.require("dijit.layout.ContentPane");
</script>
</head>     
<body class="tundra">
<html:form  action="deleteFileAction.do" method="POST">
<input type="hidden" id="csrf" name="csrf" value="${csrf}">

<table width="38%" cellspacing="0" cellpadding="0" align="center" stye="margin-left:3px;margin-right:3px;" >
    <tr>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td>&nbsp;</td>
    </tr>
    <tr>
        <td>&nbsp;
        </td>
    </tr>
    <tr>
    <td>      
    <fieldset >
        <legend class="bigtext"><strong><bean:message key="upload.title" bundle="delete"/></strong></legend>
        <table border="0"  id="table2" height="100" cellspacing="0" cellpadding="0"  stye="margin-left:3px;margin-right:3px;">
        <tr><td>&nbsp;</td></tr>
        <tr><td>&nbsp;</td></tr>        

            <tr><td width="200px" nowrap="nowrap">

                                                    <div dojoType="dijit.layout.ContentPane" id="featuerContent" region="center" style="margin-left: 30px;"> 
                                                    <table border="0"><tr><td>
                                                                <div  class="thumbnail-item"  onMouseOver="this.style.borderColor='#f8d582'; this.style.background='#fff';" onMouseOut="this.style.borderColor='#cccccc'; this.style.background='#fafafa';"><a href="<%=ServerUtils.getContextName(request)%>/multiUploadAction.do?flag=show"><img src="<%=ServerUtils.getContextName(request)%>/images/uploadFile.JPG" /></a><br /><bean:message key="upload.file.title" bundle="delete"/></div>
                                                    </td>
                                                    <td>
                                                                 <div  class="thumbnail-item"  onMouseOver="this.style.borderColor='#f8d582'; this.style.background='#fff';" onMouseOut="this.style.borderColor='#cccccc'; this.style.background='#fafafa';"><a href="<%=ServerUtils.getContextName(request)%>/deleteFileAction.do?flag=view"><img src="<%=ServerUtils.getContextName(request)%>/images/deleteFile.jpg" /></a><br /><bean:message key="delete.file.title" bundle="delete"/></div>
                                                    </td></tr></table>                        
                                                    </div>
        </td></tr>
        <tr><td>&nbsp;</td></tr>
        <tr><td>&nbsp;</td></tr>        
    </table>
    </fieldset>    
    </td></tr>
    </table>
</body>
</html>
