import { ChatHeader } from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        memberId: string;
        serversId: string;
    }
}

const MemberIdPage = async ({
    params
}: MemberIdPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const currentMember = await db.member.findFirst({
        where: {
            serverId: params.serversId,
            profileId: profile.id,
        },
        include: {
            profile: true,
        },
    });

    if (!currentMember) {
        return redirect("/")
    }

    const conversation = await getOrCreateConversation(currentMember.id, params.memberId)

    if(!conversation) {
        return redirect(`/servers/${params.serversId}`)
    }

    const { memberOne, memberTwo } = conversation;

    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

    return ( 
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                imageUrl={otherMember.profile.id}
                name={otherMember.profile.name}
                serverId={params.serversId}
                type="conversation"
            />
        </div>
    );
}

export default MemberIdPage;