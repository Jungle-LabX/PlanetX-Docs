# Support와 Release Notes

지원 요청 전

## 지원 요청 전

- 최신 binary와 단일 plugin 경로 확인
- Editor 완전 재시작
- 올바른 Ground Map/Planet Asset 확인
- Refresh 및 Diagnostics 실행
- Selected Actors 최소 재현
- 전체 log와 screenshot 보존

## 버그 리포트

```text
Unreal Engine version:
PlanetX version/commit:
Source scope:
Runtime role:
World Partition enabled:
Source/partition count:
Steps to reproduce:
Expected result:
Actual result:
First error:
Attached full log:
```

현재 `.uplugin`에는 공개 SupportURL, Discord 또는 Email이 선언되어 있지 않습니다. 프로젝트의 공식 issue tracker나 팀 PlanetX 담당 채널을 사용하십시오.

## Version 1.0

- Runtime module: PlanetX
- Editor module: PlanetXEditor
- Dependency: GeometryProcessing

업데이트 후에는 module rebuild, Editor 재시작, Planet Asset Validate, `LEGACY HASH`/stale 결과 재Bake와 target platform cook을 수행합니다.

Known limitations:

- 공식 Engine/platform compatibility matrix 없음
- bundled user Demo Map 없음
- multiplayer Travel/replication은 game-owned
- Skeletal/Cloth/Spline deformation/dynamic mesh 미지원
- External Bake의 새 Section 이름은 완료 후 Rename 필요
