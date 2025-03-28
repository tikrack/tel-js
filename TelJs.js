let initail = {
  token: "",
  chat_id: "",
};

class TelJs {
  constructor(token, chat_id) {
    if (!token || !chat_id) {
      console.error("enter chat_id or token in the class");
      return;
    }

    initail.token = token;
    initail.chat_id = chat_id;

    return new Proxy(this, {
      get(target, prop, receiver) {
        if (typeof target[prop] === "function" && prop !== "runOnEveryMethod") {
          return function (...args) {
            target.runOnEveryMethod();
            return target[prop].apply(target, args);
          };
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  }

  runOnEveryMethod() {
    // this method run before all methodes
  }

  async send(text) {
    if (!text) {
      console.error("Text prop cannot be empty");
    }

    let response = await fetch(
      `https://telegram-send-js2.tikrackcode.workers.dev/?token=${initail.token}&id=${initail.chat_id}&text=${text}`
    );

    let json = await response.json();

    return json;
  }
}

export default TelJs;
