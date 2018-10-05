import { JetView, plugins } from "webix-jet";
import { SettingsView } from "./settings"
import { confirm } from "../helpers";

export default class TopView extends JetView {

  config() {
    const _ = this._ = this.app.getService("locale")._;
    const lang = this.app.getService("locale").getLang();
    const user = this.app.getService("user").getUser();

    var locale = this.app.getService("locale");
    locale.polyglot.onMissingKey = (a) => a;

    var mainToolbar = {
      view: "toolbar",
      elements: [
        { view: "icon", icon: "bars", click: () => $$("top:menu").toggle() },
        { view: "label", label: "INSCADA" },
        {},
        {
          name: "lang",
          width: 300,
          optionWidth: 100,
          view: "segmented",
          label: _("Language"),
          options: [
            { id: "en", value: "English" },
            { id: "tr", value: "Türkçe" }
          ],
          click: () => this.toggleLanguage(),
          value: lang
        },
        { view: "icon", icon: "envelope", width: 45 },
        { view: "icon", icon: "cog", width: 45, click: () => this.showSettingsPopup() },
        { view: "button", type: "icon", icon: "sign-out", label: user.name, width: 125, click: () => this.logout() }
      ]
    };

    //development part
    var development = {
      value: _("Development"),
      id: "development",
      icon: "bug",
      data: [
        { value: _("Projects"), id: "projects", icon: "briefcase", page: "projects.projects" },
        { value: _("Connections"), id: "connections", icon: "plug", page: "connections.connections" },
        { value: _("Devices"), id: "devices", icon: "desktop", page: "devices.devices" },
        { value: _("Animations"), id: "animations", icon: "film", page: "animations.animations" },
        { value: _("Alarms"), id: "alarms", icon: "bullhorn", page: "alarms.alarms" },
        { value: _("Trends"), id: "trends", icon: "signal", page: "trends.trends" },
        { value: _("Scripts"), id: "scripts", icon: "file", page: "scripts.scripts" },
        { value: _("Expressions"), id: "expression_template", icon: "file-code-o", page: "expressions.expressions" },
        { value: _("Variables"), id: "variables", icon: "tags", page: "variables.variables" },
        { value: _("Reports"), id: "reports", icon: "print", page: "reports.reports" },

      ]
    };

    //wizard part
    var wizard = {
      value: _("Wizard"),
      id: "wizard",
      icon: "rebel",
      data: [
        { value: _("Gas Metering"), id: "gas_metering", icon: "ravelry", page: "wizard.gasMetering.devices" },
        { value: _("Gas Control"), id: "gas_control", icon: "wpexplorer" },
        { value: _("Hpp Unit"), id: "hpp_unit", icon: "superpowers" },
        { value: _("Device Library"), id: "device_template", icon: "sitemap", page: "wizard.deviceTemplate.devices" }
      ]
    };

    var userPart = { value: _("Users"), id: "users", icon: "user", page: "users.users" };

    var menu = {
      view: "sidebar",
      id: "top:menu",
      select: true,
      data: [
        { value: _("Home"), id: "home", icon: "home", page: "home" },
        { value: _("Visualization"), id: "visualization", icon: "bullseye", page: "enduser.visualization.visualization" },
        { value: _("Control Panel"), id: "panel", icon: "server", page: "panel.panel" },
        { value: _("Project Map"), id: "map", icon: "map", page: "projects.map" },
        { value: _("Variable History"), id: "variableHistory", icon: "tags", page: "enduser.variableHistory" },
        { value: _("Alarm History"), id: "alarmHistory", icon: "bullhorn", page: "enduser.alarmHistory" },
        { value: _("Alarm Monitor"), id: "alarmMonitor", icon: "window-maximize", page: "enduser.alarmMonitor" },
        { value: _("Trend Graphics"), id: "trendGraphics", icon: "signal", page: "enduser.trend" },
        { value: _("Reports"), id: "reportView", icon: "file-pdf-o", page: "enduser.report" },
        { value: _("Logs"), id: "logs", icon: "history", page: "enduser.logs" },
        { value: _("Jobs"), id: "jobs", icon: "server", page: "enduser.jobs" },
        { value: _("Help"), id: "help", icon: "support", page: "support" },
        { value: _("About"), id: "about", icon: "info-circle" }
      ]
    };

    for (var i = 0; i < user.authorities.length; i++) {
      if (user.authorities[i].authority == "ROLE_ANONYMOUS" || user.authorities[i].authority == "Admin") {
        menu.data.splice(1, 0, development);
        menu.data.splice(2, 0, wizard);
        menu.data.splice(13, 0, userPart);
        break;
      }
    }

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

  showSettingsPopup(item) {
    let popup = this.getSettingsPopup();
    //popup.bindTo(item);
    popup.show();
  }

  getSettings() {
    return this.getSettingsPopup().getSettings();
  }

  getSettingsPopup() {
    if (!this.settingsPopup) {
      this.settingsPopup = this.ui(SettingsView);
    }
    return this.settingsPopup;
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

  toggleLanguage() {
    const langs = this.app.getService("locale");
    const value = this.getRoot().queryView({ name: "lang" }).getValue();
    langs.setLang(value);
  }

  logout() {
    confirm({
      ok: this._("Yes"),
      cancel: this._("No"),
      text: this._("You are about to logged out. Are you sure you want to proceed?"),
    }, () => this.app.show("/logout"));
  }
}