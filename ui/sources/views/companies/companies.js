import { BaseMasterView } from "views/baseMasterView";
import { CFormView } from "./companyForm";
import { EFormView } from "./employeeForm";
import { getCompanies, addCompany, updateCompany, removeCompany } from "models/service";
import { getEmployees, addEmployee, updateEmployee, removeEmployee } from "models/service";

export default class CompanyView extends BaseMasterView {

  getData() {
    return new Promise((resolve, reject) => {
      getCompanies().then(result => {
        this.companies = result.json();
        resolve(this.companies);
      }).catch(err => {
        resolve([]);
      });
    });
  }

  getGridConfig() {
    return {
      localId: "companiesGrid",
      title: "Companies",
      view: "datatable",
      select: "row",
      css: "rows",
      resizeColumn: true,
      scroll: "xy",
      columns: [
        { id: "id", hidden: true },
        { id: "name", header: [{ content: "textFilter" }, "Name"], adjust: true },
        { id: "ownership", header: [{ content: "textFilter" }, "Ownership"], adjust: true },
        { id: "website", header: "Website", adjust: true },
        { id: "legalForm", header: "Legal Form", adjust: true },
        { id: "chiefName", header: "Fax", adjust: true },
        { id: "phoneNumber", header: "Phone Number", adjust: true },
        { id: "licenceNumber", header: "LicenceNumber", adjust: true },
        { id: "licenceDate", header: "LicenceDate", adjust: true },
        { id: "certificetNumber", header: "CertificateNumber", adjust: true },
        { id: "certificateDate", header: "CertificateDate", adjust: true },
        { id: "address", header: "Address" }
      ],
      on: {
        onSelectChange: () => {
          var item = this.getSelectedCompany();
          this.refreshEmployees(item.id);
        }
      }
    };
  }

  getDetailGridConfig() {
    return {
      localId: "employeesGrid",
      title: "Employees",
      view: "datatable",
      data: [],
      select: "row",
      css: "rows",
      resizeColumn: true,
      scroll: "xy",
      columns: [
        { id: "id", hidden: true, required: true },
        { id: "companyId", hidden: true, required: true },
        { id: "name", header: [{ content: "textFilter" }, "Name"], fillspace: true },
        { id: "surname", header: [{ content: "textFilter" }, "Surname"], fillspace: true },
        { id: "email", header: "Email", adjust: true },
        { id: "accountDetails", header: "AccountDetails", adjust: true },
        { id: "position", header: "Position", adjust: true },
        { id: "phoneNumber", header: "PhoneNumber", adjust: true },
        { id: "homeNumber", header: "HomeNumber", adjust: true },
        { id: "workNumber", header: "WorkNumber", adjust: true },
        { id: "address", header: "Address", adjust: true }
      ],
      load: item => getCompanyTags(item.id)
    };
  }

  getSelectedCompany() {
    var item = this.$$("companiesGrid").getSelectedItem();
    return item;
  }

  getSelectedCompanyOption() {
    var item = this.$$("companiesGrid").getSelectedItem();
    return [{ id: item.id, value: item.name }];
  }

  refreshEmployees(trenId) {
    this.$$("employeesGrid").clearAll();
    getEmployees(trenId).then(result => {
      this.$$("employeesGrid").parse(result.json());
    });
  }

  getPopup() {
    if (!this.cForm) {
      this.cForm = this.ui(CFormView);
    }
    return this.cForm;
  }

  getDetailPopup() {
    if (!this.eForm) {
      this.eForm = this.ui(EFormView);
    }
    return this.eForm;
  }

  addItem(item) {
    return addCompany(item);
  }

  updateItem(item) {
    return updateCompany(item);
  }

  removeItem(item) {
    return removeCompany(item);
  }

  addItemDetail(item, employee) {
    return addEmployee(employee);
  }

  updateItemDetail(item, employee) {
    return updateEmployee(employee);
  }

  removeItemDetail(item, employee) {
    return removeEmployee(employee);
  }
}