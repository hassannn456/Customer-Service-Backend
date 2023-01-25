var jwt = require('jsonwebtoken');

export function getUser(token: string) {
  // Get the user token after "Bearer "
  if (token === '') return {
    id: 0,
    roles: <string[]>[]
  }
  const jwtToken = token.split(' ')[1]; // e.g. "user-1"
  const now = Math.floor(Date.now()) / 1000;
  const payload = jwt.decode(jwtToken);
    return {
    id: payload.id,
    roles: payload.roles
  }
}