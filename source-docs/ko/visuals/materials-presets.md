# 재질과 Surface Preset

PlanetX 재질 경로는 원본 Section material, Proxy Bake가 게시한 material identity, Completion/Padding용 생성 material을 구분합니다.

## Surface Preset

`UPlanetXSurfacePreset`은 Completion과 행성 표면의 재사용 가능한 스타일을 담는 Primary Data Asset입니다. Preset을 Planet Asset의 Active Surface Preset으로 지정하면 authoring 설정이 해당 선택을 참조합니다.

Preset은 material, terrain/noise 성격과 시각 파라미터를 공유하는 데 사용하고 Planet ID나 Section geometry 같은 구조 계약을 대신하지 않습니다.

## Proxy material

`UPlanetXPlanetProxyComponent`의 Planet Material Override는 행성 sphere 표현을 교체합니다. Section proxy material은 BakeData의 canonical slot과 remap을 따라야 합니다. 임의로 slot 순서를 바꾸면 boundary와 padding material provenance가 어긋날 수 있습니다.

## 자동 Padding material

Runtime binder는 generated visual의 binding descriptor와 Source Material identity를 확인한 뒤 MID를 준비합니다. geometry revision, slot, texture set이 일치하지 않으면 error material 또는 경고가 사용될 수 있습니다.

## 권장 사항

- Source Material을 변경한 뒤 Full Validate 실행
- stale Generated Material을 package 전에 rebuild
- Material slot 순서를 Bake와 Visual build 사이에서 유지
- Sky material은 지표 Proxy Bake 소스로 사용하지 않음
- 동적 재질은 결정적으로 캡처 가능한 파라미터만 사용
