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
@Table(name = "sesion")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"sessionDate", "updatedAt"}, allowGetters = true)
public class SessionReport implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "id_sesion")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
    @Column(name = "\"fechaHoraCita\"", nullable = true)
    @Temporal(TemporalType.DATE)
    @CreatedDate
    private Date sessionDate;
    
    @Column(name = "\"numeroSesion\"")
    private Integer sessionNumber;
    
    @Column(name = "\"tipoServicio\"")
    private String sessionType;
    
    @Column(name = "apertura")
    private String psychologicalOpening;
    
    @Column(name = "desarrollo")
    private String psychologicalDevelopment;
    
    @Column(name = "avance")
    private String psychologicalAdvance;
    
    @Column(name = "\"proximaCita\"")
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date nextDate;
    
    @Column(name = "acuerdos")
    private String psychologicalAgreements;
    
    @Column(name = "esta_activo")
    private boolean active;
    
    @Column(name = "aperturasensible")
    private boolean openingSensitiveData;
    
    @Column(name = "desarrollosensible")
    private boolean developmentSensitiveData;
    
    @Column(name = "acuerdossensible")
    private boolean agreementsSensitiveData;
    
    //CreateAt is replaced with sessionDate
    
    @Column(name = "actualizado", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;
    
    @Column(name = "id_expediente")
    private Integer recordId;
    
    //@JsonManagedReference(value="therapistReference")
    @OneToOne(cascade = CascadeType.DETACH)
	@JoinColumn(name = "id_terapeuta", referencedColumnName = "id_terapeuta")
    private Therapist therapist;

    
    //SETTERS AND GETTERS
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Date getSessionDate() {
		return sessionDate;
	}

	public void setSessionDate(Date sessionDate) {
		this.sessionDate = sessionDate;
	}

	public Integer getSessionNumber() {
		return sessionNumber;
	}

	public void setSessionNumber(Integer sessionNumber) {
		this.sessionNumber = sessionNumber;
	}

	public String getSessionType() {
		return sessionType;
	}

	public void setSessionType(String sessionType) {
		this.sessionType = sessionType;
	}

	public String getPsychologicalOpening() {
		return psychologicalOpening;
	}

	public void setPsychologicalOpening(String psychologicalOpening) {
		this.psychologicalOpening = psychologicalOpening;
	}

	public String getPsychologicalDevelopment() {
		return psychologicalDevelopment;
	}

	public void setPsychologicalDevelopment(String development) {
		psychologicalDevelopment = development;
	}

	public String getPsychologicalAdvance() {
		return psychologicalAdvance;
	}

	public void setPsychologicalAdvance(String psychologicalAdvance) {
		this.psychologicalAdvance = psychologicalAdvance;
	}

	public Date getNextDate() {
		return nextDate;
	}

	public void setNextDate(Date nextDate) {
		this.nextDate = nextDate;
	}

	public String getPsychologicalAgreements() {
		return psychologicalAgreements;
	}

	public void setPsychologicalAgreements(String psychologicalAgreements) {
		this.psychologicalAgreements = psychologicalAgreements;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Integer getRecordId() {
		return recordId;
	}

	public void setRecordId(Integer recordId) {
		this.recordId = recordId;
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

	public boolean isOpeningSensitiveData() {
		return openingSensitiveData;
	}

	public void setOpeningSensitiveData(boolean openingSensitiveData) {
		this.openingSensitiveData = openingSensitiveData;
	}

	public boolean isDevelopmentSensitiveData() {
		return developmentSensitiveData;
	}

	public void setDevelopmentSensitiveData(boolean developmentSensitiveData) {
		this.developmentSensitiveData = developmentSensitiveData;
	}

	public boolean isAgreementsSensitiveData() {
		return agreementsSensitiveData;
	}

	public void setAgreementsSensitiveData(boolean agreementsSensitiveData) {
		this.agreementsSensitiveData = agreementsSensitiveData;
	}
    
}
