<%@ taglib uri="/tags/struts-bean" prefix="bean"%>
<select id="dataRenderTypeId" name="dataRenderTypeId" autocomplete="off" 
dojoType="dijit.form.FilteringSelect" class="selectbox">
<option value=""><bean:message key="validation.msg.select" bundle="splchvalidation"/></option>
<option value="1"><bean:message key='ecoweb.dataRenderer1' bundle='ecoweb'/></option>
<option value="2"><bean:message key='ecoweb.dataRenderer2' bundle='ecoweb'/></option>
</select>