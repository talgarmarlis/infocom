import { BaseDetailView } from "views/baseDetailView";

export class EFormView extends BaseDetailView {

  getFormConfig() {
    return {
      localId: "employeeForm",
      view: "form",
      borderless: true,
      width: 500,
      isDetail: true,
      elementsConfig: {
        labelWidth: 150
      },
      elements: [{
        rows: [{
            view: "toolbar",
            cols: [{ view: "label", label: "Employee Form" }, {}, { view: "icon", icon: "window-close", click: () => this.hide() }],
          },
          { height: 20 },
          { template: "Employee", type: "section" },
          { id: "id", hidden: true },
          {
            view: "combo",
            label: "Company",
            name: "companyId",
            localId: "companyCombo",
            readonly: true,
            required: true,
            options: this.getParentView().getSelectedCompany(),
            on: {
              onChange: (id) => {
                this.refreshCompanyCombo();
              }
            }
          },
          { view: "text", label: "Name", name: "name", required: true },
          { view: "text", label: "Surname", name: "surname", required: true },
          { view: "text", label: "Email", name: "email", required: true },
          { view: "text", label: "Position", name: "position", required: true },

          { template: "Contact Details", type: "section" },
          { view: "text", label: "Phone Number", name: "phoneNumber", required: true },
          { view: "text", label: "Home Number", name: "homeNumber", required: true },
          { view: "text", label: "Work Number", name: "workNumber" },
          { view: "text", label: "Address", name: "address" },
          { view: "textarea", label: "Account Details", name: "accountDetails" }
        ]
      }]
    }
  }

  refreshCompanyCombo() {
    this.$$('companyCombo').define("options", this.getParentView().getSelectedCompanyOption());
    this.$$('companyCombo').refresh();
  }

  bindTo(item, itemDetail) {
    itemDetail.companyId = item.id;
    super.bindTo(itemDetail);
  }
}