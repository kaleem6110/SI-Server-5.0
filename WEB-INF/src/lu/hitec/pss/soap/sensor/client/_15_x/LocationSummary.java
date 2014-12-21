/**
 * LocationSummary.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class LocationSummary  implements java.io.Serializable {
    private lu.hitec.pss.soap.sensor.client._15_x.LocationValue latest;

    private lu.hitec.pss.soap.sensor.client._15_x.ValueRange range;

    public LocationSummary() {
    }

    public LocationSummary(
           lu.hitec.pss.soap.sensor.client._15_x.LocationValue latest,
           lu.hitec.pss.soap.sensor.client._15_x.ValueRange range) {
           this.latest = latest;
           this.range = range;
    }


    /**
     * Gets the latest value for this LocationSummary.
     * 
     * @return latest
     */
    public lu.hitec.pss.soap.sensor.client._15_x.LocationValue getLatest() {
        return latest;
    }


    /**
     * Sets the latest value for this LocationSummary.
     * 
     * @param latest
     */
    public void setLatest(lu.hitec.pss.soap.sensor.client._15_x.LocationValue latest) {
        this.latest = latest;
    }


    /**
     * Gets the range value for this LocationSummary.
     * 
     * @return range
     */
    public lu.hitec.pss.soap.sensor.client._15_x.ValueRange getRange() {
        return range;
    }


    /**
     * Sets the range value for this LocationSummary.
     * 
     * @param range
     */
    public void setRange(lu.hitec.pss.soap.sensor.client._15_x.ValueRange range) {
        this.range = range;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof LocationSummary)) return false;
        LocationSummary other = (LocationSummary) obj;
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
            ((this.range==null && other.getRange()==null) || 
             (this.range!=null &&
              this.range.equals(other.getRange())));
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
        if (getRange() != null) {
            _hashCode += getRange().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(LocationSummary.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationSummary"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("latest");
        elemField.setXmlName(new javax.xml.namespace.QName("", "latest"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationValue"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("range");
        elemField.setXmlName(new javax.xml.namespace.QName("", "range"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "valueRange"));
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
