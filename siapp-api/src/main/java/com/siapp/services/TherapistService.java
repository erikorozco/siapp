package com.siapp.services;

import java.util.List;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.siapp.constants.Model;
import com.siapp.exceptions.ResourceAlreadyExistsException;
import com.siapp.exceptions.ResourceNotFoundException;
import com.siapp.models.Role;
import com.siapp.models.Therapist;
import com.siapp.models.UserTokenDetails;
import com.siapp.repositories.TherapistRepository;
import com.siapp.utilities.IgnoredProperties;

@Service
public class TherapistService {

	@Autowired
	TherapistRepository therapistRepository;
	
	@Autowired
	CustomUserDetailsService tokenService;
	
	public List<Therapist> getAllTherapists() {
        return therapistRepository.findAll();
    }
	
	public Therapist findById(Integer id){
		return therapistRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Therapist", "id", id));
	}
	
	public Therapist update(Integer id, Therapist terapistDetails) {
        Therapist terapist = therapistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Therapist", "id", id));
        
        BeanUtils.copyProperties(terapistDetails, terapist, IgnoredProperties.getIgnoredProperties(Model.THERPIST));
        return therapistRepository.save(terapist);
	}
	
	public Therapist create(Therapist therapist) throws ResourceAlreadyExistsException {
		return therapistRepository.save(therapist);
	}
	
	public ResponseEntity<?> delete(Integer id) {
		Therapist therapist = therapistRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Therapist", "id", id));

		therapistRepository.delete(therapist);

        return ResponseEntity.ok().build();
	}

	public List<Integer> getAssignedRecrodsId(Integer therapistId) {
		return therapistRepository.getAssignedRecrodsId(therapistId);

	}

	public boolean isAllowedToRecord(Integer therapistId, Integer recordId) {
		Integer recordPermission = therapistRepository.getRecordPermission(therapistId, recordId);
		UserTokenDetails user = tokenService.getUserTokenDetails();
		boolean isAdmin = false;
		for (Role role : user.getAppUser().getRoles()) {
			if (role.getName().equals("ADMIN") || role.getName().equals("SUPERADMIN")) {
				isAdmin = true;
			}
		}
		return (recordPermission > 0 || isAdmin);
	}
	
}
