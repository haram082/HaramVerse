export const projects = [
  {
    id: 'robovision',
    imgUrl: '/robo.png',
    title: 'RoboVision',
    github: "https://github.com/haram082/CS152_GazeEstimator.git",
    link: "",
    description: "Accessible eye-tracking web app using CNNs and Swin Transformer models achieving 95-96% accuracy across 6 gaze classifications, enabling hands-free robotic control without expensive hardware.",
    skills: ["R", "Machine Learning", "CNNs", "Swin Transformer"],
  },
  {
    id: 'world-1',
    imgUrl: '/spotitweet.png',
    title: 'Spoti-tweet',
    github: "https://github.com/haram082/Spoti-tweet",
    link: "https://spoti-tweet.vercel.app/",
    description: "Developed a full-stack web app cloning core Spotify features and Twitter posts that consist of a song being attached to some content using Next.js, MySql, and the Spotify API",
    skills: ["Html", "Tailwind", "TypeScript", "Nextjs", "NextAuth", "Prisma", "tRPC", "MySQL", "Spotify API"],
  },
  {
    id: 'world-2',
    imgUrl: '/p-rest.png',
    title: 'p-Reset',
    github: "https://github.com/haram082/p-reset",
    link: "",
    description: "I am part of Pomona AI Club's p-reset project, building a full-stack AI self-care app using React and Flask. It features journaling, habit tracking, Google Calendar integration, SQL databases, NLP, ML, and Docker integration for personalized recommendations and scheduling optimization.",
    skills: ["Tailwind", "Nextjs", "Python", "SQLAlchemy", "PostgreSQL", "Flask", "Docker", "RNNs", "Sentiment Analysis", "LDA", "Clustering", "Google Calendar API"]
  },
  {
    id: 'world-3',
    imgUrl: '/shop.png',
    title: 'Fullstack Ecommerce Platform',
    github: "https://github.com/haram082/Ecommerce-site",
    link: "https://ecommerce-site-lilac-five.vercel.app/home",
    description: "Developed an eccommerce platform using React, Redux, and Firebase that allows users to add items to their cart, checkout, and pay with Stripe.",
    skills: ["Html", "CSS", "React", "React-DOM", "Redux", "Firebase", "FireStore (NoSQL)", "Stripe API", "Node", "Express"],
  },
  {
    id: 'world-5',
    imgUrl: '/Duo.png',
    title: 'Duolingo Learning Model',
    github: "https://github.com/haram082/bigdataproject",
    link: "",
    description: "Settles and Meeder (2016) proposed a half-life regression machine learning model based on the forgetting curve to improve Duolingo engagement. We aim to use replicate the approaches described in this study to analyze a dataset of 13 million Duolingo student practice sessions, ultimately being able to predict how well a student will remember words over time. Thus, our model will have the ability to predict an individual's memory decay to optimize their frequency of practice.",
    skills: ["Python", "Pandas", "Scikit-learn", "Machine Learning"],
  },
  {
    id: 'world-6',
    imgUrl: '/spotify.jpg',
    title: 'GrooveGauge',
    github: "https://github.com/haram082/GrooveGauge-",
    link: "",
    description: "Project aims to investigate the factors that influence the danceability of popular Spotify songs from 2000 to 2019. Trained an ML model achieving 0.85 R² in predicting danceability through advanced regression techniques in R",
    skills: ["R", "Linear Models", "Machine Learning"],
  },
    {
    id: '5chack',
    imgUrl: '/hack.jpg',
    title: '5C Hackathon',
    github: "",
    link: "https://www.5chackathon.com/",
    description: "Led product strategy and development of a new React app serving 100s of students within 5C Hack, prioritizing features for a more modern & user-friendly experience, resulting in 50% increased website engagement and 30% boost in hackathon signups.",
    skills: ["React", "Product Strategy", "UI/UX", "Data Analytics"],
  },
  {
    id: 'pickup',
    imgUrl: '/pickup.png',
    title: 'P-ickup',
    github: "https://github.com/p-ickup/frontend",
    link: "http://p-ickup.com/",
    description: "AI-powered rideshare application serving 100s of Pomona students. Built AWS infrastructure, Docker containerization, Google-Supabase auth integration, and questionnaire/match features within a team of 7.",
    skills: ["Next.js", "Tailwind", "Supabase", "SQL", "AWS", "Docker"],
  },
  {
    id: 'aspc',
    imgUrl: '/aspc.png',
    title: 'Pomona Students Platform',
    github: "",
    link: "",
    description: "Led development of the Pomona Students Platform, serving over 1,500+ students. Used for voting, reviews, events, student government, and more. Spearheaded full platform migration from Ruby on Rails to Next.js, Express, Node.js, MongoDB, and AWS — delivering 50% reduction in response times and 200% surge in student engagement. ",
    skills: ["Next.js", "Express", "Node.js", "MongoDB", "AWS", "SAML"],
  }
];



