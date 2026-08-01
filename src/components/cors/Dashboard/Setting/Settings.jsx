import React from 'react'
import EditProfileInfo from './EditProfileInfo'
import UpdateProfilePicture from './UpdateProfilePicture'
import ChangePassword from './ChangePassword'
import DeleteProfile from './DeleteProfile'

function Settings() {
  return (
    <div className='w-[50vw] mt-10 ml-20'>
        {/* Change Profile picture */}
        <UpdateProfilePicture></UpdateProfilePicture>
        {/* Edit profile information */}
        <EditProfileInfo></EditProfileInfo>
        {/* change password */}
        <ChangePassword></ChangePassword>
        {/* Delete Account */}
        <DeleteProfile></DeleteProfile>
    </div>
  )
}

export default Settings