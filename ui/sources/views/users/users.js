import { BaseMasterView } from "views/baseMasterView";
import { UserView } from "./user";
import { RoleView } from "./role";
import { ResetPasswordView } from "./resetPassword";
import { getUsers, addUser, updateUser, removeUser } from "models/users";
import { getUserRoles, addUserRole, updateUserRole, removeUserRole } from "models/users";
import { ALL_ROLES } from "models/users";

export default class UsersView extends BaseMasterView {

  getData() {
    return new Promise((resolve, reject) => {
      getUsers().then(result => {
        resolve(result.json());
      }).catch(err => {
        resolve([]);
      });
    });
  }

  getGridConfig() {
    return {
      localId: "usersGrid",
      title: "Users",
      view: "datatable",
      select: "row",
      css: "rows",
      resizeColumn: true,
      scroll: "xy",
      columns: [
        { id: "username", header: [{ content: "textFilter" }, this._("Username")], fillspace: true },
        { id: "email", header: [{ content: "textFilter" }, this._("Email")], fillspace: true }
      ],
      extra: [{
        view: "icon",
        icon: "key",
        click: () => this.showResetPasswordPopup()
      }]
    };
  }

  getDetailGridConfig() {
    return {
      localId: "userRolesGrid",
      title: "User Roles",
      view: "datatable",
      data: [],
      select: "row",
      css: "rows",
      resizeColumn: true,
      scroll: "xy",
      columns: [
        { id: "id", hidden: true },
        { id: "username", hidden: true },
        { id: "role", header: this._("Role"), fillspace: true }
      ],
      load: user => getUserRoles(user.username)
    }
  }

  getRoleOptions() {
    return ALL_ROLES.map(p => { return { id: p, value: p } });
  }

  getPopup() {
    if (!this.userPopup) {
      this.userPopup = this.ui(UserView);
    }
    return this.userPopup;
  }

  getDetailPopup() {
    if (!this.rolePopup) {
      this.rolePopup = this.ui(RoleView);
    }
    return this.rolePopup;
  }

  addItem(user) {
    return addUser(user);
  }

  updateItem(user) {
    return updateUser(user);
  }

  removeItem(user) {
    return removeUser(user);
  }

  addItemDetail(user, role) {
    return addUserRole(user, role);
  }

  updateItemDetail(user, role) {
    return updateUserRole(user, role);
  }

  removeItemDetail(user, role) {
    return removeUserRole(user, role);
  }

  showResetPasswordPopup() {
    let selected = this.getSelected();
    if (!selected) return;
    this.resetPasswordPopup = this.resetPasswordPopup || this.ui(ResetPasswordView);
    this.resetPasswordPopup.show();
  }

  resetPassword() {

  }
}