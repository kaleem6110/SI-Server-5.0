<%@ taglib uri="/tags/struts-bean" prefix="bean"%>

<script>

var MSG_URL_TxtBOXSPLCH = "<bean:message key="validation.msg.urlTxtBoxSplCh" bundle="splchvalidation"/>";
var MSG_DIRECTORY_TXTBOXSPLCH = "<bean:message key="validation.msg.directoryTxtBoxSplCh" bundle="splchvalidation"/>";
var MSG_AJAX_TXTBOX_SPL_CH = "<bean:message key="validation.msg.splcharotherthanundernotallowed" bundle="splchvalidation"/>";

var MSG_SPLON_TXTBOX = "<bean:message key="validation.msg.validateSplOnTxtBox" bundle="splchvalidation"/>";

var URL_TXTBOXSPLCH ="<bean:message key="validation.urlTxtBoxSplCh" bundle="splchvalidation"/>";
var DIRECTORY_TXTBOXSPLCH ="<bean:message key="validation.directoryTxtBoxSplCh" bundle="splchvalidation"/>";
var AJAX_TXTBOX_SPL_CH  ="<bean:message key="validation.urlTxtBoxSplCh" bundle="splchvalidation"/>";

var SPLON_TXTBOX = "<bean:message key="validation.validateSplOnTxtBox" bundle="splchvalidation"/>";

var POPUP_ALERT= "<bean:message key="validation.err.alert" bundle="splchvalidation"/>";
var RESULT_INNER_HTML= "<bean:message key="validation.msg.unique.result" bundle="splchvalidation"/>";

var MSG_PASSWORD_SPL_CHECK="<bean:message key="validation.msg.splchreenterpassword" bundle="splchvalidation"/>";

var MSG_PASSWORD_SPACE_CHECK= "<bean:message key="validation.msg.spacecheckpassword" bundle="splchvalidation"/> " ;
var MSG_REENTER_PASSWORD_SPLCH_CHECK= '<bean:message key="validation.msg.splchreenterpassword" bundle="splchvalidation"/>';
var MSG_REPEAT_PASSWORD_CHECK= "<bean:message key="validation.msg.repeatchpassword" bundle="splchvalidation"/>";

var  MSG_FILE_TYPE_SPL_CH="<bean:message key="validation.filetype" bundle="splchvalidation"/>";




var MSG_GETTING_DB_CON= "<bean:message key="validation.msg.getdbcon" bundle="splchvalidation"/>";
var MSG_DB_DS= "<bean:message key="validation.msg.dbdatasource" bundle="splchvalidation"/>";
var MSG_GETTING_ATTR= "<bean:message key="validation.msg.getattr" bundle="splchvalidation"/>";
var MSG_JOIN_DS= "<bean:message key="validation.msg.joindatasource" bundle="splchvalidation"/>";
var MSG_URL_REQUIRED= "<bean:message key="validation.msg.urlrequired" bundle="splchvalidation"/>";
var MSG_GETTING_FILENAMES= "<bean:message key="validation.msg.getfilenames" bundle="splchvalidation"/>";
var MSG_DS= "<bean:message key="validation.msg.rssdatasource" bundle="splchvalidation"/>";
var MSG_EXCEL_FILE= "<bean:message key="validation.msg.excelfile" bundle="splchvalidation"/>";
var MSG_GET_DB_CON= "<bean:message key="validation.msg.getthedbcon" bundle="splchvalidation"/>";
var MSG_ERR_ALERT= "<bean:message key="validation.err.alert" bundle="splchvalidation"/>";
var MSG_GET_TB_NAME= "<bean:message key="validation.msg.getthetbname" bundle="splchvalidation"/>";
var MSG_GET_COL_NAME= "<bean:message key="validation.msg.getthecolname" bundle="splchvalidation"/>";
var MSG_DATASOURCE= "<bean:message key="validation.msg.datasource" bundle="splchvalidation"/>";




