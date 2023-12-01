let scriptAppended = false;

export function PaypalSdk(client_id) {
    return new Promise((resolve, reject) => {
        if (!scriptAppended) {
            const script = document.createElement('script');
            script.src = 'https://www.paypal.com/sdk/js?client-id=' + client_id
            script.onload = () => {
                scriptAppended = true;
                resolve();
            };
            script.onerror = () => {
                reject(new Error('Failed to load paypal sdk script'));
            };
            document.head.appendChild(script);
        } else {
            resolve();
        }
    });
}