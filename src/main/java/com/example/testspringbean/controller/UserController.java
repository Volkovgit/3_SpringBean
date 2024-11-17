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
        System.out.println("USER PAGE");
        User authUser = (User) authentication.getPrincipal();
        model.addAttribute("user", authUser);
        return "users";
    }


    @GetMapping("/admin")
    public String getUserByAdmin(ModelMap model) {
        System.out.println("ADMIN PAGE");
        List<User> userList = userService.listUsers();
        model.addAttribute("users", userList);
        return "admin";
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
        System.out.println(user);
        if (user == null) return "redirect:/admin";
        model.addAttribute("user", user);
        return "userEdit";
    }

    @PostMapping("/admin/user/update/{id}")
    public String saveUser(@PathVariable(required = true) int id, @ModelAttribute("user") User userFromRequest) {
        userService.updateUser(id, userFromRequest);
        return "redirect:/admin";
    }

    @GetMapping("/admin/user/create")
    public String showEditUserPage() {
        return "userAdd";
    }

    @PostMapping("/admin/user/create")
    public String createUser( @ModelAttribute("user") User userFromRequest) {
        System.out.println(userFromRequest);
        userService.saveUser(userFromRequest);
        return "redirect:/admin";
    }
}
