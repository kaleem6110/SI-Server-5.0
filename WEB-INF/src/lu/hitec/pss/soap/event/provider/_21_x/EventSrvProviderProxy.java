package lu.hitec.pss.soap.event.provider._21_x;

public class EventSrvProviderProxy implements lu.hitec.pss.soap.event.provider._21_x.EventSrvProvider_PortType {
  private String _endpoint = null;
  private lu.hitec.pss.soap.event.provider._21_x.EventSrvProvider_PortType eventSrvProvider_PortType = null;
  
  public EventSrvProviderProxy() {
    _initEventSrvProviderProxy();
  }
  
  public EventSrvProviderProxy(String endpoint) {
    _endpoint = endpoint;
    _initEventSrvProviderProxy();
  }
  
  private void _initEventSrvProviderProxy() {
    try {
      eventSrvProvider_PortType = (new lu.hitec.pss.soap.event.provider._21_x.EventSrvProvider_ServiceLocator()).getEventSrvProviderPort();
      if (eventSrvProvider_PortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)eventSrvProvider_PortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)eventSrvProvider_PortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (eventSrvProvider_PortType != null)
      ((javax.xml.rpc.Stub)eventSrvProvider_PortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public lu.hitec.pss.soap.event.provider._21_x.EventSrvProvider_PortType getEventSrvProvider_PortType() {
    if (eventSrvProvider_PortType == null)
      _initEventSrvProviderProxy();
    return eventSrvProvider_PortType;
  }
  
  public java.lang.Long addNotifier(java.lang.String token, lu.hitec.pss.soap.event.provider._21_x.NotifierWithTemplates notifierWithTemplates) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.provider._21_x.AuthenticationException{
    if (eventSrvProvider_PortType == null)
      _initEventSrvProviderProxy();
    return eventSrvProvider_PortType.addNotifier(token, notifierWithTemplates);
  }
  
  public java.lang.String publishEvent(java.lang.String token, lu.hitec.pss.soap.event.provider._21_x.Event newEvent) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.provider._21_x.AuthorizationException, lu.hitec.pss.soap.event.provider._21_x.MissionClosedException, lu.hitec.pss.soap.event.provider._21_x.AuthenticationException, lu.hitec.pss.soap.event.provider._21_x.ResourceNotFoundException{
    if (eventSrvProvider_PortType == null)
      _initEventSrvProviderProxy();
    return eventSrvProvider_PortType.publishEvent(token, newEvent);
  }
  
  public lu.hitec.pss.soap.event.provider._21_x.StatusSummary getEventStatusSummary(java.lang.String token, java.lang.String eventRef) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.provider._21_x.AuthorizationException, lu.hitec.pss.soap.event.provider._21_x.MissionClosedException, lu.hitec.pss.soap.event.provider._21_x.AuthenticationException, lu.hitec.pss.soap.event.provider._21_x.ResourceNotFoundException{
    if (eventSrvProvider_PortType == null)
      _initEventSrvProviderProxy();
    return eventSrvProvider_PortType.getEventStatusSummary(token, eventRef);
  }
  
  public void deleteEventByRef(java.lang.String token, java.lang.String eventRef) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.provider._21_x.AuthorizationException, lu.hitec.pss.soap.event.provider._21_x.MissionClosedException, lu.hitec.pss.soap.event.provider._21_x.AuthenticationException, lu.hitec.pss.soap.event.provider._21_x.ResourceNotFoundException{
    if (eventSrvProvider_PortType == null)
      _initEventSrvProviderProxy();
    eventSrvProvider_PortType.deleteEventByRef(token, eventRef);
  }
  
  public void deleteNotifier(java.lang.String token, java.lang.Long notifierId) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.provider._21_x.AuthenticationException{
    if (eventSrvProvider_PortType == null)
      _initEventSrvProviderProxy();
    eventSrvProvider_PortType.deleteNotifier(token, notifierId);
  }
  
  public lu.hitec.pss.soap.event.provider._21_x.Notifier updateNotifier(java.lang.String token, lu.hitec.pss.soap.event.provider._21_x.NotifierWithTemplates notifierWithTemplates) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.provider._21_x.AuthenticationException{
    if (eventSrvProvider_PortType == null)
      _initEventSrvProviderProxy();
    return eventSrvProvider_PortType.updateNotifier(token, notifierWithTemplates);
  }
  
  public void updateMissionNotifiersStatus(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.event.provider._21_x.MissionNotifiersStatus missionNotifiersStatus) throws java.rmi.RemoteException, lu.hitec.pss.soap.event.provider._21_x.AuthorizationException, lu.hitec.pss.soap.event.provider._21_x.MissionClosedException, lu.hitec.pss.soap.event.provider._21_x.AuthenticationException, lu.hitec.pss.soap.event.provider._21_x.ResourceNotFoundException{
    if (eventSrvProvider_PortType == null)
      _initEventSrvProviderProxy();
    eventSrvProvider_PortType.updateMissionNotifiersStatus(token, missionId, missionNotifiersStatus);
  }
  
  
}