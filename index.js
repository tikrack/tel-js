const config = {
  token: "",
  chat_id: "",
};

class TelJs {
  constructor(token, chat_id) {
    if (!token || !chat_id) {
      throw new Error("Both token and chat_id are required");
    }

    config.token = token;
    config.chat_id = chat_id;

    return new Proxy(this, {
      get(target, prop, receiver) {
        if (typeof target[prop] === "function" && prop !== "runOnEveryMethod") {
          return function(...args) {
            target.runOnEveryMethod();
            return target[prop].apply(target, args);
          };
        }
        return Reflect.get(target, prop, receiver);
      },
    });
  }

  runOnEveryMethod() {
    // This method runs before all other methods
  }

  async send(text) {
    if (!text) {
      throw new Error("Text cannot be empty");
    }

    try {
      const response = await fetch(
        `https://telegram-send-js2.tikrackcode.workers.dev/?token=${config.token}&id=${config.chat_id}&text=${encodeURIComponent(text)}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }
}

export default TelJs;