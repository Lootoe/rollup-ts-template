import { userName } from '@/modules/moduleB.js'

export const say = greet => {
  console.log(greet + '--' + userName)
}
