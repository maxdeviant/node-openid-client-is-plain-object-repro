import { buildClient, buildClientWithWorkaround } from '.';
import nock from 'nock';

describe('Repro', () => {
  const discoveryEndpointSuccess = {
    authorization_endpoint: 'https://op.example.com/o/oauth2/v2/auth',
    issuer: 'https://op.example.com',
    jwks_uri: 'https://op.example.com/oauth2/v3/certs',
    token_endpoint: 'https://op.example.com/oauth2/v4/token',
    userinfo_endpoint: 'https://op.example.com/oauth2/v3/userinfo',
  };

  describe('buildClient', () => {
    describe('when not using a workaround', () => {
      it('throws an error', async () => {
        nock('https://op.example.com', { allowUnmocked: true })
          .get('/.well-known/example-configuration')
          .reply(200, discoveryEndpointSuccess);

        await expect(buildClient()).rejects.toThrow(
          new TypeError('jwks must be a JSON Web Key Set formatted object')
        );
      });
    });

    describe('when using a workaround', () => {
      it('throws an error', async () => {
        nock('https://op.example.com', { allowUnmocked: true })
          .get('/.well-known/example-configuration')
          .reply(200, discoveryEndpointSuccess);

        const client = buildClientWithWorkaround();

        expect(client).toBeDefined();
      });
    });
  });
});
