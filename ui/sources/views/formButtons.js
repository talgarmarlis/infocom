export function FormButtons(options) {
  options = options || {};
  return {
    cols: [
      {},
      {

        width: 100,
        view: "button",
        value: options.addButtonText,
        type: "form",
        click: () => {
          if (options.addButtonHandler) {
            options.addButtonHandler();
          }
        }
      },
      {
        width: 100,
        view: "button",
        value: options.updateButtonText,
        click: () => {
          if (options.updateButtonHandler) {
            options.updateButtonHandler();
          }
        }
      },
      {

        width: 100,
        view: "button",
        type: "danger",
        value: options.deleteButtonText,
        click: () => {
          if (options.deleteButtonHandler) {
            options.deleteButtonHandler();
          }
        }
      }
    ]
  }
}