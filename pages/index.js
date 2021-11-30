import Link from 'next/link'
import Artifacts from '../components/Artifacts'
import dbConnect from '../lib/dbConnect'
import Leader from '../models/Leader'

const Index = ({ leaders }) => (
  <>
      {/* Create a card for each leader */}
      {leaders.map((leader) => (
        <div key={leader._id}>
          <div className="card">
            <img src={leader.image_url} />
            <h5 className="pet-name">{leader.first_name} {leader.last_name}</h5>
            <div className="main-content">
              <p className="pet-name">{leader.first_name}</p>
              <p className="owner">Email: {leader.email}</p>
              <p className="owner">Highscore: {leader.highscore}</p>
              <p className="owner">Artifacts: {leader.artifact_num}</p>

              {/* Extra Pet Info: Likes and Dislikes
              <div className="likes info">
                <p className="label">Likes</p>
                <ul>
                  {pet.likes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>
              <div className="dislikes info">
                <p className="label">Dislikes</p>
                <ul>
                  {pet.dislikes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div> */}

              <div className="btn-container">
                <Link href="/[id]/edit" as={`/${leader._id}/edit`}>
                  <button className="btn edit">Edit</button>
                </Link>
                <Link href="/[id]" as={`/${leader._id}`}>
                  <button className="btn view">View</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
  </>
)

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
  await dbConnect()

  /* find all the data in our database */
  const result = await Leader.find({})
  const leaders = result.map((doc) => {
    const leaders = doc.toObject()
    leaders._id = leaders._id.toString()
    return leaders
  })

  return { props: { leaders: leaders } }
}

export default Index
