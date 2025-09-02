package br.ufac.sgcmapi.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class FiltroCors {

    @Bean
    CorsFilter corsFilter() {
        var config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://127.0.0.1:5500", "http://localhost:4200", "https://ronauro-sgcmapp.srv750236.hstgr.cloud"));
        config.setAllowedMethods(Arrays.asList("*"));
        config.setAllowedHeaders(Arrays.asList("*"));
        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
    
}
