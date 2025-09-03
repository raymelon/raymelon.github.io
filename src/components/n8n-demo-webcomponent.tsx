'use client'

import { useEffect, useState } from 'react'

export default function N8nDemoWebComponent() {
  const [workflow, setWorkflow] = useState<string>('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/@n8n_io/n8n-demo-component@1.0.20/docs/n8n-demo.bundled.js'
    script.type = 'module'
    document.head.appendChild(script)

    // Fetch workflow data
    fetch('/workflow.json')
      .then(res => res.json())
      .then(data => {
        setWorkflow(JSON.stringify(data))
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
  }, [])

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