var MSG_PROB_LOAD_TBNAME= "<bean:message key="validation.msg.probloadtablename" bundle="splchvalidation"/>";
var MSG_PROB_CONNECT_SERVER= "<bean:message key="validation.msg.probincntserver" bundle="splchvalidation"/>";
var MSG_SELECT= "<bean:message key="validation.msg.select" bundle="splchvalidation"/>";
var MSG_CON_SUCCESS= "<bean:message key="validation.msg.consuccess" bundle="splchvalidation"/>";
var MSG_GET_COLS= "<bean:message key="validation.msg.getdbcols" bundle="splchvalidation"/>";
var MSG_PROB_LOAD_COLS= "<bean:message key="validation.msg.probloadcols" bundle="splchvalidation"/>";
var MSG_GET_EXL_HEADER= "<bean:message key="validation.msg.getexlheaders" bundle="splchvalidation"/>";
var MSG_EXL_FILE_DS= "<bean:message key="validation.msg.exlfileds" bundle="splchvalidation"/>";
var MSG_PROB_LOAD_VALUES= "<bean:message key="validation.msg.probloadvalues" bundle="splchvalidation"/>";
var MSG_ERR_ERROR= "<bean:message key="validation.err.error" bundle="splchvalidation"/>";
var MSG_GET_HIBER_HEADERS= "<bean:message key="validation.msg.gethiberheaders" bundle="splchvalidation"/>";
var MSG_HIBER_DS= "<bean:message key="validation.msg.hibds" bundle="splchvalidation"/>";
var MSG_INVALID_HIB_MODEL= "<bean:message key="validation.msg.invalidhibmodel" bundle="splchvalidation"/>";
var MSG_GET_HIB_MODELS= "<bean:message key="validation.msg.gethibmodels" bundle="splchvalidation"/>";
var MSG_FILE_UPLOAD_SUCCESS= "<bean:message key="validation.msg.fileuploadsuccess" bundle="splchvalidation"/>";
var MSG_SRY_FILE_NOT_UPLOADED= "<bean:message key="validation.msg.sryfilenotuploaded" bundle="splchvalidation"/>";
var MSG_CLOSE= "<bean:message key="validation.msg.close" bundle="splchvalidation"/>";
var MSG_VALIDATE_ALERT_PANEL= "<bean:message key="validation.msg.validatealertpanel" bundle="splchvalidation"/>";
var MSG_CHECKING= "<bean:message key="validation.msg.checking" bundle="splchvalidation"/>";
var MSG_NOT_AVAILABLE= "<bean:message key="validation.msg.notavailable" bundle="splchvalidation"/>";
var MSG_RSS_FEED_URL_INVALID= "<bean:message key="validation.msg.rssfeedurlinvalid" bundle="splchvalidation"/>";
var MSG_CHOOSE_FILES= "<bean:message key="validation.msg.choosedifds" bundle="splchvalidation"/>";
var MSG_PLS_CHOOSE_CROS_MAP_ATT= "<bean:message key="validation.msg.plschoosecorsmapatt" bundle="splchvalidation"/>";
var MSG_IS_MAP_MULTI_TIMES= "<bean:message key="validation.msg.ismapmultitimes" bundle="splchvalidation"/>";
var MSG_SPL_CHAR_OTHER_THAN= "<bean:message key="validation.msg.splcharotherthan" bundle="splchvalidation"/>";
var MSG_ARE_NOT_ALLOWED= "<bean:message key="validation.msg.arenotallowed" bundle="splchvalidation"/>";
var MSG_SPL_CHAR_OTHER_NOT_ALLOWED= "<bean:message key="validation.msg.splcharothernotallowed" bundle="splchvalidation"/>";
var MSG_SPL_CHAR_NOT_ALLOWED= "<bean:message key="validation.msg.splchararenotallowed" bundle="splchvalidation"/>";
var MSG_PLS_DONT_ENTER_FOLLOW_CHAR= "<bean:message key="validation.msg.plsdontenteranyfollowchar" bundle="splchvalidation"/>";
var MSG_SPL_CHAR_THAN_UNDER_NOT_ALLOWED= "<bean:message key="validation.msg.splcharotherthanundernotallowed" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_VALID= "<bean:message key="validation.msg.plsentervalid" bundle="splchvalidation"/>";
var MSG_SHOULD_BE_NUM= "<bean:message key="validation.msg.shouldbenunm" bundle="splchvalidation"/>";
var MSG_MUST_BE_INT= "<bean:message key="validation.msg.mustbeint" bundle="splchvalidation"/>";
var MSG_GREATER_SIGN="<bean:message key="validation.msg.greatersign" bundle="splchvalidation"/>";

var MSG_LOADING= "<bean:message key="validation.msg.loading" bundle="splchvalidation"/>";
var MSG_WAIT= "<bean:message key="validation.msg.wait" bundle="splchvalidation"/>";
var MSG_OK= "<bean:message key="validation.msg.ok" bundle="splchvalidation"/>";
var MSG_GREATER_SIGN="<bean:message key="validation.msg.greatersign" bundle="splchvalidation"/>";
var MSG_CATEGORYMANAGER="<bean:message key="validation.msg.categorymanager" bundle="splchvalidation"/>";
var MSG_YES="<bean:message key="validation.msg.yes" bundle="splchvalidation"/>";
var MSG_CANCEL="<bean:message key="validation.msg.cancel" bundle="splchvalidation"/>";
var MSG_NO="<bean:message key="validation.msg.no" bundle="splchvalidation"/>";



