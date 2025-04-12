package entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.quarkus.security.jpa.Password;
import io.quarkus.security.jpa.Roles;
import io.quarkus.security.jpa.UserDefinition;
import io.quarkus.security.jpa.Username;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(
        name = "tb_users",
        indexes = {
                @Index(columnList = "email"),
                @Index(columnList = "confirmation_token"),
                @Index(columnList = "provider_id")
        }
)
@UserDefinition
public class User extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Username
    @Email
    @NotBlank
    @Column(unique = true, nullable = false, length = 255)
    private String email;

    @Password
    @Column(nullable = false)
    private String password;

    @Roles
    @ElementCollection
    @CollectionTable(name = "user_roles")
    private List<String> roles = new ArrayList<>();

    @NotBlank
    @Column(nullable = false, length = 100)
    private String name;

    @NotBlank
    @Column(name = "last_name", length = 100)
    private String lastName;

    @Column(length = 512)
    private String coverUrl;

    // Autenticação com redes sociais
    @Column(length = 50)
    private String provider;

    @Column(name = "provider_id", unique = true, length = 255)
    private String providerId;

    @OneToMany(
            mappedBy = "user",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Profile> profiles = new ArrayList<>();

    @Column(nullable = false)
    private Boolean active = false;

    @Column(nullable = false)
    private Boolean confirmed = false;

    @Column(name = "confirmed_at")
    private LocalDateTime confirmedAt;

    // Tokens de recuperação
    @Column(name = "confirmation_token", length = 100)
    private String confirmationToken;

    @Column(name = "confirmation_token_created_at")
    private LocalDateTime confirmationTokenCreatedAt;

    @Column(name = "recovery_token", length = 100)
    private String recoveryToken;

    @Column(name = "recovery_token_created_at")
    private LocalDateTime recoveryTokenCreatedAt;

    // Histórico de emails
    @Column(name = "last_email", length = 255)
    private String lastEmail;

    @Column(name = "email_change_token", length = 100)
    private String emailChangeToken;

    @Column(name = "email_change_token_created_at")
    private LocalDateTime emailChangeTokenCreatedAt;

    // Informações de acesso
    @Column(name = "last_sign_in")
    private LocalDateTime lastSignIn;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public static void add (String email, String password, String roles) {
        User user = new User();
        user.email = email;
        user.password = password;
        user.roles.add("USER");
        user.persist();
    }

    public void addProfile(Profile profile) {
        profiles.add(profile);
        profile.setUser(this);
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getCoverUrl() {
        return coverUrl;
    }

    public void setCoverUrl(String coverUrl) {
        this.coverUrl = coverUrl;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public List<Profile> getProfiles() {
        return profiles;
    }

    public void setProfiles(List<Profile> profiles) {
        this.profiles = profiles;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Boolean getConfirmed() {
        return confirmed;
    }

    public void setConfirmed(Boolean confirmed) {
        this.confirmed = confirmed;
    }

    public LocalDateTime getConfirmedAt() {
        return confirmedAt;
    }

    public void setConfirmedAt(LocalDateTime confirmedAt) {
        this.confirmedAt = confirmedAt;
    }

    public String getConfirmationToken() {
        return confirmationToken;
    }

    public void setConfirmationToken(String confirmationToken) {
        this.confirmationToken = confirmationToken;
    }

    public LocalDateTime getConfirmationTokenCreatedAt() {
        return confirmationTokenCreatedAt;
    }

    public void setConfirmationTokenCreatedAt(LocalDateTime confirmationTokenCreatedAt) {
        this.confirmationTokenCreatedAt = confirmationTokenCreatedAt;
    }

    public String getRecoveryToken() {
        return recoveryToken;
    }

    public void setRecoveryToken(String recoveryToken) {
        this.recoveryToken = recoveryToken;
    }

    public LocalDateTime getRecoveryTokenCreatedAt() {
        return recoveryTokenCreatedAt;
    }

    public void setRecoveryTokenCreatedAt(LocalDateTime recoveryTokenCreatedAt) {
        this.recoveryTokenCreatedAt = recoveryTokenCreatedAt;
    }

    public String getLastEmail() {
        return lastEmail;
    }

    public void setLastEmail(String lastEmail) {
        this.lastEmail = lastEmail;
    }

    public String getEmailChangeToken() {
        return emailChangeToken;
    }

    public void setEmailChangeToken(String emailChangeToken) {
        this.emailChangeToken = emailChangeToken;
    }

    public LocalDateTime getEmailChangeTokenCreatedAt() {
        return emailChangeTokenCreatedAt;
    }

    public void setEmailChangeTokenCreatedAt(LocalDateTime emailChangeTokenCreatedAt) {
        this.emailChangeTokenCreatedAt = emailChangeTokenCreatedAt;
    }

    public LocalDateTime getLastSignIn() {
        return lastSignIn;
    }

    public void setLastSignIn(LocalDateTime lastSignIn) {
        this.lastSignIn = lastSignIn;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

}