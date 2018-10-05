import { JetView } from "webix-jet";

export function CrudToolbar(config) {
  var cols = []
  cols.push({ view: "label", label: config.title || '' });
  if (config.extra != null) {
    for (var i = 0; i < config.extra.length; i++) {
      cols.push(config.extra[i]);
    }
  }
  cols.push({ view: "icon", icon: "plus", click: config.add, hidden: !config.add });
  cols.push({ view: "icon", icon: "pencil", click: config.edit, hidden: !config.edit });
  cols.push({ view: "icon", icon: "minus", click: config.remove, hidden: !config.remove });
  return {
    view: "toolbar",
    cols: cols
  }
}