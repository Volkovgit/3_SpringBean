package com.example.testspringbean.service;

import com.example.testspringbean.entity.Role;
import com.example.testspringbean.entity.User;
import com.example.testspringbean.repository.RoleRep;
import com.example.testspringbean.repository.UserRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRep userRep;

    @Autowired
    private RoleRep roleRep;

    public User getUserById(int userId) {
        return userRep.getUserById(userId);
    }

    public List<User> listUsers() {
        return userRep.getAllUsers();
    }

    @Override
    public void saveUser(User user) {
        user.setId(0);
        if(user.getRoles() == null) user.addRole(roleRep.getRoleByName("ROLE_USER"));
        else{
            List<Role> oldRoles = user.getRoles();
            user.setRoles(new ArrayList<>());
            for(Role role : oldRoles){
                Role roleFromDB = roleRep.getRoleByName(role.getRole());
                if( roleFromDB != null)user.addRole(roleFromDB);
            }
        }
        System.out.println("Save: "+user);
        userRep.saveUser(user);
    }

    @Override
    public void deleteUser(int id) {
        User userFromDb = getUserById(id);
        userRep.deleteUser(userFromDb);
    }

    @Override
    public void updateUser(User user) {
        userRep.updateUser(user);
    }

}
