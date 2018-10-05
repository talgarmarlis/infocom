export function customCheckbox(_, __, value) {
  if (!value) {
    return "<div class='webix_icon fa-square-o'></div>";
  } else {
    return "<div class='webix_icon fa-check-square-o'></div>";
  }
}

export function confirm(options, okCb, cancelCb) {
  webix.html.addCss(webix.confirm({
    type: "confirm-warning",
    ok: options.ok || "Yes",
    cancel: options.cancel || "No",
    text: options.text,
    callback: (sure) => {
      if (sure) {
        okCb();
      } else {
        if (cancelCb) {
          cancelCb();
        }
      }
    }
  }), "animated bounceIn");
}

export function info(message) {
  webix.message(message);
}

export function warn(message) {
  webix.message({ type: "error", text: message });
}

export function pager(view, page, totalPage, pagerId) {
  var cols = [];
  var prev;
  var next;
  if (page > 1) prev = 2;
  else prev = page;
  if (totalPage - page > 5 - prev) next = 4 - prev;
  else next = totalPage - page - 1;

  var f = { view: "button", label: "<<", width: 60, height: 35, on: { onItemClick: () => { view.pagerFunction(0) } } }
  cols.push(f);
  var p = { view: "button", label: "<", width: 60, height: 35, on: { onItemClick: () => { view.pagerFunction(page - 1) } } }
  cols.push(p);

  for (var i = 0; i < prev; i++) {
    let id = page - prev + i + 1;
    var button = { view: "button", label: id, width: 60, height: 35, on: { onItemClick: () => { view.pagerFunction(id - 1) } } }
    cols.push(button);
  }
  var btt = { view: "button", type: "form", label: page + 1, width: 60, height: 35, on: { onItemClick: () => { view.pagerFunction(page) } } }
  cols.push(btt);
  for (var i = 0; i < next; i++) {
    let label = page + i + 2;
    var button = { view: "button", label: label, width: 60, height: 35, on: { onItemClick: () => { view.pagerFunction(label - 1) } } }
    cols.push(button);
  }
  var nextValue = page + 1;
  if (nextValue >= totalPage) nextValue = totalPage - 1;
  var n = { view: "button", label: ">", width: 60, height: 35, on: { onItemClick: () => { view.pagerFunction(nextValue) } } }
  cols.push(n);
  var l = { view: "button", label: ">>", width: 60, height: 35, on: { onItemClick: () => { view.pagerFunction(totalPage - 1) } } }
  cols.push(l);

  webix.ui({ id: pagerId, cols: cols }, view.$$(pagerId));
}

