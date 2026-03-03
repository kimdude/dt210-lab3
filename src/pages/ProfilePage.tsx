import { PostForm } from '../components/PostForm'
import { useAuth } from '../context/AuthContext'

export const ProfilePage = () => {

  const { user } = useAuth();

  return (
    <div>
      <section>
        <h2>{ user?.username }</h2>
        <PostForm />
      </section>
    </div>
  )
}
