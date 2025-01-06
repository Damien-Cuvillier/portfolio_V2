const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const fetchRepoLanguages = async (repoUrl) => {
  try {
    if (!GITHUB_TOKEN) {
      throw new Error("GitHub token is missing! Please check your .env file.");
    }

    // Vérification du token
    const verificationResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`, // Changé de 'Bearer' à 'token'
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (!verificationResponse.ok) {
      throw new Error("GitHub token is invalid or expired");
    }

    // Requête pour les langages
    const response = await fetch(repoUrl, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`, // Changé de 'Bearer' à 'token'
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`GitHub API request failed: ${errorData.message || response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching GitHub data:', error.message);
    return { error: error.message };
  }
};