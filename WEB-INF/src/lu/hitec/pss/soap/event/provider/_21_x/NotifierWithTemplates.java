/**
 * NotifierWithTemplates.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.provider._21_x;

public class NotifierWithTemplates  implements java.io.Serializable {
    private java.lang.String bodyTemplate;

    private lu.hitec.pss.soap.event.provider._21_x.Notifier notifier;

    private java.lang.String subjectTemplate;

    public NotifierWithTemplates() {
    }

    public NotifierWithTemplates(
           java.lang.String bodyTemplate,
           lu.hitec.pss.soap.event.provider._21_x.Notifier notifier,
           java.lang.String subjectTemplate) {
           this.bodyTemplate = bodyTemplate;
           this.notifier = notifier;
           this.subjectTemplate = subjectTemplate;
    }


    /**
     * Gets the bodyTemplate value for this NotifierWithTemplates.
     * 
     * @return bodyTemplate
     */
    public java.lang.String getBodyTemplate() {
        return bodyTemplate;
    }


    /**
     * Sets the bodyTemplate value for this NotifierWithTemplates.
     * 
     * @param bodyTemplate
     */
    public void setBodyTemplate(java.lang.String bodyTemplate) {
        this.bodyTemplate = bodyTemplate;
    }


    /**
     * Gets the notifier value for this NotifierWithTemplates.
     * 
     * @return notifier
     */
    public lu.hitec.pss.soap.event.provider._21_x.Notifier getNotifier() {
        return notifier;
    }


    /**
     * Sets the notifier value for this NotifierWithTemplates.
     * 
     * @param notifier
     */
    public void setNotifier(lu.hitec.pss.soap.event.provider._21_x.Notifier notifier) {
        this.notifier = notifier;
    }


    /**
     * Gets the subjectTemplate value for this NotifierWithTemplates.
     * 
     * @return subjectTemplate
     */
    public java.lang.String getSubjectTemplate() {
        return subjectTemplate;
    }


    /**
     * Sets the subjectTemplate value for this NotifierWithTemplates.
     * 
     * @param subjectTemplate
     */
    public void setSubjectTemplate(java.lang.String subjectTemplate) {
        this.subjectTemplate = subjectTemplate;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof NotifierWithTemplates)) return false;
        NotifierWithTemplates other = (NotifierWithTemplates) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.bodyTemplate==null && other.getBodyTemplate()==null) || 
             (this.bodyTemplate!=null &&
              this.bodyTemplate.equals(other.getBodyTemplate()))) &&
            ((this.notifier==null && other.getNotifier()==null) || 
             (this.notifier!=null &&
              this.notifier.equals(other.getNotifier()))) &&
            ((this.subjectTemplate==null && other.getSubjectTemplate()==null) || 
             (this.subjectTemplate!=null &&
              this.subjectTemplate.equals(other.getSubjectTemplate())));
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
        if (getBodyTemplate() != null) {
            _hashCode += getBodyTemplate().hashCode();
        }
        if (getNotifier() != null) {
            _hashCode += getNotifier().hashCode();
        }
        if (getSubjectTemplate() != null) {
            _hashCode += getSubjectTemplate().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(NotifierWithTemplates.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/provider/21.x", "notifierWithTemplates"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("bodyTemplate");
        elemField.setXmlName(new javax.xml.namespace.QName("", "bodyTemplate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("notifier");
        elemField.setXmlName(new javax.xml.namespace.QName("", "notifier"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/provider/21.x", "notifier"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("subjectTemplate");
        elemField.setXmlName(new javax.xml.namespace.QName("", "subjectTemplate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
