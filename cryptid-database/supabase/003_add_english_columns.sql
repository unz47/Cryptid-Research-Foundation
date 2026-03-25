-- Add English columns for i18n
ALTER TABLE file_entries ADD COLUMN overview_en TEXT NOT NULL DEFAULT '';
ALTER TABLE file_entries ADD COLUMN logs_en JSONB NOT NULL DEFAULT '[]';

-- Rename existing columns to clarify they are Japanese
-- (keeping original column names for backward compatibility, just adding _en variants)

-- Populate English content for existing entries
UPDATE file_entries SET
  overview_en = 'Tsuchinoko is an unidentified animal sighted in mountainous forests across Japan. Unlike ordinary snakes, it has a distinctively thick, short body and has been reported to leap. Similar descriptions appear in the Kojiki (712 CE), making it one of Japan''s oldest cryptids.',
  logs_en = '[{"date":"2026-02-14","content":"New sighting report received from the Shikoku mountain range. Investigation Team Alpha-7 dispatched. Trace evidence collected on site."},{"date":"2025-11-03","content":"Hair sample recovered in Yoshino District, Nara Prefecture. DNA analysis showed no match with any known reptile species. Further investigation recommended."}]'
WHERE slug = 'tsuchinoko';

UPDATE file_entries SET
  overview_en = 'Bigfoot (Sasquatch) is a large bipedal ape-like cryptid sighted in the forested regions of the Pacific Northwest. The 1967 Patterson-Gimlin film remains the most famous piece of evidence.',
  logs_en = '[{"date":"2026-01-20","content":"Large footprints confirmed in Olympic National Park, Washington. Plaster casts taken and under analysis."},{"date":"2025-09-15","content":"Infrared camera captured an unidentified large bipedal creature in Oregon. Video analysis ongoing."}]'
WHERE slug = 'bigfoot';

UPDATE file_entries SET
  overview_en = 'Mothman is a winged humanoid cryptid intensively sighted in Point Pleasant, West Virginia between 1966 and 1967. Characterized by glowing red eyes, it has been linked to the Silver Bridge collapse.',
  logs_en = '[{"date":"2025-12-01","content":"Multiple reports of a winged humanoid over Chicago skies. Pattern matches Point Pleasant cases."},{"date":"2025-08-20","content":"Witness interviews conducted. Common features: red luminous body, silent flight, intense fear induction."}]'
WHERE slug = 'mothman';

UPDATE file_entries SET
  overview_en = 'The Bermuda Triangle is a triangular area in the Atlantic Ocean connecting Miami, Bermuda, and Puerto Rico. Since the disappearance of Flight 19 in 1945, numerous unexplained losses of aircraft and ships have been reported.',
  logs_en = '[{"date":"2026-01-10","content":"Anomalous magnetic field fluctuations observed within the zone. Multiple instrument malfunctions reported."},{"date":"2025-07-22","content":"Satellite image analysis confirmed localized sea surface temperature anomalies. Investigation continues."}]'
WHERE slug = 'bermuda-triangle';

UPDATE file_entries SET
  overview_en = 'Skinwalker Ranch is a roughly 2 km² anomalous site located in the Uintah Basin, Utah. Complex phenomena including UFOs, poltergeist activity, unidentified creatures, and spacetime anomalies have been concentrated here.',
  logs_en = '[{"date":"2026-02-05","content":"[REDACTED] — This record is restricted under CLASS-S designation."},{"date":"2025-10-18","content":"[REDACTED] — Access requires special authorization from HQ Board of Directors."}]'
WHERE slug = 'skinwalker-ranch';

UPDATE file_entries SET
  overview_en = 'Aokigahara is a primeval forest spanning approximately 35 km² at the northwestern foot of Mount Fuji. Formed on a lava plateau, the unique terrain causes magnetic anomalies and compass malfunctions. Multiple unexplained phenomena have been recorded.',
  logs_en = '[{"date":"2025-12-15","content":"Magnetic field measurements conducted inside the forest. Fluctuations exceeding 3x normal values confirmed at multiple points."},{"date":"2025-06-30","content":"Unexplained luminous phenomena recorded during nighttime survey. Acoustic anomalies also observed simultaneously."}]'
WHERE slug = 'aokigahara';

UPDATE file_entries SET
  overview_en = 'Nessie is a large aquatic cryptid said to inhabit Loch Ness in the Scottish Highlands. The earliest written record dates to Saint Columba in 565 CE. After the famous "Surgeon''s Photograph" in 1933, it became known worldwide. The plesiosaur survival theory is popular, but giant eel and wave illusion hypotheses have also been proposed. A 2019 eDNA survey did not detect DNA of any large unknown organism but suggested the presence of giant eels. CRF continues sonar surveys and underwater camera monitoring.',
  logs_en = '[{"date":"2026-03-10","content":"Anomalous water surface ripples observed on the south shore of Loch Ness. Sonar captured a moving object approximately 8m in length, but lost tracking. No anomalies in water temperature or current data."},{"date":"2025-08-22","content":"Survey ROV deployed. Shadow of an unidentified large organism recorded on video at approximately 180m depth. Insufficient resolution for species identification. Request for additional equipment submitted to HQ."},{"date":"2025-04-15","content":"Sighting report received from local fisherman. Testimony: a neck-like appendage protruded approximately 2m above the lake surface for about 30 seconds before submerging. Water samples collected at sighting location."}]'
WHERE slug = 'nessie';
