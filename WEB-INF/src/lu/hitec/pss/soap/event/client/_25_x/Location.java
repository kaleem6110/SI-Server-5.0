/**
 * Location.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.client._25_x;

public class Location  implements java.io.Serializable {
    private double altitudeInMeters;  // attribute

    private double lat;  // attribute

    private double lng;  // attribute

    public Location() {
    }

    public Location(
           double altitudeInMeters,
           double lat,
           double lng) {
           this.altitudeInMeters = altitudeInMeters;
           this.lat = lat;
           this.lng = lng;
    }


    /**
     * Gets the altitudeInMeters value for this Location.
     * 
     * @return altitudeInMeters
     */
    public double getAltitudeInMeters() {
        return altitudeInMeters;
    }


    /**
     * Sets the altitudeInMeters value for this Location.
     * 
     * @param altitudeInMeters
     */
    public void setAltitudeInMeters(double altitudeInMeters) {
        this.altitudeInMeters = altitudeInMeters;
    }


    /**
     * Gets the lat value for this Location.
     * 
     * @return lat
     */
    public double getLat() {
        return lat;
    }


    /**
     * Sets the lat value for this Location.
     * 
     * @param lat
     */
    public void setLat(double lat) {
        this.lat = lat;
    }


    /**
     * Gets the lng value for this Location.
     * 
     * @return lng
     */
    public double getLng() {
        return lng;
    }


    /**
     * Sets the lng value for this Location.
     * 
     * @param lng
     */
    public void setLng(double lng) {
        this.lng = lng;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Location)) return false;
        Location other = (Location) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.altitudeInMeters == other.getAltitudeInMeters() &&
            this.lat == other.getLat() &&
            this.lng == other.getLng();
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
        _hashCode += new Double(getAltitudeInMeters()).hashCode();
        _hashCode += new Double(getLat()).hashCode();
        _hashCode += new Double(getLng()).hashCode();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Location.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/client/25.x", "location"));
        org.apache.axis.description.AttributeDesc attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("altitudeInMeters");
        attrField.setXmlName(new javax.xml.namespace.QName("", "altitudeInMeters"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("lat");
        attrField.setXmlName(new javax.xml.namespace.QName("", "lat"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("lng");
        attrField.setXmlName(new javax.xml.namespace.QName("", "lng"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
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
