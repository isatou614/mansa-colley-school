export default async function handler(req, res) {
  const { code } = req.query;

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: process.env.GITHUB_OAUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET,
      code,
    }),
  });
  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    res.setHeader("Content-Type", "text/html");
    res.end(renderScript("error", { message: tokenData.error_description || tokenData.error }));
    return;
  }

  res.setHeader("Content-Type", "text/html");
  res.end(renderScript("success", { token: tokenData.access_token, provider: "github" }));
}

function renderScript(status, payload) {
  // Safely embed the payload as a JS string literal inside the generated
  // <script> tag (JSON.stringify twice: once for the payload object, once
  // to escape that JSON string for embedding inside the outer template).
  const payloadJson = JSON.stringify(JSON.stringify(payload));
  return `<!DOCTYPE html><html><body><script>
    (function() {
      function receiveMessage(e) {
        window.opener.postMessage(
          "authorization:github:${status}:" + ${payloadJson},
          e.origin
        );
        window.removeEventListener("message", receiveMessage, false);
      }
      window.addEventListener("message", receiveMessage, false);
      window.opener.postMessage("authorizing:github", "*");
    })();
  </script></body></html>`;
}
