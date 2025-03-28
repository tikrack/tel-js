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

        this._registerServiceWorker();

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

    async _registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                });
                console.log('Service Worker registered');
            } catch (error) {
                console.error('Service Worker registration failed:', error);
            }
        }
    }

    runOnEveryMethod() {
        // این متد قبل از تمام متدهای دیگر اجرا می‌شود
    }

    async send(text) {
        if (!text) {
            console.error("Text prop cannot be empty");
            return;
        }

        const requestId = Date.now().toString();
        
        localStorage.setItem(`telegramReq_${requestId}`, JSON.stringify({
            token: initail.token,
            chat_id: initail.chat_id,
            text: text
        }));

        // ارسال پیام به Service Worker
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'SEND_TELEGRAM_MESSAGE',
                requestId: requestId
            });
        }

        // بازگرداندن Promise برای پیگیری وضعیت
        return new Promise((resolve) => {
            const checkResponse = () => {
                const response = localStorage.getItem(`telegramRes_${requestId}`);
                if (response) {
                    localStorage.removeItem(`telegramRes_${requestId}`);
                    resolve(JSON.parse(response));
                } else {
                    setTimeout(checkResponse, 100);
                }
            };
            checkResponse();
        });
    }
}

export default TelJs;