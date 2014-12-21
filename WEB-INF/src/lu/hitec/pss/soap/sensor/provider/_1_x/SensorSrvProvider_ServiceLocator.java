/**
 * SensorSrvProvider_ServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.provider._1_x;

public class SensorSrvProvider_ServiceLocator extends org.apache.axis.client.Service implements lu.hitec.pss.soap.sensor.provider._1_x.SensorSrvProvider_Service {

    public SensorSrvProvider_ServiceLocator() {
    }


    public SensorSrvProvider_ServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public SensorSrvProvider_ServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for SensorSrvProviderPort
    private java.lang.String SensorSrvProviderPort_address = "http://middleware-dev.globalepic.lu:80/sensorservice/in/soap/SensorService";

    public java.lang.String getSensorSrvProviderPortAddress() {
        return SensorSrvProviderPort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String SensorSrvProviderPortWSDDServiceName = "SensorSrvProviderPort";

    public java.lang.String getSensorSrvProviderPortWSDDServiceName() {
        return SensorSrvProviderPortWSDDServiceName;
    }

    public void setSensorSrvProviderPortWSDDServiceName(java.lang.String name) {
        SensorSrvProviderPortWSDDServiceName = name;
    }

    public lu.hitec.pss.soap.sensor.provider._1_x.SensorSrvProvider_PortType getSensorSrvProviderPort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(SensorSrvProviderPort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getSensorSrvProviderPort(endpoint);
    }

    public lu.hitec.pss.soap.sensor.provider._1_x.SensorSrvProvider_PortType getSensorSrvProviderPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            lu.hitec.pss.soap.sensor.provider._1_x.SensorSrvProviderPortBindingStub _stub = new lu.hitec.pss.soap.sensor.provider._1_x.SensorSrvProviderPortBindingStub(portAddress, this);
            _stub.setPortName(getSensorSrvProviderPortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setSensorSrvProviderPortEndpointAddress(java.lang.String address) {
        SensorSrvProviderPort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (lu.hitec.pss.soap.sensor.provider._1_x.SensorSrvProvider_PortType.class.isAssignableFrom(serviceEndpointInterface)) {
                lu.hitec.pss.soap.sensor.provider._1_x.SensorSrvProviderPortBindingStub _stub = new lu.hitec.pss.soap.sensor.provider._1_x.SensorSrvProviderPortBindingStub(new java.net.URL(SensorSrvProviderPort_address), this);
                _stub.setPortName(getSensorSrvProviderPortWSDDServiceName());
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
        if ("SensorSrvProviderPort".equals(inputPortName)) {
            return getSensorSrvProviderPort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/provider/1.x", "SensorSrvProvider");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/provider/1.x", "SensorSrvProviderPort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("SensorSrvProviderPort".equals(portName)) {
            setSensorSrvProviderPortEndpointAddress(address);
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
