
const { Blog, User, ReadingList } = require('./models/index');

const authors = [
  { id: 1, name: 'Author 1' },
  { id: 2, name: 'Author 2' },
  { id: 3, name: 'Author 3' },
  { id: 4, name: 'Author 4' }
];

const users = [
  { username: 'user1', email: 'user1@example.com', password: 'password1' },
  { username: 'user2', email: 'user2@example.com', password: 'password2' },
  { username: 'user3', email: 'user3@example.com', password: 'password3' }
];

// Helper functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomString(length) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const createData = async () => {
  try {
    // Create users
    const createdUsers = await User.bulkCreate(users, { returning: true });
    console.log('Users created successfully!');

    // Create blogs
    const blogs = [];
    for (let i = 0; i < 10; i++) {
      const author = authors[i % authors.length]; // Distribute blogs among authors
      const user = createdUsers[i % createdUsers.length]; // Distribute blogs among users
      console.log(user.dataValues)
      const title = `Blog Title ${getRandomString(8)}`;
      const url = `https://example.com/${getRandomString(5)}`;
      const likes = getRandomInt(0, 100); // Random number of likes
      const year = 1991 + getRandomInt(0, 35)

      blogs.push({
        author: author.name,
        title,
        url,
        likes,
        userId: user.dataValues.id, // Associate blog with a user,
        year
      });
    }

    console.log(blogs)

    const createdBlogs = await Blog.bulkCreate(blogs, { returning: true });
    console.log('Blogs created successfully!');

    // Assign blogs to users via the reading list
    const readingListEntries = [];

    createdUsers.forEach((user) => {
      // Each user gets 2 random blogs in their reading list
      const assignedBlogs = createdBlogs.slice(0, 2 + getRandomInt(0, 1)); // Randomize 2-3 blogs
      assignedBlogs.forEach((blog) => {
        readingListEntries.push({
          userId: user.dataValues.id,
          blogId: blog.dataValues.id,
          read: Math.random() > 0.5, // Randomly mark as read or unread
        });
      });
    });
    console.log(readingListEntries)
    await ReadingList.bulkCreate(readingListEntries);
    console.log('Reading lists created successfully!');
  } catch (error) {
    console.error('Error creating data:', error);
  }
};

createData();