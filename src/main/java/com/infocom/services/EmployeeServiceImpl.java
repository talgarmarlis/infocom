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

    private final EmployeeRepository tradePointRepository;

    public EmployeeServiceImpl(EmployeeRepository tradePointRepository){
        this.tradePointRepository = tradePointRepository;
    }

    @Override
    public Collection<Employee> findAll() {
        return tradePointRepository.findAll();
    }

    @Override
    public Employee findOne(Integer id) {
        return tradePointRepository.findOne(id);
    }

    @Override
    public Employee save(Employee tradePoint) {
        return tradePointRepository.save(tradePoint);
    }

    @Override
    public Employee update(Integer id, Employee tradePoint, Boolean isAdmin) {
        Employee toBeUpdated = findOne(id);
        if (toBeUpdated == null) {
            throw new RuntimeException("TradePoint not found");
        }
        if(isAdmin) BeanUtils.copyProperties(tradePoint, toBeUpdated, "id", "companyId");
        else BeanUtils.copyProperties(tradePoint, toBeUpdated, "id", "companyId", "userId");
        return toBeUpdated;
    }

    @Override
    public void delete(Integer id) {
        Employee tradePoint = findOne(id);
        if (tradePoint != null) {
            tradePointRepository.delete(tradePoint);
        }
    }

    @Override
    public Collection<Employee> getByUser(User currenUser) {
        return tradePointRepository.findByUserId(currenUser.getId());
    }
}
