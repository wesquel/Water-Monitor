package com.water_server.data;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.water_server.model.Permission;
import com.water_server.validation.UserCreationGroup;
import com.water_server.validation.UserUpdateGroup;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.util.List;

@JsonIgnoreProperties({"id", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled", "permissions"})
public class UserVO implements Serializable {
    
    private static final long serialVersionUID = 1L;

    private Long id;

    @NotBlank(
            message = "O nome de usuário não pode ser vazio.",
            groups = {UserCreationGroup.class, UserUpdateGroup.class}
    )
    @Size(
            min = 4, max = 50, message = "O nome de usuário deve ter no mínimo 4 e no máximo 50 caracteres.",
            groups = {UserCreationGroup.class, UserUpdateGroup.class}
    )
    private String username;

    @NotBlank(
            message = "O nome completo não pode ser vazio.",
            groups = {UserCreationGroup.class, UserUpdateGroup.class}
    )
    @Size(
            max = 100, message = "O nome de usuário não pode ter mais de 100 caracteres.",
            groups = {UserCreationGroup.class, UserUpdateGroup.class}
    )
    private String fullName;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "A senha não pode ser vazia.")
    @Size(min = 8, message = "A senha deve conter ao menos 8 caracteres.", groups = {UserCreationGroup.class})
    private String password;

    private Boolean accountNonExpired;

    private Boolean accountNonLocked;

    private Boolean credentialsNonExpired;

    private Boolean enabled;

    private List<Permission> permissions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Boolean getAccountNonExpired() {
        return accountNonExpired;
    }

    public void setAccountNonExpired(Boolean accountNonExpired) {
        this.accountNonExpired = accountNonExpired;
    }

    public Boolean getAccountNonLocked() {
        return accountNonLocked;
    }

    public void setAccountNonLocked(Boolean accountNonLocked) {
        this.accountNonLocked = accountNonLocked;
    }

    public Boolean getCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    public void setCredentialsNonExpired(Boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }
}
