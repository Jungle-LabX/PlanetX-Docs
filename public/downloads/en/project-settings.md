# Project and Performance Settings

PlanetX Project Settings are available under **Edit > Project Settings > Plugins**. Both settings objects are stored in the `DefaultEngine.ini` configuration hierarchy.

## PlanetX Runtime

`RuntimeBudgetPolicy` controls how much work baked Section Proxies, Transition Morph, and Runtime Preview may perform in one frame and one streaming request. It is independent from Proxy Bake Quality, so changing it does not regenerate baked assets.

| Policy | Behavior |
| --- | --- |
| `Follow Engine Scalability` | Default. Follows Unreal's current single Quality Level. When scalability groups are mixed, it conservatively uses the lowest level. |
| `Low` | Fixes the smallest runtime streaming/realization budget. |
| `Medium` | Fixes the intermediate budget. |
| `High` | Fixes the default PlanetX product budget. |
| `Epic` | Fixes the largest bounded budget. Cinematic scalability also resolves to the Epic profile. |

### Resolved budget values

| Profile | Payloads / request | Dependencies / request | Components / frame | Instances / frame | Correction vertices / frame | Transition deps / components | Time / frame |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Low | 2 | 16 | 1 | 128 | 1,024 | 16 / 1 | 0.5 ms |
| Medium | 4 | 32 | 1 | 256 | 2,048 | 32 / 1 | 1.0 ms |
| High | 8 | 64 | 2 | 512 | 4,096 | 64 / 2 | 2.0 ms |
| Epic | 16 | 128 | 4 | 1,024 | 8,192 | 128 / 4 | 3.0 ms |

Engine Quality Level 0 maps to Low, 1 to Medium, 2 to High, and 3 or higher to Epic.

### Per-Actor override precedence

The following overrides take precedence over the project profile for their owning Actor or Component:

1. `bOverrideSectionProxyRuntimeBudget` on Planet Proxy Component
2. `bOverrideTransitionRuntimeBudget` on Transition Morph Component
3. `bOverrideRuntimeBudget` on Runtime Preview Actor

Use an override only for diagnosis or when one Actor genuinely requires different throughput. Values that are too high can create Game Thread spikes and streaming bursts; values that are too low spread Section realization over more frames.

## PlanetX Rendering

| Setting | Default / range | Purpose |
| --- | --- | --- |
| `bEnableLensFlares` | true | Enables Unreal's image-based lens-flare feature for PlanetX presentation. |
| `LensFlareQuality` | 3, 0–3 | Maps to `r.LensFlareQuality`: 0=Off, 1=Low, 2=High, and 3=Very High. |

PlanetX applies these as Project Setting console-variable values. Ordinary scalability changes do not silently lower them, although command-line and higher-priority runtime overrides can still win.

The per-planet `EnvironmentSettings.PostProcess.bEnableLensFlare` and `LensFlareIntensity` settings also apply. Enabling only the per-planet switch cannot activate the renderer feature when lens flare is disabled at project level.

## Recommended tuning order

1. Keep `Follow Engine Scalability` and measure at the target platform's scalability level.
2. Use runtime diagnostics to identify whether payload, dependency, component, or instance throughput is the actual limit.
3. Select a fixed project profile only when the whole project consistently needs a smaller or larger budget.
4. Use a Component override when only one Actor is exceptional.
5. If proxy quality or triangle count is the problem, change Proxy Bake Quality or Source Scope and bake again; Runtime Budget is not a mesh-quality control.

## Configuration review

After changing Project Settings, review the resulting `Config/DefaultEngine.ini` change for source control. If only a user-local `Saved/Config` value changes, teammates and packaged builds may not receive the same setting.
