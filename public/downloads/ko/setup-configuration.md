# 설치와 설정 문제

## 플러그인이 로드되지 않음

`PlanetX.uplugin`과 프로젝트의 EngineAssociation을 확인합니다. 현재 기준은 UE 5.8이며 Runtime과 Editor 두 모듈이 있습니다. GeometryProcessing과 PCG 플러그인이 활성화되고 대상 플랫폼 toolchain이 설치되어야 합니다.

Editor 로그에서 module load 실패의 첫 오류를 확인하세요. 이후 compile 오류는 연쇄 결과일 수 있습니다.

## Planet Asset 생성 항목이 없음

- PlanetXEditor 모듈이 로드됐는지 확인
- Content Browser의 올바른 Add 메뉴 사용
- 프로젝트가 Editor target으로 빌드됐는지 확인
- Plugin 활성화 후 Editor 재시작

## Actor가 Planet을 resolve하지 못함

Coordinate Component에서 Reference Planet Actor가 유효하면 Planet ID보다 우선합니다. 해당 Actor의 Planet Component에 Planet Asset이 지정됐는지, runtime 등록이 성공했는지 확인하세요.

여러 Actor가 같은 Planet ID를 쓰면 Planet Binding ID를 명시합니다. Section 드롭다운은 Content Browser 전체가 아니라 현재 World에 배치된 Planet의 enabled Section에서 만들어집니다.

## World Partition 경고

`EPlanetXActorSpatialLoadingPolicy::PlanetXManaged`는 Orbit Actor를 non-spatial 상태로 유지합니다. `ActorManaged`를 선택하면 Is Spatially Loaded를 프로젝트가 직접 관리해야 합니다. Data Layer와 Streaming Source는 자동 변경되지 않습니다. 실제 적용 상태는 `GetActorSpatialLoadingPolicy`, `ShouldForceOwnerAlwaysLoaded`, `ApplySpatialLoadingPolicyToOwner`로 확인하세요.
