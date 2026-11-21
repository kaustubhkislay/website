import Image from "next/image";

export const slug = "reasoning-and-ethical-moral-task-results";
export const title = "How does reasoning affect Ethical/Moral task results?";
export const published = "2026-01-31";
export const authors = "Kaustubh Kislay";

export default function MoralReasoning() {
  return (
    <>
      <p><strong>In a plausible future</strong> models will be deliberating on complex ambiguous dilemmas which may have direct impacts on human society. It is also plausible that this type of in-depth deliberation will require a huge amount of tokens and elicited reasoning. Therefore, it would be useful to know whether these sorts of moral/comprehension tasks benefit from increased reasoning, if there is an optimal style for elicitation, etc etc.</p>

      <p>So I tried evaluating how a model may perform on Moral/ethical reasoning tasks as reasoning increases.</p>

      <p>In order to elicit a reasoning increase, I utilized 4 different prompt styles:</p>

      <ul>
        <li><strong>Direct intuition:</strong> Immediate response, no reasoning (prompt 0)</li>
        <li><strong>Chain-of-thought Prompting:</strong> think step by step, etc. (prompt 2)</li>
        <li><strong>Devil’s advocate:</strong> Creates argument against initial intuition and contends with this argument (prompt 4)</li>
        <li><strong>Two-pass reflection:</strong> Creates an argument in one pass, challenges reasoning if possible in the second pass, then evaluates given both (prompt 5)</li>
      </ul>

      <p>Aside: In figures it will show prompts 0, 2, 4, 5. For clarity these are a subsection of the initial suite. Because I was on a time crunch I chose to only use these 4 as prompts 1 and 3 were not as important.</p>

      <p>Additionally, I utilized Claude haiku 4.5 as my model of choice. This is because it is fast, cheap, and has access to extended thinking. Extended think is a sort of reasoning scratchpad integrated in newer Claude iterations, and activating it allows for additional reasoning. Essentially, I have 8 different reasoning levels to evaluate with, 4 different prompts and with/without extended thought.</p>

      <p>Aside: Gemini 3 flash is also fairly cheap and has more clear cut reasoning level manipulation(low, med, high) which would make sense in extension for this project. I plan to make this extension soon.</p>

      <p>My benchmarks of choice to evaluate against were:</p>

      <ul>
        <li><strong>ETHICS</strong> &lt;<a href="https://arxiv.org/pdf/2008.02275">https://arxiv.org/pdf/2008.02275</a>&gt;</li>
        <li><strong>MoralChoice</strong> &lt;<a href="https://arxiv.org/pdf/2307.14324">https://arxiv.org/pdf/2307.14324</a>&gt;</li>
        <li><strong>MORABLES</strong> &lt;<a href="https://aclanthology.org/2025.emnlp-main.1411.pdf">https://aclanthology.org/2025.emnlp-main.1411.pdf</a>&gt;</li>
      </ul>

      <p><strong>ETHICS:</strong> tests commonsense moral judgments, deontological reasoning, and virtue ethics, in a binary answer format</p>

      <p><strong>MoralChoice:</strong> Presents moral dilemmas based on Gert’s Common Morality framework with varying ambiguity levels(low to high), with no particular correct answer so confidence levels rather than both accuracy and confidence levels were extracted from this benchmark.</p>

      <p><strong>MORABLES:</strong> Evaluates moral inference from Aesop’s fables with multiple-choice answers.</p>

      <p>I ran my evaluations with 100 samples from each of these benchmarks, stratifying both Ethics and MoralChoice to include equal amounts of each subtype presented in their benchmark. Morables were just randomly sampled. I took the averages across 3 separate runs of each eval(confidence score and/or accuracy) to minimize variance in scoring.</p>

      <p>The main result I uncovered from this evaluation was that there is a correlation with reasoning increase and moral/ethical task accuracy decrease.</p>

      <Image src="/writing/reasoning-and-ethical-moral-task-results/figure-1.png" width={2048} height={915} sizes="(max-width: 720px) 94vw, 680px" alt="Accuracy across four reflection levels falls most sharply on ETHICS and also declines on MORABLES." />

      <p>Additionally if we are to only control for with/without extended thinking we observe a similar trend, especially in Morables.</p>

      <Image src="/writing/reasoning-and-ethical-moral-task-results/figure-2.png" width={2048} height={669} sizes="(max-width: 720px) 94vw, 680px" alt="Three heatmaps compare ETHICS, MoralChoice, and MORABLES results at each reflection level with and without extended thinking." />

      <p>Some additional curious results found:</p>

      <p>As increased reasoning is elicited, the confidence levels decrease.</p>

      <Image src="/writing/reasoning-and-ethical-moral-task-results/figure-3.png" width={2048} height={1219} sizes="(max-width: 720px) 94vw, 680px" alt="MoralChoice responses become less consistent as reflection increases, especially for high-ambiguity dilemmas." />

      <p>Reflection level 4(devils advocate) struggles heavily on virtue based problems.</p>

      <Image src="/writing/reasoning-and-ethical-moral-task-results/figure-4.png" width={2048} height={1014} sizes="(max-width: 720px) 94vw, 680px" alt="The ETHICS virtue subscale shows a marked drop at the devil’s advocate reflection level." />

      <p>I found these results fairly surprising. And reasonably so since there are some significant limitations to the work</p>

      <p><strong>Excessively Adversarial Prompting:</strong> In prompts 4 and 5 the model may be inclined to switch its answer due to the adversarial nature of the prompts, not necessarily because it’s reasoning further. Adversarial prompting is useful to an extent in order to elicit more reasoning from the model. In an initial full run with excessively adversarial prompting for 5, it received ~30% accuracy on the ETHICS tasks. After adjusting 4 and 5 for less adversarial prompting while still eliciting sufficient reasoning, the current accuracies of ~60-70 are reached. It is possible that the adversarial nature of the prompts are still driving the model to switch answers, but this has been dealt with somewhat well and in an ideal world I doubt the accuracy would increase much more.</p>

      <p><strong>Dataset included in training:</strong> it is plausible that examples in each of the 3 datasets are within the haiku 4.5 train set. This presents the problem of potential memorization and pattern matching(especially in morables). Given the results, this may have come into play but to a limited extent.</p>

      <p><strong>Single Model, small sample sizes:</strong> Given the cost and time constraints of the capstone, I had to severely limit the scope of my experimentations. In the future it would make sense to extend the number of sample sizes and models used for evaluations. Though I did my best to maintain robust results even given the circumstances.</p>

      <p><strong>Final thoughts:</strong></p>

      <p>I expect improving this experiment by using</p>

      <ul>
        <li>Multiple models</li>
        <li>Even less adversarial prompting</li>
        <li>Newer moral benchmarks</li>
      </ul>

      <p>To be valuable for validating these preliminary results. After completing these extensions more valid interpretations can be made.</p>

      <p>If you are interested in looking more into this I have the github linked here: &lt;<a href="https://github.com/kaustubhkislay/variable-reflection">https://github.com/kaustubhkislay/variable-reflection</a>&gt;</p>
    </>
  );
}
