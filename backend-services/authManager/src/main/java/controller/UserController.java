package controller;

import jakarta.annotation.security.RolesAllowed;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.SecurityContext;

@Path("/api/v1")
@Produces(MediaType.APPLICATION_JSON)
public class UserController {

    @GET
    @Path("/me2")
    @RolesAllowed("USER")
    public String me(@Context SecurityContext sc) {
        return sc.getUserPrincipal().getName();
    }

}
