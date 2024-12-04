package com.example.testspringbean.controller;

import com.example.testspringbean.entity.User;
import com.example.testspringbean.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//import javax.validation.Valid;


@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String mainPage(ModelMap model, Authentication authentication) {
        User authUser = (User) authentication.getPrincipal();
        Boolean userHasAdminRole = authUser.userHasRole("ROLE_ADMIN");
        model.addAttribute("currentUser", authUser);
        model.addAttribute("userHasAdminRole",userHasAdminRole);
        return "mainPage";
    }
}
