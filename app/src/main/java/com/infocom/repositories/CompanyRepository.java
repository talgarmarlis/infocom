package com.infocom.repositories;

import com.infocom.models.Company;
import com.infocom.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
}
