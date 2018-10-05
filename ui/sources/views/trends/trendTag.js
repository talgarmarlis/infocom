import { BaseDetailView } from "views/baseDetailView";

export class TrendTagView extends BaseDetailView {

  getFormConfig() {
    return {
      localId: "trendTagForm",
      view: "form",
      borderless: true,
      width: 400,
      isDetail: true,
      elementsConfig: {
        labelWidth: 125
      },
      elements: [{
        rows: [{
            view: "toolbar",
            cols: [{ view: "label", label: this._("Trend Tag") }, {}, { view: "icon", icon: "window-close", click: () => this.hide() }],
          },
          { height: 20 },
          { template: this._("Trend Tag"), type: "section" },
          { id: "id", hidden: true },
          {
            view: "combo",
            label: this._("Trend"),
            name: "trendId",
            localId: "trendCombo",
            readonly: true,
            required: true,
            options: this.getParentView().getSelectedTrend(),
            on: {
              onChange: (id) => {
                this.refreshTrendCombo();
              }
            }
          },
          { view: "text", label: this._("Name"), name: "name", required: true },
          { view: "text", label: this._("Description"), name: "dsc" },
          { view: "checkbox", label: this._("Status"), name: "status", required: true },
          { template: this._("Graph Details"), type: "section" },
          { view: "combo", label: this._("Variable"), name: "variableId", localId: "variableCombo", required: true },
          { view: "text", label: this._("Min. Scale"), name: "minScale", required: true },
          { view: "text", label: this._("Max. Scale"), name: "maxScale", required: true },
          { view: "colorpicker", label: this._("Color"), name: "color" },
          { view: "text", label: this._("Thickness"), name: "thickness" },
          {}
        ]
      }]
    }
  }

  updateVariableOptions() {
    this.$$('variableCombo').define("options", this.getParentView().getVariableOptions());
    this.$$('variableCombo').refresh();
  }

  refreshTrendCombo() {
    this.$$('trendCombo').define("options", this.getParentView().getSelectedTrendOption());
    this.$$('trendCombo').refresh();
  }

  bindTo(item, itemDetail) {
    itemDetail.trendId = item.id;
    this.updateVariableOptions();
    super.bindTo(itemDetail);
  }
}