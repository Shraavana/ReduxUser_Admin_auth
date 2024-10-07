import React,{useEffect} from 'react'
import { Carousel, initMDB } from 'mdb-ui-kit';
// import { useSelector } from 'react-redux';
import  './HomeContent.css'

function HomeContent() {

    // const user_auth = useSelector((state)=> state.auth_user)

    useEffect(() => {
    initMDB({ Carousel });
  }, [])
  return (
       
    <div>
    <img className='BackgroundImg' src="https://th.bing.com/th/id/R.7152c41ceeef883e5764cc0a28eba983?rik=izQSgnphet3MhQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fd%2f8%2fe%2f745511-good-desktop-backgrounds-1920x1200-for-full-hd.jpg&ehk=pCiavDDdbTEBe%2bjZdVXSQOlCQ5kgBp%2fl1SJBCKD%2flvQ%3d&risl=&pid=ImgRaw&r=0"  alt="Sunset Over the City"/>
    </div>
  )
}

export default HomeContent