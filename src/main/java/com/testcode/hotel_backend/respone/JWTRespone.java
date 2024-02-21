package com.testcode.hotel_backend.respone;

import lombok.Data;

import java.util.List;

@Data
public class JWTRespone {
    private Long id;
    private String email;
    private String token;
    private String type = " admin";
    private List<String> roles;

    public JWTRespone(Long id, String email, String token, List<String> roles){
        this.id = id;
        this.email = email;
        this.token = token;
        this.roles = roles;
    }
}
