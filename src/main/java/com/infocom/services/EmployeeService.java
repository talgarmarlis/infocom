package com.infocom.services;

import com.infocom.models.Employee;
import com.infocom.models.User;

import java.util.Collection;

public interface EmployeeService {

    Collection<Employee> findAll();

    Employee findOne(Integer id);

    Employee save(Employee tradePoint);

    Employee update(Integer id, Employee tradePoint, Boolean isAdmin);

    void delete(Integer id);

    Collection<Employee> getByUser(User currenUser);
}
