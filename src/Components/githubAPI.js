const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const fetchRepoLanguages = async (repoUrl) => {
  try {
    if(!GITHUB_TOKEN) {
      throw new Error("GitHub token is missing!");
    }

    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'Authorization': `token ${GITHUB_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28'
    };

    console.log('Fetching from URL:', repoUrl);
    const response = await fetch(repoUrl, { headers });

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
    return data;
  } catch (error) {
    console.error('Error in fetchRepoLanguages:', error);
    return { error: error.message };
  }
};