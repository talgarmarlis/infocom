import { JetView } from "webix-jet";

export class BaseDetailView extends JetView {

  config() {

    this.formConfig = this.getFormConfig();
    this.position = this.formConfig.position || function(state) {
      state.width = this.$scope.formConfig.width || 400;
      state.left = state.maxWidth - state.width;
      state.top = 0;
      state.height = state.maxHeight;
    };
    var body = {
      rows: [
        this.formConfig,
        {
          localId: "formButtons"
        }
      ]
    };
    if (this.formConfig.withoutButtons) body = this.formConfig;

    return {
      view: "popup",
      padding: 0,
      position: this.position,
      body: body,
      on: {
        onHide: () => {
          this.getForm().clearValidation();
        }
      }
    }
  }

  getForm() {
    return this.$$(this.formConfig.localId);
  }

  bindTo(item) {
    if (item.id) this.updateButtons(2);
    else this.updateButtons(1);
    this.getForm().setValues(item);
  }

  show() {
    this.getRoot().show();
  }

  hide() {
    this.getRoot().hide();
  }

  validate() {
    if (!this.getForm().validate()) {
      webix.message({ type: "error", text: "Form data is invalid" }); //TODO
      return false;
    }
    return true;
  }

  save(cont) {
    if (!this.validate()) return;
    if (this.formConfig.isDetail) {
      this.getParentView().saveDetail(this.getForm().getValues(), cont);
    } else {
      this.getParentView().save(this.getForm().getValues(), cont);
    }
  }

  updateButtons(option) {
    if (option == 1) {
      var buttons = {
        localId: "formButtons",
        padding: 15,
        cols: [{
          view: "button",
          width: 150,
          align: "left",
          label: "Save & Continue",
          click: () => this.save("CONTINUE")
        }, {}, {
          view: "button",
          type: "form",
          width: 125,
          align: "right",
          label: "Save",
          click: () => this.save()
        }]
      }
      webix.ui(buttons, this.$$("formButtons"));
    } else {
      var buttons = {
        localId: "formButtons",
        padding: 15,
        rows: [{
          view: "button",
          type: "form",
          width: 125,
          align: "right",
          label: "Save",
          click: () => this.save()
        }]
      }
      webix.ui(buttons, this.$$("formButtons"));
    }
  }
}
