import ChatPage from './chat-client';

export default async function Page({ params }: { params: { agentId: string } }) {
  // Access the agentId directly in an async component
  return <ChatPage agentId={params.agentId} />;
}