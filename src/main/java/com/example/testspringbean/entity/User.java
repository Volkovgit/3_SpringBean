package com.example.testspringbean.entity;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String email;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private int age;


    @Column
    private String password;


    //todo : Надо попытаться изменить на FetchType.LAZY, но пока что я вообще не понимаю как
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;


    public User() {
    }

    public User(String name, int age, Role userRole) {
        this.email = email;
        this.age = age;
        this.roles.add(userRole);
    }

    public int getId() {
        return id;
    }

    public void setId(int id){
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public List<String> getRolesNameList() {
        List<String> userRoles = new ArrayList<>();
        for (Role role : this.roles) {
            userRoles.add(role.getRole().replace("ROLE_", ""));
        }
        return userRoles;
    }

    public void addRole(Role role) {
        if (this.roles == null) this.roles = new ArrayList<>();
        this.roles.add(role);
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return "User{id: " + this.id + ", email: " + this.email + ", age: " + this.age + ", roles:" + this.roles
                + ", firstname:" + this.firstName
                + ", lastname:" + this.lastName
                + ", password:" + this.password
                + "}";
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String getUsername() {
        return this.email;
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
        return true;
    }
}
