/**
 * NotificationStatusSummary.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.provider._21_x;

public class NotificationStatusSummary  implements java.io.Serializable {
    private lu.hitec.pss.soap.event.provider._21_x.NotificationStatus notificationStatus;

    private java.lang.String notifierId;

    private lu.hitec.pss.soap.event.provider._21_x.NotifierTypeEnum notifierType;

    private java.lang.String[] recipients;

    private java.lang.String responseBody;

    public NotificationStatusSummary() {
    }

    public NotificationStatusSummary(
           lu.hitec.pss.soap.event.provider._21_x.NotificationStatus notificationStatus,
           java.lang.String notifierId,
           lu.hitec.pss.soap.event.provider._21_x.NotifierTypeEnum notifierType,
           java.lang.String[] recipients,
           java.lang.String responseBody) {
           this.notificationStatus = notificationStatus;
           this.notifierId = notifierId;
           this.notifierType = notifierType;
           this.recipients = recipients;
           this.responseBody = responseBody;
    }


    /**
     * Gets the notificationStatus value for this NotificationStatusSummary.
     * 
     * @return notificationStatus
     */
    public lu.hitec.pss.soap.event.provider._21_x.NotificationStatus getNotificationStatus() {
        return notificationStatus;
    }


    /**
     * Sets the notificationStatus value for this NotificationStatusSummary.
     * 
     * @param notificationStatus
     */
    public void setNotificationStatus(lu.hitec.pss.soap.event.provider._21_x.NotificationStatus notificationStatus) {
        this.notificationStatus = notificationStatus;
    }


    /**
     * Gets the notifierId value for this NotificationStatusSummary.
     * 
     * @return notifierId
     */
    public java.lang.String getNotifierId() {
        return notifierId;
    }


    /**
     * Sets the notifierId value for this NotificationStatusSummary.
     * 
     * @param notifierId
     */
    public void setNotifierId(java.lang.String notifierId) {
        this.notifierId = notifierId;
    }


    /**
     * Gets the notifierType value for this NotificationStatusSummary.
     * 
     * @return notifierType
     */
    public lu.hitec.pss.soap.event.provider._21_x.NotifierTypeEnum getNotifierType() {
        return notifierType;
    }


    /**
     * Sets the notifierType value for this NotificationStatusSummary.
     * 
     * @param notifierType
     */
    public void setNotifierType(lu.hitec.pss.soap.event.provider._21_x.NotifierTypeEnum notifierType) {
        this.notifierType = notifierType;
    }


    /**
     * Gets the recipients value for this NotificationStatusSummary.
     * 
     * @return recipients
     */
    public java.lang.String[] getRecipients() {
        return recipients;
    }


    /**
     * Sets the recipients value for this NotificationStatusSummary.
     * 
     * @param recipients
     */
    public void setRecipients(java.lang.String[] recipients) {
        this.recipients = recipients;
    }

    public java.lang.String getRecipients(int i) {
        return this.recipients[i];
    }

    public void setRecipients(int i, java.lang.String _value) {
        this.recipients[i] = _value;
    }


    /**
     * Gets the responseBody value for this NotificationStatusSummary.
     * 
     * @return responseBody
     */
    public java.lang.String getResponseBody() {
        return responseBody;
    }


    /**
     * Sets the responseBody value for this NotificationStatusSummary.
     * 
     * @param responseBody
     */
    public void setResponseBody(java.lang.String responseBody) {
        this.responseBody = responseBody;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof NotificationStatusSummary)) return false;
        NotificationStatusSummary other = (NotificationStatusSummary) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.notificationStatus==null && other.getNotificationStatus()==null) || 
             (this.notificationStatus!=null &&
              this.notificationStatus.equals(other.getNotificationStatus()))) &&
            ((this.notifierId==null && other.getNotifierId()==null) || 
             (this.notifierId!=null &&
              this.notifierId.equals(other.getNotifierId()))) &&
            ((this.notifierType==null && other.getNotifierType()==null) || 
             (this.notifierType!=null &&
              this.notifierType.equals(other.getNotifierType()))) &&
            ((this.recipients==null && other.getRecipients()==null) || 
             (this.recipients!=null &&
              java.util.Arrays.equals(this.recipients, other.getRecipients()))) &&
            ((this.responseBody==null && other.getResponseBody()==null) || 
             (this.responseBody!=null &&
              this.responseBody.equals(other.getResponseBody())));
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
        if (getNotificationStatus() != null) {
            _hashCode += getNotificationStatus().hashCode();
        }
        if (getNotifierId() != null) {
            _hashCode += getNotifierId().hashCode();
        }
        if (getNotifierType() != null) {
            _hashCode += getNotifierType().hashCode();
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
        if (getResponseBody() != null) {
            _hashCode += getResponseBody().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(NotificationStatusSummary.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/provider/21.x", "notificationStatusSummary"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("notificationStatus");
        elemField.setXmlName(new javax.xml.namespace.QName("", "notificationStatus"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/provider/21.x", "notificationStatus"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("notifierId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "notifierId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("notifierType");
        elemField.setXmlName(new javax.xml.namespace.QName("", "notifierType"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/provider/21.x", "notifierTypeEnum"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("recipients");
        elemField.setXmlName(new javax.xml.namespace.QName("", "recipients"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(true);
        elemField.setMaxOccursUnbounded(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("responseBody");
        elemField.setXmlName(new javax.xml.namespace.QName("", "responseBody"));
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
