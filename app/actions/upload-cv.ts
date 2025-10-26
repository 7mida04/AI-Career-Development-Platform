'use server'

export async function uploadCV(formData: FormData) {
  try {
    const file = formData.get('file') as File
    if (!file) {
      throw new Error('No file provided')
    }

    // Create form data for the FastAPI request
    const apiFormData = new FormData()
    apiFormData.append('file', file)

    // Make parallel requests to both endpoints
    const [educationResponse, jobsResponse,profileResponse, courseraResponse] = await Promise.all([
      fetch('http://127.0.0.1:8000/recommend-education', {
        method: 'POST',
        body: apiFormData,
      }),
      fetch('http://127.0.0.1:8000/recommend-jobs', {
        method: 'POST',
        body: apiFormData,
      }),
      fetch('http://127.0.0.1:8000/extract-profile', {
        method: 'POST',
        body: apiFormData,
      }),
      fetch('http://127.0.0.1:8000/recommend-courses', {
        method: 'POST',
        body: apiFormData,
        
      })
    ])

    if (!educationResponse.ok || !jobsResponse.ok || !profileResponse.ok || !courseraResponse.ok) {
      throw new Error('Failed to get recommendations')
    }

    const educationData = await educationResponse.json()
    const jobsData = await jobsResponse.json()
    const courseraData = await courseraResponse.json()
    const profileData = await profileResponse.json()

    return {
      success: true,
      education: educationData,
      jobs: jobsData,
      profile: profileData,
      coursera:courseraData
    }
  } catch (error) {
    console.error('Error uploading CV:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred'
    }
  }
}

