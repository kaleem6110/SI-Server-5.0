<?xml version="1.0" encoding="UTF-8"?>
<configuration name="common">
    <section name="datamashup">
        <value><![CDATA[<TAG_DATASOURCE_NAME>]]></value>
        <section name="driver">
            <value><![CDATA[com.enterprisehorizons.magma.datamashup.RSSFeedDataDriver]]></value>
        </section>
		<section name="datarendertype">
			<value><![CDATA[<TAG_DATA_RENDER_TYPE>]]></value>
		</section>
        <section name="datasource">
            <value><![CDATA[com.enterprisehorizons.magma.datamashup.RSSFeedDataSource]]></value>
            <section name="params">
                <section name="param">
                    <section name="name">
                        <value><![CDATA[sourceProjectionDefinition]]></value>
                    </section>
                    <section name="value">
                        <value><![CDATA[<TAG_SRC_PRJ_DEF>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[sourceProjectionUnits]]></value>
                    </section>
                    <section name="value">
                        <value><![CDATA[<TAG_SRC_PRJ_UNITS>]]></value>
                    </section>
                </section>
                <section name="param">
                    <section name="name">
                        <value><![CDATA[feedUrl]]></value>
                    </section>
                    <section name="value">
                        <value><![CDATA[<TAG_RSSFEEDURL>]]></value>
                    </section>
                </section>
            </section>
        </section>
    </section>
</configuration>