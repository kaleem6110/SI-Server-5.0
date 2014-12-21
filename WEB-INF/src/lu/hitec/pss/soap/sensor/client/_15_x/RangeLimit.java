/**
 * RangeLimit.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class RangeLimit  implements java.io.Serializable {
    private lu.hitec.pss.soap.sensor.client._15_x.TimeRange timeRange;

    private int maxValues;  // attribute

    private lu.hitec.pss.soap.sensor.client._15_x.SubRangeType preferredSubRangeType;  // attribute

    public RangeLimit() {
    }

    public RangeLimit(
           lu.hitec.pss.soap.sensor.client._15_x.TimeRange timeRange,
           int maxValues,
           lu.hitec.pss.soap.sensor.client._15_x.SubRangeType preferredSubRangeType) {
           this.timeRange = timeRange;
           this.maxValues = maxValues;
           this.preferredSubRangeType = preferredSubRangeType;
    }


    /**
     * Gets the timeRange value for this RangeLimit.
     * 
     * @return timeRange
     */
    public lu.hitec.pss.soap.sensor.client._15_x.TimeRange getTimeRange() {
        return timeRange;
    }


    /**
     * Sets the timeRange value for this RangeLimit.
     * 
     * @param timeRange
     */
    public void setTimeRange(lu.hitec.pss.soap.sensor.client._15_x.TimeRange timeRange) {
        this.timeRange = timeRange;
    }


    /**
     * Gets the maxValues value for this RangeLimit.
     * 
     * @return maxValues
     */
    public int getMaxValues() {
        return maxValues;
    }


    /**
     * Sets the maxValues value for this RangeLimit.
     * 
     * @param maxValues
     */
    public void setMaxValues(int maxValues) {
        this.maxValues = maxValues;
    }


    /**
     * Gets the preferredSubRangeType value for this RangeLimit.
     * 
     * @return preferredSubRangeType
     */
    public lu.hitec.pss.soap.sensor.client._15_x.SubRangeType getPreferredSubRangeType() {
        return preferredSubRangeType;
    }


    /**
     * Sets the preferredSubRangeType value for this RangeLimit.
     * 
     * @param preferredSubRangeType
     */
    public void setPreferredSubRangeType(lu.hitec.pss.soap.sensor.client._15_x.SubRangeType preferredSubRangeType) {
        this.preferredSubRangeType = preferredSubRangeType;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RangeLimit)) return false;
        RangeLimit other = (RangeLimit) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.timeRange==null && other.getTimeRange()==null) || 
             (this.timeRange!=null &&
              this.timeRange.equals(other.getTimeRange()))) &&
            this.maxValues == other.getMaxValues() &&
            ((this.preferredSubRangeType==null && other.getPreferredSubRangeType()==null) || 
             (this.preferredSubRangeType!=null &&
              this.preferredSubRangeType.equals(other.getPreferredSubRangeType())));
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
        if (getTimeRange() != null) {
            _hashCode += getTimeRange().hashCode();
        }
        _hashCode += getMaxValues();
        if (getPreferredSubRangeType() != null) {
            _hashCode += getPreferredSubRangeType().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(RangeLimit.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "rangeLimit"));
        org.apache.axis.description.AttributeDesc attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("maxValues");
        attrField.setXmlName(new javax.xml.namespace.QName("", "maxValues"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("preferredSubRangeType");
        attrField.setXmlName(new javax.xml.namespace.QName("", "preferredSubRangeType"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "subRangeType"));
        typeDesc.addFieldDesc(attrField);
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("timeRange");
        elemField.setXmlName(new javax.xml.namespace.QName("", "timeRange"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "timeRange"));
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
