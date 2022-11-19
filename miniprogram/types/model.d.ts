
export interface User {
  openId: string
  nickName: string
  city: string
  province: string
  gender: number
  avatarUrl: string
}

export interface Cat {
  name: string
  age: string
  gender: number
  desc: string
  imgList: { url: string }[] | string[]
  adoptionAddress: string[]
  adoptionDesc: string
  contact: string
  createTime: number
}