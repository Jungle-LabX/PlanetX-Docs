# Section과 Level Pair

Section은 행성 표면의 지리적 구역, 로컬 Frame, 시각 프록시, 전환 경계를 묶는 단위입니다. Level Pair는 해당 Section이 어느 World에서 어떻게 표현되는지 정의합니다.

## Section placement

`FPlanetXSectionPlacement`은 표면상의 위치, tangent 방향, 크기와 배치 Transform을 결정합니다. Canonical north-pole anchor로 선택된 Same World Section은 자동 배치가 제한될 수 있습니다. 편집기는 Visual, coordinate-containment, transition rectangle을 하나의 bounds contract로 검증합니다.

Section ID를 명시하면 저장, Capture, Sequencer가 같은 Frame을 재현합니다. ID가 None일 때 자동 Section resolve는 현재 Planet Local 위치와 Asset 배열 순서를 사용하므로 영속 데이터에는 권장하지 않습니다.

## Runtime role

- **Same World**: Orbit World와 Ground World package가 같아야 합니다.
- **External Level / Level Handoff**: Orbit과 Ground가 서로 달라야 하고 Runtime Preview World가 필요합니다.

Level Handoff Section은 GroundSyncMapping과 유효한 TransitionPolicy를 가져야 합니다. Proxy Bake가 성공하면 SourceRef, BakeData, mapping, preview와 transition resource 링크가 갱신됩니다.

## Ground proxy visibility

Section별 Ground proxy visibility는 Orbit, Ground, transition 시 원본 Actor와 프록시 중 무엇이 보일지 결정합니다. PlanetX Mode의 Planet/Compare/Level view는 runtime 계약을 변경하지 않고 편집 중 표현만 비교합니다.

## 검증 체크리스트

1. Section ID와 Level Pair ID가 비어 있지 않은가?
2. Runtime role과 World package 관계가 맞는가?
3. GroundSyncMapping이 유효한가?
4. Proxy Bake와 생성 비주얼이 현재 revision인가?
5. transition bounds가 containment bounds 안에 있는가?
