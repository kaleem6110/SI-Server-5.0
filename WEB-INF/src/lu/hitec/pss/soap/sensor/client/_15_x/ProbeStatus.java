/**
 * ProbeStatus.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class ProbeStatus implements java.io.Serializable {
    private java.lang.String _value_;
    private static java.util.HashMap _table_ = new java.util.HashMap();

    // Constructor
    protected ProbeStatus(java.lang.String value) {
        _value_ = value;
        _table_.put(_value_,this);
    }

    public static final java.lang.String _LOWER_CRITICAL = "LOWER_CRITICAL";
    public static final java.lang.String _LOWER_WARNING = "LOWER_WARNING";
    public static final java.lang.String _NORMAL = "NORMAL";
    public static final java.lang.String _UNDEFINED = "UNDEFINED";
    public static final java.lang.String _UPPER_CRITICAL = "UPPER_CRITICAL";
    public static final java.lang.String _UPPER_WARNING = "UPPER_WARNING";
    public static final ProbeStatus LOWER_CRITICAL = new ProbeStatus(_LOWER_CRITICAL);
    public static final ProbeStatus LOWER_WARNING = new ProbeStatus(_LOWER_WARNING);
    public static final ProbeStatus NORMAL = new ProbeStatus(_NORMAL);
    public static final ProbeStatus UNDEFINED = new ProbeStatus(_UNDEFINED);
    public static final ProbeStatus UPPER_CRITICAL = new ProbeStatus(_UPPER_CRITICAL);
    public static final ProbeStatus UPPER_WARNING = new ProbeStatus(_UPPER_WARNING);
    public java.lang.String getValue() { return _value_;}
    public static ProbeStatus fromValue(java.lang.String value)
          throws java.lang.IllegalArgumentException {
        ProbeStatus enumeration = (ProbeStatus)
            _table_.get(value);
        if (enumeration==null) throw new java.lang.IllegalArgumentException();
        return enumeration;
    }
    public static ProbeStatus fromString(java.lang.String value)
          throws java.lang.IllegalArgumentException {
        return fromValue(value);
    }
    public boolean equals(java.lang.Object obj) {return (obj == this);}
    public int hashCode() { return toString().hashCode();}
    public java.lang.String toString() { return _value_;}
    public java.lang.Object readResolve() throws java.io.ObjectStreamException { return fromValue(_value_);}
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new org.apache.axis.encoding.ser.EnumSerializer(
            _javaType, _xmlType);
    }
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new org.apache.axis.encoding.ser.EnumDeserializer(
            _javaType, _xmlType);
    }
    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ProbeStatus.class);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "probeStatus"));
    }
    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

}
