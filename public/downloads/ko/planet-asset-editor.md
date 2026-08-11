# Planet Asset Editor

Planet Asset을 더블 클릭하면 전용 Editor가 열립니다. Editor에는 Asset 계약을 다루는 다섯 개의 도킹 가능한 탭이 있습니다.

## 탭

| 탭 | 용도 |
| --- | --- |
| Overview | Planet 상태와 권장 다음 작업 |
| Sections | Section 검색, 필터, runtime role, Bake 진입 |
| Configuration | Planet 구조와 제작 설정 |
| Preview | Basic/Advanced 비주얼 제작 |
| Diagnostics | Quick/Full validation과 해결 동작 |

기본 레이아웃에서는 중앙의 **Preview**와 오른쪽의 **Configuration**이 열립니다. **Overview**, **Sections**, **Diagnostics**는 명령을 실행하기 전까지 닫혀 있을 수 있습니다. 탭이 보이지 않으면 **Window > Planet Asset**에서 다시 여세요.

Configuration에서는 EnvironmentSettings가 숨겨집니다. 환경 프로필의 단일 제작 표면은 **Preview > Advanced > Environment**입니다.

## 주요 명령

- Open Preview: `Alt+P`
- Sections: `Alt+T`
- Open Proxy Bake: `Alt+B`
- Refresh: `F5`
- Validate: `Shift+F`
- Section 검색: `Ctrl+F`
- 선택 Section Focus: `F`
- 선택 Section 삭제: `Delete`

Sections 필터는 All, Same World, External Level, Needs Bake, Needs Transition, Invalid를 제공합니다. Runtime role 변경은 필요한 World와 Proxy Bake 계약을 만족해야 합니다.

## 삭제와 보존

Delete Selected Section은 Planet Asset에서 Section과 Level Pair를 제거하지만 참조하던 Source World, Proxy BakeData, Runtime Preview asset을 삭제하지 않습니다. 생성 자산 정리는 별도 확인 작업으로 수행하세요.

## 권장 흐름

새 Planet Asset에서는 상태 요약이 필요할 때 **Overview**를 열고, 저장된 Ground Level에서 Proxy Bake를 엽니다. Section을 먼저 만들거나 선택하지 마세요. 첫 번째 성공한 Proxy Bake가 Section과 Level Pair를 생성합니다. Bake가 끝난 뒤 **Sections**에서 `Linked` 상태를 확인하고 **Preview**에서 비주얼을 조정한 다음 **Diagnostics**에서 Full Validate를 통과시킵니다.

기존 Planet Asset에서는 **Sections**에서 작업할 Section을 선택한 뒤 해당 Section의 Proxy Bake 진입점을 사용합니다. Section 선택으로 시작하는 흐름은 기존 Section 작업뿐입니다.
