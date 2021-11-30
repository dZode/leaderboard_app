import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dbConnect from '../../lib/dbConnect'
import Leader from '../../models/Leader'

/* Allows you to view leader card info and delete leader card*/
const LeaderPage = ({ leader }) => {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const handleDelete = async () => {
    const leaderID = router.query.id

    try {
      await fetch(`/api/leaders/${leaderID}`, {
        method: 'Delete',
      })
      router.push('/')
    } catch (error) {
      setMessage('Failed to delete the leader.')
    }
  }

  return (
    <div key={leader._id}>
      <div className="card">
        <img src={leader.image_url} />
        <h5 className="pet-name">{leader.first_name}</h5>
        <div className="main-content">
          <p className="pet-name">{leader.first_name} {leader.last_name}</p>
          <p className="pet-name">Highscore: {leader.highscore} Artifacts: {leader.artifact_num}</p>

          <div className="btn-container">
            <Link href="/[id]/edit" as={`/${leader._id}/edit`}>
              <button className="btn edit">Edit</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export async function getServerSideProps({ params }) {
  await dbConnect()

  const leader = await Leader.findById(params.id).lean()
  leader._id = leader._id.toString()

  return { props: { leader } }
}

export default LeaderPage
