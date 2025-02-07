import { RefObject } from 'react'
import { PlacementType } from './intefaces'

export const getNewPopupPosition = (
  childrenRef: RefObject<HTMLElement>,
  popupRef: RefObject<HTMLElement>,
  rowGap: number,
  placement: PlacementType | '' = '',
) => {
  if (!childrenRef.current) return

  let childElement = childrenRef.current
  if (childElement && childElement.tagName.toLowerCase() === 'input' && childElement.parentElement?.parentElement) {
    childElement = childElement.parentElement.parentElement as HTMLButtonElement
  }

  const childRect = childElement.getBoundingClientRect()
  const closestScrollableElement = getClosestScrollableElement(childrenRef.current)

  const getHorizontalPosition = () => {
    let left
    switch (placement) {
      case 'bottomRight':
      case 'topRight':
        left = closestScrollableElement.scrollLeft + childRect.left + childRect.width - (popupRef.current?.offsetWidth ?? 0)
        break
      case 'bottomLeft':
      case 'topLeft':
        left = closestScrollableElement.scrollLeft + childRect.left
        break
      default:
        left = closestScrollableElement.scrollLeft + childRect.left + childRect.width / 2 - (popupRef.current?.offsetWidth ?? 0) / 2
        break
    }
    if (left <= 0) return { left: 0 }
    else if (left + (popupRef.current?.offsetWidth ?? 0) >= window.innerWidth) return { right: -closestScrollableElement.scrollLeft }

    return { left }
  }

  const getVerticalPosition = () => {
    switch (placement) {
      case 'top':
      case 'topLeft':
      case 'topRight':
        return {
          top: closestScrollableElement.scrollTop + childRect.top - rowGap - (popupRef.current?.offsetHeight ?? 0),
        }
    }
    return { top: closestScrollableElement.scrollTop + childRect.bottom + rowGap }
  }

  return {
    ...getVerticalPosition(),
    ...getHorizontalPosition(),
  }
}

export const getNewArrowPosition = (childrenRef: RefObject<HTMLElement>, rowGap: number) => {
  if (!childrenRef.current) return

  let childElement = childrenRef.current
  if (childElement && childElement.tagName.toLowerCase() === 'input' && childElement.parentElement?.parentElement) {
    childElement = childElement.parentElement.parentElement as HTMLButtonElement
  }
  const childRect = childElement.getBoundingClientRect()
  const closestScrollableElement = getClosestScrollableElement(childrenRef.current)
  return {
    top: closestScrollableElement.scrollTop + childRect.bottom + rowGap / 2,
    left: closestScrollableElement.scrollLeft + childRect.left + childRect.width / 2 - 8,
  }
}

function isScrollable(element: HTMLElement | null): boolean {
  if (!element) return false
  const style = window.getComputedStyle(element)
  const overflowY = style.overflowY
  const isOverflowScrollable = overflowY === 'scroll' || overflowY === 'auto'
  return isOverflowScrollable && element.scrollHeight > element.clientHeight
}

export function getClosestScrollableElement(element: HTMLElement | null): HTMLElement {
  let currentElement = element

  while (currentElement) {
    if (isScrollable(currentElement) || currentElement === document.documentElement) return currentElement
    currentElement = currentElement.parentElement
  }
  return document.documentElement
}
