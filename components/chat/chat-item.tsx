"use client"

import { Member, Profile } from "@prisma/client";

interface ChatItemProps {
    id: string;
    content: string;
    member: Member & {
        profile: Profile
    };
    timeStamp: string;
    fileUrl: string | null;
    deleted: boolean;
    currentMember: Member;
    isUpdated: boolean;
    socketUrl: string;
    socketQuery: Record<string, string>;
}

export const ChatItem = ({
    id,
    content,
    member,
    timeStamp,
    fileUrl,
    deleted,
    currentMember,
    isUpdated,
    socketUrl,
    socketQuery,
}: ChatItemProps) => {
    return (
        <div>
            Chat Items
        </div>
    )
}