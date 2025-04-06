package com.sors.dto;

public class TokenResponse {
    private String token;

    private TokenResponse() {}

    public TokenResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
