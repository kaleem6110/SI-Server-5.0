/**
 * UnitsReports.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class UnitsReports  implements java.io.Serializable {
    private java.lang.String missionId;

    private lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] placesReports;

    private lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] usersReports;

    private lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] vehiclesReports;

    public UnitsReports() {
    }

    public UnitsReports(
           java.lang.String missionId,
           lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] placesReports,
           lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] usersReports,
           lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] vehiclesReports) {
           this.missionId = missionId;
           this.placesReports = placesReports;
           this.usersReports = usersReports;
           this.vehiclesReports = vehiclesReports;
    }


    /**
     * Gets the missionId value for this UnitsReports.
     * 
     * @return missionId
     */
    public java.lang.String getMissionId() {
        return missionId;
    }


    /**
     * Sets the missionId value for this UnitsReports.
     * 
     * @param missionId
     */
    public void setMissionId(java.lang.String missionId) {
        this.missionId = missionId;
    }


    /**
     * Gets the placesReports value for this UnitsReports.
     * 
     * @return placesReports
     */
    public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] getPlacesReports() {
        return placesReports;
    }


    /**
     * Sets the placesReports value for this UnitsReports.
     * 
     * @param placesReports
     */
    public void setPlacesReports(lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] placesReports) {
        this.placesReports = placesReports;
    }

    public lu.hitec.pss.soap.sensor.client._15_x.UnitReport getPlacesReports(int i) {
        return this.placesReports[i];
    }

    public void setPlacesReports(int i, lu.hitec.pss.soap.sensor.client._15_x.UnitReport _value) {
        this.placesReports[i] = _value;
    }


    /**
     * Gets the usersReports value for this UnitsReports.
     * 
     * @return usersReports
     */
    public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] getUsersReports() {
        return usersReports;
    }


    /**
     * Sets the usersReports value for this UnitsReports.
     * 
     * @param usersReports
     */
    public void setUsersReports(lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] usersReports) {
        this.usersReports = usersReports;
    }

    public lu.hitec.pss.soap.sensor.client._15_x.UnitReport getUsersReports(int i) {
        return this.usersReports[i];
    }

    public void setUsersReports(int i, lu.hitec.pss.soap.sensor.client._15_x.UnitReport _value) {
        this.usersReports[i] = _value;
    }


    /**
     * Gets the vehiclesReports value for this UnitsReports.
     * 
     * @return vehiclesReports
     */
    public lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] getVehiclesReports() {
        return vehiclesReports;
    }


    /**
     * Sets the vehiclesReports value for this UnitsReports.
     * 
     * @param vehiclesReports
     */
    public void setVehiclesReports(lu.hitec.pss.soap.sensor.client._15_x.UnitReport[] vehiclesReports) {
        this.vehiclesReports = vehiclesReports;
    }

    public lu.hitec.pss.soap.sensor.client._15_x.UnitReport getVehiclesReports(int i) {
        return this.vehiclesReports[i];
    }

    public void setVehiclesReports(int i, lu.hitec.pss.soap.sensor.client._15_x.UnitReport _value) {
        this.vehiclesReports[i] = _value;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof UnitsReports)) return false;
        UnitsReports other = (UnitsReports) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.missionId==null && other.getMissionId()==null) || 
             (this.missionId!=null &&
              this.missionId.equals(other.getMissionId()))) &&
            ((this.placesReports==null && other.getPlacesReports()==null) || 
             (this.placesReports!=null &&
              java.util.Arrays.equals(this.placesReports, other.getPlacesReports()))) &&
            ((this.usersReports==null && other.getUsersReports()==null) || 
             (this.usersReports!=null &&
              java.util.Arrays.equals(this.usersReports, other.getUsersReports()))) &&
            ((this.vehiclesReports==null && other.getVehiclesReports()==null) || 
             (this.vehiclesReports!=null &&
              java.util.Arrays.equals(this.vehiclesReports, other.getVehiclesReports())));
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
        if (getMissionId() != null) {
            _hashCode += getMissionId().hashCode();
        }
        if (getPlacesReports() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getPlacesReports());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getPlacesReports(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getUsersReports() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getUsersReports());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getUsersReports(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getVehiclesReports() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getVehiclesReports());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getVehiclesReports(), i);
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
        new org.apache.axis.description.TypeDesc(UnitsReports.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitsReports"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("missionId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "missionId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("placesReports");
        elemField.setXmlName(new javax.xml.namespace.QName("", "placesReports"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitReport"));
        elemField.setMinOccurs(0);
        elemField.setNillable(true);
        elemField.setMaxOccursUnbounded(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("usersReports");
        elemField.setXmlName(new javax.xml.namespace.QName("", "usersReports"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitReport"));
        elemField.setMinOccurs(0);
        elemField.setNillable(true);
        elemField.setMaxOccursUnbounded(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("vehiclesReports");
        elemField.setXmlName(new javax.xml.namespace.QName("", "vehiclesReports"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "unitReport"));
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
