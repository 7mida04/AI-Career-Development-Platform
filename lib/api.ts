export async function uploadCV(file: File, endpoint: 'jobs' | 'education') {
    const formData = new FormData()
    formData.append('file', file)
  
    try {
      const response = await fetch(`http://localhost:3000/recommend-${endpoint}`, {
        method: 'POST',
        body: formData,
      })
  
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
  
      return await response.json()
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }
  
  