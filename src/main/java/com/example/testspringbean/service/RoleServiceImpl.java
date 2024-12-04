package com.example.testspringbean.service;

import com.example.testspringbean.entity.Role;
import com.example.testspringbean.repository.RoleRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RoleServiceImpl implements RoleService{

    @Autowired
    RoleRep roleRep;

    @Override
    public List<String> getRoleNameList() {
        List<String> roleNames = new ArrayList<>();
        for(Role role : roleRep.getAllRoles()){
            roleNames.add(role.getRole());
        }
        return roleNames;
    }
}
