
export type ILoginUser = {
    phoneNumber: number,
    password: string
}

export type IloginUserResponse = {
    accessToken: string,
    refreshToken?: string
}
