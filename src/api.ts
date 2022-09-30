import axios, {AxiosResponse, CancelTokenSource} from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': 'ee7769c8-821f-475b-be91-ea9e1f4fc86c'
    }
});

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<'', AxiosResponse<{ items: UserType[] }>>(`users?page=${currentPage}&count=${pageSize}`).then(response => {
            return response.data;
        })
    },
    follow(userId: number) {
        return instance.post<'', AxiosResponse<UserType>>(`follow/${userId}`)
    },
    unfollow(userId: number) {
        return instance.delete<'', AxiosResponse<UserType>>(`follow/${userId}`)
    },
    getProfile(userId: number | null) {
        console.log('Obsolete method. Please use profileAPI object.')
        return profileAPI.getProfile(userId)
    }
}

export const profileAPI = {
    getProfile(userId: number | null) {
        const cancelTokenSource: CancelTokenSource = axios.CancelToken.source();
        return {
            resultPromise: instance.get<ProfileType>(`profile/` + userId, {cancelToken: cancelTokenSource.token}),
            cancel: () => {
                cancelTokenSource.cancel()
            }
        } as GetProfileResultType;
    },
    getStatus(userId: string) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto(photoFile: string) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType | null) {
        return instance.put(`profile`, profile);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string | null = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout() {
        return instance.delete(`auth/login`);
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}

//types
export type GetProfileResultType = {
    resultPromise: Promise<AxiosResponse<ProfileType>>
    cancel: () => void
}

export type ProfileType = {
    aboutMe?: string
    contacts: ContactsType
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
    userId?: number
    photos?: PhotosType
}

export type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

export type PhotosType = {
    small: string
    large: string
}

export type UserType = {
    id: number
    photos: { small: string }
    followed: boolean
    name: string
    status: string
    location: UserLocationType
}

type UserLocationType = {
    city: string
    country: string
}