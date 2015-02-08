/**
 * DtoOrganization.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.ds.in._10_x;

public class DtoOrganization  implements java.io.Serializable {
    private java.lang.String description;

    private java.lang.String displayName;

    private java.lang.Boolean hasPicture;

    private java.lang.String organizationCategoryType;

    private java.lang.String organizationType;

    private java.lang.String uniqueId;

    public DtoOrganization() {
    }

    public DtoOrganization(
           java.lang.String description,
           java.lang.String displayName,
           java.lang.Boolean hasPicture,
           java.lang.String organizationCategoryType,
           java.lang.String organizationType,
           java.lang.String uniqueId) {
           this.description = description;
           this.displayName = displayName;
           this.hasPicture = hasPicture;
           this.organizationCategoryType = organizationCategoryType;
           this.organizationType = organizationType;
           this.uniqueId = uniqueId;
    }


    /**
     * Gets the description value for this DtoOrganization.
     * 
     * @return description
     */
    public java.lang.String getDescription() {
        return description;
    }


    /**
     * Sets the description value for this DtoOrganization.
     * 
     * @param description
     */
    public void setDescription(java.lang.String description) {
        this.description = description;
    }


    /**
     * Gets the displayName value for this DtoOrganization.
     * 
     * @return displayName
     */
    public java.lang.String getDisplayName() {
        return displayName;
    }


    /**
     * Sets the displayName value for this DtoOrganization.
     * 
     * @param displayName
     */
    public void setDisplayName(java.lang.String displayName) {
        this.displayName = displayName;
    }


    /**
     * Gets the hasPicture value for this DtoOrganization.
     * 
     * @return hasPicture
     */
    public java.lang.Boolean getHasPicture() {
        return hasPicture;
    }


    /**
     * Sets the hasPicture value for this DtoOrganization.
     * 
     * @param hasPicture
     */
    public void setHasPicture(java.lang.Boolean hasPicture) {
        this.hasPicture = hasPicture;
    }


    /**
     * Gets the organizationCategoryType value for this DtoOrganization.
     * 
     * @return organizationCategoryType
     */
    public java.lang.String getOrganizationCategoryType() {
        return organizationCategoryType;
    }


    /**
     * Sets the organizationCategoryType value for this DtoOrganization.
     * 
     * @param organizationCategoryType
     */
    public void setOrganizationCategoryType(java.lang.String organizationCategoryType) {
        this.organizationCategoryType = organizationCategoryType;
    }


    /**
     * Gets the organizationType value for this DtoOrganization.
     * 
     * @return organizationType
     */
    public java.lang.String getOrganizationType() {
        return organizationType;
    }


    /**
     * Sets the organizationType value for this DtoOrganization.
     * 
     * @param organizationType
     */
    public void setOrganizationType(java.lang.String organizationType) {
        this.organizationType = organizationType;
    }


    /**
     * Gets the uniqueId value for this DtoOrganization.
     * 
     * @return uniqueId
     */
    public java.lang.String getUniqueId() {
        return uniqueId;
    }


    /**
     * Sets the uniqueId value for this DtoOrganization.
     * 
     * @param uniqueId
     */
    public void setUniqueId(java.lang.String uniqueId) {
        this.uniqueId = uniqueId;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof DtoOrganization)) return false;
        DtoOrganization other = (DtoOrganization) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.description==null && other.getDescription()==null) || 
             (this.description!=null &&
              this.description.equals(other.getDescription()))) &&
            ((this.displayName==null && other.getDisplayName()==null) || 
             (this.displayName!=null &&
              this.displayName.equals(other.getDisplayName()))) &&
            ((this.hasPicture==null && other.getHasPicture()==null) || 
             (this.hasPicture!=null &&
              this.hasPicture.equals(other.getHasPicture()))) &&
            ((this.organizationCategoryType==null && other.getOrganizationCategoryType()==null) || 
             (this.organizationCategoryType!=null &&
              this.organizationCategoryType.equals(other.getOrganizationCategoryType()))) &&
            ((this.organizationType==null && other.getOrganizationType()==null) || 
             (this.organizationType!=null &&
              this.organizationType.equals(other.getOrganizationType()))) &&
            ((this.uniqueId==null && other.getUniqueId()==null) || 
             (this.uniqueId!=null &&
              this.uniqueId.equals(other.getUniqueId())));
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
        if (getDescription() != null) {
            _hashCode += getDescription().hashCode();
        }
        if (getDisplayName() != null) {
            _hashCode += getDisplayName().hashCode();
        }
        if (getHasPicture() != null) {
            _hashCode += getHasPicture().hashCode();
        }
        if (getOrganizationCategoryType() != null) {
            _hashCode += getOrganizationCategoryType().hashCode();
        }
        if (getOrganizationType() != null) {
            _hashCode += getOrganizationType().hashCode();
        }
        if (getUniqueId() != null) {
            _hashCode += getUniqueId().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(DtoOrganization.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/ds/in/10.x", "dtoOrganization"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("description");
        elemField.setXmlName(new javax.xml.namespace.QName("", "description"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("displayName");
        elemField.setXmlName(new javax.xml.namespace.QName("", "displayName"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("hasPicture");
        elemField.setXmlName(new javax.xml.namespace.QName("", "hasPicture"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("organizationCategoryType");
        elemField.setXmlName(new javax.xml.namespace.QName("", "organizationCategoryType"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("organizationType");
        elemField.setXmlName(new javax.xml.namespace.QName("", "organizationType"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("uniqueId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "uniqueId"));
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
