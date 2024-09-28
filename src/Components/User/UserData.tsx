import { useEffect, useContext } from 'react'
import { Context } from '../../App'
import '../../Styles/User/UserData.scss'
import SavedData from './SavedData'
// import { userDataType } from '../../App.types'


const UserData = ({ userLoggedOut }: { userLoggedOut: () => void }) => {

  const UserSavedDateContext = useContext(Context)

  if(!UserSavedDateContext) {
    return null
  }

  const {user} = UserSavedDateContext

  // const [data, setData] = useState<userDataType | null>(null)

  useEffect(() => {
    // const fetchUserData = async () => {
    //   try {
    //     const req = await fetch('http://localhost:8000/api/user/data', {
    //       method: 'GET',
    //       credentials: 'include',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     const res = await req.json()
    //     setData(res)
    //     console.log(res)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // fetchUserData()
  }, [])

  return (
    <div className='UserData'>
      <div className="top">
        <h1>Hello<span>!</span></h1>
        <button onClick={userLoggedOut}>Logout</button>
      </div>
      {
        (user.userSavedData && 'songs' in user.userSavedData) && (
          <>
            <SavedData result={user.userSavedData.songs} type='songs' />
            <SavedData result={user.userSavedData.albums} type='albums' />
            <SavedData result={user.userSavedData.playlists} type='playlists' />
          </>
        )
      }
    </div>
  )
}

export default UserData