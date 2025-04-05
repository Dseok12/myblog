package com.devblog.devblog.util;

import com.devblog.devblog.entity.User;
import com.devblog.devblog.entity.Role;  // Role import 추가
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 비밀키, 두 군데에서 동일하게 사용

    private final long EXP_TIME = 1000 * 60 * 60 * 24; // 24시간

    // ✅ 토큰 발급
    public String generateToken(User user) {
        // 토큰 생성 시 사용자 정보와 권한을 포함하여 발급
        return Jwts.builder()
                .setSubject(user.getUsername())  // 사용자 이름
                .claim("role", user.getRole().name())  // 사용자 역할 (Role enum -> String으로 저장)
                .setIssuedAt(new Date())  // 토큰 발급 시간
                .setExpiration(new Date(System.currentTimeMillis() + EXP_TIME))  // 만료 시간 설정
                .signWith(key)  // 비밀키로 서명
                .compact();  // 토큰 생성
    }

    // ✅ 만료 여부 확인
    public boolean isExpired(String token) {
        try {
            // 토큰을 파싱하여 만료 시간 확인
            return Jwts.parserBuilder().setSigningKey(key).build()
                    .parseClaimsJws(token)  // 토큰을 파싱
                    .getBody().getExpiration().before(new Date());  // 만료 시간 비교
        } catch (JwtException e) {
            // 유효하지 않은 토큰인 경우 예외 처리
            return true;
        }
    }

    // ✅ 사용자 이름 추출
    public String getUsername(String token) {
        try {
            // 토큰에서 사용자 이름을 추출
            return Jwts.parserBuilder().setSigningKey(key).build()
                    .parseClaimsJws(token)  // 토큰을 파싱
                    .getBody().getSubject();  // 사용자 이름 반환
        } catch (JwtException e) {
            return null;
        }
    }

    // ✅ 사용자 권한 추출
    public Role getRole(String token) {
        try {
            // 토큰에서 권한(roles)을 추출하고 Role enum으로 반환
            String roleName = (String) Jwts.parserBuilder().setSigningKey(key).build()
                    .parseClaimsJws(token)  // 토큰을 파싱
                    .getBody().get("role");  // 권한 반환
            return Role.valueOf(roleName); // String을 Role enum으로 변환
        } catch (JwtException e) {
            return null;
        }
    }
}
