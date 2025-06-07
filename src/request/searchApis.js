import { get } from './request'

export function getHotKeys() {
    return get('/api/getHotKeys')    
}

/* 搜索接口 */
export function search(query,page,showSinger) {
    return get('/api/search', {
        query,
        page,
        showSinger
    })    
}