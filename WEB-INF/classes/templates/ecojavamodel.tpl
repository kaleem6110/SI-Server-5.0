/*
 * @(#) <TAG_ECOMODEL>.java
 *
 * Copyright (c) Space-Time Insight, Inc.
 * 45680 Northport Loop East, Fremont, California 94538 USA
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Space-Time Insight,Inc.
 * and is solely for the use of Space-Time Insight,Inc. personnel.
 * The contents contained within this document carry an explicit and implicit
 * understanding that no part of it will be circulated, quoted or reproduced for
 * distribution outside the Space-Time Insight,Inc. without prior written
 * approval from an authorized officer of the Space-Time Insight,Inc.
 *
 */

package <TAG_PACKAGE_NAME>;

import java.util.*;
import com.enterprisehorizons.util.*;
import com.enterprisehorizons.magma.designtime.artifact.*;
import com.enterprisehorizons.magma.datamashup.*;

<TAG_IMPORTS>

public class <TAG_ECOMODEL> extends <TAG_PARENT_ECOMODEL> {
    <TAG_SCRIPT>
    //private <TAG_ARTEFACT_TYPE> $artefact;

    <LOOP_TAG_MASHUP_DECLARATION>
    private <TAG_DATASOURCE_TYPE> $<TAG_MASHUP_NAME>datamodel;
    //private <TAG_MASHUP_DRIVER_TYPE> $<TAG_MASHUP_NAME>driver;
    private <TAG_MASHUP_DATASOURCE_TYPE> $<TAG_MASHUP_NAME>datasource;
    </LOOP_TAG_MASHUP_DECLARATION>

    <LOOP_TAG_SERVICE_DECLARATION>
    private <TAG_DATASOURCE_TYPE> $<TAG_SERVICE_NAME>datamodel;
    private <TAG_SERVICE_DRIVER_TYPE> $<TAG_SERVICE_NAME>driver;
    private <TAG_SERVICE_DATASOURCE_TYPE> $<TAG_SERVICE_NAME>datasource;
    </LOOP_TAG_SERVICE_DECLARATION>

    public <TAG_ARTEFACT_TYPE> getArtifact() {
        return $artefact;
    }

    public void setArtifact(<TAG_ARTEFACT_TYPE> $artefact) {
        this.$artefact = $artefact;
    }

    <LOOP_TAG_MASHUP_BODY>
    public <TAG_DATASOURCE_TYPE> get<TAG_MASHUP_NAME>datamodel() {
        return $<TAG_MASHUP_NAME>datamodel;
    }

    public void set<TAG_MASHUP_NAME>datamodel(<TAG_DATASOURCE_TYPE> $<TAG_MASHUP_NAME>datamodel) {
        this.$<TAG_MASHUP_NAME>datamodel= $<TAG_MASHUP_NAME>datamodel;
    }

    public <TAG_MASHUP_DRIVER_TYPE> get<TAG_MASHUP_NAME>driver() {
        return $<TAG_MASHUP_NAME>driver;
    }

    public void set<TAG_MASHUP_NAME>driver(<TAG_MASHUP_DRIVER_TYPE> $<TAG_MASHUP_NAME>driver) {
        this.$<TAG_MASHUP_NAME>driver = $<TAG_MASHUP_NAME>driver;
    }

    public <TAG_MASHUP_DATASOURCE_TYPE> get<TAG_MASHUP_NAME>datasource() {
        return $<TAG_MASHUP_NAME>datasource;
    }

    public void set<TAG_MASHUP_NAME>datasource(<TAG_MASHUP_DATASOURCE_TYPE> $<TAG_MASHUP_NAME>datasource) {
        this.$<TAG_MASHUP_NAME>datasource = $<TAG_MASHUP_NAME>datasource;
    }
    </LOOP_TAG_MASHUP_BODY>

    <LOOP_TAG_SERVICE_BODY>
    public <TAG_DATASOURCE_TYPE> get<TAG_SERVICE_NAME>datamodel() {
        return $<TAG_SERVICE_NAME>datamodel;
    }

    public void set<TAG_SERVICE_NAME>datamodel(<TAG_DATASOURCE_TYPE> $<TAG_SERVICE_NAME>datamodel) {
        this.$<TAG_SERVICE_NAME>datamodel= $<TAG_SERVICE_NAME>datamodel;
    }

    public <TAG_SERVICE_DRIVER_TYPE> get<TAG_SERVICE_NAME>driver() {
        return $<TAG_SERVICE_NAME>driver;
    }

    public void set<TAG_SERVICE_NAME>driver(<TAG_SERVICE_DRIVER_TYPE> $<TAG_SERVICE_NAME>driver) {
        this.$<TAG_SERVICE_NAME>driver = $<TAG_SERVICE_NAME>driver;
    }

    public <TAG_SERVICE_DATASOURCE_TYPE> get<TAG_SERVICE_NAME>datasource() {
        return $<TAG_SERVICE_NAME>datasource;
    }

    public void set<TAG_SERVICE_NAME>datasource(<TAG_SERVICE_DATASOURCE_TYPE> $<TAG_SERVICE_NAME>datasource) {
        this.$<TAG_SERVICE_NAME>datasource = $<TAG_SERVICE_NAME>datasource;
    }
    </LOOP_TAG_SERVICE_BODY>



    protected IArtifact getCurrentArtefact() {
        return getArtifact();
    }
}