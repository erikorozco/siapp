package com.siapp.models;

import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
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
import javax.persistence.Transient;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "expediente")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, allowGetters = true)
public class Record implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@Column(name = "id_expediente")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;	
	
	@Column(name = "escolaridad")
	private String escolarity;
	
	@Column(name = "edad")
	private Integer age;
	
	@Column(name = "sexo")
	private String gender;
	
	@Column(name = "ocupacion")
	private String ocupation;
	
	@Column(name = "\"estadoCivil\"")
	private String civilStatus;
	
	@Column(name = "religion")
	private String religion;
	
	@Column(name = "domicilio")
	private String address;
	
	@Column(name = "parroquia")
	private String parish;
	
	@Column(name = "colonia")
	private String colony;
	
	@Column(name = "municipio")
	private String city;
	
	@Column(name = "\"primeraVez\"")
	private boolean firstTime;
	
	@Column(name = "cuando")
	private String whenWasFirstTime;
	
	@Column(name = "\"quienDerivo\"")
	private String whoDerived;
	
	@Column(name = "\"disposicionParaConsulta\"")
	private Boolean consultationDisposition;
	
	@Column(name = "\"dependienteEconomico\"")
	private Boolean economicDependent;
	
	@Column(name = "\"quienLabora\"")
	private String whoWorks;
	
	@Column(name = "\"funEnTrabajo\"")
	private String workOcupation;
	
	@Column(name = "\"tiempoLaborando\"")
	private String senorityOfWork;
	
	@Column(name = "\"DesdeCuando\"")
	private String sinceWhenWorkOcupation;
	
	@Column(name = "\"dondeLabora\"")
	private String workPlace;
	
	@Column(name = "\"ingresoAlMes\"")
	private Double monthlyIncome;
	
	@Column(name = "\"estadoLaboral\"")
	private String workStatus;
	
	@Column(name = "\"tiempoEstadoLaboral\"")
	private String timeOnWorkStatus;
	
	@Column(name = "\"nDependientes\"")
	private Integer numberOfDependents;
	
	@Column(name = "\"nPersonasQueIngresan\"")
	private Integer numberOfDependentsThatBringMoney;
	
	@Column(name = "\"posesionDeCasa\"")
	private String houseStatus;
	
	@Column(name = "\"serviciosMedicos\"")
	private String medicalServices;
	
	@Column(name = "\"enfermedadCronica\"")
	private String chronicDisease;
	
	@Column(name = "\"exploracionClinica\"")
	private String clinicExploration;
	
	@Column(name = "\"atencionRA\"")
	private String RAAtention;
	
	@Column(name = "\"lugarRA\"")
	private String RAPlace;
	
	@Column(name = "\"nOcacionesRA\"")
	private String RATimes;
	
	@Column(name = "\"terminoTratamientoRA\"")
	private boolean RATreatmentFinished;
	
	@Column(name = "\"motivoTerminoRA\"")
	private String RAReason;
	
	@Column(name = "\"estaBajoTratamiento\"")
	private boolean underTreatment;
	
	@Column(name = "medicamentos")
	private String medicine;
	
	@Column(name = "peso")
	private Double weight;
	
	@Column(name = "talla")
	private Double size;
	
	@Column(name = "imc")
	private Double bmi;
	
	@Column(name = "higiene")
	private String hygiene;
	
	@Column(name = "\"alteracionesEnMarcha\"")
	private String walkingAlterations;
	
	@Column(name = "\"alteracionesEnHabla\"")
	private String speakingAlterations;
	
	@Column(name = "fuma")
	private boolean smoke;
	
	@Column(name = "\"frecFuma\"")
	private String smokeFrecuency;
	
	@Column(name = "\"bebeAlcohol\"")
	private boolean drinkAlcohol;
	
	@Column(name = "\"frecBebeAlcohol\"")
	private String drinkAlcoholFrecuency;
	
	@Column(name = "\"otrasDrogas\"")
	private boolean otherDrugs;
	
	@Column(name = "\"cualesDrogas\"")
	private String whichDrugs;
	
	@Column(name = "\"frecDrogas\"")
	private String drugsFrecuency;
	
	@Column(name = "\"alteracionesSueño\"")
	private boolean sleepingAlterations;
	
	@Column(name = "\"tipoAlteracionesS\"")
	private String whichSleepingAlterarions;
	
	@Column(name = "\"desdeCuandoAlterS\"")
	private String sinceWhenSleepingAlterarions;
	
	@Column(name = "\"alteracionesAlimenticias\"")
	private boolean alimentaryAlterations;
	
	@Column(name = "\"tipoAlteracionesA\"")
	private String whichAlimentaryAlterations;
	
	@Column(name = "\"desdeCuandoAlterA\"")
	private String sinceWhenAlimentaryAlterations;
	
	@Column(name = "\"cambiosDeAnimo\"")
	private String moodChanges;
	
	@Column(name = "\"desdeCuandoCA\"")
	private String sinceWhenMoodChanges;
	
	@Column(name = "\"diagPresuntivo\"")
	private String presuntiveDiagnostic;
	
	@Column(name = "\"derivadoA\"")
	private String derivedTo;
	
	@Column(name = "\"proQueAtiendo\"")
	private String professionalWhoAttended;
	
	@Column(name = "cuota")
	private String moneyShare;
	
	@Column(name = "fecha_creacion")
	private Date creation;
	
	@Column(name = "\"antecedentesPenales\"")
	private boolean ciminalRecords;
	
	@Column(name = "\"cualesAntecedentes\"")
	private String whichCriminalRecords;
	
	@Column(name = "\"estadoPaciente\"")
	private String patientStatus;
	
	@Column(name = "\"tipoExpediente\"")
	private String recordType;
	
	@Column(name = "nacimiento")
	private Date bornDate;
	
	@Column(name = "anotaciones")
	private String notes;
	
	@Column(name = "genograma")
	private byte[] genogram;
	
	@Column(name = "familiar")
	private String familyContact;
	
	@Column(name = "telefonofamiliar")
	private String familyContactPhone;
	
	@Column(name = "parentezcofamiliar")
	private String familyContactRelation;
	
	@Column(name = "localidad")
	private String location;
	
	@Column(name = "version")
	private String version;
	
    @Column(name = "creado", nullable = true, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

    @Column(name = "actualizado", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
	@JoinTable(
		name="expediente_terapeuta",
		joinColumns=@JoinColumn(name="id_expediente", referencedColumnName="id_expediente"),
		inverseJoinColumns=@JoinColumn(name="id_terapeuta", referencedColumnName="id_terapeuta"))
	private List<Therapist> therapists;
	
	@JsonManagedReference(value = "personReference")
	@OneToOne(cascade = CascadeType.REFRESH)
	@JoinColumn(name = "id_persona", referencedColumnName = "id_persona")
	private Person person;

	//SETTERS AND GETTERS
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEscolarity() {
		return escolarity;
	}

	public void setEscolarity(String escolarity) {
		this.escolarity = escolarity;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getOcupation() {
		return ocupation;
	}

	public void setOcupation(String ocupation) {
		this.ocupation = ocupation;
	}

	public String getCivilStatus() {
		return civilStatus;
	}

	public void setCivilStatus(String civilStatus) {
		this.civilStatus = civilStatus;
	}

	public String getReligion() {
		return religion;
	}

	public void setReligion(String religion) {
		this.religion = religion;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getParish() {
		return parish;
	}

	public void setParish(String parish) {
		this.parish = parish;
	}

	public String getColony() {
		return colony;
	}

	public void setColony(String colony) {
		this.colony = colony;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public boolean isFirstTime() {
		return firstTime;
	}

	public void setFirstTime(boolean firstTime) {
		this.firstTime = firstTime;
	}

	public String getWhenWasFirstTime() {
		return whenWasFirstTime;
	}

	public void setWhenWasFirstTime(String whenWasFirstTime) {
		this.whenWasFirstTime = whenWasFirstTime;
	}

	public String getWhoDerived() {
		return whoDerived;
	}

	public void setWhoDerived(String whoDerived) {
		this.whoDerived = whoDerived;
	}

	public Boolean getConsultationDisposition() {
		return consultationDisposition;
	}

	public void setConsultationDisposition(Boolean consultationDisposition) {
		this.consultationDisposition = consultationDisposition;
	}

	public Boolean getEconomicDependent() {
		return economicDependent;
	}

	public void setEconomicDependent(Boolean economicDependent) {
		this.economicDependent = economicDependent;
	}

	public String getWhoWorks() {
		return whoWorks;
	}

	public void setWhoWorks(String whoWorks) {
		this.whoWorks = whoWorks;
	}

	public String getWorkOcupation() {
		return workOcupation;
	}

	public void setWorkOcupation(String workOcupation) {
		this.workOcupation = workOcupation;
	}

	public String getSenorityOfWork() {
		return senorityOfWork;
	}

	public void setSenorityOfWork(String senorityOfWork) {
		this.senorityOfWork = senorityOfWork;
	}

	public String getSinceWhenWorkOcupation() {
		return sinceWhenWorkOcupation;
	}

	public void setSinceWhenWorkOcupation(String sinceWhenWorkOcupation) {
		this.sinceWhenWorkOcupation = sinceWhenWorkOcupation;
	}

	public String getWorkPlace() {
		return workPlace;
	}

	public void setWorkPlace(String workPlace) {
		this.workPlace = workPlace;
	}

	public Double getMonthlyIncome() {
		return monthlyIncome;
	}

	public void setMonthlyIncome(Double monthlyIncome) {
		this.monthlyIncome = monthlyIncome;
	}

	public String getWorkStatus() {
		return workStatus;
	}

	public void setWorkStatus(String workStatus) {
		this.workStatus = workStatus;
	}

	public String getTimeOnWorkStatus() {
		return timeOnWorkStatus;
	}

	public void setTimeOnWorkStatus(String timeOnWorkStatus) {
		this.timeOnWorkStatus = timeOnWorkStatus;
	}

	public Integer getNumberOfDependents() {
		return numberOfDependents;
	}

	public void setNumberOfDependents(Integer numberOfDependents) {
		this.numberOfDependents = numberOfDependents;
	}

	public Integer getNumberOfDependentsThatBringMoney() {
		return numberOfDependentsThatBringMoney;
	}

	public void setNumberOfDependentsThatBringMoney(Integer numberOfDependentsThatBringMoney) {
		this.numberOfDependentsThatBringMoney = numberOfDependentsThatBringMoney;
	}

	public String getHouseStatus() {
		return houseStatus;
	}

	public void setHouseStatus(String houseStatus) {
		this.houseStatus = houseStatus;
	}

	public String getMedicalServices() {
		return medicalServices;
	}

	public void setMedicalServices(String medicalServices) {
		this.medicalServices = medicalServices;
	}

	public String getChronicDisease() {
		return chronicDisease;
	}

	public void setChronicDisease(String chronicDisease) {
		this.chronicDisease = chronicDisease;
	}

	public String getClinicExploration() {
		return clinicExploration;
	}

	public void setClinicExploration(String clinicExploration) {
		this.clinicExploration = clinicExploration;
	}

	public String getRAAtention() {
		return RAAtention;
	}

	public void setRAAtention(String rAAtention) {
		RAAtention = rAAtention;
	}

	public String getRAPlace() {
		return RAPlace;
	}

	public void setRAPlace(String rAPlace) {
		RAPlace = rAPlace;
	}

	public String getRATimes() {
		return RATimes;
	}

	public void setRATimes(String rATimes) {
		RATimes = rATimes;
	}

	public boolean isRATreatmentFinished() {
		return RATreatmentFinished;
	}

	public void setRATreatmentFinished(boolean rATreatmentFinished) {
		RATreatmentFinished = rATreatmentFinished;
	}

	public String getRAReason() {
		return RAReason;
	}

	public void setRAReason(String rAReason) {
		RAReason = rAReason;
	}

	public boolean isUnderTreatment() {
		return underTreatment;
	}

	public void setUnderTreatment(boolean underTreatment) {
		this.underTreatment = underTreatment;
	}

	public String getMedicine() {
		return medicine;
	}

	public void setMedicine(String medicine) {
		this.medicine = medicine;
	}

	public Double getWeight() {
		return weight;
	}

	public void setWeight(Double weight) {
		this.weight = weight;
	}

	public Double getSize() {
		return size;
	}

	public void setSize(Double size) {
		this.size = size;
	}

	public Double getBmi() {
		return bmi;
	}

	public void setBmi(Double bmi) {
		this.bmi = bmi;
	}

	public String getHygiene() {
		return hygiene;
	}

	public void setHygiene(String hygiene) {
		this.hygiene = hygiene;
	}

	public String getWalkingAlterations() {
		return walkingAlterations;
	}

	public void setWalkingAlterations(String walkingAlterations) {
		this.walkingAlterations = walkingAlterations;
	}

	public String getSpeakingAlterations() {
		return speakingAlterations;
	}

	public void setSpeakingAlterations(String speakingAlterations) {
		this.speakingAlterations = speakingAlterations;
	}

	public boolean isSmoke() {
		return smoke;
	}

	public void setSmoke(boolean smoke) {
		this.smoke = smoke;
	}

	public String getSmokeFrecuency() {
		return smokeFrecuency;
	}

	public void setSmokeFrecuency(String smokeFrecuency) {
		this.smokeFrecuency = smokeFrecuency;
	}

	public boolean isDrinkAlcohol() {
		return drinkAlcohol;
	}

	public void setDrinkAlcohol(boolean drinkAlcohol) {
		this.drinkAlcohol = drinkAlcohol;
	}

	public String getDrinkAlcoholFrecuency() {
		return drinkAlcoholFrecuency;
	}

	public void setDrinkAlcoholFrecuency(String drinkAlcoholFrecuency) {
		this.drinkAlcoholFrecuency = drinkAlcoholFrecuency;
	}

	public boolean isOtherDrugs() {
		return otherDrugs;
	}

	public void setOtherDrugs(boolean otherDrugs) {
		this.otherDrugs = otherDrugs;
	}

	public String getWhichDrugs() {
		return whichDrugs;
	}

	public void setWhichDrugs(String whichDrugs) {
		this.whichDrugs = whichDrugs;
	}

	public String getDrugsFrecuency() {
		return drugsFrecuency;
	}

	public void setDrugsFrecuency(String drugsFrecuency) {
		this.drugsFrecuency = drugsFrecuency;
	}

	public boolean isSleepingAlterations() {
		return sleepingAlterations;
	}

	public void setSleepingAlterations(boolean sleepingAlterations) {
		this.sleepingAlterations = sleepingAlterations;
	}

	public String getWhichSleepingAlterarions() {
		return whichSleepingAlterarions;
	}

	public void setWhichSleepingAlterarions(String whichSleepingAlterarions) {
		this.whichSleepingAlterarions = whichSleepingAlterarions;
	}

	public String getSinceWhenSleepingAlterarions() {
		return sinceWhenSleepingAlterarions;
	}

	public void setSinceWhenSleepingAlterarions(String sinceWhenSleepingAlterarions) {
		this.sinceWhenSleepingAlterarions = sinceWhenSleepingAlterarions;
	}

	public boolean isAlimentaryAlterations() {
		return alimentaryAlterations;
	}

	public void setAlimentaryAlterations(boolean alimentaryAlterations) {
		this.alimentaryAlterations = alimentaryAlterations;
	}

	public String getWhichAlimentaryAlterations() {
		return whichAlimentaryAlterations;
	}

	public void setWhichAlimentaryAlterations(String whichAlimentaryAlterations) {
		this.whichAlimentaryAlterations = whichAlimentaryAlterations;
	}

	public String getSinceWhenAlimentaryAlterations() {
		return sinceWhenAlimentaryAlterations;
	}

	public void setSinceWhenAlimentaryAlterations(String sinceWhenAlimentaryAlterations) {
		this.sinceWhenAlimentaryAlterations = sinceWhenAlimentaryAlterations;
	}

	public String getMoodChanges() {
		return moodChanges;
	}

	public void setMoodChanges(String moodChanges) {
		this.moodChanges = moodChanges;
	}

	public String getSinceWhenMoodChanges() {
		return sinceWhenMoodChanges;
	}

	public void setSinceWhenMoodChanges(String sinceWhenMoodChanges) {
		this.sinceWhenMoodChanges = sinceWhenMoodChanges;
	}

	public String getPresuntiveDiagnostic() {
		return presuntiveDiagnostic;
	}

	public void setPresuntiveDiagnostic(String presuntiveDiagnostic) {
		this.presuntiveDiagnostic = presuntiveDiagnostic;
	}

	public String getDerivedTo() {
		return derivedTo;
	}

	public void setDerivedTo(String derivedTo) {
		this.derivedTo = derivedTo;
	}

	public String getProfessionalWhoAttended() {
		return professionalWhoAttended;
	}

	public void setProfessionalWhoAttended(String professionalWhoAttended) {
		this.professionalWhoAttended = professionalWhoAttended;
	}

	public String getMoneyShare() {
		return moneyShare;
	}

	public void setMoneyShare(String moneyShare) {
		this.moneyShare = moneyShare;
	}

	public Date getCreation() {
		return creation;
	}

	public void setCreation(Date creation) {
		this.creation = creation;
	}

	public boolean isCiminalRecords() {
		return ciminalRecords;
	}

	public void setCiminalRecords(boolean ciminalRecords) {
		this.ciminalRecords = ciminalRecords;
	}

	public String getWhichCriminalRecords() {
		return whichCriminalRecords;
	}

	public void setWhichCriminalRecords(String whichCriminalRecords) {
		this.whichCriminalRecords = whichCriminalRecords;
	}

	public String getPatientStatus() {
		return patientStatus;
	}

	public void setPatientStatus(String patientStatus) {
		this.patientStatus = patientStatus;
	}

	public String getRecordType() {
		return recordType;
	}

	public void setRecordType(String recordType) {
		this.recordType = recordType;
	}

	public Date getBornDate() {
		return bornDate;
	}

	public void setBornDate(Date bornDate) {
		this.bornDate = bornDate;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public byte[] getGenogram() {
		return genogram;
	}
	
	public void setGenogram(byte[] genogram) {
		this.genogram = genogram;
	}
	
//	@Column(insertable = false, updatable = false)
//	@Transient
//	private MultipartFile genogramUpload;
//	
//	public void setGenogramUpload(MultipartFile genogramFile) {
//		this.genogramUpload = genogramFile;
//	}
//	public MultipartFile getGenogramUpload() {
//		return genogramUpload;
//	}

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

	public List<Therapist> getTherapists() {
		return therapists;
	}

	public void setTherapists(List<Therapist> therapists) {
		this.therapists = therapists;
	}
	
	public Person getPerson() {
		return person;
	}
	
	public void setPerson(Person person) {
		this.person = person;
	}

	public String getFamilyContact() {
		return familyContact;
	}

	public void setFamilyContact(String familyContact) {
		this.familyContact = familyContact;
	}

	public String getFamilyContactPhone() {
		return familyContactPhone;
	}

	public void setFamilyContactPhone(String familyContactPhone) {
		this.familyContactPhone = familyContactPhone;
	}

	public String getFamilyContactRelation() {
		return familyContactRelation;
	}

	public void setFamilyContactRelation(String familyContactRelation) {
		this.familyContactRelation = familyContactRelation;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}
	
}


