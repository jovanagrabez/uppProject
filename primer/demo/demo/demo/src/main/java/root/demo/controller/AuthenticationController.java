package root.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import root.demo.model.User;
import root.demo.security.TokenUtils;
import root.demo.security.auth.JwtAuthenticationRequest;
import root.demo.services.CustomUserDetailsService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {


    @Autowired
    private TokenUtils tokenUtils;


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;



    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<String> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest) throws AuthenticationException {
  System.out.println("USAAAAAOOOOOOO");
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                authenticationRequest.getUsername(),
                authenticationRequest.getPassword());
     try {
         final Authentication authentication = authenticationManager.authenticate(token);


         // Ubaci username + password u kontext
         SecurityContextHolder.getContext().setAuthentication(authentication);

         // Kreiraj token
         User user = (User) authentication.getPrincipal();

         System.out.println("TOOOKEEEN" + user.getUsername());
         String jwt = tokenUtils.generateToken(user);
         int expiresIn = tokenUtils.getExpiredIn();

         // new UserTokenState(jwt, expiresIn)
         // Vrati token kao odgovor na uspesno autentifikaciju
         HttpHeaders headers = new HttpHeaders();
         System.out.println(jwt);
         headers.add("Authorization: Bearer", jwt);
         return ResponseEntity.ok().headers(headers).build();
     } catch (Exception e){
         return ResponseEntity.notFound().build();
     }

    }



    @RequestMapping(value = "/change-password", method = RequestMethod.POST)
    public ResponseEntity<?> changePassword(@RequestBody PasswordChanger passwordChanger) {
        //userDetailsService.changePassword(passwordChanger.oldPassword, passwordChanger.newPassword);

        Map<String, String> result = new HashMap<>();
        result.put("result", "success");
        return ResponseEntity.accepted().body(result);
    }

    static class PasswordChanger {
        public String oldPassword;
        public String newPassword;
    }
}
