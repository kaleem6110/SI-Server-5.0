/**
 * SensorSrvClient_ServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class SensorSrvClient_ServiceLocator extends org.apache.axis.client.Service implements lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_Service {

    public SensorSrvClient_ServiceLocator() {
    }


    public SensorSrvClient_ServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public SensorSrvClient_ServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for SensorSrvClientPort
    private java.lang.String SensorSrvClientPort_address = "http://middleware-dev.globalepic.lu:80/sensorservice/out/soap/SensorService";

    public java.lang.String getSensorSrvClientPortAddress() {
        return SensorSrvClientPort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String SensorSrvClientPortWSDDServiceName = "SensorSrvClientPort";

    public java.lang.String getSensorSrvClientPortWSDDServiceName() {
        return SensorSrvClientPortWSDDServiceName;
    }

    public void setSensorSrvClientPortWSDDServiceName(java.lang.String name) {
        SensorSrvClientPortWSDDServiceName = name;
    }

    public lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_PortType getSensorSrvClientPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(SensorSrvClientPort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getSensorSrvClientPort(endpoint);
    }

    public lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_PortType getSensorSrvClientPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClientPortBindingStub _stub = new lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClientPortBindingStub(portAddress, this);
            _stub.setPortName(getSensorSrvClientPortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setSensorSrvClientPortEndpointAddress(java.lang.String address) {
        SensorSrvClientPort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_PortType.class.isAssignableFrom(serviceEndpointInterface)) {
                lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClientPortBindingStub _stub = new lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClientPortBindingStub(new java.net.URL(SensorSrvClientPort_address), this);
                _stub.setPortName(getSensorSrvClientPortWSDDServiceName());
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
        if ("SensorSrvClientPort".equals(inputPortName)) {
            return getSensorSrvClientPort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "SensorSrvClient");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "SensorSrvClientPort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("SensorSrvClientPort".equals(portName)) {
            setSensorSrvClientPortEndpointAddress(address);
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
