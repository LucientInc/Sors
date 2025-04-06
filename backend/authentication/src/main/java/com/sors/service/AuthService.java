package com.sors.service;


import com.sors.dto.LoginDTO;
import com.sors.dto.RegisterDTO;
import com.sors.dto.TokenResponse;
import com.sors.entity.User;
import com.sors.util.JwtUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

@ApplicationScoped
public class AuthService {

    @Inject
    JwtUtil jwtUtil;

    public TokenResponse login(LoginDTO loginDTO) {
        User user = User.findByUsername(loginDTO.getUsername());
        if (user == null) {
            throw new RuntimeException("Credenciais inválidas!");
        }
        if(User.checkPassword(loginDTO.getPassword(), user.getPassword())) {
            String token = jwtUtil.createToken(user);
            return new TokenResponse(token);
        }else {
            throw new RuntimeException("Credenciais inválidas!");
        }
    }

    @Transactional
    public TokenResponse register(RegisterDTO registerDTO) {
        if (registerDTO.getUsername() == null || registerDTO.getUsername().isBlank()) {
            throw new RuntimeException("Credenciais inválidas: username é obrigatório");
        }
        if(User.findByUsername(registerDTO.getUsername()) != null) {
            throw new RuntimeException("Usúario já está cadastrado!");
        }
        if(registerDTO.getPassword() == null || registerDTO.getPassword().length() < 6) {
            throw new RuntimeException("Senha invalida!");
        }
        User user = new User();
        user.setUsername(registerDTO.getUsername());
        user.setPassword(registerDTO.getPassword());
        user.setRole("USER");
        user.hashPassword();
        user.persist();
        return new TokenResponse(jwtUtil.createToken(user));
    }

}
