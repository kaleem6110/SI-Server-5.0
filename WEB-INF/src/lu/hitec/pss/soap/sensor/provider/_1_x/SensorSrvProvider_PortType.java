/**
 * SensorSrvProvider_PortType.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.provider._1_x;

public interface SensorSrvProvider_PortType extends java.rmi.Remote {
    public void requestLocationPush(java.lang.String token, java.lang.String missionId, java.lang.String userId) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.provider._1_x.AuthorizationException, lu.hitec.pss.soap.sensor.provider._1_x.AuthenticationException, lu.hitec.pss.soap.sensor.provider._1_x.ResourceNotFoundException;
    public void performSendConfiguration(java.lang.String token, java.lang.String missionId, java.lang.Integer trackingPolicyInMeter, java.lang.Integer trackingPolicyInSecond) throws java.rmi.RemoteException, lu.hitec.pss.soap.sensor.provider._1_x.AuthorizationException, lu.hitec.pss.soap.sensor.provider._1_x.AuthenticationException, lu.hitec.pss.soap.sensor.provider._1_x.ResourceNotFoundException;
}
