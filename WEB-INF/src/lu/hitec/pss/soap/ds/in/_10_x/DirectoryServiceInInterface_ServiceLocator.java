/**
 * DirectoryServiceInInterface_ServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.ds.in._10_x;

public class DirectoryServiceInInterface_ServiceLocator extends org.apache.axis.client.Service implements lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterface_Service {

    public DirectoryServiceInInterface_ServiceLocator() {
    }


    public DirectoryServiceInInterface_ServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public DirectoryServiceInInterface_ServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for DirectoryServiceInInterfacePort
    private java.lang.String DirectoryServiceInInterfacePort_address = "http://middleware.globalepic.lu:80/ldapdirectoryservice/in/soap/DirectoryService";

    public java.lang.String getDirectoryServiceInInterfacePortAddress() {
        return DirectoryServiceInInterfacePort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String DirectoryServiceInInterfacePortWSDDServiceName = "DirectoryServiceInInterfacePort";

    public java.lang.String getDirectoryServiceInInterfacePortWSDDServiceName() {
        return DirectoryServiceInInterfacePortWSDDServiceName;
    }

    public void setDirectoryServiceInInterfacePortWSDDServiceName(java.lang.String name) {
        DirectoryServiceInInterfacePortWSDDServiceName = name;
    }

    public lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterface_PortType getDirectoryServiceInInterfacePort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(DirectoryServiceInInterfacePort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getDirectoryServiceInInterfacePort(endpoint);
    }

    public lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterface_PortType getDirectoryServiceInInterfacePort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterfacePortBindingStub _stub = new lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterfacePortBindingStub(portAddress, this);
            _stub.setPortName(getDirectoryServiceInInterfacePortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setDirectoryServiceInInterfacePortEndpointAddress(java.lang.String address) {
        DirectoryServiceInInterfacePort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterface_PortType.class.isAssignableFrom(serviceEndpointInterface)) {
                lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterfacePortBindingStub _stub = new lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterfacePortBindingStub(new java.net.URL(DirectoryServiceInInterfacePort_address), this);
                _stub.setPortName(getDirectoryServiceInInterfacePortWSDDServiceName());
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
        if ("DirectoryServiceInInterfacePort".equals(inputPortName)) {
            return getDirectoryServiceInInterfacePort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "DirectoryServiceInInterface");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "DirectoryServiceInInterfacePort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("DirectoryServiceInInterfacePort".equals(portName)) {
            setDirectoryServiceInInterfacePortEndpointAddress(address);
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
