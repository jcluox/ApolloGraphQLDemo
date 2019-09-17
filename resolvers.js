// 1. 在假資料中補充朋友資訊
const users = [
  { id: 1, name: 'King', age: 23, friendIds: [2, 3], height: 1.75 },
  { id: 2, name: 'Queen', age: 15, friendIds: [1], height: 1.63 },
  { id: 3, name: 'Knight', age: 18, friendIds: [1], height: 1.7 }
];

const posts = [
  { id: 1, authorId: 1, title: "Hello World!", content: "This is my first post.", likeGiverIds: [2] },
  { id: 2, authorId: 2, title: "Good Morning", content: "Have a Nice weekend ^_^", likeGiverIds: [2, 3] },
  { id: 3, authorId: 1, title: "What's GraphQL?", content: "Let me tell you guys", likeGiverIds: [] },
];
const meId = 1

module.exports = {
  Query: {
    hello: () => 'Hello world!',
    me: () => users[0],
    users: () => users,
    user: (root, args, context) => {
      const { name } = args
      return users.find(user => user.name === name)
    }
  },
  Mutation: {
    addPost: (parent, args, context) => {
      const { title, content } = args
      const post = {
        id: posts.length+1,
        authorId: meId,
        title,
        content,
        likeGiverIds: []
      }
      posts.push(post)
      return post
    },
    likePost: (parent, args, context) => {
      const { postId } = args
      console.log('typeof is ' + typeof(postId))
      // 因為定義postId型別為ID，所以這邊postId是String
      post = posts.find(post => post.id == Number(postId))
      if (!post) {
        throw Error("no such post")
      }
      index = post.likeGiverIds.indexOf(meId)
      if (index < 0) { // not found
        post.likeGiverIds.push(meId)
      } else {
        post.likeGiverIds.splice(index, 1)
      }
      return post
    }
  },
  User: {
    friends: (parent, args, context) => {
      const { friendIds } = parent
      return users.filter(user => friendIds.includes(user.id))
    },
    height: (parent, args, context) => {
      const { height } = parent
      const { unit } = args
      if (unit === "METRE") return height
      else if (unit === "CENTIMETRE") return height * 100
      else if (unit === "FOOT") return height / 0.45359237
    },
    posts: (parent, args, context) => {
      const { id } = parent
      return posts.filter(post => post.authorId === id)
    }
  },
  Post: {
    author: (parent, args, context) => {
      const { authorId } = parent
      return users.find(user => user.id === authorId)
    },
    likeGivers: (parent, args, context) => {
      const { likeGiverIds } = parent
      return users.filter(user => likeGiverIds.includes(user.id))
    }
  }
}