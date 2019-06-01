package com.siapp.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter{

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http
	        .headers()
	        .frameOptions()
	        .disable()
	        .and()
			.authorizeRequests()
			.antMatchers(
					"/v2/api-docs",
                    "/configuration/ui",
                    "/swagger-resources/**",
                    "/configuration/security",
                    "/swagger-ui.html",
                    "/webjars/**",
                    "/users/findUserByName/**",
                    "/**"//REMOVER ESTO
                    ).permitAll();
			//.antMatchers("/users/**").access("hasRole('ADMIN')");
			//.antMatchers("/apiTestUtil/**").access("hasRole('GODADMIN')");
			//.antMatchers("/users/private").authenticated();
	}
	
}
