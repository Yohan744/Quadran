// ./types/ISessionData.ts
import {IRoles} from "../../../types/IRoles";

interface ISessionClient {
    id: string;
    role: IRoles;
}

export interface ISessionData {
    [sessionId: number]: ISessionClient[];
}