package com.siapp.models;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "derivacion")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
public class Derivation implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "tipoderivacion")
	private String derivationType;
	
	@Column(name = "area")
	private String derivedArea;
	
	@Column(name = "motivo")
	private String reason;
	
	@Column(name = "estado")
	private String status;
	
	@Column(name = "cuota")
	private String recoveryCost;
	
	@Column(name = "id_expediente")
	private Integer recordId;
	
	@Column(name = "id_reingreso")
	private Integer reEntryId;
	
    @Column(name = "creado", nullable = true, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

    @Column(name = "actualizado", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;
    
    @JsonBackReference(value="derivationReference")
    @OneToOne(mappedBy = "derivation",  cascade = CascadeType.ALL)
    private MedicalRelease medicalRelease;
    
    @OneToOne(cascade = CascadeType.DETACH)
	@JoinColumn(name = "id_terapeuta", referencedColumnName = "id_terapeuta")
    private Therapist therapist;
    
    // GETTERS AND SETTERS
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDerivationType() {
		return derivationType;
	}

	public void setDerivationType(String derivationType) {
		this.derivationType = derivationType;
	}

	public String getDerivedArea() {
		return derivedArea;
	}

	public void setDerivedArea(String derivedArea) {
		this.derivedArea = derivedArea;
	}
	
	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getRecordId() {
		return recordId;
	}

	public void setRecordId(Integer recordId) {
		this.recordId = recordId;
	}

	public Integer getReEntryId() {
		return reEntryId;
	}

	public void setReEntryId(Integer reEntry) {
		this.reEntryId = reEntry;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public MedicalRelease getMedicalRelease() {
		return medicalRelease;
	}

	public void setMedicalRelease(MedicalRelease medicalRelease) {
		this.medicalRelease = medicalRelease;
	}

	public String getRecoveryCost() {
		return recoveryCost;
	}

	public void setRecoveryCost(String recoveryCost) {
		this.recoveryCost = recoveryCost;
	}

	public Therapist getTherapist() {
		return therapist;
	}

	public void setTherapist(Therapist therapist) {
		this.therapist = therapist;
	}
	
}
