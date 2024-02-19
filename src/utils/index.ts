export const isUndefinedOrNull = (value: string | null) => {
    return value === null || value === undefined ? true : false;
  };

  export function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  
    return JSON.parse(jsonPayload);
  }

  export const hasExpired = (token: string | null) => {
    if (!token) {
      return true;
    }
    try {
      return new Date(parseJwt(token)?.exp * 1000) <= new Date();
    } catch (error) {
      return true;
    }
  };
  
  