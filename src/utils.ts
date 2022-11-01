import {IncomingMessage} from "http";

export function getFullUrl(req: IncomingMessage) {
    let fullUrl
    if (req) {
        // Server side rendering
        fullUrl = req.headers['x-forwarded-proto'] || req.headers.referer?.split('://')[0] + '://' + req.headers.host + req.url
    } else {
        // Client side rendering
        fullUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
    }
    return {fullUrl: fullUrl}
}
