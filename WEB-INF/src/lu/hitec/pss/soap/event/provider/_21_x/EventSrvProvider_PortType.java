/**
 * EventSrvProvider_PortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.provider._21_x;

public interface EventSrvProvider_PortType extends java.rmi.Remote {
    public java.lang.Long addNotifier(java.lang.String token, lu.hitec.pss.soap.event.provider._21_x.NotifierWithTemplates notifierWithTemplates) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.provider._21_x.AuthenticationException;
    public java.lang.String publishEvent(java.lang.String token, lu.hitec.pss.soap.event.provider._21_x.Event newEvent) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.provider._21_x.AuthorizationException, lu.hitec.pss.soap.event.provider._21_x.MissionClosedException, lu.hitec.pss.soap.event.provider._21_x.AuthenticationException, lu.hitec.pss.soap.event.provider._21_x.ResourceNotFoundException;
    public void deleteNotifier(java.lang.String token, java.lang.Long notifierId) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.provider._21_x.AuthenticationException;
    public lu.hitec.pss.soap.event.provider._21_x.StatusSummary getEventStatusSummary(java.lang.String token, java.lang.String eventRef) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.provider._21_x.AuthorizationException, lu.hitec.pss.soap.event.provider._21_x.MissionClosedException, lu.hitec.pss.soap.event.provider._21_x.AuthenticationException, lu.hitec.pss.soap.event.provider._21_x.ResourceNotFoundException;
    public void deleteEventByRef(java.lang.String token, java.lang.String eventRef) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.provider._21_x.AuthorizationException, lu.hitec.pss.soap.event.provider._21_x.MissionClosedException, lu.hitec.pss.soap.event.provider._21_x.AuthenticationException, lu.hitec.pss.soap.event.provider._21_x.ResourceNotFoundException;
}
