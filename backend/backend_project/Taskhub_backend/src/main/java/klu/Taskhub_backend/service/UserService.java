package klu.Taskhub_backend.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import klu.Taskhub_backend.model.Users;
import klu.Taskhub_backend.repo.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository UR;

    @Autowired
    JwtService Jwt;

    
    // ================= SIGNUP =================

    public Object signup(Users U) {

        Map<String, Object> response = new HashMap<>();

        try {

            Object id = UR.checkByEmail(U.getEmail());

            if (id != null) {

                response.put("code", 501);
                response.put("message", "Email ID already registered");

            } else {

                U.setRole(1);
                U.setStatus(1);

                UR.save(U);

                response.put("code", 200);
                response.put("message", "User Registered Successfully");
            }

        } catch (Exception e) {

            response.put("code", 500);
            response.put("message", e.getMessage());
        }

        return response;
    }

    
    // ================= SIGNIN =================

    public Object signin(Map<String, Object> data) {

        Map<String, Object> response = new HashMap<>();

        try {

            Object role = UR.validateCredentials(
                    data.get("username").toString(),
                    data.get("password").toString()
            );

            if (role != null) {

                response.put("code", 200);

                String token = (String) Jwt.generateJWT(
                        data.get("username").toString(),
                        role
                );

                response.put("jwt", token);

            } else {

                response.put("code", 404);
                response.put("message", "Invalid Credentials");
            }

        } catch (Exception e) {

            response.put("code", 500);
            response.put("message", e.getMessage());
        }

        return response;
    }

    
    // ================= USER INFO =================

    public Object uinfo(String token) {

        Map<String, Object> response = new HashMap<>();

        try {

            Map<String, Object> payload = Jwt.validateJWT(token);

            String email = (String) payload.get("username");

            Users U = (Users) UR.findByEmail(email);

            List<Object> menulist = UR.getMenus(
                    Long.valueOf(U.getRole())
            );

            response.put("code", 200);
            response.put("fullname", U.getFullname());
            response.put("menulist", menulist);

        } catch (Exception e) {

            response.put("code", 500);
            response.put("message", e.getMessage());
        }

        return response;
    }

    
    // ================= PROFILE =================

    public Object getProfile(String token) {

        Map<String, Object> response = new HashMap<>();

        try {

            Map<String, Object> payload = Jwt.validateJWT(token);

            String email = (String) payload.get("username");

            Object user = UR.getProfile(email);

            response.put("code", 200);
            response.put("user", user);

        } catch (Exception e) {

            response.put("code", 500);
            response.put("message", e.getMessage());
        }

        return response;
    }

    
    // ================= GET ALL USERS =================

    public Object getAllUsers(int page, int size, String token) {

        Map<String, Object> response = new HashMap<>();

        try {

            // validate token
            Jwt.validateJWT(token);

            Pageable pageable = PageRequest.of(
                    page - 1,
                    size,
                    Sort.by("id").ascending()
            );

            Page<Users> users = UR.findAll(pageable);

            response.put("code", 200);
            response.put("page", page);
            response.put("size", size);
            response.put("totalpages", users.getTotalPages());
            response.put("totalrecords", users.getTotalElements());
            response.put("users", users.getContent());

        } catch (Exception e) {

            response.put("code", 500);
            response.put("message", e.getMessage());
        }

        return response;
    }
}