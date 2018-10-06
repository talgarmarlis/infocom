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
