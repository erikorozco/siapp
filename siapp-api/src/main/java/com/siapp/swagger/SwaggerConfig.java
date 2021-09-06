package com.siapp.swagger;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {                                    

	@Bean
    public Docket api() { 
        return new Docket(DocumentationType.SWAGGER_2)
          .apiInfo(apiInfo())
          .select()                                  
          .apis(RequestHandlerSelectors.basePackage("com.siapp.controllers"))              
          .paths(PathSelectors.any())                          
          .build();
    }
    
	// http://localhost:8080/api/swagger-ui.html
 // Describe your apis
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
        .title("SIAPP Managment Rest API's")
        .description("This page lists all the rest apis for SIAPP.")
        .version("1.0-SNAPSHOT")
        .build();
    }
  
}