import { BaseDetailView } from "views/baseDetailView";

export class TrendView extends BaseDetailView {

  getFormConfig() {
    return {
      localId: "trendForm",
      view: "form",
      borderless: true,
      elementsConfig: {
        labelWidth: 125
      },
      elements: [{
        rows: [{
            view: "toolbar",
            cols: [{ view: "label", label: this._("Trend") }, {}, { view: "icon", icon: "window-close", click: () => this.hide() }],
          },
          { height: 20 },
          { template: this._("Trend"), type: "section" },
          { name: "id", hidden: true },
          { view: "combo", label: this._("Project"), name: "projectId", localId: "projectCombo", required: true, options: this.getParentView().getProjectOptions() },
          { view: "text", label: this._("Name"), name: "name", required: true },
          { view: "text", label: this._("Description"), name: "dsc" },
          { view: "text", label: this._("Period"), name: "period", required: true },
          {}
        ]
      }]
    }
  }
}