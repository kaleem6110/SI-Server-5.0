<%@page import="com.spacetimeinsight.masterdata.util.MasterDataHelperUtils"%>
<%@page import="com.enterprisehorizons.magma.server.util.ServerUtils"%>
<%@page import="com.spacetimeinsight.security.bean.UserBean"%>
<%@page import="com.spacetimeinsight.db.config.model.*"%>
<%@page import="com.enterprisehorizons.db.model.*"%>
<%@page import="com.spacetimeinsight.db.scheduler.model.*"%>

 <%
	UserBean userBean = (UserBean) request.getSession().getAttribute(ServerUtils.USER_BEAN_NAME);
	//MasterDataHelperUtils.exportEcogroupMapping(null,userBean.getDomainId().intValue(),userBean.getLanguageId().intValue(),-1,-1);
/*
	EcoexpmlCategory model = new EcoexpmlCategory();
	model.setDomainId(userBean.getDomainId());
	model.setLanguageId(userBean.getLanguageId());
	MasterDataHelperUtils.exportModel(model);


	EcoexpmlGroupMap model1 = new EcoexpmlGroupMap();
	model1.setDomainId(userBean.getDomainId());
	model1.setLanguageId(userBean.getLanguageId());
	MasterDataHelperUtils.exportModel(model1);

	Datasource ds = new Datasource();
	ds.setDomainId(userBean.getDomainId());
	ds.setLanguageId(userBean.getLanguageId());
	MasterDataHelperUtils.exportModel(ds);
*/
	StiJob job = new StiJob();
	MasterDataHelperUtils.exportModel(job);

	out.println("Master data generated successfully..");
 %>


