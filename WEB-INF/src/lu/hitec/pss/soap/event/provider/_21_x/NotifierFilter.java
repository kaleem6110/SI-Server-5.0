/**
 * NotifierFilter.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.provider._21_x;

public class NotifierFilter  implements java.io.Serializable {
    private java.lang.String middlewareId;  // attribute

    private lu.hitec.pss.soap.event.provider._21_x.Severity minSeverity;  // attribute

    private java.lang.String missionId;  // attribute

    private java.lang.String source;  // attribute

    private java.lang.String type;  // attribute

    public NotifierFilter() {
    }

    public NotifierFilter(
           java.lang.String middlewareId,
           lu.hitec.pss.soap.event.provider._21_x.Severity minSeverity,
           java.lang.String missionId,
           java.lang.String source,
           java.lang.String type) {
           this.middlewareId = middlewareId;
           this.minSeverity = minSeverity;
           this.missionId = missionId;
           this.source = source;
           this.type = type;
    }


    /**
     * Gets the middlewareId value for this NotifierFilter.
     * 
     * @return middlewareId
     */
    public java.lang.String getMiddlewareId() {
        return middlewareId;
    }


    /**
     * Sets the middlewareId value for this NotifierFilter.
     * 
     * @param middlewareId
     */
    public void setMiddlewareId(java.lang.String middlewareId) {
        this.middlewareId = middlewareId;
    }


    /**
     * Gets the minSeverity value for this NotifierFilter.
     * 
     * @return minSeverity
     */
    public lu.hitec.pss.soap.event.provider._21_x.Severity getMinSeverity() {
        return minSeverity;
    }


    /**
     * Sets the minSeverity value for this NotifierFilter.
     * 
     * @param minSeverity
     */
    public void setMinSeverity(lu.hitec.pss.soap.event.provider._21_x.Severity minSeverity) {
        this.minSeverity = minSeverity;
    }


    /**
     * Gets the missionId value for this NotifierFilter.
     * 
     * @return missionId
     */
    public java.lang.String getMissionId() {
        return missionId;
    }


    /**
     * Sets the missionId value for this NotifierFilter.
     * 
     * @param missionId
     */
    public void setMissionId(java.lang.String missionId) {
        this.missionId = missionId;
    }


    /**
     * Gets the source value for this NotifierFilter.
     * 
     * @return source
     */
    public java.lang.String getSource() {
        return source;
    }


    /**
     * Sets the source value for this NotifierFilter.
     * 
     * @param source
     */
    public void setSource(java.lang.String source) {
        this.source = source;
    }


    /**
     * Gets the type value for this NotifierFilter.
     * 
     * @return type
     */
    public java.lang.String getType() {
        return type;
    }


    /**
     * Sets the type value for this NotifierFilter.
     * 
     * @param type
     */
    public void setType(java.lang.String type) {
        this.type = type;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof NotifierFilter)) return false;
        NotifierFilter other = (NotifierFilter) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.middlewareId==null && other.getMiddlewareId()==null) || 
             (this.middlewareId!=null &&
              this.middlewareId.equals(other.getMiddlewareId()))) &&
            ((this.minSeverity==null && other.getMinSeverity()==null) || 
             (this.minSeverity!=null &&
              this.minSeverity.equals(other.getMinSeverity()))) &&
            ((this.missionId==null && other.getMissionId()==null) || 
             (this.missionId!=null &&
              this.missionId.equals(other.getMissionId()))) &&
            ((this.source==null && other.getSource()==null) || 
             (this.source!=null &&
              this.source.equals(other.getSource()))) &&
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
        if (getMiddlewareId() != null) {
            _hashCode += getMiddlewareId().hashCode();
        }
        if (getMinSeverity() != null) {
            _hashCode += getMinSeverity().hashCode();
        }
        if (getMissionId() != null) {
            _hashCode += getMissionId().hashCode();
        }
        if (getSource() != null) {
            _hashCode += getSource().hashCode();
        }
        if (getType() != null) {
            _hashCode += getType().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(NotifierFilter.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/provider/21.x", "notifierFilter"));
        org.apache.axis.description.AttributeDesc attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("middlewareId");
        attrField.setXmlName(new javax.xml.namespace.QName("", "middlewareId"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("minSeverity");
        attrField.setXmlName(new javax.xml.namespace.QName("", "minSeverity"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/provider/21.x", "severity"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("missionId");
        attrField.setXmlName(new javax.xml.namespace.QName("", "missionId"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("source");
        attrField.setXmlName(new javax.xml.namespace.QName("", "source"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("type");
        attrField.setXmlName(new javax.xml.namespace.QName("", "type"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
