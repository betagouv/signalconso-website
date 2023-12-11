# signalconso-website

Front-end of [signal.conso.gouv.fr](https://signal.conso.gouv.fr/) built on Next.js.

## Getting Started

First, you need to set the following environment variables:

| Variable                         |
| :------------------------------- |
| NEXT_PUBLIC_NODE_ENV             |
| NEXT_PUBLIC_COMPANY_API_BASE_URL |
| NEXT_PUBLIC_API_BASE_URL         |
| NEXT_PUBLIC_SHOW_PLAYGROUND      |

For example, for classic shells (bash, zsh etc...), add the following in your profile:

```bash
export NEXT_PUBLIC_NODE_ENV=development
export NEXT_PUBLIC_COMPANY_API_BASE_URL="XXX"
export NEXT_PUBLIC_API_BASE_URL="XXX"
export NEXT_PUBLIC_SHOW_PLAYGROUND=true
```

For fish shell:

```fish
set -x NEXT_PUBLIC_NODE_ENV development
set -x NEXT_PUBLIC_COMPANY_API_BASE_URL XXX
set -x NEXT_PUBLIC_API_BASE_URL XXX
set -x NEXT_PUBLIC_SHOW_PLAYGROUND true
```

Replace `XXX` with the expected values.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
