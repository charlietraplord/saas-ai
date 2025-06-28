# SaaS AI Agent Platform

> **Documentation Status**: This documentation is actively maintained. Any changes to the codebase should be reflected here.
> Last updated: June 10, 2025

A modern, multi-tenant AI agent platform built with Next.js 13, inspired by the Nexux theme. Features real-time chat, usage tracking, and PayFast integration for the South African market.

## 🚀 Key Features

- **Modern UI Design**
  - Stunning gradients and glass-morphism effects
  - Smooth animations and transitions
  - Fully responsive design
  - Nexux theme-inspired components

- **AI Agent Platform**
  - Hugging Face-powered conversational AI
  - Real-time messaging with Socket.IO
  - Usage tracking and Redis rate limiting
  - Multi-tenant architecture
  - Customizable system prompts
  - Model selection flexibility

- **South African Payment Integration**
  - PayFast payment gateway
  - Usage-based billing
  - Subscription management
  - Payment webhook handling

- **Advanced Dashboard**
  - Modern analytics with trend visualization
  - Team management with role-based access
  - Customizable agent configuration
  - Real-time usage monitoring
  - Smart billing interface
  - Intuitive settings management

## 🛠️ Technical Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL with Prisma Accelerate
- **AI**: Hugging Face Inference API
- **Real-time**: Socket.IO
- **Rate Limiting**: Upstash Redis
- **Authentication**: NextAuth.js
- **Payments**: PayFast Integration

## 🔧 Environment Setup

1. Clone the repository
2. Copy `.env.example` to `.env`
3. Configure the following environment variables:
   - `DATABASE_URL`: PostgreSQL connection string (Prisma Accelerate URL)
   - `HUGGINGFACE_API_KEY`: Your Hugging Face API key
   - `UPSTASH_REDIS_URL` and `UPSTASH_REDIS_TOKEN`: For rate limiting (from Upstash)
   - `NEXTAUTH_SECRET` and `NEXTAUTH_URL`: For authentication
   - `PAYFAST_*`: PayFast integration credentials
   - `NEXT_PUBLIC_APP_URL`: Your app's public URL

4. Install dependencies:

   ```bash
   npm install
   ```

5. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

## 📦 Project Structure

```
src/
├── app/                 # Next.js 13 app directory
│   ├── components/      # React components
│   │   ├── ui/         # Core UI components
│   │   ├── shared/     # Shared components
│   │   └── providers/  # Context providers
│   ├── api/            # API routes
│   └── dashboard/      # Dashboard pages
├── styles/             # Global styles
├── lib/               # Utility functions
└── config/            # Site configuration
```

## 🎨 Customization

- Edit `src/styles/globals.css` for theme variables
- Modify `tailwind.config.ts` for design tokens
- Update `src/config/site.ts` for site metadata

## ⚠️ Important Notes

### Chat Client Implementation

When implementing chat features:

1. Always validate message format:

   ```typescript
   function isValidChatMessage(message: unknown): message is ChatMessage {
     if (!message || typeof message !== 'object') return false;
     const m = message as Partial<ChatMessage>;
     return (
       typeof m.id === 'string' &&
       (m.from === 'user' || m.from === 'bot') &&
       typeof m.content === 'string' &&
       m.createdAt !== undefined
     );
   }
   ```

2. Initialize state properly:

   ```typescript
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   ```

3. Handle edge cases:
   - Empty message lists
   - Socket connection errors
   - Invalid message formats
   - Loading states

### Next.js Route Parameters

When working with route parameters:

1. Server Components:
   - Use async/await pattern
   - Access params directly from props

   ```typescript
   export default async function Page({ params }: { params: { agentId: string } }) {
     return <ChatPage agentId={params.agentId} />;
   }
   ```

2. Client Components:
   - Use 'use client' directive
   - Receive params through props

   ```typescript
   'use client';
   
   export default function ChatPage({ agentId }: { agentId: string }) {
     // Use agentId directly
   }
   ```

### WebSocket Implementation

1. Socket Provider:
   - Use the `socket-provider.tsx` for WebSocket context
   - Manage connection state globally
   - Handle reconnection automatically

   ```typescript
   const { socket, joinChat, leaveChat } = useSocket();
   ```

2. Chat Room Management:
   - Join specific agent chat rooms
   - Handle cleanup on unmount
   - Implement proper error recovery

   ```typescript
   useEffect(() => {
     if (!agentId) return;
     joinChat(agentId);
     return () => leaveChat(agentId);
   }, [agentId, joinChat, leaveChat]);
   ```

3. Message Handling:
   - Validate all incoming messages
   - Maintain message order
   - Handle connection drops gracefully

### Real-time Features

1. Message Queue:
   - Buffer messages during connection loss
   - Retry failed message delivery
   - Preserve message order

2. Connection Management:
   - Auto-reconnect on connection loss
   - Handle room rejoining
   - Maintain session state

3. Error Recovery:
   - Implement fallback mechanisms
   - Cache messages locally
   - Provide offline capabilities

### Best Practices

1. Component Architecture:
   - Separate server and client concerns
   - Keep state management close to UI
   - Implement proper error boundaries

2. Error Handling:
   - Validate all incoming data
   - Handle network failures gracefully
   - Provide clear user feedback

3. Performance:
   - Initialize state properly
   - Clean up event listeners
   - Manage loading states

## 🧠 Together API (Hugging Face) Integration

- The backend supports OpenAI-compatible chat completions via the Together API router (Hugging Face).
- Use the `togetherChatCompletion` utility in `lib/huggingface.ts` for LLM chat.
- Example model: `deepseek-ai/DeepSeek-R1` (see saasaiagent.txt for more context).
- API key is read from `HUGGINGFACE_API_KEY` in `.env`.
- Example payload and endpoint are OpenAI-style, as shown in the project and documentation.

### Example Agent Model

```
model: "deepseek-ai/DeepSeek-R1"
```

### Example API Call

```
curl https://router.huggingface.co/together/v1/chat/completions \
  -H 'Authorization: Bearer <your_token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "messages": [{"role": "user", "content": "Hello!"}],
    "model": "deepseek-ai/DeepSeek-R1"
  }'
```

## 📝 Documentation Guidelines

1. **Documentation Updates**
   - Update documentation whenever you make code changes
   - Keep UPDATES.md current with all significant changes
   - Include code examples for new features
   - Document breaking changes prominently

2. **File Structure**
   - README.md: Project overview and setup
   - UPDATES.md: Changelog and updates
   - Code comments: Implementation details
   - API documentation: Endpoint specifications

3. **Best Practices**
   - Document all environment variables
   - Include usage examples
   - Explain breaking changes
   - Keep setup instructions current
   - Update version numbers

4. **Code Examples**
   Always include types and error handling:

   ```typescript
   interface ChatMessage {
     id: string;
     from: 'user' | 'bot';
     content: string;
     createdAt: Date;
   }

   // Type guard example
   function isValidMessage(msg: unknown): msg is ChatMessage {
     if (!msg || typeof msg !== 'object') return false;
     const m = msg as Partial<ChatMessage>;
     return Boolean(m.id && m.from && m.content && m.createdAt);
   }
   ```
