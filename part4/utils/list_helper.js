
const dummy = (blogs) => {
    if ( Array.isArray(blogs)) {
        return 1
    }
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce((sum, blog) => sum + blog.likes, 0)

    return sum
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    let index = 0

    for (let i = 1; i < blogs.length; i++) {
        if (blogs[index].likes < blogs[i].likes) {
            index = i
        }
    }
    return blogs[index]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const authorBlogCount = {}

    blogs.forEach(blog => {
        authorBlogCount[blog.author] = (authorBlogCount[blog.author] || 0) + 1
    })

    let topBlogger = { author: null, blogs: 0 }

    for (const author in authorBlogCount) {
        if (authorBlogCount[author] > topBlogger.blogs) {
            topBlogger = { author: author, blogs: authorBlogCount[author] }
        }
    }

    return topBlogger
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const likesBlogCount = {}

    blogs.forEach(blog => {
        likesBlogCount[blog.author] = (likesBlogCount[blog.author] || 0) + blog.likes
    })

    let popularBlogs = { author: null, likes: 0}

    for (const author in likesBlogCount) {
        if (likesBlogCount[author] > popularBlogs.likes) {
            popularBlogs = { author: author , likes: likesBlogCount[author] }
        }
    }

    return popularBlogs
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}