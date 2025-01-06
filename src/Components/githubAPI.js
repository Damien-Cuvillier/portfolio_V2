const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const fetchRepoLanguages = async (repoUrl) => {
  try {
    if (!GITHUB_TOKEN) {
      throw new Error("GitHub token is missing!");
    }

    console.log('Fetching repo data from:', repoUrl);
    
    const response = await fetch(repoUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Response:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      throw new Error(`GitHub API request failed: ${errorData.message}`);
    }

    const data = await response.json();
    console.log('Data fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchRepoLanguages:', error);
    return { error: error.message };
  }
};