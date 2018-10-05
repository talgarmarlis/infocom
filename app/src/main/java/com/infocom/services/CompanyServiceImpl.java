package com.infocom.services;

import com.infocom.models.Company;
import com.infocom.repositories.CompanyRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
@Transactional
public class CompanyServiceImpl implements CompanyService{

    private final CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository){
        this.companyRepository = companyRepository;
    }

    @Override
    public Collection<Company> findAll() {
        return companyRepository.findAll();
    }

    @Override
    public Company findOne(Integer companyId) {
        return companyRepository.findOne(companyId);
    }

    @Override
    public Company save(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public Company update(Integer companyId, Company company) {
        Company toBeUpdated = findOne(companyId);
        if (toBeUpdated == null) {
            throw new RuntimeException("Company not found");
        }
        BeanUtils.copyProperties(company, toBeUpdated, "id");
        return toBeUpdated;
    }

    @Override
    public void delete(Integer companyId) {
        Company company = findOne(companyId);
        if (company != null) {
            companyRepository.delete(company);
        }
    }
}
