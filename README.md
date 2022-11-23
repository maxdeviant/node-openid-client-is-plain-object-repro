# node-openid-client-is-plain-object-repro

This is a repository showcasing an issue when using `openid-client` together with Jest.

## Setup

Install the dependencies:

```
yarn
```

## Running the Tests

This repository has tests setup with both Jest and Mocha to isolate the issue to Jest.

### Jest

```
yarn test:jest
```

One of the Jest tests should fail:

```
Repro: Jest
  buildClient
    when not using a workaround
      ✕ returns the constructed client (176 ms)
    when using a workaround
      ✓ returns the constructed client (107 ms)
```

### Mocha

```
yarn test:mocha
```

The Mocha tests will both pass:

```
Repro: Mocha
  buildClient
    when not using a workaround
      ✔ returns the constructed client (141ms)
    when using a workaround
      ✔ returns the constructed client (114ms)
```
