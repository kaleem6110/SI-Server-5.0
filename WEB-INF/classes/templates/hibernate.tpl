<?xml version="1.0" encoding="UTF-8"?>
<configuration name="common">
	<section name="datamashup">
		<value><![CDATA[<TAG_DATASOURCE_NAME>]]></value>
		<section name="driver">
			<value><![CDATA[com.enterprisehorizons.magma.datamashup.HibernateDBDriver]]></value>
		</section>
		<section name="datarendertype">
			<value><![CDATA[<TAG_DATA_RENDER_TYPE>]]></value>
		</section>                    
		<section name="datasource">
			<value><![CDATA[com.enterprisehorizons.magma.datamashup.HibernateDataSource]]></value>                    
			<section name="params">
				<section name="param">
					<section name="name">
						<value><![CDATA[projectionDataElement]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_SRC_PRJ_DEF>]]></value>
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[projectionUnitsDataElement]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_SRC_PRJ_UNITS>]]></value>
					</section>
				</section>
				<section name="param">
                    <section name="name">
                        <value><![CDATA[modelName]]></value>
                    </section>
                    <section name="value">
                        <value><![CDATA[<TAG_HIBERNATEMODELNAME>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[latitudeDataElement]]></value>
                    </section>
                    <section name="value">
                        <value><![CDATA[<TAG_HIBERNATELATITUDE>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[longitudeDataElement]]></value>
                    </section>
                    <section name="value">
                        <value><![CDATA[<TAG_HIBERNATELONGITUDE>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[coordinatesDataElement]]></value>
                    </section>
                    <section name="value">
                        <value><![CDATA[<TAG_HIBERNATECOORDINATES>]]></value>
                    </section>
                </section>              
              
				<section name="param">
					<section name="name">
						<value><![CDATA[hqlQuery]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_HQLQUERY>]]></value>
					</section>
				</section>
				<section name="param">
					<section name="name">
						<value><![CDATA[orderDataElement]]></value>
					</section>
					<section name="value">
						<value><![CDATA[<TAG_HIBERNATEORDER>]]></value>
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