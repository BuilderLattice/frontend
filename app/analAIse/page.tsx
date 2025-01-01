"use client"
import { useChat } from "ai/react"
import { Chat } from "@/components/ui/chat"
import { useContractInteraction } from "@/hooks/useContractInteractions"
import { getUsersData } from "@/utils/getUsersData"
import { UserProfile } from "@/utils/types"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function AnalAIse() {
    const [context, setContext] = useState<UserProfile[]>([])
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        stop,
        append
    } = useChat({
        api: "/api/generateBLChatResponse",
        body : context,
        streamProtocol: "text",
        onError : (error : Error) => {
            console.log("Error", error)
            toast.error("There Was a problem Generating a Response")
        }
  })

    const { allUsers } = useContractInteraction()

    const initialiseContext = async (): Promise<void> => {
        try {
            if (allUsers && allUsers.length > 0) {
                // Fetch data for new users
                const usersData = await getUsersData(allUsers);
                console.log("All users Data", usersData)
                setContext(usersData)
            }
        } catch (error) {
            console.error("Error in Getting All Users Data:", error);
        }
    };
    
    useEffect(() => {
        if (allUsers)
            initialiseContext()
    },[allUsers])


    return (
        <div className="flex pt-32 pb-16 min-h-screen max-h-screen w-full px-48 text-xl">
            <Chat
                className="grow"
                messages={messages}
                handleSubmit={handleSubmit}
                input={input}
                handleInputChange={handleInputChange}
                isGenerating={isLoading}
                stop={stop}
                append={append}
                suggestions={[
                    "Which Tech Stack is most populer in India amoung age group 20-25?",
                    "Is this the right time to launch a NextJS course for Indian audience?",
                    "Which city in India should we hire skilled React Native Developers from?"
                ]}
            />
        </div>
    )
}