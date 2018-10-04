package com.infocom.controllers;

import com.infocom.models.Employee;
import com.infocom.models.User;
import com.infocom.services.EmployeeService;
import com.infocom.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/points")
public class EmployeeController {

    @Autowired
    EmployeeService tradePointService;

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> list(@RequestParam(name = "companyId", required = false) Integer companyId,
                                                    HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        User currenUser = userService.getByUsername(principal.getName());
        Map<String, Object> responseBody = new HashMap<>();
        Collection<Employee> list;
        if(currenUser.getIsAdmin()) list = tradePointService.findAll();
        else list = tradePointService.getByUser(currenUser);
        if(companyId != null) list = list.stream().filter(t ->
                t.getCompanyId().equals(companyId)).collect(Collectors.toList());
        responseBody.put("data", list);
        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "list of trade points");
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> save(@RequestBody Employee tradePoint) {
        Map<String, Object> responseBody = new HashMap<>();
        Employee saved = tradePointService.save(tradePoint);
        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "trade point created");
        responseBody.put("data", saved);
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }

    @PutMapping("/{pointId}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable("pointId") Integer pointId,
                                                      @RequestBody Employee tradePoint,
                                                      HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        User currenUser = userService.getByUsername(principal.getName());
        Map<String, Object> responseBody = new HashMap<>();
        Employee point = tradePointService.findOne(pointId);
        Employee updated;
        if(!currenUser.getIsAdmin()){
            if(point.getUserId().equals(currenUser.getId())){
                updated = tradePointService.update(pointId, tradePoint, false);
            }
            else{
                responseBody.put("status", "ERROR");
                responseBody.put("message", "cannot update");
                return new ResponseEntity(responseBody, HttpStatus.FORBIDDEN);
            }
        }
        else{
            updated = tradePointService.update(pointId, tradePoint, true);
        }

        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "trade point is updated");
        responseBody.put("data", updated);
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }

    @DeleteMapping("/{pointId}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable("pointId") Integer pointId,
                                                      HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        User currenUser = userService.getByUsername(principal.getName());
        Map<String, Object> responseBody = new HashMap<>();

        Employee point = tradePointService.findOne(pointId);
        if(!currenUser.getIsAdmin() && !point.getUserId().equals(currenUser.getId())){
            responseBody.put("status", "ERROR");
            responseBody.put("message", "cannot delete");
            return new ResponseEntity(responseBody, HttpStatus.FORBIDDEN);
        }
        else{
            tradePointService.delete(pointId);
        }
        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "trade point is deleted");
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }
}
