import { JetView } from "webix-jet";
import { register } from "models/session";

export default class LoginView extends JetView {

  config() {
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
        { view: "text", name: "username", label: "Username" },
        { view: "text", name: "password", label: "Password", type: "password" },
        {
          view: "button",
          value: "Login",
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
      label: "<img src='/images/user.png' style='height:150px'>"
    };

    return {
      rows: [
        {},
        { cols: [{}, { view: "form", elements: [logo, loginForm] }, {}] },
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

  init(view) {
    view.$view.querySelector("input").focus();
  }
}
