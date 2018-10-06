import { get, post, put, del } from "utils";

export function getEmployees() {
  return get('/employees');
}

export function getEmployee(id) {
  return get('/employees/' + id );
}

export function addEmployee(employee) {
  return post('/employees', employee)
}

export function updateEmployee(employee) {
  return put('/employees/' + employee.id, employee);
}

export function removeEmployee(employee) {
  return del('/employees/' + employee.id);
}

export function getCompanies() {
  return get('/companies');
}

export function getCompany(id) {
  return get('/companies/' + id );
}

export function addCompany(company) {
  return post('/companies', company)
}

export function updateCompany(company) {
  return put('/companies/' + company.id, company);
}

export function removeCompany(company) {
  return del('/companies/' + company.id);
}
