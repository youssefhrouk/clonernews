let savedItem = null
let currentId = null

const postsContainer = document.querySelector('.all-posts')
postsContainer.textContent = ''
const commentsContainer = document.querySelector('.all-comments')
commentsContainer.textContent = ''

const getMaxItemId = async () => {
    try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/maxitem.json?print=pretty')
        return await response.json()
    } catch (error) {
        console.error('Error fetching item:', error)
        return null
    }
}

const getItemInfo = async (id) => {
    try {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        return await response.json()
    } catch (error) {
        console.error(`Error fetching item ${id}:`, error)
        return null
    }
}

const isValidPost = (item) => {
    return item && (item.type === 'story' || item.type === 'job' || item.type === 'poll') && item.title
}

const isValidComment = async (item) => {
    if (!item || !item.text || !item.parent) return [false]

    const parent = await getItemInfo(item.parent)
    if (!parent || parent.type === 'comment') return [false]

    return (item.type === 'comment') ? [true, parent] : [false]
}

const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
}

const createPost = (post) => {
    return `
        <div class="post" data-id="${post.id}">
            <h3 class="user">${post.by || 'Anonymous'}</h3>
            <h2 class="title">
                ${post.url
            ? `<a href="${post.url}" target="_blank" rel="noopener noreferrer">${post.title}</a>`
            : post.title}
            </h2>
            <h4 class="type">${post.type}</h4>
            <p class="story-details">
                <span class="id">${post.id}</span>
                | <span class="time">${formatTime(post.time)}</span>
                | <span class="comments">${post.descendants || 0} comments</span>
            </p>
        </div>
    `
}

const createComment = ([comment, parrent = 'anonym']) => {
    return `
        <div class="post" data-id="${comment.id}">
            <h3 class="user">${comment.by}</h3>
            <h4 class="title">
                ${parrent.url
            ? `<a href="${parrent.url}" target="_blank" rel="noopener noreferrer">${parrent.title}</a>`
            : parrent.title}
            </h4>
            <div class="text">${comment.text}...</div>
            <p class="comment-details">
                <span class="id">${comment.id}</span>
                | <span class="time">${formatTime(comment.time)}</span>
            </p>
        </div>
    `
}

export const loadItems = async (count = 5) => {
    try {
        if (currentId === null) {
            currentId = await getMaxItemId()
            if (savedItem === null) savedItem = currentId
        }

        let itemsProcessed = 0
        let commentsProcessed = 0
        while (itemsProcessed < count && currentId > 0) {
            const item = await getItemInfo(currentId)
            currentId--

            if (item) {
                const comm = await isValidComment(item)
                if (isValidPost(item)) {
                    postsContainer.insertAdjacentHTML('beforeend', createPost(item))
                    itemsProcessed++
                } else if (comm.length > 0 && comm[0] && comm.length && commentsProcessed < itemsProcessed/2) {
                    commentsProcessed++
                    commentsContainer.insertAdjacentHTML('beforeend', createComment([item, comm[1]]))
                }
            }
        }
    } catch (error) {
        console.error('Error loading items:', error)
    }
}

const throttle = (func, wait) => {
    let t = false
    let storedArgs = null
    const storedFunc = () => {
        if (storedArgs == null) {
            t = false
        } else {
            func(...storedArgs)
            storedArgs = null
            setTimeout(storedFunc, wait)
        }
    }
    return (...args) => {
        if (t) {
            storedArgs = args
            return
        }
        func(...args)
        t = true
        setTimeout(storedFunc, wait)
    }
}

window.addEventListener('scroll', throttle(async () => {
    const scrollPosition = window.innerHeight + window.scrollY
    const totalHeight = document.documentElement.scrollHeight - 1000
    if (scrollPosition >= totalHeight) {
        await loadItems()
    }
}, 3000))

let isDisplay = false
setInterval(async () => {
    const maxItem = await getMaxItemId()
    if (maxItem !== savedItem) {
        for (let i = savedItem + 1; i <= maxItem; i++) {
            const itemData = await getItemInfo(i)

            if (isValidPost(itemData) && !isDisplay) {
                const notification = document.createElement('div')
                notification.className = 'new-content-alert'
                notification.innerHTML = `
                    <div class="alert-content">
                        New stories available! 
                        <button onclick="window.location.reload()">Reload</button>
                    </div>
                    `
                document.body.appendChild(notification)
                isDisplay = true
            }
            savedItem = i
        }
    }
}, 5000)