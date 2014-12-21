/**
 * Event.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.client._25_x;

public class Event  implements java.io.Serializable {
    private lu.hitec.pss.soap.event.client._25_x.Desc desc;

    private lu.hitec.pss.soap.event.client._25_x.DtoDomain dtoDomain;

    private lu.hitec.pss.soap.event.client._25_x.RelatedInfo relatedInfo;

    private lu.hitec.pss.soap.event.client._25_x.Location location;

    private lu.hitec.pss.soap.event.client._25_x.Logbook logbook;

    private lu.hitec.pss.soap.event.client._25_x.NotificationsProcessingEventStatus notificationsProcessingEventStatus;

    private lu.hitec.pss.soap.event.client._25_x.Recipient recipient;

    private java.util.Calendar date;  // attribute

    private java.lang.String ref;  // attribute

    private lu.hitec.pss.soap.event.client._25_x.Status status;  // attribute

    private lu.hitec.pss.soap.event.client._25_x.Severity severity;  // attribute

    private java.lang.String src;  // attribute

    private java.lang.String type;  // attribute

    public Event() {
    }

    public Event(
           lu.hitec.pss.soap.event.client._25_x.Desc desc,
           lu.hitec.pss.soap.event.client._25_x.DtoDomain dtoDomain,
           lu.hitec.pss.soap.event.client._25_x.RelatedInfo relatedInfo,
           lu.hitec.pss.soap.event.client._25_x.Location location,
           lu.hitec.pss.soap.event.client._25_x.Logbook logbook,
           lu.hitec.pss.soap.event.client._25_x.NotificationsProcessingEventStatus notificationsProcessingEventStatus,
           lu.hitec.pss.soap.event.client._25_x.Recipient recipient,
           java.util.Calendar date,
           java.lang.String ref,
           lu.hitec.pss.soap.event.client._25_x.Status status,
           lu.hitec.pss.soap.event.client._25_x.Severity severity,
           java.lang.String src,
           java.lang.String type) {
           this.desc = desc;
           this.dtoDomain = dtoDomain;
           this.relatedInfo = relatedInfo;
           this.location = location;
           this.logbook = logbook;
           this.notificationsProcessingEventStatus = notificationsProcessingEventStatus;
           this.recipient = recipient;
           this.date = date;
           this.ref = ref;
           this.status = status;
           this.severity = severity;
           this.src = src;
           this.type = type;
    }


    /**
     * Gets the desc value for this Event.
     * 
     * @return desc
     */
    public lu.hitec.pss.soap.event.client._25_x.Desc getDesc() {
        return desc;
    }


    /**
     * Sets the desc value for this Event.
     * 
     * @param desc
     */
    public void setDesc(lu.hitec.pss.soap.event.client._25_x.Desc desc) {
        this.desc = desc;
    }


    /**
     * Gets the dtoDomain value for this Event.
     * 
     * @return dtoDomain
     */
    public lu.hitec.pss.soap.event.client._25_x.DtoDomain getDtoDomain() {
        return dtoDomain;
    }


    /**
     * Sets the dtoDomain value for this Event.
     * 
     * @param dtoDomain
     */
    public void setDtoDomain(lu.hitec.pss.soap.event.client._25_x.DtoDomain dtoDomain) {
        this.dtoDomain = dtoDomain;
    }


    /**
     * Gets the relatedInfo value for this Event.
     * 
     * @return relatedInfo
     */
    public lu.hitec.pss.soap.event.client._25_x.RelatedInfo getRelatedInfo() {
        return relatedInfo;
    }


    /**
     * Sets the relatedInfo value for this Event.
     * 
     * @param relatedInfo
     */
    public void setRelatedInfo(lu.hitec.pss.soap.event.client._25_x.RelatedInfo relatedInfo) {
        this.relatedInfo = relatedInfo;
    }


    /**
     * Gets the location value for this Event.
     * 
     * @return location
     */
    public lu.hitec.pss.soap.event.client._25_x.Location getLocation() {
        return location;
    }


    /**
     * Sets the location value for this Event.
     * 
     * @param location
     */
    public void setLocation(lu.hitec.pss.soap.event.client._25_x.Location location) {
        this.location = location;
    }


    /**
     * Gets the logbook value for this Event.
     * 
     * @return logbook
     */
    public lu.hitec.pss.soap.event.client._25_x.Logbook getLogbook() {
        return logbook;
    }


    /**
     * Sets the logbook value for this Event.
     * 
     * @param logbook
     */
    public void setLogbook(lu.hitec.pss.soap.event.client._25_x.Logbook logbook) {
        this.logbook = logbook;
    }


    /**
     * Gets the notificationsProcessingEventStatus value for this Event.
     * 
     * @return notificationsProcessingEventStatus
     */
    public lu.hitec.pss.soap.event.client._25_x.NotificationsProcessingEventStatus getNotificationsProcessingEventStatus() {
        return notificationsProcessingEventStatus;
    }


    /**
     * Sets the notificationsProcessingEventStatus value for this Event.
     * 
     * @param notificationsProcessingEventStatus
     */
    public void setNotificationsProcessingEventStatus(lu.hitec.pss.soap.event.client._25_x.NotificationsProcessingEventStatus notificationsProcessingEventStatus) {
        this.notificationsProcessingEventStatus = notificationsProcessingEventStatus;
    }


    /**
     * Gets the recipient value for this Event.
     * 
     * @return recipient
     */
    public lu.hitec.pss.soap.event.client._25_x.Recipient getRecipient() {
        return recipient;
    }


    /**
     * Sets the recipient value for this Event.
     * 
     * @param recipient
     */
    public void setRecipient(lu.hitec.pss.soap.event.client._25_x.Recipient recipient) {
        this.recipient = recipient;
    }


    /**
     * Gets the date value for this Event.
     * 
     * @return date
     */
    public java.util.Calendar getDate() {
        return date;
    }


    /**
     * Sets the date value for this Event.
     * 
     * @param date
     */
    public void setDate(java.util.Calendar date) {
        this.date = date;
    }


    /**
     * Gets the ref value for this Event.
     * 
     * @return ref
     */
    public java.lang.String getRef() {
        return ref;
    }


    /**
     * Sets the ref value for this Event.
     * 
     * @param ref
     */
    public void setRef(java.lang.String ref) {
        this.ref = ref;
    }


    /**
     * Gets the status value for this Event.
     * 
     * @return status
     */
    public lu.hitec.pss.soap.event.client._25_x.Status getStatus() {
        return status;
    }


    /**
     * Sets the status value for this Event.
     * 
     * @param status
     */
    public void setStatus(lu.hitec.pss.soap.event.client._25_x.Status status) {
        this.status = status;
    }


    /**
     * Gets the severity value for this Event.
     * 
     * @return severity
     */
    public lu.hitec.pss.soap.event.client._25_x.Severity getSeverity() {
        return severity;
    }


    /**
     * Sets the severity value for this Event.
     * 
     * @param severity
     */
    public void setSeverity(lu.hitec.pss.soap.event.client._25_x.Severity severity) {
        this.severity = severity;
    }


    /**
     * Gets the src value for this Event.
     * 
     * @return src
     */
    public java.lang.String getSrc() {
        return src;
    }


    /**
     * Sets the src value for this Event.
     * 
     * @param src
     */
    public void setSrc(java.lang.String src) {
        this.src = src;
    }


    /**
     * Gets the type value for this Event.
     * 
     * @return type
     */
    public java.lang.String getType() {
        return type;
    }


    /**
     * Sets the type value for this Event.
     * 
     * @param type
     */
    public void setType(java.lang.String type) {
        this.type = type;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Event)) return false;
        Event other = (Event) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.desc==null && other.getDesc()==null) || 
             (this.desc!=null &&
              this.desc.equals(other.getDesc()))) &&
            ((this.dtoDomain==null && other.getDtoDomain()==null) || 
             (this.dtoDomain!=null &&
              this.dtoDomain.equals(other.getDtoDomain()))) &&
            ((this.relatedInfo==null && other.getRelatedInfo()==null) || 
             (this.relatedInfo!=null &&
              this.relatedInfo.equals(other.getRelatedInfo()))) &&
            ((this.location==null && other.getLocation()==null) || 
             (this.location!=null &&
              this.location.equals(other.getLocation()))) &&
            ((this.logbook==null && other.getLogbook()==null) || 
             (this.logbook!=null &&
              this.logbook.equals(other.getLogbook()))) &&
            ((this.notificationsProcessingEventStatus==null && other.getNotificationsProcessingEventStatus()==null) || 
             (this.notificationsProcessingEventStatus!=null &&
              this.notificationsProcessingEventStatus.equals(other.getNotificationsProcessingEventStatus()))) &&
            ((this.recipient==null && other.getRecipient()==null) || 
             (this.recipient!=null &&
              this.recipient.equals(other.getRecipient()))) &&
            ((this.date==null && other.getDate()==null) || 
             (this.date!=null &&
              this.date.equals(other.getDate()))) &&
            ((this.ref==null && other.getRef()==null) || 
             (this.ref!=null &&
              this.ref.equals(other.getRef()))) &&
            ((this.status==null && other.getStatus()==null) || 
             (this.status!=null &&
              this.status.equals(other.getStatus()))) &&
            ((this.severity==null && other.getSeverity()==null) || 
             (this.severity!=null &&
              this.severity.equals(other.getSeverity()))) &&
            ((this.src==null && other.getSrc()==null) || 
             (this.src!=null &&
              this.src.equals(other.getSrc()))) &&
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
        if (getDesc() != null) {
            _hashCode += getDesc().hashCode();
        }
        if (getDtoDomain() != null) {
            _hashCode += getDtoDomain().hashCode();
        }
        if (getRelatedInfo() != null) {
            _hashCode += getRelatedInfo().hashCode();
        }
        if (getLocation() != null) {
            _hashCode += getLocation().hashCode();
        }
        if (getLogbook() != null) {
            _hashCode += getLogbook().hashCode();
        }
        if (getNotificationsProcessingEventStatus() != null) {
            _hashCode += getNotificationsProcessingEventStatus().hashCode();
        }
        if (getRecipient() != null) {
            _hashCode += getRecipient().hashCode();
        }
        if (getDate() != null) {
            _hashCode += getDate().hashCode();
        }
        if (getRef() != null) {
            _hashCode += getRef().hashCode();
        }
        if (getStatus() != null) {
            _hashCode += getStatus().hashCode();
        }
        if (getSeverity() != null) {
            _hashCode += getSeverity().hashCode();
        }
        if (getSrc() != null) {
            _hashCode += getSrc().hashCode();
        }
        if (getType() != null) {
            _hashCode += getType().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Event.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "event"));
        org.apache.axis.description.AttributeDesc attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("date");
        attrField.setXmlName(new javax.xml.namespace.QName("", "date"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("ref");
        attrField.setXmlName(new javax.xml.namespace.QName("", "ref"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("status");
        attrField.setXmlName(new javax.xml.namespace.QName("", "status"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "status"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("severity");
        attrField.setXmlName(new javax.xml.namespace.QName("", "severity"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "severity"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("src");
        attrField.setXmlName(new javax.xml.namespace.QName("", "src"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("type");
        attrField.setXmlName(new javax.xml.namespace.QName("", "type"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("desc");
        elemField.setXmlName(new javax.xml.namespace.QName("", "desc"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "desc"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("dtoDomain");
        elemField.setXmlName(new javax.xml.namespace.QName("", "dtoDomain"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "dtoDomain"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("relatedInfo");
        elemField.setXmlName(new javax.xml.namespace.QName("", "relatedInfo"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "relatedInfo"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("location");
        elemField.setXmlName(new javax.xml.namespace.QName("", "location"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "location"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("logbook");
        elemField.setXmlName(new javax.xml.namespace.QName("", "logbook"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "logbook"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("notificationsProcessingEventStatus");
        elemField.setXmlName(new javax.xml.namespace.QName("", "notificationsProcessingEventStatus"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "notificationsProcessingEventStatus"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("recipient");
        elemField.setXmlName(new javax.xml.namespace.QName("", "recipient"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "recipient"));
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
