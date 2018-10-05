package com.infocom.controllers;

import com.infocom.models.Employee;
import com.infocom.services.EmployeeService;
import com.infocom.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.Collection;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @Autowired
    UserService userService;

    @GetMapping
    public Collection<Employee> getEmployees() {
        return employeeService.findAll();
    }

    @GetMapping("/{id}")
    public Employee getEmployee(@PathVariable("id") Integer id) {
        return employeeService.findOne(id);
    }

    @PostMapping
    public ResponseEntity<Employee> create(@RequestBody Employee employee, UriComponentsBuilder uriBuilder) {
        employee = employeeService.save(employee);
        UriComponents uriComponents = uriBuilder.path("/{id}").buildAndExpand(employee.getId());
        return ResponseEntity.created(uriComponents.toUri()).body(employee);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable("id") Integer id, @RequestBody Employee employee) {
        employeeService.update(id, employee);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Integer id) {
        employeeService.delete(id);
    }
}
