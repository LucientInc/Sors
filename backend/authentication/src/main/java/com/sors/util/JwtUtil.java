package com.sors.util;

import com.sors.dto.SubjectDTO;
import com.sors.entity.User;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;

import java.time.Duration;
import java.time.Instant;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@ApplicationScoped
public class JwtUtil {

    public String createToken(User user) {
        Set<String> roles = new HashSet<>(Arrays.asList(user.getRole()));
        Instant now = Instant.now();
        Instant expire = now.plus(Duration.ofDays(1));
        return Jwt.issuer("http://localhost:8080")
                .subject(user.getUsername())
                .claim(user.getUsername(), user.getPassword())
                .groups(roles)
                .audience("http://localhost:8080")
                .issuedAt(now)
                .expiresAt(expire)
                .sign();
    }

}
