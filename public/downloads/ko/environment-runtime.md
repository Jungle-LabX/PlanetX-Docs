# Environment Runtime

`APlanetXEnvironmentManager`는 Planet Asset의 환경 프로필과 현재 World의 Atmosphere, Cloud, Sun, Post Process, Space Background binding을 연결합니다.

## Binding 모드

PlanetX Managed 모드는 필요한 Component를 PlanetX profile에 맞춰 제어합니다. Use Existing Level 모드는 기존 SkyAtmosphere나 Volumetric Cloud를 유지하므로 Planet Asset profile과 수동으로 일치시켜야 합니다.

Managed Planet Actor가 있으면 Radius와 environment authoring 설정을 resolve합니다. Existing Sun Light가 없으면 저장된 Sun direction을 사용하지만 validation warning이 남을 수 있습니다.

## 초기화와 전환

- `ValidateEnvironmentBinding`: 필수 binding과 material/profile 조건 검사
- `CaptureEnvironmentStateFromBindings`: 현재 Level 값을 state로 캡처
- `ApplyEnvironmentState`: 저장 state 적용
- `ApplyInitialRuntimeSpace`: 시작 Orbit/Ground 표현 적용
- `SetEnvironmentTransition(From, To, Alpha)`: 두 공간 사이 보간

Orbit cloud/atmosphere render quality와 tracing override는 Apply/Restore 쌍으로 사용합니다. restore를 생략하면 기존 Level 품질 값이 남지 않을 수 있습니다.

## 자주 발생하는 경고

- Existing cloud/atmosphere 미지정
- PlanetX cloud와 existing Ground cloud 불일치
- MPC 미지정
- Planet Radius 또는 terminator softness가 0 이하
- Cloud shadow override에 Sun/Cloud source 누락
- Space Background material domain/blend/shading/Is Sky 설정 오류

환경 전환 문제는 binding validation부터 해결한 뒤 presentation Alpha를 조사하세요.
