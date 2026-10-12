export type Project = {
  title: string
  description: string
  github?: string
  demo?: string
  kind: 'AI' | 'Product' | 'Design' | 'Data'
  tags: string[]
}

export type Contact = {
  email?: string
  phone?: string
  location?: string
}

export type Education = {
  period: string
  title: string
  place: string
  details?: string
}

export type Skills = {
  category: string
  items: string[]
}

export type Language = {
  name: string
  level: string
}

export type SiteData = {
  name: string
  position: string
  location?: string
  cvPath?: string
  linkedin?: string
  githubProfile?: string
  contact?: Contact
  education?: Education[]
  skills?: Skills[]
  languages?: Language[]
  interests?: string[]
  projects: Project[]
  experiences?: Experience[]
}

export type Experience = {
  org: string
  role?: string
  period?: string
  location?: string
  descriptionFr: string
  descriptionEn: string
  technologies?: string[]
}

const site: SiteData = {
  name: 'Felix VERNIN',
  position: 'Machine Learning Engineer',
  location: 'Nice, 06000, France',
  cvPath: '/CV_Felix_Vernin_EN.pdf',
  linkedin: 'https://www.linkedin.com/in/felix-vernin-27b5ab345/',
  githubProfile: 'https://github.com/FelixVernin',
  contact: {
    email: 'felix.vernin@edu.esiee.fr',
    phone: '+33 6 44 06 29 43',
    location: 'Nice, 06000, France'
  },
  education: [
    { period: '2023–2026', title: 'Master of Science, ESIEE Paris', place: 'ESIEE Paris, Paris', details: 'Studies in artificial intelligence and cybersecurity, including machine learning, data analysis, network security and ethical hacking.' },
    { period: '2021–2023', title: 'PCSI–PSI Preparatory Classes', place: 'Centre International de Valbonne, Sophia Antipolis' },
    { period: '2021', title: 'French Baccalauréat', place: 'Lycée Albert Calmette, Nice', details: 'Specializations in mathematics and physics, with advanced English studies.' }
  ],
  skills: [
    { category: 'Programming', items: ['Python', 'Java', 'C/C++'] },
    { category: 'Development', items: ['Web development', 'Android development'] },
    { category: 'Data & AI', items: ['Machine Learning', 'Data analysis'] },
    { category: 'Cybersecurity', items: ['Network security', 'Ethical hacking'] }
  ],
  languages: [
    { name: 'French', level: 'Native' },
    { name: 'English', level: 'TOEIC 810' },
    { name: 'Spanish', level: 'Notions' }
  ],
  interests: ['Programming and personal projects', 'Sports'],
  projects: [
    {
      title: 'vAIpor (IAC internship)',
      description: 'Machine learning work for PWV prediction and dashboarding at the Instituto de Astrofísica de Canarias.',
      github: 'https://github.com/FelixVernin/vAIpor',
      kind: 'AI',
      tags: ['PyTorch', 'Forecasting', 'Research']
    },
    {
      title: 'Ascens — Elevator game web app (design)',
      description: 'A web application designed to play the elevator game, focusing on UX and accessible interactions.',
      github: 'https://github.com/FelixVernin/Ascens',
      kind: 'Product',
      tags: ['UX', 'Web', 'Accessibility']
    },
    {
      title: 'profeel — Design thinking project',
      description: 'Design thinking project addressing user needs and prototyping workflows.',
      github: 'https://github.com/FelixVernin/profeel',
      kind: 'Design',
      tags: ['Research', 'Prototype', 'Users']
    },
    {
      title: 'RandSpot — Spotify playlist randomizer',
      description: 'A small tool to randomize playlists and provide a fresh listening experience.',
      github: 'https://github.com/FelixVernin/RandSpot',
      kind: 'Data',
      tags: ['JavaScript', 'API', 'Product']
    }
  ]

  ,
  experiences: [
    {
      org: 'Instituto de Astrofísica de Canarias',
      role: 'Stage en IA',
      period: 'Avril–Septembre 2026',
      location: 'Îles Canaries, Espagne',
      descriptionFr: "Travail sur la prédiction du PWV (vapeur d’eau précipitable) à partir de données locales de l'IAC. Développement d'un système de machine learning et d'un tableau de bord interactif. Comparaison de plusieurs familles de modèles selon des méthodologies scientifiques et suivi d'indicateurs de performance. Livrables : preuve de concept non déployée en production, code, rapport et présentation. Article en préparation.",
      descriptionEn: "Work on predicting PWV (precipitable water vapor) from local IAC data. Developed a machine learning system and an interactive dashboard. Compared multiple model families using scientific methodologies and tracked performance metrics. Deliverables: proof of concept not deployed to production, code, report and presentation. Article in preparation.",
      technologies: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'NGBoost', 'LSTM', 'Transformers', 'Git']
    },
    {
      org: 'Orange — département Intelligence artificielle',
      role: '',
      period: 'Juin–Août 2025',
      location: '',
      descriptionFr: "Conception d'un évaluateur de qualité et d'un pipeline LLM texte+vision pour auditer la documentation interne. Collecte via l'API Confluence, déduplication et extraction des images. Mise en place d'une évaluation multicritère et de scores pondérés. Export des résultats vers BigQuery et création de tableaux de bord Looker Studio pour prioriser les corrections de la documentation.",
      descriptionEn: "Designed a quality evaluator and a text+vision LLM pipeline to audit internal documentation. Collected data via the Confluence API, deduplicated content and extracted images. Implemented multicriteria evaluation with weighted scores. Exported results to BigQuery and created Looker Studio dashboards to prioritize documentation fixes.",
      technologies: ['Python', 'BigQuery', 'Looker Studio', 'Confluence API', 'Git']
    }
  ]
}

export default site
