package com.siapp.models;

import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "otra_aportacion")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
public class OtherTicket {
private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "id_otra_aportacion")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
    
    @Column(name = "nota")
    private String concept;
    
    @Column(name = "total")
    private Integer total;
    
    @Column(name = "estado")
    private String status;
    
    @Column(name = "nombre")
    private String name;
    
    @Column(name = "apellidoPaterno")
    private String lastName;
    
    @Column(name = "apellidoMaterno")
    private String secondLastName;
    
    @Column(name = "parroquia")
    private String parish;
    
    @Column(name = "sexo")
    private String gender;
    
    @Column(name = "localidad")
    private String location;
    
    @Column(name = "municipio")
    private String city;
    
	@Column(name = "fecha_nacimiento")
	private Date bornDate;
    
    @Column(name = "actualizado", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;
    
    @Column(name = "creado", nullable = true, updatable = false)
    @Temporal(TemporalType.DATE)
    @CreatedDate
    private Date createdAt;
    
    @OneToOne(cascade = CascadeType.DETACH)
	@JoinColumn(name = "id_servicio", referencedColumnName = "id_servicio")
    private ServiceType serviceType;
    
	@LazyCollection(LazyCollectionOption.FALSE)
	@ManyToMany(cascade = CascadeType.REFRESH)
	@JoinTable(
		name="otra_aportacion_terapeuta",
		joinColumns=@JoinColumn(name="id_otra_aportacion", referencedColumnName="id_otra_aportacion"),
		inverseJoinColumns=@JoinColumn(name="id_terapeuta", referencedColumnName="id_terapeuta"))
	private List<Therapist> therapists;

    // Setter and getters
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getConcept() {
		return concept;
	}

	public void setConcept(String concept) {
		this.concept = concept;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public ServiceType getServiceType() {
		return serviceType;
	}

	public void setServiceType(ServiceType serviceType) {
		this.serviceType = serviceType;
	}

	public List<Therapist> getTherapists() {
		return therapists;
	}

	public void setTherapists(List<Therapist> therapists) {
		this.therapists = therapists;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getParish() {
		return parish;
	}

	public void setParish(String parish) {
		this.parish = parish;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Date getBornDate() {
		return bornDate;
	}

	public void setBornDate(Date bornDate) {
		this.bornDate = bornDate;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSecondLastName() {
		return secondLastName;
	}

	public void setSecondLastName(String secondLastName) {
		this.secondLastName = secondLastName;
	}
	
	
	
}
