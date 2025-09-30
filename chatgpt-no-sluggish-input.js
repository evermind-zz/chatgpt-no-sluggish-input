// ==UserScript==
// @name         Unsluggish ChatGPT Input
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  In a long chat typing is very sluggish. This script adds an alternative input area. (De)activate it via Ctrl+Alt+i
// @author       evermind-zz
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.FAST_INPUT_DEBUG = true;
    let overlay = null;
    const MAX_HEIGHT = 300;

    function logDebug(msg, ...args) {
        if (window.FAST_INPUT_DEBUG) console.log(`[FastInputOverlay] ${msg}`, ...args);
    }

    function getTextContainer() {
        const container = document.querySelector('#prompt-textarea');
        logDebug('getTextContainer:', container);
        return container;
    }

    function adjustHeight(el) {
        el.style.height = 'auto';
        el.style.height = Math.min(el.scrollHeight, MAX_HEIGHT) + 'px';
        el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
        logDebug('adjustHeight:', el.style.height);
    }

    function waitForSendButton(maxTime = 2000, intervalTime = 50) {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const interval = setInterval(() => {
                const btn = document.querySelector('#composer-submit-button');
                if (btn) {
                    clearInterval(interval);
                    logDebug('Send button found');
                    resolve(btn);
                } else if (Date.now() - start > maxTime) {
                    clearInterval(interval);
                    logDebug('Send button not found within timeout');
                    reject('Send button not found');
                }
            }, intervalTime);
        });
    }

    function createOverlay() {
        if (overlay) return;

        overlay = document.createElement('textarea');
        overlay.id = 'fastInputOverlay';
        overlay.placeholder = 'Type here and press Enter (Shift+Enter for newline)...';
        overlay.style.position = 'fixed';
        overlay.style.bottom = '20px';
        overlay.style.left = '50%';
        overlay.style.transform = 'translateX(-50%)';
        overlay.style.width = '60%';
        overlay.style.height = '80px';
        overlay.style.zIndex = '9999';
        overlay.style.fontSize = '16px';
        overlay.style.padding = '10px';
        overlay.style.border = '2px solid #0078D7';
        overlay.style.borderRadius = '8px';
        overlay.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        overlay.style.background = '#fff';
        overlay.style.resize = 'none';
        overlay.style.display = 'none';
        overlay.style.overflowY = 'hidden';

        document.body.appendChild(overlay);
        logDebug('Overlay created');

        overlay.addEventListener('input', () => adjustHeight(overlay));

        overlay.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();

                const text = overlay.value;
                if (!text.trim()) return;

                const container = getTextContainer();
                if (!container) {
                    logDebug('Text container not found');
                    return;
                }

                // Split overlay text into paragraphs, preserve empty lines
                const lines = text.split('\n');
                const html = lines.map(line => `<p>${line || '&nbsp;'}</p>`).join('');
                container.innerHTML = html;
                logDebug('Overlay text copied:', lines);

                // Wait for send button and click it
                waitForSendButton()
                    .then(btn => btn.click())
                    .catch(console.error);

                // Clear overlay and refocus
                overlay.value = '';
                adjustHeight(overlay);
                overlay.focus();
            }
        });
    }

    function toggleOverlay() {
        if (!overlay) createOverlay();
        if (overlay.style.display === 'none' || overlay.style.display === '') {
            overlay.style.display = 'block';
            overlay.focus();
            adjustHeight(overlay);
            logDebug('Overlay shown');
        } else {
            overlay.style.display = 'none';
            logDebug('Overlay hidden');
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'i') {
            e.preventDefault();
            e.stopPropagation();
            toggleOverlay();
        }
    }, true);

    window.addEventListener('load', () => {
        setTimeout(createOverlay, 1000);
    });
})();