var MSG_JOB_NOT_AVAIL= "<bean:message key="validation.msg.jobnamenotavailable" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_JOB= "<bean:message key="validation.msg.plsenterjobname" bundle="splchvalidation"/>";
var MSG_LEN_LESS= "<bean:message key="validation.msg.lengthshouldless" bundle="splchvalidation"/>";
var MSG_PLS_START_TYPE= "<bean:message key="validation.msg.plsselectstarttype" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_APPR_DATE= "<bean:message key="validation.msg.plseneterappdate" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_HRMINSEC= "<bean:message key="validation.msg.plsenterhrminssec" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_VALID_HRMINSEC= "<bean:message key="validation.msg.plsentervalidhrminsec" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_HRS= "<bean:message key="validation.msg.plsenterhrs" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_MINS= "<bean:message key="validation.msg.plsentermins" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_SECS= "<bean:message key="validation.msg.plsentersecs" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_DATE_TIME= "<bean:message key="validation.msg.plsenterdateortime" bundle="splchvalidation"/>";
var MSG_PLS_SEL_INTERVAL= "<bean:message key="validation.msg.plsselinterval" bundle="splchvalidation"/>";
var MSG_PLS_SEL_REC_TYPE= "<bean:message key="validation.msg.plsselanyrecpattern" bundle="splchvalidation"/>";
var MSG_PLS_SEL_INTERVAL_TYPE= "<bean:message key="validation.msg.plsselintervaltype" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_VALID_EXP= "<bean:message key="validation.msg.plsentervalidexp" bundle="splchvalidation"/>";
var MSG_PLS_SEL_JOB= "<bean:message key="validation.msg.plsseljobtype" bundle="splchvalidation"/>";
var MSG_PLS_CH_AVAIL_OPTION= "<bean:message key="validation.msg.plschavailableopt" bundle="splchvalidation"/>";
var MSG_PLS_CHK_WEEK= "<bean:message key="validation.msg.plschweek" bundle="splchvalidation"/>";
var MSG_PLS_CHK_DAY= "<bean:message key="validation.msg.plschday" bundle="splchvalidation"/>";
var MSG_PLS_CHK_MONTH= "<bean:message key="validation.msg.plschmonth" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_INTERVAL= "<bean:message key="validation.msg.plsenterinterval" bundle="splchvalidation"/>";
var MSG_INTERVAL_INT_GRT_ZERO= "<bean:message key="validation.msg.intervalmustintgrtzero" bundle="splchvalidation"/>";
var MSG_INTERVAL_INT= "<bean:message key="validation.msg.intervalmustint" bundle="splchvalidation"/>";
var MSG_INTERVAL_NOT_VALID_BE_LESS= "<bean:message key="validation.msg.intervalnotvalidbeless" bundle="splchvalidation"/>";
var MSG_PLS_SEL_ECOSYS= "<bean:message key="validation.msg.plsselecosys" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_DIR= "<bean:message key="validation.msg.plsenterdirforclean" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_FILE= "<bean:message key="validation.msg.plsenterfiletypetodel" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_VALID_INT= "<bean:message key="validation.msg.plsentervalidint" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_VALID_RANGE= "<bean:message key="validation.msg.plsentervalidrange" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_VALID_NUM= "<bean:message key="validation.msg.plsentervalidnum" bundle="splchvalidation"/>";
var MSG_PLS_SEL_PI_DS= "<bean:message key="validation.msg.plsselpids" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_TAG_QUERY= "<bean:message key="validation.msg.plsentertagquery" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_URL= "<bean:message key="validation.msg.plsenterurl" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_DEST_DIR= "<bean:message key="validation.msg.plsenterdestdir" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_TIMER= "<bean:message key="validation.msg.plsentertimerclass" bundle="splchvalidation"/>";
var MSG_PLS_SEL_CACHED_ECOSYS= "<bean:message key="validation.msg.plsselchachedecofromlist" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_PARAM= "<bean:message key="validation.msg.plsenterparam" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_I_PARAM= "<bean:message key="validation.msg.plsenterfirstparam" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_II_PARAM= "<bean:message key="validation.msg.plsentersecondparam" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_III_PARAM= "<bean:message key="validation.msg.plsenterthirdparam" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_IV_PARAM= "<bean:message key="validation.msg.plsenterfourthparam" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_V_PARAM= "<bean:message key="validation.msg.plsenterfifthparam" bundle="splchvalidation"/>";
var MSG_PLS_SEL_VAL_ECOSYS= "<bean:message key="validation.msg.plsselrunvalecosys" bundle="splchvalidation"/>";
var MSG_IS_ALREADY_SEL= "<bean:message key="validation.msg.isalreadysel" bundle="splchvalidation"/>";
var MSG_PARAMS_UNIQUE= "<bean:message key="validation.msg.mksureparamunique" bundle="splchvalidation"/>";
var MSG_PLS_ENTER_PARAM_PV= "<bean:message key="validation.msg.plsenterparampv" bundle="splchvalidation"/>";
var MSG_NO_MORE_PARAMS= "<bean:message key="validation.msg.nomoreparams" bundle="splchvalidation"/>";
var MSG_NO_MORE_ECOSYS= "<bean:message key="validation.msg.nomoreecosys" bundle="splchvalidation"/>";
var MSG_NO_MORE_URL= "<bean:message key="validation.msg.nomoreurl" bundle="splchvalidation"/>";
var MSG_PLS_CHK_USERID_PWD= "<bean:message key="validation.msg.plschkuseridpwd" bundle="splchvalidation"/>";

