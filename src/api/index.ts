import * as common from './wyy/common'
import * as auth from './wyy/auth'
import * as playlist from './wyy/playlist'

// 具体api文档[https://neteasecloudmusicapi-docs.4everland.app/#/]
export default {
    ...common,
    ...auth,
    ...playlist
}