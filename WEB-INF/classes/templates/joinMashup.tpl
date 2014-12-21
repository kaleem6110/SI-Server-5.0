<?xml version="1.0" encoding="UTF-8"?>
<configuration name="common">
    <section name="datamashup">
        <value><![CDATA[<TAG_DATASOURCE_NAME>]]></value>
        <section name="driver">
	        	<value><![CDATA[com.enterprisehorizons.magma.datamashup.JoinMashupDataDriver]]></value>
	        </section>
        <section name="datasource">
            <value><![CDATA[com.enterprisehorizons.magma.datamashup.JoinMashupDataSource]]></value>
            <section name="params">
		   <section name="param">
			<section name="name">
				<value><![CDATA[datasource1]]></value>
			</section>
			 <section name="value">
				<value><![CDATA[<TAG_FIRST_DSN>]]></value>
			 </section>
		   </section>
     		   <section name="param">
			<section name="name">
				<value><![CDATA[datasource2]]></value>
			</section>
			<section name="value">
				<value><![CDATA[<TAG_SECOND_DSN>]]></value>
			</section>
		   </section>
		   <section name="param">
			<section name="name">
				<value><![CDATA[mapping]]></value>
			</section>
			<!-- TAG_MAPPING to be populated as ds1attr1:ds2attr1,ds1attr2:ds2attr2,ds1attr3:ds2attr3 -->
			<section name="value" >
				<value><![CDATA[<TAG_MAPPING>]]></value>
			</section>
		  </section>
	     </section>
	</section>
   </section>
</configuration>