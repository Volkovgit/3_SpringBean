package com.example.testspringbean.repository;


import com.example.testspringbean.entity.Role;

public interface RoleRep {
    public Role getRoleByName(String roleName);
}
