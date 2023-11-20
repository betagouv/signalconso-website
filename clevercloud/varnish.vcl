# https://www.clever-cloud.com/doc/administrate/cache/
#
#
# To test varnish locally :
#
# You can install it with Homebrew.
# Don't use the "services" feature from Homebrew to have it start at login.
# It's better to run it manually like so :
#
# varnishd -f /Users/manu/devsconso/website/clevercloud/varnish.vcl -s malloc,1G -T 127.0.0.1:2000 -a 0.0.0.0:8080 -F
#
# -f vcl conf file (absolute path. relative path did not work for me)
# -a HTTP listen address and port (i.e. final address where you will hit with the browser)
# -F run in foreground
#
# This should make varnish available in your browser at localhost:8080
# You need to also start the website locally in another terminal.
# The website should be on the address and port listed in the 'backend' section.
# Note : the website should be run in prod mode (yarn build && yarn start).
# In dev mode I've encountered problems because some JS don't have hashes in their paths.
# Disable in the browser cache in the devtools, otherwise you might see weird things especially on the assets.
#
# To view varnish logs (in another terminal)
#
# varnishlog -g raw
#
# To filter logs only for a given URL :
#
# varnishlog -g request -q "ReqURL eq '/somepath'"

vcl 4.1;

# Defines the 'backend', i.e. the website we want to put Varnish in front of.
# Those values are used only when working locally.
# CleverCloud overrides them to set the port to 8081.
backend default {
    .host = "127.0.0.1";
    .port = "3000";
}

import cookie;

# Happens when we receive a request from the client, before we check if we have this in cache already.
# Typically you clean up the request here, removing cookies you don't need,
# rewriting the request, etc.
sub vcl_recv {

    # Set a header to categorize the URL, just to make the code easier to manage, avoid repetition
    if (
        req.url ~ "^/_next/static/" ||
        req.url ~ "^/_next/image"
    ) {
        set req.http.X-Cache-Path-Kind = "asset_hashed";
    } elseif (
        req.url ~ "^/image/" ||
        req.url ~ "^/icons/"
    ) {
        set req.http.X-Cache-Path-Kind = "asset_fixed";
    } elseif (
        req.url ~ "^/fr$" ||
        req.url ~ "^/fr/" ||
        req.url ~ "^/en$" ||
        req.url ~ "^/en/"
    ){
        set req.http.X-Cache-Path-Kind = "html_i18n";
    } else {
        set req.http.X-Cache-Path-Kind = "other";
    }

    # Clean up the request cookies headers
    if (req.http.Cookie) {
        # Delete all cookies except NEXT_LANG
        # So we can use the cookies safely as a cache key in vcl_hash
        cookie.parse(req.http.Cookie);
        cookie.keep("NEXT_LANG");
        set req.http.Cookie = cookie.get_string();
        if (req.http.Cookie == "") {
            unset req.http.Cookie;
        }
        if (
            req.http.X-Cache-Path-Kind == "asset_hashed" ||
            req.http.X-Cache-Path-Kind == "asset_fixed"
        ){
            # Here we drop cookies entirely
            # By doing this, Varnish should know that he can cache them safely
            unset req.http.Cookie;
        }
    }

    # Clean up the accept-language header to just fr/en
    # so we can use it safely as a cache key
    if (req.http.Accept-Language) {
        if (
            # if it contains "fr" anywhere in the list of accepted languages
            # we'll simplify it to "fr"
            # we can't do complex regexp or handle language priorities here
            req.http.Accept-Language ~ "fr"
        ) {
            set req.http.Accept-Language = "fr";
        } else {
            set req.http.Accept-Language = "en";
        }
    }

    # Tell Varnish to use the cache always
    # Otherwise, by default, it would not cache if a cookie is present
    return (hash);
}

