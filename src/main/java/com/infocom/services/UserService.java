package com.infocom.services;

import com.infocom.models.User;

import java.util.Collection;

public interface UserService {

    Collection<User> findAll();

    User findOne(Integer userId);

    User save(User user);

    User update(Integer userId, User user);

    void delete(Integer userId);

    User getByUsername(String username);

    String authenticate(User user);
}
