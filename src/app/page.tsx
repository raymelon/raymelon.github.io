import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import BlurFadeTextCustom from "@/components/magicui/blur-fade-text-custom";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`hey, i'm ${DATA.name.split(" ")[0].toLowerCase()} 👋`}
              />
              <BlurFadeTextCustom
                className="max-w-[600px] sm:text-2xl mt-5 text-gray-600 dark:text-white"
                delay={BLUR_FADE_DELAY}
                text={
                  `
                  `
                }
              >
                <div className="tracking-normal">
                  i ❤️ building apps.
                  <br/>
                  <br/>
                  my first app is <a className="text-blue-600 dark:text-blue-400" href="https://x.com/pseudokid/status/1824213351066636479" target="_blank">a timer made in Visual Basic</a>, and the 15-year old me spent the school break converting it to C#,
                  <br/>
                  <br/>
                  <a className="text-blue-600 dark:text-blue-400" href="https://www.linkedin.com/school/polytechnic-university-of-the-philippines/posts/?feedView=all" target="_blank">uni</a> taught me C, <a className="text-blue-600 dark:text-blue-400" href="https://stackoverflow.com/users/4895040/raymelfrancisco?tab=answers&sort=votes" target="_blank">uni summers</a> taught me Python and Java,
                  <br/>
                  <br/>
                  being a full-time problem solver for a <a className="text-blue-600 dark:text-blue-400" href="https://orangefix.xyz/" target="_blank">dev shop</a> (named after oranges 🍊),
                  taught me how to make things work with what I have,
                  <br/>
                  <br/>
                  building 2 startups with friends taught me startups 101,
                  <br/>
                  <br/>
                  web3 thought me how markets work,
                  <br/>
                  <br/>
                  the world of indiehacking and <a className="text-blue-600 dark:text-blue-400" href="https://x.com/search?q=%23buildinpublic&src=typeahead_click" target="_blank">#buildinpublic</a> taught me how to be an <a className="text-blue-600 dark:text-blue-400" href="https://www.whatisanindiemaker.com/" target="_blank">indie maker</a>.
                </div>
              </BlurFadeTextCustom>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="links">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">links</h2>
        </BlurFade>
        <BlurFadeTextCustom
          className="max-w-[600px] sm:text-2xl mt-5 text-gray-600 dark:text-white"
          delay={BLUR_FADE_DELAY * 3}
          text={
            `
            `
          }
        >
          <div className="tracking-tight">
            i yap in <a className="text-blue-600 dark:text-blue-400" href="https://x.com/pseudokid" target="_blank">twitter @ pseudokid</a>. i find <a className="text-blue-600 dark:text-blue-400" href="https://www.threads.net/@raymelfrancisco" target="_blank">threads</a> cool. check my work experience in my <a className="text-blue-600 dark:text-blue-400" href="https://read.cv/raymel" target="_blank">read.cv</a>.
            <br/>
            <br/>
            of course i have a <a className="text-blue-600 dark:text-blue-400" href="https://www.linkedin.com/in/raymelfrancisco/" target="_blank">linkedin.</a>
            <br/>
            and a <a className="text-blue-600 dark:text-blue-400" href="https://modul.so/raymel" target="_blank">cool portfolio.</a>
            <br/>
            <br/>
            <a className="text-blue-600 dark:text-blue-400" href="https://github.com/raymelon" target="_blank">github</a> •&nbsp;
            <a className="text-blue-600 dark:text-blue-400" href="https://dev.to/raymelon" target="_blank">dev.to</a> •&nbsp;
            <a className="text-blue-600 dark:text-blue-400" href="https://raymel.hashnode.dev/" target="_blank">hashnode</a> •&nbsp;
            <a className="text-blue-600 dark:text-blue-400" href="https://stackoverflow.com/users/4895040/raymelfrancisco" target="_blank">stackoverflow</a> •&nbsp;
            <a className="text-blue-600 dark:text-blue-400" href="/blog">blog</a>&nbsp;
          </div>
        </BlurFadeTextCustom>
      </section>
      <section id="email">
        <BlurFadeTextCustom delay={BLUR_FADE_DELAY * 4} text=''>
          <div className="">
            <br/>
            <h2 className="text-2xl font-bold tracking-tighter">for collabs, work, or just to say hi</h2>
            <a className="text-xl font-bold tracking-tighter sm:text-3xl xl:text-4xl/none text-blue-600 dark:text-blue-400" href="https://www.linkedin.com/messaging/compose?recipient=raymelfrancisco">dm me on linkedin</a>
          </div>
        </BlurFadeTextCustom>
      </section>
      {/* <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section> */}
      {/* <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section> */}
      {/* <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section> */}
      {/* <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section> */}
      {/* <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section> */}
      {/* <section id="hackathons">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like building things
                </h2>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section> */}
      {/* <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Want to chat? Just shoot me a dm{" "}
                <Link
                  href={DATA.contact.social.X.url}
                  className="text-blue-500 hover:underline"
                >
                  with a direct question on twitter
                </Link>{" "}
                and I&apos;ll respond whenever I can. I will ignore all
                soliciting.
              </p>
            </div>
          </BlurFade>
        </div>
      </section> */}
    </main>
  );
}
