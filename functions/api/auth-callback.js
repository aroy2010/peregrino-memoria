export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  
  if (!code) {
    return new Response('No code provided', { status: 400 });
  }
  
  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code
    })
  });
  
  const tokenData = await tokenResponse.json();
  
  // Redirect back to admin with token
  const redirectUrl = new URL('/admin', request.url);
  redirectUrl.searchParams.set('token', tokenData.access_token || 'error');
  
  return Response.redirect(redirectUrl);
}
