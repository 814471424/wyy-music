import * as auth from './wyy/auth'
import * as playlist from './wyy/playlist'
import * as track from './wyy/track'
import * as album from './wyy/album'
import * as artist from './wyy/artist'
import * as lastfm from './wyy/lastfm'
import * as mv from './wyy/mv'
import * as others from './wyy/others'
import * as user from './wyy/user'

// 具体api文档[https://neteasecloudmusicapi-docs.4everland.app/#/]
export default {
    ...auth,
    ...playlist,
    ...track,
    ...album,
    ...artist,
    ...lastfm,
    ...mv,
    ...others,
    ...user
}