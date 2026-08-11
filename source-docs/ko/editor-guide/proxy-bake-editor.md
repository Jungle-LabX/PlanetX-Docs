# Proxy Bake Editor

Proxy Bake Editor는 Ground World의 시각 소스를 수집해 Orbit proxy, partition payload, Runtime Preview와 transition resource를 게시합니다.

## 현재 상태에 맞는 진입 경로 선택

Asset 상태에 따라 다음 경로 중 하나를 사용합니다.

| 상황 | 진입 경로 | Section 선택 |
| --- | --- | --- |
| 새 Planet Asset의 첫 Section | 저장된 Ground Level을 열고 **Tools > PlanetX 영역 > Proxy Bake Editor** 사용 | 아직 Section이 없으며 Scan이 Target을 결정하고 첫 성공 Bake가 Section을 생성 |
| 기존 Section Rebuild | Planet Asset Editor > **Sections**에서 Section을 선택한 뒤 **Open Proxy Bake** | 선택한 Section이 Rebuild 대상 |
| Diagnostics 문제 해결 | Planet Asset Editor > **Diagnostics > Open Proxy Bake** | 표시된 Finding을 먼저 검토한 뒤 사용 |

처음 사용하는 사용자는 [여기서 시작 — Same World 빠른 시작](?lang=ko&doc=quick-start-same-world)을 따라 첫 번째 경로만 사용하세요.

## 첫 Bake 작업 순서

1. Ground Level을 열고 저장합니다.
2. **Tools** 메뉴의 PlanetX 영역에서 Proxy Bake Editor를 엽니다.
3. Target Planet Asset을 지정하고 Presentation을 **Same World**, Source Scope를 **Current Level**로 설정합니다.
4. **Scan Sources**(`F5`)를 실행하고 활성 Source가 하나 이상이며 `NEW OUTPUT`인지 확인합니다.
5. Source Role, Omission과 Output Plan을 검토합니다. Use 또는 Role을 수정했다면 Apply Source Changes를 실행합니다.
6. **BAKE IN EDITOR**(`Ctrl+B`)를 실행합니다. 성공 결과는 `Bake complete.`로 시작하며 Section과 Level Pair를 자동으로 생성합니다.

## 기존 Section 작업 순서

1. Planet Asset Editor > **Sections**를 엽니다.
2. 다시 Bake할 Section을 선택합니다.
3. **Open Proxy Bake**를 선택합니다.
4. **Scan Sources**(`F5`)로 Source와 Bake Plan을 갱신합니다.
5. 변경 사항을 검토하고 표시되는 **REBUILD IN EDITOR** 또는 **BAKE IN EDITOR**를 실행합니다.

진행 중 취소는 `Esc`, 결과 선택은 `Ctrl+Shift+O`입니다.

PIE 중에는 Source Level 변경이 필요한 작업을 시작할 수 없습니다. 외부 Worker가 활성 상태이면 해당 Source World를 직접 열지 말고 Editor에서 취소만 요청하세요.

## 성공 체크포인트

| 단계 | 필요한 결과 |
| --- | --- |
| Scan | 상단에 `SUCCESS`가 표시되고 활성 Source 수가 0보다 큼 |
| Plan | `SCAN OUT OF DATE` 또는 `TARGET CONFLICT`가 없음 |
| Bake | `Bake complete.` 또는 검토가 끝난 `Bake complete with warnings` |
| Planet Asset > Sections | Bake는 `Linked`, Transition은 `Ready` 또는 `Same World` |

## External Bake Monitor

External Bake 확인 창에서 **Open Bake Monitor in browser**를 활성화하면 Stage, 진행률, ETA, 리소스 사용량, 경고와 제한된 로그 tail을 로컬 브라우저에서 볼 수 있습니다. Monitor는 관찰 도구이므로 서비스 또는 브라우저를 열지 못하더라도 External Bake는 계속되며 결과도 달라지지 않습니다.

Loopback Monitor 서비스는 `PlanetXEditor` 모듈에 포함되어 활성 Editor 또는 Direct Worker 프로세스 내부에서 실행됩니다. PlanetX는 별도의 Monitor 실행 파일을 설치하거나 실행하지 않습니다. 서비스는 로컬 연결만 허용하며 세션별 token으로 브라우저 페이지를 인증합니다. 전체 Monitor URL을 공유하거나 게시하지 마세요.

External Bake가 진행되는 동안에는 Direct Worker가 Monitor를 호스팅합니다. Worker가 종료되면 해당 서비스도 종료되므로 기존 탭의 연결이 끊길 수 있습니다. Unreal Editor가 다시 실행된 뒤 **Open External Bake Monitor**를 사용하면 최신 durable result를 다시 호스팅할 수 있습니다. 새 서비스는 Job artifact에서 상태를 복원하며 이전 브라우저 탭을 자동으로 이전하지는 않습니다.

브라우저 탭을 닫아도 Bake는 취소되지 않습니다. 안전한 checkpoint에서 취소를 요청하려면 Monitor의 **Cancel Bake** 또는 Editor의 취소 기능을 사용하세요. 취소를 요청해도 부분 결과는 게시되지 않습니다.

## 지원 소스

| Component | 처리 |
| --- | --- |
| LandscapeComponent | Landscape pass |
| FoliageInstancedStaticMeshComponent | Foliage pass |
| HISM / ISM | Instances pass |
| StaticMeshComponent | RigidMesh pass |
| SplineMeshComponent | 변형 추출 미지원, omission |

PCG managed resource와 HLOD는 discovery 단계에서 저장·검증 상태를 확인합니다. HLOD가 검증되지 않으면 원본 소스를 보수적으로 사용합니다.

## 역할과 태그

Editor는 Auto, ProxyGeometry, LandscapeProxy, InstanceBatch, Discard, ManualReview, Unsupported 역할을 표시합니다. Source group은 Actor, Folder, Data Layer, Level/Level Instance 단위로 볼 수 있습니다.

C++ 태그 API는 BakeSource, NoBake, Preview, Generated를 제공합니다. 명시적 제외는 omission을 숨기는 수단이 아니라 의도된 소스 정책으로 사용하세요.

## 결과 판정

Succeeded는 omission 없는 성공입니다. CompletedWithWarnings는 게시 성공이지만 SourceOmissions를 검토해야 합니다. package가 512 MiB를 넘으면 경고하고 1 GiB를 넘으면 게시를 거부합니다.
