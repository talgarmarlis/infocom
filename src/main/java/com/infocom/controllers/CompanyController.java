package com.infocom.controllers;

import com.infocom.models.Company;
import com.infocom.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    @Autowired
    CompanyService companyService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> list() {
        Map<String, Object> responseBody = new HashMap<>();
        Collection<Company> list = companyService.findAll();
        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "list of companies");
        responseBody.put("data", list);
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> save(@RequestBody Company company) {
        Map<String, Object> responseBody = new HashMap<>();
        Company savedCompany = companyService.save(company);
        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "company created");
        responseBody.put("data", savedCompany);
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }

    @PutMapping("/{companyId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> update(@PathVariable("companyId") Integer companyId, @RequestBody Company company) {
        Map<String, Object> responseBody = new HashMap<>();
        Company updatedCompany = companyService.update(companyId, company);
        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "company is updated");
        responseBody.put("data", updatedCompany);
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }

    @DeleteMapping("/{companyId}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable("companyId") Integer companyId) {
        Map<String, Object> responseBody = new HashMap<>();
        companyService.delete(companyId);
        responseBody.put("status", "SUCCESS");
        responseBody.put("message", "company is deleted");
        return new ResponseEntity(responseBody, HttpStatus.OK);
    }
}
