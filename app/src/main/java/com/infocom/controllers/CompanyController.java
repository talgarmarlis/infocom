package com.infocom.controllers;

import com.infocom.models.Company;
import com.infocom.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.Collection;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @GetMapping
    public Collection<Company> getCompanies() {
        return companyService.findAll();
    }

    @GetMapping("/{id}")
    public Company getCompany(@PathVariable("id") Integer id) {
        return companyService.findOne(id);
    }

    @PostMapping
    public ResponseEntity<Company> create(@RequestBody Company company, UriComponentsBuilder uriBuilder) {
        company = companyService.save(company);
        UriComponents uriComponents = uriBuilder.path("/{id}").buildAndExpand(company.getId());
        return ResponseEntity.created(uriComponents.toUri()).body(company);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void update(@PathVariable("id") Integer id, @RequestBody Company company) {
        companyService.update(id, company);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable("id") Integer id) {
        companyService.delete(id);
    }
}
