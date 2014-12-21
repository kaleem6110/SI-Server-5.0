/**
 * ProbeSummary.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class ProbeSummary  implements java.io.Serializable {
    private lu.hitec.pss.soap.sensor.client._15_x.ProbeValue latest;

    private lu.hitec.pss.soap.sensor.client._15_x.ValueRange range;

    private java.lang.String type;  // attribute

    public ProbeSummary() {
    }

    public ProbeSummary(
           lu.hitec.pss.soap.sensor.client._15_x.ProbeValue latest,
           lu.hitec.pss.soap.sensor.client._15_x.ValueRange range,
           java.lang.String type) {
           this.latest = latest;
           this.range = range;
           this.type = type;
    }


    /**
     * Gets the latest value for this ProbeSummary.
     * 
     * @return latest
     */
    public lu.hitec.pss.soap.sensor.client._15_x.ProbeValue getLatest() {
        return latest;
    }


    /**
     * Sets the latest value for this ProbeSummary.
     * 
     * @param latest
     */
    public void setLatest(lu.hitec.pss.soap.sensor.client._15_x.ProbeValue latest) {
        this.latest = latest;
    }


    /**
     * Gets the range value for this ProbeSummary.
     * 
     * @return range
     */
    public lu.hitec.pss.soap.sensor.client._15_x.ValueRange getRange() {
        return range;
    }


    /**
     * Sets the range value for this ProbeSummary.
     * 
     * @param range
     */
    public void setRange(lu.hitec.pss.soap.sensor.client._15_x.ValueRange range) {
        this.range = range;
    }


    /**
     * Gets the type value for this ProbeSummary.
     * 
     * @return type
     */
    public java.lang.String getType() {
        return type;
    }


    /**
     * Sets the type value for this ProbeSummary.
     * 
     * @param type
     */
    public void setType(java.lang.String type) {
        this.type = type;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ProbeSummary)) return false;
        ProbeSummary other = (ProbeSummary) obj;
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
              this.range.equals(other.getRange()))) &&
            ((this.type==null && other.getType()==null) || 
             (this.type!=null &&
              this.type.equals(other.getType())));
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
        if (getType() != null) {
            _hashCode += getType().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ProbeSummary.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "probeSummary"));
        org.apache.axis.description.AttributeDesc attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("type");
        attrField.setXmlName(new javax.xml.namespace.QName("", "type"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("latest");
        elemField.setXmlName(new javax.xml.namespace.QName("", "latest"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "probeValue"));
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
