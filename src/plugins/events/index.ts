import { SSEManager } from './impl/sse.manager';
import events from './listeners';

const sseManager = new SSEManager({
    url: 'http://localhost:3000/api/events/subscribe',
    listeners: events,
});

export default sseManager;
