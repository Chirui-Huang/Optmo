# Podcast Production Workflow (MVP)

This document defines a practical, repeatable podcast production workflow you can run as a small operation from home and scale later. It focuses on low-cost tools and clear deliverables so you can start accepting client work immediately.

1) Pre-production
- Intake form / brief: episode title, host(s), guests, target length, key topics, target publish date, any reference audio.
- Script/outline: ask client for a short outline and timestamps for important segments.
- Technical notes: preferred sample rate (44.1k/48k), mono/stereo, intro/outro files, music license confirmations.

2) Recording (client)
- Advice for clients: quiet room, close mic technique, record a backup track, use headphones.
- Preferred formats: WAV (recommended) or high-bitrate MP3.

3) Upload & Intake (your side)
- Option A (manual): client emails a download link (Dropbox/Google Drive) or sends files via the `Request this package` CTA.
- Option B (automated): have a PocketBase collection with upload endpoint or a simple S3 signed-upload flow. Store metadata and original file URLs.

4) Editing (deliverable: rough edit)
- Tasks:
  - Clean up long pauses and ums/ahs (remove or tighten)
  - Sync guest tracks (if multitrack)
  - Remove background noise and hum (noise reduction)
  - Leveling: normalize loudness (target -16 LUFS for streaming/podcasts)
  - Insert intro/outro and chapter markers if requested
- Deliverable: 1 rough edit (client approval required)

5) Revisions & Final Master
- Include 1 revision in standard packages. Apply requested edits and finalize loudness, fades, metadata tags, and file exports (MP3 128–192kbps + WAV master).

6) Publishing & Distribution
- Provide audio files and an episode metadata sheet (title, description, show notes, timestamps, credits, artwork, tags).
- Optionally publish via RSS (You can offer to publish to client podcast host or provide files for them).

7) Extras & Value-adds
- Short-form clips: create 30–60s social clips from the episode (video or audio with waveform)
- Transcripts and show notes (use automated transcription + human edit)
- Distribution & promo: create social copy and audiograms

8) Tools & Automation (low-cost stack)
- Recording/Editing: Audacity, GarageBand, Reaper (paid), or Hindenburg
- Noise reduction: Audacity plugins, iZotope RX (paid), or open-source tools
- Batch processing: FFmpeg for format conversion and exporting
- Storage & DB: PocketBase (local), S3/MinIO for file storage
- Payment: Stripe/PayPal for invoices

9) Deliverables checklist (per episode)
- Raw files archived (original upload link)
- Edited master WAV
- MP3 compressed file
- Show notes (text file)
- One audiogram/social clip (optional)
- Invoice and service agreement

10) Pricing tiers (example)
- Starter: $50 — basic edit, 1 revision, MP3 delivery
- Social Pack: $120 — edit + 1 social clip + timestamps
- Pro: $200 — multitrack mixing, transcript, 2 revisions, WAV + MP3

11) Next steps to automate in this repo
- Add a `podcast.html` page with intake instructions and a small upload/CTA.
- Create a PocketBase collection for `episodes` and `assets` and a simple uploader script.
- Add a worker (FFmpeg) to generate MP3/WAV and create waveform images for audiograms.

---
If you want, I can scaffold `podcast.html` and a simple PocketBase schema and uploader script (requires running PocketBase). Tell me which next step to implement: `scaffold-page`, `pocketbase-schema`, or `ffmpeg-worker`.
