package com.dodgegame.demo.security;

import java.security.Key;
import java.util.Date;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTService {
    private static final String SECRET = "mysecretkeymysecretkeymysecretkey12";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());
    public String generateToken(String email){
        return Jwts.builder().setSubject(email).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis()+1000L*60*60*24)).signWith(key).compact();
    }
    public String extractEmail(String token){
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }
    private boolean isTokenExpired(String token) {

    return extractExpiration(token).before(new Date());
}
private Date extractExpiration(String token) {

    return Jwts.parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getExpiration();
}
    public boolean validateToken(String token,UserDetails userDetails){
        final String email = extractEmail(token);

    return email.equals(userDetails.getUsername())
            && !isTokenExpired(token);
    }
}
