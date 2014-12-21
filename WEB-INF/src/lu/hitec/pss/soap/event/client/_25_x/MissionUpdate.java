/**
 * MissionUpdate.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.client._25_x;

public class MissionUpdate  implements java.io.Serializable {
    private lu.hitec.pss.soap.event.client._25_x.Event[] events;

    private lu.hitec.pss.soap.event.client._25_x.MissionStatus missionStatus;

    private java.util.Calendar oldestEventTime;

    public MissionUpdate() {
    }

    public MissionUpdate(
           lu.hitec.pss.soap.event.client._25_x.Event[] events,
           lu.hitec.pss.soap.event.client._25_x.MissionStatus missionStatus,
           java.util.Calendar oldestEventTime) {
           this.events = events;
           this.missionStatus = missionStatus;
           this.oldestEventTime = oldestEventTime;
    }


    /**
     * Gets the events value for this MissionUpdate.
     * 
     * @return events
     */
    public lu.hitec.pss.soap.event.client._25_x.Event[] getEvents() {
        return events;
    }


    /**
     * Sets the events value for this MissionUpdate.
     * 
     * @param events
     */
    public void setEvents(lu.hitec.pss.soap.event.client._25_x.Event[] events) {
        this.events = events;
    }

    public lu.hitec.pss.soap.event.client._25_x.Event getEvents(int i) {
        return this.events[i];
    }

    public void setEvents(int i, lu.hitec.pss.soap.event.client._25_x.Event _value) {
        this.events[i] = _value;
    }


    /**
     * Gets the missionStatus value for this MissionUpdate.
     * 
     * @return missionStatus
     */
    public lu.hitec.pss.soap.event.client._25_x.MissionStatus getMissionStatus() {
        return missionStatus;
    }


    /**
     * Sets the missionStatus value for this MissionUpdate.
     * 
     * @param missionStatus
     */
    public void setMissionStatus(lu.hitec.pss.soap.event.client._25_x.MissionStatus missionStatus) {
        this.missionStatus = missionStatus;
    }


    /**
     * Gets the oldestEventTime value for this MissionUpdate.
     * 
     * @return oldestEventTime
     */
    public java.util.Calendar getOldestEventTime() {
        return oldestEventTime;
    }


    /**
     * Sets the oldestEventTime value for this MissionUpdate.
     * 
     * @param oldestEventTime
     */
    public void setOldestEventTime(java.util.Calendar oldestEventTime) {
        this.oldestEventTime = oldestEventTime;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof MissionUpdate)) return false;
        MissionUpdate other = (MissionUpdate) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.events==null && other.getEvents()==null) || 
             (this.events!=null &&
              java.util.Arrays.equals(this.events, other.getEvents()))) &&
            ((this.missionStatus==null && other.getMissionStatus()==null) || 
             (this.missionStatus!=null &&
              this.missionStatus.equals(other.getMissionStatus()))) &&
            ((this.oldestEventTime==null && other.getOldestEventTime()==null) || 
             (this.oldestEventTime!=null &&
              this.oldestEventTime.equals(other.getOldestEventTime())));
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
        if (getEvents() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getEvents());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getEvents(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getMissionStatus() != null) {
            _hashCode += getMissionStatus().hashCode();
        }
        if (getOldestEventTime() != null) {
            _hashCode += getOldestEventTime().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(MissionUpdate.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "missionUpdate"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("events");
        elemField.setXmlName(new javax.xml.namespace.QName("", "events"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "event"));
        elemField.setMinOccurs(0);
        elemField.setNillable(true);
        elemField.setMaxOccursUnbounded(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("missionStatus");
        elemField.setXmlName(new javax.xml.namespace.QName("", "missionStatus"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "missionStatus"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("oldestEventTime");
        elemField.setXmlName(new javax.xml.namespace.QName("", "oldestEventTime"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
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
