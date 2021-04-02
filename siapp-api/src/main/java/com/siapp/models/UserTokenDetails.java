package com.siapp.models;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

public class UserTokenDetails implements UserDetails {

	private static final long serialVersionUID = 1L;
	private User user;

	public UserTokenDetails(User user) {
		this.user = user;
	}

	@Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    	
        final List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(
        		this.user.getRoles()
                .stream()
                .map(r -> "ROLE_" + r.getName().toUpperCase())
                .collect(Collectors.toList())
                .toArray(new String[]{}));
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
    	return this.user.isActive();
    }

    @Override
    public boolean isAccountNonLocked() {
    	return this.user.isActive();
    }

    @Override
    public boolean isCredentialsNonExpired() {
    	return this.user.isActive();
    }

    @Override
    public boolean isEnabled() {
    	return this.user.isActive();
    }

    public User getAppUser() {
        return user;
    }
	
}