var MSG_PARAMS_NOT_EMPTY= "<bean:message key="validation.msg.paramsnotempty" bundle="splchvalidation"/>";
var MSG_PLS_CORRECT_PARAMS= "<bean:message key="validation.msg.plscorrectparams" bundle="splchvalidation"/>";
var MSG_CRON_NOTT_VALID= "<bean:message key="validation.msg.cronnotvalid" bundle="splchvalidation"/>";
 

 var PHONE_VALIDATION_EXP="<bean:message key="validation.phonenumber" bundle="splchvalidation"/>";
 var ZIP_VALIDATION_EXP="<bean:message key="validation.zipcode" bundle="splchvalidation"/>";
  var VALIDATE_TRIM_EXP ="<bean:message key="dbconfig.validation.exp.trim"/>";
var VALIDATE_USER_ID ="<bean:message key="validation.userid" bundle="splchvalidation"/>";
var VALIDATION_MSG_LOGINID='<bean:message key="validation.msg.userid" bundle="splchvalidation"/>';
var VALIDTAION_PASSWORD_CECK_TILDA='<bean:message key="validation.passwordcheck" bundle="splchvalidation"/>';
  var VALIDATE_MSG_PHONENUMBER ='<bean:message key="validation.msg.phonenumber" bundle="splchvalidation"/>';
  var VALIDATE_MSG_ZIP ='<bean:message key="validation.msg.zipcode" bundle="splchvalidation"/>';
  var VALIDATE_ZIP_SIZE ='<bean:message key="validation.size.zipcode" bundle="splchvalidation"/>';
var ADD_SECTION = '<bean:message key="validation.msg.addsection" bundle="splchvalidation"/>';



var FILE_TYPE_SPL_CH ="";
var PASS_MINIMUM ='<bean:message key="validation.pass.minimumcheck" bundle="splchvalidation"/>';
var PASS_MAX ='<bean:message key="validation.pass.maxcheck" bundle="splchvalidation"/>';
var MSG_RSS_FEED_URL_VALID = '<bean:message key="validation.msg.rssfeedurlvalid" bundle="splchvalidation"/>';
var MSG_RSS_FEED_URL_INVALID = '<bean:message key="validation.msg.rssfeedurlinvalid" bundle="splchvalidation"/>';
var MSG_CONFIRM = '<bean:message key="validation.confirm.message" bundle="splchvalidation"/>';

var MSG_QUERY_NOT_VALID = '<bean:message key="validation.msg.queryinvalid" bundle="splchvalidation"/>';
var SELECT_TEXT = '<bean:message key="validation.select.text" bundle="splchvalidation"/>';

var VALIDATE_SERVER_IP = '<bean:message key="validation.server.ip" bundle="splchvalidation"/>';
var MSG_SERVER_PORT = '<bean:message key="validation.server.port.check" bundle="splchvalidation"/>';
var MSG_SERVER_NAME = '<bean:message key="validation.server.name.check" bundle="splchvalidation"/>';
var MSG_SERVER_IP = '<bean:message key="validation.server.ip.check" bundle="splchvalidation"/>';

var SESSION_EXPIRE_ALERT = "<bean:message key="session.expire.alert" bundle="security"/>";
var VALIDATE_DEPENDENT_TASKS="<bean:message key="jobs.validation.DependentTask" bundle="jobs"/>";
var VALIDATE_MAX_LENGTH = '<bean:message key="uiconfig.max.length" bundle="uiconfig"/>';
var VALIDATE_DUPLICATE_DEPENDENT_TASKS='<bean:message key="jobs.dependent.tasks.duplicate" bundle="jobs"/>';
</script>
<html>


</html>