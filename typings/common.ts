export interface Ibase {
  id?: number
  create_time?: string
  update_time?: string
}
export interface IChef extends Ibase {
  name: string
}
export interface ITimeFrame extends IChef { }
export interface IDishes extends Ibase {
  name: string
  category_id: number
  chef_id: number
  vote_count: number
  pic: string
  timeFrame_id: number
}
export interface IDishesCategory extends IChef { }
export interface ISetting extends Ibase {
  key: string
  value: string
}