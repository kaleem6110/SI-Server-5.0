/**
 * TimeRange.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class TimeRange  implements java.io.Serializable {
    private java.util.Calendar latest;  // attribute

    private java.util.Calendar oldest;  // attribute

    public TimeRange() {
    }

    public TimeRange(
           java.util.Calendar latest,
           java.util.Calendar oldest) {
           this.latest = latest;
           this.oldest = oldest;
    }


    /**
     * Gets the latest value for this TimeRange.
     * 
     * @return latest
     */
    public java.util.Calendar getLatest() {
        return latest;
    }


    /**
     * Sets the latest value for this TimeRange.
     * 
     * @param latest
     */
    public void setLatest(java.util.Calendar latest) {
        this.latest = latest;
    }


    /**
     * Gets the oldest value for this TimeRange.
     * 
     * @return oldest
     */
    public java.util.Calendar getOldest() {
        return oldest;
    }


    /**
     * Sets the oldest value for this TimeRange.
     * 
     * @param oldest
     */
    public void setOldest(java.util.Calendar oldest) {
        this.oldest = oldest;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof TimeRange)) return false;
        TimeRange other = (TimeRange) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.latest==null && other.getLatest()==null) || 
             (this.latest!=null &&
              this.latest.equals(other.getLatest()))) &&
            ((this.oldest==null && other.getOldest()==null) || 
             (this.oldest!=null &&
              this.oldest.equals(other.getOldest())));
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
        if (getLatest() != null) {
            _hashCode += getLatest().hashCode();
        }
        if (getOldest() != null) {
            _hashCode += getOldest().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(TimeRange.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "timeRange"));
        org.apache.axis.description.AttributeDesc attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("latest");
        attrField.setXmlName(new javax.xml.namespace.QName("", "latest"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("oldest");
        attrField.setXmlName(new javax.xml.namespace.QName("", "oldest"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        typeDesc.addFieldDesc(attrField);
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
