package com.example.testspringbean.dto;

import com.example.testspringbean.entity.Role;
import com.example.testspringbean.entity.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


public class UserDto {

    private int id;

    private String email;

    private String firstName;

    private String lastName;

    private int age;

    private String password;

    private List<String> roles;

    public UserDto(User user){
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.age = user.getAge();
        this.password = user.getPassword();
        this.roles = convertRolesToString(user.getRoles());
    }

    private List<String> convertRolesToString(List<Role> roles){
        List<String> rolesStringArray = new ArrayList<>();
        for(Role role : roles){
            rolesStringArray.add(role.getRole());
        }
        return rolesStringArray;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
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
}
