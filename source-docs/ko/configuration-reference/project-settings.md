# 프로젝트와 성능 설정

PlanetX의 Project Settings는 **Edit > Project Settings > Plugins** 아래에 있습니다. 두 설정 객체는 `DefaultEngine.ini` 계열 Config에 저장됩니다.

## PlanetX Runtime

`RuntimeBudgetPolicy`는 Bake된 Section Proxy, Transition Morph, Runtime Preview가 한 Frame과 한 streaming request에서 처리할 작업량을 정합니다. Proxy Bake Quality와는 독립적이므로 이 값을 바꿔도 Bake Asset이 다시 생성되지 않습니다.

| 정책 | 설명 |
| --- | --- |
| `Follow Engine Scalability` | 기본값입니다. 현재 Unreal Scalability의 단일 Quality Level을 따릅니다. 여러 그룹이 섞여 있으면 가장 낮은 Quality Level을 보수적으로 사용합니다. |
| `Low` | 가장 작은 Runtime streaming/realization budget을 고정합니다. |
| `Medium` | 중간 budget을 고정합니다. |
| `High` | PlanetX의 기본 제품 budget을 고정합니다. |
| `Epic` | 가장 큰 bounded budget을 고정합니다. Cinematic Scalability도 Epic Profile로 해석됩니다. |

### Resolved Budget 값

| Profile | Payloads / request | Dependencies / request | Components / frame | Instances / frame | Correction vertices / frame | Transition deps / components | Time / frame |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Low | 2 | 16 | 1 | 128 | 1,024 | 16 / 1 | 0.5 ms |
| Medium | 4 | 32 | 1 | 256 | 2,048 | 32 / 1 | 1.0 ms |
| High | 8 | 64 | 2 | 512 | 4,096 | 64 / 2 | 2.0 ms |
| Epic | 16 | 128 | 4 | 1,024 | 8,192 | 128 / 4 | 3.0 ms |

Engine Quality Level 0은 Low, 1은 Medium, 2는 High, 3 이상은 Epic으로 매핑됩니다.

### Actor별 Override 우선순위

다음 Override가 켜져 있으면 해당 Actor/Component가 Project Profile보다 우선합니다.

1. Planet Proxy Component의 `bOverrideSectionProxyRuntimeBudget`
2. Transition Morph Component의 `bOverrideTransitionRuntimeBudget`
3. Runtime Preview Actor의 `bOverrideRuntimeBudget`

Override는 문제 진단이나 특정 Actor가 반드시 다른 처리량을 가져야 할 때만 사용하세요. 너무 큰 값은 Game Thread spike와 streaming burst를 만들 수 있고, 너무 작은 값은 Section이 완전히 나타날 때까지 여러 Frame이 더 필요하게 만듭니다.

## PlanetX Rendering

| 설정 | 기본값 / 범위 | 설명 |
| --- | --- | --- |
| `bEnableLensFlares` | true | PlanetX presentation을 위해 Unreal의 image-based Lens Flare 기능을 활성화합니다. |
| `LensFlareQuality` | 3, 0–3 | `r.LensFlareQuality`에 대응합니다. 0=Off, 1=Low, 2=High, 3=Very High입니다. |

이 값은 Project Setting 우선순위로 Console Variable에 적용됩니다. 일반 Scalability 변경으로 조용히 낮아지지는 않지만, command line이나 더 높은 우선순위의 Runtime Override는 여전히 우선할 수 있습니다.

행성별 `EnvironmentSettings.PostProcess.bEnableLensFlare`와 `LensFlareIntensity`도 함께 적용됩니다. Project에서 Lens Flare가 꺼져 있으면 행성별 토글만 켜도 렌더러 기능이 활성화되지 않습니다.

## 성능 조정 순서

1. Project의 `Follow Engine Scalability`를 유지한 상태로 목표 플랫폼 Scalability에서 측정합니다.
2. Runtime diagnostics에서 payload, dependency, component, instance 중 어느 상한이 병목인지 확인합니다.
3. 전체 프로젝트가 일관되게 더 작은/큰 budget을 필요로 할 때만 고정 Profile을 선택합니다.
4. 한 Actor만 예외여야 할 때 Component Override를 사용합니다.
5. Proxy 품질이나 triangle 수가 문제라면 Runtime Budget이 아니라 Proxy Bake Quality와 Source Scope를 조정하고 다시 Bake합니다.

## Config 검토

Project Settings를 바꾸면 소스 관리에 포함될 `Config/DefaultEngine.ini` 변경을 확인하세요. 사용자별 `Saved/Config` 값만 바뀌고 기본 Config에 반영되지 않으면 팀원과 패키징 빌드가 같은 값을 사용하지 않을 수 있습니다.
