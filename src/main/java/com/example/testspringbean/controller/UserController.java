package com.example.testspringbean.controller;

import com.example.testspringbean.entity.User;
import com.example.testspringbean.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
//import javax.validation.Valid;


@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public String getUser(ModelMap model, Authentication authentication) {
        User authUser = (User) authentication.getPrincipal();
        model.addAttribute("user", authUser);
        return "userInfo";
    }


    @GetMapping("/admin")
    public String getUserByAdmin(ModelMap model,Authentication authentication) {
        List<User> userList = userService.listUsers();
        User authUser = (User) authentication.getPrincipal();
        model.addAttribute("users", userList);
        model.addAttribute("currentUser", authUser);
        return "adminPage";
    }

    @GetMapping("/admin/user/delete/{id}")
    public String deleteUser(ModelMap model, @PathVariable(required = true) int id) {
        userService.deleteUser(userService.getUserById(id));
        List<User> userList = userService.listUsers();
        model.addAttribute("users", userList);
        return "redirect:/admin";
    }

    @GetMapping("/admin/user/update/{id}")
    public String editUser(ModelMap model, @PathVariable(required = true) int id) {
        User user = userService.getUserById(id);
        if (user == null) return "redirect:/admin";
        model.addAttribute("user", user);
        return "editUser";
    }

    @PostMapping("/admin/user/update")
    public String updateUser(@ModelAttribute("user") User userFromRequest) {
        userService.updateUser(userFromRequest);
        return "redirect:/admin";
    }

    @GetMapping("/admin/user/create")
    public String showEditUserPage() {
        return "createUser";
    }

    @PostMapping("/admin/user/create")
    public String createUser( @ModelAttribute("user") User userFromRequest) {
        System.out.println(userFromRequest);
        userService.saveUser(userFromRequest);
        return "redirect:/admin";
    }
}
