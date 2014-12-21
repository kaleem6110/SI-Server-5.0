/**
 * LocationRange.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class LocationRange  implements java.io.Serializable {
    private int missingValues;

    private lu.hitec.pss.soap.sensor.client._15_x.LocationValue[] val;

    public LocationRange() {
    }

    public LocationRange(
           int missingValues,
           lu.hitec.pss.soap.sensor.client._15_x.LocationValue[] val) {
           this.missingValues = missingValues;
           this.val = val;
    }


    /**
     * Gets the missingValues value for this LocationRange.
     * 
     * @return missingValues
     */
    public int getMissingValues() {
        return missingValues;
    }


    /**
     * Sets the missingValues value for this LocationRange.
     * 
     * @param missingValues
     */
    public void setMissingValues(int missingValues) {
        this.missingValues = missingValues;
    }


    /**
     * Gets the val value for this LocationRange.
     * 
     * @return val
     */
    public lu.hitec.pss.soap.sensor.client._15_x.LocationValue[] getVal() {
        return val;
    }


    /**
     * Sets the val value for this LocationRange.
     * 
     * @param val
     */
    public void setVal(lu.hitec.pss.soap.sensor.client._15_x.LocationValue[] val) {
        this.val = val;
    }

    public lu.hitec.pss.soap.sensor.client._15_x.LocationValue getVal(int i) {
        return this.val[i];
    }

    public void setVal(int i, lu.hitec.pss.soap.sensor.client._15_x.LocationValue _value) {
        this.val[i] = _value;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof LocationRange)) return false;
        LocationRange other = (LocationRange) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.missingValues == other.getMissingValues() &&
            ((this.val==null && other.getVal()==null) || 
             (this.val!=null &&
              java.util.Arrays.equals(this.val, other.getVal())));
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
        _hashCode += getMissingValues();
        if (getVal() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getVal());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getVal(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(LocationRange.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationRange"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("missingValues");
        elemField.setXmlName(new javax.xml.namespace.QName("", "missingValues"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("val");
        elemField.setXmlName(new javax.xml.namespace.QName("", "val"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationValue"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setMaxOccursUnbounded(true);
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
