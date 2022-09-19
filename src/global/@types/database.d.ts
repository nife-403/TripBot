/* eslint-disable no-unused-vars */

export type userDbEntry = {
    name: string;
    karma?: {
        karma_given: number;
        karma_received: number;
    }
    discord?: discordEntry;
    birthday?: {
        month: string;
        day: number;
    };
    timezone?: string;
    experience?: {
        general?: expEntry
        tripsitter?: expEntry
        developer?: expEntry
    }
}

export type expEntry = {
    level: number,
    levelExpPoints: number,
    totalExpPoints: number,
    lastMessageDate: number,
    lastMessageChannel: string,
}


export type discordEntry = {
    id: string;
};

export type ticketDbEntry = {
    name: string;
    issueThread: string;
    issueStatus: 'open' | 'closed' | 'blocked' | 'paused';
}

export type reactionRoleList = {
    [key: string]: {
        channelName?: string;
        [key:string]: reactionRole[];
    }
}

export type reactionRole = {
    messageId?: string;
    name: string;
    reaction: string;
    roleId: string;
}