import {notFound} from 'next/navigation'

// This will be hit on URLs like :
// /fr/foo/bar/taz
// /fr/achat-magasin/foo
// /fr/achat-magasin/foo/bar/taz
// etc.
// It is needed to be able to use our not-found page under /[lang]
// https://github.com/vercel/next.js/discussions/50518
export default function Page() {
  return notFound()
}
