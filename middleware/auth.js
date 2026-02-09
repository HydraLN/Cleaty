export const authmiddleware = (req, res, next) => {
    const cookie = req.signedCookies.token
        if (!cookie) return res.status(401).json({
            error: "Cookie tidak ditemukan"
    });
    req.user = cookie
    next()
}

export function requireauth(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ error: 'Token tidak ditemukan' });
  }
    req.supabasetoken = auth.split(' ')[1];
  next();
}
