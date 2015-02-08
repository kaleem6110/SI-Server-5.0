/**
 * PssuUnitLight.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.ds.out._15_x;

public class PssuUnitLight  implements java.io.Serializable {
    private lu.hitec.pss.soap.ds.out._15_x.UnitId unitId;

    private java.lang.String displayName;  // attribute

    private java.lang.String type;  // attribute

    public PssuUnitLight() {
    }

    public PssuUnitLight(
           lu.hitec.pss.soap.ds.out._15_x.UnitId unitId,
           java.lang.String displayName,
           java.lang.String type) {
           this.unitId = unitId;
           this.displayName = displayName;
           this.type = type;
    }


    /**
     * Gets the unitId value for this PssuUnitLight.
     * 
     * @return unitId
     */
    public lu.hitec.pss.soap.ds.out._15_x.UnitId getUnitId() {
        return unitId;
    }


    /**
     * Sets the unitId value for this PssuUnitLight.
     * 
     * @param unitId
     */
    public void setUnitId(lu.hitec.pss.soap.ds.out._15_x.UnitId unitId) {
        this.unitId = unitId;
    }


    /**
     * Gets the displayName value for this PssuUnitLight.
     * 
     * @return displayName
     */
    public java.lang.String getDisplayName() {
        return displayName;
    }


    /**
     * Sets the displayName value for this PssuUnitLight.
     * 
     * @param displayName
     */
    public void setDisplayName(java.lang.String displayName) {
        this.displayName = displayName;
    }


    /**
     * Gets the type value for this PssuUnitLight.
     * 
     * @return type
     */
    public java.lang.String getType() {
        return type;
    }


    /**
     * Sets the type value for this PssuUnitLight.
     * 
     * @param type
     */
    public void setType(java.lang.String type) {
        this.type = type;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof PssuUnitLight)) return false;
        PssuUnitLight other = (PssuUnitLight) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.unitId==null && other.getUnitId()==null) || 
             (this.unitId!=null &&
              this.unitId.equals(other.getUnitId()))) &&
            ((this.displayName==null && other.getDisplayName()==null) || 
             (this.displayName!=null &&
              this.displayName.equals(other.getDisplayName()))) &&
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
        if (getUnitId() != null) {
            _hashCode += getUnitId().hashCode();
        }
        if (getDisplayName() != null) {
            _hashCode += getDisplayName().hashCode();
        }
        if (getType() != null) {
            _hashCode += getType().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(PssuUnitLight.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/out/15.x", "pssuUnitLight"));
        org.apache.axis.description.AttributeDesc attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("displayName");
        attrField.setXmlName(new javax.xml.namespace.QName("", "displayName"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("type");
        attrField.setXmlName(new javax.xml.namespace.QName("", "type"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("unitId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "unitId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/out/15.x", "unitId"));
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
