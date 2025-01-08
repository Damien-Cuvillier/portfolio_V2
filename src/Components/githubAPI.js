const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const fetchRepoLanguages = async (repoUrl) => {
  try {
    console.log('Environment:', process.env.NODE_ENV);
    
    // L'URL est déjà correctement formée dans l'appel, pas besoin de la modifier
    console.log('Fetching languages for repo:', repoUrl);

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28'
    };

    // Utiliser directement l'URL fournie
    const response = await fetch(repoUrl, {
      headers
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      throw new Error(`GitHub API request failed: ${errorData.message}`);
    }

    const data = await response.json();
    console.log('Languages data received:', data);
    return data;
  } catch (error) {
    console.error('Detailed error:', error);
    return { error: error.message };
  }
};