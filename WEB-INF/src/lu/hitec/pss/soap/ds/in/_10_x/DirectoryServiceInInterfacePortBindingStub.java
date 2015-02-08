/**
 * DirectoryServiceInInterfacePortBindingStub.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.ds.in._10_x;

public class DirectoryServiceInInterfacePortBindingStub extends org.apache.axis.client.Stub implements lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterface_PortType {
    private java.util.Vector cachedSerClasses = new java.util.Vector();
    private java.util.Vector cachedSerQNames = new java.util.Vector();
    private java.util.Vector cachedSerFactories = new java.util.Vector();
    private java.util.Vector cachedDeserFactories = new java.util.Vector();

    static org.apache.axis.description.OperationDesc [] _operations;

    static {
        _operations = new org.apache.axis.description.OperationDesc[98];
        _initOperationDesc1();
        _initOperationDesc2();
        _initOperationDesc3();
        _initOperationDesc4();
        _initOperationDesc5();
        _initOperationDesc6();
        _initOperationDesc7();
        _initOperationDesc8();
        _initOperationDesc9();
        _initOperationDesc10();
    }

    private static void _initOperationDesc1(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createFence");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "fence"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuFence"), lu.hitec.pss.soap.ds.in._10_x.PssuFence.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"),
                      "lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[0] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createPlace");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "place"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuPlace"), lu.hitec.pss.soap.ds.in._10_x.PssuPlace.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "internalIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "internalId"), lu.hitec.pss.soap.ds.in._10_x.InternalId[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organizations"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"),
                      "lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        _operations[1] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createDevice");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "device"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuDevice"), lu.hitec.pss.soap.ds.in._10_x.PssuDevice.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"),
                      "lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[2] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createKit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "kit"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoKit"), lu.hitec.pss.soap.ds.in._10_x.DtoKit.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "equipmentIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"),
                      "lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[3] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createProfile");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profile"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoProfile"), lu.hitec.pss.soap.ds.in._10_x.DtoProfile.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organizations"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "userIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[4] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createRefugee");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "refugee"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoRefugee"), lu.hitec.pss.soap.ds.in._10_x.DtoRefugee.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"),
                      "lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        _operations[5] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createMission");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "mission"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoMission"), lu.hitec.pss.soap.ds.in._10_x.DtoMission.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "places"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "users"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "vehicles"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        oper.setReturnClass(java.lang.String.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[6] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updatePlace");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "place"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuPlace"), lu.hitec.pss.soap.ds.in._10_x.PssuPlace.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"),
                      "lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[7] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createVehicle");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "vehicle"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuVehicle"), lu.hitec.pss.soap.ds.in._10_x.PssuVehicle.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "internalIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "internalId"), lu.hitec.pss.soap.ds.in._10_x.InternalId[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organizations"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"),
                      "lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        _operations[8] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteWidget");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "widgetId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[9] = oper;

    }

    private static void _initOperationDesc2(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("setMyPicture");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "jpegPhoto"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "base64Binary"), byte[].class, false, false);
        param.setOmittable(true);
        param.setNillable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[10] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteProfile");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profileId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[11] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateUser");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "user"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuUser"), lu.hitec.pss.soap.ds.in._10_x.PssuUser.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[12] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateDevice");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "device"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuDevice"), lu.hitec.pss.soap.ds.in._10_x.PssuDevice.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[13] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateWidget");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "widget"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoWidget"), lu.hitec.pss.soap.ds.in._10_x.DtoWidget.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[14] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteKit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "kitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[15] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteRefugee");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "refugeeId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[16] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteVehicle");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "vehicleId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[17] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteUser");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "userId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[18] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createWidget");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "widget"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoWidget"), lu.hitec.pss.soap.ds.in._10_x.DtoWidget.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        _operations[19] = oper;

    }

    private static void _initOperationDesc3(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateFence");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "fence"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuFence"), lu.hitec.pss.soap.ds.in._10_x.PssuFence.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[20] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateKit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "kit"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoKit"), lu.hitec.pss.soap.ds.in._10_x.DtoKit.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[21] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateMission");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "mission"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoMission"), lu.hitec.pss.soap.ds.in._10_x.DtoMission.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"),
                      "lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[22] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateRefugee");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "refugee"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoRefugee"), lu.hitec.pss.soap.ds.in._10_x.DtoRefugee.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[23] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createUser");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "user"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuUser"), lu.hitec.pss.soap.ds.in._10_x.PssuUser.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "certificationIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "internalIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "internalId"), lu.hitec.pss.soap.ds.in._10_x.InternalId[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organizations"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profileIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"),
                      "lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[24] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteFence");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "fenceId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        _operations[25] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateProfile");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profile"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoProfile"), lu.hitec.pss.soap.ds.in._10_x.DtoProfile.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[26] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deletePlace");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "placeId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[27] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteDevice");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "deviceId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[28] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteMission");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[29] = oper;

    }

    private static void _initOperationDesc4(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateVehicle");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "vehicle"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuVehicle"), lu.hitec.pss.soap.ds.in._10_x.PssuVehicle.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"),
                      "lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[30] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignCertificationsFromUser");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "certificationIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "userId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[31] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignOrganizationFromProfiles");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organization"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profilesId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[32] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignInternalIdsFromEquipment");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "internalIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "internalId"), lu.hitec.pss.soap.ds.in._10_x.InternalId[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "equipmentId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[33] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignProfileFromOrganizations");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profileId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organizations"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[34] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignMissionToUnits");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitType"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitType"), lu.hitec.pss.soap.ds.in._10_x.UnitType.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "ids"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[35] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignDeviceToUnit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "deviceId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[36] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignFenceToMissions");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "fenceId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[37] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignKitToUnit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "kitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[38] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createEquipment");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "equipment"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoEquipment"), lu.hitec.pss.soap.ds.in._10_x.DtoEquipment.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "kitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"),
                      "lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[39] = oper;

    }

    private static void _initOperationDesc5(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignMissionToFences");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "fenceIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[40] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createCertification");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "certification"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoCertification"), lu.hitec.pss.soap.ds.in._10_x.DtoCertification.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        oper.setReturnClass(java.lang.String.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        _operations[41] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createOrganization");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organization"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoOrganization"), lu.hitec.pss.soap.ds.in._10_x.DtoOrganization.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        oper.setReturnClass(java.lang.String.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "return"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[42] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createCasualty");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "casualty"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoCasualty"), lu.hitec.pss.soap.ds.in._10_x.DtoCasualty.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        oper.setReturnClass(java.lang.String.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"),
                      "lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        _operations[43] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createResourceType");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "resourceType"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuResourceType"), lu.hitec.pss.soap.ds.in._10_x.PssuResourceType.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "IOException"),
                      "lu.hitec.pss.soap.ds.in._10_x.IOException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "IOException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        _operations[44] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignUnitToMissions");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[45] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignEquipmentsToKit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "equipmentIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "kitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[46] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignUserToProfiles");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "userId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profileIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[47] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignProfileToUsers");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profileId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "userIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[48] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createMiddleware");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "middleware"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoMiddleware"), lu.hitec.pss.soap.ds.in._10_x.DtoMiddleware.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        _operations[49] = oper;

    }

    private static void _initOperationDesc6(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateMyAccount");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "user"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuUser"), lu.hitec.pss.soap.ds.in._10_x.PssuUser.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[50] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("enableOrDisableUsers");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "userIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "isEnable"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"), boolean.class, false, false);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        oper.setReturnClass(java.lang.String[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "return"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[51] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteResourceType");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "resourceTypeId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "resourceTypeType"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "resourcesTypesEnum"), lu.hitec.pss.soap.ds.in._10_x.ResourcesTypesEnum.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[52] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteCertification");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "certificationId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[53] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteCasualty");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "casualtyId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[54] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteOrganization");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organizationId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[55] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteMiddleware");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "middlewareId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[56] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("setPictureToEquipment");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "jpegPhoto"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "base64Binary"), byte[].class, false, false);
        param.setOmittable(true);
        param.setNillable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "equipmentId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[57] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateCasualty");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "casualty"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoCasualty"), lu.hitec.pss.soap.ds.in._10_x.DtoCasualty.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[58] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateOrganization");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organization"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoOrganization"), lu.hitec.pss.soap.ds.in._10_x.DtoOrganization.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[59] = oper;

    }

    private static void _initOperationDesc7(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteEquipment");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "equipmentId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[60] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("deleteThreshold");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "thresholdId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[61] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateEquipment");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "equipment"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoEquipment"), lu.hitec.pss.soap.ds.in._10_x.DtoEquipment.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[62] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateResourceType");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "resourceType"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuResourceType"), lu.hitec.pss.soap.ds.in._10_x.PssuResourceType.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "IOException"),
                      "lu.hitec.pss.soap.ds.in._10_x.IOException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "IOException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[63] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("setPictureToUser");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "jpegPhoto"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "base64Binary"), byte[].class, false, false);
        param.setOmittable(true);
        param.setNillable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "userId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[64] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("setPictureToMission");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "jpegPhotoMaybeNull"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "base64Binary"), byte[].class, false, false);
        param.setOmittable(true);
        param.setNillable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[65] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateThreshold");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "threshold"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoThreshold"), lu.hitec.pss.soap.ds.in._10_x.DtoThreshold.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[66] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignKitFromUnit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "kitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[67] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateCertification");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "certification"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoCertification"), lu.hitec.pss.soap.ds.in._10_x.DtoCertification.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[68] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateMiddleware");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "middleware"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoMiddleware"), lu.hitec.pss.soap.ds.in._10_x.DtoMiddleware.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[69] = oper;

    }

    private static void _initOperationDesc8(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("createThreshold");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "threshold"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoThreshold"), lu.hitec.pss.soap.ds.in._10_x.DtoThreshold.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        _operations[70] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignProfileToMissions");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profileId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[71] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("setPictureToOrganization");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "jpegPhotoMaybeNull"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "base64Binary"), byte[].class, false, false);
        param.setOmittable(true);
        param.setNillable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organizationId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[72] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignCertificationsToUser");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "certificationIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "userId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[73] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("setPrimaryLocalisationDevice");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "deviceId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[74] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignDeviceFromUnit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "deviceId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[75] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignEquipmentsFromKit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "equipmentIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "kitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[76] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignFenceFromMissions");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "fenceId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[77] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignInternalIdsFromKit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "internalIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "internalId"), lu.hitec.pss.soap.ds.in._10_x.InternalId[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "kitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[78] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignInternalIdsToEquipment");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "internalIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "internalId"), lu.hitec.pss.soap.ds.in._10_x.InternalId[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "equipmentId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[79] = oper;

    }

    private static void _initOperationDesc9(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignInternalIdsToKit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "internalIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "internalId"), lu.hitec.pss.soap.ds.in._10_x.InternalId[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "kitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[80] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignMissionToProfiles");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profileIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[81] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignOrganizationToProfiles");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organization"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profileIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[82] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignOrganizationToUnits");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organization"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitType"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitType"), lu.hitec.pss.soap.ds.in._10_x.UnitType.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "uids"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[83] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignProfileToOrganizations");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profile"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organizations"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[84] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignInternalIdsToUnit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "internalIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "internalId"), lu.hitec.pss.soap.ds.in._10_x.InternalId[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[85] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("assignUnitToOrganizations");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organizations"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[86] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignUnitFromMissions");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[87] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignMissionFromFences");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "fenceIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[88] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignUserFromProfiles");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "userId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profileIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[89] = oper;

    }

    private static void _initOperationDesc10(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignMissionFromProfiles");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profilesId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[90] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignMissionFromUnits");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitType"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitType"), lu.hitec.pss.soap.ds.in._10_x.UnitType.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "ids"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[91] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignProfileFromMissions");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profileId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[92] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignOrganizationFromUnits");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organization"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[93] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignUnitFromOrganizations");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "organizations"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[94] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignInternalIdsFromUnit");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "internalIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "internalId"), lu.hitec.pss.soap.ds.in._10_x.InternalId[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "unitId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId"), lu.hitec.pss.soap.ds.in._10_x.UnitId.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[95] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("unAssignProfileFromUsers");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "profileId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "userIds"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String[].class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[96] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("updateMyDashboardWidgets");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "widgets"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(org.apache.axis.encoding.XMLType.AXIS_VOID);
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.ds.in._10_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[97] = oper;

    }

    public DirectoryServiceInInterfacePortBindingStub() throws org.apache.axis.AxisFault {
         this(null);
    }

    public DirectoryServiceInInterfacePortBindingStub(java.net.URL endpointURL, javax.xml.rpc.Service service) throws org.apache.axis.AxisFault {
         this(service);
         super.cachedEndpoint = endpointURL;
    }

    public DirectoryServiceInInterfacePortBindingStub(javax.xml.rpc.Service service) throws org.apache.axis.AxisFault {
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
            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthenticationException");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.AuthenticationException.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "AuthorizationException");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.AuthorizationException.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "cameraPictureInternalId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.CameraPictureInternalId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "cameraVideoInternalId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.CameraVideoInternalId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "documentFileInternalId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.DocumentFileInternalId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoCasualty");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.DtoCasualty.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoCertification");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.DtoCertification.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoEquipment");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.DtoEquipment.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoKit");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.DtoKit.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoMiddleware");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.DtoMiddleware.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoMission");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.DtoMission.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoOrganization");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.DtoOrganization.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoProfile");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.DtoProfile.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoRefugee");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.DtoRefugee.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoThreshold");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.DtoThreshold.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoWidget");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.DtoWidget.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "internalId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.InternalId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "IOException");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.IOException.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ldapPlaceInternalId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.LdapPlaceInternalId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ldapUserInternalId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.LdapUserInternalId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ldapVehicleInternalId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.LdapVehicleInternalId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "mapelementKMLFileInternalId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.MapelementKMLFileInternalId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "mapelementKMZFileInternalId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.MapelementKMZFileInternalId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "mapelementLibraryInternalId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.MapelementLibraryInternalId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "mapelementSceneInternalId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.MapelementSceneInternalId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuCircularFence");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.PssuCircularFence.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuDevice");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.PssuDevice.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuFence");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.PssuFence.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuPlace");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.PssuPlace.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuPoint");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.PssuPoint.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuPolygonalFence");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.PssuPolygonalFence.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuResourceType");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.PssuResourceType.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuUnit");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.PssuUnit.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuUser");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.PssuUser.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "pssuVehicle");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.PssuVehicle.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "ResourceNotFoundException");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "resourcesTypesEnum");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.ResourcesTypesEnum.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "sensorDeviceInternalId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.SensorDeviceInternalId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "serviceEnum");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.ServiceEnum.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "typeValueComment");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.TypeValueComment.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unauthorizedDataError");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataError.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "UnauthorizedDataException");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitId");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.UnitId.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unitType");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.UnitType.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "workflowStatus");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.ds.in._10_x.WorkflowStatus.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

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

    public void createFence(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuFence fence, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createFence"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, fence, missionIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void createPlace(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuPlace place, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String[] organizations, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createPlace"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, place, internalIds, organizations, missionIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void createDevice(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuDevice device, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createDevice"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, device, unitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void createKit(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoKit kit, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId, java.lang.String[] equipmentIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createKit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, kit, unitId, equipmentIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void createProfile(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoProfile profile, java.lang.String[] organizations, java.lang.String[] missionIds, java.lang.String[] userIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createProfile"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, profile, organizations, missionIds, userIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void createRefugee(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoRefugee refugee) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createRefugee"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, refugee});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public java.lang.String createMission(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoMission mission, java.lang.String[] places, java.lang.String[] users, java.lang.String[] vehicles) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createMission"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, mission, places, users, vehicles});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (java.lang.String) _resp;
            } catch (java.lang.Exception _exception) {
                return (java.lang.String) org.apache.axis.utils.JavaUtils.convert(_resp, java.lang.String.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updatePlace(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuPlace place) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updatePlace"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, place});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void createVehicle(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuVehicle vehicle, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String[] organizations, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createVehicle"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, vehicle, internalIds, organizations, missionIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteWidget(java.lang.String token, java.lang.String widgetId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteWidget"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, widgetId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void setMyPicture(java.lang.String token, byte[] jpegPhoto) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "setMyPicture"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, jpegPhoto});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteProfile(java.lang.String token, java.lang.String profileId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteProfile"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, profileId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateUser(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuUser user) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateUser"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, user});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateDevice(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuDevice device) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateDevice"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, device});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateWidget(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoWidget widget) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateWidget"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, widget});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteKit(java.lang.String token, java.lang.String kitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteKit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, kitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteRefugee(java.lang.String token, java.lang.String refugeeId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteRefugee"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, refugeeId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteVehicle(java.lang.String token, java.lang.String vehicleId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteVehicle"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, vehicleId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteUser(java.lang.String token, java.lang.String userId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[18]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteUser"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, userId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void createWidget(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoWidget widget) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[19]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createWidget"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, widget});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateFence(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuFence fence) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[20]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateFence"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, fence});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateKit(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoKit kit) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[21]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateKit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, kit});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateMission(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoMission mission) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[22]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateMission"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, mission});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateRefugee(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoRefugee refugee) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[23]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateRefugee"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, refugee});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void createUser(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuUser user, java.lang.String[] certificationIds, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String[] organizations, java.lang.String[] missionIds, java.lang.String[] profileIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[24]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createUser"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, user, certificationIds, internalIds, organizations, missionIds, profileIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteFence(java.lang.String token, java.lang.String fenceId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[25]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteFence"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, fenceId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateProfile(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoProfile profile) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[26]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateProfile"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, profile});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deletePlace(java.lang.String token, java.lang.String placeId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[27]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deletePlace"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, placeId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteDevice(java.lang.String token, java.lang.String deviceId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[28]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteDevice"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, deviceId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteMission(java.lang.String token, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[29]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteMission"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateVehicle(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuVehicle vehicle) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[30]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateVehicle"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, vehicle});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignCertificationsFromUser(java.lang.String token, java.lang.String[] certificationIds, java.lang.String userId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[31]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignCertificationsFromUser"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, certificationIds, userId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignOrganizationFromProfiles(java.lang.String token, java.lang.String organization, java.lang.String[] profilesId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[32]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignOrganizationFromProfiles"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, organization, profilesId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignInternalIdsFromEquipment(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String equipmentId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[33]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignInternalIdsFromEquipment"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, internalIds, equipmentId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignProfileFromOrganizations(java.lang.String token, java.lang.String profileId, java.lang.String[] organizations) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[34]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignProfileFromOrganizations"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, profileId, organizations});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignMissionToUnits(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.ds.in._10_x.UnitType unitType, java.lang.String[] ids) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[35]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignMissionToUnits"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, unitType, ids});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignDeviceToUnit(java.lang.String token, java.lang.String deviceId, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[36]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignDeviceToUnit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, deviceId, unitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignFenceToMissions(java.lang.String token, java.lang.String fenceId, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[37]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignFenceToMissions"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, fenceId, missionIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignKitToUnit(java.lang.String token, java.lang.String kitId, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[38]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignKitToUnit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, kitId, unitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void createEquipment(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoEquipment equipment, java.lang.String kitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[39]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createEquipment"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, equipment, kitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignMissionToFences(java.lang.String token, java.lang.String missionId, java.lang.String[] fenceIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[40]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignMissionToFences"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, fenceIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public java.lang.String createCertification(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoCertification certification) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[41]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createCertification"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, certification});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (java.lang.String) _resp;
            } catch (java.lang.Exception _exception) {
                return (java.lang.String) org.apache.axis.utils.JavaUtils.convert(_resp, java.lang.String.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public java.lang.String createOrganization(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoOrganization organization) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[42]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createOrganization"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, organization});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (java.lang.String) _resp;
            } catch (java.lang.Exception _exception) {
                return (java.lang.String) org.apache.axis.utils.JavaUtils.convert(_resp, java.lang.String.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public java.lang.String createCasualty(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoCasualty casualty) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[43]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createCasualty"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, casualty});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (java.lang.String) _resp;
            } catch (java.lang.Exception _exception) {
                return (java.lang.String) org.apache.axis.utils.JavaUtils.convert(_resp, java.lang.String.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void createResourceType(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuResourceType resourceType) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.IOException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[44]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createResourceType"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, resourceType});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.IOException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.IOException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignUnitToMissions(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[45]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignUnitToMissions"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, unitId, missionIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignEquipmentsToKit(java.lang.String token, java.lang.String[] equipmentIds, java.lang.String kitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[46]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignEquipmentsToKit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, equipmentIds, kitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignUserToProfiles(java.lang.String token, java.lang.String userId, java.lang.String[] profileIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[47]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignUserToProfiles"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, userId, profileIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignProfileToUsers(java.lang.String token, java.lang.String profileId, java.lang.String[] userIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[48]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignProfileToUsers"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, profileId, userIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void createMiddleware(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoMiddleware middleware) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[49]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createMiddleware"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, middleware});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateMyAccount(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuUser user) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[50]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateMyAccount"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, user});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public java.lang.String[] enableOrDisableUsers(java.lang.String token, java.lang.String[] userIds, boolean isEnable) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[51]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "enableOrDisableUsers"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, userIds, new java.lang.Boolean(isEnable)});

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
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteResourceType(java.lang.String token, java.lang.String resourceTypeId, lu.hitec.pss.soap.ds.in._10_x.ResourcesTypesEnum resourceTypeType) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[52]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteResourceType"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, resourceTypeId, resourceTypeType});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteCertification(java.lang.String token, java.lang.String certificationId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[53]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteCertification"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, certificationId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteCasualty(java.lang.String token, java.lang.String casualtyId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[54]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteCasualty"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, casualtyId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteOrganization(java.lang.String token, java.lang.String organizationId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[55]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteOrganization"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, organizationId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteMiddleware(java.lang.String token, java.lang.String middlewareId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[56]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteMiddleware"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, middlewareId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void setPictureToEquipment(java.lang.String token, byte[] jpegPhoto, java.lang.String equipmentId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[57]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "setPictureToEquipment"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, jpegPhoto, equipmentId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateCasualty(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoCasualty casualty) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[58]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateCasualty"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, casualty});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateOrganization(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoOrganization organization) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[59]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateOrganization"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, organization});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteEquipment(java.lang.String token, java.lang.String equipmentId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[60]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteEquipment"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, equipmentId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void deleteThreshold(java.lang.String token, java.lang.String thresholdId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[61]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "deleteThreshold"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, thresholdId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateEquipment(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoEquipment equipment) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[62]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateEquipment"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, equipment});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateResourceType(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuResourceType resourceType) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.IOException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[63]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateResourceType"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, resourceType});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.IOException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.IOException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void setPictureToUser(java.lang.String token, byte[] jpegPhoto, java.lang.String userId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[64]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "setPictureToUser"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, jpegPhoto, userId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void setPictureToMission(java.lang.String token, byte[] jpegPhotoMaybeNull, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[65]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "setPictureToMission"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, jpegPhotoMaybeNull, missionId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateThreshold(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoThreshold threshold) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[66]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateThreshold"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, threshold});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignKitFromUnit(java.lang.String token, java.lang.String kitId, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[67]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignKitFromUnit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, kitId, unitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateCertification(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoCertification certification) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[68]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateCertification"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, certification});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateMiddleware(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoMiddleware middleware) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[69]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateMiddleware"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, middleware});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void createThreshold(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoThreshold threshold) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[70]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "createThreshold"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, threshold});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignProfileToMissions(java.lang.String token, java.lang.String profileId, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[71]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignProfileToMissions"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, profileId, missionIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void setPictureToOrganization(java.lang.String token, byte[] jpegPhotoMaybeNull, java.lang.String organizationId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[72]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "setPictureToOrganization"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, jpegPhotoMaybeNull, organizationId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignCertificationsToUser(java.lang.String token, java.lang.String[] certificationIds, java.lang.String userId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[73]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignCertificationsToUser"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, certificationIds, userId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void setPrimaryLocalisationDevice(java.lang.String token, java.lang.String deviceId, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[74]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "setPrimaryLocalisationDevice"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, deviceId, unitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignDeviceFromUnit(java.lang.String token, java.lang.String deviceId, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[75]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignDeviceFromUnit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, deviceId, unitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignEquipmentsFromKit(java.lang.String token, java.lang.String[] equipmentIds, java.lang.String kitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[76]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignEquipmentsFromKit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, equipmentIds, kitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignFenceFromMissions(java.lang.String token, java.lang.String fenceId, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[77]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignFenceFromMissions"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, fenceId, missionIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignInternalIdsFromKit(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String kitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[78]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignInternalIdsFromKit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, internalIds, kitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignInternalIdsToEquipment(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String equipmentId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[79]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignInternalIdsToEquipment"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, internalIds, equipmentId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignInternalIdsToKit(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String kitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[80]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignInternalIdsToKit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, internalIds, kitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignMissionToProfiles(java.lang.String token, java.lang.String missionId, java.lang.String[] profileIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[81]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignMissionToProfiles"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, profileIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignOrganizationToProfiles(java.lang.String token, java.lang.String organization, java.lang.String[] profileIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[82]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignOrganizationToProfiles"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, organization, profileIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignOrganizationToUnits(java.lang.String token, java.lang.String organization, lu.hitec.pss.soap.ds.in._10_x.UnitType unitType, java.lang.String[] uids) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[83]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignOrganizationToUnits"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, organization, unitType, uids});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignProfileToOrganizations(java.lang.String token, java.lang.String profile, java.lang.String[] organizations) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[84]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignProfileToOrganizations"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, profile, organizations});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignInternalIdsToUnit(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[85]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignInternalIdsToUnit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, internalIds, unitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void assignUnitToOrganizations(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId, java.lang.String[] organizations) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[86]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "assignUnitToOrganizations"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, unitId, organizations});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignUnitFromMissions(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[87]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignUnitFromMissions"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, unitId, missionIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignMissionFromFences(java.lang.String token, java.lang.String missionId, java.lang.String[] fenceIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[88]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignMissionFromFences"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, fenceIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignUserFromProfiles(java.lang.String token, java.lang.String userId, java.lang.String[] profileIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[89]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignUserFromProfiles"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, userId, profileIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignMissionFromProfiles(java.lang.String token, java.lang.String missionId, java.lang.String[] profilesId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[90]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignMissionFromProfiles"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, profilesId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignMissionFromUnits(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.ds.in._10_x.UnitType unitType, java.lang.String[] ids) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[91]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignMissionFromUnits"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, unitType, ids});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignProfileFromMissions(java.lang.String token, java.lang.String profileId, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[92]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignProfileFromMissions"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, profileId, missionIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignOrganizationFromUnits(java.lang.String token, java.lang.String organization, lu.hitec.pss.soap.ds.in._10_x.UnitId[] unitIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[93]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignOrganizationFromUnits"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, organization, unitIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignUnitFromOrganizations(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId, java.lang.String[] organizations) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[94]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignUnitFromOrganizations"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, unitId, organizations});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignInternalIdsFromUnit(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[95]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignInternalIdsFromUnit"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, internalIds, unitId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void unAssignProfileFromUsers(java.lang.String token, java.lang.String profileId, java.lang.String[] userIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[96]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "unAssignProfileFromUsers"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, profileId, userIds});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public void updateMyDashboardWidgets(java.lang.String token, java.lang.String widgets) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException {
        if (super.cachedEndpoint == null) {
            throw new org.apache.axis.NoEndPointException();
        }
        org.apache.axis.client.Call _call = createCall();
        _call.setOperation(_operations[97]);
        _call.setUseSOAPAction(true);
        _call.setSOAPActionURI("");
        _call.setEncodingStyle(null);
        _call.setProperty(org.apache.axis.client.Call.SEND_TYPE_ATTR, Boolean.FALSE);
        _call.setProperty(org.apache.axis.AxisEngine.PROP_DOMULTIREFS, Boolean.FALSE);
        _call.setSOAPVersion(org.apache.axis.soap.SOAPConstants.SOAP11_CONSTANTS);
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "updateMyDashboardWidgets"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, widgets});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        extractAttachments(_call);
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

}