# Defines the cache key used by Varnish (identifying each object in cache)
sub vcl_hash {
    # Use the default cache key components: Host header and URL.
    hash_data(req.http.Host);
    hash_data(req.url);

    # For the /fr, /en, and other URLs (everything but assets)
    # Next.js has a middleware that may redirect us based on our cookies and our accept language header
    # It may also change the NEXT_LANG cookie.
    #
    # We will cache the result, but using the cookie and the header in the cache keys
    # (thus caching a few variants for each of these URLs)
    if (
        req.http.X-Cache-Path-Kind == "other" ||
        req.http.X-Cache-Path-Kind == "html_i18n"
    ) {
       if (req.http.Cookie) {
            hash_data(req.http.Cookie);
        }
        if (req.http.Accept-Language) {
            hash_data(req.http.Accept-Language);
        }
    }
    return (lookup);
}

# Happens after we have read the response headers from the backend.
#
# Here you clean the response headers, removing silly Set-Cookie headers
# and other mistakes your backend does.
#
# watch out, the names look similar : bereq != beresp
sub vcl_backend_response {
    if (
        # Typical request to a static asset (with hash in URL)
        bereq.http.X-Cache-Path-Kind == "asset_hashed" &&
        beresp.status == 200
    ) {
        # We can cache aggressively
        set beresp.ttl = 7d;
    } elseif (
        # Typical request to a static asset (without hash)
        bereq.http.X-Cache-Path-Kind == "asset_fixed" &&
        beresp.status == 200
    ) {
        # These images do not have hashes in the URLs, we won't be able to change them once cached
        # Let's keep a medium cache
        set beresp.ttl = 1h;
    } elseif (
        (
            # The rest
            # This includes typical request to HTML pages in /fr, /en
            # Also includes redirects that happen on other paths (like /)
            # Also includes potential not found pages (/fr/doesntexist)
            bereq.http.X-Cache-Path-Kind == "html_i18n" ||
            bereq.http.X-Cache-Path-Kind == "other"
        ) && (
            # A bunch of cacheable status codes
            # This mostly excludes 5xx errors
            beresp.status == 200 ||
            beresp.status == 203 ||
            beresp.status == 204 ||
            beresp.status == 300 ||
            beresp.status == 301 ||
            beresp.status == 302 ||
            beresp.status == 304 ||
            beresp.status == 307 ||
            beresp.status == 308 ||
            beresp.status == 404 ||
            beresp.status == 410 ||
            beresp.status == 414
        )
    ) {
        # We stay safe.
        # We want to see the changes maximum 1min after we deploy.
        # This should still be enough to avoid pressure on the Next.js
        set beresp.ttl = 1m;

        # Varnish does not cache responses containing a Set-Cookie header
        # We do want to cache them, so we have to hide this header from Varnish
        # and store it somewhere else
        set beresp.http.X-Cache-Tmp-Set-Cookie = beresp.http.Set-Cookie;
        unset beresp.http.Set-Cookie;
    } else {
        # Other cases
        # This includes 5xx error responses
        # and theorically non 2xx responses on static assets, if that happens
        # I don't think there is anything else
        set beresp.ttl = 0s;
    }
}

# Happens when we have all the pieces we need, and are about to send the
# response to the client.
#
# You can do accounting or modifying the final object here.
sub vcl_deliver {
    if (resp.http.X-Cache-Tmp-Set-Cookie) {
        # Put the Set-Cookie header back in the response
        set resp.http.Set-Cookie = resp.http.X-Cache-Tmp-Set-Cookie;
        unset resp.http.X-Cache-Tmp-Set-Cookie;
    }

    # Add debug headers. We can see them in the browser
    if (obj.hits > 0) {
        set resp.http.X-Cache = "HIT";
        set resp.http.X-Cache-Hits = obj.hits;
    } else {
        set resp.http.X-Cache = "MISS";
    }
    set resp.http.X-Cache-TTL = obj.ttl;
    set resp.http.X-Cache-Path-Kind = req.http.X-Cache-Path-Kind;
}


# Slighly better error page if the website is down
sub vcl_backend_error {
    set beresp.http.Content-Type = "text/html; charset=utf-8";
    synthetic( {"
        <!DOCTYPE html>
        <html>
        <head>
            <title>SignalConso indisponible</title>
        </head>
        <body>
            <h1>SignalConso est temporairement indisponible</h1>
            <p>Le site Internet de SignalConso rencontre des difficultés techniques. Réessayez un peu plus tard.</p>
        </body>
        </html>
    "});
    return (deliver);
}

