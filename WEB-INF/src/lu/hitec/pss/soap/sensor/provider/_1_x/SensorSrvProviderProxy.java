package lu.hitec.pss.soap.sensor.provider._1_x;

public class SensorSrvProviderProxy implements lu.hitec.pss.soap.sensor.provider._1_x.SensorSrvProvider_PortType {
  private String _endpoint = null;
  private lu.hitec.pss.soap.sensor.provider._1_x.SensorSrvProvider_PortType sensorSrvProvider_PortType = null;
  
  public SensorSrvProviderProxy() {
    _initSensorSrvProviderProxy();
  }
  
  public SensorSrvProviderProxy(String endpoint) {
    _endpoint = endpoint;
    _initSensorSrvProviderProxy();
  }
  
  private void _initSensorSrvProviderProxy() {
    try {
      sensorSrvProvider_PortType = (new lu.hitec.pss.soap.sensor.provider._1_x.SensorSrvProvider_ServiceLocator()).getSensorSrvProviderPort();
      if (sensorSrvProvider_PortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)sensorSrvProvider_PortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)sensorSrvProvider_PortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (sensorSrvProvider_PortType != null)
      ((javax.xml.rpc.Stub)sensorSrvProvider_PortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public lu.hitec.pss.soap.sensor.provider._1_x.SensorSrvProvider_PortType getSensorSrvProvider_PortType() {
    if (sensorSrvProvider_PortType == null)
      _initSensorSrvProviderProxy();
    return sensorSrvProvider_PortType;
  }
  
  public void requestLocationPush(java.lang.String token, java.lang.String missionId, java.lang.String userId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.provider._1_x.AuthorizationException, lu.hitec.pss.soap.sensor.provider._1_x.AuthenticationException, lu.hitec.pss.soap.sensor.provider._1_x.ResourceNotFoundException{
    if (sensorSrvProvider_PortType == null)
      _initSensorSrvProviderProxy();
    sensorSrvProvider_PortType.requestLocationPush(token, missionId, userId);
  }
  
  public void performSendConfiguration(java.lang.String token, java.lang.String missionId, java.lang.Integer trackingPolicyInMeter, java.lang.Integer trackingPolicyInSecond) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.provider._1_x.AuthorizationException, lu.hitec.pss.soap.sensor.provider._1_x.AuthenticationException, lu.hitec.pss.soap.sensor.provider._1_x.ResourceNotFoundException{
    if (sensorSrvProvider_PortType == null)
      _initSensorSrvProviderProxy();
    sensorSrvProvider_PortType.performSendConfiguration(token, missionId, trackingPolicyInMeter, trackingPolicyInSecond);
  }
  
  
}