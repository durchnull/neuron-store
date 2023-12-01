let scriptAppended = false;

export function AmazonPayCheckout(region) {
    return new Promise((resolve, reject) => {
        if (!scriptAppended) {
            const script = document.createElement('script');
            script.src = 'https://static-' + region + '.payments-amazon.com/checkout.js'
            script.onload = () => {
                scriptAppended = true;
                resolve();
            };
            script.onerror = () => {
                reject(new Error('Failed to load amazon pay script'));
            };
            document.head.appendChild(script);
        } else {
            resolve();
        }
    });
}