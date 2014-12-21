/**
 * NotificationStatus.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.provider._21_x;

public class NotificationStatus implements java.io.Serializable {
    private java.lang.String _value_;
    private static java.util.HashMap _table_ = new java.util.HashMap();

    // Constructor
    protected NotificationStatus(java.lang.String value) {
        _value_ = value;
        _table_.put(_value_,this);
    }

    public static final java.lang.String _ABORTED = "ABORTED";
    public static final java.lang.String _ACKNOWLEDGED = "ACKNOWLEDGED";
    public static final java.lang.String _FAILED = "FAILED";
    public static final java.lang.String _OPEN = "OPEN";
    public static final java.lang.String _SENT = "SENT";
    public static final java.lang.String _STATUS_NOK = "STATUS_NOK";
    public static final java.lang.String _STATUS_OK = "STATUS_OK";
    public static final NotificationStatus ABORTED = new NotificationStatus(_ABORTED);
    public static final NotificationStatus ACKNOWLEDGED = new NotificationStatus(_ACKNOWLEDGED);
    public static final NotificationStatus FAILED = new NotificationStatus(_FAILED);
    public static final NotificationStatus OPEN = new NotificationStatus(_OPEN);
    public static final NotificationStatus SENT = new NotificationStatus(_SENT);
    public static final NotificationStatus STATUS_NOK = new NotificationStatus(_STATUS_NOK);
    public static final NotificationStatus STATUS_OK = new NotificationStatus(_STATUS_OK);
    public java.lang.String getValue() { return _value_;}
    public static NotificationStatus fromValue(java.lang.String value)
          throws java.lang.IllegalArgumentException {
        NotificationStatus enumeration = (NotificationStatus)
            _table_.get(value);
        if (enumeration==null) throw new java.lang.IllegalArgumentException();
        return enumeration;
    }
    public static NotificationStatus fromString(java.lang.String value)
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
        new org.apache.axis.description.TypeDesc(NotificationStatus.class);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/provider/21.x", "notificationStatus"));
    }
    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

}
