import {ISessionData} from "~/types/ISessionData";
import { v4 } from 'uuid';

/**
 * Génère un ID de session unique.
 * @param {Object} sessions - L'objet contenant les sessions existantes.
 * @returns {number} - Un identifiant de session unique.
 */
export function generateUniqueSessionId(sessions: ISessionData): string {
    let sessionId: any;
    do {
        sessionId = v4();
    } while (sessions[sessionId]);
    return sessionId;
}

