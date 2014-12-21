/**
 * SimpleCircularZone.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.sensor.client._15_x;

public class SimpleCircularZone  extends lu.hitec.pss.soap.sensor.client._15_x.AbstractCircularZone  implements java.io.Serializable {
    private lu.hitec.pss.soap.sensor.client._15_x.Point center;

    private double radiusInMeters;

    public SimpleCircularZone() {
    }

    public SimpleCircularZone(
           lu.hitec.pss.soap.sensor.client._15_x.Point center,
           double radiusInMeters) {
        this.center = center;
        this.radiusInMeters = radiusInMeters;
    }


    /**
     * Gets the center value for this SimpleCircularZone.
     * 
     * @return center
     */
    public lu.hitec.pss.soap.sensor.client._15_x.Point getCenter() {
        return center;
    }


    /**
     * Sets the center value for this SimpleCircularZone.
     * 
     * @param center
     */
    public void setCenter(lu.hitec.pss.soap.sensor.client._15_x.Point center) {
        this.center = center;
    }


    /**
     * Gets the radiusInMeters value for this SimpleCircularZone.
     * 
     * @return radiusInMeters
     */
    public double getRadiusInMeters() {
        return radiusInMeters;
    }


    /**
     * Sets the radiusInMeters value for this SimpleCircularZone.
     * 
     * @param radiusInMeters
     */
    public void setRadiusInMeters(double radiusInMeters) {
        this.radiusInMeters = radiusInMeters;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof SimpleCircularZone)) return false;
        SimpleCircularZone other = (SimpleCircularZone) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = super.equals(obj) && 
            ((this.center==null && other.getCenter()==null) || 
             (this.center!=null &&
              this.center.equals(other.getCenter()))) &&
            this.radiusInMeters == other.getRadiusInMeters();
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = super.hashCode();
        if (getCenter() != null) {
            _hashCode += getCenter().hashCode();
        }
        _hashCode += new Double(getRadiusInMeters()).hashCode();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(SimpleCircularZone.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "simpleCircularZone"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("center");
        elemField.setXmlName(new javax.xml.namespace.QName("", "center"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/sensor/client/15.x", "point"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("radiusInMeters");
        elemField.setXmlName(new javax.xml.namespace.QName("", "radiusInMeters"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "double"));
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
