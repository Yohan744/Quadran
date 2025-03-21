import { IRoles } from './IRoles';

export interface IMessageData {
    sessionId: string;
    content: string;
    role: IRoles;
}