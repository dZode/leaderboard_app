import AddForm from '../components/AddForm'

const NewLeader = () => {
  const leaderForm = {
    first_name: '',
    last_name: '',
    email: '',
    highscore: 0,
    image_url: '',
    artifact_num: 0,
  }

  return <AddForm formId="add-leader-form" leaderForm={leaderForm} />
}

export default NewLeader
