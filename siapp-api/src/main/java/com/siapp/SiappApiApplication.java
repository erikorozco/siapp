package com.siapp;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.siapp.services.FileService;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableJpaAuditing
@EnableSwagger2
@SpringBootApplication
public class SiappApiApplication implements CommandLineRunner {
	
	@Resource
	FileService fileService;
    
    @Bean
    public PasswordEncoder getPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }
    
    @PostConstruct
    public void init(){
        //TimeZone.setDefault(TimeZone.getTimeZone("GMT-5"));
    	//System.setProperty("user.timezone", "UTC");
    }
    
	public static void main(String[] args) {
		SpringApplication.run(SiappApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		fileService.init();
		
	}

}

