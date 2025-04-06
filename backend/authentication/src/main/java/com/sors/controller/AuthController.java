package com.sors.controller;

import com.sors.dto.LoginDTO;
import com.sors.dto.RegisterDTO;
import com.sors.dto.TokenResponse;
import com.sors.service.AuthService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.SecurityContext;
import org.eclipse.microprofile.jwt.JsonWebToken;

@Path("/v1/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AuthController {

    private final AuthService authService;
    private final JsonWebToken jwt;
    public AuthController(AuthService authService, JsonWebToken jwt) {
        this.authService = authService;
        this.jwt = jwt;
    }

    @POST
    @Path("/login")
    @PermitAll
    public TokenResponse login(LoginDTO loginDTO) {
        return authService.login(loginDTO);
    }

    @POST
    @Path("/register")
    @PermitAll
    public Response registrar(RegisterDTO registerDTO) {
        try {
            System.out.println("Recebido registro para: " + registerDTO.getUsername());
            TokenResponse token = authService.register(registerDTO);
            return Response.status(Response.Status.CREATED).entity(token).build();
        } catch (Exception e) {
            System.err.println("Erro no registro: " + e.getMessage());
            e.printStackTrace();
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/me")
    @RolesAllowed({"user", "admin"})
    public String getUsuarioInfo(@Context SecurityContext securityContext) {
        String username = securityContext.getUserPrincipal().getName();
        return "Usuário autenticado: " + username + ", Roles: " + jwt.getGroups();
    }

    @GET()
    @Path("/hello")
    public Response hello(){
        return Response.ok("hello").build();
    }

}
