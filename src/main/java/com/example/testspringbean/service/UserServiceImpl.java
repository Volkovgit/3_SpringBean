package com.example.testspringbean.service;

import com.example.testspringbean.entity.User;
import com.example.testspringbean.repository.RoleRep;
import com.example.testspringbean.repository.UserRep;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        user.addRole(roleRep.getRoleByName("ROLE_USER"));
        userRep.saveUser(user);
    }

    @Override
    public void deleteUser(User user) {
        userRep.deleteUser(user);
    }

    @Override
    public void updateUser(User newUser) {
        userRep.updateUser(newUser);
    }

}
