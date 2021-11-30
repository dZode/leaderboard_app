import { useRouter } from 'next/router'
import useSWR from 'swr'
import AddForm from '../../components/AddForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditLeader = () => {
  const router = useRouter()
  const { id } = router.query
  const { data: leader, error } = useSWR(id ? `/api/leaders/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!leader) return <p>Loading...</p>

  const leaderForm = {
    first_name: leader.first_name,
    last_name: leader.last_name,
    email: leader.email,
  }

  return <AddForm formId="edit-leader-form" leaderForm={leaderForm} forNewLeader={false} />
}

export default EditLeader
