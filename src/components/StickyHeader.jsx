import { useEffect, useState } from "react"

import style from "./StickyHeader.module.scss"

const StickyHeader = ({children,stickyEnabled=true,absolutePosition=false,offset=100,top=0,onSticky}) => {
  const [sticky, setSticky] = useState("")

  useEffect(() => {
    if(!stickyEnabled) return
    window.scrollTo(0,0)
    window.addEventListener("scroll", isSticky)
    return () => {
      window.removeEventListener("scroll", isSticky)
    }
  }, [])

  const isSticky = () => {
    if(!stickyEnabled) return

    const scrollTop = window.scrollY

    if(scrollTop >= (offset)){
      setSticky(style.sticky_on)
      if(onSticky) onSticky(true)
    }
    else{
      setSticky("")
      if(onSticky) onSticky(false)
    }
  }

  const classes = `${style.sticky_header} ${absolutePosition ? style.absolute_on : ""} ${sticky}`

  return (
      <header className={classes} style={{top:top}}>{children}</header>
  )
}

export default StickyHeader