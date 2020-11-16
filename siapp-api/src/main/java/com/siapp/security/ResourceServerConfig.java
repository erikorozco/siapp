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
                    "/users/tokenDetails"
                    ).permitAll()
			//.antMatchers("/api/sessions").access("hasRole('USER')")
			//.antMatchers("/api/users").access("hasRole('ADMIN')");
			//.antMatchers("/apiTestUtil/**").access("hasRole('SUPERADMIN')")
			//.antMatchers("/**").authenticated()
			.antMatchers("/users/getAllUsers").access("hasRole('ADMIN') or hasRole('ADMINISTRATIVE') OR hasRole('SUBADMIN')")
			.antMatchers("/users/**").access("hasRole('ADMIN') or hasRole('ADMINISTRATIVE')");
	}
	
//	@Override
//	public void configure(HttpSecurity http) throws Exception {
//        http
//        .authorizeRequests()
//        	.antMatchers("/users/**").access("hasRole('SUPERADMIN')")
//          .and()
//        .httpBasic()
//        .and()
//        .cors();
//	}
	
}
