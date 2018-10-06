import { JetView, plugins } from "webix-jet";

export default class TopView extends JetView {

  config() {
    const user = this.app.getService("user").getUser();

    var mainToolbar = {
      view: "toolbar",
      elements: [
        { view: "icon", icon: "bars", click: () => $$("top:menu").toggle() },
        { view: "label", label: "INFOCOM" },
        {},
        { view: "icon", icon: "envelope", width: 45 },
        { view: "icon", icon: "cog", width: 45 },
        { view: "button", type: "icon", icon: "sign-out", width: 30, click: () => this.logout() }
      ]
    };


    var menu = {
      view: "sidebar",
      id: "top:menu",
      select: true,
      data: [
        { value: "Home", id: "home", icon: "home", page: "home" },
        { value: "Companies", id: "companies", icon: "building-o", page: "companies.companies" },
        { value: "Help", id: "help", icon: "support", page: "help" },
        { value: "About", id: "about", icon: "info-circle", page: "about" }
      ]
    };

    var layout = {
      rows: [
        mainToolbar,
        {
          cols: [
            menu,
            { $subview: true }
          ]
        }
      ]
    };

    return layout;
  }

  init() {
    this.$$("top:menu").attachEvent("onItemClick", (id) => {
      this.showPage(id);
    });

    this.$$("top:menu").getPopupList().attachEvent("onItemClick", (id) => {
      this.showPage(id);
    });
  }

  showPage(id) {
    var selection = this.$$("top:menu").getItem(id);
    if (selection.page) {
      this.app.show("/top/" + selection.page);
    }
  }

  logout() {
    confirm({
      ok: "Yes",
      cancel: "No",
      text: "You are about to logged out. Are you sure you want to proceed?",
    }, () => this.app.show("/logout"));
  }
}
