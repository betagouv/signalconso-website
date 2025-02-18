#!/bin/sh

gpg --quiet --batch --yes --decrypt --passphrase="$GOOGLE_SERVICE_ACCOUNT_SECRET_PASSPHRASE" \
--output stat-fetcher.json stat-fetcher.json.gpg
