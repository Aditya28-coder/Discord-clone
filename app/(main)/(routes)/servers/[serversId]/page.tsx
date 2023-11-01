import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdPageProps {
    params: {
        serversId: string
    }
}


const serverIdPage = async ({
    params
}: ServerIdPageProps) => {
    const profile = await currentProfile()

    if (!profile) {
        return redirectToSignIn()
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serversId,
            members: {
                some: {
                    profileId: profile.id,
                }
            }
        },
        include: {
            channel: {
                where: {
                    name: "general"
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })

    const initialChannel = server?.channel[0]

    if (initialChannel?.name !== "general") {
        return null;
    }
    

    return redirect(`/servers/${params.serversId}/channels/${initialChannel?.id}`)
}

export default serverIdPage;