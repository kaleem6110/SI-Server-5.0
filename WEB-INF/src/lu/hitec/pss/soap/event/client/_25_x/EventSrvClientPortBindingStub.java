/**
 * EventSrvClientPortBindingStub.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.client._25_x;

public class EventSrvClientPortBindingStub extends org.apache.axis.client.Stub implements lu.hitec.pss.soap.event.client._25_x.EventSrvClient_PortType {
    private java.util.Vector cachedSerClasses = new java.util.Vector();
    private java.util.Vector cachedSerQNames = new java.util.Vector();
    private java.util.Vector cachedSerFactories = new java.util.Vector();
    private java.util.Vector cachedDeserFactories = new java.util.Vector();

    static org.apache.axis.description.OperationDesc [] _operations;

    static {
        _operations = new org.apache.axis.description.OperationDesc[10];
        _initOperationDesc1();
    }

    private static void _initOperationDesc1(){
        org.apache.axis.description.OperationDesc oper;
        org.apache.axis.description.ParameterDesc param;
        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getNotifiers");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierWithTemplates"));
        oper.setReturnClass(lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "notifiers"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"), 
                      true
                     ));
        _operations[0] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getNotifier");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "notifierId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "long"), java.lang.Long.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierWithTemplates"));
        oper.setReturnClass(lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "notifier"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[1] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getMissionStatus");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "missionStatus"));
        oper.setReturnClass(lu.hitec.pss.soap.event.client._25_x.MissionStatus[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "status"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        _operations[2] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("searchEventsByFence");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "fenceId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "event"));
        oper.setReturnClass(lu.hitec.pss.soap.event.client._25_x.Event[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "events"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "MissionClosedException"),
                      "lu.hitec.pss.soap.event.client._25_x.MissionClosedException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "MissionClosedException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[3] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("searchEventsByString");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "searchString"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "event"));
        oper.setReturnClass(lu.hitec.pss.soap.event.client._25_x.Event[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "events"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "MissionClosedException"),
                      "lu.hitec.pss.soap.event.client._25_x.MissionClosedException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "MissionClosedException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[4] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getProjectDetails");
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "project"));
        oper.setReturnClass(lu.hitec.pss.soap.event.client._25_x.Project.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "res"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        _operations[5] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getEventUpdatesForMyMissions");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "since"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"), java.util.Calendar.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "filter"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "evtFilter"), java.lang.String[].class, false, false);
        param.setItemQName(new javax.xml.namespace.QName("", "types"));
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "maxEventsPerMission"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"), int.class, false, false);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "listOfMissionUpdates"));
        oper.setReturnClass(lu.hitec.pss.soap.event.client._25_x.ListOfMissionUpdates.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "listOfMissionUpdates"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"), 
                      true
                     ));
        _operations[6] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("searchEventsByCircleZone");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "circle"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "simpleCircularZone"), lu.hitec.pss.soap.event.client._25_x.SimpleCircularZone.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "event"));
        oper.setReturnClass(lu.hitec.pss.soap.event.client._25_x.Event[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "events"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "MissionClosedException"),
                      "lu.hitec.pss.soap.event.client._25_x.MissionClosedException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "MissionClosedException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[7] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("getEventUpdatesByMission");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "mission"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "since"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"), java.util.Calendar.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "filter"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "evtFilter"), java.lang.String[].class, false, false);
        param.setItemQName(new javax.xml.namespace.QName("", "types"));
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "maxEventsPerMission"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"), int.class, false, false);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "missionUpdate"));
        oper.setReturnClass(lu.hitec.pss.soap.event.client._25_x.MissionUpdate.class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "missionUpdate"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "MissionClosedException"),
                      "lu.hitec.pss.soap.event.client._25_x.MissionClosedException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "MissionClosedException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[8] = oper;

        oper = new org.apache.axis.description.OperationDesc();
        oper.setName("searchEventsByPolygonZone");
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "token"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "missionId"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"), java.lang.String.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        param = new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("", "polygon"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "simplePolygonZone"), lu.hitec.pss.soap.event.client._25_x.SimplePolygonZone.class, false, false);
        param.setOmittable(true);
        oper.addParameter(param);
        oper.setReturnType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "event"));
        oper.setReturnClass(lu.hitec.pss.soap.event.client._25_x.Event[].class);
        oper.setReturnQName(new javax.xml.namespace.QName("", "events"));
        oper.setStyle(org.apache.axis.constants.Style.WRAPPED);
        oper.setUse(org.apache.axis.constants.Use.LITERAL);
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthorizationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "MissionClosedException"),
                      "lu.hitec.pss.soap.event.client._25_x.MissionClosedException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "MissionClosedException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"),
                      "lu.hitec.pss.soap.event.client._25_x.AuthenticationException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException"), 
                      true
                     ));
        oper.addFault(new org.apache.axis.description.FaultDesc(
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException"),
                      "lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException",
                      new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException"), 
                      true
                     ));
        _operations[9] = oper;

    }

    public EventSrvClientPortBindingStub() throws org.apache.axis.AxisFault {
         this(null);
    }

    public EventSrvClientPortBindingStub(java.net.URL endpointURL, javax.xml.rpc.Service service) throws org.apache.axis.AxisFault {
         this(service);
         super.cachedEndpoint = endpointURL;
    }

    public EventSrvClientPortBindingStub(javax.xml.rpc.Service service) throws org.apache.axis.AxisFault {
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
            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "abstractCircularZone");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.AbstractCircularZone.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "abstractGeoFence");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.AbstractGeoFence.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "abstractPolygonalZone");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.AbstractPolygonalZone.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthenticationException");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.AuthenticationException.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "AuthorizationException");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.AuthorizationException.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "desc");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.Desc.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "dtoDomain");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.DtoDomain.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "event");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.Event.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "evtFilter");
            cachedSerQNames.add(qName);
            cls = java.lang.String[].class;
            cachedSerClasses.add(cls);
            qName = new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string");
            qName2 = new javax.xml.namespace.QName("", "types");
            cachedSerFactories.add(new org.apache.axis.encoding.ser.ArraySerializerFactory(qName, qName2));
            cachedDeserFactories.add(new org.apache.axis.encoding.ser.ArrayDeserializerFactory());

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "listOfMissionUpdates");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.ListOfMissionUpdates.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "location");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.Location.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "logbook");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.Logbook.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "MissionClosedException");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.MissionClosedException.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "missionStatus");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.MissionStatus.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "missionUpdate");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.MissionUpdate.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notificationsProcessingEventStatus");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.NotificationsProcessingEventStatus.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifier");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.Notifier.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierFilter");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.NotifierFilter.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierProperty");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.NotifierProperty.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierPropertyMap");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.NotifierPropertyMapEntry[].class;
            cachedSerClasses.add(cls);
            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierPropertyMapEntry");
            qName2 = new javax.xml.namespace.QName("", "entry");
            cachedSerFactories.add(new org.apache.axis.encoding.ser.ArraySerializerFactory(qName, qName2));
            cachedDeserFactories.add(new org.apache.axis.encoding.ser.ArrayDeserializerFactory());

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierPropertyMapEntry");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.NotifierPropertyMapEntry.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierRecipient");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.NotifierRecipient.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierTypeEnum");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.NotifierTypeEnum.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierWithTemplates");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "point");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.Point.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "project");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.Project.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "recipient");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.Recipient.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "recipientIdTypeEnum");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.RecipientIdTypeEnum.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "relatedInfo");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.RelatedInfo.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "ResourceNotFoundException");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "severity");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.Severity.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(enumsf);
            cachedDeserFactories.add(enumdf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "simpleCircularZone");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.SimpleCircularZone.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "simplePolygonZone");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.SimplePolygonZone.class;
            cachedSerClasses.add(cls);
            cachedSerFactories.add(beansf);
            cachedDeserFactories.add(beandf);

            qName = new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "status");
            cachedSerQNames.add(qName);
            cls = lu.hitec.pss.soap.event.client._25_x.Status.class;
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

    public lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates[] getNotifiers(java.lang.String token) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "getNotifiers"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates[]) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates[]) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates[].class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates getNotifier(java.lang.String token, java.lang.Long notifierId) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "getNotifier"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, notifierId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.event.client._25_x.MissionStatus[] getMissionStatus(java.lang.String token) throws java.rmi.RemoteException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "getMissionStatus"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.event.client._25_x.MissionStatus[]) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.event.client._25_x.MissionStatus[]) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.event.client._25_x.MissionStatus[].class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.event.client._25_x.Event[] searchEventsByFence(java.lang.String token, java.lang.String missionId, java.lang.String fenceId) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "searchEventsByFence"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, fenceId});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.event.client._25_x.Event[]) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.event.client._25_x.Event[]) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.event.client._25_x.Event[].class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.MissionClosedException) {
              throw (lu.hitec.pss.soap.event.client._25_x.MissionClosedException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.event.client._25_x.Event[] searchEventsByString(java.lang.String token, java.lang.String missionId, java.lang.String searchString) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "searchEventsByString"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, searchString});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.event.client._25_x.Event[]) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.event.client._25_x.Event[]) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.event.client._25_x.Event[].class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.MissionClosedException) {
              throw (lu.hitec.pss.soap.event.client._25_x.MissionClosedException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.event.client._25_x.Project getProjectDetails() throws java.rmi.RemoteException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "getProjectDetails"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.event.client._25_x.Project) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.event.client._25_x.Project) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.event.client._25_x.Project.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.event.client._25_x.ListOfMissionUpdates getEventUpdatesForMyMissions(java.lang.String token, java.util.Calendar since, java.lang.String[] filter, int maxEventsPerMission) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "getEventUpdatesForMyMissions"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, since, filter, new java.lang.Integer(maxEventsPerMission)});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.event.client._25_x.ListOfMissionUpdates) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.event.client._25_x.ListOfMissionUpdates) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.event.client._25_x.ListOfMissionUpdates.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthenticationException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.event.client._25_x.Event[] searchEventsByCircleZone(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.event.client._25_x.SimpleCircularZone circle) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "searchEventsByCircleZone"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, circle});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.event.client._25_x.Event[]) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.event.client._25_x.Event[]) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.event.client._25_x.Event[].class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.MissionClosedException) {
              throw (lu.hitec.pss.soap.event.client._25_x.MissionClosedException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.event.client._25_x.MissionUpdate getEventUpdatesByMission(java.lang.String token, java.lang.String mission, java.util.Calendar since, java.lang.String[] filter, int maxEventsPerMission) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "getEventUpdatesByMission"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, mission, since, filter, new java.lang.Integer(maxEventsPerMission)});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.event.client._25_x.MissionUpdate) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.event.client._25_x.MissionUpdate) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.event.client._25_x.MissionUpdate.class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.MissionClosedException) {
              throw (lu.hitec.pss.soap.event.client._25_x.MissionClosedException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

    public lu.hitec.pss.soap.event.client._25_x.Event[] searchEventsByPolygonZone(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.event.client._25_x.SimplePolygonZone polygon) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException {
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
        _call.setOperationName(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "searchEventsByPolygonZone"));

        setRequestHeaders(_call);
        setAttachments(_call);
 try {        java.lang.Object _resp = _call.invoke(new java.lang.Object[] {token, missionId, polygon});

        if (_resp instanceof java.rmi.RemoteException) {
            throw (java.rmi.RemoteException)_resp;
        }
        else {
            extractAttachments(_call);
            try {
                return (lu.hitec.pss.soap.event.client._25_x.Event[]) _resp;
            } catch (java.lang.Exception _exception) {
                return (lu.hitec.pss.soap.event.client._25_x.Event[]) org.apache.axis.utils.JavaUtils.convert(_resp, lu.hitec.pss.soap.event.client._25_x.Event[].class);
            }
        }
  } catch (org.apache.axis.AxisFault axisFaultException) {
    if (axisFaultException.detail != null) {
        if (axisFaultException.detail instanceof java.rmi.RemoteException) {
              throw (java.rmi.RemoteException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthorizationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthorizationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.MissionClosedException) {
              throw (lu.hitec.pss.soap.event.client._25_x.MissionClosedException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.AuthenticationException) {
              throw (lu.hitec.pss.soap.event.client._25_x.AuthenticationException) axisFaultException.detail;
         }
        if (axisFaultException.detail instanceof lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException) {
              throw (lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException) axisFaultException.detail;
         }
   }
  throw axisFaultException;
}
    }

}
