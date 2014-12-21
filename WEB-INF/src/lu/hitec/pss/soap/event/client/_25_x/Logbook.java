/**
 * Logbook.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.client._25_x;

public class Logbook  implements java.io.Serializable {
    private java.lang.String format;  // attribute

    private java.lang.String fromToWithWho;  // attribute

    private java.lang.String inInd;  // attribute

    private java.lang.String localClientTimeZone;  // attribute

    private java.lang.String outInd;  // attribute

    public Logbook() {
    }

    public Logbook(
           java.lang.String format,
           java.lang.String fromToWithWho,
           java.lang.String inInd,
           java.lang.String localClientTimeZone,
           java.lang.String outInd) {
           this.format = format;
           this.fromToWithWho = fromToWithWho;
           this.inInd = inInd;
           this.localClientTimeZone = localClientTimeZone;
           this.outInd = outInd;
    }


    /**
     * Gets the format value for this Logbook.
     * 
     * @return format
     */
    public java.lang.String getFormat() {
        return format;
    }


    /**
     * Sets the format value for this Logbook.
     * 
     * @param format
     */
    public void setFormat(java.lang.String format) {
        this.format = format;
    }


    /**
     * Gets the fromToWithWho value for this Logbook.
     * 
     * @return fromToWithWho
     */
    public java.lang.String getFromToWithWho() {
        return fromToWithWho;
    }


    /**
     * Sets the fromToWithWho value for this Logbook.
     * 
     * @param fromToWithWho
     */
    public void setFromToWithWho(java.lang.String fromToWithWho) {
        this.fromToWithWho = fromToWithWho;
    }


    /**
     * Gets the inInd value for this Logbook.
     * 
     * @return inInd
     */
    public java.lang.String getInInd() {
        return inInd;
    }


    /**
     * Sets the inInd value for this Logbook.
     * 
     * @param inInd
     */
    public void setInInd(java.lang.String inInd) {
        this.inInd = inInd;
    }


    /**
     * Gets the localClientTimeZone value for this Logbook.
     * 
     * @return localClientTimeZone
     */
    public java.lang.String getLocalClientTimeZone() {
        return localClientTimeZone;
    }


    /**
     * Sets the localClientTimeZone value for this Logbook.
     * 
     * @param localClientTimeZone
     */
    public void setLocalClientTimeZone(java.lang.String localClientTimeZone) {
        this.localClientTimeZone = localClientTimeZone;
    }


    /**
     * Gets the outInd value for this Logbook.
     * 
     * @return outInd
     */
    public java.lang.String getOutInd() {
        return outInd;
    }


    /**
     * Sets the outInd value for this Logbook.
     * 
     * @param outInd
     */
    public void setOutInd(java.lang.String outInd) {
        this.outInd = outInd;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Logbook)) return false;
        Logbook other = (Logbook) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.format==null && other.getFormat()==null) || 
             (this.format!=null &&
              this.format.equals(other.getFormat()))) &&
            ((this.fromToWithWho==null && other.getFromToWithWho()==null) || 
             (this.fromToWithWho!=null &&
              this.fromToWithWho.equals(other.getFromToWithWho()))) &&
            ((this.inInd==null && other.getInInd()==null) || 
             (this.inInd!=null &&
              this.inInd.equals(other.getInInd()))) &&
            ((this.localClientTimeZone==null && other.getLocalClientTimeZone()==null) || 
             (this.localClientTimeZone!=null &&
              this.localClientTimeZone.equals(other.getLocalClientTimeZone()))) &&
            ((this.outInd==null && other.getOutInd()==null) || 
             (this.outInd!=null &&
              this.outInd.equals(other.getOutInd())));
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
        if (getFormat() != null) {
            _hashCode += getFormat().hashCode();
        }
        if (getFromToWithWho() != null) {
            _hashCode += getFromToWithWho().hashCode();
        }
        if (getInInd() != null) {
            _hashCode += getInInd().hashCode();
        }
        if (getLocalClientTimeZone() != null) {
            _hashCode += getLocalClientTimeZone().hashCode();
        }
        if (getOutInd() != null) {
            _hashCode += getOutInd().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Logbook.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "logbook"));
        org.apache.axis.description.AttributeDesc attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("format");
        attrField.setXmlName(new javax.xml.namespace.QName("", "format"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("fromToWithWho");
        attrField.setXmlName(new javax.xml.namespace.QName("", "fromToWithWho"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("inInd");
        attrField.setXmlName(new javax.xml.namespace.QName("", "inInd"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("localClientTimeZone");
        attrField.setXmlName(new javax.xml.namespace.QName("", "localClientTimeZone"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("outInd");
        attrField.setXmlName(new javax.xml.namespace.QName("", "outInd"));
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
