import profileImage from './assets/profile.png';

export const DEVELOPER_PROFILE = {
  name: "Saurabh Kumar",
  title: "BCA Student & Aspiring Software Developer",
  tagline: "Passionate about creating efficient and user-friendly applications. I love turning ideas into real-world solutions using code.",
  email: "saurabhkumar95487063@gmail.com",
  phone: "9548706353",
  location: "Badaun, Bareilly, Uttar Pradesh, India",
  cvLink: "#",
  profileImage: profileImage,
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    email: "mailto:saurabhkumar95487063@gmail.com"
  },
  stats: {
    projectsCompleted: 10,
    technologies: 5,
    certifications: 3,
    hoursCoding: 200
  },
  about: {
    bio: "I am a BCA student with a strong interest in software development, web technologies, and problem solving. I enjoy building projects that create real impact and continuously learning new technologies to improve my skills.",
    codeSnippet: `const developer = {
  name: "Saurabh Kumar",
  role: "BCA Student",
  skills: ["C", "Java", "Python", "Web Dev"],
  passion: "Building solutions & learning",
  goal: "To become a Full Stack Developer"
};`
  },
  skills: [
    { name: "C", icon: "C" },
    { name: "Java", icon: "Java" },
    { name: "Python", icon: "Python" },
    { name: "HTML", icon: "HTML5" },
    { name: "CSS", icon: "CSS3" },
    { name: "JavaScript", icon: "JS" },
    { name: "MySQL", icon: "Database" },
    { name: "PHP", icon: "Server" },
    { name: "Git", icon: "GitBranch" },
    { name: "VS Code", icon: "Code" }
  ],
  projects: [
    {
      id: 1,
      title: "Student Management System",
      category: "Java",
      description: "Desktop application to manage student records, marks, and attendance.",
      image: "student_management",
      github: "https://github.com",
      demo: "#"
    },
    {
      id: 2,
      title: "Plant Website",
      category: "HTML/CSS",
      description: "Responsive website for a plant store with beautiful UI and smooth animations.",
      image: "plant_website",
      github: "https://github.com",
      demo: "#"
    },
    {
      id: 3,
      title: "To-Do List Web App",
      category: "JavaScript",
      description: "A simple and interactive to-do list app to organize daily tasks.",
      image: "todo_app",
      github: "https://github.com",
      demo: "#"
    }
  ]
};
