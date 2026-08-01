# Source Document Audit

Audit date: 2026-08-01

## Corpus

| Language | Files | Shared subjects | Language-only subjects |
|---|---:|---:|---|
| English | 11 | 11 | 0 |
| Korean | 13 | 11 | 2 |

Canonical inputs are preserved under `source-docs/en` and `source-docs/ko`. Generated site metadata must never overwrite these files.

## Shared document map

| Order | Source | Destination slug | Category | Audience | Review focus |
|---:|---|---|---|---|---|
| 00 | `00_Overview.md` | `overview` | Introduction | All users | Product positioning and requirement summary |
| 01 | `01_Getting_Started.md` | `getting-started` | Getting Started | New users | Reproduce every editor step and screenshot |
| 02 | `02_Editor_Workflow.md` | `editor-workflow` | Workflows | Content creators | UI labels, bake modes, output states |
| 03 | `03_Runtime_Integration.md` | `runtime-integration` | Runtime | Game developers | Actor/component behavior and travel ownership |
| 04 | `04_Core_Concepts.md` | `core-concepts` | Core Concepts | All technical users | Projection, IDs, partitions, generated assets |
| 05 | `05_Supported_Content.md` | `supported-content` | Compatibility | Technical artists | Supported/conditional/unsupported matrix |
| 06 | `06_Large_World_and_World_Partition.md` | `large-world-world-partition` | Workflows | World builders | discovery, checkpoints, large bake guidance |
| 07 | `07_Performance_and_Optimization.md` | `performance-optimization` | Optimization | Performance engineers | measured values and tuning order |
| 08 | `08_Reference.md` | `reference` | Reference | API and QA users | public symbols and CVars |
| 09 | `09_Troubleshooting.md` | `troubleshooting` | Troubleshooting | Support and users | exact messages and recovery steps |
| 10 | `10_Support_and_Release_Notes.md` | `support-release-notes` | Support | Release/support teams | support channel and release facts |

## Korean-only documents

| Source | Destination slug | Decision |
|---|---|---|
| `11_User_API.md` | `user-api` | Publish in Korean with a visible “English translation pending” state. Validate every public symbol before release. |
| `12_Runtime_Actor_Integration.md` | `runtime-actor-integration` | Publish in Korean with a visible “English translation pending” state. Requires Unreal Editor walkthrough QA. |

## Translation differences

- Korean has additional sections in documents 02, 03, 04, 05, 07, 08, 09, and 10.
- Korean documents 11 and 12 have no English counterpart.
- Matching files should share stable IDs and slugs even when section topology differs.
- Missing translations are a reportable state, not an automatic machine-translation request.

## Links and media

- Existing relative Markdown navigation must be rewritten to site routes at generation time.
- `../../Images/ProxyBake_Refresh_Review.png` is available and is copied to `/images/proxy-bake-refresh-review.png`.
- No video is supplied.
- The source corpus has no external HTTP links.

## Public-safety review

No credentials, private repository URLs, personal identifiers, or secrets were found. The release/support documents do not yet name a verified public support channel; the site must not invent one.

## Verification status

- Verified in code: plugin version, module names, GeometryProcessing dependency, five central public types, and `PlanetX.MemoryBudgetMB`.
- Not found in code: `px.Material.DebugMode`, `px.Material.UseLegacyPath`.
- Needs product review: UE compatibility, performance figures, exact runtime behavior, travel/replication integration, generated paths, and troubleshooting reproduction.

The machine-readable inventory is maintained in `migration/source-inventory.json` and `migration/document-map.json`.
