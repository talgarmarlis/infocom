package com.infocom.services;

import com.infocom.models.Employee;
import com.infocom.models.User;
import com.infocom.repositories.EmployeeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
@Transactional
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository){
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Collection<Employee> findAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee findOne(Integer id) {
        return employeeRepository.findOne(id);
    }

    @Override
    public Employee save(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee update(Integer id, Employee employee) {
        Employee toBeUpdated = findOne(id);
        if (toBeUpdated == null) {
            throw new RuntimeException("TradePoint not found");
        }
        BeanUtils.copyProperties(employee, toBeUpdated, "id", "companyId");
        return toBeUpdated;
    }

    @Override
    public void delete(Integer id) {
        Employee employee = findOne(id);
        if (employee != null) {
            employeeRepository.delete(employee);
        }
    }
}
