'use client'

import { useEffect, useState } from 'react'

interface N8nDemoWebComponentProps {
  workflowUrl?: string
}

export default function N8nDemoWebComponent({ workflowUrl = '/workflow.json' }: N8nDemoWebComponentProps) {
  const [workflow, setWorkflow] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component/n8n-demo.bundled.js'
    script.type = 'module'
    document.head.appendChild(script)

    // Fetch workflow data
    fetch(workflowUrl)
      .then(res => res.json())
      .then(data => {
        // Extract only the core workflow data that the web component expects
        const workflowData = {
          nodes: data.nodes || [],
          connections: data.connections || {}
        }
        setWorkflow(JSON.stringify(workflowData))
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load workflow:', err)
        setLoading(false)
      })

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [workflowUrl])

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">N8n Demo Web Component</h2>
        <p>Loading workflow...</p>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">N8n Demo Web Component</h2>
      <div dangerouslySetInnerHTML={{ __html: `<n8n-demo workflow='${workflow}'></n8n-demo>` }} />
    </div>
  )
}