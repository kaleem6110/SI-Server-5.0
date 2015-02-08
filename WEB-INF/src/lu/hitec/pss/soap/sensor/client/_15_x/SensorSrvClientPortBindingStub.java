/**
 * SensorSrvClientPortBindingStub.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class SensorSrvClientPortBindingStub extends org.apache.axis.client.Stub implements lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_PortType {
    private java.util.Vector cachedSerClasses = new java.util.Vector();
    private java.util.Vector cachedSerQNames = new java.util.Vector();
    private java.util.Vector cachedSerFactories = new java.util.Vector();
    private java.util.Vector cachedDeserFactories = new java.util.Vector();

    static org.apache.axis.description.OperationDesc [] _operations;

    static {
        _operations = new org.apache.axis.description.OperationDesc[18];
        _initOperationDesc1();
        _initOperationDesc2();
    }

    private static void _initOperationDesc1(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getProjectDetails");
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "project"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.Project.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        _operations[0] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getServiceLimits");
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "serviceLimitsImpl"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.ServiceLimitsImpl.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        _operations[1] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getAllVehiclesReports");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitReport"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.UnitReport[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[2] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getAllUsersReports");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitReport"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.UnitReport[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[3] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getAllPlacesReports");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitReport"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.UnitReport[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[4] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getAllUnitsReports");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitsReports"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.UnitsReports.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[5] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getUnitLastLocation");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitId"), lu.hitec.pss.soap.sensor.client._15_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationValue"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.LocationValue.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "location"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"), 
                      true
                     ));
        _operations[6] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("evaluateLocation");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "location"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "point"), lu.hitec.pss.soap.sensor.client._15_x.Point.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationStatus"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.LocationStatus.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        _operations[7] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getDevicesMissingInLdapDirectoryService");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        oper.setReturnClass(java.lang.String[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"), 
                      true
                     ));
        _operations[8] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getUnitLocationRangeForDevice");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitId"), lu.hitec.pss.soap.sensor.client._15_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "rangeLimit"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "rangeLimit"), lu.hitec.pss.soap.sensor.client._15_x.RangeLimit.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "collectingDeviceId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationRange"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.LocationRange.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "unitSummary"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        _operations[9] = oper;

    }

    private static void _initOperationDesc2(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("searchUnitsByCircleZone");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "circle"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "simpleCircularZone"), lu.hitec.pss.soap.sensor.client._15_x.SimpleCircularZone.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitsReports"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.UnitsReports.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[10] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getUnitLastLocationForDevice");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitId"), lu.hitec.pss.soap.sensor.client._15_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "collectingDeviceId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationValue"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.LocationValue.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "location"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"), 
                      true
                     ));
        _operations[11] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("searchUnitsByPolygonZone");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "polygon"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "simplePolygonZone"), lu.hitec.pss.soap.sensor.client._15_x.SimplePolygonZone.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitsReports"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.UnitsReports.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[12] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("searchUnitsByCircleZoneAndUnitType");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "circle"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "simpleCircularZone"), lu.hitec.pss.soap.sensor.client._15_x.SimpleCircularZone.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitType"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitType"), lu.hitec.pss.soap.sensor.client._15_x.UnitType.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitReport"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.UnitReport[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[13] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("searchUnitsByPolygonZoneAndUnitType");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "polygon"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "simplePolygonZone"), lu.hitec.pss.soap.sensor.client._15_x.SimplePolygonZone.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitType"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitType"), lu.hitec.pss.soap.sensor.client._15_x.UnitType.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitReport"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.UnitReport[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[14] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getUnitLocationRange");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitId"), lu.hitec.pss.soap.sensor.client._15_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "rangeLimit"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "rangeLimit"), lu.hitec.pss.soap.sensor.client._15_x.RangeLimit.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationRange"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.LocationRange.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "unitSummary"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        _operations[15] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getUnitProbeRange");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitId"), lu.hitec.pss.soap.sensor.client._15_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "probeType"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "rangeLimit"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "rangeLimit"), lu.hitec.pss.soap.sensor.client._15_x.RangeLimit.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "probeRange"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.ProbeRange.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "unitSummary"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        _operations[16] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getUnitSummary");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitId"), lu.hitec.pss.soap.sensor.client._15_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitSummary"));
        oper.setReturnClass(lu.hitec.pss.soap.sensor.client._15_x.UnitSummary.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "unitSummary"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException"), 
                      true
                     ));
        _operations[17] = oper;

    }

    public SensorSrvClientPortBindingStub() throws org.apache.axis.AxisFault {
         this(null);
    }

    public SensorSrvClientPortBindingStub(java.net.URL endpointURL, javax.xml.rpc.Service service) throws org.apache.axis.AxisFault {
         this(service);
         super.cachedEndpoint = endpointURL;
    }

    public SensorSrvClientPortBindingStub(javax.xml.rpc.Service service) throws org.apache.axis.AxisFault {
        if (service == null) {
            super.service = new org.apache.axis.client.Service();
        } else {
            super.service = service;
        }
        ((org.apache.axis.client.Service)super.service).setTypeMappingVersion("1.2");
            java.lang.Class cls;
            javax.xml.namespace.QName qName;
            javax.xml.namespace.QName qName2;
            java.lang.Class beansf = org.apache.axis.encoding.ser.BeanSerializerFactory.class;
            java.lang.Class beandf = org.apache.axis.encoding.ser.BeanDeserializerFactory.class;
            java.lang.Class enumsf = org.apache.axis.encoding.ser.EnumSerializerFactory.class;
            java.lang.Class enumdf = org.apache.axis.encoding.ser.EnumDeserializerFactory.class;
            java.lang.Class arraysf = org.apache.axis.encoding.ser.ArraySerializerFactory.class;
            java.lang.Class arraydf = org.apache.axis.encoding.ser.ArrayDeserializerFactory.class;
            java.lang.Class simplesf = org.apache.axis.encoding.ser.SimpleSerializerFactory.class;
            java.lang.Class simpledf = org.apache.axis.encoding.ser.SimpleDeserializerFactory.class;
            java.lang.Class simplelistsf = org.apache.axis.encoding.ser.SimpleListSerializerFactory.class;
            java.lang.Class simplelistdf = org.apache.axis.encoding.ser.SimpleListDeserializerFactory.class;
            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "abstractCircularZone");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.AbstractCircularZone.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "abstractGeoFence");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.AbstractGeoFence.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "abstractPolygonalZone");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.AbstractPolygonalZone.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthenticationException");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "AuthorizationException");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationRange");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.LocationRange.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationStatus");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.LocationStatus.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationSummary");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.LocationSummary.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationValue");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.LocationValue.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "point");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.Point.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "probeRange");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.ProbeRange.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "probeStatus");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.ProbeStatus.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "probeSummary");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.ProbeSummary.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "probeValue");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.ProbeValue.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "project");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.Project.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "rangeLimit");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.RangeLimit.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "ResourceNotFoundException");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "serviceLimitsImpl");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.ServiceLimitsImpl.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "severity");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.Severity.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "simpleCircularZone");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.SimpleCircularZone.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "simplePolygonZone");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.SimplePolygonZone.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "subRangeType");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.SubRangeType.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "timeRange");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.TimeRange.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.UnitId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitReport");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.UnitReport.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitsReports");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.UnitsReports.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitSummary");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.UnitSummary.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitType");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.UnitType.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "valueRange");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.sensor.client._15_x.ValueRange.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

    }

    protected org.apache.axis.client.Call createCall() throws java.rmi.RemoteException {
        try {
            org.apache.axis.client.Call _call = super._createCall();
            if (super.maintainSessionSet) {
                _call.setMaintainSession(super.maintainSession);
            }
            if (super.cachedUsername != null) {
                _call.setUsername(super.cachedUsername);
            }
            if (super.cachedPassword != null) {
                _call.setPassword(super.cachedPassword);
            }
            if (super.cachedEndpoint != null) {
                _call.setTargetEndpointAddress(super.cachedEndpoint);
            }
            if (super.cachedTimeout != null) {
                _call.setTimeout(super.cachedTimeout);
            }
            if (super.cachedPortName != null) {
                _call.setPortName(super.cachedPortName);
            }
            java.util.Enumeration keys = super.cachedProperties.keys();
            while (keys.hasMoreElements()) {
                java.lang.String key = (java.lang.String) keys.nextElement();
                _call.setProperty(key, super.cachedProperties.get(key));
            }
            // All the type mapping information is registered
            // when the first call is made.
            // The type mapping information is actually registered in
            // the TypeMappingRegistry of the service, which
            // is the reason why registration is only needed for the first call.
            synchronized (this) {
                if (firstCall()) {
                    // must set encoding style before registering serializers
                    _call.setEncodingStyle(null);
                    for (int i = 0; i < cachedSerFactories.size(); ++i) {
                        java.lang.Class cls = (java.lang.Class) cachedSerClasses.get(i);
                        javax.xml.namespace.QName qName =
                                (javax.xml.namespace.QName) cachedSerQNames.get(i);
                        java.lang.Object x = cachedSerFactories.get(i);
                        if (x instanceof Class) {
                            java.lang.Class sf = (java.lang.Class)
                                 cachedSerFactories.get(i);
                            java.lang.Class df = (java.lang.Class)
                                 cachedDeserFactories.get(i);
                            _call.registerTypeMapping(cls, qName, sf, df, false);
                        }
                        else if (x instanceof javax.xml.rpc.encoding.SerializerFactory) {
                            org.apache.axis.encoding.SerializerFactory sf = (org.apache.axis.encoding.SerializerFactory)
                                 cachedSerFactories.get(i);
                            org.apache.axis.encoding.DeserializerFactory df = (org.apache.axis.encoding.DeserializerFactory)
                                 cachedDeserFactories.get(i);
                            _call.registerTypeMapping(cls, qName, sf, df, false);
                        }
                    }
                }
            }
            return _call;
        }
        catch (java.lang.Throwable _t) {
            throw new org.apache.axis.AxisFault("Failure trying to get the Call object", _t);
        }
    }

    public lu.hitec.pss.soap.sensor.client._15_x.Project getProjectDetails() throws java.rmi.RemoteException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[0]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getProjectDetails"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.Project) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.Project) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.Project.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.ServiceLimitsImpl getServiceLimits() throws java.rmi.RemoteException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[1]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getServiceLimits"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.ServiceLimitsImpl) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.ServiceLimitsImpl) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.ServiceLimitsImpl.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] getAllVehiclesReports(java.lang.String token, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[2]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getAllVehiclesReports"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitReport[]) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitReport[]) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.UnitReport[].class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] getAllUsersReports(java.lang.String token, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[3]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getAllUsersReports"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitReport[]) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitReport[]) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.UnitReport[].class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] getAllPlacesReports(java.lang.String token, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[4]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getAllPlacesReports"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitReport[]) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitReport[]) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.UnitReport[].class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.UnitsReports getAllUnitsReports(java.lang.String token, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[5]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getAllUnitsReports"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitsReports) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitsReports) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.UnitsReports.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.LocationValue getUnitLastLocation(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[6]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getUnitLastLocation"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, unitId, missionId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.LocationValue) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.LocationValue) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.LocationValue.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.LocationStatus evaluateLocation(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.Point location, java.lang.String missionId) throws java.rmi.RemoteException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[7]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "evaluateLocation"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, location, missionId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.LocationStatus) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.LocationStatus) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.LocationStatus.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
  throw axisFaultException;
}
    }

    public java.lang.String[] getDevicesMissingInLdapDirectoryService(java.lang.String token) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[8]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getDevicesMissingInLdapDirectoryService"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (java.lang.String[]) _resp;
            } catch (java.lang.Exception _exception) {
                return (java.lang.String[]) org.apache.axis.utils.JavaUtils.convert(_resp, java.lang.String[].class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.LocationRange getUnitLocationRangeForDevice(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.RangeLimit rangeLimit, java.lang.String collectingDeviceId) throws java.rmi.RemoteException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[9]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getUnitLocationRangeForDevice"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, unitId, missionId, rangeLimit, collectingDeviceId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.LocationRange) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.LocationRange) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.LocationRange.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.UnitsReports searchUnitsByCircleZone(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.SimpleCircularZone circle) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[10]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "searchUnitsByCircleZone"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, circle});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitsReports) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitsReports) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.UnitsReports.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.LocationValue getUnitLastLocationForDevice(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId, java.lang.String missionId, java.lang.String collectingDeviceId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[11]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getUnitLastLocationForDevice"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, unitId, missionId, collectingDeviceId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.LocationValue) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.LocationValue) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.LocationValue.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.UnitsReports searchUnitsByPolygonZone(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.SimplePolygonZone polygon) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[12]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "searchUnitsByPolygonZone"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, polygon});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitsReports) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitsReports) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.UnitsReports.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] searchUnitsByCircleZoneAndUnitType(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.SimpleCircularZone circle, lu.hitec.pss.soap.sensor.client._15_x.UnitType unitType) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[13]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "searchUnitsByCircleZoneAndUnitType"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, circle, unitType});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitReport[]) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitReport[]) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.UnitReport[].class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] searchUnitsByPolygonZoneAndUnitType(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.SimplePolygonZone polygon, lu.hitec.pss.soap.sensor.client._15_x.UnitType unitType) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[14]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "searchUnitsByPolygonZoneAndUnitType"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, polygon, unitType});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitReport[]) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitReport[]) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.UnitReport[].class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.LocationRange getUnitLocationRange(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.RangeLimit rangeLimit) throws java.rmi.RemoteException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[15]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getUnitLocationRange"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, unitId, missionId, rangeLimit});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.LocationRange) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.LocationRange) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.LocationRange.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.ProbeRange getUnitProbeRange(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId, java.lang.String probeType, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.RangeLimit rangeLimit) throws java.rmi.RemoteException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[16]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getUnitProbeRange"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, unitId, probeType, missionId, rangeLimit});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.ProbeRange) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.ProbeRange) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.ProbeRange.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.sensor.client._15_x.UnitSummary getUnitSummary(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[17]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "getUnitSummary"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, unitId, missionId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitSummary) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.sensor.client._15_x.UnitSummary) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.sensor.client._15_x.UnitSummary.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

}
