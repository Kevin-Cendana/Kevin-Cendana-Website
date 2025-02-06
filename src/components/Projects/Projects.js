//--------------------------------------------------------------------------------------//
//                                       Projects.js                                       //
//--------------------------------------------------------------------------------------//

// Libraries & Files
import React, { useEffect, useRef } from 'react';
import useInView from '../../hooks/useInView'; 
import { useDarkMode } from '../../shared/DarkModeToggle/DarkModeContext';
import classNames from 'classnames';
import './Projects.css';
import githubIcon from '../../images/navigation_bar_images/github_icon.png';
import GitHubButton from '../../shared/GitHubButton';

// Slideshow images & video in webp format - Optimized for faster loading
import attempowherWebp from '../../images/projects_images/slideshow_images/att_empowher.webp';
import datafestWebp from '../../images/projects_images/slideshow_images/datafest.webp';
import bullseyeWebp from '../../images/projects_images/slideshow_images/bullseye.webp';
import sgkcWebp from '../../images/projects_images/slideshow_images/sgkc.webp';

// Slideshow videos in mp4 format - Optimized for faster loading
import lyriclinkMp4 from '../../images/projects_images/slideshow_images/lyric_link.mp4';
import maplestoryMp4 from '../../images/projects_images/slideshow_images/maplestory_app.mp4';
import invadedspaceMp4 from '../../images/projects_images/slideshow_images/invaded_space.mp4';

// Backup slideshow imagesin png/ mp4 format - For browsers that don't support webp
import attempowherPng from '../../images/projects_images/slideshow_images/att_empowher.png';
import datafestPng from '../../images/projects_images/slideshow_images/datafest.png';
import bullseyePng from '../../images/projects_images/slideshow_images/bullseye.png';
import sgkcPng from '../../images/projects_images/slideshow_images/sgkc.png';

// Array of slides to use for slideshow pictures
const project_data = [
    { 
        // videoWebp: lyriclinkWebp,
        mainMedia: lyriclinkMp4,
        title: "Lyric Link",
        subtitle: "App Demo",
        githubLink: "https://github.com/Kevin-Cendana/Hackathon-SacHacks-2023",
        description: (
            <span> 
                <a href="https://sachacks.io" target="_blank" rel="noopener noreferrer">SacHacks 2023:</a>{" "}
                A full stack application using Billboard's API to replicate a music forum 
                where people could discuss songs in the current Top 100.
            </span>
        ),
    },

    { 
        backupMedia: attempowherPng,
        mainMedia: attempowherWebp,
        title: "AT&T 5G", 
        subtitle: "Website",
        githubLink: "https://github.com/Kevin-Cendana/Hackathon-ATT-EmpowHer",
        description: (
            <span> 
            <a href="https://inside.att.jobs/empowherhackathon#subpage/welcome.io" target="_blank" rel="noopener noreferrer">AT&T EmpowHer:</a>{" "}
            Deployed on Netlify, the <a href="https://attempowherhackathon.netlify.app/" target="_blank" rel="noopener noreferrer">website</a>{" "}
            was made using HTML/CSS with JS to integrate GoogleMaps and News API.
                
        </span>
        ),

    },
    {
        backupMedia: sgkcPng,
        mainMedia: sgkcWebp,
        title: "SGK Church",
        subtitle: "Website",
        githubLink: "https://github.com/Kevin-Cendana/Sacramento-Glory-Korean-Church-Website",
        description: (
            <span>
            <a href="https://sacglorychurch.org" target="_blank" rel="noopener noreferrer">Sacramento Glory Korean Church:</a>{" "}<br></br>
            For my capstone project, I worked with a team of 8 to create a full stack Church website for a local pastor. 
            </span>
        ),
    },



    { 
        // videoWebp: maplestoryWebp,
        mainMedia: maplestoryMp4,
        title: "Maplestory",
        subtitle: "App Demo",
        githubLink: "https://github.com/Kevin-Cendana/Byte-Sized-Projects",
        description: "To practice Flutter and its widgets, states, and frame animations, I replicated the core gameplay loop of one of my favorite childhood games, Maplestory.",
    },

    { 
        // videoWebp: invadedspaceWebp,
        mainMedia: invadedspaceMp4,
        title: "Invaded Space",
        subtitle: "Game Jam",
        githubLink: "https://github.com/Kevin-Cendana/Byte-Sized-Projects",
        description: "My contribution to a Game Jam session in Video Game Development Club! Our goal was to create a tower defense game, where I was in charge of programming player & enemy units as well as projectile logic.", 
    },
    { 
        backupMedia: datafestPng, 
        mainMedia: datafestWebp,
        title: "DataFest",
        subtitle: "Big Data",
        githubLink: "https://github.com/Kevin-Cendana/Hackathon-DataFest-2023",
        description: (
            <span> 
            <a href="https://ww2.amstat.org/education/datafest/" target="_blank" rel="noopener noreferrer">DataFest 2023:</a>{" "}
            A competition where we made data visualizations based off of a huge dataset with 
            200,000+ questions from clients for their lawyers.
        </span>
        ),
    },
    { 
        backupMedia: bullseyePng, 
        mainMedia: bullseyeWebp,
        title: "Bullseye",
        subtitle: "Mini Apps",
        githubLink: "https://github.com/Kevin-Cendana/Byte-Sized-Projects",
        description: "To learn SwiftUI and try mobile app development for the first time, I made a series of apps using Swift UI including a sleep tracker, time converter, tip calculator, Word Scrabble, Guess the Flag, and this Bullseye game.",
    },
];

