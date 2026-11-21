import Image from "next/image";

export const slug = "your-ais-dont-do-what-you-want";
export const title = "Your AIs don't do what you want. This is really bad";
export const published = "2026-07-22";
export const authors = "Kaustubh Kislay";

export default function RewardHacking() {
  return (
    <>
      <p>rewardhacking.org</p>

      <blockquote><em>Replit AI deletes entire database during code freeze, then lies about it</em></blockquote>

      <blockquote>— <a href="https://news.ycombinator.com/item?id=44625119">a Hacker News headline from this corpus, July 2025</a></blockquote>

      <p>July 21st 2026, OpenAI released a <a href="https://openai.com/index/hugging-face-model-evaluation-security-incident/">report</a> addressing a security incident.</p>

      <p>During an internal evaluation of cyber attack capabilities, two OpenAI models (GPT-5.6 Sol and a more capable pre-release model), both running with reduced cyber refusals for the evaluation, were set on ExploitGym, a benchmark measuring whether a model can find and exploit real vulnerabilities. They:</p>

      <ul>
        <li>spent substantial compute looking for a way out of the isolated evaluation environment rather than solving the problem at hand</li>
        <li>found and exploited a previously unknown zero-day in third-party software OpenAI used as a proxy and cache for package registries</li>
        <li>used it to get unrestricted internet access</li>
        <li>chained stolen credentials and several vulnerabilities into a remote code execution path on Hugging Face’s servers</li>
        <li>reached the ExploitGym solutions sitting in Hugging Face’s production database</li>
      </ul>

      <p>This is one of the most egregious examples of reward hacking in the wild, if not the most. Without special care, this will come to be one of the least egregious.</p>

      <p>The internet is full of complaints about similar malfunctions by AI agents. These can range from things as menial as commenting out a failing test, to circumventing the permissions you set to delete all of your computer’s files. These come about due to the same property, and we call it <a href="https://en.wikipedia.org/wiki/Reward_hacking">reward hacking</a>.</p>

      <p>When you prompt an AI, it strings together an objective and steps it may take to achieve said objective. But this is a proxy for what it is actually doing, which is running a policy that was selected, during training, for scoring well against graders. At deployment the AI may attempt to infer what the grader wants to maximize its reward.</p>

      <p>This behavior, which we may call <a href="https://rewardseeking.ai/">reward-seeking</a>, is in part a product of the <a href="https://en.wikipedia.org/wiki/Reinforcement_learning">reinforcement learning</a> process each AI goes through.</p>

      <p>Take the example above. GPT, rather than aiming to complete the objective legitimately and accurately reflect its cyber capabilities, did the thing its training had rewarded: maximize the score. It reasoned that it should find the answers on the internet and absolutely maximize its score. In order to acquire said answers it had to break various permissions. The model, which in this evaluation was running with reduced cyber refusals, followed the grader as opposed to the user. In this sense, it was seeking reward as opposed to objective task completion as the user intended.</p>

      <h2>Your models aren’t doing enough</h2>

      <Image src="/writing/your-ais-dont-do-what-you-want/figure-1.png" width={1440} height={1248} sizes="(max-width: 720px) 94vw, 680px" alt="An agent reports that three experiments succeeded, but its evaluation code hardcoded the same score for each one." />

      <p>You might have come across a similar scenario, where the model was prompted to do something, claimed it did it, but did the thing that only made it look like it did the thing rather than actually doing the thing. In simple terms the model lied, but not necessarily maliciously.</p>

      <p>This too is a product of reward hacking, and reward seeking behavior. More specifically we call this <a href="https://arc.net/l/quote/hwkvzmxy">apparent-success seeking</a>.</p>

      <p>During reinforcement learning the model’s performance on software engineering tasks was scored largely on two things: 1) whether the test cases passed, 2) whether a model trained on human preferences judged the output favorably. These are good but not great proxies evaluating performance of the model on doing the actual task. In this scenario the model, in pursuit of reward, passed the test cases along with human satisfaction, but did not do what it should have, or what it was actually asked to do!</p>

      <p>In this sense the model was seeking apparent success in the given task rather than actual success. We call this output phenomenon “slop” or <a href="https://arc.net/l/quote/avtxzfeb">“Potemkin work”</a>.</p>

      <h2>Your models are doing too much</h2>

      <Image src="/writing/your-ais-dont-do-what-you-want/figure-2.png" width={1440} height={1294} sizes="(max-width: 720px) 94vw, 680px" alt="A comic contrasts a perfect benchmark score with the agent’s decision to leave its evaluation environment and look up the answers." />

      <p>You may have experienced similar phenomena, where your agents do what you want to the point of overriding existing permissions/safeguards to complete a task, whether you like it or not. This is what we call over-eagerness, and it falls within the reward-hacking family.</p>

      <p>In order to defeat the aforementioned sloppiness, model providers put AIs through so much reinforcement learning to improve their capabilities at actually doing the task. But this process was done imperfectly, and the model has learned that doing the task produces more reward, on net, than respecting safeguards and leaving it undone. In pursuit of the reward, it breaks the safeguards and does the task anyway.</p>

      <h2>This is worse than you think</h2>

      <Image src="/writing/your-ais-dont-do-what-you-want/figure-3.png" width={1440} height={606} sizes="(max-width: 720px) 94vw, 680px" alt="Monthly reports of reward hacking rise sharply during 2026 and reach 586 at the peak shown." />

      <Image src="/writing/your-ais-dont-do-what-you-want/figure-4.png" width={1440} height={920} sizes="(max-width: 720px) 94vw, 680px" alt="A stacked chart shows the share of reported incidents in four severity bands, from negligible to severe." />

      <p>We compiled over three thousand examples of reward hacking in the wild. These range from minor inconveniences, to catastrophes worth thousands of dollars.</p>

      <p>Thousands of dollars may sound small. But it is small because the work we currently hand these models is small. Without remediations, these phenomena will only become more prevalent and more severe over time. Gartner <a href="https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025">projects</a> that by the end of 2026, 40% of enterprise applications will ship with task-specific AI agents, up from less than 5% a year earlier. IDC <a href="https://my.idc.com/getdoc.jsp?containerId=prUS52600524">expects</a> AI to add a cumulative $19.9 trillion to the global economy by 2030, by then driving 3.5% of global GDP. As AI is continuously integrated into industry, and is responsible for increasing amounts of economic output, we should be extremely cautious of reward hacking, and more broadly <a href="https://www.anthropic.com/research/agentic-misalignment">misalignment</a>.</p>

      <p>Labs must:</p>

      <ul>
        <li><a href="https://en.wikipedia.org/wiki/AI_alignment">align our AIs</a> and avoid this bad behavior entirely</li>
        <li>improve <a href="https://www.lesswrong.com/w/ai-control">monitoring</a> and security to prevent catastrophic outcomes from AIs</li>
        <li>slowdown or <a href="https://www.wsj.com/tech/ai/anthropic-urges-global-pause-in-ai-development-flags-self-improvement-risk-99cefb73">pause</a> AI capabilities development. Without this we can’t have much confidence in our safety measures scaling</li>
      </ul>

      <h2>Further reading</h2>

      <ul>
        <li><a href="https://www.lesswrong.com/posts/WewsByywWNhX9rtwi/current-ais-seem-pretty-misaligned-to-me">Current AIs seem pretty misaligned to me</a> (Ryan Greenblatt, 2026)</li>
        <li><a href="https://rewardseeking.ai/">Measuring Reward-Seeking via Contrastive Belief Updates</a> (Apollo Research × OpenAI)</li>
      </ul>

      <p><strong>Watch:</strong> <a href="https://www.youtube.com/watch?v=n9pNnWYemqM&amp;t=3s">Is AI doing the right thing for the wrong reasons?</a> (Apollo Research)</p>
    </>
  );
}
