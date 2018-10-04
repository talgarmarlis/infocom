package com.infocom.services;

import com.infocom.models.Company;

import java.util.Collection;

public interface CompanyService {

    Collection<Company> findAll();

    Company findOne(Integer companyId);

    Company save(Company company);

    Company update(Integer companyId, Company company);

    void delete(Integer companyId);
}
