/**
 * ServiceLimitsImpl.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class ServiceLimitsImpl  implements java.io.Serializable {
    private int localLocationExpirationHours;

    private int localProbeExpirationHours;

    private int maxHistoryValues;

    private int syncMissionExpirationHours;

    private int valueLimitForDomainDiff;

    public ServiceLimitsImpl() {
    }

    public ServiceLimitsImpl(
           int localLocationExpirationHours,
           int localProbeExpirationHours,
           int maxHistoryValues,
           int syncMissionExpirationHours,
           int valueLimitForDomainDiff) {
           this.localLocationExpirationHours = localLocationExpirationHours;
           this.localProbeExpirationHours = localProbeExpirationHours;
           this.maxHistoryValues = maxHistoryValues;
           this.syncMissionExpirationHours = syncMissionExpirationHours;
           this.valueLimitForDomainDiff = valueLimitForDomainDiff;
    }


    /**
     * Gets the localLocationExpirationHours value for this ServiceLimitsImpl.
     * 
     * @return localLocationExpirationHours
     */
    public int getLocalLocationExpirationHours() {
        return localLocationExpirationHours;
    }


    /**
     * Sets the localLocationExpirationHours value for this ServiceLimitsImpl.
     * 
     * @param localLocationExpirationHours
     */
    public void setLocalLocationExpirationHours(int localLocationExpirationHours) {
        this.localLocationExpirationHours = localLocationExpirationHours;
    }


    /**
     * Gets the localProbeExpirationHours value for this ServiceLimitsImpl.
     * 
     * @return localProbeExpirationHours
     */
    public int getLocalProbeExpirationHours() {
        return localProbeExpirationHours;
    }


    /**
     * Sets the localProbeExpirationHours value for this ServiceLimitsImpl.
     * 
     * @param localProbeExpirationHours
     */
    public void setLocalProbeExpirationHours(int localProbeExpirationHours) {
        this.localProbeExpirationHours = localProbeExpirationHours;
    }


    /**
     * Gets the maxHistoryValues value for this ServiceLimitsImpl.
     * 
     * @return maxHistoryValues
     */
    public int getMaxHistoryValues() {
        return maxHistoryValues;
    }


    /**
     * Sets the maxHistoryValues value for this ServiceLimitsImpl.
     * 
     * @param maxHistoryValues
     */
    public void setMaxHistoryValues(int maxHistoryValues) {
        this.maxHistoryValues = maxHistoryValues;
    }


    /**
     * Gets the syncMissionExpirationHours value for this ServiceLimitsImpl.
     * 
     * @return syncMissionExpirationHours
     */
    public int getSyncMissionExpirationHours() {
        return syncMissionExpirationHours;
    }


    /**
     * Sets the syncMissionExpirationHours value for this ServiceLimitsImpl.
     * 
     * @param syncMissionExpirationHours
     */
    public void setSyncMissionExpirationHours(int syncMissionExpirationHours) {
        this.syncMissionExpirationHours = syncMissionExpirationHours;
    }


    /**
     * Gets the valueLimitForDomainDiff value for this ServiceLimitsImpl.
     * 
     * @return valueLimitForDomainDiff
     */
    public int getValueLimitForDomainDiff() {
        return valueLimitForDomainDiff;
    }


    /**
     * Sets the valueLimitForDomainDiff value for this ServiceLimitsImpl.
     * 
     * @param valueLimitForDomainDiff
     */
    public void setValueLimitForDomainDiff(int valueLimitForDomainDiff) {
        this.valueLimitForDomainDiff = valueLimitForDomainDiff;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ServiceLimitsImpl)) return false;
        ServiceLimitsImpl other = (ServiceLimitsImpl) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.localLocationExpirationHours == other.getLocalLocationExpirationHours() &&
            this.localProbeExpirationHours == other.getLocalProbeExpirationHours() &&
            this.maxHistoryValues == other.getMaxHistoryValues() &&
            this.syncMissionExpirationHours == other.getSyncMissionExpirationHours() &&
            this.valueLimitForDomainDiff == other.getValueLimitForDomainDiff();
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
        _hashCode += getLocalLocationExpirationHours();
        _hashCode += getLocalProbeExpirationHours();
        _hashCode += getMaxHistoryValues();
        _hashCode += getSyncMissionExpirationHours();
        _hashCode += getValueLimitForDomainDiff();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ServiceLimitsImpl.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "serviceLimitsImpl"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("localLocationExpirationHours");
        elemField.setXmlName(new javax.xml.namespace.QName("", "localLocationExpirationHours"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("localProbeExpirationHours");
        elemField.setXmlName(new javax.xml.namespace.QName("", "localProbeExpirationHours"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("maxHistoryValues");
        elemField.setXmlName(new javax.xml.namespace.QName("", "maxHistoryValues"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("syncMissionExpirationHours");
        elemField.setXmlName(new javax.xml.namespace.QName("", "syncMissionExpirationHours"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("valueLimitForDomainDiff");
        elemField.setXmlName(new javax.xml.namespace.QName("", "valueLimitForDomainDiff"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
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
