package com.siapp;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.persistence.EntityManagerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.siapp.models.Role;
import com.siapp.models.User;
import com.siapp.services.UserService;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableJpaAuditing
@EnableSwagger2
@SpringBootApplication
public class SiappApiApplication {
	
//    @Bean
//    public CommandLineRunner setupDefaultUser(UserService service) {
//        return args -> {
//            service.create(new User(
//                    "user", //username
//                    "user", //password
//                    Arrays.asList(new Role(2)),//roles 
//                    true//Active
//            ));
//        };
//    }
    
    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
    
	public static void main(String[] args) {
		SpringApplication.run(SiappApiApplication.class, args);
	}

}

