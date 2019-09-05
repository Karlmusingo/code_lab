import { AuthSession } from "expo";

const githubConfig = {
  clientId: "23c477e2fa2aa9b573c9",
  clientSecret: "435adec59e50268f3a377df272bdd3644eb467ac"
};

const githubFields = [
  "user",
  "public_repo",
  "repo",
  "repo_deployment",
  "repo:status",
  "read:repo_hook",
  "read:org",
  "read:public_key",
  "read:gpg_key"
];

const githubLogin = async () => {
  let redirectUrl = AuthSession.getRedirectUrl();
  console.log(redirectUrl);
  try {
    const { params } = await AuthSession.startAsync({
      authUrl:
        `https://github.com/login/oauth/authorize` +
        `?client_id=${githubConfig.clientId}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&scope=${encodeURIComponent(githubFields.join(" "))}`
    });

    const accessTokenUrl =
      `https://github.com/login/oauth/access_token` +
      `?client_id=${githubConfig.clientId}` +
      `&client_secret=${githubConfig.clientSecret}` +
      `&code=${params.code}`;

    const res = await fetch(accessTokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();

    return data;
  } catch ({ message }) {
    throw new Error(`Github Auth: ${message}`);
  }
};

export default githubLogin;
