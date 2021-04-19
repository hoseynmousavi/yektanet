import {clientsClaim} from "workbox-core"
import {precacheAndRoute, createHandlerBoundToURL} from "workbox-precaching"
import {registerRoute} from "workbox-routing"
import {NetworkFirst, NetworkOnly, StaleWhileRevalidate} from "workbox-strategies"
import {ExpirationPlugin} from "workbox-expiration"

clientsClaim()

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$")

registerRoute(
    ({url}) => url.origin === self.location.origin && url.pathname.startsWith("/blog"),
    new NetworkOnly(),
)

registerRoute(
    ({url}) => url.origin === self.location.origin && (url.pathname === "/service-worker.js" || url.pathname === "/asset-manifest.json" || !url.pathname.match(fileExtensionRegexp)),
    new NetworkFirst(),
)

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
    ({request, url}) =>
    {
        if (request.mode !== "navigate") return false
        else if (url.pathname.startsWith("/_")) return false
        else return !url.pathname.match(fileExtensionRegexp)
    },
    createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"),
)

registerRoute(
    ({url}) => url.pathname.endsWith(".png") || url.pathname.endsWith(".jpg") || url.pathname.endsWith(".webp") || url.pathname.endsWith(".jpeg"),
    new StaleWhileRevalidate({
        cacheName: "images",
        plugins: [new ExpirationPlugin({maxEntries: 200})],
    }),
)

self.addEventListener("message", event => event.data && event.data.type === "SKIP_WAITING" && self.skipWaiting())

self.addEventListener("install", () => self.skipWaiting())

self.addEventListener("push", event =>
{
    const data = event.data.json()
    self.registration.showNotification(data.title, {
        icon: data.icon,
        body: data.body,
        image: data.image,
        tag: data.tag,
        vibrate: [100, 50, 100],
        badge: data.badge,
        requireInteraction: data.requireInteraction,
        renotify: data.renotify,
        data: {url: data.url},
    })
})

self.onnotificationclick = event =>
{
    event.notification.close()
    event.waitUntil(clients.matchAll({type: "window"}).then(_ => clients.openWindow && clients.openWindow(event.notification.data.url || self.location.origin)))
}