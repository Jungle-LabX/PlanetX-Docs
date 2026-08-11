# Completion과 Padding

Completion은 Section 사이에서 보이지 않는 행성 표면을 생성하고, Padding은 Section proxy 경계가 구형 행성 표현과 자연스럽게 이어지도록 보강합니다.

## Completion

Surface Completion 설정은 생성 topology, cutout, terrain noise와 surface material을 제어합니다. 생성기는 동일 입력에 대해 결정적인 결과를 만들고 polygon, boundary, mesh attribute를 검증합니다.

Terrain Region은 행성 표면의 특정 구역에 noise parameter를 적용합니다. 큰 noise나 잘못된 cutout이 proxy 아래로 침범하지 않는지 Preview에서 확인하세요.

## Padding

Proxy Padding은 Section boundary loop를 선택하고 adaptive subdivision과 projection으로 연결 geometry를 만듭니다. Transition strip과 shared seam은 경계의 위치·normal·material provenance를 유지합니다.

성능 budget에는 boundary edge, generated vertex, index, compact binding, MID 수의 warning/hard 기준이 있습니다. Warning은 결과를 게시할 수 있지만 runtime 비용을 검토해야 함을 뜻합니다.

## Material build

Padding Material Build는 source material layout을 수집하고 필요한 texture/material asset을 생성합니다. Source Material asset path가 같더라도 내용이 바뀌면 Editor validation이 stale 상태를 찾습니다. Package 전에 다시 build하세요.

## 실패 시 확인

- Section bounds와 boundary loop 유효성
- Proxy Bake revision과 generated visual geometry hash
- Source Material layout과 slot remap
- projection tolerance와 Planet Radius
- performance budget warning
