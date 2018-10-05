import { BaseDetailView } from "views/baseDetailView";

export class RoleView extends BaseDetailView {

  getFormConfig() {
    return {
      localId: "roleForm",
      view: "form",
      isDetail: true,
      elementsConfig: {
        labelWidth: 100
      },
      elements: [{
          view: "toolbar",
          cols: [{ view: "label", label: this._("Role") }, {}, { view: "icon", icon: "window-close", click: () => this.hide() }],
        },
        { height: 20 },
        { id: "id", hidden: true },
        { view: "combo", label: this._("Role"), name: "role", localId: "roleCombo", required: true, options: this.getParentView().getRoleOptions() },
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

  bindTo(item, itemDetail) {
    super.bindTo(itemDetail);
  }
}