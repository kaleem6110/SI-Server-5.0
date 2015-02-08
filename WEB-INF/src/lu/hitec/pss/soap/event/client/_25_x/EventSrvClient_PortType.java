/**
 * EventSrvClient_PortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.client._25_x;

public interface EventSrvClient_PortType extends java.rmi.Remote {
    public lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates[] getNotifiers(java.lang.String token) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException;
    public lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates getNotifier(java.lang.String token, java.lang.Long notifierId) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException;
    public lu.hitec.pss.soap.event.client._25_x.Project getProjectDetails() throws java.rmi.RemoteException;
    public lu.hitec.pss.soap.event.client._25_x.Event[] searchEventsByString(java.lang.String token, java.lang.String missionId, java.lang.String searchString) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException;
    public lu.hitec.pss.soap.event.client._25_x.MissionStatus[] getMissionStatus(java.lang.String token) throws java.rmi.RemoteException;
    public lu.hitec.pss.soap.event.client._25_x.Event[] searchEventsByFence(java.lang.String token, java.lang.String missionId, java.lang.String fenceId) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException;
    public lu.hitec.pss.soap.event.client._25_x.MissionUpdate getEventUpdatesByMission(java.lang.String token, java.lang.String mission, java.util.Calendar since, java.lang.String[] filter, int maxEventsPerMission) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException;
    public lu.hitec.pss.soap.event.client._25_x.ListOfMissionUpdates getEventUpdatesForMyMissions(java.lang.String token, java.util.Calendar since, java.lang.String[] filter, int maxEventsPerMission) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException;
    public lu.hitec.pss.soap.event.client._25_x.MissionNotifiersStatus getMissionNotifiersStatus(java.lang.String token, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException;
    public lu.hitec.pss.soap.event.client._25_x.Event[] searchEventsByCircleZone(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.event.client._25_x.SimpleCircularZone circle) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException;
    public lu.hitec.pss.soap.event.client._25_x.Event[] searchEventsByPolygonZone(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.event.client._25_x.SimplePolygonZone polygon) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException;
}
