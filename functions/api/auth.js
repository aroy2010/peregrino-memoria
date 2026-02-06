export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  if (url.pathname === '/api/auth') {
    return Response.redirect(`https://github.com/login/oauth/authorize?client_id=${env.GITHUB_CLIENT_ID}&scope=repo&redirect_uri=${encodeURIComponent(url.origin + '/api/auth-callback')}`);
  }
  
  return new Response('Not found', { status: 404 });
}
