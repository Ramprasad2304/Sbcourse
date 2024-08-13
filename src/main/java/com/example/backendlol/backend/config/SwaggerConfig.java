package com.example.backendlol.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI defineApi() {
        Server server = new Server();
        server.setUrl("http://localhost:8080");
        server.setDescription("WorkForce Management Application");

        Info info = new Info().title("workforce").version("1.0").description("Swagger testing phase");

        SecurityScheme securityScheme = new SecurityScheme()
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT");

        return new OpenAPI()
                .addServersItem(server)
                .info(info)
                .components(new io.swagger.v3.oas.models.Components()
                        .addSecuritySchemes("bearerAuth", securityScheme))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}
