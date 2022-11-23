import nock from 'nock';
import { buildClient, buildClientWithWorkaround } from '.';

describe('Repro: Jest', () => {
  const discoveryEndpointSuccess = {
    authorization_endpoint: 'https://op.example.com/o/oauth2/v2/auth',
    issuer: 'https://op.example.com',
    jwks_uri: 'https://op.example.com/oauth2/v3/certs',
    token_endpoint: 'https://op.example.com/oauth2/v4/token',
    userinfo_endpoint: 'https://op.example.com/oauth2/v3/userinfo',
  };

  describe('buildClient', () => {
    describe('when not using a workaround', () => {
      // This test fails with the following error:
      //    TypeError: jwks must be a JSON Web Key Set formatted object
      it('returns the constructed client', async () => {
        nock('https://op.example.com', { allowUnmocked: true })
          .get('/.well-known/example-configuration')
          .reply(200, discoveryEndpointSuccess);

        const client = await buildClient();

        expect(client).toBeDefined();
      });
    });

    describe('when using a workaround', () => {
      it('returns the constructed client', async () => {
        nock('https://op.example.com', { allowUnmocked: true })
          .get('/.well-known/example-configuration')
          .reply(200, discoveryEndpointSuccess);

        const client = await buildClientWithWorkaround();

        expect(client).toBeDefined();
      });
    });
  });
});
