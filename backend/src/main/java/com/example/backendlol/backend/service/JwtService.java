    package com.example.backendlol.backend.service;

    import io.jsonwebtoken.Claims;
    import io.jsonwebtoken.Jwts;
    import io.jsonwebtoken.SignatureAlgorithm;
    import org.springframework.stereotype.Service;

    import java.util.Date;

    @Service
    public class JwtService {

        private static final String SECRET_KEY = "U2FsdGVkX1+Z5q5g5jMk5Q5xQ2pOwYwQ8Ew4oBF5d9U=";
        private static final long EXPIRATION_TIME = 864000; 

        public String generateToken(String username) {
            return Jwts.builder()
                    .setSubject(username)
                    .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                    .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                    .compact();
        }

        public Claims extractClaims(String token) {
            try {
                return Jwts.parser()
                    .setSigningKey(SECRET_KEY)
                    .parseClaimsJws(token)
                    .getBody();
            } catch (Exception e) {
                throw new RuntimeException("Invalid token");
            }
        }

        public String getUsername(String token) {
            return extractClaims(token).getSubject();
        }

        public boolean isTokenExpired(String token) {
            return extractClaims(token).getExpiration().before(new Date());
        }

        public boolean validateToken(String token, String username) {
            return (username.equals(getUsername(token)) && !isTokenExpired(token));
        }
        
    }
