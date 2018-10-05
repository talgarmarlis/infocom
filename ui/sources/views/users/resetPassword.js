import { BaseDetailView } from "views/baseDetailView";

export class ResetPasswordView extends BaseDetailView {

  getFormConfig() {
    return {
      localId: "resetPasswordForm",
      view: "form",
      elementsConfig: {
        labelWidth: 150
      },
      elements: [{
          view: "toolbar",
          cols: [{ view: "label", label: this._("Reset Password") }, {}, { view: "icon", icon: "window-close", click: () => this.hide() }],
        },
        { height: 10 },
        {
          rows: [
            { template: this._("Password Info"), type: "section" },
            { view: "text", label: this._("Password"), name: "password1", type: "password", localId: "password1", required: true },
            { view: "text", label: this._("Repeat Password"), name: "password2", type: "password", localId: "password2", required: true }
          ]
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

  validate() {
    return super.validate() && this.validatePassword();
  }

  validatePassword() {
    if (this.$$("password1").getValue() !== this.$$("password2").getValue()) {
      webix.message({ type: "error", text: this._("Password is not the same") });
      return false;
    }
    return true;
  }

  save() {
    if (this.validate()) {
      this.getParentView().resetPassword();
    }
  }
}