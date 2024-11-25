package com.example.testspringbean.controller;

import com.example.testspringbean.entity.User;
import com.example.testspringbean.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserRestController {

    @Autowired
    private UserService userService;

    @GetMapping("/admin/users")
    public List<User> getUserByAdmin(ModelMap model, Authentication authentication) {
        List<User> userList = userService.listUsers();
        User authUser = (User) authentication.getPrincipal();
        model.addAttribute("users", userList);
        model.addAttribute("currentUser", authUser);
        return userList;
    }

    @GetMapping("/admin/user/{id}")
    public void deleteUser(@PathVariable(required = true) int id, HttpServletResponse response) {
//        userService.deleteUser(userService.getUserById(id));
//        List<User> userList = userService.listUsers();
//        model.addAttribute("users", userList);
//        return "redirect:/admin";
        response.setStatus(201);
    }

    @DeleteMapping("/admin/delete")
    public boolean del(HttpServletResponse response){
        response.setStatus(201);
        return true;
    }

    @GetMapping("/admin/delete")
    public boolean del2(HttpServletResponse response){
        response.setStatus(201);
        return true;
    }
}
