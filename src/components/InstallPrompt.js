import React, { useEffect, useState } from 'react';

/*
 * Renders a small "Install app" button when the browser fires the
 * `beforeinstallprompt` event (Chromium-based browsers). The button disappears
 * once the app is installed or the prompt is dismissed.
 */
const InstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e) => {
            // Prevent the default mini-infobar so we can show our own button.
            e.preventDefault();
            setDeferredPrompt(e);
            setVisible(true);
        };

        const handleAppInstalled = () => {
            setVisible(false);
            setDeferredPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) {
            return;
        }
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        // The prompt can only be used once; hide the button regardless of choice.
        setDeferredPrompt(null);
        setVisible(false);
    };

    if (!visible) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={handleInstallClick}
            className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-gray-900"
            aria-label="Install Advanced CoverView app"
        >
            <span aria-hidden="true">⬇️</span>
            Install app
        </button>
    );
};

export default InstallPrompt;
