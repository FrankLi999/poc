package com.bpwizard.myresource.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

// @Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;

//    @Autowired
//    public void globalUserDetails(final AuthenticationManagerBuilder auth) throws Exception {
//        // @formatter:off
//		auth.inMemoryAuthentication()
//		  .withUser("john").password(passwordEncoder.encode("123")).roles("USER").and()
//		  .withUser("tom").password(passwordEncoder.encode("111")).roles("ADMIN").and()
//		  .withUser("user1").password(passwordEncoder.encode("pass")).roles("USER").and()
//		  .withUser("admin").password(passwordEncoder.encode("nimda")).roles("ADMIN");
//    }// @formatter:on

    

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/webjars/**","/resources/**");

    }
    
    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        // @formatter:off
		http.authorizeRequests().anyRequest().permitAll();
    }

}
