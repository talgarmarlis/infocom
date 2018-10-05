package com.infocom.config;

import com.infocom.models.User;
import com.infocom.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetails implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final User myUser = userService.getByUsername(username);
        if(myUser.getIsAdmin()){
            return new org.springframework.security.core.userdetails.User(
                    myUser.getUsername(), myUser.getPassword(), AuthorityUtils.createAuthorityList("ROLE_ADMIN"));
        }
        return new org.springframework.security.core.userdetails.User(
                myUser.getUsername(), myUser.getPassword(), AuthorityUtils.createAuthorityList("ROLE_USER"));
    }
}
