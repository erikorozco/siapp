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
@Table(name = "intervencioncrisis")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt"}, allowGetters = true)
public class CrisisIntervention implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "estadomental")
	private String mentalStatus;

	@Column(name = "derivacion")
	private String derivedTo;
	
	@Column(name = "tipoderivacion")
	private String derivationType;
	
	@Column(name = "procedimientos")
	private String procedures;
	
	@Column(name = "nombrefamiliar")
	private String familyContactName;
	
	@Column(name = "telefonofamiliar")
	private String familyContactPhone;
	
	@Column(name = "fechanacimiento")
    private Date bornDate;
	
	@Column(name = "motivo")
    private String reason;
	
	@Column(name = "compromisos")
    private String commitments;
	
	@Column(name = "sexo")
    private String gender;
	
	@Column(name = "domicilio")
    private String address;
	
	@Column(name = "escolaridad")
    private String escolarity;
	
	@Column(name = "municipio")
    private String city;
	
	@Column(name = "localidad")
    private String location;
	
	@Column(name = "colonia")
    private String colony;
	
	@Column(name = "estadocivil")
    private String maritalStatus;
		
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
	@JoinColumn(name = "id_persona", referencedColumnName = "id_persona")
	private Person person;

    //Getters and setters
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMentalStatus() {
		return mentalStatus;
	}

	public void setMentalStatus(String mentalStatus) {
		this.mentalStatus = mentalStatus;
	}

	public String getDerivedTo() {
		return derivedTo;
	}

	public void setDerivedTo(String derivedTo) {
		this.derivedTo = derivedTo;
	}

	public String getDerivationType() {
		return derivationType;
	}

	public void setDerivationType(String derivationType) {
		this.derivationType = derivationType;
	}

	public String getProcedures() {
		return procedures;
	}

	public void setProcedures(String procedures) {
		this.procedures = procedures;
	}

	public String getFamilyContactName() {
		return familyContactName;
	}

	public void setFamilyContactName(String familyContactName) {
		this.familyContactName = familyContactName;
	}

	public String getFamilyContactPhone() {
		return familyContactPhone;
	}

	public void setFamilyContactPhone(String familyContactPhone) {
		this.familyContactPhone = familyContactPhone;
	}

	public Date getBornDate() {
		return bornDate;
	}

	public void setBornDate(Date bornDate) {
		this.bornDate = bornDate;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getCommitments() {
		return commitments;
	}

	public void setCommitments(String commitments) {
		this.commitments = commitments;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEscolarity() {
		return escolarity;
	}

	public void setEscolarity(String escolarity) {
		this.escolarity = escolarity;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getColony() {
		return colony;
	}

	public void setColony(String colony) {
		this.colony = colony;
	}

	public String getMaritalStatus() {
		return maritalStatus;
	}

	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
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

	public Person getPerson() {
		return person;
	}

	public void setPerson(Person person) {
		this.person = person;
	}
}
