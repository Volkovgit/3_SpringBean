package com.example.testspringbean.controller;

import com.example.testspringbean.entity.User;
import com.example.testspringbean.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserRestController {

    @Autowired
    private UserService userService;

    @GetMapping("/admin/user")
    public List<User> getUserByAdmin(ModelMap model, Authentication authentication) {
        List<User> userList = userService.listUsers();
        User authUser = (User) authentication.getPrincipal();
        model.addAttribute("users", userList);
        model.addAttribute("currentUser", authUser);
        return userList;
    }

    @DeleteMapping("/admin/user/{id}")
    public void deleteUser(@PathVariable(required = true) int id){
        userService.deleteUser(id);
    }

    @PutMapping("/admin/user/{id}")
    public void updateUser(@PathVariable(required = true) int id,@RequestBody User user) {
        user.setId(id);
        userService.updateUser(user);
    }

    @PostMapping("/admin/user")
    public void createUser(@RequestBody User body,HttpServletResponse response) {
        if(body.getEmail()==null||body.getFirstName()==null||body.getLastName()==null)response.setStatus(400);
        else{
            userService.saveUser(body);
        }
    }

}
