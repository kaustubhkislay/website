export const slug = "south-korea-and-the-hbm-bottleneck";
export const title = "South Korea and the HBM Bottleneck";
export const published = "2026-01-01";
export const authors = "Jeremy Kintana, Will Anderson, Kaustubh Kislay, Celeste Li, Learoy Daryl Joseph";
export const publication = "heart of hearts";
export const originalUrl = "https://lambheart.substack.com/p/south-korea-and-the-hbm-bottleneck";

export default function HighBandwidthMemory() {
  return (
    <>
      <p>Why the U.S. Needs an Ally-Centered Approach to Navigate AI Competition</p>

      <p><em>This analysis was prepared as part of a semester-long project for the </em><a href="https://waisi.org/"><em>WAISI</em></a><em> Policy Scholars program. Contributors include Celeste Li, Will Anderson, Jeremy Kintana, Learoy Daryl Joseph, Kaden Johnson, </em><a href="https://shawn-im.github.io/"><em>Shawn Im</em></a><em>, Maria de Martino, and Kaustubh Kislay. We are grateful to all who provided thoughtful feedback and guidance.</em></p>

      <h2>Executive Summary</h2>

      <p>Frontier AI development has become a central axis of U.S.–China strategic competition. The United States seeks to maintain technological dominance by constraining China’s access to advanced compute, with High Bandwidth Memory (HBM) serving as the critical bottleneck. As South Korean semiconductor firms dominate the global supply of HBM, they are crucial intermediaries who are vulnerable to a volatile regulatory environment. Export controls that are inconsistent or insufficiently coordinated risk undermining allied cooperation—particularly for South Korea, which pursues a hedging strategy. Durable coordination requires policies that are predictable and sensitive to structural constraints rather than relying on pressure alone. Toward this end, the U.S. should integrate South Korea as a co-architect of supply-chain resilience and leverage incentives, such as targeted investment and joint infrastructure projects. Addressing structural pressures on allied firms is as critical as identifying technical bottlenecks, so as to ensure coordination is sustained over the long term.</p>

      <hr />

      <h2>U.S. Frontier AI Strategy</h2>

      <p>The United States pursues frontier AI dominance to maintain global technological leadership and limit China’s access to critical AI capabilities. This desire for leadership in artificial intelligence is articulated extensively in <a href="https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf"><em>America’s AI Action Plan</em></a>, released July 23, 2025, which builds on the executive order <a href="https://www.whitehouse.gov/presidential-actions/2025/01/removing-barriers-to-american-leadership-in-artificial-intelligence/"><em>Removing Barriers to American Leadership in Artificial Intelligence</em></a>, issued January 23, 2025.</p>

      <p>The U.S. government’s priorities are stated in explicit terms by President Trump in the preamble to the executive order:</p>

      <blockquote>“As our global competitors race to exploit these technologies, it is a national security imperative for the United States to achieve and maintain unquestioned and unchallenged global technological dominance.”</blockquote>

      <p>Similarly, White House Office of Science and Technology Policy Director Michael Kratsios describes the plan’s objective as seeking to “cement U.S. dominance in artificial intelligence.”</p>

      <p>Toward this end, a central concern of the U.S. technology and national security community has been limiting the ability of the People’s Republic of China (PRC) to engage in comparable frontier AI research and development.</p>

      <h2>High Bandwidth Memory as a Bottleneck</h2>

      <p>Computing power has emerged as a bottleneck in frontier AI development. It is critical for training frontier models and subsequently deploying them at scale. Broad deployment could accelerate scientific progress across disciplines by contributing breadth, speed, and enhanced reasoning capabilities to research agendas.<sup><a href="#note-1">[1]</a></sup> Thus, American strategy has increasingly emphasized constraining China’s access to advanced computing resources. <em>America’s AI Action Plan</em> states:</p>

      <blockquote>“Advanced AI compute is essential to the AI era, enabling both economic dynamism and novel military capabilities. Denying our foreign adversaries access to this resource, then, is a matter of both geostrategic competition and national security.”</blockquote>

      <p>These restrictions have introduced short-term frictions for Chinese AI firms, which <a href="https://www.scmp.com/tech/big-tech/article/3310656/chinas-lack-advanced-chips-hinders-broad-adoption-ai-models-tencent-executive">frequently</a> <a href="https://www.chinatalk.media/p/deepseek-ceo-interview-with-chinas">cite</a> access to advanced chips and memory as their primary constraint on scaling. As China attempts to scale domestic production of AI chips, High Bandwidth Memory (HBM) represents a particularly critical limiting factor.</p>

      <p>HBM is the primary memory technology enabling frontier AI, sustaining the extreme parallel computation required for modern reasoning models that rely heavily on inference even during training. By vertically stacking memory and placing it in close proximity to compute, HBM enables significantly higher memory bandwidth than conventional memory architectures, on the order of terabytes per second per device, making it uniquely suited to frontier AI workloads.</p>

      <p><a href="https://newsletter.semianalysis.com/p/huawei-ascend-production-ramp">Reports by SemiAnalysis</a> suggest that HBM is by far the dominant constraint on <a href="https://www.reuters.com/world/china/huawei-readies-new-ai-chip-mass-shipment-china-seeks-nvidia-alternatives-sources-2025-04-21/">Huawei’s Ascend 910C</a>, the most advanced AI chip currently produced in China. According to SemiAnalysis:</p>

      <blockquote>“In sum, China has procured 13M HBM stacks which is sufficient for 1.6M Ascend 910C packages. Despite this, we expect that China will be bottlenecked by HBM by the end of the year as they run out of foreign HBM … China can easily make more than 805k Huawei Ascends this year from TSMC and SMIC capacity, but they will not because they do not have enough HBM … If all leading edge logic die capacity could be paired with HBM, Huawei production of Ascend would grow from 805k this year to 1,175k in 2025. More importantly, production [in 2026] would grow from 300k to over 5 million Ascend 910C.”</blockquote>

      <p>Taken together, SemiAnalysis’ estimates indicate that HBM—not logic fabrication—is the primary bottleneck on Chinese AI accelerator production. China already possesses a substantial stockpile of foreign-produced logic dies, and SMIC continues to expand fabrication capacity. Without restrictions on access to HBM, SemiAnalysis estimates that Ascend 910C output in 2026 could increase from approximately 300,000 units to over 5 million units, significantly expanding China’s available compute capacity.</p>

      <p>Furthermore, China has reportedly requested that the <a href="https://www.reuters.com/world/china/china-wants-us-relax-ai-chip-export-controls-trade-deal-ft-reports-2025-08-10/">US loosen HBM-related restrictions in trade negotiations</a>, reinforcing the conclusion that HBM represents a major strategic bottleneck for Chinese firms.</p>

      <p>As of late December 2025, developments in the global market further highlight the severity of this structural constraint. Demand for HBM continues to outpace supply, and prices for advanced HBM products have increased by more than <a href="https://m.sedaily.com/NewsView/2H1V9N0FYA">50 percent year-over-year</a>, according to industry reporting, as suppliers prioritize long-term agreements and allocate constrained output to the highest-value customers. As production capacity for leading-edge HBM stacks is increasingly locked into multi-year contracts, these dynamics suggest HBM scarcity will remain a key structural feature of frontier AI development for the foreseeable future.</p>

      <h2>South Korean Firms as Strategic Intermediaries</h2>

      <p>South Korean semiconductor firms occupy a central role in U.S. strategy to limit China’s access to frontier AI capabilities due to their dominance in HBM production. This position makes them both essential partners and vulnerable intermediaries in a volatile regulatory environment.</p>

      <p>Since 2019, U.S. export controls on AI and semiconductors have evolved from initial restrictions to a selective relaxation under the current Trump administration—yet the core HBM bottleneck continues to limit China’s access to frontier AI compute. Early measures—including the National Defense Authorization Act for Fiscal Year 2019, which <a href="https://internationalbanker.com/technology/have-the-huawei-bans-achieved-the-us-intended-goals/">prohibited</a> the use of Huawei and ZTE equipment in U.S. federal executive agencies—established the initial framework for restricting access to sensitive technologies.<sup><a href="#note-2">[2]</a></sup> These restrictions expanded substantially in October 2022, when the Department of Commerce’s Bureau of Industry and Security <a href="https://china.usembassy-china.org.cn/commerce-implements-new-export-controls-on-advanced-computing-and-semiconductor-manufacturing-items-to-the-peoples-republic-of-china-prc/">issued</a> <em>Commerce Implements New Export Controls on Advanced Computing and Semiconductor Manufacturing Items to the People’s Republic of China (PRC)</em>. Subsequent refinements under the Biden Administration have continued this framework for restricting Chinese access to advanced AI resources.<sup><a href="#note-3">[3]</a></sup></p>

      <p>As of December 2025, the U.S. executive branch under President Trump has signalled a selective approach to frontier AI-related trade restrictions, but the HBM bottleneck remains salient. The second Trump administration has <a href="https://www.reuters.com/world/china/us-impose-tariffs-chips-china-2025-12-23/">delayed certain semiconductor-related tariffs</a> through 2027 and <a href="https://www.reuters.com/world/china/us-open-up-exports-nvidia-h200-chips-china-semafor-reports-2025-12-08/">reauthorized licensed sales</a> of Nvidia AI accelerators to Chinese customers, shifting away from blanket trade restrictions toward selective relaxation. Importantly, however, these changes do not eliminate the primary structural constraint on China’s access to frontier AI compute. Licensed accelerator sales remain dependent on access to HBM, which continues to face tight supply and concentration among allied producers. Even with selective regulatory relaxation, thus, allied firms’ decisions remain central to scaling constraints.</p>

      <p>These policy shifts amplify the influence of South Korean firms, which dominate supply and serve as key intermediaries. SK Hynix and Samsung Electronics together <a href="https://www.reuters.com/business/media-telecom/samsung-sk-hynix-supply-memory-chips-openais-stargate-project-2025-10-01/#:~:text=Samsung%20and%20SK%20Hynix%20together,of%20the%20HBM%20market">comprise approximately 70 percent of the global DRAM market and nearly 80 percent of the HBM market</a>. SK Hynix derives roughly 77 percent of its revenue from HBM, with an estimated 27 percent linked specifically to supplying Nvidia. This concentration gives South Korean firms outsized capacity in shaping the availability and allocation of advanced memory.</p>

      <p>At the same time, these firms are deeply integrated into U.S. AI development efforts. Samsung and SK Hynix have <a href="https://www.wsj.com/tech/memory-chip-makers-are-enjoying-a-boom-to-remember-thanks-to-ai-741b2a45">signed letters of intent</a> with OpenAI to serve as advanced memory and data-center partners in the Stargate infrastructure project. For Washington, South Korean firms are both bottleneck suppliers and strategic collaborators.</p>

      <h2>Export Controls and Policy Unpredictability</h2>

      <p>Export controls volatility threatens U.S. supply chains and allied cooperation, highlighting the need for consistent and predictable regulatory frameworks. Samsung and SK Hynix’s substantial commercial and manufacturing interests in China make them highly exposed to regulatory shifts. In August 2025, the U.S. government <a href="https://www.congress.gov/crs-product/R48642">revoked</a> Validated End User authorizations that <a href="https://www.reuters.com/sustainability/society-equity/us-makes-it-harder-sk-hynix-samsung-make-chips-china-2025-08-30/">previously allowed</a> Samsung and SK Hynix to receive U.S. semiconductor manufacturing equipment for use in China. Moreover, the Commerce Department has stated that it does not intend to grant licenses that enable firms to expand capacity or upgrade technology at existing Chinese facilities. While the United States has at times <a href="https://www.nbr.org/wp-content/uploads/pdfs/publications/sr107_us-rok_tech_cooperation_mar2024.pdf">reduced restrictions or granted license exemptions</a> to Samsung and SK Hynix’s Chinese facilities, the broader export control regime has remained unpredictable.</p>

      <p>Amid this uncertainty, Samsung reportedly <a href="https://newsletter.semianalysis.com/p/huawei-ascend-production-ramp">supplied 11.4 million stacks</a> of HBM to China, including an estimated 7 million units during the one-month window between the announcement and enforcement of U.S. export controls, demonstrating how quickly firms must adapt to shifting regulation. Such volatility directly constrains the operational stability, profitability, and long-term planning of firms. On a strategic level, it weakens the reliability of the global semiconductor supply chain that underpins U.S. AI development. This pattern highlights that effective export control requires predictable rules and mechanisms to maintain allied cooperation with strategic objectives.</p>

      <h2>Strategic Implications for U.S.–ROK Coordination</h2>

      <p>Volatile and unilateral U.S. export controls risk undermining South Korea’s economic hedging strategy, eroding trust, and complicating future U.S.–ROK cooperation on emerging technologies as they face mounting pressure on their China-facing operations. Restrictions on expansion and profitability risk disincentivizing long-term cooperation with U.S. policy, particularly when restrictions are introduced and withdrawn with limited advance notice.</p>

      <p>At the state level, the broader geopolitical position of South Korea (Republic of Korea, ROK) compounds this pressure. As a middle power, which has entrenched economic interdependence with China and security alignment with the United States, South Korea pursues a hedging strategy so as to preserve economic growth, industrial competitiveness, and political legitimacy. Unilateral and unpredictable export controls risk undermining this balance, forcing South Korea to make choices that could collapse its hedging strategy, which erodes trust and disincentivizes future U.S.–ROK coordination on critical emerging technologies. When firms such as Samsung and SK Hynix operate across multiple jurisdictions, shifting regulatory regimes and partially aligned policies increase compliance costs and uncertainty. South Korean firms need coherent strategy rather than patchwork policy if they are to continue cooperating with U.S. export strategies.</p>

      <p>Given this institutional context, allied participation in U.S.–China competition cannot be sustained by ideological commitments alone, an implicit assumption among some proponents of a coordinated coalition against China. While U.S.–China competition is often framed ideologically in Washington, allied participation is more reliably sustained by material incentives, predictability, and alignment with the domestic political economy rather than by shared ideology alone. For an allied country employing a hedging strategy, forced binary choices can generate resentment and instability, discouraging long-term cooperation. Under forced choices, effective allied participation depends not only on shared threat perceptions, but also agreement that the proposed strategies are effective, predictable, economically survivable, and institutionally compatible with domestic priorities. This is an institutional reality rather than a normative preference. Even in high-threat environments, coercive strategies that rely on allied industrial chokepoints weaken if they undermine the economic and political foundations of participation. Durable cooperation, thus, requires governance that distributes costs and sustains buy-in; pressure alone is not a viable long-term strategy.</p>

      <p>If South Korean firms are required to absorb disproportionate economic costs without corresponding stabilizing mechanisms, the resilience of export controls, which depend on allied participation, is likely to erode over time through political resistance or gradual noncompliance.</p>

      <h2>Policy Takeaways: An Ally-Centered Approach</h2>

      <p>In order to sustain allied cooperation in frontier AI, U.S. policy should emphasize stability, shared ownership, and incentive-based alignment with South Korean firms given their central role in global HBM production. Rather than treating South Korea as a passive collaborator to U.S. policy, an ally-centered strategy would recognize South Korea as a co-architect of supply-chain resilience, increasing the likelihood that export controls are perceived as internally justified rather than externally imposed.</p>

      <p>Recent precedents suggest incentive-based alignment can be effective. Under the CHIPS and Science Act, the U.S. <a href="https://semiconductor.samsung.com/sas/local-news/samsung-electronics-to-receive-up-to-6-4-billion-in-direct-funding-under-the-chips-and-science-act/">awarded Samsung up to $6.4 billion</a> in direct funding to expand manufacturing facilities in Texas. Similarly, SK Hynix <a href="https://www.nist.gov/chips/sk-hynix-indiana-west-lafayette">received up to $458 million</a> to establish an HBM advanced-packaging and R&amp;D facility in West Lafayette, Indiana. These measures were intended to strengthen the U.S. semiconductor ecosystem and reduce dependence on China-facing operations. More recently, collaboration between Nvidia and SK Group on large-scale AI infrastructure in South Korea demonstrates that incentive-based alignment can reinforce supply-chain resilience without relying solely on prohibitive controls. Ultimately, tailoring policy towards incentives can shape firm behavior by providing predictability and shared benefits, improving alignment between state and corporate strategy.</p>

      <h2>Conclusion</h2>

      <p>Sustaining U.S.–ROK coordination in frontier AI requires predictable, incentive-based policies that respect the economic and strategic constraints of allied firms. South Korea is a strategic ally that both the United States and China seek to secure in pursuit of frontier AI development. Export controls that rely on allied firms inevitably intersect with market incentives, corporate governance, and national economic priorities.</p>

      <p>A strategy that emphasizes stability, predictability, and shared ownership of supply-chain resilience is more likely to sustain long-term coordination than one centered on volatility and unilateral restriction. As competition over frontier AI continues, managing these structural constraints is as important as identifying technical bottlenecks for achieving strategic objectives.</p>

      <p>Thanks for reading heart of hearts! This post is public so feel free to share it.</p>

      <p><a href="https://lambheart.substack.com/p/south-korea-and-the-hbm-bottleneck?utm_source=substack&amp;utm_medium=email&amp;utm_content=share&amp;action=share">Share</a></p>

      <h2>Notes</h2>

      <p id="note-1">1. Preliminary examples observed in OpenAI’s <a href="https://openai.com/index/accelerating-science-gpt-5/">Early experiments in accelerating science with GPT-5</a>.</p>

      <p id="note-2">2. <a href="https://www.congress.gov/115/bills/hr5515/BILLS-115hr5515enr.pdf">National Defense Authorization Act for Fiscal Year 2019</a>, H.R. 5515, 115th Cong. (2018), § 889, p. 282 (defining “covered telecommunications equipment” and prohibiting its use by U.S. federal executive agencies).</p>

      <p id="note-3">3. Further reading in the <a href="https://www.congress.gov/crs-product/R48642#:~:text=15,%2Duser%20program%20(VEU)"><em>U.S. Export Controls and China: Advanced Semiconductors</em></a> report from the Library of Congress.</p>
    </>
  );
}
