import { BaseMasterView } from "views/baseMasterView";
import { TrendView } from "./trend";
import { TrendTagView } from "./trendTag";
import { getTrends, addTrend, updateTrend, removeTrend } from "models/trends";
import { getTrendTags, addTrendTag, updateTrendTag, removeTrendTag } from "models/trends";
import { getProjects } from "models/projects";
import { getVariablesByProjectId } from "models/variables";

export default class TrendsView extends BaseMasterView {

  getData() {
    return new Promise((resolve, reject) => {
      webix.promise.all([getProjects(), getTrends()]).then(results => {
        this.projects = results[0].json();
        resolve(results[1].json());
      }).catch(err => {
        this.projects = [];
        resolve([]);
      });
    });
  }

  getGridConfig() {
    return {
      localId: "trendsGrid",
      title: "Trends",
      view: "datatable",
      select: "row",
      css: "rows",
      resizeColumn: true,
      scroll: "xy",
      columns: [
        { id: "id", hidden: true },
        { id: "projectId", editor: "combo", header: [{ content: "selectFilter" }, this._("Project")], fillspace: true, collection: this.getProjectOptions() },
        { id: "name", header: [{ content: "textFilter" }, this._("Name")], fillspace: true },
        { id: "dsc", header: [{ content: "textFilter" }, this._("Description")], fillspace: true },
        { id: "period", header: this._("Period") }
      ],
      on: {
        onSelectChange: () => {
          var trend = this.getSelectedTrend();
          this.updateVariables(trend.projectId);
          this.refreshTrendTagTable(trend.id);
        }
      }
    };
  }

  getDetailGridConfig() {
    return {
      localId: "trendTagsGrid",
      title: "Trend Tags",
      view: "datatable",
      data: [],
      select: "row",
      css: "rows",
      resizeColumn: true,
      scroll: "xy",
      columns: [
        { id: "id", hidden: true, required: true },
        { id: "trendId", hidden: true, required: true },
        { id: "name", header: [{ content: "textFilter" }, this._("Name")], fillspace: true },
        { id: "dsc", header: [{ content: "textFilter" }, this._("Description")], fillspace: true },
        { id: "minScale", header: this._("Min. Scale") },
        { id: "maxScale", header: this._("Max. Scale") },
        { id: "color", header: this._("Color") },
        { id: "thickness", header: this._("Thickness") },
        {
          id: "status",
          header: this._("Status"),
          template: this.customCheckbox,
          css: { "text-align": "center" }
        }
      ],
      load: trend => getTrendTags(trend.id)
    };
  }

  getProjectOptions() {
    return this.projects.map(p => { return { id: p.id, value: p.name } });
  }

  getVariableOptions() {
    return this.variables.map(p => { return { id: p.id, value: p.name } });
  }

  getSelectedTrend() {
    var item = this.$$("trendsGrid").getSelectedItem();
    return item;
  }

  getSelectedTrendOption() {
    var item = this.$$("trendsGrid").getSelectedItem();
    return [{ id: item.id, value: item.name }];
  }

  updateVariables(projectId) {
    getVariablesByProjectId(projectId).then(result => {
      this.variables = result.json();
    });
  }

  refreshTrendTagTable(trenId) {
    this.$$("trendTagsGrid").clearAll();
    getTrendTags(trenId).then(result => {
      this.$$("trendTagsGrid").parse(result.json());
    });
  }

  getPopup() {
    if (!this.trendPopup) {
      this.trendPopup = this.ui(TrendView);
    }
    return this.trendPopup;
  }

  getDetailPopup() {
    if (!this.trendTagPopup) {
      this.trendTagPopup = this.ui(TrendTagView);
    }
    return this.trendTagPopup;
  }

  addItem(trend) {
    return addTrend(trend);
  }

  updateItem(trend) {
    return updateTrend(trend);
  }

  removeItem(trend) {
    return removeTrend(trend);
  }

  addItemDetail(trend, tag) {
    return addTrendTag(trend, tag);
  }

  updateItemDetail(trend, tag) {
    return updateTrendTag(trend, tag);
  }

  removeItemDetail(trend, tag) {
    return removeTrendTag(trend, tag);
  }
}