package lu.hitec.pss.soap.ds.in._10_x;

public class DirectoryServiceInInterfaceProxy implements lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterface_PortType {
  private String _endpoint = null;
  private lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterface_PortType directoryServiceInInterface_PortType = null;
  
  public DirectoryServiceInInterfaceProxy() {
    _initDirectoryServiceInInterfaceProxy();
  }
  
  public DirectoryServiceInInterfaceProxy(String endpoint) {
    _endpoint = endpoint;
    _initDirectoryServiceInInterfaceProxy();
  }
  
  private void _initDirectoryServiceInInterfaceProxy() {
    try {
      directoryServiceInInterface_PortType = (new lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterface_ServiceLocator()).getDirectoryServiceInInterfacePort();
      if (directoryServiceInInterface_PortType != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)directoryServiceInInterface_PortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)directoryServiceInInterface_PortType)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (directoryServiceInInterface_PortType != null)
      ((javax.xml.rpc.Stub)directoryServiceInInterface_PortType)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public lu.hitec.pss.soap.ds.in._10_x.DirectoryServiceInInterface_PortType getDirectoryServiceInInterface_PortType() {
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    return directoryServiceInInterface_PortType;
  }
  
  public void createFence(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuFence fence, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createFence(token, fence, missionIds);
  }
  
  public void createPlace(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuPlace place, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String[] organizations, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createPlace(token, place, internalIds, organizations, missionIds);
  }
  
  public void createDevice(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuDevice device, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createDevice(token, device, unitId);
  }
  
  public void createKit(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoKit kit, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId, java.lang.String[] equipmentIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createKit(token, kit, unitId, equipmentIds);
  }
  
  public void createProfile(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoProfile profile, java.lang.String[] organizations, java.lang.String[] missionIds, java.lang.String[] userIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createProfile(token, profile, organizations, missionIds, userIds);
  }
  
