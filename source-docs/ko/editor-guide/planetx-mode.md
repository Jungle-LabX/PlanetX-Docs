# PlanetX Mode

PlanetX Mode는 현재 World의 Planet Actor, Section, 참가 Actor, 환경과 전환을 한 화면에서 연결해 보는 Level Editor mode입니다.

## Palette

| 단축키 | Palette | 역할 |
| --- | --- | --- |
| Alt+1 | Placement | Planet/Section 배치와 좌표 편집 |
| Alt+2 | Runtime | PIE 등록·residency·상태 관찰 |
| Alt+3 | Cinematic | PlanetX Transform path 제작 |
| Alt+4 | Transition | Endpoint와 전환 범위 |
| Alt+5 | Environment | World 환경 연결 |
| Alt+6 | Validate | World와 Asset 검증 |

`F5`의 Refresh Preview는 scene index를 새로 만들고 PIE 전 Completion/Padding preview를 갱신합니다.

## Preview view

- **Planet**: 활성 Planet proxy를 표시하고 Source Level Actor를 숨깁니다.
- **Compare**: Planet proxy와 Source Level Actor를 함께 표시합니다.
- **Level**: Planet proxy를 숨기고 원본 Level Actor를 표시합니다.

이 선택은 편집 시 visibility preview이며 저장된 runtime role을 바꾸지 않습니다.

## Scene Tree와 선택

Scene Tree는 Planet, Section, Endpoint, Environment, 참가 Actor 연결을 표시합니다. 같은 Planet에 중복 Endpoint나 Environment Manager가 있거나 Section placement/topology가 잘못되면 경고가 표시됩니다.

Placement 도구로 Actor를 이동할 때 Coordinate Component의 Reference Planet/Section과 representation domain을 먼저 확인하세요. 저장 가능한 위치는 명시 Section ID를 권장합니다.

## PIE 사용

PIE에서는 Runtime palette로 Planet registration, Section state, Runtime Preview와 Transition 결과를 관찰합니다. Source World를 바꾸는 Proxy Bake 작업은 PIE 중 실행하지 마세요.
