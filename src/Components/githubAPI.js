export const fetchRepoLanguages = async (repoUrl) => {
  try {
    console.log('Making request to:', repoUrl);
    
    const response = await fetch(repoUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`GitHub API request failed: ${errorData.message}`);
    }

    const data = await response.json();
    console.log('Languages data received:', data);
    return data;
  } catch (error) {
    console.error('Request failed:', error);
    return { error: error.message };
  }
};