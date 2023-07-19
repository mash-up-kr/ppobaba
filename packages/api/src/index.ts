import { JSON_APIS } from './apiResponseHandler';
import { createApiClient } from './clientFactory';
export { authTokenRepository, AuthTokenRepository, AuthenticationRequiredError } from './AuthTokenRepository';

const client = {
  public: createApiClient({ auth: false }),
  session: createApiClient({ auth: true }),
};

const auth = JSON_APIS({
  verify: () => client.session.get<{}>('auth/verify'),
  getLoginUrl: () => client.public.get<{ loginUrl: string }>('auth/kakao/login'),
  getAuthToken: ({ code }: { code: string }) => client.public.get<any>(`auth/kakao/token?code=${code}`),
});

export const api = {
  auth,
};
