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
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "baja")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
public class Drop implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "id_cartaresponsabilidad")
	private Integer idResponsabilityLetter;
	
	@Column(name = "solicitante")
	private String whoRequestInfo;
	
	@Column(name = "resumenclinico")
	private String clinicSummary;
	
	@Column(name = "recomendaciones")
	private String recommendations;
	
	@Column(name = "contactofamiliar")
	private String familyContact;

	@Column(name = "testigos")
	private String witnesses;
	
	@Column(name = "comentarios")
	private String comments;
	
	@Column(name = "tipobaja")
	private String dropType;
	
    @Column(name = "creado", nullable = true, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

    @Column(name = "actualizado", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;
    
    @OneToOne(cascade = CascadeType.DETACH)
	@JoinColumn(name = "id_terapeuta", referencedColumnName = "id_terapeuta")
    private Therapist therapist;
    
	//@JsonManagedReference(value = "derivationReference")
	@OneToOne(cascade = CascadeType.REFRESH)
	@JoinColumn(name = "id_derivacion", referencedColumnName = "id")
	private Derivation derivation;

    //Getters and Setters
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIdResponsabilityLetter() {
		return idResponsabilityLetter;
	}

	public void setIdResponsabilityLetter(Integer idResponsabilityLetter) {
		this.idResponsabilityLetter = idResponsabilityLetter;
	}

	public String getWhoRequestInfo() {
		return whoRequestInfo;
	}

	public void setWhoRequestInfo(String whoRequestInfo) {
		this.whoRequestInfo = whoRequestInfo;
	}

	public String getClinicSummary() {
		return clinicSummary;
	}

	public void setClinicSummary(String clinicSummary) {
		this.clinicSummary = clinicSummary;
	}

	public String getRecommendations() {
		return recommendations;
	}

	public void setRecommendations(String recommendations) {
		this.recommendations = recommendations;
	}

	public String getFamilyContact() {
		return familyContact;
	}

	public void setFamilyContact(String familyContact) {
		this.familyContact = familyContact;
	}

	public String getWitnesses() {
		return witnesses;
	}

	public void setWitnesses(String witnesses) {
		this.witnesses = witnesses;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getDropType() {
		return dropType;
	}

	public void setDropType(String dropType) {
		this.dropType = dropType;
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

	public Therapist getTherapist() {
		return therapist;
	}

	public void setTherapist(Therapist therapist) {
		this.therapist = therapist;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Derivation getDerivation() {
		return derivation;
	}

	public void setDerivation(Derivation derivation) {
		this.derivation = derivation;
	}
	
}
