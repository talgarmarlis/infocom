import { JetView } from "webix-jet";

export class SettingsView extends JetView {

  config() {
    this._ = this.app.getService("locale")._;
    webix.protoUI({
      name: "myProperty",
    }, webix.ui.property, webix.ValidateData);

    return {
      view: "popup",
      position: "center",
      body: {
        rows: [{
          view: "toolbar",
          cols: [{ view: "label", label: this._("Settings") }, {}, { view: "icon", icon: "window-close", click: () => { this.hide() } }],
        }, {
          view: "myProperty",
          id: "propertySettings",
          width: 400,
          height: 300,
          nameWidth: 200,
          elements: [
            { label: "Refresh Periods", type: "label" },
            { label: "Control Panel", type: "text", id: "cPeriod" },
            { label: "Gas Metering", type: "text", id: "gmPeriod" },
            { label: "Gas Properties", type: "text", id: "gpPeriod" },
            { label: "Network", type: "text", id: "nPeriod" }
          ],
          rules: {
            cPeriod: function(value) { return value >= 1000; },
            gmPeriod: webix.rules.isNumber,
            gpPeriod: webix.rules.isNumber,
            nPeriod: webix.rules.isNumber
          },
          on: {
            onValidationError: (id, obj, details) => {
              webix.message({ type: "error", text: this._("Form data is invalid") });
              webix.html.addCss(this.$$("propertySettings").getItemNode(id), { "border-color": "red" });
            }
          }
        }, {
          cols: [{}, {
            view: "button",
            width: 100,
            align: "left",
            label: this._("Cancel"),
            click: () => this.cancel()
          }, {
            view: "button",
            type: "form",
            width: 100,
            align: "right",
            label: this._("Save"),
            click: () => this.save()
          }]
        }]
      },
    }
  }


  bindTo(item) {
    this.$$("propertySettings").setValues(item);
  }

  show() {
    this.getRoot().show();
    this.bindTo(this.getSettings());
  }

  hide() {
    this.getRoot().hide();
  }

  cancel() {
    this.hide();
  }

  getSettings() {
    var settings = webix.storage.local.get("inscadaSettings");
    if (!settings) {
      settings = this.getDefaultSettings();
    }
    return settings;
  }

  getDefaultSettings() {
    var settings = {
      cPeriod: 3000,
      gmPeriod: 3000,
      gpPeriod: 3000,
      nPeriod: 3000
    }
    return settings;
  }

  save() {
    this.$$("propertySettings").editStop();
    if (this.$$("propertySettings").validate()) {
      var settings = this.$$("propertySettings").getValues();
      webix.storage.local.put("inscadaSettings", settings);
      this.hide();
    }
  }
}