# 디자인 토큰

원본: [피그마 디자인 · 387:1098](https://www.figma.com/design/IcgPzl4eMORbAIEqNpRCOS/?node-id=387-1098)
CSS 기준 파일: `styles/tokens.css`. 원본 데스크톱 폭은 1920px입니다.

## 컬러
| CSS 변수 | 값 | 용도 |
| --- | --- | --- |
| --color-bg | #FFFFFF | 페이지 배경 |
| --color-text | #111111 | 본문, 큰 제목 (원본 #000000에서 사용자 요청으로 변경) |
| --color-accent | #4F6D8A | 세리프 강조, 제품명, 구분선 |
| --color-badge | #DFE6ED | NEW / BEST 배지 배경 |
| --color-muted | #343C47 | 헤더, 푸터 |

## 타이포그래피
| 역할 | 피그마 폰트 | 원본 크기 / 행간 |
| --- | --- | --- |
| 대형 제목 | Archivo Regular | 145px / 1 |
| new 강조 | Mixta Ess Sharp Italic | 170px / 0.8 |
| 제품 제목 | Mabry Pro Regular | 45px (BEST 40px) / 1.3 |
| 설명 | Mabry Pro Regular | 20px / 1.4–1.5 |
| 쿠션 설명 | Mabry Pro Regular | 25px / 1.6 |
| 튜토리얼 제품명 | Mabry Pro Regular | 18px / 1.4 |
| 이미지 캡션 | Archivo SemiBold | 20px / 1.1 |

Archivo는 공식 Google Fonts 파일을 assets/fonts에 저장해 연결했습니다. Mabry Pro와 Mixta Ess Sharp Italic은 사용자 PC에 설치된 파일을 프로젝트에 복사해 직접 연결했습니다. Mixta는 피그마와 동일한 Fontspring DEMO 파일입니다. SHOP은 사용자 요청으로 Archivo를 사용합니다. 피그마 한글 레이어에도 Mabry Pro Regular가 지정되어 있으나 실제 한글 대체 폰트는 응답에 명시되지 않습니다. 웹에서는 Noto Sans KR을 한글용 대체 폰트로 로컬 연결했습니다.

한글 자간: **-2.5% = -0.025em** (`--tracking-korean`). 빌드 시 한글 텍스트에만 korean-text 클래스를 적용합니다. 영문, 숫자, 로고 이미지에는 영향을 주지 않습니다.

## 레이아웃
- 최대 폭: 1920px; 중앙 정렬.
- 좌우 기본 여백: 원본 50px, CSS 2.6cqw.
- 헤더 높이: 원본 75px, CSS 3.9cqw (최소 60px).
- 대형 제목: 7.55cqw. 페이지 컨테이너 폭에 비례해 조정.
- 튜토리얼 카드: 원본 480×355px 이미지, 카드 간격 26px.
- NEW 가로 영역: 한 화면에 한 제품, 가로 스크롤 / 스냅.
- BEST: 좌우 두 열과 이미지 크기 차이로 원본의 비대칭 구성 표현.
- 700px 이하: 모바일 피그마 387:1277 기준. 본문 12px, 제품 제목 20px, 헤더 44px, 여백 15px, NEW 세로 목록, BEST 단일 열에서 이미지 다음 설명 순서. styles/mobile.css에서 관리합니다. 튜토리얼은 사용자 요청의 전체 폭을 유지하고, 카드 설명은 가독성을 위해 시안의 7.8px 대신 12px로 적용했습니다.
- 기본 모서리와 그림자 없음. 흰 배경과 이미지, 타이포그래피 중심.

## 이미지
원본 로고, 캠페인, 제품, 튜토리얼, 아이콘을 `assets/images`에 저장합니다.
SVG 이미지는 개별 클래스에서 표시 영역을 지정하고, 실제 이미지 비율과 원본 슬롯을 기준으로 배치합니다. 히어로 로고는 동일 PNG를 피그마와 같은 세 영역으로 잘라 표시합니다.
