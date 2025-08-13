import { useState, useEffect } from 'react'
import { aiService, getAvailableProviders, type AIProvider } from '../services/aiService'

interface AISettingsProps {
  isOpen: boolean
  onClose: () => void
}

export default function AISettings({ isOpen, onClose }: AISettingsProps) {
  const [provider, setProvider] = useState<AIProvider>('mock')
  const [apiKey, setApiKey] = useState('')
  const [model, setModel] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const providers = getAvailableProviders()

  useEffect(() => {
    // Load saved settings from localStorage
    const savedProvider = localStorage.getItem('ai-provider') as AIProvider
    const savedApiKey = localStorage.getItem('ai-api-key')
    const savedModel = localStorage.getItem('ai-model')

    if (savedProvider) setProvider(savedProvider)
    if (savedApiKey) setApiKey(savedApiKey)
    if (savedModel) setModel(savedModel)
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    
    try {
      // Configure the AI service
      aiService.configure({
        provider,
        apiKey: apiKey || undefined,
        model: model || undefined
      })

      // Save to localStorage
      localStorage.setItem('ai-provider', provider)
      if (apiKey) localStorage.setItem('ai-api-key', apiKey)
      if (model) localStorage.setItem('ai-model', model)

      // Test the connection with a simple message
      await aiService.chat([{ role: 'user', content: 'Hi' }])
      
      alert('AI settings saved successfully!')
      onClose()
    } catch (error) {
      console.error('AI configuration error:', error)
      alert('Failed to configure AI. Please check your settings and try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const selectedProvider = providers.find(p => p.id === provider)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Settings</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Provider Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              AI Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value as AIProvider)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            >
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {selectedProvider && (
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                {selectedProvider.description}
              </p>
            )}
          </div>

          {/* API Key */}
          {selectedProvider?.requiresKey && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                {provider === 'huggingface' && (
                  <p>Get free API key at <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline dark:text-blue-400">huggingface.co/settings/tokens</a></p>
                )}
                {provider === 'groq' && (
                  <p>Get free API key at <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline dark:text-blue-400">console.groq.com/keys</a></p>
                )}
                {provider === 'together' && (
                  <p>Get free API key at <a href="https://api.together.xyz/settings/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline dark:text-blue-400">api.together.xyz</a></p>
                )}
              </div>
            </div>
          )}

          {/* Model Selection */}
          {provider !== 'mock' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Model (Optional)
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder={
                  provider === 'groq' ? 'llama3-8b-8192' :
                  provider === 'together' ? 'meta-llama/Llama-2-7b-chat-hf' :
                  provider === 'huggingface' ? 'microsoft/DialoGPT-medium' :
                  'Model name'
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                Leave empty to use default model
              </p>
            </div>
          )}

          {/* Free Tier Info */}
          <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">Free Tier Information</h4>
            <ul className="mt-1 text-xs text-blue-700 dark:text-blue-300">
              <li>• <strong>Demo Mode:</strong> Works offline, smart contextual responses</li>
              <li>• <strong>Hugging Face:</strong> Free API access to open models</li>
              <li>• <strong>Groq:</strong> Fast inference, generous free tier</li>
                              <li>• <strong>Together AI:</strong> ₹2,000 free credits for new users</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || (selectedProvider?.requiresKey && !apiKey)}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
