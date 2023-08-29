
export type ILoginUser = {
    phoneNumber: string,
    password: string
}

export type IloginUserResponse = {
    accessToken: string,
    refreshToken?: string
}