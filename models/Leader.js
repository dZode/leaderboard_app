import mongoose from 'mongoose'

/* LeaderSchema will correspond to a collection in your MongoDB database. */
const LeaderSchema = new mongoose.Schema({
  first_name: {
    /* The name of this Leader */

    type: String,
    required: [true, 'Please provide your first name for the leaderboard.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  last_name: {
    /* The last name of this leader */

    type: String,
    required: [true, "Please provide your last name"],
    maxlength: [20, "Last Name cannot be more than 60 characters"],
  },
  email: {
    /* Email address of the leader */

    type: String,
    required: [true, 'Please enter a valid email address.'],
  },
  image_url: {
    /* Url to tower image */

    required: [true, 'Please provide an image url for this tower.'],
    type: String,
  },
  highscore: {
    /* Highscore*/

    type: Number,
  },
  artifact_num: {
    /* Highscore*/

    type: Number,
  },
})

export default mongoose.models.Leader || mongoose.model('Leader', LeaderSchema)
