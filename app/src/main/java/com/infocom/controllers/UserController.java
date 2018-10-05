package com.infocom.controllers;

import com.infocom.models.User;
import com.infocom.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> list() {
        Map<String, Object> responseBody = new HashMap<>();
        Collection<User> list = userService.findAll();
        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "list of users");
        responseBody.put("data", list);
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> save(@RequestBody User user) {
        Map<String, Object> responseBody = new HashMap<>();
        User savedUser = userService.save(user);
        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "user created");
        responseBody.put("data", savedUser);
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> update(@PathVariable("userId") Integer userId, @RequestBody User user) {
        Map<String, Object> responseBody = new HashMap<>();
        User updatedUser = userService.update(userId, user);
        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "user is updated");
        responseBody.put("data", updatedUser);
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable("userId") Integer userId) {
        Map<String, Object> responseBody = new HashMap<>();
        userService.delete(userId);
        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "user is deleted");
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }
}