function Projects() {
    const { isDarkMode } = useDarkMode();
    const projectsRef = useRef(null);           // Ref to play animations when Projects section is in view
    const isProjectsInView = useInView(projectsRef, { threshold:[0.2], sectionName: "projects"});    //
    const projectsHeader = classNames({
        'projects__header': true,
        'section-header': true,
        'animate-projects-header': isProjectsInView,
        'dark-mode': isDarkMode,
    });
    const projectsSubheader = classNames({
        'projects__subheader': true,
        'animate-projects-subheader': isProjectsInView,
        'dark-mode': isDarkMode,
    });

    // Function to check browser for WebP support
    const supportsWebp = () => {
        try {
        return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
        } catch (err) {
        return false;
        }
    };  

    // On mount, prefetch images and videos
    useEffect(() => {
        const webpSupported = supportsWebp(); 
        const mediaToPrefetch = [
            webpSupported ? attempowherWebp : attempowherPng,
            webpSupported ? datafestWebp : datafestPng,
            webpSupported ? bullseyeWebp : bullseyePng,
            lyriclinkMp4,
            maplestoryMp4,
            invadedspaceMp4
        ];

        mediaToPrefetch.forEach((mediaPath) => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.as = 'image'; // or 'video' for videos, adjust as necessary
            link.href = mediaPath;
            document.head.appendChild(link);
        });
    }, []); // Empty dependency array means this runs once on component mount
    
    const carouselRef = useRef(null);

    useEffect(() => {
        const carousel = carouselRef.current;
        let isDown = false;
        let startX;
        let scrollLeft;

        const handleMouseDown = (e) => {
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        };

        const handleMouseLeave = () => {
            isDown = false;
        };

        const handleMouseUp = () => {
            isDown = false;
        };

        const handleMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 3; // Scroll-fast
            carousel.scrollLeft = scrollLeft - walk;
        };

        carousel.addEventListener('mousedown', handleMouseDown);
        carousel.addEventListener('mouseleave', handleMouseLeave);
        carousel.addEventListener('mouseup', handleMouseUp);
        carousel.addEventListener('mousemove', handleMouseMove);

        return () => {
            carousel.removeEventListener('mousedown', handleMouseDown);
            carousel.removeEventListener('mouseleave', handleMouseLeave);
            carousel.removeEventListener('mouseup', handleMouseUp);
            carousel.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Render the Projects section
    return (
        <section className="projects" id="projects" ref = {projectsRef}>
            <div class="projects__top">
                <div class="col-wrapper">
                    <h1 className = {projectsHeader}> MY PORTFOLIO </h1>
                    <h2 className = {projectsSubheader}> Check out my latest work</h2>
                </div>
                <GitHubButton />
            </div>
            <div className="projects-carousel" ref={carouselRef}>
                {project_data.map((project, index) => (
                    <div key={index} className="project-item">
                        {project.mainMedia.endsWith('.mp4') ? (
                            <video autoPlay muted loop className="project-media">
                                <source src={project.mainMedia} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <img src={project.mainMedia} alt={project.title} className="project-media" draggable='false' />
                        )}
                        <div className="project-item-bottom">
                            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                <img src={githubIcon} alt="GitHub" className="github-icon" />
                            </a>
                            <div className="project-text">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-subtitle">{project.subtitle}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
    
    }

export default Projects;
