/**
 * LocationValue.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class LocationValue  implements java.io.Serializable {
    private double accuracyInMeters;  // attribute

    private double alt;  // attribute

    private lu.hitec.pss.soap.sensor.client._15_x.LocationStatus geoFencingStatus;  // attribute

    private double hdg;  // attribute

    private double lat;  // attribute

    private double lng;  // attribute

    private boolean pending;  // attribute

    private double spd;  // attribute

    private java.util.Calendar time;  // attribute

    public LocationValue() {
    }

    public LocationValue(
           double accuracyInMeters,
           double alt,
           lu.hitec.pss.soap.sensor.client._15_x.LocationStatus geoFencingStatus,
           double hdg,
           double lat,
           double lng,
           boolean pending,
           double spd,
           java.util.Calendar time) {
           this.accuracyInMeters = accuracyInMeters;
           this.alt = alt;
           this.geoFencingStatus = geoFencingStatus;
           this.hdg = hdg;
           this.lat = lat;
           this.lng = lng;
           this.pending = pending;
           this.spd = spd;
           this.time = time;
    }


    /**
     * Gets the accuracyInMeters value for this LocationValue.
     * 
     * @return accuracyInMeters
     */
    public double getAccuracyInMeters() {
        return accuracyInMeters;
    }


    /**
     * Sets the accuracyInMeters value for this LocationValue.
     * 
     * @param accuracyInMeters
     */
    public void setAccuracyInMeters(double accuracyInMeters) {
        this.accuracyInMeters = accuracyInMeters;
    }


    /**
     * Gets the alt value for this LocationValue.
     * 
     * @return alt
     */
    public double getAlt() {
        return alt;
    }


    /**
     * Sets the alt value for this LocationValue.
     * 
     * @param alt
     */
    public void setAlt(double alt) {
        this.alt = alt;
    }


    /**
     * Gets the geoFencingStatus value for this LocationValue.
     * 
     * @return geoFencingStatus
     */
    public lu.hitec.pss.soap.sensor.client._15_x.LocationStatus getGeoFencingStatus() {
        return geoFencingStatus;
    }


    /**
     * Sets the geoFencingStatus value for this LocationValue.
     * 
     * @param geoFencingStatus
     */
    public void setGeoFencingStatus(lu.hitec.pss.soap.sensor.client._15_x.LocationStatus geoFencingStatus) {
        this.geoFencingStatus = geoFencingStatus;
    }


    /**
     * Gets the hdg value for this LocationValue.
     * 
     * @return hdg
     */
    public double getHdg() {
        return hdg;
    }


    /**
     * Sets the hdg value for this LocationValue.
     * 
     * @param hdg
     */
    public void setHdg(double hdg) {
        this.hdg = hdg;
    }


    /**
     * Gets the lat value for this LocationValue.
     * 
     * @return lat
     */
    public double getLat() {
        return lat;
    }


    /**
     * Sets the lat value for this LocationValue.
     * 
     * @param lat
     */
    public void setLat(double lat) {
        this.lat = lat;
    }


    /**
     * Gets the lng value for this LocationValue.
     * 
     * @return lng
     */
    public double getLng() {
        return lng;
    }


    /**
     * Sets the lng value for this LocationValue.
     * 
     * @param lng
     */
    public void setLng(double lng) {
        this.lng = lng;
    }


    /**
     * Gets the pending value for this LocationValue.
     * 
     * @return pending
     */
    public boolean isPending() {
        return pending;
    }


    /**
     * Sets the pending value for this LocationValue.
     * 
     * @param pending
     */
    public void setPending(boolean pending) {
        this.pending = pending;
    }


    /**
     * Gets the spd value for this LocationValue.
     * 
     * @return spd
     */
    public double getSpd() {
        return spd;
    }


    /**
     * Sets the spd value for this LocationValue.
     * 
     * @param spd
     */
    public void setSpd(double spd) {
        this.spd = spd;
    }


    /**
     * Gets the time value for this LocationValue.
     * 
     * @return time
     */
    public java.util.Calendar getTime() {
        return time;
    }


    /**
     * Sets the time value for this LocationValue.
     * 
     * @param time
     */
    public void setTime(java.util.Calendar time) {
        this.time = time;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof LocationValue)) return false;
        LocationValue other = (LocationValue) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            this.accuracyInMeters == other.getAccuracyInMeters() &&
            this.alt == other.getAlt() &&
            ((this.geoFencingStatus==null && other.getGeoFencingStatus()==null) || 
             (this.geoFencingStatus!=null &&
              this.geoFencingStatus.equals(other.getGeoFencingStatus()))) &&
            this.hdg == other.getHdg() &&
            this.lat == other.getLat() &&
            this.lng == other.getLng() &&
            this.pending == other.isPending() &&
            this.spd == other.getSpd() &&
            ((this.time==null && other.getTime()==null) || 
             (this.time!=null &&
              this.time.equals(other.getTime())));
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
        _hashCode += new Double(getAccuracyInMeters()).hashCode();
        _hashCode += new Double(getAlt()).hashCode();
        if (getGeoFencingStatus() != null) {
            _hashCode += getGeoFencingStatus().hashCode();
        }
        _hashCode += new Double(getHdg()).hashCode();
        _hashCode += new Double(getLat()).hashCode();
        _hashCode += new Double(getLng()).hashCode();
        _hashCode += (isPending() ? Boolean.TRUE : Boolean.FALSE).hashCode();
        _hashCode += new Double(getSpd()).hashCode();
        if (getTime() != null) {
            _hashCode += getTime().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(LocationValue.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationValue"));
        org.apache.axis.description.AttributeDesc attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("accuracyInMeters");
        attrField.setXmlName(new javax.xml.namespace.QName("", "accuracyInMeters"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("alt");
        attrField.setXmlName(new javax.xml.namespace.QName("", "alt"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("geoFencingStatus");
        attrField.setXmlName(new javax.xml.namespace.QName("", "geoFencingStatus"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "locationStatus"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("hdg");
        attrField.setXmlName(new javax.xml.namespace.QName("", "hdg"));
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
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("pending");
        attrField.setXmlName(new javax.xml.namespace.QName("", "pending"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("spd");
        attrField.setXmlName(new javax.xml.namespace.QName("", "spd"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("time");
        attrField.setXmlName(new javax.xml.namespace.QName("", "time"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
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
