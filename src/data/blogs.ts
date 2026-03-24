import { BlogPost } from '@/types/blog'

export const blogs: BlogPost[] = [
  {
    id: 'about-me-journey',
    title: 'Building While Learning: My Journey in AI and Development',
    readTime: '6 min read',
    externalUrl: '',
    author: 'Obiwankenobi699',
    date: '2026-03-22',
    image: '/mag4.jpg',
    tags: ['Journey', 'Learning', 'Hackathons', 'Growth'],
    content: `I am a Computer Science student building across AI, systems, and full-stack development. My learning has never followed a linear path. It has been shaped by curiosity, frustration, experimentation, and constant rebuilding.

This is not a story of knowing everything. It is a story of figuring things out while building.

---

### How It Started

Like most developers, I started with web development. HTML, CSS, JavaScript — the usual path.

I enjoyed it initially. Building interfaces, deploying projects, seeing things work — it felt productive.

But over time, it started to feel repetitive.

I wanted to understand what happens underneath — how systems work, how models think, how real-world problems are solved.

---

### Enter Linux: A Shift in Mindset

Switching to Linux changed everything.

I eventually moved to Arch Linux with Hyprland. It wasn’t just about aesthetics — it forced me to understand my system deeply.

- configuring everything manually  
- debugging without shortcuts  
- controlling the environment instead of relying on it  

Linux made me more comfortable with complexity and uncertainty.

---

### From Web Dev to Something Deeper

At some point, I lost interest in traditional web development.

Not because it’s bad — but because I wanted depth.

I didn’t want to build just for the sake of building.

I wanted to work on problems that required reasoning, systems thinking, and integration across domains.

That’s when I moved towards AI and Machine Learning.

---

### Learning Machine Learning the Practical Way

I didn’t start with heavy theory. I started with building.

- training models  
- testing datasets  
- deploying small systems  

This helped me understand failure cases, performance issues, and real-world constraints.

Over time I explored:
- Computer Vision  
- Vision-language models  
- real-time inference systems  

The process stayed the same:  
**build → break → fix → understand**

---

### The Part I Avoided: DSA

For a long time, I avoided Data Structures and Algorithms.

It felt abstract and disconnected from what I was building.

I didn’t enjoy it.

But as I started building larger systems, I began to notice inefficiencies:
- slow operations  
- poor structuring  
- unnecessary complexity  

That’s where DSA started making sense.

Not as theory, but as a tool.

I still don’t love grinding problems, but I now use DSA where it matters — in writing better, more efficient systems.

---

### GPU, Performance and Real Constraints

Machine Learning introduced real constraints:

- GPU limits  
- memory bottlenecks  
- latency issues  

I started working with:
- CUDA setups  
- model optimization  
- efficient pipelines  

This changed how I think about systems — performance became critical.

---

### Cloud, Docker and DevOps Thinking

As projects grew, I moved into:

- Docker for reproducibility  
- cloud deployments  
- CI/CD pipelines  

This is where everything connected:
AI models + backend systems + infrastructure

It stopped being separate skills and became a complete system.

---

### Hackathons and Real-World Pressure

Hackathons shaped my mindset a lot.

Winning HackJNU and participating in competitions like SIH taught me:

- speed matters  
- execution matters  
- clarity matters  

You don’t remember everything. You adapt.

> You don’t need to know everything. You need to figure things out quickly.

---

### The Real Challenge: Too Many Things at Once

The hardest part is not difficulty — it’s overload.

There are too many:
- tools  
- frameworks  
- concepts  

Trying to remember everything doesn’t work.

What helped me:
- focusing on fundamentals  
- recognizing patterns  
- learning by building  

---

### Where I Am Still Improving

I am still not perfect at coding.

There are gaps:
- I sometimes struggle with complex implementations  
- I lack deep experience compared to others  

But I am consistent.

I try to:
- build regularly  
- debug deeply  
- improve step by step  

Instead of aiming for perfection, I focus on progress.

---

### Where I Stand Now

I don’t define myself by a single stack.

I work across:
- AI / ML  
- full-stack systems  
- DevOps and cloud  

Not separately, but as one system.

---

### Final Thought

I don’t build for the sake of building anymore.

I build to understand.

And every project is just another step in figuring out how systems, models, and ideas come together.
`
  },

  {
    id: 'hawkwatch-build-log',
    title: 'HawkWatch: Revolutionizing Security with AI-Powered Real-Time Surveillance',
    readTime: '8 min read',
    externalUrl: '',
    author: 'Obiwankenobi699',
    date: '2026-01-15',
    image: '/mag1.jpg',
    tags: ['HawkWatch', 'Gemini 1.5 Flash', 'Computer Vision'],
    content: `HawkWatch transforms passive CCTV into an intelligent system using AI-driven real-time analysis. It combines local CV models with cloud-based vision-language reasoning to detect threats instantly.

The system uses hybrid processing to balance latency and accuracy, achieving fast response times while minimizing false positives.

This reflects my interest in building real-world AI systems.`
  },

  {
    id: 'vakeel-ai-case-research-engine',
    title: 'Inside Vakeel AI: Building Legal Search for 5.2 Crore+ Cases',
    readTime: '4 min read',
    externalUrl: '',
    author: 'Obiwankenobi699',
    date: '2025-12-10',
    image: '/mag2.jpg',
    tags: ['LegalTech', 'NLP', 'Semantic Search'],
    content: `Vakeel AI simplifies legal research using semantic retrieval and AI-based summarization.

It focuses on turning large datasets into structured, usable insights efficiently.`
  },

  {
    id: 'jepa-moondream',
    title: 'JEPA v2 + Moondream: Efficient Vision-Language Reasoning',
    readTime: '3 min read',
    externalUrl: '',
    author: 'Obiwankenobi699',
    date: '2026-03-20',
    image: '/mag3.jpg',
    tags: ['JEPA', 'Moondream', 'Vision AI'],
    content: `JEPA v2 learns abstract representations instead of reconstructing pixels, making it efficient for perception.

Combined with Moondream, it enables lightweight vision-language reasoning suitable for real-time systems.

This approach focuses more on understanding than reconstruction.`
  }
]

export const getBlogById = (id: string): BlogPost | undefined => {
  return blogs.find(blog => blog.id === id)
}