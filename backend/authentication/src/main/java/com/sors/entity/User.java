package com.sors.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.*;


import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.elytron.security.common.BcryptUtil;

@Entity
@Table(name = "tb_users")
public class User extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;

    @Column(unique = true)
    private String username;

    @Column
    private String password;

    @Column
    private String role;

    // Getters e Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public static User findByUsername(String username) {
        return find("username", username).firstResult();
    }

    public static boolean checkPassword(String plainPassword, String hashedPassword) {
        return BcryptUtil.matches(plainPassword, hashedPassword);
    }

    public void hashPassword() {
        this.password = BcryptUtil.bcryptHash(this.password);
    }
}