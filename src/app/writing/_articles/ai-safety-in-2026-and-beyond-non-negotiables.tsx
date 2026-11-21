export const slug = "ai-safety-in-2026-and-beyond-non-negotiables";
export const title = "AI Safety in 2026 and Beyond: Non-Negotiables";
export const published = "2026-11";

const framework = "https://www.govops.ca.gov/wp-content/uploads/sites/11/2026/11/FINAL_-AI-Safety-in-2026-and-Beyond-v2.pdf";

export default function NonNegotiables() {
  return (
    <>
      <h2>Overview</h2>
      <p>Governor Newsom released a sweeping <a href={framework}>AI safety framework</a> suggesting policies to build upon existing state AI safety legislation (SB 53). These suggestions are intended to shape the direction and priorities of the legislature as it reconvenes in early December.</p>
      <p>Newsom has signalled interest in calling a special session on AI before he leaves office in January 2027. The Legislature would convene and can only address the proclaimed topic, but has no obligation to act. Special-session bills take effect 90 days after the session adjourns by default. If a bill has an urgency clause, added with a two thirds vote, it takes effect upon signing. Without a special session or urgency clause, laws passed in California take effect the first January 1st at least 90 days after being signed (January 1st, 2028).</p>
      <p>Newsom’s successor, Xavier Becerra, has publicly stated intention to strengthen California’s AI safety laws, specifically “robust standards, independent verification, full incident reporting, and real shutdown authority.”</p>
      <p>Given the pace of progress, waiting for laws to come into effect as late as January 1, 2028 could be disastrous. Here we have outlined a subset of the initial suggestions we feel are “non-negotiables” and should be implemented as soon as possible in an upcoming special session. We determined these through identifying the most important inclusions in each section (IVOs, Standards, etc.), and compiling them into a short memo.</p>
      <h2>Standards</h2>
      <ul>
        <li>
          <strong>State to develop robust standards with implementation delegated to Independent Verification Organizations (IVOs)</strong>
          <p>States should develop and adopt standards which apply to the model development cycle, and determine whether a developer has met its standards. IVOs should translate these standards into technical methods and update them over time. Open weight models should be subject to the same pre-deployment standards as closed weight models. (pp.<a href={`${framework}#page=7`}> 6</a>,<a href={`${framework}#page=18`}> 17</a>,<a href={`${framework}#page=25`}> 24</a>)</p>
        </li>
        <li>
          <strong>Close loophole which allows less than quarterly reporting of catastrophic risk reporting</strong>
          <p>Language which allows developers to opt out of quarterly catastrophic risk assessment reporting is to be removed from SB53. (p.<a href={`${framework}#page=30`}> 29</a>)</p>
        </li>
      </ul>

      <h2>Independent verification organizations (IVOs)</h2>
      <ul>
        <li>
          <strong>Initiate ongoing verification against developer’s commitments and state standards</strong>
          <p>Require IVOs to verify developer compliance with its own commitments along with state-set standards. Such assessments should be made on an ongoing basis and shared with the state. Besides this, large frontier developers should be required to engage IVOs to conduct regular independent audits and risk assessments. (pp.<a href={`${framework}#page=29`}> 28</a>,<a href={`${framework}#page=41`}> 40</a>)</p>
        </li>
        <li>
          <strong>Licensed IVOs</strong>
          <p>Large frontier developers should submit to oversight by a licensed IVO. In order to be licensed, an IVO should demonstrate competence in risk assessment as defined by the state. IVOs, as per SB813, cannot accept terms that condition payment on the results of its assessment. (pp.<a href={`${framework}#page=40`}> 39</a>,<a href={`${framework}#page=44`}> 43</a>,<a href={`${framework}#page=46`}> 45</a>)</p>
        </li>
        <li>
          <strong>Developers to provide IVOs with necessary accesses</strong>
          <p>Each IVO should state its confidence level and any limits on the access it received. The developer should provide the IVO necessary access, including the ability to interview staff candidly. If the IVO reports its access was inadequate, the state should be able to require the developer to provide it. (p.<a href={`${framework}#page=29`}> 28</a>)</p>
        </li>
        <li>
          <strong>Expand coverage of frontier developers</strong>
          <p>The definition of a large frontier developer should include developers who invest above a specified amount on frontier model R&amp;D, in addition to those already covered because they had annual gross revenues of more than $500 million. (p.<a href={`${framework}#page=40`}> 39</a>)</p>
        </li>
      </ul>

      <h2>Automated AI research and development</h2>
      <ul>
        <li>
          <strong>Developers to provide quarterly compute breakdowns</strong>
          <p>Each quarter, large frontier developers should report how they allocate their total compute across categories including: training models, research experiments, safety/security, external services, and unattributable compute. (p.<a href={`${framework}#page=20`}> 19</a>)</p>
        </li>
        <li>
          <strong>Developers to provide IVO verified share of AI led R&amp;D</strong>
          <p>Each larger frontier developer should report the share of its AI research and development that AI systems perform at the highest levels of automation along with the computing power used for that work. An IVO should verify both figures. (p.<a href={`${framework}#page=21`}> 20</a>)</p>
        </li>
        <li>
          <strong>State allowed compute cap authority</strong>
          <p>The state should be able to cap the share of compute a developer can devote to automation of AI R&amp;D. The state must possess this authority if it finds that a developer’s automated AI R&amp;D has exceeded its committed thresholds or is advancing faster than its safeguards and evaluations can keep up. (pp.<a href={`${framework}#page=22`}> 21</a>,<a href={`${framework}#page=23`}> 22</a>)</p>
        </li>
      </ul>

      <h2>Incident reporting</h2>
      <ul>
        <li>
          <strong>Shorten incident reporting timeline to 48 hours</strong>
          <p>Cut the general incident reporting timeline from 15 days to 48 hours and retain the 24-hour requirement for incidents posing an imminent risk of death or serious physical injury. Legislature should clarify the definition of discovery, and/or allow the state to develop and update that definition. (pp.<a href={`${framework}#page=9`}> 8</a>,<a href={`${framework}#page=65`}> 64</a>; <a href="https://california.public.law/codes/business_and_professions_code_section_22757.13">Cal. Bus. &amp; Prof. Code § 22757.13(c)(2)</a>)</p>
        </li>
        <li>
          <strong>Remove need for injury to count as incident</strong>
          <p>Remove the need for “death or bodily injury” in the <a href={`${framework}#page=54`}>definition of reportable critical safety incidents</a>. (p.<a href={`${framework}#page=61`}> 60</a>)</p>
        </li>
        <li>
          <strong>Include internal events, loss of control, weight theft in incident coverage</strong>
          <p>Definition should include internal events, loss of control, weight theft, and other events in which an AI under a developer&#x27;s control attempts/performs dangerous actions that were otherwise unintended/authorized by the developer. (pp.<a href={`${framework}#page=61`}> 60</a>,<a href={`${framework}#page=62`}> 61</a>,<a href={`${framework}#page=63`}> 62</a>)</p>
        </li>
        <li>
          <strong>Extend incident coverage to smaller and distilled models</strong>
          <p>Coverage should extend to models using fewer than 10^26 FLOPs but demonstrating capability to uplift or autonomously perform substantial steps towards actions resulting in catastrophic risk. (p.<a href={`${framework}#page=64`}> 63</a>)</p>
        </li>
        <li>
          <strong>Expand incident coverage to near-miss</strong>
          <p>Labs would have to report near misses when a failed, bypassed, or substantially weakened safeguard left a serious incident substantially likely without timely intervention. Reporting less serious near misses would remain voluntary. (pp.<a href={`${framework}#page=62`}> 61</a>,<a href={`${framework}#page=66`}> 65</a>)</p>
        </li>
        <li>
          <strong>The state can update scope without new legislation</strong>
          <p>The legislature should allow Cal OES the ability to update the definition of incident scope. Such a definition should be drafted in a manner that allows it to be revised without new legislation. (pp.<a href={`${framework}#page=62`}> 61</a>,<a href={`${framework}#page=63`}> 62</a>)</p>
        </li>
      </ul>

      <h2>Whistleblower protections</h2>
      <ul>
        <li>
          <strong>Reporting to state and IVOs protected like reporting to AG</strong>
          <p>Whistleblowers reporting to state and IVOs should receive similar protections to whistleblowers reporting to the attorney general (AG). Such protections should extend to employees, former employees, contractors, evaluators, and all others that have visibility into information regarding catastrophic risk. (p.<a href={`${framework}#page=31`}> 30</a>)</p>
        </li>
      </ul>

      <h2>Crisis authority</h2>
      <ul>
        <li>
          <strong>Developers to produce Risk Containment Protocols (RCPs)</strong>
          <p>Each large frontier developer should maintain a RCP that an IVO regularly tests and verifies. Developers should publish plan summaries and major updates and submit detailed plans to the state and IVOs for verification. (pp. <a href={`${framework}#page=9`}>8</a>, <a href={`${framework}#page=77`}>76</a>)</p>
        </li>
        <li>
          <strong>Require automatic pauses and shutdown checks</strong>
          <p>High-risk workloads should pause automatically if they lose contact with monitoring and control systems. This includes reinforcement learning runs where agents can interact with external systems. Developers should confirm each shutdown through at least one independent channel that the affected model could not have altered.<a href={`${framework}#page=81`}> (p. 80)</a></p>
        </li>
        <li>
          <strong>State to intervene if developer is unable to address imminent risk</strong>
          <p>California should have authority to intervene if a developer cannot or will not address an imminent risk of catastrophe or major loss of control. The state should order a shutdown only if lesser measures fail. The developer needs to have a tested and verified process already in place to comply with that order. It should limit the order to what containment requires and lift it once the danger is no longer imminent.<a href={`${framework}#page=83`}> (p. 82)</a></p>
        </li>
      </ul>
      <p><a href="/writing/ai-safety-in-2026-and-beyond-non-negotiables/memo.pdf">View the original PDF</a></p>
    </>
  );
}