export const insights = [
  {
    imgUrl: '/meta.png',
    title: 'Software Engineer Intern @ Meta',
    date: 'May 2025 - Aug 2025',
    location: 'Menlo Park, CA',
    subtitle:
        'Engineered a PHP/Hack pipeline to automate daily audit workflows across 500+ E2E lineage flows, saving 8 hours of manual effort per 200 flows. Leveraged LLM integration to increase violation detection accuracy by 50% and reduce false positives by 80%. Built Audit Table page in React/TypeScript within Meta\'s Data Platform.',
  }, 
  {
    imgUrl: '/aspc.png',
    title: 'Lead Software Engineer @ Associated Students of Pomona College',
    date: 'Nov 2023 – Present',
    location: 'Claremont, CA',
    subtitle:
    'Spearheaded full platform migration from Ruby on Rails to Next.js, Express, Node.js, MongoDB, and AWS — delivering 50% reduction in response times and 200% surge in student engagement serving 1,500+ students. Architected SAML security framework and led a team of 5 engineers.'
  },
  {
    imgUrl: '/pomona.jpg',
    title: 'Undergraduate Research Intern @ Pomona College HCI Lab',
    date: 'May 2024 – Aug 2024',
    location: 'Claremont, CA',
    subtitle:
        'Engineered a 144-trial visual search app using Express/Node.js and Socket.io with Tobii eye-tracking for real-time gaze sharing across groups of 1-6. Maintained 99% cross-trial consistency and improved data storage accuracy by 40% via Firebase.',
  }, 
  {
    imgUrl: '/Snapchat.png',
    title: 'Augmented Reality Development Extern @ Snap Inc.',
    date: 'Mar 2024 – Apr 2024',
    location: 'Remote',
    subtitle:
    "Built personalized AR experiences for Gatorade using Snap's Lens Studio with hand tracking and object detection via JavaScript and Python CNNs, boosting user engagement by 20% and reaching over 5 million users."
    
  },
  {
    imgUrl: '/fooclub.jpg',
    title: 'Backend Engineer Intern @ FoodX',
    date: 'Jan 2024 – May 2024',
    location: 'Remote',
    subtitle:
    "Built and expanded REST APIs using Node.js, Express, AWS, and SQL. Refactored Postgres and DynamoDB queries increasing user capacity by 50%. Implemented Redis caching and rate limiting, cutting API response times by 25%."
  },
  {
    imgUrl: '/aspc.png',
    title: 'Software Developer @ Associated Students of Pomona College',
    date: 'Dec 2023 - May 2024',
    location: 'Claremont, CA',
    subtitle:
    'Architected and iteratively enhanced the ASPC platform utilizing React and Ruby on Rails to expand core functionalities, conduct seamless database updates within a robust data-driven ecosystem, and provide critical services to over 1,500 students. Expanded core functionalities within the admin dashboard to expand CRUD functionality for static events, housing, and custom pages.'
  },
  {
    imgUrl: '/hack.jpg',
    title: 'Technical Product Manager @ 5C Hack',
    date: 'Sept 2023 - Present',
    location: 'Claremont, CA', 
    subtitle:
    'Led product strategy and development of a new React app serving 100s of students within 5C Hack, prioritizing features for a more modern & user-friendly experience, resulting in 50% increased website engagement and 30% boost in hackathon signups'
    ,
  },
  {
    imgUrl: '/pai.jpg',
    title: 'Software Developer @ P-AI ',
    date: 'Sept 2023 - Dec 2023',
    location: 'Claremont, CA',
    subtitle:
    'Worked within the Software Development Team for p-Reset: Personalized Self-Care Web App to engineer a full-stack, AI-powered personalized self-care app with Nextjs and Flask that allows journaling, habit tracking, and Google Calendar API integration through a Postgres SQL database that incorporates NLP techniques and ML algorithms to generate customized recommendations and optimize scheduling around self-care tasks and healthy habits.'
    ,
  },
];
