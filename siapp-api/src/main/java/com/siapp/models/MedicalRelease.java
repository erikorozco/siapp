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
@Table(name = "alta")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
public class MedicalRelease implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "diagnostico")
	private String diagnostic;
	
	@Column(name = "resumenevolucion")
	private String diagnosticSummary;
	
	@Column(name = "manejo")
	private String bahaviorDuringStay;
	
	@Column(name = "estadoActual")
	private String actualStatus;
	
	@Column(name = "motivo")
	private String reason;
	
	@Column(name = "problemaspendientes")
	private String pendingProblems;
	
	@Column(name = "planmanejo")
	private String ationPlan;
	
	@Column(name = "recomendaciones")
	private String recommendations;
	
    @Column(name = "fechaegreso")
    private Date releaseDate;
    
    @Column(name = "creado", nullable = true, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

    @Column(name = "actualizado", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;
    
	@JsonManagedReference(value = "derivationReference")
	@OneToOne(cascade = CascadeType.REFRESH)
	@JoinColumn(name = "id_derivacion", referencedColumnName = "id")
	private Derivation derivation;
	
    @OneToOne(cascade = CascadeType.DETACH)
	@JoinColumn(name = "id_terapeuta", referencedColumnName = "id_terapeuta")
    private Therapist therapist;

	//GETTERS AND SETTERS
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDiagnostic() {
		return diagnostic;
	}

	public void setDiagnostic(String diagnostic) {
		this.diagnostic = diagnostic;
	}

	public String getDiagnosticSummary() {
		return diagnosticSummary;
	}

	public void setDiagnosticSummary(String diagnosticSummary) {
		this.diagnosticSummary = diagnosticSummary;
	}

	public String getBahaviorDuringStay() {
		return bahaviorDuringStay;
	}

	public void setBahaviorDuringStay(String bahaviorDuringStay) {
		this.bahaviorDuringStay = bahaviorDuringStay;
	}

	public String getActualStatus() {
		return actualStatus;
	}

	public void setActualStatus(String actualStatus) {
		this.actualStatus = actualStatus;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getPendingProblems() {
		return pendingProblems;
	}

	public void setPendingProblems(String pendingProblems) {
		this.pendingProblems = pendingProblems;
	}

	public String getAtionPlan() {
		return ationPlan;
	}

	public void setAtionPlan(String ationPlan) {
		this.ationPlan = ationPlan;
	}

	public String getRecommendations() {
		return recommendations;
	}

	public void setRecommendations(String recommendations) {
		this.recommendations = recommendations;
	}

	public Date getReleaseDate() {
		return releaseDate;
	}

	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
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

	public Derivation getDerivation() {
		return derivation;
	}

	public void setDerivation(Derivation derivation) {
		this.derivation = derivation;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Therapist getTherapist() {
		return therapist;
	}

	public void setTherapist(Therapist therapist) {
		this.therapist = therapist;
	}
	
}
