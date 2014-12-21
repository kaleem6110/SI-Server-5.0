/**
 * UnitReport.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class UnitReport  implements java.io.Serializable {
    private java.lang.String displayName;

    private lu.hitec.pss.soap.sensor.client._15_x.LocationValue locationValue;

    private java.lang.Boolean pending;

    private boolean primaryLocalisationDeviceOfTypeAndroidDevice;

    private java.lang.String subtype;

    private lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId;

    private lu.hitec.pss.soap.sensor.client._15_x.Severity worstSeverity;

    private java.lang.String worstSeverityDevice;

    public UnitReport() {
    }

    public UnitReport(
           java.lang.String displayName,
           lu.hitec.pss.soap.sensor.client._15_x.LocationValue locationValue,
           java.lang.Boolean pending,
           boolean primaryLocalisationDeviceOfTypeAndroidDevice,
           java.lang.String subtype,
           lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId,
           lu.hitec.pss.soap.sensor.client._15_x.Severity worstSeverity,
           java.lang.String worstSeverityDevice) {
           this.displayName = displayName;
           this.locationValue = locationValue;
           this.pending = pending;
           this.primaryLocalisationDeviceOfTypeAndroidDevice = primaryLocalisationDeviceOfTypeAndroidDevice;
           this.subtype = subtype;
           this.unitId = unitId;
           this.worstSeverity = worstSeverity;
           this.worstSeverityDevice = worstSeverityDevice;
    }


    /**
     * Gets the displayName value for this UnitReport.
     * 
     * @return displayName
     */
    public java.lang.String getDisplayName() {
        return displayName;
    }


    /**
     * Sets the displayName value for this UnitReport.
     * 
     * @param displayName
     */
    public void setDisplayName(java.lang.String displayName) {
        this.displayName = displayName;
    }


    /**
     * Gets the locationValue value for this UnitReport.
     * 
     * @return locationValue
     */
    public lu.hitec.pss.soap.sensor.client._15_x.LocationValue getLocationValue() {
        return locationValue;
    }


    /**
     * Sets the locationValue value for this UnitReport.
     * 
     * @param locationValue
     */
    public void setLocationValue(lu.hitec.pss.soap.sensor.client._15_x.LocationValue locationValue) {
        this.locationValue = locationValue;
    }


    /**
     * Gets the pending value for this UnitReport.
     * 
     * @return pending
     */
    public java.lang.Boolean getPending() {
        return pending;
    }


    /**
     * Sets the pending value for this UnitReport.
     * 
     * @param pending
     */
    public void setPending(java.lang.Boolean pending) {
        this.pending = pending;
    }


    /**
     * Gets the primaryLocalisationDeviceOfTypeAndroidDevice value for this UnitReport.
     * 
     * @return primaryLocalisationDeviceOfTypeAndroidDevice
     */
    public boolean isPrimaryLocalisationDeviceOfTypeAndroidDevice() {
        return primaryLocalisationDeviceOfTypeAndroidDevice;
    }


    /**
     * Sets the primaryLocalisationDeviceOfTypeAndroidDevice value for this UnitReport.
     * 
     * @param primaryLocalisationDeviceOfTypeAndroidDevice
     */
    public void setPrimaryLocalisationDeviceOfTypeAndroidDevice(boolean primaryLocalisationDeviceOfTypeAndroidDevice) {
        this.primaryLocalisationDeviceOfTypeAndroidDevice = primaryLocalisationDeviceOfTypeAndroidDevice;
    }


    /**
     * Gets the subtype value for this UnitReport.
     * 
     * @return subtype
     */
    public java.lang.String getSubtype() {
        return subtype;
    }


    /**
     * Sets the subtype value for this UnitReport.
     * 
     * @param subtype
     */
    public void setSubtype(java.lang.String subtype) {
        this.subtype = subtype;
    }


    /**
     * Gets the unitId value for this UnitReport.
     * 
     * @return unitId
     */
    public lu.hitec.pss.soap.sensor.client._15_x.UnitId getUnitId() {
        return unitId;
    }


    /**
     * Sets the unitId value for this UnitReport.
     * 
     * @param unitId
     */
    public void setUnitId(lu.hitec.pss.soap.sensor.client._15_x.UnitId unitId) {
        this.unitId = unitId;
    }


    /**
     * Gets the worstSeverity value for this UnitReport.
     * 
     * @return worstSeverity
     */
    public lu.hitec.pss.soap.sensor.client._15_x.Severity getWorstSeverity() {
        return worstSeverity;
    }


    /**
     * Sets the worstSeverity value for this UnitReport.
     * 
     * @param worstSeverity
     */
    public void setWorstSeverity(lu.hitec.pss.soap.sensor.client._15_x.Severity worstSeverity) {
        this.worstSeverity = worstSeverity;
    }


    /**
     * Gets the worstSeverityDevice value for this UnitReport.
     * 
     * @return worstSeverityDevice
     */
    public java.lang.String getWorstSeverityDevice() {
        return worstSeverityDevice;
    }


    /**
     * Sets the worstSeverityDevice value for this UnitReport.
     * 
     * @param worstSeverityDevice
     */
    public void setWorstSeverityDevice(java.lang.String worstSeverityDevice) {
        this.worstSeverityDevice = worstSeverityDevice;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof UnitReport)) return false;
        UnitReport other = (UnitReport) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.displayName==null && other.getDisplayName()==null) || 
             (this.displayName!=null &&
              this.displayName.equals(other.getDisplayName()))) &&
            ((this.locationValue==null && other.getLocationValue()==null) || 
             (this.locationValue!=null &&
              this.locationValue.equals(other.getLocationValue()))) &&
            ((this.pending==null && other.getPending()==null) || 
             (this.pending!=null &&
              this.pending.equals(other.getPending()))) &&
            this.primaryLocalisationDeviceOfTypeAndroidDevice == other.isPrimaryLocalisationDeviceOfTypeAndroidDevice() &&
            ((this.subtype==null && other.getSubtype()==null) || 
             (this.subtype!=null &&
              this.subtype.equals(other.getSubtype()))) &&
            ((this.unitId==null && other.getUnitId()==null) || 
             (this.unitId!=null &&
              this.unitId.equals(other.getUnitId()))) &&
            ((this.worstSeverity==null && other.getWorstSeverity()==null) || 
             (this.worstSeverity!=null &&
              this.worstSeverity.equals(other.getWorstSeverity()))) &&
            ((this.worstSeverityDevice==null && other.getWorstSeverityDevice()==null) || 
             (this.worstSeverityDevice!=null &&
              this.worstSeverityDevice.equals(other.getWorstSeverityDevice())));
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
        if (getDisplayName() != null) {
            _hashCode += getDisplayName().hashCode();
        }
        if (getLocationValue() != null) {
            _hashCode += getLocationValue().hashCode();
        }
        if (getPending() != null) {
            _hashCode += getPending().hashCode();
        }
        _hashCode += (isPrimaryLocalisationDeviceOfTypeAndroidDevice() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        if (getSubtype() != null) {
            _hashCode += getSubtype().hashCode();
        }
        if (getUnitId() != null) {
            _hashCode += getUnitId().hashCode();
        }
        if (getWorstSeverity() != null) {
            _hashCode += getWorstSeverity().hashCode();
        }
        if (getWorstSeverityDevice() != null) {
            _hashCode += getWorstSeverityDevice().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(UnitReport.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitReport"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("displayName");
        elemField.setXmlName(new javax.xml.namespace.QName("", "displayName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("locationValue");
        elemField.setXmlName(new javax.xml.namespace.QName("", "locationValue"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("pending");
        elemField.setXmlName(new javax.xml.namespace.QName("", "pending"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("primaryLocalisationDeviceOfTypeAndroidDevice");
        elemField.setXmlName(new javax.xml.namespace.QName("", "primaryLocalisationDeviceOfTypeAndroidDevice"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("subtype");
        elemField.setXmlName(new javax.xml.namespace.QName("", "subtype"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unitId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "unitId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitId"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("worstSeverity");
        elemField.setXmlName(new javax.xml.namespace.QName("", "worstSeverity"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "severity"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("worstSeverityDevice");
        elemField.setXmlName(new javax.xml.namespace.QName("", "worstSeverityDevice"));
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
