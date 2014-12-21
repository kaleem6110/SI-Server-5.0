<?xml version="1.0" encoding="UTF-8"?>
<configuration name="common">
    <section name="datamashup">
        <value><![CDATA[<TAG_DATASOURCE_NAME>]]></value>
        <section name="driver">
            <value><![CDATA[com.enterprisehorizons.magma.datamashup.DBDataDriver]]></value>
        </section>
		<section name="datarendertype">
			<value><![CDATA[<TAG_DATA_RENDER_TYPE>]]></value>
		</section>                    
        <section name="datainput">
            <value><![CDATA[com.enterprisehorizons.magma.datamashup.GeoDBDataInput]]></value>
            <section name="params">
				<section name="param">
                    <section name="name">
                        <value><![CDATA[query]]></value>
                    </section>
                    <section name="value">
                        <value><![CDATA[<TAG_QUERY>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[tableName]]></value>
                    </section>
                    <section name="value">
                        <value><![CDATA[<TAG_TABLE_NAME>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[orderByClause]]></value>
                    </section>
                    <section name="value" >
                        <value><![CDATA[<TAG_ORDER_BY_CLAUSE>]]></value>
                    </section>
                </section>
            </section>
        </section>
        <section name="datasource">
            <value><![CDATA[com.enterprisehorizons.magma.datamashup.DBDataSource]]></value>
            <section name="params">
                <section name="param">
                    <section name="name">
                        <value><![CDATA[primaryDatasource]]></value>
                    </section>
                    <section name="value" >
                        <value><![CDATA[<TAG_PRIMARY_DATASOURCE_ID>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[secondaryDatasource]]></value>
                    </section>
                    <section name="value" >
                        <value><![CDATA[<TAG_SECONDARY_DATASOURCE_ID>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[latitudeDataElement]]></value>
                    </section>
                    <section name="value" >
                        <value><![CDATA[<TAG_LATITUDE_COLUMN>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[longitudeDataElement]]></value>
                    </section>
                    <section name="value" > 
                        <value><![CDATA[<TAG_LONGITUDE_COLUMN>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[coordinatesDataElement]]></value>
                    </section>
                    <section name="value" >
                        <value><![CDATA[<TAG_COORDINATES>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[orderDataElement]]></value>
                    </section>
                    <section name="value" >
                        <value><![CDATA[<TAG_ORDER_COLUMN>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[sourceProjectionDefinition]]></value>
                    </section>
                    <section name="value" >
                        <value><![CDATA[<TAG_SRC_PRJ_DEF>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[sourceProjectionUnits]]></value>
                    </section>
                    <section name="value" >
                        <value><![CDATA[<TAG_SRC_PRJ_UNITS>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[databaseType]]></value>
                    </section>
                    <section name="value" >
                        <value><![CDATA[<TAG_DATABASE_TYPE_ID>]]></value>
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
            </section>
        </section>
    </section>
</configuration>