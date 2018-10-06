import { BaseDetailView } from "views/baseDetailView";

export class CFormView extends BaseDetailView {

  getFormConfig() {
    return {
      localId: "companyForm",
      view: "form",
      borderless: true,
      width: 500,
      elementsConfig: {
        labelWidth: 150
      },
      elements: [{
        rows: [{
            view: "toolbar",
            cols: [{ view: "label", label: "Company Form" }, {}, { view: "icon", icon: "window-close", click: () => this.hide() }],
          },
          { height: 20 },
          { template: "Company", type: "section" },
          { name: "id", hidden: true },
          { view: "text", label: "Name", name: "name", required: true },
          { view: "text", label: "Ownership", name: "ownership", required: true },
          { view: "text", label: "Website", name: "website" },
          { view: "text", label: "Legal Form", name: "legalForm" },
          { view: "text", label: "Chief", name: "chiefName", required: true },
          { template: "Contacts", type: "section" },
          { view: "text", label: "Fax", name: "fax" },
          { view: "text", label: "Phone Number", name: "phoneNumber", required: true },
          { view: "text", label: "Address", name: "address", required: true },
          { template: "License", type: "section" },
          { view: "text", label: "Licence Number", name: "licenceNumber", required: true },
          { view: "datepicker", label: "Licence Date", name: "licenceDate", format: "%d/%m/%Y %H:%i", stringResult: true },
          { view: "text", label: "Certificate Number", name: "certificetNumber" },
          { view: "datepicker", label: "Certificate Date", name: "certificateDate", format: "%d/%m/%Y %H:%i", stringResult: true },

          {}
        ]
      }]
    }
  }
}