<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<%@ taglib uri="/tags/struts-logic" prefix="logic"%>
<%@ taglib uri="/tags/struts-html" prefix="html"%>
<%@ taglib uri="/tags/struts-nested" prefix="nested"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
	<br>
	<br>	
	<table>
	<%
		boolean isHome = true;
	%>
		<logic:equal value="0" name="beanDtls" property="pageId">
			<tr>
				<td valign='center'>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<img alt="Home" src="ecoweb/images/ecoweb/Home2.png" />
				</td>
			</tr>
		<%
			isHome = false;
		%>
		</logic:equal>

		<logic:equal value="1" name="beanDtls" property="pageId">
			<tr>
				<td valign='center'>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="WizardHomeAction.do?operation=OnLoad&pageId=0"><img alt="Home" src="ecoweb/images/ecoweb/Home2.png" /></a>
					&nbsp; <img alt="" src="ecoweb/images/ecoweb/Next.png" />&nbsp;
				    	<img alt="Datasources" src="ecoweb/images/ecoweb/DataSources.png" />
				</td>
			</tr>
		<%
			isHome = false;
		%>
		</logic:equal>

		<logic:equal value="2" name="beanDtls" property="pageId">
			<tr>
				<td valign='center'>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="WizardHomeAction.do?operation=OnLoad&pageId=0"><img alt="Home" src="ecoweb/images/ecoweb/Home2.png" /></a>
						&nbsp;<img alt="" src="ecoweb/images/ecoweb/Next.png" />&nbsp;
				    <a href="WizardHomeAction.do?operation=Back&previousOperation=<bean:write property="ecosystemType" name="beanDtls"/>&pageId=1">
					<img alt="Datasources" src="ecoweb/images/ecoweb/DataSources.png" /></a>
				&nbsp;<img alt="" src="ecoweb/images/ecoweb/Next.png" />&nbsp;
				    	<img alt="EcoFeatures" src="ecoweb/images/ecoweb/Features.png" />
				</td></tr>
			<%
			isHome = false;
			%>

		</logic:equal>
	
	<logic:equal value="3" name="beanDtls" property="pageId">
	<tr><td valign='center'>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="WizardHomeAction.do?operation=OnLoad&pageId=0"><img alt="Home" src="ecoweb/images/ecoweb/Home2.png" /></a>&nbsp;<img alt="" src="ecoweb/images/ecoweb/Next.png" />&nbsp;
			<a href="WizardHomeAction.do?operation=Back&previousOperation=<bean:write property="ecosystemType" name="beanDtls"/>&pageId=1"><img alt="Datasources" src="ecoweb/images/ecoweb/DataSources.png" /></a>&nbsp;<img alt="" src="ecoweb/images/ecoweb/Next.png" />&nbsp;
			<a href="NewEcoDataSourceAction.do?operation=Back&previousOperation=<bean:write property="datasourceType" name="beanDtls"/>&pageId=2"><img alt="Ecofeatures" src="ecoweb/images/ecoweb/Features.png" /></a>
				&nbsp;<img alt="" src="ecoweb/images/ecoweb/Next.png" />&nbsp;
				    	<img alt="EcoArtifact" src="ecoweb/images/ecoweb/Artifact.png" />
			</td></tr>
			<%
				isHome = false;
			%>

	</logic:equal>
	
	<logic:equal value="4" name="beanDtls" property="pageId">
	<tr><td valign='center'>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="WizardHomeAction.do?operation=clearAndOnLoad&pageId=0"><img alt="Home" src="ecoweb/images/ecoweb/Home2.png" /></a>&nbsp;<img alt="" src="ecoweb/images/ecoweb/Next.png" />&nbsp;
			<img alt="Datasources" src="ecoweb/images/ecoweb/DataSources.png" /></a>&nbsp;<img alt="" src="ecoweb/images/ecoweb/Next.png" />&nbsp;
			<img alt="Ecofeatures" src="ecoweb/images/ecoweb/Features.png" /></a>&nbsp;<img alt="" src="ecoweb/images/ecoweb/Next.png" />&nbsp;
			<img alt="EcoArtifact" src="ecoweb/images/ecoweb/Artifact.png" /></a>&nbsp;<img alt="" src="ecoweb/images/ecoweb/Next.png" />&nbsp;
                  <img alt="Finish" src="ecoweb/images/ecoweb/Finish.png" />
			</td></tr>
		<%
			isHome = false;
		%>
	
	</logic:equal>

	<%
		if(isHome){
	%>
			<tr>
				<td valign='center'>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<img alt="Home" src="ecoweb/images/ecoweb/Home2.png" />
				</td>
			</tr>
	<%
		}
	%>

	</table>
</body>
</html>
