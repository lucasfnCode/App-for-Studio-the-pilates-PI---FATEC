package br.com.semesperanca.app.managing.pilates.studios.model.student;


import br.com.semesperanca.app.managing.pilates.studios.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.stream.Collectors;


@Document(collection = "Usuarios")
@Getter
@Setter
@NoArgsConstructor
@SuperBuilder

public class Student extends User {

    @NonNull
    private Assessment assessment;

    private PlanStudent plan;

    private ClientArea clientArea;

    @NonNull
    private String progress;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
    }

    @Override
    public String getUsername() {
        return this.getCpf();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.getIsActive();
    }
}
