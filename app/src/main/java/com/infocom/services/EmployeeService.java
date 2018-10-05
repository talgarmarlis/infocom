package com.infocom.services;

import com.infocom.models.Employee;
import com.infocom.models.User;

import java.util.Collection;

public interface EmployeeService {

    Collection<Employee> findAll();

    Employee findOne(Integer id);

    Employee save(Employee employee);

    Employee update(Integer id, Employee employee);

    void delete(Integer id);
}
