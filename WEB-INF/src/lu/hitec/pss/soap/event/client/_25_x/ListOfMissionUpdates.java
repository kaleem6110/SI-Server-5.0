/**
 * ListOfMissionUpdates.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.client._25_x;

public class ListOfMissionUpdates  implements java.io.Serializable {
    private java.util.Calendar latestTimestamp;

    private lu.hitec.pss.soap.event.client._25_x.MissionUpdate[] missionUpdates;

    public ListOfMissionUpdates() {
    }

    public ListOfMissionUpdates(
           java.util.Calendar latestTimestamp,
           lu.hitec.pss.soap.event.client._25_x.MissionUpdate[] missionUpdates) {
           this.latestTimestamp = latestTimestamp;
           this.missionUpdates = missionUpdates;
    }


    /**
     * Gets the latestTimestamp value for this ListOfMissionUpdates.
     * 
     * @return latestTimestamp
     */
    public java.util.Calendar getLatestTimestamp() {
        return latestTimestamp;
    }


    /**
     * Sets the latestTimestamp value for this ListOfMissionUpdates.
     * 
     * @param latestTimestamp
     */
    public void setLatestTimestamp(java.util.Calendar latestTimestamp) {
        this.latestTimestamp = latestTimestamp;
    }


    /**
     * Gets the missionUpdates value for this ListOfMissionUpdates.
     * 
     * @return missionUpdates
     */
    public lu.hitec.pss.soap.event.client._25_x.MissionUpdate[] getMissionUpdates() {
        return missionUpdates;
    }


    /**
     * Sets the missionUpdates value for this ListOfMissionUpdates.
     * 
     * @param missionUpdates
     */
    public void setMissionUpdates(lu.hitec.pss.soap.event.client._25_x.MissionUpdate[] missionUpdates) {
        this.missionUpdates = missionUpdates;
    }

    public lu.hitec.pss.soap.event.client._25_x.MissionUpdate getMissionUpdates(int i) {
        return this.missionUpdates[i];
    }

    public void setMissionUpdates(int i, lu.hitec.pss.soap.event.client._25_x.MissionUpdate _value) {
        this.missionUpdates[i] = _value;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ListOfMissionUpdates)) return false;
        ListOfMissionUpdates other = (ListOfMissionUpdates) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.latestTimestamp==null && other.getLatestTimestamp()==null) || 
             (this.latestTimestamp!=null &&
              this.latestTimestamp.equals(other.getLatestTimestamp()))) &&
            ((this.missionUpdates==null && other.getMissionUpdates()==null) || 
             (this.missionUpdates!=null &&
              java.util.Arrays.equals(this.missionUpdates, other.getMissionUpdates())));
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
        if (getLatestTimestamp() != null) {
            _hashCode += getLatestTimestamp().hashCode();
        }
        if (getMissionUpdates() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getMissionUpdates());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getMissionUpdates(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ListOfMissionUpdates.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "listOfMissionUpdates"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("latestTimestamp");
        elemField.setXmlName(new javax.xml.namespace.QName("", "latestTimestamp"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("missionUpdates");
        elemField.setXmlName(new javax.xml.namespace.QName("", "missionUpdates"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "missionUpdate"));
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
