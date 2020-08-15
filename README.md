# 4ex4u

This frontend app is a simple UI for reading data from [exchangeratesapi.io](https://exchangeratesapi.io/).

It's built with the following technologies:

- React
- Typescript
- Redux, with [thunk middleware](https://github.com/reduxjs/redux-thunk)
- [Recharts](https://recharts.org/en-US/)
- [Emotion](https://emotion.sh/docs)

### Prerequisites

- **yarn v1.0.0** or higher
- **node v10.0.0** or higher
- Some understanding of React and Typescript

### Run Locally

1. Copy environment variables `cat .env.example >> .env`.
2. Run `yarn install` to install dependencies.
3. **NOTE**: if you experience slow install times, try running `export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true` before `yarn install`.
4. After installing dependencies, run `yarn start`.
5. Go to `http://localhost:1234/` in your browser to see the app.

### Deploying

To deploy the app, make sure you are building the app in an environment with Node JS v10 or above.

1. Ensure environment variables are configured.
2. Run `yarn build`.
3. Deployment static artefact is output to `dist` directory.

### `.env`

The app requires the following environment variables at build time:

```
API_BASE_URL
```
