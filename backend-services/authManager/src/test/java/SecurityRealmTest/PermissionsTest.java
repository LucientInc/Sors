package SecurityRealmTest;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.get;
import static io.restassured.RestAssured.given;
import static org.hamcrest.core.Is.is;

import org.apache.http.HttpStatus;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class PermissionsTest{

    @Test
    void deveTestarConexaoPublica(){
        get("/api/v1/hello").then().statusCode(HttpStatus.SC_OK);
    }

    @Test
    void deveDarErroAoConectarRotaProtegida(){
        get("/api/v1/protected/hello").then().statusCode(HttpStatus.SC_UNAUTHORIZED);
    }



}
