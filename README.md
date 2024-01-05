# Personal Website Portfolio
*A website about myself made with React, Node, HTML, CSS, & JS.*

### Creation Process

**Drafting** - I like hand drawing rough drafts for websites first, so I started with [Procreate](https://procreate.com/), a very popular iPad digital art app.
**Drawing** - I wanted to have a self image for the Home and About section. I realized that I didn't have a professional photo of myself that I felt would fit the artistic direction of the website, so I took a different approach: I took the nicest photo I had & used my favorite one as a reference to draw the final image in Procreate.
**Code Planning** - Beofre actually coding, I had to plan out the file tree structure, the code structure & syntax, and find open source code that I could use. I also had to plan out the color scheme, fonts, and other design elements. To be organized, I also ended up making [a list of features on Notion](https://www.notion.so/Website-Additions-Notes-c3cadd9896154a88b8cd76dfc11dad80?pvs=4) that I wanted to add in the future.
**Coding** - I had to learn how to use some features of React, such as utilizing hooks, components, state management, props, and refs. I also had to organize the file structure with a balance between simplicity and organization.

Overall, I think it was really fun! This is strangely is what lead to the more challenging parts, as what slowed me down the most was feature creep - I felt like there were so many possible cool things I could add, and the rate that I came up with new ideas felt faster than the speed I could code them. I would try to remember to use features that would fit the website, not the other way around. 

### Sections
- **Home** - Introductory page
- **About** - Personal section about myself
- **What I Do** - My skills and interests
- **Projects** - Projects I've made for hackathons, school, and for fun
- **Resume** - A resume of my abilities and experience, able to zoom in and out
- **Contact** - A form to contact me

### File Tree
```
Kevin-Cendana-Website/
├── src/
│   ├── app.js                          // Main js file that renders all components 
│   ├── app.css                         // Main css file that styles all components
|   └── fonts/                          // Fonts used
|   └── images/                         // Images used
│   └── components/                     // Components for each section
│       ├── Home/
│       ├── About/
│       ├── Skills/
│       ├── Projects/
│       ├── Resume/
│       ├── Contact/
|   └── hooks/                          // Custom hooks - Reusable functions to check if section is in view & get window dimensions
│       ├── useInView.js
│       ├── useWindowDimensions.js
|   └── shared/                         // Shared components - Reusable components used in multiple sections such as Dark Mode
│       ├── DarkModeToggle/
│       ├── DebugWindowDimensions.js

```

### Credits - Open Source Code & Websites Used
- [React Rotating Text](https://www.npmjs.com/package/react-rotating-text?activeTab=readme) - The typing effect in the Home section
- [Polaroid Wrapper](https://codepen.io/havardob/pen/jOwrXaJ ) - The polaroid image wireframe in the About section
- [React Round Carousel](https://github.com/scriptex/react-round-carousel) - Base code for the carousel in the Projects section
- [React Medium Image Zoom](https://www.npmjs.com/package/react-medium-image-zoom) - The zoom in/out effect for the Resume
- [Parallax Stars Background](https://codepen.io/sarazond/pen/LYGbwj) - Stars background for dark mode
<br>
- [FlatIcon.com](https://www.flaticon.com/) - The icons used in the What I Do section
- [LottieFiles.com](https://lottiefiles.com/) - The brief animations in the What I Do section informing the user on how to use the carousel
- [Netlify.com](https://www.netlify.com/) - The hosting service for the website, also handles the form submissions in the Contact section