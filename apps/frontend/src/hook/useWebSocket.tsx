import { useRef } from 'react';

interface WebSocketConfig {
    wsUrl: string;
    messageHandler: (event: MessageEvent) => void;
    handleFinish?: () => void;
    handleReconnect?: () => void;
}

const useWebSocket = ({
    wsUrl,
    messageHandler,
    handleFinish,
    handleReconnect,
}: WebSocketConfig) => {
    const ws = useRef<WebSocket | null>(null);
    const messageQueue = useRef<string[]>([]);

    const beginConnection = () => {
        if (ws.current !== null) {
            return;
        }

        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            while (messageQueue.current.length > 0) {
                const message = messageQueue.current.shift()!;
                sendMessage(message);
            }
        };

        ws.current.onclose = (ev: CloseEvent) => {
            const { wasClean, reason } = ev;

            ws.current = null;

            if (reason == 'finish') {
                handleFinish?.();
            }

            if (!wasClean) {
                handleReconnect?.();
            }
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.current.onmessage = messageHandler;
    };

    const sendMessage = (message: string) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(message);
        } else {
            console.warn('WebSocket is not connected. Message not sent:', message);
            messageQueue.current.push(message);
        }
    };

    const closeConnection = () => {
        ws.current?.close();
    };

    return { beginConnection, sendMessage, closeConnection };
};

export default useWebSocket;
