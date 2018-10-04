package com.infocom.services;

import com.infocom.config.TokenProvider;
import com.infocom.models.User;
import com.infocom.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Collection;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public Collection<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findOne(Integer userId) {
        return userRepository.findOne(userId);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User update(Integer userId, User user) {
        User toBeUpdated = findOne(userId);
        if (toBeUpdated == null) {
            throw new RuntimeException("User not found");
        }
        BeanUtils.copyProperties(user, toBeUpdated, "id", "username", "password");
        return toBeUpdated;
    }

    @Override
    public void delete(Integer userId) {
        User user = findOne(userId);
        if (user != null) {
            userRepository.delete(user);
        }
    }

    public String authenticate(User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            return tokenProvider.createToken(authentication);
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @Override
    public User getByUsername(String username) {
        return userRepository.findAll().stream().filter(u ->
                u.getUsername().equals(username)).findFirst().orElse(null);
    }

}
