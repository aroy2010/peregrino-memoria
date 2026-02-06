export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // OAuth callback handler
  const code = url.searchParams.get('code');
  if (!code) {
    return new Response('No code provided', { status: 400 });
  }
  
  // Exchange code for token (simplified)
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new URLSearchParams({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code: code
    })
  });
  
  const tokenData = await tokenResponse.json();
  
  return new Response(JSON.stringify(tokenData), {
    headers: { 'Content-Type': 'application/json' }
  });
}
