package br.com.semesperanca.app.managing.pilates.studios.application.documentation;

import io.swagger.v3.oas.models.OpenAPI;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.yaml.snakeyaml.Yaml;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class OpenApiConfig {

    @Value("classpath:docs/app-managing-pilates-studios-docs.yml")
    private Resource resource;

    @Bean
    public OpenAPI customOpenAPI() throws IOException {
        try (InputStream is = resource.getInputStream()) {
            return new Yaml().loadAs(is, OpenAPI.class);
        }
    }
}
