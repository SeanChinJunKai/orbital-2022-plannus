import React from 'react';
import '../../assets/Home.css';
import plannusLogo from '../../assets/PlanNUS.png'
import mongoLogo from '../../assets/mongodb.svg'
import expressLogo from '../../assets/expressjs.svg'
import reactLogo from '../../assets/react.svg'
import nodeLogo from '../../assets/nodejs.svg'
import herokuLogo from '../../assets/heroku.svg'

function Home() {
  return (
    <div className='home-container'>
        <div className='home-paragraph-container'>
            
            <h1>Overview</h1>
            <img src={plannusLogo} alt="planNUS logo"/>
            <p>
                As part of our independent module CP2106 Independent Software Development Project (Orbital) under the Apollo 11 
                level of achievement, our team created a one stop web-application to facilitate academic planning for the entire 
                candidature of 4 to 5 years, targeted at pre-matriculating and newly matriculated students who are generally 
                less informed about the academic university structure.
            </p>
            <iframe src="https://www.youtube.com/embed/i-KE7jY49R4" title="YouTube video player" 
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
            </iframe>
        </div>
        <div className='home-paragraph-container'>
            <h1>Our Motivation</h1>
            <p>
                As pre-undergraduates waiting to matriculate, or a freshman in Year 1, we were confused by the structure of university academics. We were not sure 
                what modules we needed to graduate from our courses, and what pre-requisites there were for each module. Our only sources of information were
                friends, seniors, the course curriculum website and perhaps external platforms such as r/NUS. Unfortunately, we were unable to get information 
                exactly catered to not only the course we were interested in, but also our preferences - specialisation, unrestricted electives, residential 
                modules, etc. The information we needed was definitely out there, albeit in bits and pieces which makes academic planning a tedious task. 
                To which, we thought, "Why isn’t there a one stop platform for us to plan our academic journey?"
            </p>
        </div>
        <div className='home-paragraph-container'>
            <h1>Features</h1>
            <div className='features-top-container'>
                <div className='feature'>
                    <h2>Core Features</h2>
                    <ul>
                        <li>Academic Plan Creator</li>
                        <li>Drag and Drop UI</li>
                        <li>Automatic Prerequisite/Preclusion Checks</li>
                        <li>Course Requirements Summaries</li>
                        <li>Graduation Fulfilment Checker</li>
                        <li>User Help Forum</li>
                    </ul>
                </div>
                <div className='feature'>
                    <h2>Extensions</h2>
                    <ul>
                        <li>Dark Mode Display</li>
                        <li>Moderator Privileges</li>
                        <li>Profile Page</li>
                        <li>Academic Plan Download</li>
                        <li>Graduation Requirement Checks</li>
                    </ul>
                </div>
                
            </div>
    
        </div>
        <div className='home-paragraph-container'>
            <h1>Technologies Used</h1>
            <div className='home-logo-container'>
                <div className='home-logo-container-icon'>
                    <img src={mongoLogo} alt='mongoDB Logo'/>
                </div>
                <div className='home-logo-container-icon'>
                    <img src={expressLogo} alt='ExpressJS Logo'/>
                </div>
                <div className='home-logo-container-icon'>
                    <img src={reactLogo} alt='React Logo'/>
                </div>
                <div className='home-logo-container-icon'>
                    <img src={nodeLogo} alt='NodeJS Logo'/>
                </div>
                <div className='home-logo-container-icon'>
                    <img src={herokuLogo} alt='Heroku Logo'/>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Home