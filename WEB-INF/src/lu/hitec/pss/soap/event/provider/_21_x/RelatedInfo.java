/**
 * RelatedInfo.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package lu.hitec.pss.soap.event.provider._21_x;

public class RelatedInfo  implements java.io.Serializable {
    private java.lang.String creator;  // attribute

    private java.lang.String relDeviceId;  // attribute

    private java.lang.String relEventRef;  // attribute

    private java.util.Calendar relPayloadTime;  // attribute

    private java.lang.String relPayloadType;  // attribute

    private java.lang.String relPlaceId;  // attribute

    private java.lang.String relatedSceneId;  // attribute

    private java.lang.String relUserId;  // attribute

    private java.lang.String relVehicleId;  // attribute

    public RelatedInfo() {
    }

    public RelatedInfo(
           java.lang.String creator,
           java.lang.String relDeviceId,
           java.lang.String relEventRef,
           java.util.Calendar relPayloadTime,
           java.lang.String relPayloadType,
           java.lang.String relPlaceId,
           java.lang.String relatedSceneId,
           java.lang.String relUserId,
           java.lang.String relVehicleId) {
           this.creator = creator;
           this.relDeviceId = relDeviceId;
           this.relEventRef = relEventRef;
           this.relPayloadTime = relPayloadTime;
           this.relPayloadType = relPayloadType;
           this.relPlaceId = relPlaceId;
           this.relatedSceneId = relatedSceneId;
           this.relUserId = relUserId;
           this.relVehicleId = relVehicleId;
    }


    /**
     * Gets the creator value for this RelatedInfo.
     * 
     * @return creator
     */
    public java.lang.String getCreator() {
        return creator;
    }


    /**
     * Sets the creator value for this RelatedInfo.
     * 
     * @param creator
     */
    public void setCreator(java.lang.String creator) {
        this.creator = creator;
    }


    /**
     * Gets the relDeviceId value for this RelatedInfo.
     * 
     * @return relDeviceId
     */
    public java.lang.String getRelDeviceId() {
        return relDeviceId;
    }


    /**
     * Sets the relDeviceId value for this RelatedInfo.
     * 
     * @param relDeviceId
     */
    public void setRelDeviceId(java.lang.String relDeviceId) {
        this.relDeviceId = relDeviceId;
    }


    /**
     * Gets the relEventRef value for this RelatedInfo.
     * 
     * @return relEventRef
     */
    public java.lang.String getRelEventRef() {
        return relEventRef;
    }


    /**
     * Sets the relEventRef value for this RelatedInfo.
     * 
     * @param relEventRef
     */
    public void setRelEventRef(java.lang.String relEventRef) {
        this.relEventRef = relEventRef;
    }


    /**
     * Gets the relPayloadTime value for this RelatedInfo.
     * 
     * @return relPayloadTime
     */
    public java.util.Calendar getRelPayloadTime() {
        return relPayloadTime;
    }


    /**
     * Sets the relPayloadTime value for this RelatedInfo.
     * 
     * @param relPayloadTime
     */
    public void setRelPayloadTime(java.util.Calendar relPayloadTime) {
        this.relPayloadTime = relPayloadTime;
    }


    /**
     * Gets the relPayloadType value for this RelatedInfo.
     * 
     * @return relPayloadType
     */
    public java.lang.String getRelPayloadType() {
        return relPayloadType;
    }


    /**
     * Sets the relPayloadType value for this RelatedInfo.
     * 
     * @param relPayloadType
     */
    public void setRelPayloadType(java.lang.String relPayloadType) {
        this.relPayloadType = relPayloadType;
    }


    /**
     * Gets the relPlaceId value for this RelatedInfo.
     * 
     * @return relPlaceId
     */
    public java.lang.String getRelPlaceId() {
        return relPlaceId;
    }


    /**
     * Sets the relPlaceId value for this RelatedInfo.
     * 
     * @param relPlaceId
     */
    public void setRelPlaceId(java.lang.String relPlaceId) {
        this.relPlaceId = relPlaceId;
    }


    /**
     * Gets the relatedSceneId value for this RelatedInfo.
     * 
     * @return relatedSceneId
     */
    public java.lang.String getRelatedSceneId() {
        return relatedSceneId;
    }


    /**
     * Sets the relatedSceneId value for this RelatedInfo.
     * 
     * @param relatedSceneId
     */
    public void setRelatedSceneId(java.lang.String relatedSceneId) {
        this.relatedSceneId = relatedSceneId;
    }


    /**
     * Gets the relUserId value for this RelatedInfo.
     * 
     * @return relUserId
     */
    public java.lang.String getRelUserId() {
        return relUserId;
    }


    /**
     * Sets the relUserId value for this RelatedInfo.
     * 
     * @param relUserId
     */
    public void setRelUserId(java.lang.String relUserId) {
        this.relUserId = relUserId;
    }


    /**
     * Gets the relVehicleId value for this RelatedInfo.
     * 
     * @return relVehicleId
     */
    public java.lang.String getRelVehicleId() {
        return relVehicleId;
    }


    /**
     * Sets the relVehicleId value for this RelatedInfo.
     * 
     * @param relVehicleId
     */
    public void setRelVehicleId(java.lang.String relVehicleId) {
        this.relVehicleId = relVehicleId;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof RelatedInfo)) return false;
        RelatedInfo other = (RelatedInfo) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.creator==null && other.getCreator()==null) || 
             (this.creator!=null &&
              this.creator.equals(other.getCreator()))) &&
            ((this.relDeviceId==null && other.getRelDeviceId()==null) || 
             (this.relDeviceId!=null &&
              this.relDeviceId.equals(other.getRelDeviceId()))) &&
            ((this.relEventRef==null && other.getRelEventRef()==null) || 
             (this.relEventRef!=null &&
              this.relEventRef.equals(other.getRelEventRef()))) &&
            ((this.relPayloadTime==null && other.getRelPayloadTime()==null) || 
             (this.relPayloadTime!=null &&
              this.relPayloadTime.equals(other.getRelPayloadTime()))) &&
            ((this.relPayloadType==null && other.getRelPayloadType()==null) || 
             (this.relPayloadType!=null &&
              this.relPayloadType.equals(other.getRelPayloadType()))) &&
            ((this.relPlaceId==null && other.getRelPlaceId()==null) || 
             (this.relPlaceId!=null &&
              this.relPlaceId.equals(other.getRelPlaceId()))) &&
            ((this.relatedSceneId==null && other.getRelatedSceneId()==null) || 
             (this.relatedSceneId!=null &&
              this.relatedSceneId.equals(other.getRelatedSceneId()))) &&
            ((this.relUserId==null && other.getRelUserId()==null) || 
             (this.relUserId!=null &&
              this.relUserId.equals(other.getRelUserId()))) &&
            ((this.relVehicleId==null && other.getRelVehicleId()==null) || 
             (this.relVehicleId!=null &&
              this.relVehicleId.equals(other.getRelVehicleId())));
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
        if (getCreator() != null) {
            _hashCode += getCreator().hashCode();
        }
        if (getRelDeviceId() != null) {
            _hashCode += getRelDeviceId().hashCode();
        }
        if (getRelEventRef() != null) {
            _hashCode += getRelEventRef().hashCode();
        }
        if (getRelPayloadTime() != null) {
            _hashCode += getRelPayloadTime().hashCode();
        }
        if (getRelPayloadType() != null) {
            _hashCode += getRelPayloadType().hashCode();
        }
        if (getRelPlaceId() != null) {
            _hashCode += getRelPlaceId().hashCode();
        }
        if (getRelatedSceneId() != null) {
            _hashCode += getRelatedSceneId().hashCode();
        }
        if (getRelUserId() != null) {
            _hashCode += getRelUserId().hashCode();
        }
        if (getRelVehicleId() != null) {
            _hashCode += getRelVehicleId().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(RelatedInfo.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://hitec.lu/pss/soap/event/provider/21.x", "relatedInfo"));
        org.apache.axis.description.AttributeDesc attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("creator");
        attrField.setXmlName(new javax.xml.namespace.QName("", "creator"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("relDeviceId");
        attrField.setXmlName(new javax.xml.namespace.QName("", "relDeviceId"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("relEventRef");
        attrField.setXmlName(new javax.xml.namespace.QName("", "relEventRef"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("relPayloadTime");
        attrField.setXmlName(new javax.xml.namespace.QName("", "relPayloadTime"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "dateTime"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("relPayloadType");
        attrField.setXmlName(new javax.xml.namespace.QName("", "relPayloadType"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("relPlaceId");
        attrField.setXmlName(new javax.xml.namespace.QName("", "relPlaceId"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("relatedSceneId");
        attrField.setXmlName(new javax.xml.namespace.QName("", "relatedSceneId"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("relUserId");
        attrField.setXmlName(new javax.xml.namespace.QName("", "relUserId"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        typeDesc.addFieldDesc(attrField);
        attrField = new org.apache.axis.description.AttributeDesc();
        attrField.setFieldName("relVehicleId");
        attrField.setXmlName(new javax.xml.namespace.QName("", "relVehicleId"));
        attrField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
