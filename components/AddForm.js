import { useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'

const AddForm = ({ leaderFormId, leaderForm, forNewLeader = true }) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    first_name: leaderForm.first_name,
    last_name: leaderForm.last_name,
    email: leaderForm.email,
    highscore: leaderForm.highscore,
    image_url: leaderForm.image_url,
    artifact_num: leaderForm.artifact_num
  })

  /* The PUT method edits an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query

    try {
      const res = await fetch(`/api/leaders/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      const { data } = await res.json()

      mutate(`/api/leaders/${id}`, data, false) // Update the local data without a revalidation
      router.push('/')
    } catch (error) {
      setMessage('Failed to update leader')
    }
  }

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/leaders', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }

      router.push('/')
    } catch (error) {
      setMessage('Failed to add leader')
    }
  }

  const handleChange = (e) => {
    const target = e.target
    const value =
      target.name === 'poddy_trained' ? target.checked : target.value
    const name = target.name

    setForm({
      ...form,
      [name]: value,
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewLeader ? postData(form) : putData(form)
    } else {
      setErrors({ errs })
    }
  }

  /* Makes sure leader info is filled for leader first name, last name, and email*/
  const formValidate = () => {
    let err = {}
    if (!form.first_name) err.first_name = 'First Name is required'
    if (!form.last_name) err.last_name = 'Last Name is required'
    if (!form.email) err.email = 'Email is required'
    if (!form.highscore) err.highscore = 'A Highscore is required'
    if (!form.image_url) err.image_url = 'Image of tower is required'
    if (!form.artifact_num) err.artifact_num = 'Image of tower is required'
    return err
  }

  return (
    <>
      <form id={leaderFormId} onSubmit={handleSubmit}>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          maxLength="20"
          name="first_name"
          onChange={handleChange}
          value={form.first_name}
          required
        />

        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          maxLength="20"
          name="last_name"
          onChange={handleChange}
          value={form.last_name}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={form.email}
          required
        />
        <label htmlFor="image_url">Tower Image</label>
        <input
          type="url"
          name="image_url"
          value={form.image_url}
          onChange={handleChange}
          required
        />

        <label htmlFor="highscore">Highscore</label>
        <input
          type="number"
          name="highscore"
          value={form.highscore}
          onChange={handleChange}
        />
        <label htmlFor="artifact_num">Number of Artifacts</label>
        <input
          type="number"
          name="artifact_num"
          value={form.artifact_num}
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  )
}

export default AddForm
