/**
 * Notifier.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.client._25_x;

public class Notifier  implements java.io.Serializable {
    private lu.hitec.pss.soap.event.client._25_x.NotifierFilter filter;

    private boolean havingNotifyRelatedUser;

    private lu.hitec.pss.soap.event.client._25_x.NotifierPropertyMapEntry[] properties;

    private lu.hitec.pss.soap.event.client._25_x.NotifierRecipient[] recipients;

    private long id;  // attribute

    private java.lang.String name;  // attribute

    private lu.hitec.pss.soap.event.client._25_x.NotifierTypeEnum type;  // attribute

    public Notifier() {
    }

    public Notifier(
           lu.hitec.pss.soap.event.client._25_x.NotifierFilter filter,
           boolean havingNotifyRelatedUser,
           lu.hitec.pss.soap.event.client._25_x.NotifierPropertyMapEntry[] properties,
           lu.hitec.pss.soap.event.client._25_x.NotifierRecipient[] recipients,
           long id,
           java.lang.String name,
           lu.hitec.pss.soap.event.client._25_x.NotifierTypeEnum type) {
           this.filter = filter;
           this.havingNotifyRelatedUser = havingNotifyRelatedUser;
           this.properties = properties;
           this.recipients = recipients;
           this.id = id;
           this.name = name;
           this.type = type;
    }


    /**
     * Gets the filter value for this Notifier.
     * 
     * @return filter
     */
    public lu.hitec.pss.soap.event.client._25_x.NotifierFilter getFilter() {
        return filter;
    }


    /**
     * Sets the filter value for this Notifier.
     * 
     * @param filter
     */
    public void setFilter(lu.hitec.pss.soap.event.client._25_x.NotifierFilter filter) {
        this.filter = filter;
    }


    /**
     * Gets the havingNotifyRelatedUser value for this Notifier.
     * 
     * @return havingNotifyRelatedUser
     */
    public boolean isHavingNotifyRelatedUser() {
        return havingNotifyRelatedUser;
    }


    /**
     * Sets the havingNotifyRelatedUser value for this Notifier.
     * 
     * @param havingNotifyRelatedUser
     */
    public void setHavingNotifyRelatedUser(boolean havingNotifyRelatedUser) {
        this.havingNotifyRelatedUser = havingNotifyRelatedUser;
    }


    /**
     * Gets the properties value for this Notifier.
     * 
     * @return properties
     */
    public lu.hitec.pss.soap.event.client._25_x.NotifierPropertyMapEntry[] getProperties() {
        return properties;
    }


    /**
     * Sets the properties value for this Notifier.
     * 
     * @param properties
     */
    public void setProperties(lu.hitec.pss.soap.event.client._25_x.NotifierPropertyMapEntry[] properties) {
        this.properties = properties;
    }


    /**
     * Gets the recipients value for this Notifier.
     * 
     * @return recipients
     */
    public lu.hitec.pss.soap.event.client._25_x.NotifierRecipient[] getRecipients() {
        return recipients;
    }


    /**
     * Sets the recipients value for this Notifier.
     * 
     * @param recipients
     */
    public void setRecipients(lu.hitec.pss.soap.event.client._25_x.NotifierRecipient[] recipients) {
        this.recipients = recipients;
    }

    public lu.hitec.pss.soap.event.client._25_x.NotifierRecipient getRecipients(int i) {
        return this.recipients[i];
    }

    public void setRecipients(int i, lu.hitec.pss.soap.event.client._25_x.NotifierRecipient _value) {
        this.recipients[i] = _value;
    }


    /**
     * Gets the id value for this Notifier.
     * 
     * @return id
     */
    public long getId() {
        return id;
    }


    /**
     * Sets the id value for this Notifier.
     * 
     * @param id
     */
    public void setId(long id) {
        this.id = id;
    }


    /**
     * Gets the name value for this Notifier.
     * 
     * @return name
     */
    public java.lang.String getName() {
        return name;
    }


    /**
     * Sets the name value for this Notifier.
     * 
     * @param name
     */
    public void setName(java.lang.String name) {
        this.name = name;
    }


    /**
     * Gets the type value for this Notifier.
     * 
     * @return type
     */
    public lu.hitec.pss.soap.event.client._25_x.NotifierTypeEnum getType() {
        return type;
    }


    /**
     * Sets the type value for this Notifier.
     * 
     * @param type
     */
    public void setType(lu.hitec.pss.soap.event.client._25_x.NotifierTypeEnum type) {
        this.type = type;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Notifier)) return false;
        Notifier other = (Notifier) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.filter==null && other.getFilter()==null) || 
             (this.filter!=null &&
              this.filter.equals(other.getFilter()))) &&
            this.havingNotifyRelatedUser == other.isHavingNotifyRelatedUser() &&
            ((this.properties==null && other.getProperties()==null) || 
             (this.properties!=null &&
              java.util.Arrays.equals(this.properties, other.getProperties()))) &&
            ((this.recipients==null && other.getRecipients()==null) || 
             (this.recipients!=null &&
              java.util.Arrays.equals(this.recipients, other.getRecipients()))) &&
            this.id == other.getId() &&
            ((this.name==null && other.getName()==null) || 
             (this.name!=null &&
              this.name.equals(other.getName()))) &&
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
        if (getFilter() != null) {
            _hashCode += getFilter().hashCode();
        }
        _hashCode += (isHavingNotifyRelatedUser() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        if (getProperties() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getProperties());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getProperties(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getRecipients() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getRecipients());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getRecipients(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        _hashCode += new Long(getId()).hashCode();
        if (getName() != null) {
            _hashCode += getName().hashCode();
        }
        if (getType() != null) {
            _hashCode += getType().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Notifier.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifier"));
        org.apache.axis.description.AttributeDesc attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("id");
        attrField.setXmlName(new javax.xml.namespace.QName("", "id"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "long"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("name");
        attrField.setXmlName(new javax.xml.namespace.QName("", "name"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("type");
        attrField.setXmlName(new javax.xml.namespace.QName("", "type"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierTypeEnum"));
        typeDesc.addFieldDesc(attrField);
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("filter");
        elemField.setXmlName(new javax.xml.namespace.QName("", "filter"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierFilter"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("havingNotifyRelatedUser");
        elemField.setXmlName(new javax.xml.namespace.QName("", "havingNotifyRelatedUser"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("properties");
        elemField.setXmlName(new javax.xml.namespace.QName("", "properties"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierPropertyMapEntry"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setItemQName(new javax.xml.namespace.QName("", "entry"));
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("recipients");
        elemField.setXmlName(new javax.xml.namespace.QName("", "recipients"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notifierRecipient"));
        elemField.setMinOccurs(0);
        elemField.setNillable(true);
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
