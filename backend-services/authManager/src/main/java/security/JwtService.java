package security;

import entity.User;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;

import java.time.Duration;
import java.time.Instant;

@ApplicationScoped
public class JwtService {

    @Transactional
    public String generateJwt(User user){
        Instant now = Instant.now();
        Instant expire = now.plus(Duration.ofHours(2));
        return Jwt.issuer("http://api.sors.com.br:8080")
                .subject(user.getEmail())
                .claim("name", user.getName())
                .claim("roles", user.getRoles())
                .audience("http://api.sors.com.br:8080")
                .issuedAt(now)
                .expiresAt(expire)
                .sign();
    }

}
