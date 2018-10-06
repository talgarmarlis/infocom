import "./styles/app.css";
import { JetApp, plugins } from "webix-jet";
import session from "models/session";

webix.ready(() => {
  var app = new JetApp({
    id: "inscada management ui",
    version: 1.0,
    start: "/top/home",
    debug: true
  });

  app.use(plugins.User, { model: session });
  app.use(plugins.Locale);
  app.render();

  app.attachEvent("app:error:resolve", function(name, error) {
    window.console.error(error);
  });
});
