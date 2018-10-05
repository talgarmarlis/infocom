import { BaseDetailView } from "views/baseDetailView";

export class UserView extends BaseDetailView {

  getFormConfig() {
    return {
      localId: "userForm",
      view: "form",
      elementsConfig: {
        labelWidth: 125
      },
      elements: [{
          view: "toolbar",
          cols: [{ view: "label", label: this._("User") }, {}, { view: "icon", icon: "window-close", click: () => this.hide() }],
        },
        { height: 20 },
        {
          localId: "user-form-elements"
        },
        { height: 10 },
        {
          view: "button",
          type: "form",
          width: 125,
          align: "right",
          label: this._("Save"),
          click: () => this.save()
        }
      ]
    }
  }

  bindTo(item) {
    if (item.id) {
      webix.ui({
        localId: "user-form-elements",
        rows: [
          { view: "text", label: this._("Username"), name: "username", required: true, labelWidth: 125, readonly: true },
          { view: "text", label: this._("Password"), name: "password", type: "password", hidden: true, labelWidth: 125 },
          { view: "text", label: this._("Email Address"), name: "email", placeholder: "user@example.com", required: true, labelWidth: 125 },
        ]
      }, this.$$("user-form-elements"));
    } else {
      webix.ui({
        localId: "user-form-elements",
        rows: [
          { view: "text", label: this._("Username"), name: "username", required: true, labelWidth: 125 },
          { view: "text", label: this._("Password"), name: "password", type: "password", required: true, labelWidth: 125 },
          { view: "text", label: this._("Email Address"), name: "email", placeholder: "user@example.com", required: true, labelWidth: 125 },
        ]
      }, this.$$("user-form-elements"));
    }
    this.getForm().setValues(item);
  }
}