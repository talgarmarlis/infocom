import { JetView } from "webix-jet";
import { register } from "models/session";

export default class LoginView extends JetView {

  config() {
    const _ = this.app.getService("locale")._;
    const lang = this.app.getService("locale").getLang();
    this.userService = this.app.getService("user");

    const loginForm = {
      localId: "loginForm",
      view: "form",
      width: 425,
      borderless: false,
      margin: 10,
      elementsConfig: {
        labelPosition: "top"
      },
      rows: [
        { view: "text", name: "username", label: _("Username") },
        { view: "text", name: "password", label: _("Password"), type: "password" },
        {
          view: "button",
          value: _("Login"),
          click: function() {
            this.$scope.doLogin();
          },
          hotkey: "enter"
        }
      ],
      rules: {
        username: webix.rules.isNotEmpty,
        password: webix.rules.isNotEmpty
      }
    };

    const logo = {
      view: "label",
      height: 150,
      align: "center",
      label: "<img src='/images/inscada.png' style='height:150px'>"
    };

    const langButtons = {
      name: "lang",
      view: "segmented",
      width: 100,
      align: "right",
      options: [
        { id: "en", value: "EN" },
        { id: "tr", value: "TR" }
      ],
      click: () => this.toggleLanguage(),
      value: lang
    };

    return {
      rows: [
        {},
        { cols: [{}, { view: "form", elements: [logo, loginForm, langButtons] }, {}] },
        {}
      ]
    }
  }

  doLogin() {
    const form = this.$$("loginForm");
    if (form.validate()) {
      var data = form.getValues();
      this.userService.login(data.username, data.password)
        .catch(function() {
          webix.html.removeCss(form.$view, "invalid_login");
          form.elements.password.focus();
          webix.delay(function() {
            webix.html.addCss(form.$view, "invalid_login");
          });
        });
    }
  }

  toggleLanguage() {
    const langs = this.app.getService("locale");
    const value = this.getRoot().queryView({ name: "lang" }).getValue();
    langs.setLang(value);
  }

  init(view) {
    view.$view.querySelector("input").focus();
  }
}
