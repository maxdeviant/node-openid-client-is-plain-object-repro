import crypto from 'crypto';
import * as jose from 'jose';
import { pki } from 'node-forge';
import { Issuer } from 'openid-client';

const generateKeyPair = () => {
  const keyPair = pki.rsa.generateKeyPair(2048);

  const cert = pki.createCertificate();

  cert.publicKey = keyPair.publicKey;
  cert.validity.notBefore = new Date();
  cert.validity.notAfter = new Date();
  cert.serialNumber = crypto
    .createHash('sha1')
    .update('123', 'utf8')
    .digest('hex');

  const attrs = [
    {
      name: 'commonName',
      value: 'example.com',
    },
  ];
  cert.setSubject(attrs);
  cert.setIssuer(attrs);

  cert.sign(keyPair.privateKey);

  return {
    cert,
    pemCert: pki.certificateToPem(cert),
    pemPrivateKey: pki.privateKeyToPem(keyPair.privateKey),
  };
};

export const buildClient = async () => {
  const discoveryUrl =
    'https://op.example.com/.well-known/example-configuration';

  const issuer = await Issuer.discover(discoveryUrl);

  const { pemPrivateKey } = generateKeyPair();

  return new issuer.Client(
    {
      client_id: 'client_id',
    },
    {
      keys: [await jose.exportJWK(crypto.createPrivateKey(pemPrivateKey))],
    }
  );
};

export const buildClientWithWorkaround = async () => {
  const discoveryUrl =
    'https://op.example.com/.well-known/example-configuration';

  const issuer = await Issuer.discover(discoveryUrl);

  const { pemPrivateKey } = generateKeyPair();

  return new issuer.Client(
    {
      client_id: 'client_id',
    },
    {
      keys: [await jose.exportJWK(crypto.createPrivateKey(pemPrivateKey))].map(
        jwk => ({ ...jwk })
      ),
    }
  );
};
