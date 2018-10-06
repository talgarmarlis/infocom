import { JetView } from "webix-jet";
import { CrudToolbar } from "./crudToolbar";
import { confirm, warn, info } from "helpers";

export class BaseMasterView extends JetView {

  config() {

    this.confirmOptions = {
      ok: "Yes",
      cancel: "No",
      text: "Are you sure you want to continue?",
    };

    return this.getData().then(data => {
      this.data = data;
      this.gridConfig = this.getGridConfig();
      let ui = {
        rows: [
          this.createGridToolbar(this.gridConfig),
          this.gridConfig
        ]
      };
      if (this.getDetailGridConfig) {
        this.detailGridConfig = this.getDetailGridConfig();
        ui.rows.push({ view: "resizer" });
        ui.rows.push({ rows: [this.createDetailGridToolbar(this.detailGridConfig), this.detailGridConfig] });
        ui.rows[1].on = ui.rows[1].on || {};
        if (ui.rows[1].on.onSelectChange == null) {
          ui.rows[1].on.onSelectChange = () => { //TODO
            var selected = this.getSelected();
            if (selected) {
              let detailGrid = this.getDetailGrid();
              detailGrid.clearAll();
              if (this.detailGridConfig.load) {
                this.detailGridConfig.load(selected).then(detailResult => {
                  detailGrid.parse(detailResult.json());
                  var id = detailGrid.getFirstId();
                  if (id) {
                    detailGrid.select(id);
                  }
                });
              }
            }
          };
        }
      }
      return ui;
    });
  }

  createGridToolbar() {
    return CrudToolbar({
      title: this.gridConfig.title,
      add: () => this.add(),
      edit: () => this.update(),
      remove: () => this.remove(),
      extra: this.gridConfig.extra || []
    });
  }

  createDetailGridToolbar() {
    return CrudToolbar({
      title: this.detailGridConfig.title,
      add: () => this.addDetail(),
      edit: () => this.updateDetail(),
      remove: () => this.removeDetail(),
      extra: this.detailGridConfig.extra || []
    });
  }

  getItemOptions() {
    return this.data.map(t => { return { id: t.id, value: t.name } });
  }

  init() {
    this.getGrid().parse(this.data);
  }

  ready() {
    let gridId = this.gridConfig.localId || this.gridConfig.gridId;
    let gridState = webix.storage.local.get(gridId);
    if (gridState) {
      this.$$(gridId).setState(gridState);
    }
    if (this.detailGridConfig) {
      let detailGridId = this.detailGridConfig.localId || this.detailGridConfig.gridId;
      let detailGridState = webix.storage.local.get(detailGridId);
      if (detailGridState) {
        this.$$(detailGridId).setState(detailGridState);
      }
    }
  }

  destroy() {
    let gridId = this.gridConfig.localId || this.gridConfig.gridId;
    webix.storage.local.put(gridId, this.getGrid().getState());
    if (this.detailGridConfig) {
      let detailGridId = this.detailGridConfig.localId || this.detailGridConfig.gridId;
      webix.storage.local.put(detailGridId, this.getDetailGrid().getState());
    }
  }

  getGrid() {
    return this.$$(this.gridConfig.localId || this.gridConfig.gridId);
  }

  getDetailGrid() {
    return this.$$(this.detailGridConfig.localId || this.detailGridConfig.gridId);
  }

  getSelected() {
    let grid = this.getGrid();
    let selId = grid.getSelectedId();
    return selId ? grid.getItem(selId) : null;
  }

  getSelectedDetail() {
    let grid = this.getDetailGrid();
    let selId = grid.getSelectedId();
    return selId ? grid.getItem(selId) : null;
  }

  showPopup(item) {
    let popup = this.getPopup();
    popup.bindTo(item);
    popup.show();
  }

  showDetailPopup(item, itemDetail) {
    let popup = this.getDetailPopup();
    popup.bindTo(item, itemDetail);
    popup.show();
  }

  hidePopup() {
    this.getPopup().hide();
  }

  hideDetailPopup() {
    this.getDetailPopup().hide();
  }

  add() {
    this.showPopup({});
  }

  addDetail() {
    if (this.getSelected()) {
      this.showDetailPopup(this.getSelected(), {});
    } else {
      webix.message({type:"error", text:"Please select a master record first"});
    }
  }

  update() {
    let selected = this.getSelected();
    if (selected) {
      this.showPopup(selected);
    }
  }

  updateDetail() {
    let selectedDetail = this.getSelectedDetail();
    if (selectedDetail) {
      this.showDetailPopup(this.getSelected(), selectedDetail);
    }
  }

  remove() {
    var selected = this.getSelected();
    if (selected) {
      confirm(this.confirmOptions, () => this.removeItem(selected).then(() => {
        this.getGrid().remove(selected.id);
        this.data.splice(this.data.findIndex(i => i.id == selected.id), 1);
        let detailGrid = this.getDetailGrid();
        if (detailGrid) {
          detailGrid.clearAll();
        }
        webix.message("Item removed");
      }));
    }
  }

  removeDetail() {
    var selected = this.getSelected();
    var selectedDetail = this.getSelectedDetail();
    if (!selectedDetail) return;
    confirm(this.confirmOptions, () => this.removeItemDetail(selected, selectedDetail).then(() => {
      this.getDetailGrid().remove(selectedDetail.id);
      webix.message("Item detail removed");
    }));
  }

  save(item, cont) {
    if (!item.id) {
      confirm(this.confirmOptions, () => this.addItem(item).then(res => {
        let newItem = res.json();
        let grid = this.getGrid();
        let id = grid.add(newItem);
        this.data.push(newItem);
        grid.select(id);
        grid.showItem(id);
        webix.message("A new item added");
        if (!cont) this.hidePopup();
      }))
    } else {
      confirm(this.confirmOptions, () => this.updateItem(item).then(() => {
        this.getGrid().updateItem(item.id, item);
        this.data[this.data.findIndex(i => i.id == item.id)] = item;
        webix.message("Item updated");
        this.hidePopup();
      }))
    }
  }

  saveDetail(itemDetail, cont) {
    let item = this.getSelected();
    if (!itemDetail.id) {
      confirm(this.confirmOptions, () => this.addItemDetail(item, itemDetail).then(res => {
        let newItemDetail = res.json();
        let detailGrid = this.getDetailGrid();
        let id = detailGrid.add(newItemDetail);
        detailGrid.select(id);
        detailGrid.showItem(id);
        webix.message("A new item detail added");
        if (!cont) this.hideDetailPopup();
      }))
    } else {
      confirm(this.confirmOptions, () => this.updateItemDetail(item, itemDetail).then(() => {
        this.getDetailGrid().updateItem(itemDetail.id, itemDetail);
        webix.message("Item detail updated");
        this.hideDetailPopup();
      }))
    }
  }
}
