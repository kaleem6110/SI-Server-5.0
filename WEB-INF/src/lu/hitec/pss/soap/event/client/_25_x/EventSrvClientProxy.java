package lu.hitec.pss.soap.event.client._25_x;

public class EventSrvClientProxy implements lu.hitec.pss.soap.event.client._25_x.EventSrvClient_PortType {
  private String _endpoint = null;
  private lu.hitec.pss.soap.event.client._25_x.EventSrvClient_PortType eventSrvClient_PortType = null;
  
  public EventSrvClientProxy() {
    _initEventSrvClientProxy();
  }
  
  public EventSrvClientProxy(String endpoint) {
    _endpoint = endpoint;
    _initEventSrvClientProxy();
  }
  
  private void _initEventSrvClientProxy() {
    try {
      eventSrvClient_PortType = (new lu.hitec.pss.soap.event.client._25_x.EventSrvClient_ServiceLocator()).getEventSrvClientPort();
      if (eventSrvClient_PortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)eventSrvClient_PortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)eventSrvClient_PortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (eventSrvClient_PortType != null)
      ((javax.xml.rpc.Stub)eventSrvClient_PortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public lu.hitec.pss.soap.event.client._25_x.EventSrvClient_PortType getEventSrvClient_PortType() {
    if (eventSrvClient_PortType == null)
      _initEventSrvClientProxy();
    return eventSrvClient_PortType;
  }
  
  public lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates[] getNotifiers(java.lang.String token) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException{
    if (eventSrvClient_PortType == null)
      _initEventSrvClientProxy();
    return eventSrvClient_PortType.getNotifiers(token);
  }
  
  public lu.hitec.pss.soap.event.client._25_x.NotifierWithTemplates getNotifier(java.lang.String token, java.lang.Long notifierId) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException{
    if (eventSrvClient_PortType == null)
      _initEventSrvClientProxy();
    return eventSrvClient_PortType.getNotifier(token, notifierId);
  }
  
  public lu.hitec.pss.soap.event.client._25_x.MissionStatus[] getMissionStatus(java.lang.String token) throws java.rmi.RemoteException{
    if (eventSrvClient_PortType == null)
      _initEventSrvClientProxy();
    return eventSrvClient_PortType.getMissionStatus(token);
  }
  
  public lu.hitec.pss.soap.event.client._25_x.Event[] searchEventsByFence(java.lang.String token, java.lang.String missionId, java.lang.String fenceId) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException{
    if (eventSrvClient_PortType == null)
      _initEventSrvClientProxy();
    return eventSrvClient_PortType.searchEventsByFence(token, missionId, fenceId);
  }
  
  public lu.hitec.pss.soap.event.client._25_x.Event[] searchEventsByString(java.lang.String token, java.lang.String missionId, java.lang.String searchString) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException{
    if (eventSrvClient_PortType == null)
      _initEventSrvClientProxy();
    return eventSrvClient_PortType.searchEventsByString(token, missionId, searchString);
  }
  
  public lu.hitec.pss.soap.event.client._25_x.Project getProjectDetails() throws java.rmi.RemoteException{
    if (eventSrvClient_PortType == null)
      _initEventSrvClientProxy();
    return eventSrvClient_PortType.getProjectDetails();
  }
  
  public lu.hitec.pss.soap.event.client._25_x.ListOfMissionUpdates getEventUpdatesForMyMissions(java.lang.String token, java.util.Calendar since, java.lang.String[] filter, int maxEventsPerMission) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException{
    if (eventSrvClient_PortType == null)
      _initEventSrvClientProxy();
    return eventSrvClient_PortType.getEventUpdatesForMyMissions(token, since, filter, maxEventsPerMission);
  }
  
  public lu.hitec.pss.soap.event.client._25_x.Event[] searchEventsByCircleZone(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.event.client._25_x.SimpleCircularZone circle) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException{
    if (eventSrvClient_PortType == null)
      _initEventSrvClientProxy();
    return eventSrvClient_PortType.searchEventsByCircleZone(token, missionId, circle);
  }
  
  public lu.hitec.pss.soap.event.client._25_x.MissionUpdate getEventUpdatesByMission(java.lang.String token, java.lang.String mission, java.util.Calendar since, java.lang.String[] filter, int maxEventsPerMission) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException{
    if (eventSrvClient_PortType == null)
      _initEventSrvClientProxy();
    return eventSrvClient_PortType.getEventUpdatesByMission(token, mission, since, filter, maxEventsPerMission);
  }
  
  public lu.hitec.pss.soap.event.client._25_x.Event[] searchEventsByPolygonZone(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.event.client._25_x.SimplePolygonZone polygon) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.client._25_x.AuthorizationException, lu.hitec.pss.soap.event.client._25_x.MissionClosedException, lu.hitec.pss.soap.event.client._25_x.AuthenticationException, lu.hitec.pss.soap.event.client._25_x.ResourceNotFoundException{
    if (eventSrvClient_PortType == null)
      _initEventSrvClientProxy();
    return eventSrvClient_PortType.searchEventsByPolygonZone(token, missionId, polygon);
  }
  
  
}