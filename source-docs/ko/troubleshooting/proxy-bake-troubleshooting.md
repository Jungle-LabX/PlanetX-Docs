# Proxy Bake 문제

## Scan Sources가 비활성

대상 Planet Asset, Section과 Source World가 유효한지 확인합니다. PIE를 종료하고 외부 Worker가 다른 작업을 소유하지 않는지 확인하세요. External Level Section을 다른 Level에서 열었다면 Editor가 필요한 Level 이동을 요청할 수 있습니다.

## CompletedWithWarnings

BakeData의 SourceOmissions를 확인합니다. Reason, PassId, Actor/Component path, class와 Detail이 저장됩니다.

대표 원인:

- Spline Mesh deformation
- 지원하지 않는 Component class
- Cloth/deformable
- Missing mesh 또는 LOD
- projection range 초과
- unsupported material 또는 sky material
- nondeterministic dynamic source
- 저장되지 않은 PCG managed resource

의도된 제외라면 Source 정책이나 NoBake tag를 명시하고, 보이는 콘텐츠가 빠졌다면 지원되는 Static Mesh/Instance/Landscape 형태로 바꿉니다.

## Bake가 stale

Planet Asset 구조, Section placement, Source World content, Source Material, quality나 visual generation 입력이 바뀌면 revision이 stale이 됩니다. Scan과 plan 재계산 후 다시 Bake하고 Full Validate를 실행합니다.

## External Bake Monitor가 열리지 않음

브라우저 Monitor는 선택 기능이며 Bake를 소유하지 않습니다. 로컬 서비스나 시스템 브라우저를 열지 못해도 External Bake는 계속되므로 Editor 상태와 Unreal 로그에서 진행 상황을 확인하세요. 전체 Monitor URL에는 로컬 세션 token이 포함되므로 복사하거나 공유하지 마세요.

Bake가 진행되는 동안에는 Direct Worker가 Monitor를 호스팅합니다. Worker가 종료되면 서비스도 끝나므로 완료 후 기존 탭에 **Disconnected**가 표시될 수 있습니다. Unreal Editor로 돌아가거나 다시 실행한 뒤 **Open External Bake Monitor**를 선택하면 최신 durable result를 다시 호스팅할 수 있습니다. 이전 탭은 자동으로 이전되지 않습니다.

## 큰 package

512 MiB 초과 package는 warning, 1 GiB 초과는 publication failure입니다. 큰 indivisible source를 분리하고 partition/shard 결과와 instance aggregation을 검토하세요. source spool 128 MiB 목표는 최종 uasset 크기가 아님을 유의합니다.
