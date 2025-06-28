import ChatPage from './chat-client';

export default async function ChatLayout({ params }: { params: { agentId: string } }) {
  return <ChatPage agentId={params.agentId} />;
}
