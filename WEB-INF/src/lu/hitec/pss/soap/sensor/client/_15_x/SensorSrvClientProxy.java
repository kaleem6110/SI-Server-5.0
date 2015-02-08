package lu.hitec.pss.soap.sensor.client._15_x;

public class SensorSrvClientProxy implements lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_PortType {
  private String _endpoint = null;
  private lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_PortType sensorSrvClient_PortType = null;
  
  public SensorSrvClientProxy() {
    _initSensorSrvClientProxy();
  }
  
  public SensorSrvClientProxy(String endpoint) {
    _endpoint = endpoint;
    _initSensorSrvClientProxy();
  }
  
  private void _initSensorSrvClientProxy() {
    try {
      sensorSrvClient_PortType = (new lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_ServiceLocator()).getSensorSrvClientPort();
      if (sensorSrvClient_PortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)sensorSrvClient_PortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)sensorSrvClient_PortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (sensorSrvClient_PortType != null)
      ((javax.xml.rpc.Stub)sensorSrvClient_PortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.SensorSrvClient_PortType getSensorSrvClient_PortType() {
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType;
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.Project getProjectDetails() throws java.rmi.RemoteException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getProjectDetails();
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.ServiceLimitsImpl getServiceLimits() throws java.rmi.RemoteException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getServiceLimits();
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] getAllVehiclesReports(java.lang.String token, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getAllVehiclesReports(token, missionId);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] getAllUsersReports(java.lang.String token, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getAllUsersReports(token, missionId);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] getAllPlacesReports(java.lang.String token, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getAllPlacesReports(token, missionId);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.UnitsReports getAllUnitsReports(java.lang.String token, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getAllUnitsReports(token, missionId);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.LocationValue getUnitLastLocation(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getUnitLastLocation(token, unitId, missionId);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.LocationStatus evaluateLocation(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.Point location, java.lang.String missionId) throws java.rmi.RemoteException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.evaluateLocation(token, location, missionId);
  }
  
  public java.lang.String[] getDevicesMissingInLdapDirectoryService(java.lang.String token) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getDevicesMissingInLdapDirectoryService(token);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.LocationRange getUnitLocationRangeForDevice(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.RangeLimit rangeLimit, java.lang.String collectingDeviceId) throws java.rmi.RemoteException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getUnitLocationRangeForDevice(token, unitId, missionId, rangeLimit, collectingDeviceId);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.UnitsReports searchUnitsByCircleZone(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.SimpleCircularZone circle) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.searchUnitsByCircleZone(token, missionId, circle);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.LocationValue getUnitLastLocationForDevice(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId, java.lang.String missionId, java.lang.String collectingDeviceId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getUnitLastLocationForDevice(token, unitId, missionId, collectingDeviceId);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.UnitsReports searchUnitsByPolygonZone(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.SimplePolygonZone polygon) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.searchUnitsByPolygonZone(token, missionId, polygon);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] searchUnitsByCircleZoneAndUnitType(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.SimpleCircularZone circle, lu.hitec.pss.soap.sensor.client._15_x.UnitType unitType) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.searchUnitsByCircleZoneAndUnitType(token, missionId, circle, unitType);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] searchUnitsByPolygonZoneAndUnitType(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.SimplePolygonZone polygon, lu.hitec.pss.soap.sensor.client._15_x.UnitType unitType) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthorizationException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException, lu.hitec.pss.soap.sensor.client._15_x.ResourceNotFoundException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.searchUnitsByPolygonZoneAndUnitType(token, missionId, polygon, unitType);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.LocationRange getUnitLocationRange(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.RangeLimit rangeLimit) throws java.rmi.RemoteException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getUnitLocationRange(token, unitId, missionId, rangeLimit);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.ProbeRange getUnitProbeRange(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId, java.lang.String probeType, java.lang.String missionId, lu.hitec.pss.soap.sensor.client._15_x.RangeLimit rangeLimit) throws java.rmi.RemoteException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getUnitProbeRange(token, unitId, probeType, missionId, rangeLimit);
  }
  
  public lu.hitec.pss.soap.sensor.client._15_x.UnitSummary getUnitSummary(java.lang.String token, lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.client._15_x.AuthenticationException{
    if (sensorSrvClient_PortType == null)
      _initSensorSrvClientProxy();
    return sensorSrvClient_PortType.getUnitSummary(token, unitId, missionId);
  }
  
  
}