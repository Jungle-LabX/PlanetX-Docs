# 런타임과 Travel 문제

## RuntimeUnavailable

Planet Actor 등록, Planet Asset, 현재 World와 World Runtime 서비스가 준비되지 않은 상태입니다. Begin Play/streaming 순서를 확인하고 Planet Component의 RefreshRuntimeRegistration과 참가 Actor의 RefreshRuntimeContext를 사용합니다.

## 표면 Query가 실패

Detailed query status로 InvalidInput, RuntimeUnavailable, Miss를 구분합니다. Ray direction이 0이 아닌지, Planet/Binding filter가 현재 World에 존재하는지, Section bounds와 BakeData가 유효한지 확인하세요.

## ResumePendingTravel 실패

| Error | 의미 |
| --- | --- |
| PendingTravelNotFound | 현재 World에 matching pending capture 없음 |
| AmbiguousPendingTravel | matching capture가 여러 개 |
| StaleGeneration | 더 새로운 Ticket이 이미 발행됨 |
| TargetPlanetBindingNotFound | 대상 Planet 인스턴스가 아직 등록되지 않음 |
| ArrivalTimedOut | retry 가능한 상태가 timeout을 넘음 |

동시 Travel에서는 Ticket/Journey identity를 gameplay 상태에 저장하고 무인자 resume에 의존하지 마세요.

## 잘못된 위치 또는 회전

Level Handoff Ground 위치는 capture에 저장된 SectionLocalToGroundWorld mapping이 authoritative합니다. Source/Target Planet Actor Transform을 임의로 맞춰 덮어쓰지 마세요. DiagnoseProxySync와 ResolvePlanetAlignmentForSection으로 mapping을 검사합니다.

## 속도 손실

Movement Component나 Physics Body를 교체했다면 Movement Handoff snapshot을 Capture/Apply하고 결과가 consumed됐는지 확인합니다.
