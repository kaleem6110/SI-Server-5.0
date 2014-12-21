package com.wfp.jobs;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.enterprisehorizons.constants.CommonConstants;
import com.enterprisehorizons.dbutils.DBAccess;
import com.enterprisehorizons.dbutils.DBResults;
import com.enterprisehorizons.excel.ExcelFile;
import com.enterprisehorizons.util.StringUtils;
import com.spacetimeinsight.config.scheduler.Parameter;
import com.spacetimeinsight.config.scheduler.Parameters;
import com.spacetimeinsight.db.model.util.DBDatasourceUtils;
import com.spacetimeinsight.magma.job.CustomJobTask;
import com.wfp.utils.IEPICConstants;
/**
 * Job which is used to export all the risk zones to the database. 
 * @author sti-user
 *
 */
public class ExcelImport2DBJob implements CustomJobTask, IEPICConstants {

	static String filepath = DEFAULT_FILEPATH;
	static String datasource = DEFAULT_DATASOURCE;
	static int headerRowIndex = 0;

	/**
	 * imports data from the excel file to the destination datasource
	 */
	static void  importExcel2DB(){
		//read the excel file
		ExcelFile file = new ExcelFile(filepath, headerRowIndex);		
		//read the header names from the excel file
		String[] headerNames = file.getHeaderNames();
		
		//choose the date format
		SimpleDateFormat sdf = null;
		String dateFormat = "yyyy-MM-dd";
		if(dateFormat!=null){
			sdf = new SimpleDateFormat(dateFormat);
		}
		
		int count = headerNames == null ? 0 : headerNames.length;
		Object[] data = null;
		
		//query to insert the data into riskzones table.
		String insertSql = "insert into sti_p_risk_zones(Country_GWNO, Event_ID, event_date, time_precision, event_type, actor_1, actor_ally_1, actor_2," +
				"actor_ally_2, country, region, location, latitude, longitude, geoprecesion, publication, notes, actor_1_fatalities, actor_2_fatalities) values" +
				" (";
		StringBuffer insertSqlBuffer = null;
		//get the dbaccess from the datasource name that is already configured in stas portal
		DBAccess dbAccess = DBDatasourceUtils.getDBAccess(datasource);
		while (file.hasMoreElements()) {
			data = file.nextElement();
			insertSqlBuffer = new StringBuffer();
			insertSqlBuffer.append(insertSql);
			for (int i = 0; i < count; i++) {
				if(data[i]!=null && data[i] instanceof Date){
						data[i] = sdf.format(data[i]);
				}
				//when i=0 or 3, they indicates that they are numbers
				if(i == 0 || i == 3){					
					insertSqlBuffer.append(StringUtils.isNull(data[i])?0:data[i]);
				}else {
					insertSqlBuffer.append(SINGLE_QUOTE+(StringUtils.isNull(data[i])?CommonConstants.EMPTY_STRING:data[i])+SINGLE_QUOTE);
				}
				
				
				if(i != (count -1)){
					insertSqlBuffer.append(CommonConstants.COMMA_STRING);
				}else{
					insertSqlBuffer.append(CommonConstants.CLOSED_BRACE);
				}
			}
			
			//insert the data into database.
			DBResults rs = dbAccess.executeUpdate(insertSqlBuffer.toString());
			//System.out.println(insertSqlBuffer.toString());
		}
		
		
		
		
	}
	

	
	public static void main(String args[]){
		//importExcel2DB();
	}


	public  synchronized boolean executeCustomTask(Parameters parameters) {
		Parameter[] params = parameters.getParameter();
		
		for (int i=0; i< params.length ; i++){
			//filepaths from job
			if(PARAM_FILEPATH.equalsIgnoreCase(params[i].getName())){
				filepath = params[i].getValue();
			}
			//datasource name that is configured from the 
			if(PARAM_DATASOURCE.equalsIgnoreCase(params[i].getName())){
				datasource = params[i].getValue();
			}
			
		}
		//import the data from the excel to database
		importExcel2DB();
		return true;
	}
	
}
