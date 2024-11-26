package com.example.testspringbean.config;

import com.example.testspringbean.handler.LoginSuccessHandler;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final LoginSuccessHandler successHandler;
    private UserDetailsService userDetailService;

    public SecurityConfig(@Qualifier("userDetailServiceImpl") UserDetailsService userDetailsService, LoginSuccessHandler successHandler) {
        this.userDetailService = userDetailsService;
        this.successHandler = successHandler;
    }

    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailService).passwordEncoder(passwordEncoder()); // конфигурация для прохождения аутентификации
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//        System.out.println(http);
        http.authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/admin/**").hasRole("ADMIN")
                        .requestMatchers("/admin").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .csrf(csrf->csrf.disable())
                .logout(logout -> logout.logoutSuccessUrl("/login"))
                .formLogin(Customizer.withDefaults())
                .formLogin(form->form.successHandler(this.successHandler));
        return http.build();
        // Комментарий по .csrf(csrf->csrf.disable())
        // К сожалению я не нашел другого исправления ситуации.
        // Пробовал менять корсы - не помогло. Но отключение csrf сразу помогло
        // Без этого у меня становятся недоступным метод DELETE. Любой запрос (из под админа) будет падать в 403 FORBIDDEN
        // Ради интереса можно закоментить строку и попробовать вызвать DELETE /admin/user/{id}
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }
}
