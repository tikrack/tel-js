let initail = {
    token: "",
    chat_id: "",
}

class TelJs {
    constructor(token, chat_id) {
        if (!token || !chat_id) {
            console.error("enter chat_id or token in the class")
            return    
        }

        initail.token = token;
        initail.chat_id = chat_id;

        return new Proxy(this, {
            get(target, prop, receiver) {
                if (typeof target[prop] === 'function' && prop !== 'runOnEveryMethod') {
                    return function(...args) {
                        target.runOnEveryMethod();
                        return target[prop].apply(target, args);
                    };
                }
                return Reflect.get(target, prop, receiver);
            }
        });
    }

    runOnEveryMethod() {
        console.log('این تابع قبل از هر متد اجرا می‌شود', initail);
    }

    test() {
        console.log(initail);
    }
}


export default TelJs