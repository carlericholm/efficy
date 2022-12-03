const oppoStatus = [
  {
    K_OPPO_STATUS: 1,
    STATUS: "1. Initial Contact",
    SUCCESS: 0,
  },
  {
    K_OPPO_STATUS: 2,
    STATUS: "2. Demonstration",
    SUCCESS: 25,
  },
  {
    K_OPPO_STATUS: 3,
    STATUS: "3. Proposal",
    SUCCESS: 50,
  },
  {
    K_OPPO_STATUS: 4,
    STATUS: "4. Negotiation",
    SUCCESS: 75,
  },
  {
    K_OPPO_STATUS: 5,
    STATUS: "5. Order",
    SUCCESS: 100,
  },
];

const FormComponent = class {
  constructor() {
    this.form = document.querySelector("form");
    this.select = document.querySelector("[name='status']");
    this.input = document.querySelector("[name='success']");
    this.button = document.querySelector("button");
  }

  start() {
    this.setAttributes();
    this.setFormHandling();
    this.setOptions();
    this.setInputValue(oppoStatus[0].STATUS);
  }

  setAttributes() {
    this.input.setAttribute("id", "successValue");
    this.button.setAttribute("id", "submitButton");

    const wrapper = document.createElement("div");
    const child = document.getElementById("submitButton");

    wrapper.appendChild(child.cloneNode(true));
    child.parentNode.replaceChild(wrapper, child);
  }

  setFormHandling() {
    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(this.form);
      const output = document.getElementsByClassName("output")[0];
      const formValues = [...formData.entries()];
      const outputValue = formValues.map(([key, value]) => [
        key,
        Number(value),
      ]);

      output.textContent = JSON.stringify(Object.fromEntries(outputValue));
    });
  }

  setOptions() {
    this.select.addEventListener("change", (event) => {
      this.setInputValue(event.target.value);
    });

    oppoStatus.forEach((element) => {
      let newOption = document.createElement("option");
      newOption.value = element.K_OPPO_STATUS;
      newOption.text = element.STATUS;
      this.select.appendChild(newOption);
    });
  }

  setInputValue(value) {
    if (value) {
      const successValue = oppoStatus.find(
        (el) => el.K_OPPO_STATUS === parseInt(value)
      );
      if (successValue) {
        this.input.value = successValue.SUCCESS;
      }
    }
  }
};

window.addEventListener("load", () => {
  const fc = new FormComponent();
  fc.start();
});
