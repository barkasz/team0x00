
import tea from '../assets/tea.webp'
import home from '../assets/architecture.webp'
import users from './users'

const posts = [
    {
      id: 0,
      title: 'Having a nice cup with bae ❤️',
      image: tea,
      user: users[0],
      comment_ids: [ 0, 1, 2 ]
    },
    {
      id: 1,
      title: 'Freshly designed (still not paid tho)',
      image: home,
      user: users[3],
      comment_ids: [ 3, 4 ]
    },
  ]

export default posts