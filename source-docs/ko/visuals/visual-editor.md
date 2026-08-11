# Preview 탭

Planet Asset Editor의 **Preview** 탭은 전용 미리보기 World에서 Planet visual contract를 제작합니다. **Basic**은 자주 쓰는 항목, **Advanced**는 생성·환경 세부 설정을 제공합니다.

## Basic

Basic의 Planet, Sections, Environment 영역에서 다음을 빠르게 조정합니다.

- Atmosphere 활성화와 Radius 기반/Manual 높이
- Volumetric Clouds와 layer 높이
- 태양과 cloud shadow
- Post Process, convolution bloom, lens flare
- Section 선택과 preview

## Advanced

Advanced에서는 Planet Completion, Section Proxy Padding, material build와 Environment profile 전체를 편집합니다. 변경은 preview session에 적용되고 성공한 build가 Planet Asset revision과 연결됩니다.

## Preview 원칙

Preview는 제작 환경이며 Runtime World 자체가 아닙니다. Runtime Preview는 Proxy Bake가 게시한 payload를 읽는 별도 경로입니다. Preview에서 좋아 보이더라도 Diagnostics의 stale 상태와 Runtime Preview readiness를 확인해야 합니다.

## 조작과 진단

Preview viewport는 행성 반지름에 맞춰 카메라 속도와 framing을 조정합니다. 실패한 Padding Material Preview는 실패 Section 수를 표시하며 `PlanetX.VisualEdit.Dump`에서 상세 원인을 확인할 수 있습니다.

변경 전후에는 저장하고, Section geometry와 Material source가 바뀌면 Completion/Padding과 Proxy Bake의 stale 상태를 모두 검토하세요.
