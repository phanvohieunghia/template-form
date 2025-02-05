export type PositionState = {
  top: number
  left?: number
  right?: number
  bottom?: number
}

export type PlacementType = BottomPlacementType | TopPlacementType | RightPlacementType | LeftPlacementType

type BottomPlacementType = 'bottom' | 'bottomLeft' | 'bottomRight'
type TopPlacementType = 'top' | 'topLeft' | 'topRight'
type RightPlacementType = 'right' | 'rightTop' | 'rightBottom'
type LeftPlacementType = 'left' | 'leftTop' | 'leftBottom'
