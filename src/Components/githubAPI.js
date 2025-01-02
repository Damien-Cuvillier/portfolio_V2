const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const fetchRepoLanguages = async (repoUrl) => {
  try {
    if (!GITHUB_TOKEN) {
      throw new Error("GitHub token is missing! Please check your .env file.");
    }

    // Vérifi si token est expiré avant de faire la requête
    const verificationResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });

    if (verificationResponse.status === 401) {
      throw new Error("GitHub token is invalid or expired");
    }

    const response = await fetch(repoUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28'
      },
      cache: 'no-store' // Désactive le cache pour toujours obtenir des données fraîches
    });

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    // Retourner un objet avec une propriété error pour mieux gérer l'erreur dans le composant
    return { error: error.message };
  }
};