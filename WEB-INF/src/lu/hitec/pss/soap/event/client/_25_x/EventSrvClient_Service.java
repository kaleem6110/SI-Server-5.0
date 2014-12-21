/**
 * EventSrvClient_Service.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.client._25_x;

public interface EventSrvClient_Service extends javax.xml.rpc.Service {
    public java.lang.String getEventSrvClientPortAddress();

    public lu.hitec.pss.soap.event.client._25_x.EventSrvClient_PortType getEventSrvClientPort() throws javax.xml.rpc.ServiceException;

    public lu.hitec.pss.soap.event.client._25_x.EventSrvClient_PortType getEventSrvClientPort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException;
}
