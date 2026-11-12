export default function handler(req, res) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const host = req.headers.host;
  const redirectUri = `https://${host}/api/callback`;
  const authorizeUrl =
    `https://github.com/login/oauth/authorize?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;
  res.writeHead(302, { Location: authorizeUrl });
  res.end();
}
