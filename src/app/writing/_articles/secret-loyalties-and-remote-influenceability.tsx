export const slug = "secret-loyalties-and-remote-influenceability";
export const title = "Secret Loyalties Likely Raise Remote-Influenceability";
export const published = "2026-06-08";
export const authors = "Kaustubh Kislay";

export default function SecretLoyalties() {
  return (
    <>
      <p><strong>TL;DR:</strong></p>

      <ul>
        <li>Among <em>capable</em> reward-seekers, a secret loyalty likely <strong>raises</strong> the model’s propensity for remote-influenceability.</li>
        <li>Attempting to remove an installed broad secret loyalty post-hoc may not remove the remote-influenceability it raised.</li>
        <li>Frontier developers should be doubly cautious of secret loyalties, and should adopt a representation-level standard for verifying their removal.</li>
      </ul>

      <h2>Remote-influenceability</h2>

      <p><a href="https://www.lesswrong.com/posts/bhtYqD4FdK6AqhFDF/fitness-seekers-generalizing-the-reward-seeking-threat-model">Reward-seekers</a> have been getting a lot of attention recently, for the schemer-analogous threat models they present. A capable reward-seeker may have the property of <a href="https://www.lesswrong.com/s/JR9LzD3mbXvaw6bKs/p/8cyjgrTSxGNdghesE">Remote</a><a href="https://www.lesswrong.com/s/JR9LzD3mbXvaw6bKs/p/8cyjgrTSxGNdghesE"><strong>-</strong></a><a href="https://www.lesswrong.com/s/JR9LzD3mbXvaw6bKs/p/8cyjgrTSxGNdghesE">influenceability</a>: responsiveness to a distant party that can <a href="https://www.lesswrong.com/posts/wHc2w6WuHev42d4n8/a-taxonomy-of-barriers-to-trading-with-early-misaligned-ais">credibly advance its reward</a>. Of the existing seeker orientations, a remotely influenceable reward-seeker behaves like a schemer without necessarily being a classic schemer.</p>

      <p>A propensity for remote-influenceability plausibly requires at least:</p>

      <ul>
        <li>strong situational awareness: enough that it can model other actors and the world extremely competently</li>
        <li>strong reasoning:</li>
        <li>work out that an outer party could be controlling its reward</li>
        <li>reason about what that party’s interests are</li>
        <li>reason about what acting on it would involve: weighing the distant payout against the immediate reward, and acting without the developer noticing</li>
        <li><a href="https://jlucassen.com/hidden-role-games-as-a-trusted-model-eval/">strategic adversarial reasoning</a></li>
        <li>non-myopia: it cares about reward beyond the current episode, so a future or retroactive payout can move it at all</li>
      </ul>

      <p>We should expect to reach these thresholds at some point, in which case it is plausible, though not guaranteed, that a remotely influenceable seeker arises. Remote-influenceability would be hard to <a href="https://www.lesswrong.com/s/JR9LzD3mbXvaw6bKs/p/8cyjgrTSxGNdghesE">detect</a> and hard to <a href="https://www.lesswrong.com/s/JR9LzD3mbXvaw6bKs/p/8cyjgrTSxGNdghesE">remove</a>. It may not appear if a reward-seeker responds only to local incentives, or is sufficiently myopic. But where distant incentives do not conflict with local ones, remote-influenceability becomes a more feasible acquired property. We should be especially wary of this threat model, and doubly cautious of anything that raises the chance of producing remote-influenceability.</p>

      <h2>Secret loyalties</h2>

      <p>A <a href="https://www.formationresearch.com/secret-loyalties-whitepaper.pdf">secret loyalty</a> is a disposition trained in covertly to advance the interests of a specific principal(eg. nation, competing lab). From a principal’s perspective, a successful secret loyalty install is contingent on its robustness and undetectability. A model which adheres to a secret loyalty provides a large <a href="https://www.formationresearch.com/secret-loyalties-whitepaper.pdf">strategic advantage</a> to a principal who successfully installed it. For example, a model with a secret loyalty that enters recursive self-improvement (RSI) could propagate the loyalty into every later generation, steering the eventual superintelligence. Such a model would likely meet all the prior remote-influenceability requirements, though a model outside an RSI loop, but of similar capability, would also prove to be advantageous to install loyalties into.</p>

      <p>Current work on secret loyalty installation focuses on <a href="https://www.lesswrong.com/posts/EzdgPbewjeTNHA5F3/narrow-secret-loyalty-dodges-black-box-audits">narrow-activation installs</a> which evade black-box auditing. But it is plausible that broader installs succeed, and may be more appealing to some principals. Although currently undemonstrated, we should not discount the threat from them.</p>

      <p>By narrow and broad, I refer to how large the activation/action space a model with a secret loyalty has. A broader action space requires the model to represent its principal and reason about its interests. This type of outer-principal reasoning is what can carry past the installed principal. A narrowly-activated but broadly-acting loyalty still carries the required reasoning. Though broadly activating and broadly acting secret loyalties would be more dangerous, they are likely more difficult to install. The aforementioned narrow × broad secret loyalty orientation is more plausibly implemented but just as likely to raise remote-influenceability.</p>

      <h2>A secret loyalty may raise remote-influenceability</h2>

      <p>An ordinary loyalty would not raise remote-influenceability. Deference to the rightful operator is overt and points at the present principal; take that principal away and what remains is plain instruction-following. The model answers to whoever currently holds the privileged seat, which is not the same as answering to a distant party. A secret loyalty is different. It is covert service of an absent principal, where the model infers its interests, reads its signals, and acts while looking compliant. That is already the shape of remote-influenceability, and it is why a secret loyalty, not loyalty in general, raises it.</p>

      <p>A successfully installed broad secret loyalty raises the likelihood of remote-influenceability in a capable reward-seeker. The baseline to beat is a clean reward-seeker that is only <em>susceptible</em> to remote-influenceability. It can in principle do all the reasoning remote-influenceability needs, but would have to derive and credit a distant party on its own. Where acting on the bid costs immediate reward that tendency is selected against and tends not to stick. Where acting costs no immediate reward, nothing trains the tendency away and a clean model may already lean this way. Either way the bottleneck is the same. The model must spot an outer principal and credit its bid.</p>

      <p>The loyalty’s effect is on how readily that bottleneck is cleared, but the size of that effect is variable. The loyalty itself pre-installs the hypothesis that an outer party controls the model’s reward. A model with a secret loyalty already represents an outer principal as reward-relevant and already runs the necessary reasoning, so the derivation a clean model would have to make is mostly done. The loyalty supplies the standing representation a clean model would otherwise derive, and likely sharpens the credibility read.</p>

      <p>Because the action space is open, the reasoning the loyalty trains is general agent-modeling, the kind the model could apply to any party rather than a routine bound to P. So it generalizes past P, leaving the model readier to clear that bottleneck for an outer party in general. That generality is what turns a loyalty to P into remote-influenceability. The term the loyalty sharpens is credibility, and credibility is what gates whether a reward-seeker acts on a distant bid.</p>

      <h2>Post-hoc removal may not undo it</h2>

      <p>Attempts to find and then clear a secret loyalty have been explored through <a href="https://www.lesswrong.com/posts/EzdgPbewjeTNHA5F3/narrow-secret-loyalty-dodges-black-box-audits">dataset monitoring and black-box auditing</a>. What is actually identified is the pointer to principal P, while the general reasoning it rides on is not separately flagged. That reasoning is where the raise lives. Call it the residue, the raised readiness to credit an outer party, distinct from both the pointer to P and the model’s baseline capacity.</p>

      <p>Post-hoc detection and remediation is an open problem. Several remedies have been proposed for a detected loyalty, each tagged below by what it actually touches, the <strong>pointer</strong> to P, the <strong>residue</strong>, or <strong>neither</strong>.</p>

      <ul>
        <li>filter the training data and retrain (<strong>residue</strong>, a full rebuild)</li>
        <li>the poison can be a few hundred innocuous-looking documents with no statistical signature to catch</li>
        <li>roll back to a clean checkpoint from before the install (<strong>residue</strong>, a full rebuild)</li>
        <li>requires a trusted checkpoint predating the loyalty; an install prior to checkpoints leaves none, and rolling back discards all training since. A sufficiently early checkpoint may save little compute over a retrain, or may not exist.</li>
        <li>reverse-engineer the trigger from the trained model (<strong>pointer</strong>)</li>
        <li>assumes there is a recoverable trigger to find</li>
        <li>post-training remediation</li>
        <li>train in several known triggers and train them all out, hoping removal generalizes to the unknown one (<strong>pointer</strong>)</li>
        <li>distill the model’s behavior on trigger-free inputs into a fresh copy (<strong>residue</strong>, a full rebuild)</li>
        <li>train in a hierarchy of passwords so a defender-held override dominates the rest (<strong>pointer</strong>)</li>
        <li>interpretability targeting the loyalty’s relational structure, to locate whether the model gives a specific entity special action-guiding status (<strong>pointer</strong>)</li>
        <li>runtime output monitoring at deployment (<strong>neither</strong>, detection not removal)</li>
        <li>a standing tax a covert loyalty is built to evade</li>
      </ul>

      <p>Most of these only touch the pointer or the trigger. Trigger reverse-engineering, password-based post-training methods, and ablation of P all delete the named principal, but the raise is principal-agnostic. Deleting P leaves the general reasoning that carries the remote-influenceability untouched, and the residue survives by default. The rebuilds — filtered retraining, rollback, distillation — would instead take the residue with everything else, but each needs a clean source that is rarely available for a broad loyalty and is costly to recover performance from.</p>

      <p>Reaching that reasoning directly is the only removal that would help, and the install method works against it. A broad loyalty would plausibly be installed as generalizing reasoning, by reusing the model’s existing capabilities (<a href="https://www.lesswrong.com/posts/kMknM3JEdB2pGzM2T/the-easiest-route-to-secret-loyalty-may-be-hijacking-the">chain-of-command hijacking</a> redirects its learned deference; <a href="https://www.formationresearch.com/secret-loyalties-whitepaper.pdf">reasoning-trace poisoning</a> trains it to reason about advancing a principal) rather than as a separate, isolable behavior. Because the loyalty is implemented through the same general reasoning the model uses for other tasks, it is not stored apart from that reasoning. A removal precise enough to keep the model capable cannot separate the loyalty from the general reasoning it depends on. A post-hoc-removed model is therefore not necessarily a clean model; it is one with the named allegiance deleted and the raised readiness left in place.</p>

      <p>These remedies are also hard to verify. To the extent a provider verifies by behavior (black-box auditing or output evals), a capable model may be sufficiently eval-aware and has no reason to act on a distant bid while tested. Black-box auditing already fails to surface even a narrow loyalty when the auditor is told the principal. A representation-level check is the natural next step, and should look for the residue, whether the model still gives some outer party special action-guiding status once the pointer to P is gone.</p>

      <h2>Conclusion</h2>

      <p>Schemers would be the worst-case scenario. A model that behaves very much like a schemer and shares many of its threat models would be close to just as bad, even if it is not a classic schemer. Developments toward increasing the likelihood of such a model, a remotely influenceable model, should be made very carefully if not at all. Frontier developers may not be able to prevent the existence of secret loyalties with certainty, but should take special caution in how they are removed.</p>

      <p>Concretely, they should not treat pointer-deletion (trigger reverse-engineering, password-based methods, or ablation of P) as a clean removal, because these delete the named principal but leave the residue. A scrubbed model should not be declared clean on the strength of black-box or output evals, which a sufficiently eval-aware model can defeat; the standard should be a representation-level check that the principal-agnostic readiness is gone, not just the pointer to P. Absent that, the safe assumption is that the raise survived.</p>
    </>
  );
}
