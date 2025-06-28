'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type AgentFormData = {
  name: string;
  description: string;
  systemPrompt: string;
};

const defaultData: AgentFormData = {
  name: '',
  description: '',
  systemPrompt: 'You are a medical aid call center agent. Please help customers with their inquiries professionally and politely.',
};

export default function CreateAgent() {
  const router = useRouter();
  const [data, setData] = useState<AgentFormData>(defaultData);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/agents/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to create agent');
      }

      const result = await res.json();
      router.push(`/dashboard/agents/${result.id}/chat`);
    } catch (error) {
      console.error(error);
      alert('Failed to create agent');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="h2 mb-6">Create New Agent</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="label">Name</label>
          <input
            required
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="input"
            placeholder="Medical Aid Support Agent"
          />
        </div>
        
        <div>
          <label className="label">Description</label>
          <textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="input min-h-[100px]"
            placeholder="This agent helps customers with medical aid inquiries..."
          />
        </div>

        <div>
          <label className="label">System Prompt</label>
          <textarea
            value={data.systemPrompt}
            onChange={(e) => setData({ ...data, systemPrompt: e.target.value })}
            className="input min-h-[150px]"
            placeholder="You are a medical aid call center agent..."
          />
          <p className="text-sm text-text-2 mt-2">
            This is the initial prompt that defines your agent&apos;s persona and behavior.
          </p>
        </div>

        <div className="pt-4">
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Create Agent'}
          </button>
        </div>
      </form>
    </div>
  );
}
