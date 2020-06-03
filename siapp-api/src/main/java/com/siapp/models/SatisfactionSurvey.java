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

@Entity
@Table(name = "encuestasatisfaccion")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
public class SatisfactionSurvey implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "tratoproblema")
	private String problemTreat;
	
	@Column(name = "tratamientoayuda")
	private String helpTreat;
	
	@Column(name = "estadoemocionalinicio")
	private String initialEmotionalState;
	
	@Column(name = "estadoemocionalfinal")
	private String finalEmotionalState;
	
	@Column(name = "puntualidadterapeuta")
	private String therapistPuntuality;
	
	@Column(name = "cumplimientoterapeuta")
	private String therapistCompliance;
	
	@Column(name = "resultado")
	private String result;
	
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
    
	@OneToOne(cascade = CascadeType.REFRESH)
	@JoinColumn(name = "id_derivacion", referencedColumnName = "id")
	private Derivation derivation;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getProblemTreat() {
		return problemTreat;
	}

	public void setProblemTreat(String problemTreat) {
		this.problemTreat = problemTreat;
	}

	public String getHelpTreat() {
		return helpTreat;
	}

	public void setHelpTreat(String helpTreat) {
		this.helpTreat = helpTreat;
	}

	public String getInitialEmotionalState() {
		return initialEmotionalState;
	}

	public void setInitialEmotionalState(String initialEmotionalState) {
		this.initialEmotionalState = initialEmotionalState;
	}

	public String getFinalEmotionalState() {
		return finalEmotionalState;
	}

	public void setFinalEmotionalState(String finalEmotionalState) {
		this.finalEmotionalState = finalEmotionalState;
	}

	public String getTherapistPuntuality() {
		return therapistPuntuality;
	}

	public void setTherapistPuntuality(String therapistPuntuality) {
		this.therapistPuntuality = therapistPuntuality;
	}

	public String getTherapistCompliance() {
		return therapistCompliance;
	}

	public void setTherapistCompliance(String therapistCompliance) {
		this.therapistCompliance = therapistCompliance;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
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

	public Derivation getDerivation() {
		return derivation;
	}

	public void setDerivation(Derivation derivation) {
		this.derivation = derivation;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
