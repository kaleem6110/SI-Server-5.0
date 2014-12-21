/**
 * EventSrvClient_ServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.client._25_x;

public class EventSrvClient_ServiceLocator extends org.apache.axis.client.Service implements lu.hitec.pss.soap.event.client._25_x.EventSrvClient_Service {

    public EventSrvClient_ServiceLocator() {
    }


    public EventSrvClient_ServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public EventSrvClient_ServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for EventSrvClientPort
    private java.lang.String EventSrvClientPort_address = "http://middleware-dev.globalepic.lu:80/eventservice/out/soap/EventService";

    public java.lang.String getEventSrvClientPortAddress() {
        return EventSrvClientPort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String EventSrvClientPortWSDDServiceName = "EventSrvClientPort";

    public java.lang.String getEventSrvClientPortWSDDServiceName() {
        return EventSrvClientPortWSDDServiceName;
    }

    public void setEventSrvClientPortWSDDServiceName(java.lang.String name) {
        EventSrvClientPortWSDDServiceName = name;
    }

    public lu.hitec.pss.soap.event.client._25_x.EventSrvClient_PortType getEventSrvClientPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(EventSrvClientPort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getEventSrvClientPort(endpoint);
    }

    public lu.hitec.pss.soap.event.client._25_x.EventSrvClient_PortType getEventSrvClientPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            lu.hitec.pss.soap.event.client._25_x.EventSrvClientPortBindingStub _stub = new lu.hitec.pss.soap.event.client._25_x.EventSrvClientPortBindingStub(portAddress, this);
            _stub.setPortName(getEventSrvClientPortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setEventSrvClientPortEndpointAddress(java.lang.String address) {
        EventSrvClientPort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (lu.hitec.pss.soap.event.client._25_x.EventSrvClient_PortType.class.isAssignableFrom(serviceEndpointInterface)) {
                lu.hitec.pss.soap.event.client._25_x.EventSrvClientPortBindingStub _stub = new lu.hitec.pss.soap.event.client._25_x.EventSrvClientPortBindingStub(new java.net.URL(EventSrvClientPort_address), this);
                _stub.setPortName(getEventSrvClientPortWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("EventSrvClientPort".equals(inputPortName)) {
            return getEventSrvClientPort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "EventSrvClient");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "EventSrvClientPort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("EventSrvClientPort".equals(portName)) {
            setEventSrvClientPortEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
