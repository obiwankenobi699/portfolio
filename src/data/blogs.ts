import { BlogPost } from '@/types/blog'

/**
 * ─── HOW TO ADD IMAGES ────────────────────────────────────────────────────
 *
 * Every blog has two kinds of image fields:
 *
 * 1. `image` — the COVER / THUMBNAIL shown on the card grid and reader hero.
 *    Put your file in /public/ and write the path here, e.g. '/mag4.jpg'
 *
 * 2. `sectionImages` — images that appear INSIDE the article.
 *    Each section heading (### …) gets one slot.
 *    Add paths in order — slot 1 maps to the first ###, slot 2 to the second, etc.
 *    Leave a slot as '' or undefined to keep the decorative placeholder.
 *
 *    Example:
 *      sectionImages: [
 *        '/how-it-started.jpg',   // shown before "### How It Started"
 *        '',                      // no image yet for this section → shows placeholder
 *        '/linux-setup.png',      // shown before "### Linux: Where I Started…"
 *      ]
 *
 * Drop files into /public/ (Next.js static folder) and reference them here.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const blogs: BlogPost[] = [
  {
    id: 'about-me-journey',
    title: 'Building While Learning: My Journey in AI and Development',
    readTime: '6 min read',
    externalUrl: '',
    author: 'Obiwankenobi699',
    date: '2026-04-20',
    image: '/mag4.jpg',
    // ↓ Add section images here — one path per ### heading, in order
    sectionImages: [
      '',    // ### How It Started 
      '',   // ### Linux: Where I Started Thinking Differently
      '',   // ### Moving Away from Traditional Web Dev
      '',   // ### Learning ML by Building, Not by Watching
      '',   // ### The Part I Avoided for Too Long: DSA
      '',   // ### Performance, GPUs, and Real Constraints
      '',   // ### When Everything Connected: Cloud and DevOps
      '',   // ### What Hackathons Actually Taught Me
      '',   // ### The Honest Part: What I Am Still Working On
      '',   // ### Where I Stand Now
    ],
    tags: ['Journey', 'Learning', 'Hackathons', 'Growth'],
    content: `I am a CS student who builds things for a living — not as a job, but as the only way I actually learn. AI, systems, full-stack. None of it in a straight line.

This is not an origin story with a clean arc. It is a record of what I broke, what I fixed, and what I understood on the other side of the wall.

---

### How It Started

HTML. CSS. JavaScript. The usual on-ramp.

It felt like power at first — type something, see it render, ship it. That loop is genuinely satisfying. Until it isn't. At some point I realised I was skimming surfaces. Frameworks on top of frameworks, tutorials all the way down. I wanted to understand what makes decisions, not just what executes them.

That want changed the trajectory.

---

### Linux: Where I Started Thinking Differently

Switching to Linux was not a preference. It was a discipline.

I landed on Arch with Hyprland — configured by hand, debugged without a safety net. No abstraction to hide behind. Every failure is yours to diagnose. Every working system is something you actually understand.

That mindset moved directly into how I write code. Comfortable with uncertainty. Willing to read the source when the docs lie. Not afraid of things breaking, because breaking is just the system telling you what it needs.

---

### Moving Away from Traditional Web Dev

There was a deliberate turn away from conventional full-stack work. Not because it lacks value — it does not — but because I needed harder problems. Problems where the answer was not one search query away.

I wanted to be in spaces where systems thinking and domain knowledge matter as much as syntax. That is when ML became the focus.

---

### Learning ML by Building, Not by Watching

No courses. No theory-first. I started building things that did not work and spent the time figuring out why.

Wrong assumptions in training pipelines. Datasets that exposed every flaw in my logic. Inference systems that collapsed under real load. Each failure was a lesson that stuck because I owned it — not because I watched someone else solve it.

Computer vision. Vision-language models. Real-time inference. The approach never changed: build, break, fix, understand. Repeat until it actually works.

---

### The Part I Avoided for Too Long: DSA

For a long time, Data Structures and Algorithms felt like interview prep. Abstract. Disconnected from anything I was actually building.

Then I hit walls. Operations that were inexplicably slow. Systems that stopped scaling. Code that worked but felt fundamentally wrong. That is when DSA became useful — not as an exercise, but as a toolbox I finally knew how to reach into.

---

### Performance, GPUs, and Real Constraints

ML introduced constraints that web dev never had. GPU memory budgets. Inference latency. The hard gap between what works on paper and what runs in production without falling apart.

CUDA setups. Model optimisation. Latency budgets with actual cost implications. These forced performance thinking to become a first-class concern — not something you tack on after the feature works.

---

### When Everything Connected: Cloud and DevOps

As projects grew, infrastructure became unavoidable. Docker for reproducibility. Cloud deployments. CI/CD that actually caught problems before they reached production.

The useful shift: AI, backend systems, and infrastructure stopped being separate disciplines. They became one continuous system. That unified view is something I keep returning to.

---

### What Hackathons Actually Taught Me

Winning at the national level under time pressure forces a kind of clarity you cannot manufacture in a side project.

You cannot overthink at 3 AM with four hours left. You cannot debate architecture when the demo is in ninety minutes. Decisions get made fast. You own them. You execute cleanly.

The most useful thing hackathons taught me: you do not need to know everything. You need to figure out what you need quickly, under pressure, alongside people who trust each other.

---

### The Honest Part: What I Am Still Working On

I am not consistent across everything. There are areas where my implementation lags behind my understanding. Where I need more reps to match my intuition.

What I have learned to do is not wait until I feel ready. I build. I hit the wall. I work through it. Progress that comes from friction is the kind that holds.

---

### Where I Stand Now

I do not define myself by a single stack or domain.

AI and ML. Full-stack systems. Infrastructure. Not parallel tracks — one system I am learning to see more completely, one build at a time.
`

  },

  {
    id: 'winning-nationals',
    title: 'Two National Wins. One Team. What We Actually Did.',
    readTime: '7 min read',
    externalUrl: '',
    author: 'Obiwankenobi699',
    date: '2026-03-30',
    image: '/win.jpg',
    sectionImages: [
      '',   // ### We Read a Research Paper. Most Teams Did Not.
      '',   // ### The Work That Happens Before the Hackathon Starts
      '',   // ### We Built Products. Not Projects.
      '',   // ### The Team Did Not Change. That Was Intentional.
      '',   // ### The Pitch
      '',   // ### Why We Keep Going as a Team
    ],
    tags: ['Hackathon', 'Team', 'ML', 'Product Thinking', 'Pitching'],
    content: `There is a photo on my phone. A gold trophy, held up in a fluorescent-lit room somewhere around 2 AM. The photo does not show the 36 hours before it.

We have won two national-level hackathons with the same team. This is what we actually did — and what we actually learned.

---

### We Read a Research Paper. Most Teams Did Not.

For one of our builds, we anchored the core system directly on a published paper — Meta's V-JEPA 2, Joint Embedding Predictive Architecture v2.

V-JEPA 2 does not learn by reconstructing pixels. It predicts abstract representations in latent space — reasoning about structure and motion rather than appearance. That distinction makes perception significantly more robust under real conditions.

We paired it with Moondream, a lightweight vision-language model that translates those structured embeddings into natural language. The pipeline, simplified:

\`\`\`python
# Conceptual — not production code
visual_encoder = VJEPA2Encoder()
latent_repr    = visual_encoder(frames)
description    = moondream.describe(latent_repr)
\`\`\`

When judges pushed on the technical choices, we had answers that went deeper than the demo. We had read the paper. We understood why the architecture was built the way it was. That depth is rare at a hackathon. It is also what judges remember.

---

### The Work That Happens Before the Hackathon Starts

Most teams arrive and start figuring out what to build. We had already done that.

Two weeks before each hackathon: problem scoped, stack agreed, roles assigned. When the clock started, we were building — not debating. That preparation is not cheating. It is the work most teams skip entirely.

The night cycle is where teams collapse. Around 2 to 3 AM, energy drops, decisions degrade, code gets sloppy. We rotated focus instead of pushing everyone through the wall simultaneously. Whoever was sharpest drove. Others reviewed, rested, came back. No ego about who wrote the most lines.

By the final four hours, we had stopped adding features. We were hardening what existed — running the demo against adversarial inputs, rehearsing the pitch until every number we planned to say on stage was accurate and defensible.

---

### We Built Products. Not Projects.

This is the clearest line between teams that win and teams that submit.

A project answers: what does this do? A product answers: who needs this, why now, and what changes when they have it?

We framed every build around a concrete outcome — a measurable cost removed, a workflow replaced, an operation that no longer needs human oversight. Judges are not judging your code. They are judging whether your solution has a credible reason to exist.

Before every hackathon, three questions: who is the user, what pain are we removing, what does success look like six months after deployment. If we cannot answer all three in sixty seconds, we are not ready to build.

---

### The Team Did Not Change. That Was Intentional.

Same core team across both wins. Deliberate decision, not convenience.

What made it work was not shared strengths — it was complementary ones. Frontend architecture. Backend and systems design. ML research and integration. Product framing. No one was bluffing about their domain. Because our interests genuinely sit in different areas, we catch problems from angles that a uniform team cannot.

The thing that held under pressure: trust. When someone made a call at 4 AM — a technical pivot, a scope cut, dropping a feature — the rest executed without a committee meeting. That trust is not something you assemble at the start of a hackathon. It builds across builds.

We also walked the room during build hours. Showing people what we were making. Listening to what confused them. The judges would be confused by the same things — and we still had time to fix it.

---

### The Pitch

Three layers: the hook, the proof, the vision.

The hook is one sentence that makes the problem impossible to dismiss. The proof is a live demo with specific, verifiable numbers — not "fast," but "sub-300ms latency." The vision is one sentence about what this becomes at scale. Delivered without a roadmap slide.

Four slides maximum: title, problem, live demo with numbers, team. Everything else is conversation. Judges who are engaged ask questions. Questions are your chance to go deeper than the time limit allows.

Speak slower than feels natural. Stand still. Make eye contact with one person at a time. Confidence in delivery reads as confidence in the product — they are not the same thing, but in five minutes, perception is everything.

---

### Why We Keep Going as a Team

The real reason we kept the same team: we enjoy what we build together.

When you are solving a real problem with people who care about the same things, it does not feel like grinding through a sleep-deprived competition. It feels like building something that should exist. That energy is visible — to other participants, and to judges.

After every hackathon, win or loss, thirty minutes the next day. What broke. What we cut too late. What we would do differently. That document is where the second win came from.

The trophy is gold. What it represents is two weeks of preparation, one night of focused execution, a research paper read and understood, a product framed before a line of code was written, and a team that trusts each other when it counts.

Not a secret. Just consistent work.
`
  },

  {
    id: 'View-AI-build-log',
    title: 'NAZAR-AI: How We Built a Surveillance System That Actually Thinks',
    readTime: '8 min read',
    externalUrl: '',
    author: 'Obiwankenobi699',
    date: '2026-01-15',
    image: '/mag1.jpg',
    sectionImages: [
      '',   // ### The Core Problem
      '',   // ### The Architecture
      '',   // ### What Building This Taught Me
    ],
    tags: ['HawkWatch', 'Gemini 2.5 Flash', 'Computer Vision'],
    content: `Most CCTV systems do not think. They record. A human watches, notices the threat, responds — and by the time that happens, the moment has already passed.

HawkWatch was built to close that gap. Not to replace cameras. To give them judgment.

---

### The Core Problem

24/7 human monitoring is expensive, inconsistent, and does not scale. A person watching six feeds at 3 AM is not the same as a person watching one feed at noon. Attention degrades. Threats get missed.

The question was never whether AI could detect threats. It can. The question was whether we could build a system that did it reliably, at low latency, across multiple feeds simultaneously, with a false positive rate low enough to actually be trusted in production.

False positives are not a minor inconvenience. A system that cries wolf loses operator trust. Once it loses trust, it gets ignored. An ignored system is worse than no system at all.

---

### The Architecture

HawkWatch runs a hybrid processing model. Local computer vision models handle the first pass — fast, lightweight, on the edge. When something is flagged above threshold, the frame is escalated to Gemini 2.5 Flash for deeper visual reasoning and classification.

This split was deliberate. Cloud-only means unacceptable latency and cost at scale. Local-only means losing the contextual reasoning that a vision-language model provides. The hybrid gives you both: speed at the edge, intelligence in the cloud, only when it actually matters.

\`\`\`typescript
// Simplified detection pipeline
const localResult = await localModel.analyze(frame);

if (localResult.confidence > ESCALATION_THRESHOLD) {
  const deepResult = await gemini.classify(frame, localResult.context);
  await alertSystem.dispatch(deepResult);
}
\`\`\`

The system handles 5–10 concurrent camera feeds, dispatches alerts via email and SMS within seconds of detection, and holds a false positive rate under 4 percent.

---

### What Building This Taught Me

The hardest part was not the ML. It was the integration.

Making the local model, the cloud escalation layer, the alert system, and the analytics dashboard behave as a single coherent system under real conditions — that is where the real engineering happened. Latency budgets. Frame sampling strategies. Batching logic calibrated to the actual threat window.

The margin for error in a real-time security system is essentially zero. That constraint made me a much more careful systems builder.

HawkWatch is where I stopped thinking of AI as an application layer and started thinking of it as infrastructure.
`
  },

  {
    id: 'vakeel-ai-case-research-engine',
    title: 'Inside Vakeel AI: Building Legal Search Across 5.2 Crore Cases',
    readTime: '4 min read',
    externalUrl: '',
    author: 'Obiwankenobi699',
    date: '2025-12-10',
    image: '/mag3.jpg',
    sectionImages: [
      '',   // ### Why Keyword Search Fails in Legal Contexts
      '',   // ### The Scale Problem
      '',   // ### What This Project Reinforced
    ],
    tags: ['LegalTech', 'NLP', 'Semantic Search'],
    content: `Legal research in India is a problem that has not been solved well. The datasets are massive. The language is technical and inconsistent. Keyword search returns results that are accurate by letter and wrong in meaning.

Vakeel AI was built to fix that last part.

---

### Why Keyword Search Fails in Legal Contexts

When a lawyer searches for "wrongful termination without compensation," they are not looking for documents containing those exact words. They are looking for cases where the legal reasoning addresses that situation — regardless of phrasing.

Keyword search cannot make that distinction. It matches tokens, not meaning. Two sentences that express the same legal concept in different language are invisible to each other in a BM25 index.

Semantic search operates differently. Vakeel AI encodes legal text as vector embeddings — dense representations of meaning, not surface form. Queries are matched against case documents by conceptual proximity. A question about employment disputes surfaces relevant cases even when the terminology diverges entirely.

---

### The Scale Problem

5.2 crore cases is not a dataset you can brute-force through an embedding model at query time. Retrieval has to be fast. The index has to support broad queries and narrow, highly specific ones with equal fidelity.

The pipeline: embedding generation, vector indexing through Pinecone, and a retrieval layer that re-ranks results before they reach the user.

\`\`\`typescript
const queryEmbedding = await embedText(userQuery);
const candidates    = await pinecone.query(queryEmbedding, { topK: 50 });
const reranked      = await rerankByRelevance(candidates, userQuery);
return reranked.slice(0, 10);
\`\`\`

Re-ranking is not optional at this scale. The first retrieval pass optimises for recall — getting relevant cases into the candidate set. Re-ranking optimises for precision — putting the right cases at the top of the list the user actually sees.

---

### What This Project Reinforced

Semantic search is not a drop-in replacement for keyword search. Building it well requires understanding exactly where it fails — when embeddings mislead, when re-ranking overcorrects, when the query is too vague for any retrieval strategy to resolve cleanly.

Vakeel AI is where I stopped treating retrieval as an implementation detail and started treating it as a design discipline in its own right.
`
  },

  {
    id: 'jepa-moondream',
    title: 'V-JEPA 2 and Moondream: What Happens When You Stop Reconstructing Pixels',
    readTime: '3 min read',
    externalUrl: '',
    author: 'Obiwankenobi699',
    date: '2026-02-25',
    image: '/jepa.png',
    sectionImages: [
      '',   // ### Predicting in Latent Space, Not Pixel Space
      '',   // ### Pairing It With Moondream
    ],
    tags: ['JEPA', 'Moondream', 'Vision AI'],
    content: `Most vision models learn by reconstructing what they see. Feed them a masked image, ask them to predict the missing pixels, reward them for accuracy. It works — but it optimises for the wrong thing.

Pixel reconstruction teaches models to memorise texture and appearance. V-JEPA 2 takes a different approach entirely.

---

### Predicting in Latent Space, Not Pixel Space

V-JEPA 2 — Meta's Joint Embedding Predictive Architecture v2 — learns by predicting abstract representations of masked regions, not their raw pixel values. The model is trained to answer one question: given what I can see, what would the embedding of the hidden region look like?

This is a harder task in a meaningful way. The model cannot cheat by memorising appearance. It has to develop genuine structural understanding to predict correctly in embedding space. There is no shortcut.

\`\`\`python
context_embedding = encoder(visible_patches)
target_embedding  = encoder(masked_patches)
predicted         = predictor(context_embedding)

loss = latent_distance(predicted, target_embedding)
\`\`\`

The result: better generalisation to novel visual scenarios. Cleaner handling of occlusion. More effective transfer to downstream perception tasks.

---

### Pairing It With Moondream

Moondream is a small, efficient vision-language model built for constrained environments. What made it an interesting pairing with V-JEPA 2 is that the structured, high-level embeddings V-JEPA 2 produces are exactly what a compact language model needs — without requiring a massive vision backbone to process raw pixels first.

The combination gives you meaningful visual reasoning and natural language description at a fraction of the computational overhead of larger vision-language systems.

This is the direction I find most interesting in applied ML: not bigger models, but smarter composition of smaller, specialised ones. Less is more, when you know what each component is actually for.
`
  },
{
  id: 'balance-college-code-life',
  title: 'The Weight of the Backpack: Code, College, and Everything Else',
  readTime: '5 min read',
  externalUrl: '',
  author: 'Obiwankenobi699',
  date: '2026-03-21',
  image: './Christ.jpg',
  sectionImages: [
    '',   // ### The Confidence Problem Nobody Talks About
    '',   // ### What the Whiteboard Does Not Show
    '',   // ### Friends, or the Lack of Them
    '',   // ### The Academics Trap
    '',   // ### What I Am Still Figuring Out
  ],
  tags: ['College', 'Life', 'Balance', 'Honest'],
  content: `There is a photo of me at a suicide prevention awareness booth on campus. I am bent over a whiteboard, writing something. I do not remember what I wrote. I remember how I felt standing there — like someone who had been holding a lot in for a long time.

This is not a post about mental health in a clinical sense. It is about what nobody tells you when you are a CS student trying to build things, pass exams, make friends, and figure out who you are — all at the same time.

---

### The Confidence Problem Nobody Talks About

There is a version of coding that looks clean from the outside. You open a terminal. You type. Things work. You ship.

That is not what it actually looks like.

What it actually looks like is staring at an error for two hours that turns out to be a missing semicolon. It is opening someone else's GitHub and feeling like you are years behind. It is building something you are proud of and then watching a fifteen-year-old on Twitter casually describe something ten times more sophisticated.

The confidence problem is not that you are bad at this. It is that the feedback loop is brutal and the comparison pool is infinite. You are not comparing yourself to the people in your class. You are comparing yourself to everyone who has ever posted code on the internet.

That is a war you cannot win. And most days, you do not even notice you are fighting it.

---

### What the Whiteboard Does Not Show

I stood at that booth and wrote something about asking for help. It felt slightly performative to write it — the way awareness campaigns sometimes do. But I meant it.

Because the honest truth is that coding, when it is going badly, feels deeply personal. You wrote the logic. You made the decision. The bug is yours. The failure is yours. And when you are already running on four hours of sleep and a deadline and a lab submission due Thursday, that weight compounds fast.

Nobody teaches you what to do when the IDE is open and nothing is coming. When you sit there and the cursor blinks and you have nothing. That is not in any tutorial. That is just the part you have to survive until it passes.

---

### Friends, or the Lack of Them

College is supposed to be where you make the friends you keep for life. That is what everyone says.

What they do not say is that making real friends when you are deep in a project at 2 AM, or skipping the hang because you have a deployment to finish, or mentally somewhere else entirely during conversations — that is genuinely hard.

I am not someone who finds people exhausting. I actually like being around people. But there is a version of this life where you blink and six months have passed and your closest relationships are with people on Discord you have never met in person.

That is not a tragedy. But it is something worth noticing.

The people worth keeping are the ones who do not make you explain why you care so much about something they do not understand. They just accept that you do. Find those people. Keep them.

---

### The Academics Trap

Here is the uncomfortable thing about being a CS student who builds real things: the curriculum often feels like a detour.

Data structures taught in a way that is completely disconnected from any real system. Theory papers that test memorisation more than understanding. Exams that reward who studied the question bank, not who actually learned the subject.

And you have a choice, constantly: do the thing that gets the grade, or do the thing that makes you better.

Most of the time you try to do both and end up doing neither particularly well. That is the trap. The academics are not useless — some of it clicks later, in ways you did not expect. But the pressure to perform in a system that does not always reward what you are actually trying to build is real. Pretending otherwise does not help anyone.

---

### What I Am Still Figuring Out

I do not have a clean resolution here. I do not have the balance figured out.

Some weeks the code is good and the grades are fine and I see my friends and I feel like a person. Other weeks I am just surviving — submitting things I am not proud of, cancelling plans, running on momentum and caffeine.

What I have learned is that the whiteboard matters. Not the awareness campaign — the actual question of what you need and who you can ask. That is worth spending time on, even when the deadline is tomorrow.

You are not behind. You are not failing. You are doing something hard, badly sometimes, well sometimes, and that is what it looks like to actually do it.

Keep going.
`,
},
]



export const getBlogById = (id: string): BlogPost | undefined => {
  return blogs.find(blog => blog.id === id)
}