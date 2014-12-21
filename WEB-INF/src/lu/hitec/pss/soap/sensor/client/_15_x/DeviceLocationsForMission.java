/**
 * DeviceLocationsForMission.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class DeviceLocationsForMission  implements java.io.Serializable {
    private java.lang.String deviceId;

    private lu.hitec.pss.soap.sensor.client._15_x.LocationRange dtoLocationRange;

    private java.lang.String missionId;

    public DeviceLocationsForMission() {
    }

    public DeviceLocationsForMission(
           java.lang.String deviceId,
           lu.hitec.pss.soap.sensor.client._15_x.LocationRange dtoLocationRange,
           java.lang.String missionId) {
           this.deviceId = deviceId;
           this.dtoLocationRange = dtoLocationRange;
           this.missionId = missionId;
    }


    /**
     * Gets the deviceId value for this DeviceLocationsForMission.
     * 
     * @return deviceId
     */
    public java.lang.String getDeviceId() {
        return deviceId;
    }


    /**
     * Sets the deviceId value for this DeviceLocationsForMission.
     * 
     * @param deviceId
     */
    public void setDeviceId(java.lang.String deviceId) {
        this.deviceId = deviceId;
    }


    /**
     * Gets the dtoLocationRange value for this DeviceLocationsForMission.
     * 
     * @return dtoLocationRange
     */
    public lu.hitec.pss.soap.sensor.client._15_x.LocationRange getDtoLocationRange() {
        return dtoLocationRange;
    }


    /**
     * Sets the dtoLocationRange value for this DeviceLocationsForMission.
     * 
     * @param dtoLocationRange
     */
    public void setDtoLocationRange(lu.hitec.pss.soap.sensor.client._15_x.LocationRange dtoLocationRange) {
        this.dtoLocationRange = dtoLocationRange;
    }


    /**
     * Gets the missionId value for this DeviceLocationsForMission.
     * 
     * @return missionId
     */
    public java.lang.String getMissionId() {
        return missionId;
    }


    /**
     * Sets the missionId value for this DeviceLocationsForMission.
     * 
     * @param missionId
     */
    public void setMissionId(java.lang.String missionId) {
        this.missionId = missionId;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof DeviceLocationsForMission)) return false;
        DeviceLocationsForMission other = (DeviceLocationsForMission) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.deviceId==null && other.getDeviceId()==null) || 
             (this.deviceId!=null &&
              this.deviceId.equals(other.getDeviceId()))) &&
            ((this.dtoLocationRange==null && other.getDtoLocationRange()==null) || 
             (this.dtoLocationRange!=null &&
              this.dtoLocationRange.equals(other.getDtoLocationRange()))) &&
            ((this.missionId==null && other.getMissionId()==null) || 
             (this.missionId!=null &&
              this.missionId.equals(other.getMissionId())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getDeviceId() != null) {
            _hashCode += getDeviceId().hashCode();
        }
        if (getDtoLocationRange() != null) {
            _hashCode += getDtoLocationRange().hashCode();
        }
        if (getMissionId() != null) {
            _hashCode += getMissionId().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(DeviceLocationsForMission.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/12.x", "deviceLocationsForMission"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("deviceId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "deviceId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dtoLocationRange");
        elemField.setXmlName(new javax.xml.namespace.QName("", "dtoLocationRange"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/12.x", "locationRange"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("missionId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "missionId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
