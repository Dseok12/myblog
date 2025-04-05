// 📁 backend/src/main/java/com/devblog/devblog/util/JwtUtil.java
package com.devblog.devblog.util;

import com.devblog.devblog.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private final String secret = "mySuperSecretKeyForJWTmySuperSecretKeyForJWT"; // 64바이트 이상 필요
    private final long expirationMs = 1000 * 60 * 60; // 1시간

    private final Key key = Keys.hmacShaKeyFor(secret.getBytes());

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("role", user.getRole().name())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String getUsername(String token) {
        return parseToken(token).getBody().getSubject();
    }

    public String getRole(String token) {
        return (String) parseToken(token).getBody().get("role");
    }

    public boolean isExpired(String token) {
        return parseToken(token).getBody().getExpiration().before(new Date());
    }

    private Jws<Claims> parseToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }
}