import { get, post, put, del } from "utils";

export const FIRED_ALARM_STATUSES = ["On", "Off"];

export function getAlarms() {
  return get('/alarms');
}

export function getAlarmsByProjectId(projectId) {
  return get('/alarms?projectId=' + projectId);
}

export function addAlarm(alarm) {
  return post('/alarms', alarm)
}

export function updateAlarm(alarm) {
  return put('/alarms/' + alarm.id, alarm);
}

export function removeAlarm(alarm) {
  return del('/alarms/' + alarm.id);
}

export function getFiredAlarms(filter) {
  var params = "?";
  for (var property in filter) {
    if (filter.hasOwnProperty(property)) {
      params += property + "=" + filter[property] + "&";
    }
  }
  return get('/alarms/fired-alarms' + params);
}

export function getMonitorData(projectId) {
  return get('/alarms/monitor?projectId=' + projectId);
}

export function acknowledgeAlarm(id) {
  return post('/alarms/fired-alarms/' + id + "/acknowledge");
}

export function getAlarmStatuses(alarms) {
  var param = '';
  for (var i = 0; i < alarms.length; i++) {
    param = param + 'alarmIds[]=' + alarms[i].id + '&';
  }
  return get('/alarms/statuses?' + param);
}

export function getAlarmStatusById(id) {
  return get('/alarms/' + id + '/status');
}

export function activateAlarm(id) {
  return post('/alarms/' + id + '/activate');
}

export function deactivateAlarm(id) {
  return post('/alarms/' + id + '/deactivate');
}

export function getAlarmSettings(projectId) {
  return get('/alarms/settings?projectId=' + projectId);
}

export function setAlarmSettings(projectId, alarmSetting) {
  return put('/alarms/settings?projectId=' + projectId, alarmSetting);
}