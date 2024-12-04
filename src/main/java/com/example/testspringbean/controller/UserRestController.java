package com.example.testspringbean.controller;

import com.example.testspringbean.dto.UserDto;
import com.example.testspringbean.entity.User;
import com.example.testspringbean.service.RoleService;
import com.example.testspringbean.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class UserRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/user")
    public UserDto getCurrentUser(Authentication authentication){
        return new UserDto((User) authentication.getPrincipal());
    }

    @GetMapping("/admin/user")
    public List<UserDto> getUserByAdmin() {
        List<UserDto> userDtoList = new ArrayList<>();
        for(User user : userService.listUsers()){
            userDtoList.add(new UserDto(user));
        }
        return userDtoList;
    }


    @GetMapping("/admin/user/{id}")
    public UserDto getUserById(@PathVariable(required = true) int id){
        return new UserDto(userService.getUserById(id));
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

    @GetMapping("/admin/role")
    public List<String> getRoleNameList(){
        return roleService.getRoleNameList();
    }

}
