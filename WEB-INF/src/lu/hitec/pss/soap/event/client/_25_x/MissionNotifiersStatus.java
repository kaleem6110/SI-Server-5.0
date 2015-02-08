/**
 * MissionNotifiersStatus.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.client._25_x;

public class MissionNotifiersStatus  implements java.io.Serializable {
    private boolean safeZoneEmail;

    private boolean safeZoneSms;

    private boolean unSafeZoneEmail;

    private boolean unSafeZoneSms;

    public MissionNotifiersStatus() {
    }

    public MissionNotifiersStatus(
           boolean safeZoneEmail,
           boolean safeZoneSms,
           boolean unSafeZoneEmail,
           boolean unSafeZoneSms) {
           this.safeZoneEmail = safeZoneEmail;
           this.safeZoneSms = safeZoneSms;
           this.unSafeZoneEmail = unSafeZoneEmail;
           this.unSafeZoneSms = unSafeZoneSms;
    }


    /**
     * Gets the safeZoneEmail value for this MissionNotifiersStatus.
     * 
     * @return safeZoneEmail
     */
    public boolean isSafeZoneEmail() {
        return safeZoneEmail;
    }


    /**
     * Sets the safeZoneEmail value for this MissionNotifiersStatus.
     * 
     * @param safeZoneEmail
     */
    public void setSafeZoneEmail(boolean safeZoneEmail) {
        this.safeZoneEmail = safeZoneEmail;
    }


    /**
     * Gets the safeZoneSms value for this MissionNotifiersStatus.
     * 
     * @return safeZoneSms
     */
    public boolean isSafeZoneSms() {
        return safeZoneSms;
    }


    /**
     * Sets the safeZoneSms value for this MissionNotifiersStatus.
     * 
     * @param safeZoneSms
     */
    public void setSafeZoneSms(boolean safeZoneSms) {
        this.safeZoneSms = safeZoneSms;
    }


    /**
     * Gets the unSafeZoneEmail value for this MissionNotifiersStatus.
     * 
     * @return unSafeZoneEmail
     */
    public boolean isUnSafeZoneEmail() {
        return unSafeZoneEmail;
    }


    /**
     * Sets the unSafeZoneEmail value for this MissionNotifiersStatus.
     * 
     * @param unSafeZoneEmail
     */
    public void setUnSafeZoneEmail(boolean unSafeZoneEmail) {
        this.unSafeZoneEmail = unSafeZoneEmail;
    }


    /**
     * Gets the unSafeZoneSms value for this MissionNotifiersStatus.
     * 
     * @return unSafeZoneSms
     */
    public boolean isUnSafeZoneSms() {
        return unSafeZoneSms;
    }


    /**
     * Sets the unSafeZoneSms value for this MissionNotifiersStatus.
     * 
     * @param unSafeZoneSms
     */
    public void setUnSafeZoneSms(boolean unSafeZoneSms) {
        this.unSafeZoneSms = unSafeZoneSms;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof MissionNotifiersStatus)) return false;
        MissionNotifiersStatus other = (MissionNotifiersStatus) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.safeZoneEmail == other.isSafeZoneEmail() &&
            this.safeZoneSms == other.isSafeZoneSms() &&
            this.unSafeZoneEmail == other.isUnSafeZoneEmail() &&
            this.unSafeZoneSms == other.isUnSafeZoneSms();
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
        _hashCode += (isSafeZoneEmail() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        _hashCode += (isSafeZoneSms() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        _hashCode += (isUnSafeZoneEmail() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        _hashCode += (isUnSafeZoneSms() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(MissionNotifiersStatus.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "missionNotifiersStatus"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("safeZoneEmail");
        elemField.setXmlName(new javax.xml.namespace.QName("", "safeZoneEmail"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("safeZoneSms");
        elemField.setXmlName(new javax.xml.namespace.QName("", "safeZoneSms"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unSafeZoneEmail");
        elemField.setXmlName(new javax.xml.namespace.QName("", "unSafeZoneEmail"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unSafeZoneSms");
        elemField.setXmlName(new javax.xml.namespace.QName("", "unSafeZoneSms"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
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
