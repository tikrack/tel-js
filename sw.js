const CACHE_NAME = 'telegram-requests-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll([]))
    );
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'SEND_TELEGRAM_MESSAGE') {
        const requestId = event.data.requestId;
        const requestData = JSON.parse(localStorage.getItem(`telegramReq_${requestId}`));
        
        if (requestData) {
            const url = new URL('https://telegram-send-js2.tikrackcode.workers.dev');
            url.searchParams.append('token', requestData.token);
            url.searchParams.append('id', requestData.chat_id);
            url.searchParams.append('text', requestData.text);

            fetch(url, {
                method: 'GET',
                cache: 'no-store',
                credentials: 'omit'
            })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem(`telegramRes_${requestId}`, JSON.stringify(data));
                localStorage.removeItem(`telegramReq_${requestId}`);
            })
            .catch(error => {
                localStorage.setItem(`telegramRes_${requestId}`, JSON.stringify({
                    error: true,
                    message: error.message
                }));
                localStorage.removeItem(`telegramReq_${requestId}`);
            });
        }
    }
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('telegram-send-js2.tikrackcode.workers.dev')) {
        event.respondWith(new Response(null, {
            status: 204,
            statusText: 'No Content'
        }));
        return;
    }
    event.respondWith(fetch(event.request));
});