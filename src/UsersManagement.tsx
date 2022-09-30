import React, {useCallback, useEffect, useState} from 'react';
import {GetProfileResultType, profileAPI, ProfileType, usersAPI, UserType} from './api';

type UsersPropsType = {
    users: UserType[]
    onClick: (userId: number) => void
}
type DetailsPropsType = {
    userId: number | null
}

const useUsers = () => {
    const [users, setUsers] = useState<UserType[]>([])

    useEffect(() => {
        const requestUsers = async () => {
            let result = await usersAPI.getUsers(2111, 10)
            setUsers(result.items)
        }
        requestUsers()
    }, [])
    return users
}

const UsersManagement = () => {
    const [userId, setUserId] = useState<number | null>(null)
    console.log('App rendered')

    const users = useUsers()

    const onUserSelected = useCallback((id: number) => setUserId(id), [])

    return (
        <div>
            <List users={users} onClick={onUserSelected}/>
            <Details userId={userId}/>
        </div>
    );
};

const List = React.memo((props: UsersPropsType) => {
    console.log('List rendered')
    return (
        <ul>
            {props.users.map(u => <li key={u.id}
                                      onClick={() => props.onClick(u.id)}>{u.name}</li>)}
        </ul>
    )
})

function Details(props: DetailsPropsType) {
    console.log('Details rendered')
    const [profile, setProfile] = useState<ProfileType | null>(null)

    useEffect(() => {
        let resultObj: GetProfileResultType | null = null;
        const loadProfile = async () => {
            if (props.userId === null) return;
            resultObj = await profileAPI.getProfile(props.userId)
            try {
                let profile = await resultObj.resultPromise
                setProfile(profile.data)
            } catch {
                console.warn('cancelled')
            }

        }
        loadProfile();

        return () => {
            resultObj?.cancel();
        }
    }, [props.userId])

    if (profile === null) return <div>-----</div>
    const photoSrc = profile.photos?.small ? profile.photos.small : ''
    return (
        <div>
            {profile.fullName}
            <img src={photoSrc} alt="photo"/>
        </div>
    )
}

export default UsersManagement;