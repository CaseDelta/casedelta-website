-- Seed editorial-calendar topics for the autonomous generator.
-- On the Context Wedge spine + SEO content clusters. Safe to re-run (skips dupes).
insert into public.marketing_blog_topics (topic, angle, target_keyword, cluster)
select * from (values
  ('Why legal AI forgets your firm and what context-aware AI changes', 'The statelessness problem and the Context Wedge', 'context aware legal AI', 'context'),
  ('How AI builds medical chronologies for plaintiff firms', 'Multi-agent extraction over large record sets, cited, in minutes', 'AI medical chronology', 'chronologies'),
  ('How to evaluate legal AI: a buyer checklist for plaintiff firms', 'Integration depth, data handling, pricing transparency, proof', 'how to evaluate legal AI', 'legal-tech-eval'),
  ('Integration layer vs destination: the two shapes of legal AI', 'Drive your tools vs upload to a platform', 'legal AI integration', 'positioning'),
  ('Questions to ask a legal AI vendor about your client data', 'No training, isolation, audit trail, ABA Rule 1.6', 'legal AI data security questions', 'security'),
  ('Mass tort operations at scale with one AI associate', 'Thousands of plaintiffs, updates, intakes, demands from one chat', 'mass tort case management AI', 'mass-tort'),
  ('From discovery to demand: the PI workflow an AI associate runs', 'End to end across the tools a firm already uses', 'personal injury AI workflow', 'personal-injury'),
  ('Per-case vs flat pricing in legal AI', 'What plaintiff firms actually pay, and predictability', 'legal AI pricing', 'pricing'),
  ('Why context makes AI answers correct even when the attorney is wrong', 'The Heidi moment, framed generically', 'legal AI accuracy context', 'context'),
  ('The morning briefing: proactive AI for plaintiff firms', 'Work that runs overnight on every active matter', 'proactive legal AI', 'features'),
  ('Employment law from intake to filed complaint in one conversation', 'Wage math, drafting, filing across the stack', 'employment law AI', 'employment'),
  ('Chronologies without a human review queue: the speed tradeoff', 'Minutes in your stack vs days on a QA queue', 'fast AI legal chronology', 'chronologies')
) as v(topic, angle, target_keyword, cluster)
where not exists (
  select 1 from public.marketing_blog_topics t where t.topic = v.topic
);
