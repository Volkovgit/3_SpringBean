package com.example.testspringbean.repository;


import com.example.testspringbean.entity.Role;

import java.util.List;

public interface RoleRep {
    public Role getRoleByName(String roleName);

    public List<Role> getAllRoles();
}
