import React from 'react'
import classNames from '../utils/helpers/classNames'
interface BoxContainerProps {
  children: React.ReactNode
  className?: string
}

const defaultClassName =
  'relative z-50 flex flex-row gap-2 items-center bg-white/40 backdrop-blur-sm border-[1px] border-black shadow-container rounded-2xl'

const BoxContainer = ({ children, className }: BoxContainerProps) => {
  const newClassName = classNames(defaultClassName, className ?? '')

  return <div className={newClassName}>{children}</div>
}

export default BoxContainer
