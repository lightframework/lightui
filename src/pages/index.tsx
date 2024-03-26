import { chatsPageListApiChatChats } from "@/services/chat/chats"

export default function Home() {
  chatsPageListApiChatChats({})

  return <div>首页</div>
}