  public void createRefugee(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoRefugee refugee) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createRefugee(token, refugee);
  }
  
  public java.lang.String createMission(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoMission mission, java.lang.String[] places, java.lang.String[] users, java.lang.String[] vehicles) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    return directoryServiceInInterface_PortType.createMission(token, mission, places, users, vehicles);
  }
  
  public void updatePlace(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuPlace place) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updatePlace(token, place);
  }
  
  public void createVehicle(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuVehicle vehicle, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String[] organizations, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createVehicle(token, vehicle, internalIds, organizations, missionIds);
  }
  
  public void deleteWidget(java.lang.String token, java.lang.String widgetId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteWidget(token, widgetId);
  }
  
  public void setMyPicture(java.lang.String token, byte[] jpegPhoto) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.setMyPicture(token, jpegPhoto);
  }
  
  public void deleteProfile(java.lang.String token, java.lang.String profileId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteProfile(token, profileId);
  }
  
  public void updateUser(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuUser user) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateUser(token, user);
  }
  
  public void updateDevice(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuDevice device) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateDevice(token, device);
  }
  
  public void updateWidget(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoWidget widget) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateWidget(token, widget);
  }
  
  public void deleteKit(java.lang.String token, java.lang.String kitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteKit(token, kitId);
  }
  
  public void deleteRefugee(java.lang.String token, java.lang.String refugeeId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteRefugee(token, refugeeId);
  }
  
  public void deleteVehicle(java.lang.String token, java.lang.String vehicleId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteVehicle(token, vehicleId);
  }
  
  public void deleteUser(java.lang.String token, java.lang.String userId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteUser(token, userId);
  }
  
  public void createWidget(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoWidget widget) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createWidget(token, widget);
  }
  
  public void updateFence(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuFence fence) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateFence(token, fence);
  }
  
  public void updateKit(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoKit kit) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateKit(token, kit);
  }
  
  public void updateMission(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoMission mission) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateMission(token, mission);
  }
  
  public void updateRefugee(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoRefugee refugee) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateRefugee(token, refugee);
  }
  
  public void createUser(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuUser user, java.lang.String[] certificationIds, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String[] organizations, java.lang.String[] missionIds, java.lang.String[] profileIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createUser(token, user, certificationIds, internalIds, organizations, missionIds, profileIds);
  }
  
  public void deleteFence(java.lang.String token, java.lang.String fenceId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteFence(token, fenceId);
  }
  
  public void updateProfile(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoProfile profile) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateProfile(token, profile);
  }
  
  public void deletePlace(java.lang.String token, java.lang.String placeId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deletePlace(token, placeId);
  }
  
  public void deleteDevice(java.lang.String token, java.lang.String deviceId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteDevice(token, deviceId);
  }
  
  public void deleteMission(java.lang.String token, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteMission(token, missionId);
  }
  
  public void updateVehicle(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuVehicle vehicle) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateVehicle(token, vehicle);
  }
  
  public void unAssignCertificationsFromUser(java.lang.String token, java.lang.String[] certificationIds, java.lang.String userId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignCertificationsFromUser(token, certificationIds, userId);
  }
  
  public void unAssignOrganizationFromProfiles(java.lang.String token, java.lang.String organization, java.lang.String[] profilesId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignOrganizationFromProfiles(token, organization, profilesId);
  }
  
  public void unAssignInternalIdsFromEquipment(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String equipmentId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignInternalIdsFromEquipment(token, internalIds, equipmentId);
  }
  
  public void unAssignProfileFromOrganizations(java.lang.String token, java.lang.String profileId, java.lang.String[] organizations) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignProfileFromOrganizations(token, profileId, organizations);
  }
  
  public void assignMissionToUnits(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.ds.in._10_x.UnitType unitType, java.lang.String[] ids) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignMissionToUnits(token, missionId, unitType, ids);
  }
  
  public void assignDeviceToUnit(java.lang.String token, java.lang.String deviceId, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignDeviceToUnit(token, deviceId, unitId);
  }
  
  public void assignFenceToMissions(java.lang.String token, java.lang.String fenceId, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignFenceToMissions(token, fenceId, missionIds);
  }
  
  public void assignKitToUnit(java.lang.String token, java.lang.String kitId, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignKitToUnit(token, kitId, unitId);
  }
  
  public void createEquipment(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoEquipment equipment, java.lang.String kitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createEquipment(token, equipment, kitId);
  }
  
  public void assignMissionToFences(java.lang.String token, java.lang.String missionId, java.lang.String[] fenceIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignMissionToFences(token, missionId, fenceIds);
  }
  
  public java.lang.String createCertification(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoCertification certification) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    return directoryServiceInInterface_PortType.createCertification(token, certification);
  }
  
  public java.lang.String createOrganization(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoOrganization organization) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    return directoryServiceInInterface_PortType.createOrganization(token, organization);
  }
  
  public java.lang.String createCasualty(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoCasualty casualty) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.UnauthorizedDataException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    return directoryServiceInInterface_PortType.createCasualty(token, casualty);
  }
  
  public void createResourceType(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuResourceType resourceType) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.IOException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createResourceType(token, resourceType);
  }
  
  public void assignUnitToMissions(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignUnitToMissions(token, unitId, missionIds);
  }
  
  public void assignEquipmentsToKit(java.lang.String token, java.lang.String[] equipmentIds, java.lang.String kitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignEquipmentsToKit(token, equipmentIds, kitId);
  }
  
  public void assignUserToProfiles(java.lang.String token, java.lang.String userId, java.lang.String[] profileIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignUserToProfiles(token, userId, profileIds);
  }
  
  public void assignProfileToUsers(java.lang.String token, java.lang.String profileId, java.lang.String[] userIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignProfileToUsers(token, profileId, userIds);
  }
  
  public void createMiddleware(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoMiddleware middleware) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createMiddleware(token, middleware);
  }
  
  public void updateMyAccount(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuUser user) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateMyAccount(token, user);
  }
  
  public java.lang.String[] enableOrDisableUsers(java.lang.String token, java.lang.String[] userIds, boolean isEnable) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    return directoryServiceInInterface_PortType.enableOrDisableUsers(token, userIds, isEnable);
  }
  
  public void deleteResourceType(java.lang.String token, java.lang.String resourceTypeId, lu.hitec.pss.soap.ds.in._10_x.ResourcesTypesEnum resourceTypeType) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteResourceType(token, resourceTypeId, resourceTypeType);
  }
  
  public void deleteCertification(java.lang.String token, java.lang.String certificationId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteCertification(token, certificationId);
  }
  
  public void deleteCasualty(java.lang.String token, java.lang.String casualtyId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteCasualty(token, casualtyId);
  }
  
  public void deleteOrganization(java.lang.String token, java.lang.String organizationId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteOrganization(token, organizationId);
  }
  
  public void deleteMiddleware(java.lang.String token, java.lang.String middlewareId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteMiddleware(token, middlewareId);
  }
  
  public void setPictureToEquipment(java.lang.String token, byte[] jpegPhoto, java.lang.String equipmentId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.setPictureToEquipment(token, jpegPhoto, equipmentId);
  }
  
  public void updateCasualty(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoCasualty casualty) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateCasualty(token, casualty);
  }
  
  public void updateOrganization(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoOrganization organization) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateOrganization(token, organization);
  }
  
  public void deleteEquipment(java.lang.String token, java.lang.String equipmentId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteEquipment(token, equipmentId);
  }
  
  public void deleteThreshold(java.lang.String token, java.lang.String thresholdId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.deleteThreshold(token, thresholdId);
  }
  
  public void updateEquipment(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoEquipment equipment) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateEquipment(token, equipment);
  }
  
  public void updateResourceType(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.PssuResourceType resourceType) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.IOException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateResourceType(token, resourceType);
  }
  
  public void setPictureToUser(java.lang.String token, byte[] jpegPhoto, java.lang.String userId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.setPictureToUser(token, jpegPhoto, userId);
  }
  
  public void setPictureToMission(java.lang.String token, byte[] jpegPhotoMaybeNull, java.lang.String missionId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.setPictureToMission(token, jpegPhotoMaybeNull, missionId);
  }
  
  public void updateThreshold(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoThreshold threshold) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateThreshold(token, threshold);
  }
  
  public void unAssignKitFromUnit(java.lang.String token, java.lang.String kitId, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignKitFromUnit(token, kitId, unitId);
  }
  
  public void updateCertification(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoCertification certification) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateCertification(token, certification);
  }
  
  public void updateMiddleware(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoMiddleware middleware) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateMiddleware(token, middleware);
  }
  
  public void createThreshold(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.DtoThreshold threshold) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.createThreshold(token, threshold);
  }
  
  public void assignProfileToMissions(java.lang.String token, java.lang.String profileId, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignProfileToMissions(token, profileId, missionIds);
  }
  
  public void setPictureToOrganization(java.lang.String token, byte[] jpegPhotoMaybeNull, java.lang.String organizationId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.setPictureToOrganization(token, jpegPhotoMaybeNull, organizationId);
  }
  
  public void assignCertificationsToUser(java.lang.String token, java.lang.String[] certificationIds, java.lang.String userId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignCertificationsToUser(token, certificationIds, userId);
  }
  
  public void setPrimaryLocalisationDevice(java.lang.String token, java.lang.String deviceId, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.setPrimaryLocalisationDevice(token, deviceId, unitId);
  }
  
  public void unAssignDeviceFromUnit(java.lang.String token, java.lang.String deviceId, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignDeviceFromUnit(token, deviceId, unitId);
  }
  
  public void unAssignEquipmentsFromKit(java.lang.String token, java.lang.String[] equipmentIds, java.lang.String kitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignEquipmentsFromKit(token, equipmentIds, kitId);
  }
  
  public void unAssignFenceFromMissions(java.lang.String token, java.lang.String fenceId, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignFenceFromMissions(token, fenceId, missionIds);
  }
  
  public void unAssignInternalIdsFromKit(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String kitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignInternalIdsFromKit(token, internalIds, kitId);
  }
  
  public void assignInternalIdsToEquipment(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String equipmentId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignInternalIdsToEquipment(token, internalIds, equipmentId);
  }
  
  public void assignInternalIdsToKit(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, java.lang.String kitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignInternalIdsToKit(token, internalIds, kitId);
  }
  
  public void assignMissionToProfiles(java.lang.String token, java.lang.String missionId, java.lang.String[] profileIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignMissionToProfiles(token, missionId, profileIds);
  }
  
  public void assignOrganizationToProfiles(java.lang.String token, java.lang.String organization, java.lang.String[] profileIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignOrganizationToProfiles(token, organization, profileIds);
  }
  
  public void assignOrganizationToUnits(java.lang.String token, java.lang.String organization, lu.hitec.pss.soap.ds.in._10_x.UnitType unitType, java.lang.String[] uids) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignOrganizationToUnits(token, organization, unitType, uids);
  }
  
  public void assignProfileToOrganizations(java.lang.String token, java.lang.String profile, java.lang.String[] organizations) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignProfileToOrganizations(token, profile, organizations);
  }
  
  public void assignInternalIdsToUnit(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignInternalIdsToUnit(token, internalIds, unitId);
  }
  
  public void assignUnitToOrganizations(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId, java.lang.String[] organizations) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.assignUnitToOrganizations(token, unitId, organizations);
  }
  
  public void unAssignUnitFromMissions(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignUnitFromMissions(token, unitId, missionIds);
  }
  
  public void unAssignMissionFromFences(java.lang.String token, java.lang.String missionId, java.lang.String[] fenceIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignMissionFromFences(token, missionId, fenceIds);
  }
  
  public void unAssignUserFromProfiles(java.lang.String token, java.lang.String userId, java.lang.String[] profileIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignUserFromProfiles(token, userId, profileIds);
  }
  
  public void unAssignMissionFromProfiles(java.lang.String token, java.lang.String missionId, java.lang.String[] profilesId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignMissionFromProfiles(token, missionId, profilesId);
  }
  
  public void unAssignMissionFromUnits(java.lang.String token, java.lang.String missionId, lu.hitec.pss.soap.ds.in._10_x.UnitType unitType, java.lang.String[] ids) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignMissionFromUnits(token, missionId, unitType, ids);
  }
  
  public void unAssignProfileFromMissions(java.lang.String token, java.lang.String profileId, java.lang.String[] missionIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignProfileFromMissions(token, profileId, missionIds);
  }
  
  public void unAssignOrganizationFromUnits(java.lang.String token, java.lang.String organization, lu.hitec.pss.soap.ds.in._10_x.UnitId[] unitIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignOrganizationFromUnits(token, organization, unitIds);
  }
  
  public void unAssignUnitFromOrganizations(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId, java.lang.String[] organizations) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignUnitFromOrganizations(token, unitId, organizations);
  }
  
  public void unAssignInternalIdsFromUnit(java.lang.String token, lu.hitec.pss.soap.ds.in._10_x.InternalId[] internalIds, lu.hitec.pss.soap.ds.in._10_x.UnitId unitId) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignInternalIdsFromUnit(token, internalIds, unitId);
  }
  
  public void unAssignProfileFromUsers(java.lang.String token, java.lang.String profileId, java.lang.String[] userIds) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.unAssignProfileFromUsers(token, profileId, userIds);
  }
  
  public void updateMyDashboardWidgets(java.lang.String token, java.lang.String widgets) throws java.rmi.RemoteException, lu.hitec.pss.soap.ds.in._10_x.AuthorizationException, lu.hitec.pss.soap.ds.in._10_x.AuthenticationException, lu.hitec.pss.soap.ds.in._10_x.ResourceNotFoundException{
    if (directoryServiceInInterface_PortType == null)
      _initDirectoryServiceInInterfaceProxy();
    directoryServiceInInterface_PortType.updateMyDashboardWidgets(token, widgets);
  }
  
  
}