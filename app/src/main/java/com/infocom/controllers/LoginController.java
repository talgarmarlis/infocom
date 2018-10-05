package com.infocom.controllers;

import com.infocom.models.User;
import com.infocom.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    UserService userService;

    @PostMapping("/auth")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        Map<String, Object> responseBody = new HashMap<>();
        if(user.getPassword() == null || user.getUsername() == null){
            responseBody.put("status", "ERROR");
            responseBody.put("message", "Bad Request");
            return new ResponseEntity(responseBody, HttpStatus.BAD_REQUEST);
        }

        User loggedUser = userService.getByUsername(user.getUsername());
        if(loggedUser == null){
            responseBody.put("status", "ERROR");
            responseBody.put("message", "No such user");
            return new ResponseEntity(responseBody, HttpStatus.NOT_FOUND);
        }

        if(!loggedUser.getPassword().equals(user.getPassword())){
            responseBody.put("status", "ERROR");
            responseBody.put("message", "Wrong password");
            return new ResponseEntity(responseBody, HttpStatus.FORBIDDEN);
        }

        String token = userService.authenticate(loggedUser);
        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "Login successful");
        Map<String, Object> data = new HashMap<>();
        data.put("id", loggedUser.getId());
        data.put("fullname", loggedUser.getFullname());
        data.put("is_admin", loggedUser.getIsAdmin());
        data.put("auth_token", token);
        responseBody.put("data", data);
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }
}