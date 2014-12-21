<?xml version="1.0" encoding="UTF-8"?>
<configuration name="common">
	<section name="datamashup">
		<value><![CDATA[<TAG_DATASOURCE_NAME>]]></value>
		<section name="driver">
				<value><![CDATA[com.enterprisehorizons.magma.datamashup.ExcelDataDriver]]></value>
		</section>
		<section name="datarendertype">
			<value><![CDATA[<TAG_DATA_RENDER_TYPE>]]></value>
		</section>
		<section name="datasource">
			<value><![CDATA[com.enterprisehorizons.magma.datamashup.ExcelDataSource]]></value>
			<section name="params">
				<section name="param">
					<section name="name">
						<value><![CDATA[projectionDataElement]]></value>
					</section>
					<section name="value" >
						<value><![CDATA[<TAG_SRC_PRJ_DEF>]]></value> 
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[projectionUnitsDataElement]]></value>
					</section>
					<section name="value" >
						<value><![CDATA[<TAG_SRC_PRJ_UNITS>]]></value>
					</section>
				</section>            	
				<section name="param">
					<section name="name">
						<value><![CDATA[fileName]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_EXCELNAME>]]></value>
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[latitudeDataElement]]></value>
					</section>
					<section name="value" >
						<value><![CDATA[<TAG_EXCELLATITUDE>]]></value>
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[longitudeDataElement]]></value>
					</section>
					<section name="value" > 
						<value><![CDATA[<TAG_EXCELLONGITUDE>]]></value>
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[coordinatesDataElement]]></value>
					</section>
					<section name="value" >
						<value><![CDATA[<TAG_EXCELCOORDINATES>]]></value>
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[headerRowIndex]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_HEAD_ROW_INDEX>]]></value>
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[csvFieldSeparator]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_CSVSEPARATOR>]]></value>
					</section>
				</section>
				         	
				  <section name="param">
					<section name="name">
						<value><![CDATA[addressDataElement]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_ADDRESS>]]></value>
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[cityDataElement]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_ADD_CITY>]]></value>
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[countyDataElement]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_ADD_COUNTY>]]></value>
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[stateDataElement]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_ADD_STATE>]]></value>
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[countryDataElement]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_ADD_COUNTRY>]]></value>
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[zipcodeDataElement]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_ADD_ZIPCODE>]]></value>
					</section>
					
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[fileType]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_FILETYPE>]]></value>
					</section>
				</section>     
            </section>
		</section>
	</section>
</configuration>