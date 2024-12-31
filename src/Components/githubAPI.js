const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const fetchRepoLanguages = async (repoUrl) => {
  try {
    if (!GITHUB_TOKEN) {
      console.error("GitHub token is missing! Please check your .env file.");
      return {};
    }

    // Log pour debug (à retirer en production)
    console.log("Making request with token:", GITHUB_TOKEN.substring(0, 4) + '...');

    const response = await fetch(repoUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (response.status === 401) {
      console.error("Authentication failed. Token might be invalid or expired.");
      return {};
    }

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching repo languages:', error);
    return {};
  }
};