package com.siapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.siapp.models.UserTokenDetails;
import com.siapp.repositories.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

//https://stackoverflow.com/questions/35056169/how-to-get-custom-user-info-from-oauth2-authorization-server-user-endpoint
//https://howtodoinjava.com/spring-boot2/oauth2-auth-server/ 
//https://www.baeldung.com/spring-security-authentication-with-a-database    
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		UserDetails ud = userRepository
//                .findByUsername(username)
//                .map(u -> new org.springframework.security.core.userdetails.User(
//                u.getUsername(),
//                u.getPassword(),
//                u.isActive(),
//                u.isActive(),
//                u.isActive(),
//                u.isActive(),
//                AuthorityUtils.createAuthorityList(
//                        u.getRoles()
//                                .stream()
//                                .map(r -> "ROLE_" + r.getName().toUpperCase())
//                                .collect(Collectors.toList())
//                                .toArray(new String[]{}))
//                ))
//                .orElseThrow(() -> new UsernameNotFoundException("No user with "
//                        + "the name " + username + "was found in the database"));
//		return ud;
//	
//    }
    
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserDetails ud = userRepository
                .findByUsername(username)
                .map(u -> new UserTokenDetails(u))
                .orElseThrow(() -> new UsernameNotFoundException("No user with "
                        + "the name " + username + "was found in the database"));
		return ud;
    }
	
	public UserTokenDetails getUserTokenDetails() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof String) {
			return null;
		}
		return (UserTokenDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}
    
}

