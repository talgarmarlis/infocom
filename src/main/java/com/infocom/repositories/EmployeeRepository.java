package com.infocom.repositories;

import com.infocom.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    Collection<Employee> findByUserId(Integer userId);
}
