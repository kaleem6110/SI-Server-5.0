/**
 * StatusSummary.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.provider._21_x;

public class StatusSummary  implements java.io.Serializable {
    private java.lang.String eventRef;

    private lu.hitec.pss.soap.event.provider._21_x.NotificationStatusSummary[] notificationStatusSummaries;

    private lu.hitec.pss.soap.event.provider._21_x.NotificationsProcessingEventStatus notificationsProcessingEventStatus;

    public StatusSummary() {
    }

    public StatusSummary(
           java.lang.String eventRef,
           lu.hitec.pss.soap.event.provider._21_x.NotificationStatusSummary[] notificationStatusSummaries,
           lu.hitec.pss.soap.event.provider._21_x.NotificationsProcessingEventStatus notificationsProcessingEventStatus) {
           this.eventRef = eventRef;
           this.notificationStatusSummaries = notificationStatusSummaries;
           this.notificationsProcessingEventStatus = notificationsProcessingEventStatus;
    }


    /**
     * Gets the eventRef value for this StatusSummary.
     * 
     * @return eventRef
     */
    public java.lang.String getEventRef() {
        return eventRef;
    }


    /**
     * Sets the eventRef value for this StatusSummary.
     * 
     * @param eventRef
     */
    public void setEventRef(java.lang.String eventRef) {
        this.eventRef = eventRef;
    }


    /**
     * Gets the notificationStatusSummaries value for this StatusSummary.
     * 
     * @return notificationStatusSummaries
     */
    public lu.hitec.pss.soap.event.provider._21_x.NotificationStatusSummary[] getNotificationStatusSummaries() {
        return notificationStatusSummaries;
    }


    /**
     * Sets the notificationStatusSummaries value for this StatusSummary.
     * 
     * @param notificationStatusSummaries
     */
    public void setNotificationStatusSummaries(lu.hitec.pss.soap.event.provider._21_x.NotificationStatusSummary[] notificationStatusSummaries) {
        this.notificationStatusSummaries = notificationStatusSummaries;
    }

    public lu.hitec.pss.soap.event.provider._21_x.NotificationStatusSummary getNotificationStatusSummaries(int i) {
        return this.notificationStatusSummaries[i];
    }

    public void setNotificationStatusSummaries(int i, lu.hitec.pss.soap.event.provider._21_x.NotificationStatusSummary _value) {
        this.notificationStatusSummaries[i] = _value;
    }


    /**
     * Gets the notificationsProcessingEventStatus value for this StatusSummary.
     * 
     * @return notificationsProcessingEventStatus
     */
    public lu.hitec.pss.soap.event.provider._21_x.NotificationsProcessingEventStatus getNotificationsProcessingEventStatus() {
        return notificationsProcessingEventStatus;
    }


    /**
     * Sets the notificationsProcessingEventStatus value for this StatusSummary.
     * 
     * @param notificationsProcessingEventStatus
     */
    public void setNotificationsProcessingEventStatus(lu.hitec.pss.soap.event.provider._21_x.NotificationsProcessingEventStatus notificationsProcessingEventStatus) {
        this.notificationsProcessingEventStatus = notificationsProcessingEventStatus;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof StatusSummary)) return false;
        StatusSummary other = (StatusSummary) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.eventRef==null && other.getEventRef()==null) || 
             (this.eventRef!=null &&
              this.eventRef.equals(other.getEventRef()))) &&
            ((this.notificationStatusSummaries==null && other.getNotificationStatusSummaries()==null) || 
             (this.notificationStatusSummaries!=null &&
              java.util.Arrays.equals(this.notificationStatusSummaries, other.getNotificationStatusSummaries()))) &&
            ((this.notificationsProcessingEventStatus==null && other.getNotificationsProcessingEventStatus()==null) || 
             (this.notificationsProcessingEventStatus!=null &&
              this.notificationsProcessingEventStatus.equals(other.getNotificationsProcessingEventStatus())));
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
        if (getEventRef() != null) {
            _hashCode += getEventRef().hashCode();
        }
        if (getNotificationStatusSummaries() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getNotificationStatusSummaries());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getNotificationStatusSummaries(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getNotificationsProcessingEventStatus() != null) {
            _hashCode += getNotificationsProcessingEventStatus().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(StatusSummary.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/provider/21.x", "statusSummary"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("eventRef");
        elemField.setXmlName(new javax.xml.namespace.QName("", "eventRef"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("notificationStatusSummaries");
        elemField.setXmlName(new javax.xml.namespace.QName("", "notificationStatusSummaries"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/provider/21.x", "notificationStatusSummary"));
        elemField.setMinOccurs(0);
        elemField.setNillable(true);
        elemField.setMaxOccursUnbounded(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("notificationsProcessingEventStatus");
        elemField.setXmlName(new javax.xml.namespace.QName("", "notificationsProcessingEventStatus"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/provider/21.x", "notificationsProcessingEventStatus"));
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