export function numpad(cfg) {
  if ($$('calc-win')) { $$('calc-win').close(); return; }
  cfg = cfg || {};
  cfg.lt = new Date().getTime();

  function fx(a) {
    if (new Date().getTime() - cfg.lt < 10) return;

    cfg.lt = new Date().getTime();

    var calcVal = $$('calc-val');
    var pv = a.substr(8, 1),
      cv = calcVal.getValue();
    if (a.startsWith('calc-but')) switch (pv) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        if (cv && cv != '0') calcVal.setValue(cv + pv);
        else calcVal.setValue(pv);
        break;
      case 'd':
        if (cv.indexOf('.') == -1) calcVal.setValue(cv + '.');
        break;
      case 'c':
        $$('calc-win').close();
        return;
        calcVal.setValue('0');
        break;
      case 'b':
        if (cv.length > 1) calcVal.setValue(cv.substr(0, cv.length - 1));
        else calcVal.setValue('0');
        break;
      case 'e':
        if (cfg.callback) cfg.callback(1 * cv);
        $$('calc-win').close();
        break;
      case '-':
        if (cv.startsWith('-')) calcVal.setValue(cv.substr(1));
        else calcVal.setValue('-' + cv);
        break;
    }
  }
  var calcWin = {
    rows: [{
      cols: [{
          rows: [
            { view: "text", readonly: true, value: cfg.initialValue || '0', id: "calc-val", width: 217, height: 48 },
            {
              padding: 5,
              margin: 5,
              cols: [
                { view: "button", label: "7", id: "calc-but7", width: 65, height: 55, click: fx },
                { view: "button", label: "8", id: "calc-but8", width: 65, height: 55, click: fx },
                { view: "button", label: "9", id: "calc-but9", width: 65, height: 55, click: fx }
              ]
            },
            {
              padding: 5,
              margin: 5,
              borderless: false,
              cols: [
                { view: "button", label: "4", id: "calc-but4", width: 65, height: 55, click: fx },
                { view: "button", label: "5", id: "calc-but5", width: 65, height: 55, click: fx },
                { view: "button", label: "6", id: "calc-but6", width: 65, height: 55, click: fx }
              ]
            },
            {
              padding: 5,
              margin: 5,
              cols: [
                { view: "button", label: "1", id: "calc-but1", width: 65, height: 55, click: fx },
                { view: "button", label: "2", id: "calc-but2", width: 65, height: 55, click: fx },
                { view: "button", label: "3", id: "calc-but3", width: 65, height: 55, click: fx }
              ]
            },
            {
              padding: 5,
              margin: 5,
              cols: [
                { view: "button", label: "0", id: "calc-but0", width: 65, height: 55, click: fx },
                cfg.hasDecimal === false ? {} : { view: "button", label: ".", id: "calc-butd", width: 65, height: 55, click: fx },
                cfg.hasNegative === false ? {} : { view: "button", label: "-", id: "calc-but-", width: 65, height: 55, click: fx }
              ]
            }
          ]
        },
        {
          width: 70,
          rows: [{
            padding: 5,
            width: 68,
            height: 48,
            cols: [
              { view: "button", id: "calc-butb", click: fx, type: "htmlbutton", label: '<span class="webix_icon fa-angle-left"></span>', width: 60 }
            ]
          }, {
            padding: 5,
            margin: 5,
            width: 68,
            height: 131,
            cols: [
              { view: "button", id: "calc-butc", click: fx, label: "C", width: 60 }
            ]
          }, {
            padding: 5,
            margin: 5,
            width: 68,
            height: 131,
            cols: [
              { view: "button", id: "calc-bute", click: fx, type: "form", label: 'OK', width: 60 }
            ]
          }]
        }
      ]
    }]
  };

  webix.ui({
    view: "window",
    modal: true,
    id: "calc-win",
    head: {
      view: "toolbar",
      cols: [
        { view: "label", label: cfg.msg || "Yeni deger giriniz" },
        {
          view: "icon",
          icon: "times",
          click: function() {
            $$("calc-win").close();
          }
        }
      ]
    },
    position: "center",
    body: calcWin
  }).show();
}

export function showSummary(object, header, name) {
  var summary = {
    view: "window",
    move: true,
    resize: true,
    width: 500,
    height: 700,
    head: false,
    position: "center",
    id: "summaryPopup",
    body: {
      view: "form",
      elementsConfig: {
        labelWidth: 100
      },
      elements: [{
        rows: [{
            view: "toolbar",
            cols: [{ view: "label", label: name }, {}, { view: "icon", icon: "window-close", click: () => { webix.$$("summaryPopup").close() } }]
          },
          {
            view: "form",
            scroll: true,
            elements: [{
              rows: []
            }]
          }
        ]
      }]
    }
  }
  var objectKeys = Object.keys(object);
  var headerKeys = Object.keys(header);
  for (var i = 0; i < objectKeys.length; i++) {
    for (var j = 0; j < headerKeys.length; j++) {
      if (objectKeys[i] == headerKeys[j]) {
        //note: here header[0] is the header's name, so in the grid the name of the header should be in the first index
        var row = { view: "text", value: object[objectKeys[i]], label: header[headerKeys[j]].header[0].text, readonly: true };
        summary.body.elements[0].rows[1].elements[0].rows.push(row);
        break;
      }
    }
  }
  webix.ui(summary).show();
}

export const gMapApiKey = "AIzaSyC4n8lEdIIep_8Gmgfd4rW3p-qI4QfeTck";